const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const DEFAULT__COLOR = "#2c2c2c";

ctx.strokeStyle = DEFAULT__COLOR;
ctx.fillStyle = DEFAULT__COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  //console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); // 그림이 시작할 위치의 값을 받기 시작함
    ctx.moveTo(x, y); // 그림 시작하기전 마우스의 위치를 받음
  } else {
    ctx.lineTo(x, y); //마우스 클릭하면 x,y 지점에서 직선으로 그림을 그림
    ctx.stroke();
  }
}

function onMouseDown(event) {
  //console.log(event);
  startPainting();
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const stroke = event.target.value;
  ctx.lineWidth = stroke;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, 700, 700); // filling이 트루일때 채우기
  }
}

function handleSaveImage() {
  const image = canvas.toDataURL(); //이미지 url 만듬
  const link = document.createElement("a");
  link.href = image; // href 에 url 연결
  link.download = "Paint[🎉]"; // 다운로드 이미지 제목
  link.click(); // 가짜 링크 클릭한것처럼
}

function handleCM(event) {
  // 우클릭 방지
  //console.log(event);
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveImage);
}
