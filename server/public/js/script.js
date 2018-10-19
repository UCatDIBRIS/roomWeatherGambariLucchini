var socket = io.connect();

var keys = ["date1"],
    temp = 0,
    room,
    humidity = 0,
    time= hhmmss(),
    currentDate = "",
    dateAvailable = false,
    dataBars = [ { "hour": "00:00",
                    "date1": {temperature:0,
                        humidity:0},
                    "date2": {temperature:0,
                            humidity:0}},

                    { "hour": "01:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "02:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "03:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "04:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "05:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "06:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "07:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "08:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "09:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "10:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "11:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "12:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "13:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "14:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "15:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "16:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "17:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "18:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "19:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "20:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "21:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "22:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}},

                    { "hour": "23:00",
                    "date1": {temperature:0,
                                humidity:0},
                    "date2": {temperature:0,
                                humidity:0}}
                ];              

socket.on('data', function(values){
    
    dateAvailable = false;
    reset = false;

    var h_val = []

    values.forEach(function(element){

        dateAvailable = true;

        var index = dataBars.findIndex(function(e){
            h_val.push(element.hour)
            return e.hour==element.hour
            })
        
        if(index!=-1){
            if(currentDate == "date1"){
                dataBars[index].date1.temperature = parseFloat(element.temperature)
                dataBars[index].date1.humidity = parseFloat(element.humidity)
            }
            else{
                dataBars[index].date2.temperature = parseFloat(element.temperature)
                dataBars[index].date2.humidity = parseFloat(element.humidity)
            }
        }
    });


    dataBars.forEach(function(e){
        var index = h_val.indexOf(e.hour)
        if(index == -1){
            if(currentDate == "date1"){
                e.date1.temperature = 0;
                e.date1.temperature = 0;
            }
            else{
                e.date2.temperature = 0;
                e.date2.temperature = 0;
            }
        }
    })

    updateHistory();

})

socket.on('messages', function(data) {
    temp = data.temp
    time = data.time
    humidity = data.humidity
    room = data.room

    d3.select("#time").html("<span class='glyphicon glyphicon-hourglass'></span>Time:  "+time)
});

function history() {
    location.replace('/history?room='+room.toString())
}

function realTime() {
    location.replace('/room?room='+room.toString())
}

function goBack(){
    location.replace('/')
}

function getDate(date, label){
    currentDate = label;
    socket.emit('date', date);
    
}

function updateHistory(){
    if(!dateAvailable){
        d3.select("#average").html("<span class='glyphicon glyphicon-remove-sign'></span>  This Date is not available!")
        dataBars.forEach(function(element){
            if(currentDate == "date1"){
                element.date1.temperature = 0
                element.date1.humidity = 0
                date["date1"] = ""
            }
            else{
                element.date2.temperature = 0
                element.date2.humidity = 0
                date["date2"] = ""
            } 
        })
        

    } 
    else{
        if(currentDate == "date1" && keys.length==1) d3.select("#average").html("<span class='glyphicon glyphicon-ok-sign'></span>   "+date["date1"])
        else d3.select("#average").html("<span class='glyphicon glyphicon-ok-sign'></span>   "+date["date1"]+ " - "+date["date2"])        
    } 
    d3.select("#legend").selectAll("*").remove()
    if(keys.length==1){
        updateLegend([date["date1"]])
        createBarChart(["date1"], dataBars)
    }
    else{
        updateLegend([date["date1"], date["date2"]])
        createBarChart(["date1", "date2"], dataBars)
    }
}

function hhmmss() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var hh = h < 10 ? '0' + h : h;
    var mm = m < 10 ? '0' + m : m;
    var ss = s < 10 ? '0' + s : s;
    return hh + ':' + mm + ':' + ss;
} 