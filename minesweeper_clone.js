/*
Minesweeper Clone
Created 2021
By Madison and JD
*/
    
//VARIABLES
//Main grid which will contain the tiles of the game grid
var grid = [];

//A virtual grid that is used to decide what grid tiles in the grid array will be bombs
var bombSelectGrid = [];
//Current scene of the game
var currentScene = 0;
//Number of flags/bombs
var numberOfFlags = 25;
//Global time variable declaration
var time = 0;
//Global starttime declaration
var startTime = 0;
//Mouseclicked variable, to prevent any clicking on tiles
var mouseClicked;
//Used to detect if the game is still running or if you have fulfilled a win or lose condition
var stillPlaying = false;
//Global declaration of the endGameMessage, which functions as a variable end screen value if you lose or win
var endGameMessage;

//Changes font to monospace
textFont(createFont('monospace'));

//BITMOJIS
//bitmojis here
//Madison Bitmoji
var drawHead = function(bitX, bitY, bitHeight) {
    stroke(0, 0, 0);
    strokeWeight(1.5);
    fill(112, 92, 71); //Hair Color
    ellipse(bitX + (bitHeight/148*85.5), bitY + (bitHeight/148*79), (bitHeight/148*97),         (bitHeight/148*97)); //Hair base
    triangle(bitX + (bitHeight/148*85.5), bitY + (bitHeight/148*144), bitX + (bitHeight/148    *152), bitY + (bitHeight/148*76), bitX + (bitHeight/148*20), bitY + (bitHeight/148*76)); //     Hair Point 1
    triangle(bitX +  (bitHeight/148*85.5), bitY + (bitHeight/148*85), bitX +  (bitHeight/148    *138), bitY + (bitHeight/148*112), bitX + (bitHeight/148*30), bitY + (bitHeight/148*112));     //Hair Point 2
    noStroke();
    rect(bitX + (bitHeight/148*45), bitY + (bitHeight/148*72), (bitHeight/148*79), (bitHeight    /148*39)); //to hide lines
    stroke(0, 0, 0);
    fill(255, 243, 219); //Skin Color
    rect(bitX + (bitHeight/148*74), bitY + (bitHeight/148*98), (bitHeight/148*22), (bitHeight    /148*50)); //neck
    rect(bitX + (bitHeight/148*50), bitY + (bitHeight/148*52), (bitHeight/148*70), (bitHeight    /148*63)); // Face base
    arc(bitX + (bitHeight/148*85.5), bitY + (bitHeight/148*113), (bitHeight/148*70), (bitHeight/148*37), 0, 180); //Chin
    arc(bitX + (bitHeight/148*85.5), bitY + (bitHeight/148*113), (bitHeight/148*27), (bitHeight/148*13), 0, 180); //smile
    triangle(bitX + (bitHeight/148*85), bitY + (bitHeight/148*73), bitX + (bitHeight/148*91), bitY + (bitHeight/148*100), bitX + (bitHeight/148*79), bitY + (bitHeight/148*100));
    fill(255, 255, 255);
  
    rect(bitX + (bitHeight/148*50), bitY + (bitHeight/148*65), (bitHeight/148*30), (bitHeight/148*30)); //left glasses;
    rect(bitX + (bitHeight/148*90), bitY + (bitHeight/148*65), (bitHeight/148*30), (bitHeight/148*30)); //right glasses;
    line(bitX + (bitHeight/148*80), bitY + (bitHeight/148*80), bitX + (bitHeight/148*90), bitY + (bitHeight/148*80)); //glasses rim
    fill(112, 92, 71); //Hair Color
    fill(110, 114, 153); //Eye color
    ellipse(bitX + (bitHeight/148*59), bitY + (bitHeight/148*80), (bitHeight/148*15), (bitHeight/148*15)); //left eye
    ellipse(bitX + (bitHeight/148*99), bitY + (bitHeight/148*80), (bitHeight/148*15), (bitHeight/148*15)); //left eye
    fill(112, 92, 71); //Hair Color
    arc(bitX + (bitHeight/148*121), bitY + (bitHeight/148*47), (bitHeight/148*70), (bitHeight/148*37), 90, 180); //Bangs
};
var drawHoodie = function(bitX, bitY, bitHeight) {
    strokeWeight(1.5);
    fill(181, 242, 229); //hoodie color
    rect(bitX + (bitHeight/148*60), bitY + (bitHeight/148*139), (bitHeight/148*50), (bitHeight/148*40)); //HOODIE
    fill(255, 255, 255); //inner shirt color
    triangle(bitX + (bitHeight/148*97), bitY + (bitHeight/148*140), bitX + (bitHeight/148*59), bitY + (bitHeight/148*140), bitX + (bitHeight/148*85), bitY + (bitHeight/148*150)); //inner shirt
    fill(181, 242, 229); //hoodie color (same as other hoodie color)
    triangle (bitX + (bitHeight/148*85), bitY + (bitHeight/148*150), bitX + (bitHeight/148*50), bitY + (bitHeight/148*140), bitX + (bitHeight/148*50), bitY + (bitHeight/148*125)); //hood left
    triangle (bitX + (bitHeight/148*120), bitY + (bitHeight/148*140), bitX + (bitHeight/148*85), bitY + (bitHeight/148*150), bitX + (bitHeight/148*120), bitY + (bitHeight/148*125)); //hood right
    fill(255, 255, 255); //inner shirt color
    textSize(bitHeight/148*25);
    text("MS", bitX + (bitHeight/148*72), bitY + (bitHeight/148*172));
};
var drawBitmoji = function(bitX, bitY, bitHeight) {
 drawHead(bitX - 85, bitY - 100, (bitHeight));
 drawHoodie(bitX - 85, bitY - 100, (bitHeight));
};

