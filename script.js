var particleNum = 10;

// default 1
var speed = 5;

// 1~255
var opacity = 100;


// color
var bgColor = "#F5F5EC";
var colorSet = ["#D13A75","#32A4DE","#953681","#EFA754","#329461"];

var particles = [];
var noiseDefinition = 0.0005;
var particleWeight = 1;
var particleAccLimit = 0.1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(bgColor);
  for(var i=0; i<100; i++){
    particles.push(new Particle(new p5.Vector(random(width), random(height))));
  }
  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  background(bgColor);
  particles = [];
  for(var i=0; i<100; i++){
    particles.push(new Particle(new p5.Vector(random(width), random(height))));
  }
}

function draw(){
  for(var i=0; i<speed; i++){
  particles.forEach(function(particle){particle.run()});
  }
}

/*function mouseClicked(){
  noiseSeed(random(1000));
  background(bgColor);
  particles = [];
  for(var i=0; i<particleNum; i++){
    particles.push(new Particle(new p5.Vector(random(width), random(height))));
  }
}*/

function Particle(pos){
  this.pos = pos;
  this.pPos = this.pos.copy();
  this.vel = new p5.Vector();
  this.acc = new p5.Vector();
  var c = colorSet[floor(random(colorSet.length))];
  this.color = color(c);
  this.color.setAlpha(opacity);
}

Particle.prototype.applyForce = function(force){
  this.acc.add(force);
}

Particle.prototype.detectEdge = function(){
  if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height){
    this.pos.x = random(width);
    this.pos.y = random(height);
    this.vel.mult(0);
  }
}

Particle.prototype.update = function(){
  this.detectEdge();
  this.pPos = this.pos.copy();
  var force = new p5.Vector(1,0);
  var angle = noise(this.pos.x*noiseDefinition,this.pos.y*noiseDefinition) * Math.PI * 4;
  force.rotate(angle);
  this.applyForce(force);
  this.vel.add(this.acc);
  this.vel.limit(particleAccLimit);
  this.pos.add(this.vel);
  this.acc.mult(0);
}

Particle.prototype.display = function(){
  stroke(this.color);
  strokeWeight(particleWeight);
  line(this.pos.x, this.pos.y, this.pPos.x, this.pPos.y);
}

Particle.prototype.run = function(){
  this.update();
  this.display();
}
