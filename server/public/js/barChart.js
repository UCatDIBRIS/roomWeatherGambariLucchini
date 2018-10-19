var date = {"date1":"",
            "date2":""};


var query = window.location.search.substring(1);
room = query.split("=")[1]
d3.select("#historyDetails").html("<span class='glyphicon glyphicon-home' style='padding-top:30%''></span>   "+room ) 
document.getElementById("historyImage").src = "images/room"+room+".png"

$(function() {
    $('#datetimepicker1').datetimepicker({
      format: 'YYYY-MM-DD'
    });;
    $('#datetimepicker1').on('dp.change', function(e){ 
        date["date1"] = $('#date1').val()

        getDate($('#date1').val(),"date1")
    })
  });


function addDate(){
    d3.select("#dateView").html("<div class='form-group'> <div class='input-group date' id='datetimepicker2'> <input type='text' class='form-control' id='date2'/> <span class='input-group-addon'> <span class='glyphicon glyphicon-calendar'></span> </span> </div> </div>")
    
    keys = ["date1","date2"]

    createBarChart(keys, dataBars)

    $(function() {
        $('#datetimepicker2').datetimepicker({
          format: 'YYYY-MM-DD'
        });;

        $('#datetimepicker2').on('dp.change', function(e){ 
            date["date2"] = $('#date2').val()

            getDate($('#date2').val(),"date2")
        })
    });

}

createBarChart(keys, dataBars)

function createBarChart(keys, data) {
    
    averageTemp = 0;
    averageHumidity = 0;
    count = 0
    data.forEach(function(d){
        if(currentDate == "date1"){
            if(d.date1.temperature != 0){
                averageTemp += d.date1.temperature;
                averageHumidity += d.date1.humidity;
                count += 1;
            }
        }
        else{
            if(d.date2.temperature != 0){
                averageTemp += d.date2.temperature;
                averageHumidity += d.date2.humidity;
                count += 1;
            }
        }
    }) 

    if(count == 0) count = 1;
    averageTemp = parseFloat((averageTemp/count).toFixed(1));
    averageHumidity = parseFloat((averageHumidity/count).toFixed(1));

    updateDataHumidDonut();
    updateDataTempDonut();
    

    var svg = d3.select("#barChart"),
    margin = {top: 50, right: 20, bottom: 10, left: 40},
    width = parseInt(svg.node().getBoundingClientRect().width - margin.left - margin.right),
    height = parseInt(svg.node().getBoundingClientRect().height - margin.top - margin.bottom);

    var x0 = d3.scaleBand()
        .rangeRound([margin.left, width-margin.right])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .range([height, margin.top]);

    var color = {"date1":"#990000", 
                "date2":"#ff0000"};


    x0.domain(data.map(function(d) { return d.hour; }));
    x1.domain(keys).range([0, x0.bandwidth()]);
    //d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key].temperature; }); })
    y.domain([0, 40]);

    bars = d3.select("#bars").selectAll("g")
        .data(data)

    bars = bars.enter().append("g").merge(bars) 

    bars.attr("transform", function(d) { return "translate(" + x0(d.hour) + ",0)"; })

    bar = bars.selectAll("rect")
                .data(function(d) { return keys.map(function(key) { return {key: key, temp: d[key].temperature, humidity: d[key].humidity, hour:d.hour }; }); })

    bar = bar.enter().append("rect").merge(bar) 

    bar.attr("x", function(d) { return x1(d.key); })
        .transition()
        .duration(1500)
        .attr("class","pointer")
        .attr("y", function(d) { return y(d.temp); })
        .attr("ry",2)
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height - y(d.temp)})
        .attr("fill", function(d,i) { return color[d.key] })
        
bar.on("mousemove",function(d,i) {

        label = "Value: "+ d.temp
        var mouse = d3.mouse(d3.select("#barChart").node())
            .map( function(d) { return d; } );
        d3.select("#barTooltip").classed("hidden", false)
            .attr("style", "left:"+(mouse[0]+50)+"px;top:"+(mouse[1]-20)+"px")
            .html(label);
        
        d3.select(this).classed("onhover", true);
        
    })
    .on("mouseout",  function(d,i) {
        d3.select("#barTooltip").classed("hidden", true);
        d3.select(this).classed("onhover", false);
    })
    .on("click", function(d,i){
        
        if(d3.select(this).classed("selected")){
            d3.select(this).classed("selected",false)
            d3.select("#bars").selectAll("rect").classed("notselected",false)

            averageTemp = 0;
            averageHumidity = 0;
            count = 0

            if(d.key == "date1"){
                data.forEach(function(d1){
                    if(d1.date1.temperature != 0){
                        averageTemp += d1.date1.temperature;
                        averageHumidity += d1.date1.humidity;
                        count += 1;
                    }
                }) 

                if(keys.length == 1) d3.select("#average").html("<span class='glyphicon glyphicon-ok-sign'></span>   "+ date["date1"])
                else d3.select("#average").html("<span class='glyphicon glyphicon-ok-sign'></span>  "+ date["date1"] + " - " + date["date2"])
            }

            else{
                data.forEach(function(d1){
                    if(d1.date2.temperature != 0){
                        averageTemp += d1.date2.temperature;
                        averageHumidity += d1.date2.humidity;
                        count += 1;
                    }
                }) 
                    
                d3.select("#average").html("<span class='glyphicon glyphicon-ok-sign'></span>  "+ date["date1"] + " - " + date["date2"])
            }

            if(count == 0) count = 1;
            averageTemp = parseFloat((averageTemp/count).toFixed(1));
            averageHumidity = parseFloat((averageHumidity/count).toFixed(1));

            updateDataHumidDonut();
            updateDataTempDonut();

        }
        else{
            d3.select("#bars").selectAll("rect").classed("notselected",true)
            d3.select("#bars").selectAll("rect").classed("selected",false)
            d3.select(this).classed("notselected",false)
            d3.select(this).classed("selected",true)

            averageHumidity = d.humidity;
            averageTemp = d.temp;
            updateDataHumidDonut();
            updateDataTempDonut();
            d3.select("#average").html("<span class='glyphicon glyphicon-ok-sign'></span>  "+ date[d.key] + " - " + "<span class='glyphicon glyphicon-time'></span>  "+ d.hour)

        }

    })

    bar.exit().remove()
    bars.exit().remove()

    d3.select("#xAxis")
        .attr("class", "axis")
        .attr("transform", "translate("+ 0 + "," + height + ")")
        .call(d3.axisBottom(x0));

    d3.select("#yAxis")
        .attr("class", "axis")
        .attr("transform", "translate("+ margin.left + "," + 0 + ")")
        .transition()
        .duration(1500)
        .call(d3.axisLeft(y))

}

function updateLegend(data){
    var svg = d3.select("#barChart"),
        margin = {top: 50, right: 20, bottom: 10, left: 40},
        width = parseInt(svg.node().getBoundingClientRect().width - margin.left - margin.right);

    var color = ["#990000", "#ff0000"];

    var legend = d3.select("#legend")
    .attr("class", "legend")
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * 25 + ")"; });

    legend.append("rect")
    .attr("x", width+margin.right)
    .attr("y", margin.top)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", function(d,i){ return color[i]});

    legend.append("text")
    .attr("x", width+margin.right - 5)
    .attr("y", margin.top+14)
    .text(function(d) { return d; });
}
