#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <curl/curl.h>
#include <stdarg.h>
#include <syslog.h>
#define PAM_SM_AUTH
#include <security/pam_modules.h>
#include <security/pam_ext.h>
#include <security/pam_appl.h>
#include <sys/time.h>
#include "sha3.c"
#include "nxjson.c"


#define GETH_URL "http://127.0.0.1:7545/"
#define CONTRACT_ADDRESS "0xa149588c43c450be631b17fb860c3c936eacae26"
#define FROM_ADDRESS "0xdc6012c9ad4340bbbaf87a538e38c0ccd24d9bea"
#define GAS "0xf4240" //0x493e0


/* this function is ripped from pam_unix/support.c, it lets us do IO via PAM */
int converse( pam_handle_t *pamh, int nargs, struct pam_message **message, struct pam_response **response ) {
  int retval ;
  struct pam_conv *conv ;

  retval = pam_get_item( pamh, PAM_CONV, (const void **) &conv ) ; 
  if( retval==PAM_SUCCESS ) {
    retval = conv->conv( nargs, (const struct pam_message **) message, response, conv->appdata_ptr ) ;
  }
  return retval ;
}

int pam_print(pam_handle_t *pamh, char *error_msg, ...){
  struct pam_message msg[1],*pmsg[1];
  struct pam_response *resp;
  char buff[4096];

  va_list ap;
  va_start(ap,error_msg);
  (void)vsnprintf(buff,sizeof(buff),error_msg,ap);
  va_end(ap);
  int retval;
  pmsg[0] = &msg[0];
  msg[0].msg_style = PAM_ERROR_MSG;
  msg[0].msg = buff;
  resp = NULL ;
  retval = converse(pamh, 1 , pmsg, &resp);
  free(resp);
  if( retval!=PAM_SUCCESS ) {
    return retval ;
  }else{
    return 0;
  }
}

struct MemoryStruct {
  char *memory;
  size_t size;
};
 
static size_t
WriteMemoryCallback(void *contents, size_t size, size_t nmemb, void *userp)
{
  size_t realsize = size * nmemb;
  struct MemoryStruct *mem = (struct MemoryStruct *)userp;
 
  mem->memory = realloc(mem->memory, mem->size + realsize + 1);
  if(mem->memory == NULL) {
    /* out of memory! */ 
    syslog(LOG_DEBUG,"[::> Curl][Memory Callback]: not enough memory (realloc returned NULL) \n");
    return 0;
  }
 
  memcpy(&(mem->memory[mem->size]), contents, realsize);
  mem->size += realsize;
  mem->memory[mem->size] = 0;
 
  return realsize;
}

char* get_post_result(char *request_data, char *request_name){

  CURL *curl_handle;
  CURLcode res;
 
  struct MemoryStruct chunk;
 
  chunk.memory = malloc(1);
  chunk.size = 0;
 
  curl_handle = curl_easy_init();
 
  curl_easy_setopt(curl_handle, CURLOPT_URL, GETH_URL);

  curl_easy_setopt(curl_handle, CURLOPT_POSTFIELDS, request_data);
  curl_easy_setopt(curl_handle, CURLOPT_POSTFIELDSIZE, (long)strlen(request_data));
 
  curl_easy_setopt(curl_handle, CURLOPT_WRITEFUNCTION, WriteMemoryCallback);
 
  curl_easy_setopt(curl_handle, CURLOPT_WRITEDATA, (void *)&chunk);
 
  curl_easy_setopt(curl_handle, CURLOPT_USERAGENT, "libcurl-agent/1.0");
 
  res = curl_easy_perform(curl_handle);
 
  if(res != CURLE_OK) {
    syslog(LOG_DEBUG,"[::> Curl][%s] curl_easy_perform() failed: %s\n",request_name,curl_easy_strerror(res));
    // fprintf(stderr, "[%s]curl_easy_perform() failed: %s\n",request_name,curl_easy_strerror(res));
    free(chunk.memory);
    curl_easy_cleanup(curl_handle);
    return NULL;
  }
  else {
    syslog(LOG_DEBUG,"[::> Curl][%s][curl result]%s\n",request_name,chunk.memory);
    syslog(LOG_DEBUG,"[::> Curl][%s][curl result] Size: %lu bytes\n",request_name,(long)chunk.size);
    curl_easy_cleanup(curl_handle);
    return chunk.memory;
  }
}