//JD Bitmoji
var drawBitmojiFace = function(resize,bitmojiX,bitmojiY) {
    noStroke();

    fill(51, 51, 51);
    arc(bitmojiX,2*resize/100 + bitmojiY,100*resize/100,122*resize/100,180,360); //beanie
    
    fill(255, 219, 172);         //skintone
    ellipse(bitmojiX,bitmojiY,80*resize/100,100*resize/100);     //face back
    ellipse(-40*resize/100 + bitmojiX,1*resize/100 + bitmojiY,10*resize/100,17*resize/100);      //left ear
    ellipse(40*resize/100 + bitmojiX,1*resize/100 + bitmojiY,10*resize/100,17*resize/100);      //right ear
    stroke(0, 0, 0);
    arc(bitmojiX,4*resize/100 + bitmojiY,10*resize/100,10*resize/100,-90,138);  //nose
    
    fill(255,255,255);
    ellipse(-17*resize/100 + bitmojiX,-10*resize/100 + bitmojiY,16*resize/100,10*resize/100);      //left whites
    ellipse(17*resize/100 + bitmojiX,-10*resize/100 + bitmojiY,16*resize/100,10*resize/100);      //right whites
    arc(bitmojiX,21*resize/100 + bitmojiY,41*resize/100,20*resize/100,1,180);    //mouth
    strokeWeight(1);
    line(-20*resize/100 + bitmojiX,21*resize/100 + bitmojiY,20*resize/100 + bitmojiX,21*resize/100 + bitmojiY);
    line(bitmojiX,21*resize/100 + bitmojiY,bitmojiX,30*resize/100 + bitmojiY);       //center line
    line(-7*resize/100 + bitmojiX,21*resize/100 + bitmojiY,-7*resize/100 + bitmojiX,29*resize/100 + bitmojiY);       //left line
    line(-14*resize/100 + bitmojiX,21*resize/100 + bitmojiY,-14*resize/100 + bitmojiX,27*resize/100 + bitmojiY);       //far left line
    line(7*resize/100 + bitmojiX,21*resize/100 + bitmojiY,7*resize/100 + bitmojiX,29*resize/100 + bitmojiY);       //right line
    line(14*resize/100 + bitmojiX,21*resize/100 + bitmojiY,14*resize/100 + bitmojiX,27*resize/100 + bitmojiY);       //far right line
    
    
    noStroke();
    fill(99, 54, 0);             //haircolor
    arc(1*resize/100 + bitmojiX,-24*resize/100 + bitmojiY,76*resize/100,53*resize/100,-163,32);  //hair
    ellipse(-17*resize/100 + bitmojiX,-10*resize/100 + bitmojiY,10*resize/100,10*resize/100);      //left iris
    ellipse(17*resize/100 + bitmojiX,-10*resize/100 + bitmojiY,10*resize/100,10*resize/100);      //right iris
    stroke(0, 0, 0);
    strokeWeight(3*resize/100);
    point(-17*resize/100 + bitmojiX,-10*resize/100 + bitmojiY);              //left pupil
    point(17*resize/100 + bitmojiX,-10*resize/100 + bitmojiY);              //right pupil
    
    
    
};
var drawBitmojiBody = function(resize,bitmojiX,bitmojiY) {
    noStroke();

fill(255, 219, 172);
rect(-10*resize/100 + bitmojiX,47*resize/100 + bitmojiY,20*resize/100,20*resize/100);         //neck
rect(-75*resize/100 + bitmojiX,94*resize/100 + bitmojiY,21*resize/100,70*resize/100);         //right arm
rect(58*resize/100 + bitmojiX,94*resize/100 + bitmojiY,21*resize/100,70*resize/100);         //left arm

fill(72, 137, 207);
rect(-46*resize/100 + bitmojiX,57*resize/100 + bitmojiY,95*resize/100,125*resize/100,35);    //shirt
quad(-76*resize/100 + bitmojiX,95*resize/100 + bitmojiY,-54*resize/100 + bitmojiX,115*resize/100 + bitmojiY,-34*resize/100 + bitmojiX,90*resize/100 + bitmojiY,-29*resize/100 + bitmojiX,61*resize/100 + bitmojiY);//leftsleeve
quad(80*resize/100 + bitmojiX,95*resize/100 + bitmojiY,57*resize/100 + bitmojiX,115*resize/100 + bitmojiY,44*resize/100 + bitmojiX,90*resize/100 + bitmojiY,29*resize/100 + bitmojiX,59*resize/100 + bitmojiY);//leftsleeve

fill(255, 219, 172);
arc(bitmojiX,57*resize/100 + bitmojiY,34*resize/100,34*resize/100,1,180);    //chest

stroke(0,0,0);
strokeWeight(1);

line(-27*resize/100 + bitmojiX,100*resize/100 + bitmojiY,31*resize/100 + bitmojiX,100*resize/100 + bitmojiY);       //top shirt line
line(-27*resize/100 + bitmojiX,120*resize/100 + bitmojiY,31*resize/100 + bitmojiX,120*resize/100 + bitmojiY);       //bottom shirt line

fill(0, 0, 0);
triangle(9*resize/100 + bitmojiX,120*resize/100 + bitmojiY,-2*resize/100 + bitmojiX,120*resize/100 + bitmojiY,3*resize/100 + bitmojiX,96*resize/100 + bitmojiY);
arc(3*resize/100 + bitmojiX,93*resize/100 + bitmojiY,15*resize/100,13*resize/100,1,180);

fill(0, 0, 0);
textSize(12*resize/100);
text("JD",22*resize/100 + bitmojiX,80*resize/100 + bitmojiY);

fill(255,255,255);
text("SALT   LIFE",-34*resize/100 + bitmojiX,115*resize/100 + bitmojiY);
    
};
var drawBitmojiJD = function(resize,bitmojiX,bitmojiY) {
    rectMode(CORNER);
    drawBitmojiFace(resize,bitmojiX,bitmojiY);
    drawBitmojiBody(resize,bitmojiX,bitmojiY);
    //Hit Box = [-25,+25,-15,+50]
};



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
    noStroke();
    //LIGHT SHADED
    fill(255, 255, 255);
    rect(this.x,this.y,this.width,this.height);
    //DARK SHADED
    fill(122, 122, 122);
    triangle(this.x + this.width,this.y + 10,this.x + this.width,this.y,this.x + (this.width - 10),this.y  + 10);
    triangle(this.x,this.y + this.height,this.x + 10,this.y + (this.height - 10),this.x + 10,this.y + this.height);
    rect(this.x + 3,this.y + 3,this.width-3,this.height-3);
    //CENTER GREY
    fill(224, 224, 224);
    rect(this.x + 3,this.y + 3,this.width-6,this.height-6);

    //TEXT
    fill(0, 0, 0);
    textSize(19);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.width/2, this.y + this.height/2);

};

