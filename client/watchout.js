// start slingin' some d3 here.

//Define the SVG

var enemyLength = 15;

var svg = d3.select('.container').append('svg')
  .attr('width', '700px')
  .attr('height', '450px');

var arr =[]
  for(var i=0; i<enemyLength; i++){
    var random = Math.random() * 700;
    arr[i] = random;
  }



//Create Enemy Circles


svg.selectAll('.enemy').data(arr)
  .enter()
  .append('circle')
  //random
  .attr('cx', function(d){return d})
  .attr('cy', function(d){return d * Math.random()})
  //end random
  .attr('r', '10')
  .attr('fill', 'red')
  .attr('class', 'enemy');




var update = function() {
  var position =[];

  for(var i=0; i<enemyLength; i++){
    var randomX = Math.random() * 700;
    var randomY = Math.random() * 450
    position[i] = [randomX, randomY];
  }


  d3.select('svg').selectAll('.enemy').data(position)
  .transition().duration(2000)
  //random
  .attr('cx', function(d){return d[0]})
  .attr('cy', function(d){return d[1]});
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

  if(hero.attr('cx') > 690){
    hero.attr('cx', '690');
  } 
  if(hero.attr('cx') < 10){
    hero.attr('cx', '10');
  } 
  if(hero.attr('cy') > 440){
    hero.attr('cy', '440');
  } 
  if(hero.attr('cy') < 10){
    hero.attr('cy', '10');
  }

});


//Current Score
var currentScore = 0;

var currentCalc = function(){
  d3.select('.current').selectAll('span')
  .text(currentScore);
  currentScore++;
};

setInterval(currentCalc.bind(), 75);