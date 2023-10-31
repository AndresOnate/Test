var app = (function () {

    var stompClient = null;
    var listenersAdded = false;
    var currentWord = "Galaxia";
    const userWord = document.getElementById("userWord");


    var getMousePosition = function (evt) {
        canvas = document.getElementById("canvas");
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    };

    var getMousePositionWithPage = function (evt) {
        canvas = document.getElementById("canvas");
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.pageX - rect.left,
            y: evt.pageY - rect.top
        };
    };

    var displayCurrentWord = function () {
        var currentWordContainer = document.getElementById("currentWordContainer");
        currentWordContainer.textContent = currentWord;
    };

    var requestCurrentWord = function () {
        stompClient.send("/app/showCurrentWord", {}, "");
    };

    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/catchword', function (eventbody) {
                var theObject=JSON.parse(eventbody);
                console.log(theObject);

            });
            stompClient.subscribe('/topic/showCurrentWord', function (eventbody) {
                currentWord = eventbody.body;
                displayCurrentWord();
            });
            requestCurrentWord();
        });
    };
    
    
    return {
        addListeners: function () {
            document.addEventListener("keydown", function(event) {
                if (event.key.length === 1) {
                    // Solo se procesa la entrada si es una letra (no se procesan teclas especiales, números, etc.).
                    const currentWord = userWord.textContent;
                    const newWord = currentWord + event.key;
                    userWord.textContent = newWord;
                } else if (event.key === "Backspace") {
                    // Manejar la tecla de retroceso (Backspace) para borrar la última letra.
                    const currentWord = userWord.textContent;
                    const newWord = currentWord.slice(0, -1); // Elimina el último carácter.
                    userWord.textContent = newWord;
                } else if (event.key === "Enter") {
                    // publicar palabra cuando se presiona Enter.
                    app.publishWrittenWord(userWord.textContent);
                }
            });            
        },

        init: function () {
            if (!listenersAdded) {
                app.addListeners();
                listenersAdded = true;
            }

            //disconnect connection
            app.disconnect();

            //websocket connection
            connectAndSubscribe();

            
        },

        publishWrittenWord: function(writtenWord){
            console.info("The word written is "+ writtenWord);
            //addPointToCanvas(pt);

            //publicar el evento
            stompClient.send("/app/catchword", {}, JSON.stringify(currentWord));
        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            //setConnected(false);
            console.log("Disconnected");
        }
    };

})();

