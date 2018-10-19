var query = window.location.search.substring(1);
room = query.split("=")[1]
d3.select("#time").html("<span class='glyphicon glyphicon-hourglass'></span>Time: " + time)
document.getElementById("roomImage").src = "images/room"+room+".png"

var lineArr = [];
var MAX_LENGTH = 200;
var duration = 500;
var chartTemp = realTimeLineChartTemp();

function seedDataTemp() {
  var now = new Date();
  for (var i = 0; i < MAX_LENGTH; ++i) {
    lineArr.push({
      time: new Date(now.getTime() - ((MAX_LENGTH - i) * duration)),
      x: temp
    });
  }
}

function updateDataTemp() {
  var now = new Date();

  var lineData = {
    time: now,
    x: temp
  };
  lineArr.push(lineData);

  if (lineArr.length > 30) {
    lineArr.shift();
  }

  updateDataTempDonut()
  d3.select("#tempChart").datum(lineArr).call(chartTemp);
}

function resizeTemp() {
  if (d3.select("#tempChart svg").empty()) {
    return;
  }
  chartTemp.width(+d3.select("#tempChart").style("width").replace(/(px)/g, ""));
  d3.select("#tempChart").call(chartTemp);
}

document.addEventListener("DOMContentLoaded", function() {
  seedDataTemp();
  window.setInterval(updateDataTemp, 500);
  d3.select("#tempChart").datum(lineArr).call(chartTemp);
  d3.select(window).on('resize', resizeTemp);
});

function realTimeLineChartTemp() {
  var margin = {top: 40, right: 40, bottom: 40, left: 40},
      width = d3.select("#tempChart").node().getBoundingClientRect().width,
      height = d3.select("#tempChart").node().getBoundingClientRect().height,
      duration = 500;

function chartTemp(selection) {
  selection.each(function(data) {
    data = ["x"].map(function(c) {
      return {
        label: c,
        values: data.map(function(d) {
          return {time: +d.time, value: d[c]};
        })
      };
    });

    var t = d3.transition().duration(duration).ease(d3.easeLinear),
        x = d3.scaleTime().rangeRound([0, width-margin.left-margin.right]),
        y = d3.scaleLinear().rangeRound([height-margin.top-margin.bottom, 0]);

    var xMin = d3.min(data, function(c) { return d3.min(c.values, function(d) { return d.time; })});
    var xMax = new Date(new Date(d3.max(data, function(c) {
      return d3.max(c.values, function(d) { return d.time; })
    })).getTime() - (duration*2));

    x.domain([xMin, xMax]);
    y.domain([
    	0,
      40
    ]);

    var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.time); })
      .y(function(d) { return y(d.value); });

    var svg = d3.select(this).selectAll("svg").data([data]);
    var gEnter = svg.enter().append("svg").append("g");
    gEnter.append("g").attr("class", "axis x");
    gEnter.append("g").attr("class", "axis y");
    gEnter.append("defs").append("clipPath")
        .attr("id", "clip")
      .append("rect")
        .attr("width", width-margin.left-margin.right)
        .attr("height", height-margin.top-margin.bottom);
    gEnter.append("g")
        .attr("class", "lines")
        .attr("clip-path", "url(#clip)")
      .selectAll(".data").data(data).enter()
        .append("path")
          .attr("class", "data");

    var formatyAxis = d3.format('.1f');

    var svg = selection.select("svg");
    svg.attr('width', width).attr('height', height);
    var g = svg.select("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    g.select("g.axis.x")
      .attr("transform", "translate(0," + (height-margin.bottom-margin.top) + ")")
      .transition(t)
      .call(d3.axisBottom(x).ticks(5));
    g.select("g.axis.y")
      .transition(t)
      .attr("class", "axis y")
      .call(d3.axisLeft(y).tickFormat(formatyAxis));

    g.select("defs clipPath rect")
      .transition(t)
      .attr("width", width-margin.left-margin.right)
      .attr("height", height-margin.top-margin.right);

    g.selectAll("g path.data")
      .data(data)
      .style("stroke", "red")
      .style("stroke-width", 2)
      .style("fill", "none")
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .on("start", tickTemp);

    function tickTemp() {
      d3.select(this)
        .attr("d", function(d) { return line(d.values); })
        .attr("transform", null);

      var xMinLess = new Date(new Date(xMin).getTime() - duration);
      d3.active(this)
          .attr("transform", "translate(" + x(xMinLess) + ",0)")
        .transition()
          .on("start", tickTemp);
    }
  });
}

chartTemp.margin = function(_) {
  if (!arguments.length) return margin;
  margin = _;
  return chartTemp;
};

chartTemp.width = function(_) {
  if (!arguments.length) return width;
  width = _;
  return chartTemp;
};

chartTemp.height = function(_) {
  if (!arguments.length) return height;
  height = _;
  return chartTemp;
};

chartTemp.color = function(_) {
  if (!arguments.length) return color;
  color = _;
  return chartTemp;
};

chartTemp.duration = function(_) {
  if (!arguments.length) return duration;
  duration = _;
  return chartTemp;
};

return chartTemp;
}