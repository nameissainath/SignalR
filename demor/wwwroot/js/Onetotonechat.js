"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;
connection.on("ReceiveMessage", function (fromUser, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = fromUser + " says " + msg;
    var li = document.createElement("li");

    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});
connection.on("NewUserRegistered", function (lstUsers) {
    var lst = document.getElementById("lstUsers");
    for (var user in lstUsers) {
        if (lstUsers[user] !== document.getElementById("fromUserName").value) {
            var option = document.createElement("option");
            option.text = lstUsers[user];
            lst.options.add(option);
        }
    }
});
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});
document.getElementById("registerButton").addEventListener("click", function (event) {
    alert("user registred");
    var user = document.getElementById("fromUserName").value;
    connection.invoke("RegisterMe", user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("sendButton").addEventListener("click", function (event) {
    var fromUser = document.getElementById("fromUserName").value;
    var toUser = document.getElementById("lstUsers").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", fromUser, toUser, message).catch(function (err) {
        return console.error(err.toString());

    });
    event.preventDefault();
});