const pixelToAdd = [[{"x":0,"y":0,"color":"transparent"},{"x":1,"y":0,"color":"transparent"},{"x":2,"y":0,"color":"transparent"},{"x":3,"y":0,"color":"#000000"},{"x":4,"y":0,"color":"#000000"},{"x":5,"y":0,"color":"#000000"},{"x":6,"y":0,"color":"#000000"},{"x":7,"y":0,"color":"#000000"},{"x":8,"y":0,"color":"#000000"},{"x":9,"y":0,"color":"#000000"},{"x":10,"y":0,"color":"#000000"},{"x":11,"y":0,"color":"#000000"},{"x":12,"y":0,"color":"#000000"},{"x":13,"y":0,"color":"transparent"},{"x":14,"y":0,"color":"transparent"},{"x":15,"y":0,"color":"transparent"},{"x":0,"y":1,"color":"transparent"},{"x":1,"y":1,"color":"transparent"},{"x":2,"y":1,"color":"#000000"},{"x":3,"y":1,"color":"#c5a487"},{"x":4,"y":1,"color":"#8B5C33"},{"x":5,"y":1,"color":"#8B5C33"},{"x":6,"y":1,"color":"#8B5C33"},{"x":7,"y":1,"color":"#8B5C33"},{"x":8,"y":1,"color":"#8B5C33"},{"x":9,"y":1,"color":"#8B5C33"},{"x":10,"y":1,"color":"#c5a487"},{"x":11,"y":1,"color":"#c5a487"},{"x":12,"y":1,"color":"#c5a487"},{"x":13,"y":1,"color":"#000000"},{"x":14,"y":1,"color":"transparent"},{"x":15,"y":1,"color":"transparent"},{"x":0,"y":2,"color":"transparent"},{"x":1,"y":2,"color":"#000000"},{"x":2,"y":2,"color":"#8B5C33"},{"x":3,"y":2,"color":"#8B5C33"},{"x":4,"y":2,"color":"#c5a487"},{"x":5,"y":2,"color":"#8B5C33"},{"x":6,"y":2,"color":"#8B5C33"},{"x":7,"y":2,"color":"#8B5C33"},{"x":8,"y":2,"color":"#8B5C33"},{"x":9,"y":2,"color":"#8B5C33"},{"x":10,"y":2,"color":"#8B5C33"},{"x":11,"y":2,"color":"#8B5C33"},{"x":12,"y":2,"color":"#c5a487"},{"x":13,"y":2,"color":"#c5a487"},{"x":14,"y":2,"color":"#000000"},{"x":15,"y":2,"color":"transparent"},{"x":0,"y":3,"color":"transparent"},{"x":1,"y":3,"color":"#000000"},{"x":2,"y":3,"color":"#8B5C33"},{"x":3,"y":3,"color":"#8B5C33"},{"x":4,"y":3,"color":"#8B5C33"},{"x":5,"y":3,"color":"#8B5C33"},{"x":6,"y":3,"color":"#8B5C33"},{"x":7,"y":3,"color":"#8B5C33"},{"x":8,"y":3,"color":"#8B5C33"},{"x":9,"y":3,"color":"#8B5C33"},{"x":10,"y":3,"color":"#8B5C33"},{"x":11,"y":3,"color":"#8B5C33"},{"x":12,"y":3,"color":"#8B5C33"},{"x":13,"y":3,"color":"#c5a487"},{"x":14,"y":3,"color":"#000000"},{"x":15,"y":3,"color":"transparent"},{"x":0,"y":4,"color":"transparent"},{"x":1,"y":4,"color":"#000000"},{"x":2,"y":4,"color":"#8B5C33"},{"x":3,"y":4,"color":"#8B5C33"},{"x":4,"y":4,"color":"#8B5C33"},{"x":5,"y":4,"color":"#E7C09D"},{"x":6,"y":4,"color":"#E7C09D"},{"x":7,"y":4,"color":"#E7C09D"},{"x":8,"y":4,"color":"#E7C09D"},{"x":9,"y":4,"color":"#8B5C33"},{"x":10,"y":4,"color":"#E7C09D"},{"x":11,"y":4,"color":"#E7C09D"},{"x":12,"y":4,"color":"#000000"},{"x":13,"y":4,"color":"#000000"},{"x":14,"y":4,"color":"transparent"},{"x":15,"y":4,"color":"transparent"},{"x":0,"y":5,"color":"transparent"},{"x":1,"y":5,"color":"transparent"},{"x":2,"y":5,"color":"#000000"},{"x":3,"y":5,"color":"#8B5C33"},{"x":4,"y":5,"color":"#E7C09D"},{"x":5,"y":5,"color":"#8B5C33"},{"x":6,"y":5,"color":"#8B5C33"},{"x":7,"y":5,"color":"#8B5C33"},{"x":8,"y":5,"color":"#8B5C33"},{"x":9,"y":5,"color":"#E7C09D"},{"x":10,"y":5,"color":"#8B5C33"},{"x":11,"y":5,"color":"#8B5C33"},{"x":12,"y":5,"color":"#000000"},{"x":13,"y":5,"color":"transparent"},{"x":14,"y":5,"color":"transparent"},{"x":15,"y":5,"color":"transparent"},{"x":0,"y":6,"color":"transparent"},{"x":1,"y":6,"color":"transparent"},{"x":2,"y":6,"color":"#000000"},{"x":3,"y":6,"color":"#8B5C33"},{"x":4,"y":6,"color":"#8B5C33"},{"x":5,"y":6,"color":"#E7C09D"},{"x":6,"y":6,"color":"#FFFFFF"},{"x":7,"y":6,"color":"#000000"},{"x":8,"y":6,"color":"#E7C09D"},{"x":9,"y":6,"color":"#E7C09D"},{"x":10,"y":6,"color":"#E7C09D"},{"x":11,"y":6,"color":"#FFFFFF"},{"x":12,"y":6,"color":"#000000"},{"x":13,"y":6,"color":"transparent"},{"x":14,"y":6,"color":"transparent"},{"x":15,"y":6,"color":"transparent"},{"x":0,"y":7,"color":"transparent"},{"x":1,"y":7,"color":"transparent"},{"x":2,"y":7,"color":"#000000"},{"x":3,"y":7,"color":"#8B5C33"},{"x":4,"y":7,"color":"#8B5C33"},{"x":5,"y":7,"color":"#E7C09D"},{"x":6,"y":7,"color":"#000000"},{"x":7,"y":7,"color":"#000000"},{"x":8,"y":7,"color":"#E7C09D"},{"x":9,"y":7,"color":"#E7C09D"},{"x":10,"y":7,"color":"#E7C09D"},{"x":11,"y":7,"color":"#000000"},{"x":12,"y":7,"color":"#000000"},{"x":13,"y":7,"color":"transparent"},{"x":14,"y":7,"color":"transparent"},{"x":15,"y":7,"color":"transparent"},{"x":0,"y":8,"color":"transparent"},{"x":1,"y":8,"color":"transparent"},{"x":2,"y":8,"color":"#000000"},{"x":3,"y":8,"color":"#E7C09D"},{"x":4,"y":8,"color":"#E7C09D"},{"x":5,"y":8,"color":"#E7C09D"},{"x":6,"y":8,"color":"#E7C09D"},{"x":7,"y":8,"color":"#E7C09D"},{"x":8,"y":8,"color":"#E7C09D"},{"x":9,"y":8,"color":"#E7C09D"},{"x":10,"y":8,"color":"#E7C09D"},{"x":11,"y":8,"color":"#E7C09D"},{"x":12,"y":8,"color":"#000000"},{"x":13,"y":8,"color":"transparent"},{"x":14,"y":8,"color":"transparent"},{"x":15,"y":8,"color":"transparent"},{"x":0,"y":9,"color":"transparent"},{"x":1,"y":9,"color":"transparent"},{"x":2,"y":9,"color":"#000000"},{"x":3,"y":9,"color":"#000000"},{"x":4,"y":9,"color":"#000000"},{"x":5,"y":9,"color":"#000000"},{"x":6,"y":9,"color":"#E7C09D"},{"x":7,"y":9,"color":"#E7C09D"},{"x":8,"y":9,"color":"#E7C09D"},{"x":9,"y":9,"color":"#E7C09D"},{"x":10,"y":9,"color":"#E7C09D"},{"x":11,"y":9,"color":"#000000"},{"x":12,"y":9,"color":"#000000"},{"x":13,"y":9,"color":"#000000"},{"x":14,"y":9,"color":"transparent"},{"x":15,"y":9,"color":"transparent"},{"x":0,"y":10,"color":"transparent"},{"x":1,"y":10,"color":"transparent"},{"x":2,"y":10,"color":"#000000"},{"x":3,"y":10,"color":"#EF0033"},{"x":4,"y":10,"color":"#EF0033"},{"x":5,"y":10,"color":"#EF0033"},{"x":6,"y":10,"color":"#000000"},{"x":7,"y":10,"color":"#E7C09D"},{"x":8,"y":10,"color":"#E7C09D"},{"x":9,"y":10,"color":"#000000"},{"x":10,"y":10,"color":"#000000"},{"x":11,"y":10,"color":"#EF0033"},{"x":12,"y":10,"color":"#EF0033"},{"x":13,"y":10,"color":"#EF0033"},{"x":14,"y":10,"color":"#000000"},{"x":15,"y":10,"color":"transparent"},{"x":0,"y":11,"color":"transparent"},{"x":1,"y":11,"color":"#000000"},{"x":2,"y":11,"color":"#EF0033"},{"x":3,"y":11,"color":"#EF0033"},{"x":4,"y":11,"color":"#EF0033"},{"x":5,"y":11,"color":"#EF0033"},{"x":6,"y":11,"color":"#000000"},{"x":7,"y":11,"color":"#E7C09D"},{"x":8,"y":11,"color":"#E7C09D"},{"x":9,"y":11,"color":"#E7C09D"},{"x":10,"y":11,"color":"#000000"},{"x":11,"y":11,"color":"#EF0033"},{"x":12,"y":11,"color":"#EF0033"},{"x":13,"y":11,"color":"#EF0033"},{"x":14,"y":11,"color":"#000000"},{"x":15,"y":11,"color":"transparent"},{"x":0,"y":12,"color":"transparent"},{"x":1,"y":12,"color":"transparent"},{"x":2,"y":12,"color":"#000000"},{"x":3,"y":12,"color":"#000000"},{"x":4,"y":12,"color":"#000000"},{"x":5,"y":12,"color":"#000000"},{"x":6,"y":12,"color":"#EF0033"},{"x":7,"y":12,"color":"#EF0033"},{"x":8,"y":12,"color":"#EF0033"},{"x":9,"y":12,"color":"#EF0033"},{"x":10,"y":12,"color":"#000000"},{"x":11,"y":12,"color":"#000000"},{"x":12,"y":12,"color":"#000000"},{"x":13,"y":12,"color":"#000000"},{"x":14,"y":12,"color":"transparent"},{"x":15,"y":12,"color":"transparent"},{"x":0,"y":13,"color":"transparent"},{"x":1,"y":13,"color":"transparent"},{"x":2,"y":13,"color":"transparent"},{"x":3,"y":13,"color":"#000000"},{"x":4,"y":13,"color":"#EF0033"},{"x":5,"y":13,"color":"#EF0033"},{"x":6,"y":13,"color":"#000000"},{"x":7,"y":13,"color":"#000000"},{"x":8,"y":13,"color":"#000000"},{"x":9,"y":13,"color":"#EF0033"},{"x":10,"y":13,"color":"#000000"},{"x":11,"y":13,"color":"transparent"},{"x":12,"y":13,"color":"transparent"},{"x":13,"y":13,"color":"transparent"},{"x":14,"y":13,"color":"transparent"},{"x":15,"y":13,"color":"transparent"},{"x":0,"y":14,"color":"transparent"},{"x":1,"y":14,"color":"transparent"},{"x":2,"y":14,"color":"transparent"},{"x":3,"y":14,"color":"#000000"},{"x":4,"y":14,"color":"#E7C09D"},{"x":5,"y":14,"color":"#E7C09D"},{"x":6,"y":14,"color":"#000000"},{"x":7,"y":14,"color":"transparent"},{"x":8,"y":14,"color":"#000000"},{"x":9,"y":14,"color":"#E7C09D"},{"x":10,"y":14,"color":"#000000"},{"x":11,"y":14,"color":"transparent"},{"x":12,"y":14,"color":"transparent"},{"x":13,"y":14,"color":"transparent"},{"x":14,"y":14,"color":"transparent"},{"x":15,"y":14,"color":"transparent"},{"x":0,"y":15,"color":"transparent"},{"x":1,"y":15,"color":"transparent"},{"x":2,"y":15,"color":"transparent"},{"x":3,"y":15,"color":"#000000"},{"x":4,"y":15,"color":"#000000"},{"x":5,"y":15,"color":"#000000"},{"x":6,"y":15,"color":"#000000"},{"x":7,"y":15,"color":"transparent"},{"x":8,"y":15,"color":"#000000"},{"x":9,"y":15,"color":"#000000"},{"x":10,"y":15,"color":"#000000"},{"x":11,"y":15,"color":"transparent"},{"x":12,"y":15,"color":"transparent"},{"x":13,"y":15,"color":"transparent"},{"x":14,"y":15,"color":"transparent"},{"x":15,"y":15,"color":"transparent"}]];

