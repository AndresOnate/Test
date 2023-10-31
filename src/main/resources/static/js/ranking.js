var ranking = (function () {

    var stompClient = null;

    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/showWinner', function (eventbody) {
                var theObject=JSON.parse(eventbody.body);
                $("#winner-title").text("El ganador es: " + theObject[0].name);
                var tbody = document.getElementById("ranking-table").getElementsByTagName("tbody")[0];
                var counter = 0;
                var rowsToAdd= theObject.map(function(player) {
                    console.log(player);
                    var fila = tbody.insertRow(counter);
                    var positionCell = fila.insertCell(0);
                    positionCell.innerHTML = counter + 1;
                    var nameCell = fila.insertCell(1);
                    nameCell.innerHTML = player.name;
                    var colorCell = fila.insertCell(2);
                    colorCell.innerHTML = player.color;
                    var pointsCell = fila.insertCell(3);
                    pointsCell.innerHTML = player.points;
                    counter = counter + 1;
                    return fila;
                });

            });
        });
    };


    return {
        init: function () {
            //disconnect connection
            ranking.disconnect();

            //websocket connection
            connectAndSubscribe();
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