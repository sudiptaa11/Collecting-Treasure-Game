var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg, endImg; 
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  //loading the path image
  pathImg = loadImage("Road.png");
  
  //loading the boy animation
  boyImg = loadAnimation("runner1.png","runner2.png");
  
  //loading the images of different sprites
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  
  //loading the end animation
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
createCanvas(600,400);
  
// Moving background
path=createSprite(300,300);
path.addImage(pathImg);


//creating boy running
boy = createSprite(100,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("SahilLost",endImg);
boy.scale=0.08;
  

//creating groups for each sprite
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  //determining the condotions when gameState is play
  if (gameState === PLAY) {
    path.velocityY = 4;
    //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
    //moving boy with mouse's x direction
    boy.x = World.mouseX;
    
    //calling the functions of creating sprites
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    if (cashG.isTouching(boy)) {
      //destroying cash when the boy touches it
      cashG.destroyEach();
      //increasing the score by 50
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      //destroying diamonds when the boy touches it
      diamondsG.destroyEach();
      //increasing the score by 100
      treasureCollection = treasureCollection + 100;
    }
    else if(jwelleryG.isTouching(boy)) {
      //destroying jwellery when the boy touches it
      jwelleryG.destroyEach();
      //increasing score by 150
      treasureCollection = treasureCollection + 150;
    }
    else if(swordGroup.isTouching(boy)) {
      //destroying sword when the boy touches it
      swordGroup.destroyEach();
      //increasing score y 200
      treasureCollection = treasureCollection + 200;
      //increasing the scale for the new animation of boy
      boy.scale = 1;
      //setting gameState to end
      gameState = END;
    }
  }
  //determining conditions when gameState is end
  if (gameState === END) {
    path.velocityY = 0;
    //changing the animation to game over
    boy.changeAnimation("SahilLost" ,endImg);
    //changing the x and y position
    boy.x = 300;
    boy.y = 200;
    
    //destroying all the sprites and setting their velocity 0
    cashG.destroyEach();
    cashG.setVelocityEach(0);
    diamondsG.destroyEach();
    diamondsG.setVelocityEach(0);
    jwelleryG.destroyEach();
    jwelleryG.setVelocityEach(0);
    swordGroup.destroyEach();
    swordGroup.setVelocityEach(0);
  }
  
  background(0);
  
  //creaing edges and making boy collide with it
  edges= createEdgeSprites();
  boy.collide(edges);
  
  drawSprites();
  //displaying score;
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  //creating cash in each 50 frames
  if (World.frameCount % 100 == 0) {
    //generating random x position
    var cash = createSprite(Math.round(random(50, 350),40,      10, 10));
    //adding image and setting scale
    cash.addImage(cashImg);
    cash.scale=0.12;
    //giving velocity
    cash.velocityY = 3;
    //giving lifetime
    cash.lifetime = 150;
    //adding variable in group
    cashG.add(cash);
  }
}

function createDiamonds() {
  //creating diamonds in each 80 frames
  if (World.frameCount % 120 == 0) {
    //generating random x position
    var diamonds = createSprite(Math.round(random(50,350),40,    10, 10));
    //adding image and setting scale
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    //giving velocity
    diamonds.velocityY = 3;
    //giving lifetime
    diamonds.lifetime = 150;
    //adding variable to group
    diamondsG.add(diamonds);
}
}

function createJwellery() {
  //creating jwellery in each 80 frames
  if (World.frameCount % 140 == 0) {
    //generating random x position
    var jwellery = createSprite(Math.round(random(50,350),40,    10, 10));
    //adding image and setting scale
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    //giving velocity
    jwellery.velocityY = 3;
    //giving lifetime
    jwellery.lifetime = 150;
    //adding variable to group
    jwelleryG.add(jwellery);
  }
}

function createSword(){
  //creating sword in each 150 frames
  if (World.frameCount % 160 == 0) {
    //generating random x position
    var sword = createSprite(Math.round(random(50, 350),40,      10, 10));
    //adding image and setting scale
    sword.addImage(swordImg);
    sword.scale=0.1;
    //giving velocity
    sword.velocityY = 3;
    //giving lefetime
    sword.lifetime = 150;
    //adding variable to group
    swordGroup.add(sword);
  }
}