Button.prototype.isMouseInside = function() {
    return mouseX > this.x &&
           mouseX < (this.x + this.width) &&
           mouseY > this.y &&
           mouseY < (this.y + this.height);
};

Button.prototype.handleMouseClick = function(x) {
    if (this.isMouseInside()) {
        this.onClick(x);
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
    
//BUTTONS (START BUTTON FURTHER DOWN)

//BACK TO MENU BUTTON(s) (in the lose/win screen, this button takes you back to the menu)
var menu = new Button({
    x:125,
    y: 315,
    width: 150,
    height: 50,
    label: "Back to Menu",
    onClick: function() {
        
        currentScene = 0;
        stillPlaying = true;
        
    }
});

//NEXT BUTTON FOR INSTRUCTIONS (can change from one scene to any other scene with a parameter)
var nextButton = new Button({
    x: 161,
    y: 328,
    width: 80,
    label: "Next",
    onClick: function(x) {
        currentScene = x;
    }
});

//START BUTTON (takes you to the difficulty select screen)
var startButton = new Button({
    x: 97,
    y: 321,
    width: 75,
    height: 50,
    label: "Start",
    onClick: function() {
        
        currentScene = 5;
        
    }
});

//INSTRUCTIONS (takes you to the first instructions scene)
var instructionsButton = new Button({
    x: 235,
    y: 321,
    width: 144,
    height: 50,
    label: "Instructions",
    onClick: function() {
        
        currentScene = 2;
    
    }
});


//FUNCTIONS FOR SCENES (DISPLAY ONLY: DO NOT AFFECT GAMEPLAY)

//Draws a stylized large bomb for the instructions
var drawBombInstructions = function(x, y) {
    fill(0, 0, 0);
    ellipse(x + 200, y +224, 70, 70);
    rect(x + 192, y +171, 17, 50);
};

//Draws a non-game tile for the instructions
var tileDrawInstructions = function(x, y) {
        noStroke();
        fill(224, 224, 224);
        triangle(x, y, x, y + 20,x + 20, y);
        fill(82, 82, 82);
        triangle(x + 20, y + 20, x, y + 20, x + 20, y);
        fill(168, 168, 168);
        rect(x + 2, y + 2, 16,16);
};

//Draws a non-game flag for the instructions
var flagDrawInstructions = function(x, y) {
    fill(168, 168, 168);
    rect(x , y, 20, 20);
    fill(255, 0, 0);
    triangle(x + 8, y + 4, x + 8, y + 12, x + 14, y + 8);
    stroke(255, 0, 0);
    line( x + 8, y + 4, x + 8, y + 15);
    
};

//Draws a non-game bomb for the instructions
var tileBombDrawInstructions = function(x, y) {
    fill(168, 168, 168);
    rect(x , y, 20, 20);
    noStroke();
    fill(0, 0, 0);
    ellipse(x + 10, y + 12, 10, 10);
    rect(x + 9, y + 4, 2, 5);
    
};

//Draws a stylized large flag for the instructions
var bigFlagDrawInstructions = function(x, y) {
    fill(168, 168, 168);
    fill(255, 0, 0);
    triangle(x + 80, y + 40, x + 80, y + 120, x + 140, y + 80);
    stroke(255, 0, 0);
    
    rect(279, 249, 5, 110);
    
};

//Draws a non-game number for the instructions
var tileNumInstructions = function(num, x, y){
    fill(168, 168, 168);
    rect(x , y, 20, 20);
    textSize(20);
    //checks to see what number you choose
    switch (num) {
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
            
            text(num, x+5, y-1);
    
};


//TILE CONSTRUCTOR (used in the gameplay(); scene
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

//Returns true or false if the mouse is inside or outside of the tile respectively
Tile.prototype.mouseIsInside = function() {
    
    if (mouseX > this.x && mouseX < this.x + 20 && mouseY > this.y && mouseY < this.y + 20)     {
        
        return true;
        
    }
    
    return false;
    
};

//Draws the tile in game (depending on conditions, can draw things on top of tiles)
Tile.prototype.draw = function() {
    
    //If the tile hasnt been clicked
    if (!this.clicked) {
        
        noStroke();
        fill(224, 224, 224);
        triangle(this.x,this.y,this.x,this.y + 20,this.x + 20,this.y);
        fill(82, 82, 82);
        triangle(this.x + 20,this.y + 20,this.x,this.y + 20,this.x + 20,this.y);
        fill(168, 168, 168);
        rect(this.x + 2,this.y + 2,16,16);
        
        //If the tile has been right clicked and has a flag
        if (this.hasFlag) {
            
            fill(255, 0, 0);
            triangle(this.x + 8,this.y + 4,this.x + 8,this.y + 12,this.x + 14,this.y + 8);
            
            stroke(255, 0, 0);
            line(this.x + 8,this.y + 4,this.x + 8,this.y + 15);
            
        }
        
    }
    
    //If the tile has been clicked and doesnt have a flag on it
    if (this.clicked && !this.hasFlag) {
        
        stroke(71, 71, 71);
        fill(168, 168, 168);
        rect(this.x,this.y,20,20);
        
        //Checks to see if the tile is a bomb. If not, draw its label with a specific color
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
        
        //If this tile is a bomb, draw the bomb when clicked
        if (this.isBomb === 1) {
            
            noStroke();
            fill(0, 0, 0);
            ellipse(this.x + 10, this.y + 12, 10, 10);
            rect(this.x + 9, this.y + 4, 2, 5);
            
    }
    
    }
    
    
    
};



//FUNCTIONS

//Checks the isBomb element, and returns the value. If the grid point doesnt exist in the grid array, it returns 0
var checkSingleLabel = function(i,j) {
    
    if (i >= 0 && i <= 14 && j >= 0 && j <= 19) {
        
        return grid[i][j].isBomb;
        
    }
    else {return 0;}
};

//Runs a function that detects all of the bombs around it by detecting isBomb using eight checkSingleLabel function
var checkLabels = function() {
    
   for (var i = 0; i < 15; i++) {
        
        for (var j = 0; j < 20; j++) {
            
            if (grid[i][j].isBomb !== 1) {
                
                grid[i][j].label = (checkSingleLabel(i-1,j-1) + checkSingleLabel(i-1,j) + checkSingleLabel(i-1,j+1) + checkSingleLabel(i,j-1) + checkSingleLabel(i,j+1) + checkSingleLabel(i+1,j-1) + checkSingleLabel(i+1,j) + checkSingleLabel(i+1,j+1)).toString();
                
            }
            
        }
        
    }
    
};

//Uses the virtual grid bombSelectGrid to set a random tile, and specific number of tiles to be bombs
var makeBombs = function() {
    
    for (var i = 0; i < numberOfFlags; i++) {
        
        //Selects a random index in the bombselectgrid
        var x = round(random(0,bombSelectGrid.length - 1));
        
        //Changes the grid[i][j] index to be a bomb outside of the virtual array
        grid[bombSelectGrid[x][0]][bombSelectGrid[x][1]].isBomb = 1;
        
        //Deletes the index from the grid so it cant happen twice
        bombSelectGrid.splice(x,1);
        
        
    }
    
    
};

//Goes through all tiles, and if any bomb has no flag over it, returns the lose end screen and stops playing. Else, return win screen and stop playing
var checkBombs = function() {
    
    if (numberOfFlags === 0) {
    
        for (var i = 0; i < 15; i++) {
            
            for (var j = 0; j < 20; j++) {
                
                if (grid[i][j].isBomb === 1 && grid[i][j].hasFlag === false) {
                    
                    stillPlaying = false;
                    
                    endGameMessage = "Lost!";
                    
                    return;
                    
                }
                
            }
            
        }
        
        stillPlaying = false;
        
        endGameMessage = "Won!";
        
        return;
        
    }
    else {
        
        stillPlaying = false;
        
        endGameMessage = "Lost!";
        
        return;
        
    }
    
    
};

//If the tile clicked has a label of zero (no bombs around it) recursively run this function for the eight surrounding tiles (if they exist on the grid)
var clearNeighbors = function(i,j) {
    
    if (i >= 0 && i <= 14 && j >= 0 && j <= 19) {
        
        if (grid[i][j].hasFlag === true || grid[i][j].clicked === true) {}
        else if (grid[i][j].label === "0") {
            
            grid[i][j].clicked = true;
            
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
            
        }
    
    }
    
};

//CREATE GRID OF TILES

//Runs the set up for the game (functions explained above)
var runStart = function() {
    
    grid = [];
    bombSelectGrid = [];
    
    for (var i = 0; i < 15; i++) {
        
        var temp = [];
        
        for (var j = 0; j < 20; j++) {
            
            temp.push(new Tile(j * 20, 100 + i * 20, i, j));
            bombSelectGrid.push([i,j]);
            
        }
        
        grid.push(temp);
        
        
    }
    
    makeBombs();
    checkLabels();
    
};

//BUTTONS REQUIRING CODE ABOVE (difficulty buttons change the number of bombs/flags according to the selection, 15, 25, 35 respectively)
var easyButton = new Button({
    x: 161,
    y: 179,
    width: 80,
    label: "Easy",
    onClick: function() {
        
        numberOfFlags = 15;
        
        currentScene = 1;
        
        runStart();
        
        stillPlaying = true;
        
        startTime = millis();
        
    }
});

var mediumButton = new Button({
    x: 161,
    y: 256,
    width: 80,
    label: "Medium",
    onClick: function() {
        
        numberOfFlags = 25;
        
        currentScene = 1;
        
        runStart();
        
        stillPlaying = true;
        
        startTime = millis();
        
    }
});

var hardButton = new Button({
    x: 161,
    y: 328,
    width: 80,
    label: "Hard",
    onClick: function() {
        
        numberOfFlags = 35;
        
        currentScene = 1;
        
        runStart();
        
        stillPlaying = true;
        
        startTime = millis();
        
    }
});

//The button when in the game, click when you believe you have flagged all the bombs
var bombCheckButton = new Button ({
    
    x: 170,
    y: 20,
    width: 60,
    height: 60,
    label: " ",
    onClick: function() {
        
        checkBombs();
        
    }
    
});

//SCENES
//Splash screen
var splashScreen = function() 
{
 
    textAlign(LEFT, BOTTOM);
    background(82, 82, 82);
    noStroke();
    
    //LIGHT SHADED
    fill(191, 191, 191);
    triangle(400,400,400,0,0,400);
    
    //CENTER GREY
    fill(168, 168, 168);
    rect(3,3,394, 395);
    
    //SHADOW TEXT
    fill(82, 82, 82);
    textSize(52);
    textFont(createFont('monospace'));
    text("MINESWEEPER", 43, 74);
    textSize(15);
    text("By JD Dauphinais and Madison Sherlock", 43, 102);
    
    //REGULAR TEXT
    fill(255, 255, 255);
    textSize(52);
    textFont(createFont('monospace'));
    text("MINESWEEPER", 43, 71);
    textSize(15);
    text("By JD Dauphinais and Madison Sherlock", 43, 100);
    
    //Bomb
    fill(0, 0, 0);
    ellipse(200, 224, 70, 70);
    rect(192, 171, 17, 50);
    
    drawBitmoji (321, 202, 148);
    drawBitmojiJD(65, 83, 173);
    noStroke();
    
    //Button
    startButton.draw();
    instructionsButton.draw();
    
};
//First instruction scene
var instructScreen1 = function()
{
    
    background(168, 168, 168);
    noStroke();
    
    //DARK SHADED
    fill(82, 82, 82);
    rect(0,0,400, 397);
    
    //LIGHT SHADED
    fill(191, 191, 191);
    rect(390,48,400, 397);
    triangle(400,100,400,0,300,100);
    rect(-7,397,400,97);
    
    //CENTER GREY
    fill(168, 168, 168);
    rect(3,3,394, 395);
    
    //SHADOW TEXT
    textAlign(LEFT, TOP);
    fill(82, 82, 82);
    textSize(52);
    textFont(createFont('monospace'));
    text("RULES:", 130, 16);
    textSize(15);
    text("There are several bombs hidden in the tiles. \n It's up to you to flag all of them until \n it's too late! In order to find the bombs, \n you can click on a tile with the left \n mouse key to destroy it. \n \n However, if you destroy a tile with a bomb \n inside, it's game over! ", 20, 89.5);
    
    
    //REGULAR TEXT
    fill(255, 255, 255);
    textSize(52);
    textFont(createFont('monospace'));
    text("RULES:", 130, 13);
    textSize(15);
    text("There are several bombs hidden in the tiles. \n It's up to you to flag all of them until \n it's too late! In order to find the bombs, \n you can click on a tile with the left \n mouse key to destroy it. \n \n However, if you destroy a tile with a bomb \n inside, it's game over! ", 20, 88);
    
    //Bomb
    drawBombInstructions(117, 93);
    
    
    //tiles
    for (var i = 0; i < 6; i++)
    {
        for (var j = 0; j < 6; j++)
        {
            tileDrawInstructions(15 + (20 * i), 250 + (20 * j));
        }
    }
    
    
    noStroke();
    
    //Button
    nextButton.draw();

    
};
//Second instruction scene
var instructScreen2 = function()
{
    
    background(168, 168, 168);
    noStroke();
    
    //DARK SHADED
    fill(82, 82, 82);
    rect(0,0,400, 397);
    
    //LIGHT SHADED
    fill(191, 191, 191);
    rect(390,48,400, 397);
    triangle(400,100,400,0,300,100);
    rect(-7,397,400,97);
    
    //CENTER GREY
    fill(168, 168, 168);
    rect(3,3,394, 395);
    
    //SHADOW TEXT
    textAlign(LEFT, TOP);
    fill(82, 82, 82);
    textSize(52);
    textFont(createFont('monospace'));
    text("RULES:", 130, 16);
    textSize(15);
    text("In order to place a flag on the tile, you use \nthe right mouse key. You should try to place \na flag whenever you think a bomb is in a \ntile. If you correctly place flags on all \nthe bombs, you win the game!", 20, 89.5);
    
    
    
    //REGULAR TEXT
    fill(255, 255, 255);
    textSize(52);
    textFont(createFont('monospace'));
    text("RULES:", 130, 13);
    textSize(15);
    text("In order to place a flag on the tile, you use \nthe right mouse key. You should try to place \na flag whenever you think a bomb is in a \ntile. If you correctly place flags on all \nthe bombs, you win the game!", 20, 88);
    
    
    
    
    //tiles
    for (var i = 0; i < 6; i++)
    {
        for (var j = 0; j < 6; j++)
        {
            tileDrawInstructions(15 + (20 * i), 250 + (20 * j));
        }
    }
    
    //flag on tile
    flagDrawInstructions(55, 290);
    
    //big flag
    bigFlagDrawInstructions(200, 200);
    
    
    noStroke();
    
    //Button
    nextButton.draw();

    
};
//Third instruction scene
var instructScreen3 = function()
{
    
    background(168, 168, 168);
    noStroke();
    
    //DARK SHADED
    fill(82, 82, 82);
    rect(0,0,400, 397);
    
    //LIGHT SHADED
    fill(191, 191, 191);
    rect(390,48,400, 397);
    triangle(400,100,400,0,300,100);
    rect(-7,397,400,97);
    
    //CENTER GREY
    fill(168, 168, 168);
    rect(3,3,394, 395);
    
    //SHADOW TEXT
    textAlign(LEFT, TOP);
    fill(82, 82, 82);
    textSize(52);
    textFont(createFont('monospace'));
    text("RULES:", 130, 16);
    textSize(15);
    text("Occasionally, a number will appear when you \ndestroy a tile: that number shows the number \nof bombs adjacent to that tile. Make sure to \nuse these numbers as clues!", 20, 89.5);
    
    
    
    //REGULAR TEXT
    fill(255, 255, 255);
    textSize(52);
    textFont(createFont('monospace'));
    text("RULES:", 130, 13);
    textSize(15);
    text("Occasionally, a number will appear when you \ndestroy a tile: that number shows the number \nof bombs adjacent to that tile. Make sure to \nuse these numbers as clues!", 20, 88);
    
    
    
    
    //tiles
    for (var i = 0; i < 6; i++)
    {
        for (var j = 0; j < 6; j++)
        {
            tileDrawInstructions(15 + (20 * i), 250 + (20 * j));
        }
    }
    
    //bomb on tile
    tileBombDrawInstructions(55, 290);
    tileBombDrawInstructions(95, 290);
    //numbers
    tileNumInstructions("1", 35, 290);
    tileNumInstructions("1", 35, 270);
    tileNumInstructions("1", 35, 310);
    tileNumInstructions("1", 55, 270);
    tileNumInstructions("1", 55, 310);
    tileNumInstructions("1", 35, 290);
    tileNumInstructions("1", 35, 270);
    tileNumInstructions("2", 75, 290);
    tileNumInstructions("2", 75, 270);
    tileNumInstructions("2", 75, 310);
    tileNumInstructions("1", 115, 270);
    tileNumInstructions("1", 115, 290);
    tileNumInstructions("1", 115, 310);
    tileNumInstructions("1", 95, 270);
    tileNumInstructions("1", 95, 310);
    
    //big numbers
    fill(0, 0, 255);
    textSize(75);
    text("1", 263, 200);
    fill(0, 158, 0);
    text("2", 326, 200);
    fill(255, 0, 0);
    text("3", 263, 276);
    fill(0, 0, 133);
    text("4", 326, 276);
    
    
    noStroke();
    
    //Button
    nextButton.draw();

    
};
//Difficulty selection screen
var difficultyScreen = function()
{
    
    background(168, 168, 168);
    noStroke();
    
    //DARK SHADED
    fill(82, 82, 82);
    rect(0,0,400, 397);
    
    //LIGHT SHADED
    fill(191, 191, 191);
    rect(390,48,400, 397);
    triangle(400,100,400,0,300,100);
    rect(-7,397,400,97);
    
    //CENTER GREY
    fill(168, 168, 168);
    rect(3,3,394, 395);
    
    //SHADOW TEXT
    fill(82, 82, 82);
    textSize(35);
    textFont(createFont('monospace'));
    text("SELECT A DIFFICULTY", 200, 57);
    textSize(15);
    text("(note: this will determine the number of \nbombs that will be in the game)", 210, 89.5);
    
    
    //REGULAR TEXT
    fill(255, 255, 255);
    textSize(35);
    textFont(createFont('monospace'));
    text("SELECT A DIFFICULTY", 200, 54);
    textSize(15);
    text("(note: this will determine the number of \nbombs that will be in the game)", 210, 88);
    
    
    noStroke();
    
    //Button
    easyButton.draw();
    mediumButton.draw();
    hardButton.draw();

    
};
//Runs all code for the game. Further explination inside
var gameplay = function() {
    
    for (var i = 0; i < 15; i++) {
        
        for (var j = 0; j < 20; j++) {
            
            if (millis() - startTime > 100 && mouseClicked && grid[i][j].mouseIsInside() && mouseButton === LEFT && !grid[i][j].hasFlag && !grid[i][j].clicked) {
                
                clearNeighbors(i,j);
                
                if (grid[i][j].isBomb === 1) {
                    
                    stillPlaying = false;
                    endGameMessage = "Lost!";
                    
                }
                
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
    
    //BUTTONS
    bombCheckButton.draw();
    image(getImage("creatures/Winston"),179,30,40,40);
    
};
//End screen for the game when won or lost
var endScreen = function() {
    
    textAlign(CENTER, CENTER);
    background(82, 82, 82);
    noStroke();
    
    //LIGHT SHADED
    fill(191, 191, 191);
    triangle(400,400,400,0,0,400);
    
    //CENTER GREY
    fill(168, 168, 168);
    rect(3,3,394, 395);
    
    //SHADOW TEXT
    fill(82, 82, 82);
    textSize(52);
    textFont(createFont('monospace'));
    text("You " + endGameMessage, width/2, 74);
    textSize(32);
    text("Bombs Remaining: " + numberOfFlags,width/2,200);
    text("Time: " + time + " seconds",width/2,250);
    
    //REGULAR TEXT
    fill(255, 255, 255);
    textSize(52);
    textFont(createFont('monospace'));
    text("You " + endGameMessage, width/2, 71);
    textSize(32);
    text("Bombs Remaining: " + numberOfFlags,width/2,198);
    text("Time: " + time + " seconds",width/2,248);
    
    //BUTTON(S)
    menu.draw();
    
};

//MAIN DRAW LOOP

draw = function() {
    
    /*
    REFERENCE FOR SCENE NUMBERS:
    0 = Splash Scene
    1 = Gameplay
    2, 3, and 4 = Instructions
    5 = difficulty setting
    */
    if (stillPlaying) {
        
        time = floor((millis() - startTime)/1000);
        
    }
    
    if (currentScene === 0) {
      
        splashScreen();
      
    }
    else if (currentScene === 1 && stillPlaying){
        
        gameplay();
        
    }
    else if (currentScene === 1 && !stillPlaying) {
        
        endScreen();
        
    }
    else if (currentScene === 2){
        
        instructScreen1();
        
    }
    else if (currentScene === 3){
        
        instructScreen2();
        
    }
    else if (currentScene === 4){
        
        instructScreen3();
        
    }
    else if (currentScene === 5){
        
        difficultyScreen();
        
    }
    
    
    
    mouseClicked = false;
    
};

//WHEN MOUSE RELEASED

//Handles all button presses and enables mouse interaction with the tiles
mouseReleased = function () {
    
    mouseClicked = true;
    
    if (currentScene === 0) {
        
        startButton.handleMouseClick();
        instructionsButton.handleMouseClick();
        
    }
    
    if (currentScene === 1 && stillPlaying) {
        
        //GAME BUTTON LOGIC
        bombCheckButton.handleMouseClick();
        
    }
    else if (currentScene === 1 && !stillPlaying) {
        
        //END SCREEN BUTTON LOGIC
        menu.handleMouseClick();
        
    }    

    
    if (currentScene === 2) {
        
        nextButton.handleMouseClick(3);
        
    }
    else if (currentScene === 3) {
        
        nextButton.handleMouseClick(4);
        
    }
    else if (currentScene === 4) {
        
        nextButton.handleMouseClick(0);
        
    }
    else if (currentScene === 5) {
        
        easyButton.handleMouseClick();
        mediumButton.handleMouseClick();
        hardButton.handleMouseClick();
        
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
