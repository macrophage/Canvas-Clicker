let gameOver = false;
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const colors = ["black", "blue", "green", "purple"];
let interval = 333;
let RADIUS = 30;
let lives = 10;

const circles = [];
RADIUS = prompt("set radius");
interval = prompt("set interval in ms");

if (isNaN(RADIUS)) {
  RADIUS = 30;
}
if (isNaN(interval)) {
  interval = 100000;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // [min,max)
}
function spawnCircles() {
  setInterval(() => {
    animate();
    circles.push(new Circle());
    if (circles.length === 10) {
      document.location.reload();
    }
  }, interval);
}
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((singleCircle) => {
    singleCircle.draw();
  });
}
addEventListener("mousedown", (e) => {
  circles.forEach((circle, index, object) => {
    if (checkX(e.clientX, circle.x) && checkY(e.clientY, circle.y)) {
      object.splice(index, 1);
    }
  });
});
function checkX(clientX, circleX) {
  if (clientX - circleX > RADIUS) {
    return false;
  }
  if (clientX - circleX < -RADIUS) {
    return false;
  }
  return true;
}
function checkY(clientY, circleY) {
  if (clientY - circleY > RADIUS) {
    return false;
  }
  if (clientY - circleY < -RADIUS) {
    return false;
  }
  return true;
}
class Circle {
  x;
  y;
  radius;
  color;

  constructor() {
    this.x = getRandomInt(100, innerWidth - 100);
    this.y = getRandomInt(100, innerHeight - 100);
    this.radius = RADIUS;
    this.color = colors[getRandomInt(0, 4)];
  }
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }
}
spawnCircles();
