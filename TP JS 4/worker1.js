const x = Math.random() * 1000;
const y = Math.random() * 1000;

const delay = Math.random() * 10;

var time = setTimeout(pointRouge(), delay * 1000);

function pointRouge() {

    for (var i = 0; i < 10; ++i) {
        l_worker.push(new Worker("secondWorker.js"));
    }
    postMessage([x, y, "red"]);
}

