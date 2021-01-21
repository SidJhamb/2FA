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

//var eth2fa_obj = eth2fa.at('0x15441aac112fbf0d8669b44ff38950f2597ada20');
//console.log(eth2fa_obj);
//var childs = '';
//var childs1 = '';

var registerDeviceEv = eth2fa_obj.registerDeviceEvent({}, { toBlock: 'latest' });
registerDeviceEv.watch(function(error, result) {
    if (!error) {
        console.log(result);
        if (result.args.status){
            alertify.success(result.args.msg);
        }else{
            alertify.error(result.args.msg);
        }
    } else {
        console.log('registerDeviceEvent watch error');
        console.log(error);
    }
});

var registerUserEv = eth2fa_obj.registerUserEvent({}, { toBlock: 'latest'});
registerUserEv.watch(function(error, result) {
    if (!error) {
        console.log(result);
        if (result.args.status){
            alertify.success(result.args.msg);
        }else{
            alertify.error(result.args.msg);
        }
    } else {
        console.log('registerUserEvent watch error');
        console.log(error);
    }
});

var approveRequestEv = eth2fa_obj.approveSystemRequestEvent({}, { toBlock: 'latest' });
approveRequestEv.watch(function(error, result) {
    if (!error) {
        console.log(result);
        if (result.args.status){
            alertify.success(result.args.msg);
        }else{
            alertify.error(result.args.msg);
        }
    } else {
        console.log('approveSystemRequest watch error');
        console.log(error);
    }
});

