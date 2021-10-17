var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground, ground_image, invisible_ground;
var girl, girl_running, girl_collided, girlImage
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var jumpSound, dieSound, checkpointSound;
var score;
var gameOver, restart, gameOverImage, restartImage;

function preload() {
  ground_image = loadImage("Background.png");
  girl_running = loadAnimation("Run (1).png", "Run (2).png", "Run (3).png", "Run (4).png", "Run (5).png", "Run (6).png", "Run (7).png", "Run (8).png", "Run (9).png", "Run (10).png", "Run (11).png", "Run (12).png", "Run (14).png", "Run (15).png", "Run (16).png", "Run (17).png", "Run (18).png", "Run (19).png", "Run (20).png");
  gameOverImage = loadImage("gameOver1.png");
  restartImage = loadImage("restart1.png");
  girl_collided = loadImage("Dead (30).png");
  girlImage = loadImage("Idle (1).png");
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")

}

function setup() {
  createCanvas(600, 500);

  ground = createSprite(0, 0, 0, 0);
  ground.shapeColor = "white";
  ground.addImage("ground_image", ground_image);
  ground.scale = 1.4;
  ground.velocityX = -1

  girl = createSprite(300, 420, 600, 10);
  girl.addAnimation("girl_running", girl_running);
  girl.addImage("girl_collided", girl_collided);
  girl.addImage("girlImage", girlImage);
  girl.scale = 0.2;
  // girl.velocityX=2;
  girl.debug = false;
  girl.setCollider("rectangle", 0, 0, girl.width, girl.height)

  invisible_ground = createSprite(300, 470, 600, 10);
  invisible_ground.visible = false;

  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImage);

  restart = createSprite(300, 180);
  restart.addImage(restartImage);

  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background("black");

  
  //Gravity
  girl.velocityY = girl.velocityY + 0.8;
  girl.collide(invisible_ground);

  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;
    
    score = score + Math.round(getFrameRate() / 60);

    spawnObstacles();
    
    ground.velocityX = -(4 + 3 * score / 100);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }


    if ((keyDown("space") && girl.y >= 400)) {
      girl.velocityY = -12;
      
    }

    if (girl.isTouching(obstaclesGroup)) {
      gameState = END;
     
    }
  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    girl.velocityY = 0
    girl.changeImage("girlImage", girlImage);
   
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);

    if (mousePressedOver(restart)) {
      reset();
    }
  }


  drawSprites();
  fill("lightpink");
  textSize(20);
  text("Score: " + score, 500, 50);
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  girl.changeAnimation("girl_running", girl_running);
  obstaclesGroup.destroyEach();
  score = 0;
  
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600, 450, 10, 40);
    var obstacleq = createSprite(600, 450, 10, 40);
    var obstaclex = createSprite(600, 450, 10, 40);
    var obstaclew = createSprite(600, 450, 10, 40);


    obstacle.addImage("obstacle1", obstacle1);
    obstaclew.addImage("obstacle2", obstacle2);
    obstacleq.addImage("obstacle3", obstacle3);
    obstaclex.addImage("obstacle4", obstacle4);

    obstacle.velocityX = -6; //+ score/100);
    obstaclew.velocityX = -6; //+ score/100);
    obstacleq.velocityX = -6; //+ score/100);
    obstaclex.velocityX = -6; //+ score/100);

    var rand = Math.round(random(1, 6));
    
    obstacle.scale = 0.1;
    obstacleq.scale = 0.1;
    obstaclew.scale = 0.1;
    obstaclex.scale = 0.1;

    obstaclesGroup.add(obstacle);
    obstaclesGroup.add(obstacleq);
    obstaclesGroup.add(obstaclew);
    obstaclesGroup.add(obstaclex);

    obstacle.debug = false;
    obstacle.setCollider("circle", 0, 0, 1);
    obstacleq.setCollider("circle", 0, 0, 1);
    obstaclew.setCollider("circle", 0, 0, 1);
    obstaclex.setCollider("circle", 0, 0, 1);

    
  }

}