const container = document.querySelector('.bottom-pixel-container');

//const pixelDiv = document.getElementById('primerPeleador');
const pixelToChange = [[{"x":0,"y":0,"color":"transparent"},{"x":1,"y":0,"color":"transparent"},{"x":2,"y":0,"color":"transparent"},{"x":3,"y":0,"color":"transparent"},{"x":4,"y":0,"color":"#000000"},{"x":5,"y":0,"color":"#000000"},{"x":6,"y":0,"color":"#000000"},{"x":7,"y":0,"color":"#000000"},{"x":8,"y":0,"color":"#000000"},{"x":9,"y":0,"color":"#000000"},{"x":10,"y":0,"color":"#000000"},{"x":11,"y":0,"color":"#000000"},{"x":12,"y":0,"color":"#000000"},{"x":13,"y":0,"color":"#000000"},{"x":14,"y":0,"color":"transparent"},{"x":15,"y":0,"color":"transparent"},{"x":0,"y":1,"color":"transparent"},{"x":1,"y":1,"color":"transparent"},{"x":2,"y":1,"color":"transparent"},{"x":3,"y":1,"color":"#000000"},{"x":4,"y":1,"color":"#c5a487"},{"x":5,"y":1,"color":"#8B5C33"},{"x":6,"y":1,"color":"#8B5C33"},{"x":7,"y":1,"color":"#8B5C33"},{"x":8,"y":1,"color":"#8B5C33"},{"x":9,"y":1,"color":"#8B5C33"},{"x":10,"y":1,"color":"#8B5C33"},{"x":11,"y":1,"color":"#c5a487"},{"x":12,"y":1,"color":"#c5a487"},{"x":13,"y":1,"color":"#c5a487"},{"x":14,"y":1,"color":"#000000"},{"x":15,"y":1,"color":"transparent"},{"x":0,"y":2,"color":"transparent"},{"x":1,"y":2,"color":"transparent"},{"x":2,"y":2,"color":"#000000"},{"x":3,"y":2,"color":"#8B5C33"},{"x":4,"y":2,"color":"#8B5C33"},{"x":5,"y":2,"color":"#c5a487"},{"x":6,"y":2,"color":"#8B5C33"},{"x":7,"y":2,"color":"#8B5C33"},{"x":8,"y":2,"color":"#8B5C33"},{"x":9,"y":2,"color":"#8B5C33"},{"x":10,"y":2,"color":"#8B5C33"},{"x":11,"y":2,"color":"#8B5C33"},{"x":12,"y":2,"color":"#8B5C33"},{"x":13,"y":2,"color":"#c5a487"},{"x":14,"y":2,"color":"#c5a487"},{"x":15,"y":2,"color":"#000000"},{"x":0,"y":3,"color":"transparent"},{"x":1,"y":3,"color":"transparent"},{"x":2,"y":3,"color":"#000000"},{"x":3,"y":3,"color":"#8B5C33"},{"x":4,"y":3,"color":"#8B5C33"},{"x":5,"y":3,"color":"#8B5C33"},{"x":6,"y":3,"color":"#8B5C33"},{"x":7,"y":3,"color":"#8B5C33"},{"x":8,"y":3,"color":"#8B5C33"},{"x":9,"y":3,"color":"#8B5C33"},{"x":10,"y":3,"color":"#8B5C33"},{"x":11,"y":3,"color":"#8B5C33"},{"x":12,"y":3,"color":"#8B5C33"},{"x":13,"y":3,"color":"#8B5C33"},{"x":14,"y":3,"color":"#c5a487"},{"x":15,"y":3,"color":"#000000"},{"x":0,"y":4,"color":"transparent"},{"x":1,"y":4,"color":"transparent"},{"x":2,"y":4,"color":"#000000"},{"x":3,"y":4,"color":"#8B5C33"},{"x":4,"y":4,"color":"#8B5C33"},{"x":5,"y":4,"color":"#8B5C33"},{"x":6,"y":4,"color":"#E7C09D"},{"x":7,"y":4,"color":"#E7C09D"},{"x":8,"y":4,"color":"#E7C09D"},{"x":9,"y":4,"color":"#E7C09D"},{"x":10,"y":4,"color":"#8B5C33"},{"x":11,"y":4,"color":"#E7C09D"},{"x":12,"y":4,"color":"#E7C09D"},{"x":13,"y":4,"color":"#000000"},{"x":14,"y":4,"color":"#000000"},{"x":15,"y":4,"color":"transparent"},{"x":0,"y":5,"color":"transparent"},{"x":1,"y":5,"color":"transparent"},{"x":2,"y":5,"color":"transparent"},{"x":3,"y":5,"color":"#000000"},{"x":4,"y":5,"color":"#8B5C33"},{"x":5,"y":5,"color":"#E7C09D"},{"x":6,"y":5,"color":"#8B5C33"},{"x":7,"y":5,"color":"#8B5C33"},{"x":8,"y":5,"color":"#8B5C33"},{"x":9,"y":5,"color":"#8B5C33"},{"x":10,"y":5,"color":"#E7C09D"},{"x":11,"y":5,"color":"#8B5C33"},{"x":12,"y":5,"color":"#8B5C33"},{"x":13,"y":5,"color":"#000000"},{"x":14,"y":5,"color":"transparent"},{"x":15,"y":5,"color":"transparent"},{"x":0,"y":6,"color":"transparent"},{"x":1,"y":6,"color":"transparent"},{"x":2,"y":6,"color":"transparent"},{"x":3,"y":6,"color":"#000000"},{"x":4,"y":6,"color":"#8B5C33"},{"x":5,"y":6,"color":"#8B5C33"},{"x":6,"y":6,"color":"#E7C09D"},{"x":7,"y":6,"color":"#FFFFFF"},{"x":8,"y":6,"color":"#000000"},{"x":9,"y":6,"color":"#E7C09D"},{"x":10,"y":6,"color":"#E7C09D"},{"x":11,"y":6,"color":"#E7C09D"},{"x":12,"y":6,"color":"#FFFFFF"},{"x":13,"y":6,"color":"#000000"},{"x":14,"y":6,"color":"transparent"},{"x":15,"y":6,"color":"transparent"},{"x":0,"y":7,"color":"transparent"},{"x":1,"y":7,"color":"transparent"},{"x":2,"y":7,"color":"transparent"},{"x":3,"y":7,"color":"#000000"},{"x":4,"y":7,"color":"#8B5C33"},{"x":5,"y":7,"color":"#8B5C33"},{"x":6,"y":7,"color":"#E7C09D"},{"x":7,"y":7,"color":"#000000"},{"x":8,"y":7,"color":"#000000"},{"x":9,"y":7,"color":"#E7C09D"},{"x":10,"y":7,"color":"#E7C09D"},{"x":11,"y":7,"color":"#E7C09D"},{"x":12,"y":7,"color":"#000000"},{"x":13,"y":7,"color":"#000000"},{"x":14,"y":7,"color":"transparent"},{"x":15,"y":7,"color":"transparent"},{"x":0,"y":8,"color":"transparent"},{"x":1,"y":8,"color":"transparent"},{"x":2,"y":8,"color":"transparent"},{"x":3,"y":8,"color":"#000000"},{"x":4,"y":8,"color":"#E7C09D"},{"x":5,"y":8,"color":"#E7C09D"},{"x":6,"y":8,"color":"#E7C09D"},{"x":7,"y":8,"color":"#E7C09D"},{"x":8,"y":8,"color":"#E7C09D"},{"x":9,"y":8,"color":"#E7C09D"},{"x":10,"y":8,"color":"#E7C09D"},{"x":11,"y":8,"color":"#E7C09D"},{"x":12,"y":8,"color":"#E7C09D"},{"x":13,"y":8,"color":"#000000"},{"x":14,"y":8,"color":"transparent"},{"x":15,"y":8,"color":"transparent"},{"x":0,"y":9,"color":"transparent"},{"x":1,"y":9,"color":"transparent"},{"x":2,"y":9,"color":"transparent"},{"x":3,"y":9,"color":"transparent"},{"x":4,"y":9,"color":"#000000"},{"x":5,"y":9,"color":"#c5a487"},{"x":6,"y":9,"color":"#E7C09D"},{"x":7,"y":9,"color":"#E7C09D"},{"x":8,"y":9,"color":"#E7C09D"},{"x":9,"y":9,"color":"#E7C09D"},{"x":10,"y":9,"color":"#E7C09D"},{"x":11,"y":9,"color":"#E7C09D"},{"x":12,"y":9,"color":"#000000"},{"x":13,"y":9,"color":"transparent"},{"x":14,"y":9,"color":"transparent"},{"x":15,"y":9,"color":"transparent"},{"x":0,"y":10,"color":"transparent"},{"x":1,"y":10,"color":"transparent"},{"x":2,"y":10,"color":"transparent"},{"x":3,"y":10,"color":"#000000"},{"x":4,"y":10,"color":"#000000"},{"x":5,"y":10,"color":"#000000"},{"x":6,"y":10,"color":"#000000"},{"x":7,"y":10,"color":"#c5a487"},{"x":8,"y":10,"color":"#E7C09D"},{"x":9,"y":10,"color":"#E7C09D"},{"x":10,"y":10,"color":"#000000"},{"x":11,"y":10,"color":"#000000"},{"x":12,"y":10,"color":"#000000"},{"x":13,"y":10,"color":"#000000"},{"x":14,"y":10,"color":"#000000"},{"x":15,"y":10,"color":"transparent"},{"x":0,"y":11,"color":"transparent"},{"x":1,"y":11,"color":"transparent"},{"x":2,"y":11,"color":"transparent"},{"x":3,"y":11,"color":"#000000"},{"x":4,"y":11,"color":"#EF0033"},{"x":5,"y":11,"color":"#EF0033"},{"x":6,"y":11,"color":"#EF0033"},{"x":7,"y":11,"color":"#000000"},{"x":8,"y":11,"color":"#E7C09D"},{"x":9,"y":11,"color":"#E7C09D"},{"x":10,"y":11,"color":"#E7C09D"},{"x":11,"y":11,"color":"#000000"},{"x":12,"y":11,"color":"#EF0033"},{"x":13,"y":11,"color":"#EF0033"},{"x":14,"y":11,"color":"#EF0033"},{"x":15,"y":11,"color":"#000000"},{"x":0,"y":12,"color":"transparent"},{"x":1,"y":12,"color":"transparent"},{"x":2,"y":12,"color":"#000000"},{"x":3,"y":12,"color":"#EF0033"},{"x":4,"y":12,"color":"#EF0033"},{"x":5,"y":12,"color":"#EF0033"},{"x":6,"y":12,"color":"#EF0033"},{"x":7,"y":12,"color":"#000000"},{"x":8,"y":12,"color":"#EF0033"},{"x":9,"y":12,"color":"#EF0033"},{"x":10,"y":12,"color":"#EF0033"},{"x":11,"y":12,"color":"#000000"},{"x":12,"y":12,"color":"#EF0033"},{"x":13,"y":12,"color":"#EF0033"},{"x":14,"y":12,"color":"#EF0033"},{"x":15,"y":12,"color":"#000000"},{"x":0,"y":13,"color":"transparent"},{"x":1,"y":13,"color":"transparent"},{"x":2,"y":13,"color":"transparent"},{"x":3,"y":13,"color":"#000000"},{"x":4,"y":13,"color":"#000000"},{"x":5,"y":13,"color":"#000000"},{"x":6,"y":13,"color":"#000000"},{"x":7,"y":13,"color":"#000000"},{"x":8,"y":13,"color":"#000000"},{"x":9,"y":13,"color":"#000000"},{"x":10,"y":13,"color":"#EF0033"},{"x":11,"y":13,"color":"#000000"},{"x":12,"y":13,"color":"#000000"},{"x":13,"y":13,"color":"#000000"},{"x":14,"y":13,"color":"#000000"},{"x":15,"y":13,"color":"transparent"},{"x":0,"y":14,"color":"transparent"},{"x":1,"y":14,"color":"transparent"},{"x":2,"y":14,"color":"transparent"},{"x":3,"y":14,"color":"transparent"},{"x":4,"y":14,"color":"#000000"},{"x":5,"y":14,"color":"#E7C09D"},{"x":6,"y":14,"color":"#E7C09D"},{"x":7,"y":14,"color":"#000000"},{"x":8,"y":14,"color":"transparent"},{"x":9,"y":14,"color":"#000000"},{"x":10,"y":14,"color":"#E7C09D"},{"x":11,"y":14,"color":"#000000"},{"x":12,"y":14,"color":"transparent"},{"x":13,"y":14,"color":"transparent"},{"x":14,"y":14,"color":"transparent"},{"x":15,"y":14,"color":"transparent"},{"x":0,"y":15,"color":"transparent"},{"x":1,"y":15,"color":"transparent"},{"x":2,"y":15,"color":"transparent"},{"x":3,"y":15,"color":"transparent"},{"x":4,"y":15,"color":"#000000"},{"x":5,"y":15,"color":"#000000"},{"x":6,"y":15,"color":"#000000"},{"x":7,"y":15,"color":"#000000"},{"x":8,"y":15,"color":"transparent"},{"x":9,"y":15,"color":"#000000"},{"x":10,"y":15,"color":"#000000"},{"x":11,"y":15,"color":"#000000"},{"x":12,"y":15,"color":"transparent"},{"x":13,"y":15,"color":"transparent"},{"x":14,"y":15,"color":"transparent"},{"x":15,"y":15,"color":"transparent"}]];
var pixelData = pixelToAdd;

