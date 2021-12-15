document.addEventListener("DOMContentLoaded", init);

let chat = document.querySelector("#chatList");
let allMessages = [];

function init() {
    document.querySelector(".messageSubmit").addEventListener("click", function (e) {
            e.preventDefault();
            const message = document.querySelector(".messageInput").value;

            document.querySelector(".messageInput").value = "";
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
        let message = {
            'action': 'username_' + username
        };
        webSocket.send(JSON.stringify(message));
        console.log("websocket connected");
    });

webSocket.addEventListener("close",
    e => {
        console.log("websocket disconnected");
    });

webSocket.addEventListener("message",
    e => {
        let jsonObject = JSON.parse(e.data);
        let action = jsonObject.action;
        let message = jsonObject.message;
        let gameMessageString = "";

        switch (action) {
            case "chat":
                allMessages.push("<li>" + jsonObject.user + ": " + message + "</li>");

                for (let i in allMessages) {
                    gameMessageString = gameMessageString + allMessages[i];
                    chat.innerHTML = gameMessageString;
                }
                updateScroll();
                break;
        }

    }
);

function updateScroll(){
    chat.scrollTop = chat.scrollHeight;
}


