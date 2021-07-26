const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const tool = 'pen';
const WIDTH = 1000;
const HEIGHT = 500;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

ctx.fillStyle = 'black';

function draw(x, y) {
    const pen = new Path2D();
    pen.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill(pen)
}

let isMouseDown = false;

canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
})

canvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
    console.log('mouseup')
})

canvas.addEventListener('mousemove', (e) => {
    if (!isMouseDown) {
        return
    }

    const {
        clientX,
        clientY
    } = e

    const react = canvas.getBoundingClientRect()
    draw(clientX - react.left, clientY - react.top)
})

const colorPickers = [...document.querySelectorAll('.color-option')]
colorPickers.forEach(colorPicker => {
    colorPicker.addEventListener('click', (e) => {
        ctx.fillStyle = e.target.style.backgroundColor
    })
})

$("#reset").addEventListener("click", (e) => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
})

function reset () {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 300, 150);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function download(){
    var download = document.getElementById("download");
    var image = document.getElementById("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    download.setAttribute("href", image);
}


