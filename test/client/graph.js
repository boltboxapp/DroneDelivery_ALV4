/**
 * Created by Quentin on 11/8/2015.
 */

/**
 * This function use the HighChart library to draw a live graph that will draw the number
 * of drone started in the simulation in function of the time in second.
 * @param simulation
 */
function start(simulation) {
    var derp = 1;
    var start = Date.now();


    $(document).ready(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#fequencyChartContainer').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = new Date().getTime(), // current time
                                y = totalPingFrequency;    // simulation.getDrones().length;       // derp++; si on laisse derp++ ca fait une droite y=x
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Message frequency'
            },
            xAxis: {
                type: 'datetime',
                //tickPixelInterval: 150,
                min : start
            },
            yAxis: {
                title: {
                    text: 'Number of message per second'
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
                name: 'Drone number',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -500; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: 0
                        });
                    }
                    return data;
                }())
            }]
        });

        //TODO make it harder BETTER faster stronger
        $('#totalMessagesChartContainer').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = new Date().getTime(), // current time
                                y = gloablTotalMessages;    // simulation.getDrones().length;       // derp++; si on laisse derp++ ca fait une droite y=x
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Total message number'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                min : start
            },
            yAxis: {
                title: {
                    text: 'Number of message'
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
                name: 'Drone number',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -500; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: 0
                        });
                    }
                    return data;
                }())
            }]
        });
    });

    simulation.run();
}
