const x = Math.random() * 1000;
const y = Math.random() * 1000;
const numCouleur =Math.random() * 3;
var couleur = ["green","black","blue"];
const delay = Math.random() * 10;

var time = setTimeout(pointRouge(), delay * 1000);

function pointRand() {

    postMessage([x, y, couleur[numCouleur]]);
}
