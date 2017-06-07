function init(){
    canvas = document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    game_over = false;
    
    score = 10;
    
    colors = ["green", "blue","gray","orange","pink","magenta","black"];
    snake = {
        init_length:5,
        color: "orange",
        cells:[],
        direction:"right",
        createSnake: function(){
            for(var i=this.init_length-1;i>=0;i--){
                this.cells.push({ x:i,y:0});
            }   
        },
        
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                
                pen.strokeStyle = "white";
                pen.lineWidth = 5;
                
                pen.strokeRect(this.cells[i].x*20, this.cells[i].y*20,20,20);
                
                pen.fillRect(this.cells[i].x*20, this.cells[i].y*20,20,20);
            }
        },
        updateSnake:function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            if(headX==food.x && headY==food.y){
                food = getRandomFood();
                score++;
            }
            else{
                //Pop the last cell from the tail of snake
                this.cells.pop();
            }
            
            if(this.direction=="right"){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction=="left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction=="up"){
                nextX = headX;
                nextY = headY - 1;
            }
            else if(this.direction=="down"){
                nextX = headX;
                nextY = headY + 1;
            }
                
            //Insert the new cell at head of the snake
            this.cells.unshift({x:nextX,y:nextY});
            
            var x_cells = Math.round(W/20);
            var y_cells = Math.round(H/20);
            
            if(this.cells[0].x<0 || this.cells[0].x> x_cells|| this.cells[0].y<0 || this.cells[0].y>y_cells){
                alert("Game Over!");
                game_over = true;
                
                x  = confirm("Play Again");
                if(x==true){
                    startGame();
                }
                else{
                    alert("Thank you for joining !");
                }
               
            }
            
        }
        
    }
    snake.createSnake();
    
    food = getRandomFood();
    
    
    // Let try to work with keyboard events
    function KeyPressed(e){
        console.log("You pressed a key");
        if(e.key=="ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction = "left";
        }
        
        else if(e.key=="ArrowDown"){
            snake.direction = "down";
        }
        
        else if(e.key=="ArrowUp"){
            snake.direction = "up";
        }
    }
    
    document.addEventListener('keydown', KeyPressed );
    
    
}

function draw(){
    pen.clearRect(0,0,W,H);
    
    snake.drawSnake();
    
    
    
    pen.fillStyle = food.color;
    pen.fillRect(food.x*20,food.y*20,20,20);
    
    pen.fillStyle = "green";
    pen.font = "14px Arial";
    pen.fillText("Score :"+score,10,10);
    
    
    
    
    
    
}


function update(){
    snake.updateSnake();
}

function getRandomFood(){
    
    var foodX = Math.round(Math.random()*(W-20)/20);
    var foodY = Math.round(Math.random()*(H-20)/20);
    
    var i = Math.round(Math.random()*colors.length);
    
    var color = colors[i];
    
    var food_created = {
        x:foodX, y:foodY, color: color
    };
    
    return food_created;
}

function gameLoop(){
    
    //console.log("In Game Loop");
    
    draw();
    update();
    
    if(game_over==true){
        clearInterval(f);
    }
    
    

}




function startGame(){
    init();
    f = setInterval(gameLoop,100);
    
}

startGame();