var unlockEv = eth2fa_obj.unlockSystemEvent({}, { toBlock: 'latest' });
unlockEv.watch(function(error,result){
    if(!error){
        console.log(result);
        if(result.args.status){
            alertify.success("Device unlocked");
        }
    }else{
        console.log('unlockEv watch error');
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

var isStaffEv = eth2fa_obj.isStaffEvent({}, {fromblock:'latest', toBlock: 'latest'});
isStaffEv.watch(function(error, result) {
    if (!error) {
        alertify.error(result.args.msg);
        console.log(result);
    } else {
        console.log('isStaffEvent access watch error');
        console.log(error);
    }
});

$('#toggle').click(function() {
    $('.ui.sidebar').sidebar('toggle');
});


$('#pushregisterdevice').hide();
$('#pushregisteruser').hide();
$('#pushrequests').hide();
$('#pushsystems').hide();

$('#registersystem').click(function() {
    $('#pushregisterdevice').show();
    $('#pushregisteruser').hide();
    $('#pushrequests').hide();
    $('#pushsystems').hide();
});

$('#registeruser').click(function() {
    $('#pushregisterdevice').hide();
    $('#pushregisteruser').show();
    $('#pushrequests').hide();
    $('#pushsystems').hide();
});

$('#currentrequests').click(function() {
    $('#pushregisterdevice').hide();
    $('#pushregisteruser').hide();
    $('#pushrequests').show();
    $('#pushsystems').hide();
});

$('#currentsystems').click(function() {
    $('#pushregisterdevice').hide();
    $('#pushregisteruser').hide();
    $('#pushrequests').hide();
    $('#pushsystems').show();
});

$('.ui.accordion').accordion();
$('.top.menu .item').tab();

// Register Device Setter
$('#registerDevice').click(function(submitevent) {
    submitevent.preventDefault();
    var systemName = $('#systemName').val();
    var systemAddress = $('#systemAddress').val().toLowerCase();;

    eth2fa_obj.registerDevice(systemName, systemAddress, {
        gas: 3000000
    }, function(err, txn) {
        if (!err) {
            $('#systemName').value = '';
            $('#systemAddress').value = '';
            console.log('[Register device] call success');
        } else {
            $('#systemName').value = '';
            $('#systemAddress').value = '';
            console.log('[Register device] call error');
            console.log(err);
        }
    });

    $('#systemName').val('');
    $('#systemAddress').val('');
})

// Register User Setter
$('#registerUser').click(function(submitevent) {
    submitevent.preventDefault();
    var userName = $('#userName').val();
    var userAddress = $('#userAddress').val().toLowerCase();

    eth2fa_obj.registerUser(userName, userAddress, function(err, txn) {
        if (!err) {
            $('#userName').val = '';
            $('#userAddress').val = '';
            console.log('[Register User] call success');
        } else {
            $('#userName').val = '';
            $('#userAddress').val = '';
            console.log('[Register User] call error');
            console.log(err);
        }
    });

    $('#userName').val('');
    $('#userAddress').val('');
})

// Current Requests Getter
$('#requestSync').click(function() {
    console.log('request sync click')
    eth2fa_obj.getCurrentUserRequests(function(error, result) {
        if (!error) {
            console.log('[Current requests] result');
            console.log(result);
            var requestIndices = result[0];
            var requestorAddresses = result[1];
            var systemAddresses = result[2];

            var newIndices=[];

            origLength=requestorAddresses.length;

            for(var i=0;i<requestorAddresses.length;i++){
                newIndices.push(requestIndices[i]['c'][0]);
            }
            console.log(newIndices);

            var requestorName=Array(requestorAddresses.length).fill('');
            var systemName=Array(systemAddresses.length).fill('');
            
            
            $("#requesttable > tbody").html("");
            var rowCount = requestorAddresses.length;

            for (var i = 0; i < rowCount; i++) {
                var row = `<tr class="requestrow"><td class="collapsing"><div class="ui fitted slider checkbox">\
                                    <input type="checkbox"><label></label>\
                                    </div>\
                                    </td>\
                                    <td>` + newIndices[i] + `</td>\
                                    <td>` +requestorAddresses[i]+ `</td>\
                                    <td>` +systemAddresses[i]+ `</td>\
                                    </tr>)`;

                //console.log(i + ": " + row);
                if(requestorAddresses[i]!='0x0000000000000000000000000000000000000000' && systemAddresses[i]!='0x0000000000000000000000000000000000000000'){
                    $("#requesttable").append(row);
                }
            }

            $('#requesttable tr').each(function(index) {
                var requestindex;
                $(this).find('td').each(function(index) {
                    if (index == 2) {
                        var colRef=$(this);
                        // console.log($(this).html());
                        eth2fa_obj.getUserName(colRef.html(),function(error,result){
                            if(!error){
                                console.log(result);
                                colRef.text(result+' ('+colRef.html()+')');
                            }
                        });
                    }
                    if (index == 3) {
                        var colRef2=$(this);
                        // console.log($(this).html());
                        eth2fa_obj.getSystemName(colRef2.html(),function(error,result){
                            if(!error){
                                console.log(result);
                                colRef2.text(result+' ('+colRef2.html()+')');
                            }
                        });
                    }
                });
            });




            //console.log(requestorAddresses);

            /*$('.requestrow').each(function(index) {
                $(this).find('td').each(function(index) {
                    if (index > 0) {
                        $(this).text(requestIndices[index - 1]);
                    }
                })
            });*/
            

        } else {
            console.log('[Current requests] call error');
            console.log(error);
        }
    });
});

// System Status Getter
$('#currentsystems').click(function() {
    eth2fa_obj.getSystemList(function(error, result) {
        if (!error) {
            $("#systemlist").html("");
            var systemNames = result[0];
            var systemAddress = result[1];
            var rowCount = systemNames.length;

            systemAddress.forEach(function(systemAddress, index, array) {
                var childs;
                var childs1;

                eth2fa_obj.getUsersOfSystem(systemAddress, function(error, result) {
                    if (!error) {
                        // Array of user addresses tied to the given system address
                        var userAddress = result[0];
                        var userNames = result[1];
                        //console.log(systemAddress[i]);
                        var userCount = userAddress.length;
                        //console.log(userCount);
                        //var userNames = [];

                        childs = `<div class="content">
                                <table class="ui striped table">
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>User Address</th>
                                    </tr>
                                </thead>
                                <tbody>`;

                        console.log(systemAddress);
                        var row = `<div class="title">
                            <i class="dropdown icon"></i>` + systemAddress +
                            `</div>`;

                        for (var w = 0; w < userCount; w++) {
                            childs += `<tr>
                                            <td>` + web3.toAscii(userNames[w]) + `</td>
                                            <td>` + userAddress[w] + `</td>
                                            </tr>`;
                        };

                        //childs = childs + childs1;

                        childs += `</tbody>
                                </table>
                                </div>`;

                        $("#systemlist").append(row + childs);
                        //console.log(systemAddress[i]);

                    } else {
                        console.log(error);
                    }
                });

                //console.log(childs);


                //$("#systemlist").append(row + childs);
            });
        } else {
            console.log("[current systems] call error");
            console.log(error);
        }
    });
});

// Current Requests Approve Setter
$('#approverequests').click(function() {
    /*$('#requesttable tbody tr').each(function() {
        $(this).find('td').each(function(index) {
            if ($(this).is(":checked")) {
                console.log('here');
            }
        })
    });*/

    $('#requesttable tr').filter(':has(:checkbox:checked)').each(function(index) {
        console.log('here');
        var requestindex;
        $(this).find('td').each(function(index) {
            if (index == 1) {
                requestindex = $(this).html();
            }
        })
        console.log(requestindex);

        eth2fa_obj.approveSystemRequest(requestindex, {
            gas: 3000000
        }, function(err, result) {
            if (!err) {
                console.log('[Approve System request] success call');
            } else {
                console.log('[Approve System request] error call');
                console.log(err);
            }
        });
    });

});

// Revoked Systems Getter
$('#currentsystems').click(function() {
    eth2fa_obj.getRevokedSystemList(function(error, result) {
        if (!error) {
            var revokedSystemNames = result[0];
            var revokedSystemAddress = result[1];
            console.log('[getRevokedSystemList] result');
            console.log(result);
            $("#revokedSystemlist > tbody").html("");
            var rowCount = revokedSystemNames.length;

            for (var i = 0; i < rowCount; i++) {

                if(revokedSystemAddress[i] != '0x0000000000000000000000000000000000000000'){
                    var row = `<tr>
                                <td class="collapsing">
                                    <div class="ui fitted slider checkbox">
                                        <input type="checkbox">
                                        <label></label>
                                    </div>
                                </td>
                                <td>` + web3.toAscii(revokedSystemNames[i]) + `</td>
                                <td>` + revokedSystemAddress[i] + `</td>
                            </tr>`;

                    $("#revokedTable").append(row);
                }
            }


        } else {
            console.log(error);
        }

    });
});

$('#currentsystems').click(function(){
    eth2fa_obj.getUserList(function(err, result) {
        if (!err) {
            $("#UserList  > tbody").html("");
            var userNames = result[0];
            var userAddresses = result[1];
            var rowCount = userNames.length;

            for (var i = 0; i < rowCount; i++) {
                var row = `<tr>
                    <td>` + web3.toAscii(userNames[i]) + `</td>
                    <td>` + userAddresses[i] + `</td>
                </tr>`;

                $("#UserList").append(row);
            }
        } else {
            console.log(err);
        }
    });
});

// Unlock System Setter
$('#unlocksystem').click(function() {
    /*$('#requesttable tbody tr').each(function() {
        $(this).find('td').each(function(index) {
            if ($(this).is(":checked")) {
                console.log('here');
            }
        })
    });*/

    $('#revokedSystemlist tr').filter(':has(:checkbox:checked)').each(function(index) {
        console.log('here');
        var systemAddress;
        $(this).find('td').each(function(index) {
            if (index == 2) {
                systemAddress = $(this).html();
            }
        })
        console.log(systemAddress);

        eth2fa_obj.unlockSystem(systemAddress, {
            gas: 3000000
        }, function(err, result) {
            if (!err) {
                console.log('[unlockSystem] call success');
            } else {
                console.log('[unlockSystem] call error');
                console.log(err);
            }
        });
    });

});