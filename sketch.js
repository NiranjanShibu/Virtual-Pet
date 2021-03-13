var dog,sadDog,happyDog, milk;
var foodstock=10;
var database;
var given = 0;
var tagX = 783;
var tagY = 270;
var fedTime = 11;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  milk=loadImage("Images/Milk.png");
}

function setup() {
  database = firebase.database();
  console.log("connected to database");

  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
}

function draw() {
  background(46,139,87);
  fill("black");
  text("Click up-arrow to buy more food, and click down-arrow to give Chase food.", 280, 40);
  text("Chase", tagX, tagY);

  if(fedTime>=12){
    text("Last Fed: "+fedTime%12+" PM", 444, 370);
  }else if(fedTime==0){
    text("Last Fed: 12 AM", 444, 370);
  }else{
    text("Last Fed: "+fedTime+" AM", 444, 370);
  }

  if(keyWentDown(DOWN_ARROW)&&foodstock>0){
    foodstock=foodstock-1;
    dog.addImage(happyDog);
    updatefedTime();
    given = 1;
  }
  if(keyWentDown(UP_ARROW)&&foodstock<40){
    foodstock=foodstock+1;
  }

    if(given == 1){
    image(milk,710, 200, 50, 50);
    tagX = 791;
    tagY = 256;
    }

  var x=500;
  var y=43;
  if(foodstock>0){
    for (var i = 0; i < foodstock; i++) {
        if(i%10==0){
            x=80;
            y=y+50;
        }    
        image(milk,x,y,50,50);         
        x=x+30;
    }
}

  updatefoodStock();

  drawSprites();
}

function updatefoodStock(){

  var foodStockRef = database.ref('/');
        foodStockRef.update({
    
            foods: foodstock
    
        });

}

function updatefedTime(){

  fedTime = hour();

  var fedtimeRef = database.ref('/');
      fedtimeRef.update({
    
            feedTime: hour()
    
        });
}
