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
  .attr('width', 20)
  .attr('height', 20)
  .attr('xlink:href', 'img/invader.png')

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

setInterval(update.bind(), 2000);



//Create Hero Circle


// Create Hero Circle
d3.select('svg').selectAll('hero').data([225])
  .enter()
  .append('circle')
  .attr('cx', function(d){return d})
  .attr('cy', '350')
  .attr('r', '10')
  .attr('fill', 'blue')
  .attr('class', 'hero')
  .style('cursor', 'pointer')

var hero = d3.select('.hero');
var drag = d3.behavior.drag();




hero.call(drag);

//Drag Event and Can't drag out box

drag.on("drag", function() {
  d3.event.sourceEvent.stopPropagation(); // silence other listeners
  hero.attr('cx', d3.event.x)
    .attr('cy', d3.event.y)

  if(hero.attr('cx') > 990){
    hero.attr('cx', '990');
  } 
  if(hero.attr('cx') < 10){
    hero.attr('cy', '10');
  } 
  if(hero.attr('cy') > 590){
    hero.attr('cy', '590');
  } 
  if(hero.attr('cy') < 10){
    hero.attr('cy', '10');
  }


});


//Check Colissions
var checkColissions = function(){
  for(var i=0; i<enemyLength; i++){
    if(Math.sqrt(Math.pow((d3.select('.hero').attr('cx') - enemyArray[i].x.animVal.value), 2)
      + Math.pow((d3.select('.hero').attr('cy') - enemyArray[i].y.animVal.value), 2))
      < 17){


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

setInterval(checkColissions.bind(), 1);
 





//Current Score
var currentScore = 0;

var currentCalc = function(){
  d3.select('.current').selectAll('span')
  .text(currentScore);
  currentScore++;
};

setInterval(currentCalc.bind(), 100);



