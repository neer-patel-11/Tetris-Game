const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll('.grid div'));
const score = document.getElementById("score");
let i; 
const startBtn =document.getElementById("start-button");
const btnImg = document.getElementById("btnImg");
let count=0; 
const width =10;
let flagDowm=true;
let flag=true;
//Arrow
const leftBtn =document.getElementById("left");
const rightBtn =document.getElementById("right");
const downBtn =document.getElementById("down");
const rotateBtn =document.getElementById("rotate");


//colors
const colors =[
    "#FF3353",
    "#A03EFF",
    "#33FFD1",
    "#FFE833",
    "#15E915"
]

// // indexes
    // for(let j=0;j<200 ;j++)
    // {
    //     squares[j].textContent=count;
    //     count++;
    // }    

//shapes

const lshape=[
    [1,width+1,width*2 +1,2 ],
    [width, width +1 , width+2 , width*2 +2],
    [1,width+1,width*2 +1,width*2],
    [width,width*2 , width*2 +1,width*2 +2]
]

const zshape=[
    [width+1,width+2,width*2  ,width*2 +1],
    [0,width,width+1,width*2 +1],
    [width+1,width+2,width*2 ,width*2 +1],
    [0,width,width+1,width*2 +1]
]

const oshape=[
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]

]
const tshape=[
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2 +1],
    [width,width+1,width+2,width*2 +1],
    [1,width,width+1,width*2 +1]
]

const ishape=[
    [1,width+1,width*2 +1,width*3 +1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2 +1 ,width*3 +1],
    [width,width+1,width+2,width+3],

]

let currentPosition =4;
let currentRotation =0;

const theShapes =[lshape,zshape,oshape,tshape,ishape];
 //random shape
let random=Math.floor(Math.random()*theShapes.length);//0-4


let currrentShape = theShapes[random][currentRotation];

//draw function
function draw(){
    currrentShape.forEach((index)=>{
        squares[currentPosition + index].style.background = colors[random];
    })
}

draw();

//erase shape

function erase(){
    currrentShape.forEach((index)=>{
        squares[currentPosition + index].style.background = '';
    })

}

function moveDown()
{
    if(flagDowm && flag){
        erase();
        currentPosition+=width;
        draw();
        stop();
    }
    
}

var timer = setInterval(moveDown , 1000);

//stop the shape

function stop(){
    if(currrentShape.some(index => squares[currentPosition + index + width].classList.contains('freeze'))){
        currrentShape.forEach(index => squares[currentPosition + index ].classList.add('freeze'))
    
        // start new shape
        random =Math.floor(Math.random()*theShapes.length)
        
        currentRotation=0;
        currrentShape = theShapes[random][currentRotation];
        currentPosition =4;
        draw();
        gameOver();
        addScore();
    }
}

//control

function control(e)
{
    if(e.keyCode === 37){
        moveLeft();
    }

    else if(e.keyCode === 39){
        moveRight();
    }

    else if (e.keyCode===40)
    {
        moveDown();
    }

    else if(e.keyCode === 32){
        rotate();
    }


}

window.addEventListener("keydown",control);

//control shape in phone
leftBtn.addEventListener("click",moveLeft);
rightBtn.addEventListener("click",moveRight);
downBtn.addEventListener("click",moveDown);
rotateBtn.addEventListener("click",rotate);



// move left

function moveLeft(){
    
    if(flag){
        erase();

        let LeftBlockage = currrentShape.some(index => (currentPosition + index)% width === 0)
        let Blockage = currrentShape.some(index => squares[currentPosition + index - 1].classList.contains('freeze'));
    
        if(!LeftBlockage && !Blockage)
            currentPosition--;
    
        draw();
    }
    
}

function moveRight(){
    if(flag)
    {
        erase();

    let RightBlockage = currrentShape.some(index => (currentPosition + index)% width === 9)
    let Blockage = currrentShape.some(index => squares[currentPosition + index + 1].classList.contains('freeze'));

    if(!RightBlockage && !Blockage)
        currentPosition++;

    draw();
    }
}

function rotate(){
    if(flag){
        erase();
    
    if(random === 4)
    {
        
        if(currentPosition % 10 ==9 || currentPosition % 10 ==7 || currentPosition %10 == 8)
        {
            if(currentRotation == 0 || currentRotation == 2)
            {
                draw();
                return ;
            }
            
        }
        
    }

    if(random == 1)
    {
        if(currentPosition % 10 == 8 && currentRotation %2 !=0)
        {
            draw();
            return ;
        }
    }

    if(random ==0 || random ==3 )
    {
      
        if(currentPosition %10 ==8 || currentPosition %10 ==9)
        {
            draw();
            return ;

        }

    }
    let temp=currentRotation ;
    currentRotation++;
    currentRotation=currentRotation % 4;

    if(currrentShape.some(index => squares[currentPosition + index ].classList.contains('freeze')))
        {
            console.log('hello');
            currrentShape =temp;
        }

    currrentShape = theShapes[random][currentRotation];
    draw();

    }
}

// valid rotations



// pause

function pause(){
    if(timer){
        flag=false;
        clearInterval(timer)
        timer = null;
        btnImg.src= 'play.png';
       
    }
    else{
        flag=true;
        draw();
        timer = setInterval(moveDown , 500);
        btnImg.src='pause.png';
    }
}
startBtn.addEventListener("click",pause)

// game over 

function gameOver(){
    if(currrentShape.some(index => squares[currentPosition + index].classList.contains('freeze'))){
        score.innerHTML =`Game over : Score- ${count}`;
        clearInterval(timer);
        flagDowm=false;
    }
}

// add score



function addScore(){
    for(let i = 0; i<199;i+=width){
        const row = [i ,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9];
        
        if(row.every(index => squares[index].classList.contains("freeze"))){
            count +=10;
            
            score.textContent = `score:${count}`;
            row.forEach(index => {
               squares[index].classList.remove('freeze');
               squares[index].style.background = "";
            })  
            const squareRemoved   =squares.splice(i,width);
            squares= squareRemoved.concat(squares);
            squares.forEach(square => grid.appendChild(square))
        }
    }
}