int check_is_revoked(){

  char *request_data="{ \
    \"jsonrpc\": \"2.0\", \
    \"id\": 434, \
    \"method\": \"eth_call\", \
    \"params\": [ \
        { \
            \"from\": \""FROM_ADDRESS"\", \
            \"to\": \""CONTRACT_ADDRESS"\", \
            \"data\": \"0x64628ec6\", \
            \"value\": \"0x0\", \
            \"gas\": \""GAS "\"\
        }, \
        \"latest\" \
    ] \
  }";

  char *response;
  int ret_flag=0;
  response=get_post_result(request_data,"Revoke Status Check");
  syslog(LOG_DEBUG,"[::> Revoke Status Check][Response]: %s\n",response);
  if(response!=NULL){
    const nx_json* json = nx_json_parse(response, 0);
    if (json) {
      syslog(LOG_DEBUG,"[::> Revoke Status Check][parsed result field] %s\n",nx_json_get(json, "result")->text_value);
      // printf("result=%s\n", nx_json_get(json, "result")->text_value);
      if(strcmp(nx_json_get(json, "result")->text_value,"0x0000000000000000000000000000000000000000000000000000000000000001")==0){
        ret_flag=1;
      }
    }
    nx_json_free(json);
    free(response);
  }else{
    syslog(LOG_DEBUG,"[::> Revoke Status Check] NULL Response received from curl");
  }
  return ret_flag;
}

void use_token(char *hash){

  char *request_front="{ \
    \"jsonrpc\": \"2.0\", \
    \"id\": 29222, \
    \"method\": \"eth_sendTransaction\", \
    \"params\": [ \
        { \
            \"from\": \""FROM_ADDRESS"\", \
            \"to\": \""CONTRACT_ADDRESS"\", \
            \"data\": \"0x3eace514";

   char *request_back="\", \
            \"value\": \"0x0\", \
            \"gas\": \""GAS"\" \
          } \
        ] \
      }";

  char *final_body;
  final_body=malloc(sizeof(char)*(strlen(request_front)+strlen(request_back)+strlen(hash)+1));
  memset(final_body,'\0',strlen(request_front)+strlen(request_back)+strlen(hash)+1);
  strcat(final_body,request_front);
  strcat(final_body,hash);
  strcat(final_body,request_back);
  syslog(LOG_DEBUG,"[::> Use Token][Request]: %s\n",final_body);

  char *response;
  response=get_post_result(final_body,"Use Token");
  if(response != NULL){
    syslog(LOG_DEBUG,"[::> Use Token][Response] %s\n",response);
  }else{
    syslog(LOG_DEBUG,"[::> Use Token] Null response received from curl");
  }
}

void lock_system(){

  char *request_data="{ \
    \"jsonrpc\": \"2.0\", \
    \"id\": 342, \
    \"method\": \"eth_sendTransaction\", \
    \"params\": [ \
        { \
            \"from\": \""FROM_ADDRESS"\", \
            \"to\": \""CONTRACT_ADDRESS"\", \
            \"data\": \"0xea944b4c\", \
            \"value\": \"0x0\", \
            \"gas\": \""GAS "\"\
        } \
      ] \
    }";

  syslog(LOG_DEBUG,"[::> Lock System][Request]: %s\n",request_data);
  char *response;
  response=get_post_result(request_data,"Use Token");
  if(response != NULL){
    syslog(LOG_DEBUG,"[::> Lock System][Response]: %s\n",response);   
  }else{
    syslog(LOG_DEBUG,"[::> Lock System] Null response received from curl");
  }
}

void generate_hash(char *temp, char *str){
	sha3_context c;
	const uint8_t *hash;
	sha3_Init256(&c);
	sha3_Update(&c, temp, strlen(temp));
	hash = sha3_Finalize(&c);
	
	int i;
	// str=malloc(sizeof(char)*32);
	for(i=0;i<32;i++){
		sprintf(&str[i*2],"%02x", hash[i]);
	}

	// printf("0x%s\n", str);

	// return str;

	// if(memcmp(hash, "\x4e\x03\x65\x7a\xea\x45\xa9\x4f"
	// 				"\xc7\xd4\x7b\xa8\x26\xc8\xd6\x67"
	// 				"\xc0\xd1\xe6\xe3\x3a\x64\xa0\x36"
	// 				"\xec\x44\xf5\x8f\xa1\x2d\x6c\x45", 256 / 8) != 0) {
	//        printf("Error\n");
	//    }else{
	//    	printf("\ndone");
	//    }
}

