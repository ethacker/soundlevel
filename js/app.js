var soundRef = new Firebase('https://arduinosound.firebaseio.com/sensorvalue2');

$(function () {

    $(document).ready(loadChart());

})
function loadChart(){

    var newPost;
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
                        console.log("Time"+newPost.time + "  " + x)
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
    soundRef = new Firebase('https://arduinosound.firebaseio.com/sensorvalue');
    loadChart();
    document.getElementById("sensorID").innerHTML = "Sensor 2";
}
////Made using highcharts http://www.highcharts.com/products/highcharts
