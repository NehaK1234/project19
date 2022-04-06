//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;

function preload(){
  
  knifeImage = loadImage("gairb.png");
  monsterImage = loadAnimation("car1.png")
  fruit1 = loadImage("book.png");
  fruit2 = loadImage("book2.png");
  fruit3 = loadImage("book3.png");
  fruit4 = loadImage("book.png");
  gameOverImage = loadImage("girlg.png")
  
  gameOverSound = loadSound("cry.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}


function setup() {
  createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);
  
   knife=createSprite(800,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=1.5
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
if(gameState===PLAY){
    
  fruits();
    Monster();
    knife.y=World.mouseY;
    
  if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+1;
     }
    else
    {
     
      if(monsterGroup.isTouching(knife)){
        gameState=END;
       
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        
        knife.addImage(gameOverImage);
        knife.scale=1.2;
        knife.x=1000;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  
  textSize(25);
  text("Score : "+ score,250,50);
}






function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(300));
    monster.velocityX=(8+(score/10));
    monster.setLifetime=50;
    monster.scale=0.5
    monsterGroup.add(monster);
  }}



function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
  

       fruit.velocityX= (7+(score/4));
      
     
    fruit.scale=0.5;
     
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}