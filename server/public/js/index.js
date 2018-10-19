var margin = {top: 10, right: 120, bottom: 10, left: 40},
    width = 70,
    height = 0;

var color = ["#00e600", "#ff1a1a"];

var legend = d3.select("#legendMap")
    .attr("class", "legend")
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(["Available", "Unavailable"])
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * 40 + ")"; });

    legend.append("rect")
    .attr("x", width+margin.right)
    .attr("y", height)
    .attr("width", 25)
    .attr("height", 25)
    .attr("stroke-width", "1px")
    .attr("stroke", "black")
    .attr("fill", function(d,i){ return color[i]});

    legend.append("text")
    .attr("x", width+margin.right - 5)
    .attr("y", height+18)
    .text(function(d) { return d; });
