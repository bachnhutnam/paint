const canvas = document.getElementById("canvas");

const WIDTH = 1045;
const HEIGHT = 500;
const backGround_Color = "#fff";

canvas.width = WIDTH;
canvas.height = HEIGHT;

let context = canvas.getContext("2d"); // trả về context 2d
// fillStyle thiết lập màu đổ lên hình 
context.fillStyle = backGround_Color; 
// fillRect vẽ 1 hình chữ nhật đc tô màu sẵn
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "1";
let is_drawing = false;

function changeColor() {
    const colorPickers = [...document.querySelectorAll('.color-option')]
    colorPickers.forEach(colorPicker => {
        colorPicker.addEventListener('click', (e) => {
            draw_color = e.target.style.backgroundColor;
            // document.body.style.background = draw_color;
        });
    });
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(event) {
    is_drawing = true;
    context.beginPath(); // khai báo đường vẽ
    // moveTo khai báo điểm bắt đầu
    context.moveTo(event.clientX - canvas.offsetLeft, 
        event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function draw(event) {
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft, 
        event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color; // thiết lập màu sắc cho đường vẽ
        context.lineWidth = draw_width; // thiết lập kích thước cho đg vẽ
        context.lineCap = 'round'; // thiết lập kiểu mũ cho 2 đầu dòng kẻ = round
        context.lineJoin = 'round'; // thiết lập kiểu của góc được tạo bởi 2 dòng kẻ
        context.stroke(); // hàm hiển thị đường vẽ
    }
    event.preventDefault();
}

function stop(event) {
    if (is_drawing) {
        context.stroke();
        // tạo nét vẽ từ vị trí hiện tại về điểm xuất phát nét vẽ
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();
}

function reset() {
    context.fillStyle = backGround_Color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    download.setAttribute("href", image);
}


