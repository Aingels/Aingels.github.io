const x = Math.random() * 1000;
const y = Math.random() * 1000;

const delay = Math.random() * 10;
const l_worker = [];
var time = setTimeout(pointRouge(), delay * 1000);


function pointRouge() {

    postMessage([x, y, "red"]);

    for (var i = 0; i < 10; ++i) {
        l_worker.push(new Worker("secondWorker.js"));
    }
    for (var i =0;i<10;i++){
        l_worker[i].onmessage = function(e){
           postMessage(e.data);
        }
    }
}


