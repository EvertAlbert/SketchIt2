document.addEventListener("DOMContentLoaded", init);

let allMessages = [];
let chat = document.querySelector(".chatMessages");
let username = 'test';
let connectedUsers = [];
let userId = 1;
let winner = 1;

let randomWord = "test";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function init() {
    document.querySelector(".messageSubmit").addEventListener("click", function (e) {
            e.preventDefault();
            const message = document.querySelector(".messageInput").value;

            if (message === randomWord) {
                let cmd = {"action": "rightGuess_" + userId};
                let cmdAsString = JSON.stringify(cmd);
                webSocket.send(cmdAsString);
                incrScore(userId);
            }
            document.querySelector(".messageInput").value = "";
            let cmd = {"action": "chat", "message": message, "user": username};
            let cmdAsString = JSON.stringify(cmd);
            webSocket.send(cmdAsString);
        }
    );
    allowDraw();
}

function incrScore(user) {
    let cmd = {"action": "incr_" + user};
    let cmdAsString = JSON.stringify(cmd);
    webSocket.send(cmdAsString);
}

function assignWinner(scoreArray) {
    let highestScore = 0;
    for (let i = 1; i < scoreArray.length; i++) {
        if (scoreArray[i] >= highestScore) {
            if (document.querySelector(".crown") != null) {
                document.querySelector("#" + connectedUsers[winner]).removeChild(document.querySelector(".crown"));
            }
            winner = i;
            highestScore = scoreArray[i];
        }
    }
    let winnerUsername = connectedUsers[winner];

    //<img src="{{url("/images/crown.png")}}" class="crown" alt="crown">
    let crown = document.createElement("IMG");
    crown.setAttribute("src", "../images/crown.png");
    crown.setAttribute("class", "crown");
    crown.setAttribute("alt", "crown");
    document.getElementById(winnerUsername).appendChild(crown);
}

function fillScores(scoreArray) {
    let scoreElements = document.getElementsByClassName("score");

    for (let i = 0; i < scoreArray.length - 1; i++) {
        scoreElements[i].innerText = scoreArray[i + 1] + " pts";
    }
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

        switch (jsonObject[0]) {
            case "gamer":
                connectedUsers = jsonObject;
                fillUserList();
                assignUserId();
                break;
            case "score":
                fillScores(jsonObject);
                assignWinner(jsonObject);
                break;
            case "userId":
                userId = jsonObject[1];
                break;
            case "drawer":
                if (userId === jsonObject[1]) {
                    allowDraw();
                } else {
                    disableDraw();
                }

                allMessages.push("<li>" + connectedUsers[jsonObject[1]] + " is drawing </li>");
                for (let i in allMessages) {
                    gameMessageString = gameMessageString + allMessages[i];
                    chat.innerHTML = gameMessageString;
                }
                updateScroll();
                break;
            case "word":
                randomWord = jsonObject[1];
                document.querySelector(".wordField").innerText = "Draw: " + jsonObject[1];
                break;
        }

        switch (action) {
            case "chat":
                if (message === randomWord) {
                    allMessages.push("<li>" + jsonObject.user + " guessed the word!</li>");
                } else {
                    allMessages.push("<li>" + jsonObject.user + ": " + message + "</li>");
                }
                for (let i in allMessages) {
                    gameMessageString = gameMessageString + allMessages[i];
                    chat.innerHTML = gameMessageString;
                }
                updateScroll();
                break;
            case "start":
                ctx.beginPath();
                break;
            case "draw":
                ctx.lineTo(jsonObject.x, jsonObject.y);
                ctx.stroke();
                break;
            case "reset":
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                break;
            case "color":
                ctx.strokeStyle = jsonObject.colorValue;
                break;
        }

    });

function fillUserList() {
    let userList = document.getElementById("userList");
    while (userList.firstChild) {
        userList.removeChild(userList.firstChild);
    }

    for (let curUser = 1; curUser < connectedUsers.length; curUser++) {

        let userLi = document.createElement("LI");
        userLi.setAttribute("id", connectedUsers[curUser]);
        document.getElementById("userList").appendChild(userLi);

        let userP = document.createElement("p");
        let text = document.createTextNode(connectedUsers[curUser]);
        userP.setAttribute("class", "profilePicture");
        userP.appendChild(text);
        userLi.appendChild(userP);

        let userP2 = document.createElement("p");
        let scoreText = document.createTextNode("0 pts");
        userP2.setAttribute("class", "score");
        userP2.appendChild(scoreText);
        userLi.appendChild(userP2);
    }
}

function assignUserId() {
    userId = connectedUsers.indexOf(username);
}

function allowDraw() {
    document.querySelector(".canvasCover").style.display = "none";
    document.querySelector(".wordField").style.display = "inline-block";
    document.querySelector(".colors").style.display = "flex";
    document.querySelector(".messagInputForm").style.display = "none";

    const red = document.getElementById("red");
    const green = document.getElementById("green");
    const blue = document.getElementById("blue");
    const black = document.getElementById("black");
    const yellow = document.getElementById("yellow");

    const resetButton = document.getElementById("resetCanvas");

    let mouse = {x: 0, y: 0};

    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    let drawing = false;

    canvas.width = 800;
    canvas.height = 550;
    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

        if (drawing) {
            sendMousePos("draw", mouse)
        }
    }, false);

    canvas.addEventListener('mousedown', function (e) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        canvas.addEventListener('mousemove', onPaint, false);

        drawing = true;
        sendMousePos("start", mouse)
    }, false);

    canvas.addEventListener('mouseup', function () {
        canvas.removeEventListener('mousemove', onPaint, false);
        drawing = false;
    }, false);

    function onPaint() {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }

    red.addEventListener('click', changeColor);
    green.addEventListener('click', changeColor);
    blue.addEventListener('click', changeColor);
    black.addEventListener('click', changeColor);
    yellow.addEventListener('click', changeColor);
    resetButton.addEventListener('click', clearCanvas);
}

function disableDraw() {
    clearCanvas();
    changeColor();
    document.querySelector(".canvasCover").style.display = "inline-block";
    document.querySelector(".wordField").style.display = "none";
    document.querySelector(".colors").style.display = "none";
    document.querySelector(".messagInputForm").style.display = "flex";

}

function changeColor() {
    let selectedColor = this.id;
    let colorVal;
    switch (selectedColor) {
        case "red":
            colorVal = "#ff0000";
            break;
        case "green":
            colorVal = "#00ff00";
            break;
        case "blue":
            colorVal = "#0000ff";
            break;
        case "yellow":
            colorVal = "#ffff00";
            break;
        case "black":
            colorVal = "#000000";
            break;
        default:
            colorVal = "#000000";
    }

    ctx.strokeStyle = colorVal;
    webSocket.send(JSON.stringify({"action": "color", "colorValue": colorVal}))
}

function clearCanvas(e) {
    webSocket.send(JSON.stringify({"action": "reset"}));
}

function sendMousePos(action, mouse) {
    let cmd = {"action": action, "x": mouse.x, "y": mouse.y};
    let cmdAsString = JSON.stringify(cmd);
    webSocket.send(cmdAsString);
}

function updateScroll(){
    chat.scrollTop = chat.scrollHeight;
}
