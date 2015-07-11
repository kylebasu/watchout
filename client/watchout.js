// start slingin' some d3 here.

//Define the SVG

var enemyLength = 15;

var enemyArray = [];

var highScore = 0;

var colissions = 0;

var width = '1000px';
var height = '600px'

var svg = d3.select('.container').append('svg')
  .attr('width', width)
  .attr('height', height);

var arr =[]
for(var i=0; i<enemyLength; i++){
    var randomX = Math.random() * 1000;
    var randomY = Math.random() * 600;
    arr[i] = [randomX, randomY];

  }

//Create Enemy Circles


svg.selectAll('.enemy').data(arr)
  .enter()
  .append('image')
  //random
  .attr('x', function(d){return d[0]})
  .attr('y', function(d){return d[1]})
  //end random
  .attr('class', 'enemy')
  .attr('width', 50)
  .attr('height', 50)
  .attr('xlink:href', 'img/invader.gif')

for(var k=0; k<enemyLength; k++){
  enemyArray[k] = d3.selectAll('.enemy')[0][k];
}


var update = function() {
  var position =[];

  for(var i=0; i<enemyLength; i++){
    var randomX = Math.random() * 1000;
    var randomY = Math.random() * 600;
    position[i] = [randomX, randomY];

  }

  d3.select('svg').selectAll('.enemy').data(position)
  .transition().duration(2000)
  //random
  .attr('x', function(d){return d[0]})
  .attr('y', function(d){return d[1]});
  //end random


}

setInterval(update, 2000);



//Create Hero Circle



// Create Alex Hero Circle
d3.selectAll('.alex').on('click', function(){
  d3.select('svg').selectAll('hero').data([0])
    .enter()
    .append('image')
    .attr('x', function(d){return d})
    .attr('y', '0')
    .attr('class', 'hero')
    .attr('width', 50)
    .attr('height', 50)
    .attr('xlink:href', 'img/alex.png')
    .style('cursor', 'pointer');

  d3.selectAll('.kyle').style('visibility', 'hidden');
  d3.selectAll('.alex').style('visibility', 'hidden');


  var hero = d3.select('.hero');
  var drag = d3.behavior.drag();

  currentScore = 0;
  highScore = 0;

  hero.call(drag);

  drag.on("drag", function() {
    d3.event.sourceEvent.stopPropagation(); // silence other listeners
    hero.attr('x', d3.event.x-20)
      .attr('y', d3.event.y-25)

    if(hero.attr('x') > 960){
      hero.attr('x', '960');
    } 
    if(hero.attr('x') < 1){
      hero.attr('x', '0');
    } 
    if(hero.attr('y') > 550){
      hero.attr('y', '550');
    } 
    if(hero.attr('y') < 1){
      hero.attr('y', '1');
    }
  });
});

// Create  Kyle Hero
d3.selectAll('.kyle').on('click', function(){
  d3.select('svg').selectAll('hero').data([0])
    .enter()
    .append('image')
    .attr('x', function(d){return d})
    .attr('y', '0')
    .attr('class', 'hero')
    .attr('width', 50)
    .attr('height', 50)
    .attr('xlink:href', 'img/kyle.png')
    .style('cursor', 'pointer');

  d3.selectAll('.kyle').style('visibility', 'hidden');
  d3.selectAll('.alex').style('visibility', 'hidden');

  var hero = d3.select('.hero');
  var drag = d3.behavior.drag();

  currentScore = 0;
  highScore = 0;

  hero.call(drag);

   
  drag.on("drag", function() {
    d3.event.sourceEvent.stopPropagation(); // silence other listeners
    hero.attr('x', d3.event.x-20)
      .attr('y', d3.event.y-25)

    if(hero.attr('x') > 960){
      hero.attr('x', '960');
    } 
    if(hero.attr('x') < 1){
      hero.attr('x', '0');
    } 
    if(hero.attr('y') > 550){
      hero.attr('y', '550');
    } 
    if(hero.attr('y') < 1){
      hero.attr('y', '1');
    }
  });
});


  

//Drag Event and Can't drag out box




//Check Colissions
var checkColissions = function(){
  for(var i=0; i<enemyLength; i++){
    if(Math.sqrt(Math.pow((d3.select('.hero').attr('x') - enemyArray[i].x.animVal.value), 2)
      + Math.pow((d3.select('.hero').attr('y') - enemyArray[i].y.animVal.value), 2))
      < 30){


      if(highScore < currentScore){
        highScore = currentScore;
        d3.select('.high').selectAll('span')
          .text(highScore);
      }

      if(currentScore > 1){
        colissions++;
         d3.select('.collisions').selectAll('span')
    .text(colissions);
      }

      currentScore = 0;
      
    }
  }
}

setInterval(checkColissions, 1);
 





//Current Score
var currentScore = 0;

var currentCalc = function(){
  d3.select('.current').selectAll('span')
  .text(currentScore);
  currentScore++;
};

setInterval(currentCalc, 100);
