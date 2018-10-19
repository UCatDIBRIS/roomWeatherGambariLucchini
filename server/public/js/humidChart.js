var lineHumid = [];
var MAX_LENGTH = 200;
var duration = 500;
var chartHumid = realTimeLineChartHumid();

function seedDataHumid() {
  var now = new Date();
  for (var i = 0; i < MAX_LENGTH; ++i) {
    lineHumid.push({
      time: new Date(now.getTime() - ((MAX_LENGTH - i) * duration)),
      x: humidity
    });
  }
}

function updateDataHumid() {
  var now = new Date();

  var lineData = {
    time: now,
    x: humidity
  };
  lineHumid.push(lineData);

  if (lineHumid.length > 30) {
    lineHumid.shift();
  }

  updateDataHumidDonut()
  d3.select("#humidChart").datum(lineHumid).call(chartHumid);
}

function resizeHumid() {
  if (d3.select("#humidChart svg").empty()) {
    return;
  }
  chartHumid.width(+d3.select("#humidChart").style("width").replace(/(px)/g, ""));
  d3.select("#humidChart").call(chartHumid);
}

document.addEventListener("DOMContentLoaded", function() {
  seedDataHumid();
  window.setInterval(updateDataHumid, 500);
  d3.select("#humidChart").datum(lineHumid).call(chartHumid);
  d3.select(window).on('resize', resizeHumid);
});

function realTimeLineChartHumid() {
  var margin = {top: 40, right: 40, bottom: 40, left: 40},
      width = d3.select("#humidChart").node().getBoundingClientRect().width,
      height = d3.select("#humidChart").node().getBoundingClientRect().height,
      duration = 500;

function chartHumid(selection) {
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
      100
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
      .call(d3.axisLeft(y));

    g.select("defs clipPath rect")
      .transition(t)
      .attr("width", width-margin.left-margin.right)
      .attr("height", height-margin.top-margin.right);

    g.selectAll("g path.data")
      .data(data)
      .style("stroke", "steelblue")
      .style("stroke-width", 2)
      .style("fill", "none")
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .on("start", tickHumid);

    function tickHumid() {
      d3.select(this)
        .attr("d", function(d) { return line(d.values); })
        .attr("transform", null);

      var xMinLess = new Date(new Date(xMin).getTime() - duration);
      d3.active(this)
          .attr("transform", "translate(" + x(xMinLess) + ",0)")
        .transition()
          .on("start", tickHumid);
    }
  });
}

chartHumid.margin = function(_) {
  if (!arguments.length) return margin;
  margin = _;
  return chartHumid;
};

chartHumid.width = function(_) {
  if (!arguments.length) return width;
  width = _;
  return chartHumid;
};

chartHumid.height = function(_) {
  if (!arguments.length) return height;
  height = _;
  return chartHumid;
};

chartHumid.color = function(_) {
  if (!arguments.length) return color;
  color = _;
  return chartHumid;
};

chartHumid.duration = function(_) {
  if (!arguments.length) return duration;
  duration = _;
  return chartHumid;
};

return chartHumid;
}