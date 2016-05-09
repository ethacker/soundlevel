var soundRef = new Firebase('https://arduinosound.firebaseio.com/sensorvalue2');
var totalSound;
var count;
var numUnsafe;
var soundNode;
var avg;
var i;
var whichSensor;
$(function () {

    $(document).ready(function(){
        loadChart();
        loadAverage();
    });
    whichSensor = 2;

})

function loadAverage(){

    count = 0;
    avg = 0;
    totalSound = 0;
    numUnsafe = 0;
    soundRef.once("value",function(dataSnapshot){
        console.log(dataSnapshot.numChildren());
       dataSnapshot.forEach(function(childSnap){
            soundNode = childSnap.val();
            count++;
            if(soundNode.value>60){
                numUnsafe ++;
            }
            totalSound += soundNode.value;
       });

        console.log(numUnsafe);
        avg = totalSound/count;
        document.getElementById("avgSound").innerHTML = "Average Sound Level for Current Sensor: " + avg.toFixed(3);
        document.getElementById("unsafe").innerHTML = "Number of Unsafe Readings: " + numUnsafe;
    });

}

function loadChart(){


    soundRef.on("child_added", function (snapshot) {
        newPost = snapshot.val();
    });

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });



    $('#container').highcharts({
        chart: {
            height:600,
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = newPost.value;
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        title: {
            text: 'Live Sound Level Data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100
        },
        yAxis: {
            tickAmount: 25,
            title: {
                text: 'Decibel Level'
            },
            plotLines: [{
                width: 1,
                color: '#ff0000'
            }],
            max: 120,
            min: 0
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Decibel Reading',
            data: (function () {
                // bs data to seed the chart
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: 50
                    });
                }
                return data;
            }())
        }]
    });
}
function toggleButton(){

    if(whichSensor==2) {
        soundRef = new Firebase('https://arduinosound.firebaseio.com/sensorvalue');
        loadChart();
        loadAverage();
        document.getElementById("sensorID").innerHTML = "Sensor 1";
        whichSensor = 1;
    }
    else{
        soundRef = new Firebase('https://arduinosound.firebaseio.com/sensorvalue2')
        loadChart();
        loadAverage();
        document.getElementById("sensorID").innerHTML = "Sensor 2"
        whichSensor = 2;
    }
}
////Made using highcharts http://www.highcharts.com/products/highcharts
