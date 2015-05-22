var enemies = [];
var enemy_count = 50;

var Enemy = function(x,y){
  this.x = x;
  this.y = y;
}

var width = 800, height = 500;
function randX(){
  return Math.random() * width;
}
function randY(){
  return Math.random() * height;
}
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(20,20)');


for (var i = 0; i < enemy_count; i++) {
  enemies.push(new Enemy(randX(), randY()));
}


function init() {
  svg.selectAll('circle')
    .data(enemies)
    .enter()
    .append('circle')
    .transition().duration(1000)
    .attr('cx', function(d, i){ return d.x; } )
    .attr('cy', function(d, i){ return d.y; } )
    .attr('r', 10)
    .style('fill', 'black');
}

init();



function update(data){
  data.forEach(function(item){
    item.x = randX();
    item.y = randY();
  });

  svg.selectAll('circle')
    .data(data)
    //.enter()
    //.append('circle')
    .transition().duration(1000)
    .attr('cx', function(d, i){ return d.x; } )
    .attr('cy', function(d, i){ return d.y; } )
    //.attr('r', 10)
    //.style('fill', 'black');
}

//update(enemies);
setInterval(function(){update(enemies)},1000);

// setInterval(function(){

// },1000)
