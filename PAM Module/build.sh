gcc -fPIC -lcurl -c 2ndfactor.c
sudo ld -lcurl -x --shared -o /lib/security/2ndfactor.so 2ndfactor.o
/etc/init.d/ssh restart
