$(function () {

    var soundRef = new Firebase('https://arduinosound.firebaseio.com/sensorvalue2');
    var newPost;
    soundRef.on("child_added", function(snapshot) {
        newPost = snapshot.val();
  //      console.log("Value: " + newPost.value);
  //      console.log("Time: " + newPost.time);
    });
    $(document).ready(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });


        $('#container').highcharts({
            chart: {
                height:500,
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
                tickAmount: 20,
                title: {
                    text: 'Decibel Level'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
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
                name: 'Random data',
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
    });
});

////Made using highcharts http://www.highcharts.com/products/highcharts
