var averageTemp = 0;

var defs = d3.select("#tempDonut").append("defs");

var gradient = defs.append("linearGradient")
   .attr("id", "svgGradient")
   .attr("x1", "50%")
   .attr("x2", "45%")
   .attr("y1", "0%")
   .attr("y2", "99%");

gradient.append("stop")
   .attr('class', 'start')
   .attr("offset", "0%")
   .attr("stop-color", "#ffcccc")
   .attr("stop-opacity", 1);

gradient.append("stop")
   .attr('class', 'end')
   .attr("offset", "100%")
   .attr("stop-color", "#cc0000")
   .attr("stop-opacity", 1);

var aux = ((averageTemp*100)/45)
var data = [
    {name: 'temp', count: aux, percentage: aux, color: 'url(#svgGradient)'},
    {name: 'rest', count: 100-aux, percentage: 100-aux, color: '#e6e6e6'}
  ];
  
var width = d3.select("#tempDonut").node().getBoundingClientRect().width,
height = d3.select("#tempDonut").node().getBoundingClientRect().height,
radius = 120;

var arcTemp = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(80);

var pieTemp = d3.pie()
  .sort(null)
  .value(function(d) {
      return d.count;
  });

var svgTemp = d3.select('#tempDonut').append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var gTemp = svgTemp.selectAll(".arc")
  .data(pieTemp(data))
  .attr("id","arcTemp")
  .enter().append("g");    

gTemp.append("path")
  .attr("d", arcTemp)
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .style("fill", function(d,i) {
    return d.data.color;//color(d.data.count);
  });
    
gTemp.append("text")
 .attr("id","idTemp")
 .attr("text-anchor", "middle")
 .attr('font-size', '4em')
 .attr('y', 20)

function findNeighborArc(i, data0, data1, key) {
  var d;
  return (d = findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
      : (d = findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
      : null;
}

// Find the element in data0 that joins the highest preceding element in data1.
function findPreceding(i, data0, data1, key) {
  var m = data0.length;
  while (--i >= 0) {
    var k = key(data1[i]);
    for (var j = 0; j < m; ++j) {
      if (key(data0[j]) === k) return data0[j];
    }
  }
}

// Find the element in data0 that joins the lowest following element in data1.
function findFollowing(i, data0, data1, key) {
  var n = data1.length, m = data0.length;
  while (++i < n) {
    var k = key(data1[i]);
    for (var j = 0; j < m; ++j) {
      if (key(data0[j]) === k) return data0[j];
    }
  }
}

function arcTweenTemp(d,index) {
  var i = d3.interpolate(this._current, d);
  this._current = i(0);
  return function(t) { return arcTemp(i(t), index); };
}

function updateDataTempDonut(){
    updateTemp()
    d3.select('#idTemp').text(averageTemp+"°")
 
 }
 
 function updateTemp() {
  var aux = ((averageTemp*100)/45)
  var data = [
     {name: 'temp', count: aux, percentage: aux, color: 'url(#svgGradient)'},
     {name: 'rest', count: 100-aux, percentage: 100-aux, color: '#e6e6e6'}
   ];
 
   var path = d3.select('#tempDonut').selectAll("path")
     var data0 = path.data(),
         data1 = pieTemp(data);
 
     path = path.data(data1);
 
     path.enter().append("path")
         .each(function(d, i) { this._current = findNeighborArc(i, data0, data1, key) || d; })
         .attr("fill", function(d) { return color(d.data.color); })
 
     path.exit()
         .datum(function(d, i) { return findNeighborArc(i, data1, data0, key) || d; })
       .transition()
         .duration(550)
         .attrTween("d", arcTweenTemp)
         .remove();
 
     path.transition()
         .duration(550)
         .attrTween("d", arcTweenTemp);
 }