char* take_user_input(pam_handle_t *pamh,int flags){
  int retval ;
  char *input ;
  struct pam_message msg[1],*pmsg[1];
  struct pam_response *resp;
  char *retStr;
  
  retStr = malloc(sizeof(char)*32+1);
  memset(retStr,'\0',sizeof(char)*32+1);

  pmsg[0] = &msg[0];
  msg[0].msg_style = PAM_PROMPT_ECHO_ON;
  msg[0].msg = "Enter OTP: ";
  resp = NULL;
  if((retval = converse(pamh, 1 , pmsg, &resp))!=PAM_SUCCESS){
    // if this function fails, make sure that ChallengeResponseAuthentication in sshd_config is set to yes
    syslog(LOG_DEBUG,"[::> Take Input] PAM converse failed: retVal %d",retval);
    return NULL;
  }

  /* retrieving user input */
  if( resp ) {
    syslog(LOG_DEBUG,"[::> Take Input] Conv resp received");
    if( (flags & PAM_DISALLOW_NULL_AUTHTOK) && resp[0].resp == NULL ) {
          syslog(LOG_DEBUG,"[Take Input] PAM Null auth issue ");
          return NULL;
    }
    input = resp[ 0 ].resp;
    syslog(LOG_DEBUG,"[::> Take Input] Input received: %s",input);
    generate_hash(input,retStr);    
    syslog(LOG_DEBUG,"[::> Take Input] Generated Hash: %s",retStr);
    resp[ 0 ].resp = NULL;
    // free(input); #memory leak don't uncomment.
    return retStr;              
  } 
  else
  {
    syslog(LOG_DEBUG,"[::> Take Input] No input received");
    return NULL;
  }
}

char* get_token_list(){
  char *request_token="{ \
    \"jsonrpc\": \"2.0\", \
    \"id\": 6035, \
    \"method\": \"eth_call\", \
    \"params\": [ \
        { \
            \"from\": \""FROM_ADDRESS"\", \
            \"to\": \""CONTRACT_ADDRESS"\", \
            \"data\": \"0x273cbaa0\", \
            \"value\": \"0x0\", \
            \"gas\": \""GAS "\"\
        }, \
        \"latest\" \
    ] \
  }";

  char *response;
  response=get_post_result(request_token,"Get Tokens");
  syslog(LOG_DEBUG,"[::> Get Tokens][Response]: %s\n",response);
  if(response!=NULL){
    const nx_json* json = nx_json_parse(response, 0);
    char *tokenList;
    if (json) {
      syslog(LOG_DEBUG,"[::> Get Tokens][parsed result field]: %s\n",nx_json_get(json, "result")->text_value);
      tokenList=malloc(strlen(nx_json_get(json, "result")->text_value)+1);
      memcpy(tokenList, nx_json_get(json, "result")->text_value, strlen(nx_json_get(json, "result")->text_value)+1 );
      syslog(LOG_DEBUG,"[::> Get Tokens][Token List]: %s\n",tokenList);
    }
    nx_json_free(json);
    free(response);
    return tokenList;
  }else{
    return NULL;
    syslog(LOG_DEBUG,"[::> Get Tokens] NULL Response received from curl");
  }
}


/* expected hook */
PAM_EXTERN int pam_sm_setcred( pam_handle_t *pamh, int flags, int argc, const char **argv ) {
	return PAM_SUCCESS ;
}


/* expected hook, this is where custom stuff happens */
PAM_EXTERN int pam_sm_authenticate( pam_handle_t *pamh, int flags ,int argc, const char **argv ) {

  syslog(LOG_DEBUG,"[::> AUTH] PAM MODULE LOADED");

  if(check_is_revoked()){
    pam_print(pamh,"Access denied. System already revoked, ask the administrator to unlock it.");
    return PAM_AUTH_ERR;
  }
  // else{
  //   pam_print(pamh,"System allowed");
  // }

	curl_global_init(CURL_GLOBAL_ALL);

  char *tokenList;
  tokenList=get_token_list();
  syslog(LOG_DEBUG,"[::> AUTH] Tokens: %s\n",tokenList);
  // pam_print(pamh,"Tokens %s\n",tokenList);

  int retry=0;
  char *genHash;
  for(retry=1;retry<4;retry++){
      genHash=take_user_input(pamh,flags);
      syslog(LOG_DEBUG,"[::> AUTH] Generate hash %s",genHash);
      if(genHash!=NULL){
        
        if(strstr(tokenList,genHash)!= NULL)
        {
          pam_print(pamh,"OTP accepted");
          syslog(LOG_DEBUG,"[::> AUTH] Token match found");
          use_token(genHash);
          return PAM_SUCCESS;
        }
        else
        {
          pam_print(pamh,"Invalid token. retry %d/3",retry);
        }
      }
      else
      {
        syslog(LOG_DEBUG,"[::> AUTH] Generated hash null pointer");
        pam_print(pamh,"Invalid Input");
      }

      if(retry==3){
        pam_print(pamh,"3 Incorrect OTP, locking down system.");
        lock_system();
        
      }
  }
  return PAM_AUTH_ERR;

}
