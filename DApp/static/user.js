window.addEventListener('load', function() {
    alertify.set('notifier','delay', 4);
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!')
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

});

var eth2fa = web3.eth.contract([{"anonymous": false, "inputs": [{"indexed": true, "name": "sender", "type": "address"}, {"indexed": false, "name": "status", "type": "bool"}, {"indexed": false, "name": "msg", "type": "string"} ], "name": "isStaffEvent", "type": "event"}, {"constant": false, "inputs": [{"name": "index", "type": "uint256"} ], "name": "approveSystemRequest", "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "string"} ], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "system_addr", "type": "address"}, {"name": "hash", "type": "bytes32"} ], "name": "generateOTP", "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "string"} ], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [], "name": "lockSystem", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "name", "type": "string"}, {"name": "addr", "type": "address"} ], "name": "registerDevice", "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "string"} ], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "sender", "type": "address"}, {"indexed": false, "name": "status", "type": "bool"} ], "name": "unlockSystemEvent", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "sender", "type": "address"}, {"indexed": false, "name": "status", "type": "bool"}, {"indexed": false, "name": "msg", "type": "string"} ], "name": "approveSystemRequestEvent", "type": "event"}, {"constant": false, "inputs": [{"name": "name", "type": "string"}, {"name": "addr", "type": "address"} ], "name": "registerUser", "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "string"} ], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "sender", "type": "address"}, {"indexed": false, "name": "status", "type": "bool"}, {"indexed": false, "name": "msg", "type": "string"} ], "name": "requestSystemAccessEvent", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "sender", "type": "address"}, {"indexed": false, "name": "status", "type": "bool"}, {"indexed": false, "name": "msg", "type": "string"} ], "name": "isUserEvent", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "sender", "type": "address"}, {"indexed": false, "name": "status", "type": "bool"}, {"indexed": false, "name": "msg", "type": "string"} ], "name": "registerUserEvent", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "sender", "type": "address"}, {"indexed": false, "name": "status", "type": "bool"}, {"indexed": false, "name": "msg", "type": "string"} ], "name": "registerDeviceEvent", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "sender", "type": "address"}, {"indexed": false, "name": "status", "type": "bool"}, {"indexed": false, "name": "msg", "type": "string"} ], "name": "generateOTPEvent", "type": "event"}, {"constant": false, "inputs": [{"name": "addr", "type": "address"} ], "name": "requestSystemAccess", "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "string"} ], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {"constant": false, "inputs": [{"name": "addr", "type": "address"} ], "name": "unlockSystem", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "hash", "type": "bytes32"} ], "name": "useToken", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "getCurrentUserRequests", "outputs": [{"name": "", "type": "uint256[]"}, {"name": "", "type": "address[]"}, {"name": "", "type": "address[]"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getMySystemList", "outputs": [{"name": "", "type": "bytes32[]"}, {"name": "", "type": "address[]"}, {"name": "", "type": "uint256[]"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getRevokedSystemList", "outputs": [{"name": "", "type": "bytes32[]"}, {"name": "", "type": "address[]"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getSystemList", "outputs": [{"name": "", "type": "bytes32[]"}, {"name": "", "type": "address[]"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "addr", "type": "address"} ], "name": "getSystemName", "outputs": [{"name": "", "type": "string"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getTokenList", "outputs": [{"name": "", "type": "bytes32[]"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getUserList", "outputs": [{"name": "", "type": "bytes32[]"}, {"name": "", "type": "address[]"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "addr", "type": "address"} ], "name": "getUserName", "outputs": [{"name": "", "type": "string"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "addr", "type": "address"} ], "name": "getUsersOfSystem", "outputs": [{"name": "", "type": "address[]"}, {"name": "", "type": "bytes32[]"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "isSystemRevoked", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "addr", "type": "address"} ], "name": "staffExist", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "addr", "type": "address"} ], "name": "systemExist", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"name": "addr", "type": "address"} ], "name": "userExist", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "view", "type": "function"} ]);
var eth2fa_obj = eth2fa.at('0xa149588c43c450be631b17fb860c3c936eacae26');

var generateOTPEventEv = eth2fa_obj.generateOTPEvent({},{fromBlock: 'latest', toBlock: 'latest'});
generateOTPEventEv.watch(function(error, result) {
    if (!error) {
        console.log(result);
        if (result.args.status){
            alertify.success(result.args.msg);
        }else{
            alertify.error(result.args.msg);
        }
    } else {
        console.log('OTP watch error');
        console.log(error);
    }
});

var requestSystemAccessEv = eth2fa_obj.requestSystemAccessEvent({}, {toBlock: 'latest'});
requestSystemAccessEv.watch(function(error, result) {
    if (!error) {
        console.log(result);
        if (result.args.status){
            alertify.success(result.args.msg);
        }else{
            alertify.error(result.args.msg);
        }
    } else {
        console.log('requestsystem access watch error');
        console.log(error);
    }
});

var isUserEv = eth2fa_obj.isUserEvent({}, {toBlock: 'latest'});
isUserEv.watch(function(error, result) {
    if (!error) {
        alertify.error(result.args.msg);
        console.log(result);
    } else {
        console.log('isUserEvent access watch error');
        console.log(error);
    }
});

