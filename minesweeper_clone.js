/*
Minesweeper Clone
Created 2021
By Madison and JD
*/
    
//VARIABLES
var currentScene = 0;
var numberOfFlags = 25;
var time = 0;
var startTime = 0;
var mouseClicked;
textFont(createFont('monospace'));

//BITMOJIS
//bitmojis here



//BUTTON CONSTRUCTOR
var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.label = config.label || "Click";
    this.onClick = config.onClick || function() {};
};

Button.prototype.draw = function() {
    fill(0, 234, 255);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(0, 0, 0);
    textSize(19);
    textAlign(LEFT, TOP);
    text(this.label, this.x+10, this.y+this.height/4);
};

Button.prototype.isMouseInside = function() {
    return mouseX > this.x &&
           mouseX < (this.x + this.width) &&
           mouseY > this.y &&
           mouseY < (this.y + this.height);
};

Button.prototype.handleMouseClick = function() {
    if (this.isMouseInside()) {
        this.onClick();
    }
};

/*
BUTTON TEMPLATE
var button = new Button({
    x: ,
    y: ,
    label: ,
    onClick: function() {
        
    }
});
*/
    


//TILE CONSTRUCTOR
var Tile = function(x,y,i,j) {
    
    this.row = i;
    this.col = j;
    this.x = x;
    this.y = y;
    this.isBomb = 0;
    this.hasFlag = false;
    this.clicked = false;
    this.label = "";
    
    
};

Tile.prototype.mouseIsInside = function() {
    
    if (mouseX > this.x && mouseX < this.x + 20 && mouseY > this.y && mouseY < this.y + 20)     {
        
        return true;
        
    }
    
    return false;
    
};

//Not done
Tile.prototype.draw = function() {
    
    if (!this.clicked) {
        
        noStroke();
        fill(224, 224, 224);
        triangle(this.x,this.y,this.x,this.y + 20,this.x + 20,this.y);
        fill(82, 82, 82);
        triangle(this.x + 20,this.y + 20,this.x,this.y + 20,this.x + 20,this.y);
        fill(168, 168, 168);
        rect(this.x + 2,this.y + 2,16,16);
        
        if (this.hasFlag) {
            
            fill(255, 0, 0);
            triangle(this.x + 8,this.y + 4,this.x + 8,this.y + 12,this.x + 14,this.y + 8);
            
            stroke(255, 0, 0);
            line(this.x + 8,this.y + 4,this.x + 8,this.y + 15);
            
        }
        
    }
    
    if (this.clicked && !this.hasFlag) {
        
        stroke(71, 71, 71);
        fill(168, 168, 168);
        rect(this.x,this.y,20,20);
        
        //can be changed...
        if (this.isBomb !== 1) {
            
            textSize(20);
            
            switch (this.label) {
                
                case "0":
                    
                    noFill();
                    
                    break;
                
                case "1":
                    
                    fill(0, 0, 255);
                    
                    break;
                
                case "2":
                    
                    fill(0, 158, 0);
                    
                    break;
                
                case "3":
                    
                    fill(255, 0, 0);
                    
                    break;
                
                case "4":
                    
                    fill(0, 0, 133);
                    
                    break;
                
                case "5":
                    
                    fill(130, 0, 0);
                    
                    break;
                
                case "6":
                    
                    fill(0, 140, 150);
                    
                    break;
                
                case "7":
                    
                    fill(0, 0, 0);
                    
                    break;
                
                case "8":
                    
                    fill(92, 92, 92);
                    
                    break;
                
                
                
            }
            
            textAlign(LEFT,TOP);
            
            text(this.label,this.x+5,this.y-1);
            
        }
        if (this.isBomb === 1) {
            
            noStroke();
            fill(0, 0, 0);
            ellipse(this.x + 10, this.y + 12, 10, 10);
            rect(this.x + 9, this.y + 4, 2, 5);
            
    }
    
    }
    
    
    
};

//CREATE GRID OF TILES
var grid = [];
var bombSelectGrid = [];

for (var i = 0; i < 15; i++) {
    
    var temp = [];
    
    for (var j = 0; j < 20; j++) {
        
        temp.push(new Tile(j * 20, 100 + i * 20, i, j));
        bombSelectGrid.push([i,j]);
        
    }
    
    grid.push(temp);
    
    
}