function createDivForPlayers(players) {
    for (let i = 0; i < players; i++) {
        const rowContainer = document.createElement('div');
        rowContainer.className = 'row-container';
        container.appendChild(rowContainer);
    }
}

let divsAdded = false;
function changePixels() {
    var playersNumber = 2;

    if (!divsAdded){
        createDivForPlayers(playersNumber);
        divsAdded = true;
    }

    const pixelContainers = document.querySelectorAll('.row-container');
    for (const pixelDiv of pixelContainers) {
            pixelDiv.innerHTML = ''; // Limpiar el contenido actual del div
    }
    console.log(pixelContainers.length);
    if (pixelData === pixelToAdd) {
            pixelData = pixelToChange;
        } else {
            pixelData = pixelToAdd;
        }
for (let i = 0; i < pixelContainers.length; i++) {
    const containerForAvatar = pixelContainers[i];
    for (const row of pixelData) {
        for (const pixel of row) {
            const div = document.createElement('div');
            div.classList.add('pixel');
            div.style.backgroundColor = pixel.color;
            containerForAvatar.appendChild(div);
        }
    }

}
}

// Cambiar los píxeles cada segundo (1000 ms)
setInterval(changePixels, 100);

// Cambiar los píxeles inmediatamente al cargar la página
changePixels();