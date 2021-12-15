document.addEventListener("DOMContentLoaded", init);

let chat = document.querySelector("#chatList");
let messageInput = document.querySelector(".messageInput");
let messageSubmit = document.querySelector(".messageSubmit");
let allMessages = [];

function init() {
    messageSubmit.addEventListener("click", function (e) {
            e.preventDefault();
            const message = messageInput.value;

            messageInput.value = "";
            let cmd = {"action": "chat", "message": message, "user": username};
            let cmdAsString = JSON.stringify(cmd);
            webSocket.send(cmdAsString);
        }
    );
}

//CONNECTION TO SERVER

let webSocket = new WebSocket("ws://localhost:1234");
let message;

webSocket.addEventListener("open",
    e => {
        displayChatMessage("<li>Welcome " + username +"!</li>")
        let message = {
            'action': 'username_' + username
        };
        webSocket.send(JSON.stringify(message));
        console.log("websocket connected");
    });

webSocket.addEventListener("close",
    e => {
        displayChatMessage("<li class='warningText'>" +
            "<p>Connection to chat lost</p>" +
            "</li>"
        );

        console.log("websocket disconnected");
    });

webSocket.addEventListener("message",
    e => {
        let jsonObject = JSON.parse(e.data);
        let action = jsonObject.action;
        let message = jsonObject.message;
        let user = jsonObject.user;

        switch (action) {
            case "chat":
                displayChatMessage(message, user);
                break;
        }

    }
);

const displayChatMessage = (message, user='') => {
    let gameMessageString = "";

    if (user !== '') {
        allMessages.push("<li>" + user + ": " + message + "</li>");
    } else {
        allMessages.push(message);
    }

    for (let i in allMessages) {
        gameMessageString = gameMessageString + allMessages[i];
        chat.innerHTML = gameMessageString;
    }
    updateScroll();
}

function updateScroll(){
    chat.scrollTop = chat.scrollHeight;
}


