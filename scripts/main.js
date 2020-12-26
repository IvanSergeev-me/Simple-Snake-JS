const CANVAS = document.getElementById("zmeya");
const CONTEXT = CANVAS.getContext("2d");
const SCOREPANEL = document.getElementById("score");
const EATENPANEL = document.getElementById("eaten");
let bckground = "#FAFAFA";
let randomElement = Math.floor(Math.random()*3);
let food_arr=[
    {type:"images/xmas/xmas/png/star.png"},
    {type:"images/xmas/xmas/png/bowite.png"},
    {type:"images/xmas/xmas/png/ball.png"}
];
const FOOD = new Image();
FOOD.src = food_arr[randomElement].type;
const SNAKEHEADIMG = new Image();
const SNAKEBODYIMG = new Image();
let isclearHead = true;
let isclearBody = true;
//чанк chunk пикселей и количество чанков по х = xchunks, по у = ychunks
let chunk = 32;
let xchunks = 32;
let ychunks = 16;
//холст размером chunk*xchunks по ширине и chunk*ychunks пикселя по высоте.
let CANVASWIDTH = chunk*xchunks+'px';
let CANVASHEIGHT = chunk*ychunks+'px';
CANVAS.style.height=CANVASHEIGHT;
CANVAS.style.width=CANVASWIDTH;
CANVAS.width = chunk*xchunks;
CANVAS.height = chunk*ychunks;
let foodDesmission = chunk;
let score = 0;
let eaten = 0;
//генерация расположения еды
let foodlocation = {
    x: Math.floor(Math.floor(Math.random()*xchunks*chunk)/chunk)*chunk,
    y: Math.floor(Math.floor(Math.random()*ychunks*chunk)/chunk)*chunk, 
};
let snake = {
    x: chunk, y: chunk,
    vx:0, vy:0,
    tail:1,
    trail:[]
};
document.addEventListener("keydown", buttonPressed);
let isButtonPressed = false;
let dirrection;
//обработчик событий
function buttonPressed(e){
    //37 -> / 38 up / 39 right / 40 down
    if (e.keyCode==37 && dirrection!='right'){
        dirrection = 'left';
        snake.vx= -chunk;
        snake.vy= 0;
        isButtonPressed = true;
    }
    else if (e.keyCode==38 && dirrection!='down'){
        dirrection = 'up';
        snake.vx= 0;
        snake.vy= -chunk;
        isButtonPressed = true;
    }
    else if (e.keyCode==39 && dirrection!='left'){
        dirrection = 'right';
        snake.vx= chunk;
        snake.vy= 0;
        isButtonPressed = true;
    }
    else if (e.keyCode==40 && dirrection!='up'){
        dirrection = 'down';
        snake.vx= 0;
        snake.vy= chunk;
        isButtonPressed = true;
    }
}
/*
const sensitivity = 20;
var touchStart = null; //Точка начала касания
var touchPosition = null; //Текущая позиция
//Перехватываем события
CANVAS.addEventListener("touchstart", function (e) { TouchStart(e); }); //Начало касания
CANVAS.addEventListener("touchmove", function (e) { TouchMove(e); }); //Движение пальцем по экрану
//Пользователь отпустил экран
CANVAS.addEventListener("touchend", function (e) { TouchEnd(e, "green"); });
//Отмена касания
CANVAS.addEventListener("touchcancel", function (e) { TouchEnd(e, "red"); });
function TouchStart(e)
{
    //Получаем текущую позицию касания
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };

    Draw(touchPosition.x, touchPosition.y, 6, "blue"); //Рисуем точку начала касания
}

function TouchMove(e)
{
    //Получаем новую позицию
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    Draw(touchPosition.x, touchPosition.y, 2); //Рисуем точку текущей позиции
}

function TouchEnd(e, color)
{
    DrawLine(); //Рисуем линию между стартовой и конечной точками
    Draw(touchPosition.x, touchPosition.y, 6, color); //Рисуем конечную точку

    CheckAction(); //Определяем, какой жест совершил пользователь

    //Очищаем позиции
    touchStart = null;
    touchPosition = null;
}

function CheckAction()
{
    var d = //Получаем расстояния от начальной до конечной точек по обеим осям
    {
   	 x: touchStart.x - touchPosition.x,
   	 y: touchStart.y - touchPosition.y
    };
    if(Math.abs(d.x) > Math.abs(d.y)) //Проверяем, движение по какой оси было длиннее
    {
   	 if(Math.abs(d.x) > sensitivity) //Проверяем, было ли движение достаточно длинным
   	 {
   		 if(d.x > 0) //Если значение больше нуля, значит пользователь двигал пальцем справа налево
   		 {}
   		 else {}
            //Иначе он двигал им слева направо
   	 }
    }
    else //Аналогичные проверки для вертикальной оси
    {
   	 if(Math.abs(d.y) > sensitivity)
   	 {
   		 if(d.y > 0) //Свайп вверх
   		 {}
   		 else //Свайп вниз
   		 {}
   	 }
    }
}

*/
if (document.documentElement.clientWidth<=1024 && document.documentElement.clientWidth>512){
    chunk = 16;
    xchunks = 32;
    ychunks = 16;
    foodDesmission = chunk;
    CANVASWIDTH = chunk*xchunks+'px';
    CANVASHEIGHT = chunk*ychunks+'px';
    CANVAS.style.height=CANVASHEIGHT;
    CANVAS.style.width=CANVASWIDTH;
    CANVAS.width = chunk*xchunks;
    CANVAS.height = chunk*ychunks;
    foodlocation = {
        x: Math.floor(Math.floor(Math.random()*xchunks*chunk)/chunk)*chunk,
        y: Math.floor(Math.floor(Math.random()*ychunks*chunk)/chunk)*chunk, 
    };
}
else if (document.documentElement.clientWidth<=512){
    chunk = 16;
    xchunks = 20;
    ychunks = 10;
    foodDesmission = chunk;
    CANVASWIDTH = chunk*xchunks+'px';
    CANVASHEIGHT = chunk*ychunks+'px';
    CANVAS.style.height=CANVASHEIGHT;
    CANVAS.style.width=CANVASWIDTH;
    CANVAS.width = chunk*xchunks;
    CANVAS.height = chunk*ychunks;
    foodlocation = {
        x: Math.floor(Math.floor(Math.random()*xchunks*chunk)/chunk)*chunk,
        y: Math.floor(Math.floor(Math.random()*ychunks*chunk)/chunk)*chunk, 
    };
}
function drawFood(){
    CONTEXT.drawImage(FOOD,foodlocation.x,foodlocation.y, foodDesmission,foodDesmission);
}
function drawSnake(){
    //перенос в другую часть экрана
    if (snake.x<0)snake.x=chunk*xchunks-chunk;
    if (snake.x>=chunk*xchunks)snake.x=0;
    if (snake.y<0)snake.y=chunk*ychunks-chunk;
    if (snake.y>=chunk*ychunks)snake.y=0;
    CONTEXT.fillStyle = bckground;
    CONTEXT.fillRect(0,0,CANVAS.width, CANVAS.height);
    snake.x+=snake.vx;
    snake.y+=snake.vy;
    //отрисовка змейки
    for(let i = 0;i<snake.trail.length; i++){
        let pos = snake.trail[i];
        if (isclearBody){
            CONTEXT.fillStyle = "red" ;
            CONTEXT.fillRect(pos.x, pos.y,chunk,chunk);
        }
        else{
            CONTEXT.drawImage(SNAKEBODYIMG, pos.x, pos.y,chunk,chunk);
        }
        if(isclearHead){
            CONTEXT.fillStyle = "green";
            CONTEXT.fillRect(snake.x, snake.y,chunk,chunk);
        }
        else{
            CONTEXT.drawImage(SNAKEHEADIMG, snake.x,snake.y,chunk,chunk);
        }
        //коллизия
        if ( snake.x === pos.x && snake.y === pos.y && isButtonPressed == true){
            isButtonPressed = false;
            timeIncrease = 0;
            score = 0;
            eaten = 0;
            snake.tail=1;
            SCOREPANEL.textContent = ('Score: ' + score);
            EATENPANEL.textContent = ('Eaten: ' + eaten);
        }
    } 
    //добавление хвоста
    snake.trail.push({
        x:snake.x,
        y:snake.y
    });
    //отрезание хвоста
    while(snake.trail.length > snake.tail){  
        snake.trail.shift();
    }
    //поедание
    if (snake.x == foodlocation.x && snake.y == foodlocation.y){
        snake.tail++;
        eaten++;
        EATENPANEL.textContent = ('Eaten: ' + eaten);
        switch(randomElement){
            case 0:
                score+=50;
                break;
            case 1:
                score+=100;
                break;
            case 2:
                score+=150;
                break;
            default:
        }
        SCOREPANEL.textContent = ('Score: ' + score);
        foodlocation = {
            x: Math.floor(Math.floor(Math.random()*xchunks*chunk)/chunk)*chunk,
            y: Math.floor(Math.floor(Math.random()*ychunks*chunk)/chunk)*chunk, 
        };
        randomElement = Math.floor(Math.random()*3);
        FOOD.src = food_arr[randomElement].type;  
    }
}

function drawGame(){  
    
    
    drawSnake();
    drawFood();
    
}
let gameInterval = setInterval(drawGame,(150));

function skinChangerHead(block){
    let srcPic = block.children[0].src;
    SNAKEHEADIMG.src = srcPic;
    isclearHead = false;
}
function skinChangerBody(block){
    let srcPic = block.children[0].src;
    SNAKEBODYIMG.src = srcPic;
    isclearBody = false;
}
function clearStyle(){
    SNAKEHEADIMG.src = "";
    SNAKEBODYIMG.src = "";
    isclearHead = true;
    isclearBody = true;
}