var isStaffEv = eth2fa_obj.isStaffEvent({}, {toBlock: 'latest'});
isStaffEv.watch(function(error, result) {
    if (!error) {
        alertify.error(result.args.msg);
        console.log(result);
    } else {
        console.log('isStaffEvent access watch error');
        console.log(error);
    }
});



$('#pushsystems').hide();
$('#otp').hide();

$('#currentsystems').click(function() {
    $('#pushsystems').show();
    $('#otp').hide();
})

$('#otpgeneration').click(function() {
    $('#pushsystems').hide();
    $('#otp').show();
})

$("#searchbtn").click(function() {
    $("#inputbutton").attr('placeholder', $(this).data('hint'))
});
$('.ui.accordion').accordion();
$('.top.menu .item').tab();
$('.ui.dropdown')
    .dropdown();

// My Systems Getter
$('#currentsystems').click(function() {
    /*var systemName = $('#systemName').val();
    systemName = web3.toAscii(systemName);
    var systemAddress = $('#systemAddress').val();*/

    eth2fa_obj.getMySystemList(function(err, result) {
        if (!err) {
            $("#mysystems  > tbody").html("");
            var systemNames = result[0];
            var systemAddresses = result[1];
            var rowCount = systemNames.length;

            for (var i = 0; i < rowCount; i++) {
                var row = `<tr>
                    <td>` + web3.toAscii(systemNames[i]) + `</td>
                    <td>` + systemAddresses[i] + `</td>
                </tr>`;

                $("#mysystems").append(row);
            }
        } else {
            console.log(err);
        }

    });
});

// All Systems Getter
$('#currentsystems').click(function() {
    var systemName = $('#systemName').val();
    var systemAddress = $('#systemAddress').val();

    eth2fa_obj.getSystemList(function(err, result) {
        if (!err) {
            $("#remainingsystems  > tbody").html("");
            var systemNames = result[0];
            var systemAddresses = result[1];
            var rowCount = systemNames.length;

            for (var i = 0; i < rowCount; i++) {
                var row = `<tr><td class="collapsing">
                        <div class="ui fitted slider checkbox">
                            <input type="checkbox">
                            <label></label>
                        </div>
                    </td>
                    <td>` + web3.toAscii(systemNames[i]) + `</td>
                    <td>` + systemAddresses[i] + `</td></tr>`;

                $("#remainingsystems").append(row);
            }
        } else {
            console.log(err);
        }

    });
});

// All Systems Request Setter
$('#requestsystems').click(function() {
    /*$('#requesttable tbody tr').each(function() {
        $(this).find('td').each(function(index) {
            if ($(this).is(":checked")) {
                console.log('here');
            }
        })
    });*/

    $('#remainingsystems tr').filter(':has(:checkbox:checked)').each(function(index) {
        console.log('here');
        var systemname;
        var systemadd;
        $(this).find('td').each(function(index) {
            if (index == 1) {
                systemname = $(this).html();
            } else if (index == 2) {
                systemadd = $(this).html();
            }
        })
        console.log(systemname);
        console.log(systemadd);

        eth2fa_obj.requestSystemAccess(systemadd, function(err, result) {
            if (!err) {
                // Request System Access Event Watcher

            } else {
                console.log(err);
            }
        });
    });

});

// System Dropdown Getter
$('#otpgeneration').click(function() {
    eth2fa_obj.getMySystemList(function(err, result) {
        if (!err) {
            var systemNames = result[0];
            var systemAddresses = result[1];
            var rowCount = systemNames.length;
            $("#systemDrop").html("");
            for (let i = 0; i < rowCount; i++) {
                eth2fa_obj.getSystemName(systemAddresses[i],function(error,result){
                    // console.log(result);
                    var row = `<option name="`+systemAddresses[i]+`" value="1">` + result + `</option>`;
                    $("#systemDrop").append(row);
                });
            }
            //console.log($('#systemDrop option:selected').text());
        } else {
            console.log(err);
        }
    });
});

// OTP generation setter
$('#Set').click(function() {
    //console.log($('#systemDrop option:selected').text());
    var otp = Math.floor(100000 + Math.random() * 900000);
    //console.log(otp);
    $('#otparea').val(otp);
});

// OTP generation setter
$('#Reset').click(function() {
    $('#otparea').val('');
});

// Insert blockchain setter
$('#Insert').click(function() {
    var systemAddress = $('#systemDrop option:selected').attr('name');
    console.log(systemAddress);
    var otp = $('#otparea').val();
    //var hash = sha256(otp);

    //hash = "0x" + hash.toString()
    //hash = web3.toHex(hash);

    //console.log(hash);
    // var hash;
    // hash web3.sha3(otp,function(err,result){
    //     if(!err){
    //         console.log(result);
    //         hash=result;
    //     }
    // });

    // console.log(hash); // "0xed973b234cf2238052c9ac87072c71bcf33abc1bbd721018e0cca448ef79b379"

    // var hashOfHash = web3.sha3(hash, { encoding: 'hex' });
    // console.log(hashOfHash); // "0x85dd39c91a64167ba20732b228251e67caed1462d4bcf036af88dc6856d0fdcc"

    eth2fa_obj.generateOTP(systemAddress, web3.sha3(otp), function(err, result) {
        if (!err) {
            console.log('success');

            return;
        } else {
            console.log(err);
        }
    });

});