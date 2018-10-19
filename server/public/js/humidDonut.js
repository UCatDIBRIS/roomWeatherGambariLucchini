function updateDataHumidDonut(){
	updateHumid()
	d3.select('#idHumid').text(humidity+"%")
}

function updateHumid() {
  var dataHumid = [
      {name: 'humidity', count: humidity, percentage: humidity, color: 'steelblue'},
      {name: 'rest', count: 100-humidity, percentage: 100-humidity, color: '#e6e6e6'}
    ];

  var path = d3.select('#humidDonut').selectAll("path")
  var data0 = path.data(),
      data1 = pieHumid(dataHumid);

  path = path.data(data1);

  path.enter().append("path")
      .each(function(d, i) { this._current = findNeighborArc(i, data0, data1, key) || d; })
      .attr("fill", function(d) { return color(d.data.color); })

  path.exit()
      .datum(function(d, i) { return findNeighborArc(i, data1, data0, key) || d; })
    .transition()
      .duration(550)
      .attrTween("d", arcTweenHumid)
      .remove();

  path.transition()
      .duration(550)
      .attrTween("d", arcTweenHumid);
}

var dataHumid = [
      {name: 'humidity', count: humidity, percentage: humidity, color: 'steelblue'},
      {name: 'rest', count: 100-humidity, percentage: 100-humidity, color: '#e6e6e6'}
    ];
  
var width = d3.select("#humidDonut").node().getBoundingClientRect().width,
height = d3.select("#humidDonut").node().getBoundingClientRect().height,
radius = 140;

var arcHumid = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(100);

var pieHumid = d3.pie()
  .sort(null)
  .value(function(d) {
      return d.count;
  });

var svg = d3.select('#humidDonut').append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var g = svg.selectAll(".arc")
	.attr("id","arcHumid")
  .data(pieHumid(dataHumid))
  .enter().append("g");    

g.append("path")
  .attr("d", arcHumid)
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .style("fill", function(d,i) {
    return d.data.color;
  });
    
g.append("text")
 .attr("id","idHumid")
 .attr("text-anchor", "middle")
 .attr('font-size', '4em')
 .attr('y', 20)

function arcTweenHumid(d,index) {
  var i = d3.interpolate(this._current, d);
  this._current = i(0);
  return function(t) { return arcHumid(i(t), index); };
}
