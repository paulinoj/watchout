var Enemy = function(x,y){
  this.x = x;
  this.y = y;
}

var enemies = [];
var enemy_count = 10;

var width = 800, height = 500;
function randX(){
  return Math.random() * (width-20) + 10;
}
function randY(){
  return Math.random() * (height-20) + 10;
}

var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
//  .append('g')
//  .attr('transform', 'translate(40,40)');

for (var i = 0; i < enemy_count; i++) {
  enemies.push(new Enemy(randX(), randY()));
}

function init() {
  svg.selectAll('circle')
    .data(enemies)
    .enter()
    .append('circle')
    .attr('cx', function(d, i){ return d.x; } )
    .attr('cy', function(d, i){ return d.y; } )
    .attr('r', 10)
//    .attr('transform', 'translate(40,40)')
}

init();



function update(data){
  data.forEach(function(item){
    item.x = randX();
    item.y = randY();
  });

  svg.selectAll('circle')
    .data(data)
    .transition().duration(1000)
    .attr('cx', function(d, i){ return d.x; } )
    .attr('cy', function(d, i){ return d.y; } )
}

setInterval(function(){update(enemies)},1000);

var drag = d3.behavior.drag()
  .on("drag", function(d, i){
    d.x += d3.event.dx;
    d.y += d3.event.dy
    d3.select(this)
      .attr('cx', function(d, i){ return d.x})
      .attr('cy', function(d, i){ return d.y});
  });

var player = [{x:width/2, y:height/2}];
svg.selectAll('.player')
  .data(player)
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr('cx', function(d, i){ return d.x; } )
  .attr('cy', function(d, i){ return d.y; } )
  .attr('r', 10)
  .attr('fill', 'red')
  .call(drag);


