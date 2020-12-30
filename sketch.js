//Create variables here
var dog, happyDog
var dogImg, happyDogImg
var database
var foodS, foodStock

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {  
  background(255,204,255);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  
  textSize(20);
  fill(255);
  text("Press Up Arrow to Feed the Dog",20,20);
  text("Food:"+ foodS,180,150);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else {
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  });
}