//FUNCTIONS
var checkSingleLabel = function(i,j) {
    
    if (i >= 0 && i <= 14 && j >= 0 && j <= 19) {
        
        return grid[i][j].isBomb;
        
    }
    else {return 0;}
};
var checkLabels = function() {
    
   for (var i = 0; i < 15; i++) {
        
        for (var j = 0; j < 20; j++) {
            
            if (grid[i][j].isBomb !== 1) {
                
                grid[i][j].label = (checkSingleLabel(i-1,j-1) + checkSingleLabel(i-1,j) + checkSingleLabel(i-1,j+1) + checkSingleLabel(i,j-1) + checkSingleLabel(i,j+1) + checkSingleLabel(i+1,j-1) + checkSingleLabel(i+1,j) + checkSingleLabel(i+1,j+1)).toString();
                
            }
            
        }
        
    }
    
};
var makeBombs = function() {
    
    for (var i = 0; i < numberOfFlags; i++) {
        
        var x = round(random(0,bombSelectGrid.length - 1));
        
        grid[bombSelectGrid[x][0]][bombSelectGrid[x][1]].isBomb = 1;
        
        bombSelectGrid.splice(x,1);
        
        
    }
    
    
};
var clearBoard = function() {
    
    for (var i = 0; i < 14; i++) {
        
        for (var j = 0; j < 19; j++) {
            
            grid[i][j].hasFlag = false;
            grid[i][j].clicked = true;
            
        }
        
    }
    
};

var clearNeighbors = function(i,j) {
    
    if (i >= 0 && i <= 14 && j >= 0 && j <= 19) {
        
        if (grid[i][j].hasFlag === true || grid[i][j].clicked === true) {}
        else if (grid[i][j].label === "0") {
            
            grid[i][j].clicked = true;
            grid[i][j].draw();
            
            clearNeighbors(i-1,j-1);
            clearNeighbors(i-1,j);
            clearNeighbors(i-1,j+1);
            clearNeighbors(i,j-1);
            clearNeighbors(i,j+1);
            clearNeighbors(i+1,j-1);
            clearNeighbors(i+1,j);
            clearNeighbors(i+1,j+1);
            
        }
        else {
            
            grid[i][j].clicked = true;
            grid[i][j].draw();
            
        }
    
    }
    
};

//RUN CHECK FOR ALL LABELS AND BOMB SQUARES

makeBombs();
checkLabels();

//SCENES
//Not done
var splashScreen = function() {};

//Not done
var gameplay = function() {
    
    for (var i = 0; i < 15; i++) {
        
        for (var j = 0; j < 20; j++) {
            
            if (millis() - startTime > 100 && mouseClicked && grid[i][j].mouseIsInside() && mouseButton === LEFT && !grid[i][j].hasFlag && !grid[i][j].clicked) {
                
                clearNeighbors(i,j);
                
            }
            else if (mouseClicked && grid[i][j].mouseIsInside() && mouseButton === RIGHT) {
                
                if (numberOfFlags > 0 && !grid[i][j].hasFlag && !grid[i][j].clicked) {
                    
                    grid[i][j].hasFlag = true;
                    numberOfFlags -= 1;
                    
                }
                else if (grid[i][j].hasFlag) {
                    
                    grid[i][j].hasFlag = false;
                    numberOfFlags += 1;
                    
                }
                
            }
            
            grid[i][j].draw();
            
        }
        
    }
    
    noStroke();
    //DARK SHADED
    fill(82, 82, 82);
    rect(0,0,400,100);
    //LIGHT SHADED
    fill(191, 191, 191);
    triangle(400,100,400,0,300,100);
    triangle(0,100,100,3,100,100);
    rect(47,3,400,97);
    //CENTER GREY
    fill(168, 168, 168);
    rect(3,3,394,95);
    
    //NUMBER BOX
    fill(0, 0, 0);
    rect(15,15,100,70);
    rect(285,15,100,70);
    
    //NUMBERS
    fill(255, 0, 0);
    textAlign(RIGHT,BOTTOM);
    textSize(50);
    text(numberOfFlags.toString(),106,75);
    text(time,377,75);
    
};

//MAIN DRAW LOOP

draw = function() {
    
    time = floor((millis() - startTime)/1000);
    
    if (currentScene === 0) {}
    else if (currentScene === 1){
        
        gameplay();
        
    }
    
    mouseClicked = false;
    
};

//WHEN MOUSE RELEASED

//Not done
mouseReleased = function () {
    
    mouseClicked = true;
    
    if (currentScene === 0 && true) {
        
        currentScene = 1;
        
        startTime = millis();
        
    }
    
    if (currentScene === 1 && true) {
        
        currentScene = 1;
        //gameplay();
        
    }
    
};

/*
//Unclicked Tile
noStroke();
fill(224, 224, 224);
triangle(0,0,0,20,20,0);
fill(82, 82, 82);
triangle(20,20,0,20,20,0);
fill(168, 168, 168);
rect(2,2,16,16);
*/

/*
//Clicked Tile
stroke(71, 71, 71);
rect(0,0,20,20);
*/
