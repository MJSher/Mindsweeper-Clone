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
    fill(255, 255, 255);
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

//START BUTTON: Starts the game
var startButton = new Button({
    x: 165,
    y: 321,
    width: 75,
    label: "Start",
    onClick: function() {
        //currentScene = 1;
        //gameScene();
        println("This works!");
        
    }
});

mouseClicked = function() {
    startButton.handleMouseClick();
};
    


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
var checkLabels = function() {
    
   for (var i = 0; i < 15; i++) {
        
        for (var j = 0; j < 20; j++) {
            
            if (grid[i][j].isBomb !== 1) {
            
                if (i === 0 && j === 0) {
                    
                    grid[0][0].label = (grid[0][1].isBomb + grid[1][1].isBomb + grid[1][0].isBomb).toString();
                    
                }
                else if (i === 0 && j === 19)   {
                    
                    grid[0][19].label = (grid[0][18].isBomb + grid[1][18].isBomb + grid[1][19].isBomb).toString();
                    
                }
                else if (i === 14 && j === 0)   {
                    
                    grid[14][0].label = (grid[14][1].isBomb + grid[13][1].isBomb + grid[13][0].isBomb).toString();
                    
                }
                else if (i === 14 && j === 19)  {
                    
                    grid[14][19].label = (grid[14][18].isBomb + grid[13][18].isBomb + grid[13][19].isBomb).toString();
                    
                }
                else if (i === 0)   {
                    
                    grid[i][j].label = (grid[i][j-1].isBomb + grid[i][j+1].isBomb + grid[i+1][j-1].isBomb + grid[i+1][j].isBomb + grid[i+1][j+1].isBomb).toString();
                    
                }
                else if (i === 14)  {
                    
                    grid[i][j].label = (grid[i][j-1].isBomb + grid[i][j+1].isBomb + grid[i-1][j-1].isBomb + grid[i-1][j].isBomb + grid[i-1][j+1].isBomb).toString();
                    
                }
                else if (j === 0)   {
                    
                    grid[i][j].label = (grid[i-1][j].isBomb + grid[i+1][j].isBomb + grid[i-1][j+1].isBomb + grid[i][j+1].isBomb + grid[i+1][j+1].isBomb).toString();
                    
                }
                else if (j === 19)  {
                    
                    grid[i][j].label = (grid[i-1][j].isBomb + grid[i+1][j].isBomb + grid[i-1][j-1].isBomb + grid[i][j-1].isBomb + grid[i+1][j-1].isBomb).toString();
                    
                }
                else                {
                    
                    grid[i][j].label = (grid[i-1][j-1].isBomb + grid[i-1][j].isBomb + grid[i-1][j+1].isBomb + grid[i][j-1].isBomb + grid[i][j+1].isBomb + grid[i+1][j-1].isBomb + grid[i+1][j].isBomb + grid[i+1][j+1].isBomb).toString();
                    
                }
                
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
var splashScreen = function() {
 
    textAlign(LEFT, BOTTOM);
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
    
};

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
    
    if (currentScene === 0) {
        splashScreen();
    }
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
