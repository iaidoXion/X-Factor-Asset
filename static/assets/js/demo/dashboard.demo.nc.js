/*
Template Name: HUD - Responsive Bootstrap 5 Admin Template
Version: 1.8.0
Author: Sean Ngu

*/


var randomNo = function() {
  return Math.floor(Math.random() * 60) + 30
};

//value = ""
var handleRenderChartNC = function () {
  // global apexchart settings
  Apex = {
    title: {
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        fontFamily: app.font.family,
        color: app.color.white,
      },
    },
    legend: {
      fontFamily: app.font.family,
      labels: {
        colors: "#fff",
        show: true,
      },
    },
    tooltip: {
      style: {
        fontSize: "10px",
        fontFamily: app.font.family,
      },
    },
    grid: {
      borderColor: "rgba(" + app.color.whiteRgb + ", .25)",
    },
    dataLabels: {
      style: {
        fontSize: "12px",
        fontFamily: app.font.family,
        fontWeight: "bold",
        colors: undefined,
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
        color: "rgba(" + app.color.whiteRgb + ", .25)",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: -1,
      },
      axisTicks: {
        show: false,
        borderType: "solid",
        color: "rgba(" + app.color.whiteRgb + ", .25)",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        style: {
          colors: "#fff",
          fontSize: "9px",
          fontFamily: app.font.family,
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
//      min: 0,
//      max: 20,
      labels: {
        style: {
          colors: "#fff",
          fontSize: "9px",
          fontFamily: app.font.family,
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
  };


//--------------------------------------------------------------------------
// Number of servers by version of OS - apexOSversionChart
//--------------------------------------------------------------------------
var apexOSversionChartOptions = {
		chart: {
		    width: '100%',
			height: 130,
			type: 'donut',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: 8
				},
			},
		},
		dataLabels: {
			enabled: false,
			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [val.toFixed(1) + '%']
			},
            style: {
                fontSize: '12px',
                colors: [app.color.white],
                fontWeight: 400
            },
		},
		stroke: {
			show: false
		},
		legend: {
			show: false,
			position: 'left',
		},
        colors: ["#FFF3CE", "#FFE49D", "#FFD16D", "#FFBE48", "#ff9f0c", "#DB7F08", "#B76306", "#934903"],
		labels: ["Windows 11","Windows 10","CentOS 7","Ubuntu 20","Windows 9","Windows 7","Ubuntu 21","CentOS 8"],
		series: [10, 22, 30, 40, 10, 22, 30, 40],
		tooltip: {
			theme: 'dark',
			x: {
				show: true
			},
			y: {
				title: {
					formatter: function (val) {
						return '' + val +"<br>" +" Count:"
					}
				},
				formatter: (value) => { return '' + value },
			}
		}
	};
	var apexOSversionChart = new ApexCharts(
		document.querySelector('#apexOSversionChart'),
		apexOSversionChartOptions
	);
	apexOSversionChart.render();


//--------------------------------------------------------------------------
// Number of servers by type of OS - apexOSquantityChart
//--------------------------------------------------------------------------
var apexOSquantityOptions = {
		chart: {
		    width: '100%',
			height: 130,
			type: 'donut',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: 8
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [val.toFixed(1) + '%']
			},
            style: {
                fontSize: '12px',
                colors: [app.color.white],
                fontWeight: 400
            },
		},
		stroke: {
			show: false
		},
		legend: {
			show: false,
			position: 'left',
		},
        colors: ["#f39c12", "#fdb43f", "#ffc365", "#c58a2e", "#e6b567"],
		labels: ["A","A","A","A","A"],
		series: [44, 55, 41, 17, 15],
		tooltip: {
			theme: 'dark',
			x: {
				show: true
			},
			y: {
				title: {
					formatter: function (val) {
						return '' + val +"<br>" +" Count:"
					}
				},
				formatter: (value) => { return '' + value },
			}
		}
	};
	var apexOSquantityChart = new ApexCharts(
		document.querySelector('#apexOSquantityChart'),
		apexOSquantityOptions
	);
	apexOSquantityChart.render();


//--------------------------------------------------------------------------
// Number of servers IP list - IPlistchart
//--------------------------------------------------------------------------
var apexIPlistchartOptions = {
		chart: {
			height: 120,
			type: 'bar',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '70%',
				distributed : true
			},
		},
		legend: {
		    show: false
		},
		dataLabels: {
			enabled: false

		},
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent']
		},
        colors: ["#f39c12", "#fdb43f", "#ffc365", "#c58a2e", "#e6b567"],
		series: [{
			data: [10, 21, 10, 21, 10]
		}],
		grid: {
			show: true
		},
		xaxis: {
			categories: ['A', 'B', 'C', 'D', 'E'],
			labels: {
				show: true,
                style: {
					colors: '#fff',
					fontSize: '9px',
					cssClass: 'apexcharts-xaxis-label',
				}
			}
		},
		yaxis: {
			labels: {
				show: true,
			}
		},
		fill: {
			opacity: 1
		},
        tooltip: {
          theme: 'dark',
          x: {
            show: true,
          },
		  y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				},
				formatter: (value) => { return '' + value },
		  }
		}
	};
	var apexIPlistChart = new ApexCharts(
		document.querySelector('#apexIPlistChart'),
		apexIPlistchartOptions
	);
	apexIPlistChart.render();



//--------------------------------------------------------------------------
// Service Running Statistics - apexRunServiceChart
//--------------------------------------------------------------------------
var apexRunServiceOptions = {
		chart: {
		    width: '100%',
			height: 130,
			type: 'donut',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: 8
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [val.toFixed(1) + '%']
			},
            style: {
                fontSize: '12px',
                colors: [app.color.white],
                fontWeight: 400
            },
		},
		stroke: {
			show: false
		},
		legend: {
			show: false,
			position: 'left',
		},
		colors: ['rgba(' + app.color.themeRgb + ', .57)', 'rgba(' + app.color.themeRgb + ', .77)', 'rgba(' + app.color.themeRgb + ', .98)'],
		labels: ["A","A","A","A","A"],
		series: [44, 55, 41, 17, 15],
		tooltip: {
			theme: 'dark',
			x: {
				show: true
			},
			y: {
				title: {
					formatter: function (val) {
						return '' + val +"<br>" +" Count:"
					}
				},
				formatter: (value) => { return '' + value },
			}
		}
	};
	var apexRunServiceChart = new ApexCharts(
		document.querySelector('#apexRunServiceChart'),
		apexRunServiceOptions
	);
	apexRunServiceChart.render();


//--------------------------------------------------------------------------
// Memory Usage - apexMemory95usageChart
//--------------------------------------------------------------------------
var apexMemory95usageOptions = {
		chart: {
		    width: '100%',
			height: 250,
			type: 'radialBar',
			offsetY: 0,
		},
		plotOptions: {
			radialBar: {
				startAngle: -90,
				endAngle: 90,
				track: {
					background: '#fff',
					opacity: .2,
					strokeWidth: '97%',
					margin: 1, // margin is in pixels
				},
				dataLabels: {
					name: {
						fontSize: '20px',
						color: app.color.white,
						offsetY: 0
					},
					value: {
						offsetY: -75,
						fontSize: '16px',
						color: app.color.white,
						formatter: function (val) {
							return val + "%";
						}
					}
				}
			}
		},
		series: [95],
		labels: ['0'],
		grid: {
			padding: {
				top: -10
			}
		},
//		fill: {
//			colors: '#c00'
//		},
        fill: {
            colors: "#B76306",
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              gradientToColors: ["#B76306"],
              stops: [0, 50, 100]
            }
        },
	};

	var apexMemory95usageChart = new ApexCharts(
		document.querySelector('#apexMemory95usageChart'),
		apexMemory95usageOptions
	);
	apexMemory95usageChart.render();


//--------------------------------------------------------------------------
// Memory Usage - apexMemory75usageChart
//--------------------------------------------------------------------------
var apexMemory75usageOptions = {
		chart: {
		    width: '100%',
			height: 250,
			type: 'radialBar',
			offsetY: 0,
		},
		plotOptions: {
			radialBar: {
				startAngle: -90,
				endAngle: 90,
				track: {
					background: '#fff',
					opacity: .2,
					strokeWidth: '97%',
					margin: 1, // margin is in pixels
				},
				dataLabels: {
					name: {
						fontSize: '20px',
						color: app.color.white,
						offsetY: 0
					},
					value: {
						offsetY: -75,
						fontSize: '16px',
						color: app.color.white,
						formatter: function (val) {
							return val + "%";
						}
					}
				}
			}
		},
		series: [75],
		labels: ['76'],
		grid: {
			padding: {
				top: -10
			}
		},
//		fill: {
//			colors: app.color.orange
//		},
        fill: {
            colors: "#DB7F08",
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              gradientToColors: ["#DB7F08"],
              stops: [0, 50, 100]
            }
        },
	};

	var apexMemory75usageChart = new ApexCharts(
		document.querySelector('#apexMemory75usageChart'),
		apexMemory75usageOptions
	);
	apexMemory75usageChart.render();



//--------------------------------------------------------------------------
// Memory Usage - apexMemory60usageChart
//--------------------------------------------------------------------------
var apexMemory60usageOptions = {
		chart: {
		    width: '100%',
			height: 250,
			type: 'radialBar',
			offsetY: 0,
		},
		plotOptions: {
			radialBar: {
				startAngle: -90,
				endAngle: 90,
				track: {
					background: '#fff',
					opacity: .2,
					strokeWidth: '97%',
					margin: 1, // margin is in pixels

				},
				dataLabels: {
					name: {
						fontSize: '20px',
						color: app.color.white,
						offsetY: 0
					},
					value: {
						offsetY: -75,
						fontSize: '16px',
						color: app.color.dark,
						formatter: function (val) {
							return val + "%";
						}
					}
				}
			}
		},
            stroke: {
              lineCap: 'butt'
            },

		series: [60],
		labels: ['123'],
		grid: {
			padding: {
				top: -10
			}
		},
//		fill: {
//			colors: '#ffff00'
//		},
        fill: {
            colors: "#FFBE48",
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              gradientToColors: ["#FFBE48"],
              stops: [0, 50, 100]
            }
        },
	};

	var apexMemory60usageChart = new ApexCharts(
		document.querySelector('#apexMemory60usageChart'),
		apexMemory60usageOptions
	);
	apexMemory60usageChart.render();


//--------------------------------------------------------------------------
// Total quantity of servers - apexTotalServerChart
//--------------------------------------------------------------------------
var apexTotalServerOptions = {
		chart: {
		    width: '100%',
			height: 400,
			type: 'line',
			toolbar: {
				show: false
			}
		},
        colors: ['rgba(' + app.color.themeRgb + ', .95)', 'rgba(' + app.color.themeRgb + ', .30)'],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
			width: 3
		},
		grid: {
			row: {
				colors: ['rgba(' + app.color.whiteRgb + ', .25)', 'transparent'], // takes an array which will be repeated on columns
				opacity: 0.5
			}
		},
		markers: {
			size: 1,
		},
		series: [{
		    name: "A",
		    data: [112,344,153,667,312,
		           334,596,432,853,334,
		           869,123,443,235,678,
		           785,345,233,156,912,
		           812,344,153,667,312,
		           334,596,432,853,334]
		},{
		    name: "B",
		    data: [334,853,432,596,334,
		           312,667,153,344,812,
		           912,156,233,345,785,
		           678,235,443,123,869,
		           334,853,432,596,334,
		           312,667,153,344,112]
		}],
		xaxis: {
			labels: {
				show: true,
			},
			tooltip: {
				enabled: false,
			},
		},
		yaxis: {
			labels: {
				show: true,
					formatter: function (val){
						return Math.round(val);
					}
			}
		},
		tooltip: {
			theme: 'dark',
			x: {
				show: true,
			},
			y: {
				title: {
					formatter: function (val) {
						return '' + val
					}
				},
				formatter: (value) => { return '' + value },
			}
		},
		legend: {
			show: false,
			position: 'top',
			offsetY: 1,
			horizontalAlign: 'right',
			floating: true
		}
	};
	var apexTotalServerChart = new ApexCharts(
		document.querySelector('#apexTotalServerChart'),
		apexTotalServerOptions
	);
	apexTotalServerChart.render();



//--------------------------------------------------------------------------
// Total alarm case(Top 5) - apexTotalAlarmChart
//--------------------------------------------------------------------------
	var apexTotalAlarmOptions = {
		chart: {
		    width: '100%',
			height: 112,
			type: 'donut',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: 1,
				}
			}
		},
		dataLabels: {
			enabled: true,
            formatter(val, value) {
				const name = value.w.globals.labels[value.seriesIndex]
				return [val.toFixed(1) + '%']
			},
            style: {
                fontSize: '10px',
                colors: [app.color.white],
                fontWeight: 400
            },
//			dropShadow: {
//				enabled: true,
//				color: 'rgba(' + app.color.darkRgb + ', .75)',
//				top: -2,
//				left: 4,
//				blur: 1,
//				opacity: 0.5
//			}
		},
		stroke: {
			show: false
		},
//		legend: {
//			show: true,
//			position:"right"
//
//		},
//        legend: {
//            formatter: function(group, value) {
//                return [group +"&nbsp;&nbsp;&nbsp;"+value.w.globals.series[value.seriesIndex]]
//            },
//            position : 'right',
//            fontSize: "10px",
//            height: 230,
//        },
        legend: {
			show: true,
			position: 'left',
			width : '100%',
			height: 112,
			horizontalAlign: 'left',
			floating: false,
			/* formatter: (value, opts) => {
				return value + '<span class="chartLegend">' + opts.w.globals.series[opts.seriesIndex] + '</span>';
			}, */
			formatter: function (value, opts) {
                return [value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +  opts.w.globals.series[opts.seriesIndex]]
            },
			itemMargin: {
				horizontal: 0,
				vertical: 0
			},
			labels: {
				colors: '#fff',
				fontSize: '10px'
			}
		},

		colors: ['rgba(' + app.color.themeRgb + ', .57)', 'rgba(' + app.color.themeRgb + ', .77)', 'rgba(' + app.color.themeRgb + ', .98)'],
		labels: ['192.168.xx', '192.168.xx', '192.168.xx', '192.168.xx', '192.168.xx'],
		series: [10, 20, 30, 40, 50],
		tooltip: {
			theme: 'dark',
			x: {
				show: true
			},
			y: {
				title: {
					formatter: function (val) {
						return '' + val +"<br>" +" Count:"
					}
				},
				formatter: (value) => { return '' + value },
			}
		},
//		tooltipHoverFormatter: function(group, value) {
//            return '<strong>' + value.w.globals.series[value.seriesIndex][value.dataPointIndex] + '</strong>'
//        },
	};
	var apexTotalAlarmChart = new ApexCharts(
		document.querySelector('#apexTotalAlarmChart'),
		apexTotalAlarmOptions
	);
	apexTotalAlarmChart.render();



//--------------------------------------------------------------------------
// physical server quantity - apexPhysicalServerChart
//--------------------------------------------------------------------------

var apexPhysicalServerOptions = {
		chart: {
			height: 120,
			type: 'bar',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: true,
//				columnWidth: '60%',
//                barheight: '100%',
                distributed: true,
			},
		},
		legend : {
		    show: false
		},
		dataLabels: {
			enabled: false

		},
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent']
		},
		colors: ["#f39c12", "#fdb43f", "#ffc365"],
		series: [{
			data: [10, 21, 10]
		}],
		grid: {
			show: true
		},

		xaxis: {
			categories: ['벤더명ABCDE', '벤더명ABCDE', '벤더명ABCDE'],
			labels: {
				show: true,
                style: {
					colors: '#fff',
					fontSize: '9px',
					cssClass: 'apexcharts-xaxis-label',
				},
			offsetX: 30,
			},
		},
		yaxis: {
			labels: {
				show: true,
			}
		},
		fill: {
			opacity: 1
		},
        tooltip: {
          theme: 'dark',
          x: {
            show: true,
          },
		  y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				},
				formatter: (value) => { return '' + value },
		  }
		}
	};




	var apexPhysicalServerChart = new ApexCharts(
		document.querySelector('#apexPhysicalServerChart'),
		apexPhysicalServerOptions
	);
	apexPhysicalServerChart.render();


};



function worldMap(worldMapData) {
        var width = 750,
            height = 330,
            centered,
            clicked_point;

        var svg = d3.select("#world-map").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "map")
            .attr("viewBox", `0 0 ${width} ${height}`);

        var projection = d3v4.geoMercator()
            .translate([width / 2, height / 1.5])
            .scale(80);

        var path = d3v4.geoPath()
            .projection(projection);

        var g = svg.append("g");

        queue()
            .defer(d3.json, "../static/assets/plugins/jvectormap-content/world.json" )
            .await(ready);


svg.selectAll("circle")
        .data(worldMapData)
        .enter()
        .append("circle")
        .attr("class","dot")
        .attr("transform",translateCircle)
        .attr("r",4)
        .style("fill", "rgba("+app.color.themeRgb+")");


        function ready(error, data){

            var features = topojson.feature(data, data.objects.countries).features;
            svg.selectAll("path")
                .data(features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", "rgba("+app.color.whiteRgb+")")
                .attr("opacity", .5)
        }





        function translateCircle(datum, index)
          {
            return "translate(" +  projection([datum[1], datum[0]]) + ")";
          };
        setInterval(function(){
	      worldMapData.forEach(function(datum)
          {
			  svg
			  	.append("circle")
			  	.attr({
                    "class": "ring",
                    "transform": translateCircle(datum),
                    "fill":"rgba("+app.color.themeRgb+")",
                    "stroke":"rgba("+app.color.whiteRgb+")",
                    "stroke-opacity": .5,
                    "stroke-width": 0,
                    "r":1,
                    "opacity": 0.14,
                    "fill-opacity":0.14
                })
                .transition()
                .duration(6000)
                .attr("r", 40)
                .attr("opacity", 0)
                .remove();





//			      .attr("class", "ring")
//			      .attr("transform", translateCircle(datum))
//			      .attr("r", 1)
//			      .style("fill", "rgba("+app.color.themeRgb+")")
//			      .style("opacity", .14)
//			      .style("fill-opacity", .14)
//			    .transition()
//			      .ease("linear")
//			      .duration(2000)
//			      .style("stroke-opacity", .14)
//			      .style("stroke-width", 0.1)
//			      .style("stroke", "rgba("+app.color.themeRgb+")")
//			      .attr("r", 30)
//			      .remove();
          })
      }, 1000);
};



function koreaMap(worldMapData) {

var width = 750,
    height = 330,
    initialScale = 2700,
    centered,
    labels;

var projection = d3.geo.mercator()
    .center([127.1094211519, 36.170])
    .scale(initialScale)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#korea-map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('id', 'kmap')
    .attr("viewBox", `0 0 ${width} ${height}`);

var states = svg.append("g")
    .attr("id", "states");

states.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

d3.json("../static/assets/plugins/jvectormap-content/korea.json", function(json) {
  states.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path)
      .attr("fill", "rgba("+app.color.whiteRgb+")")
      .attr("opacity", .5)
      .attr("id", function(d) { return 'path-'+d.id; });

  labels = states.selectAll("text")
    .data(json.features)
    .enter().append("text")
      .attr("transform", labelsTransform)
      .attr("id", function(d) { return 'label-'+d.id; })
      .attr('text-anchor', 'small')
      .attr("dy", ".35em")
      .attr("fill", "rgba("+app.color.whiteRgb+")")
      .attr("opacity", .8)
      .text(function(d) { return d.properties.ShortName; });
});

svg.selectAll("circle")
        .data(worldMapData)
        .enter()
        .append("circle")
        .attr("class","dot")
        .attr("transform",translateCircle)
        .attr("r",4)
        .style("fill", "rgba("+app.color.themeRgb+")");

function labelsTransform(d) {



  if (d.id == 8) {
    var arr = path.centroid(d);
    arr[1] += (d3.event && d3.event.scale) ? (d3.event.scale / height + 20) : (initialScale / height + 20);

    return "translate(" + arr + ")";
  } else {
    return "translate(" + path.centroid(d) + ")";
  }
}



function translateCircle(datum, index)
          {
            return "translate(" +  projection([datum[1], datum[0]]) + ")";
          };

        setInterval(function(){
	      worldMapData.forEach(function(datum)
          {
			  svg
			  	.append("circle")
			  	.attr({
                    "class": "ring",
                    "transform": translateCircle(datum),
                    "fill":"rgba("+app.color.themeRgb+")",
                    "stroke":"rgba("+app.color.whiteRgb+")",
                    "stroke-opacity": .5,
                    "stroke-width": 0,
                    "r":1,
                    "opacity": 0.14,
                    "fill-opacity":0.14
                })
                .transition()
                .duration(6000)
                .attr("r", 40)
                .attr("opacity", 0)
                .remove();


//			      .attr("class", "ring")
//			      .attr("transform", translateCircle(datum))
//			      .attr("r", 1)
//			      .style("fill", "rgba("+app.color.themeRgb+")")
//			      .style("opacity", .14)
//			      .style("fill-opacity", .14)
//			    .transition()
//			      .ease("linear")
//			      .duration(2000)
//			      .style("stroke-opacity", .14)
//			      .style("stroke-width", 0.1)
//			      .style("stroke", "rgba("+app.color.themeRgb+")")
//			      .attr("r", 30)
//			      .remove();
          })
      }, 800);
};























function seongnamMap(worldMapData) {
        var width = 750,
            height = 330,
            centered,
            clicked_point;
	var svg = d3.select("#seongnam-map").append("svg").attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);
	var map = svg.append("g").attr("id", "map"), places = svg.append("g").attr("id", "places");
	var projection = d3.geo.mercator().center([127.1094211519, 37.388]).scale(120000).translate([width / 2, height / 2]);
	var path = d3.geo.path().projection(projection);

        var projection = d3v4.geoMercator()
            .translate([width / 2, height / 1.8])
            .center([127.1094211519, 37.398])
            .scale(110000);

        var path = d3v4.geoPath()
            .projection(projection);

        var g = svg.append("g");

        queue()
            .defer(d3.json, "../static/assets/plugins/jvectormap-content/seongnam.json" )
            .await(ready);


svg.selectAll("circle")
        .data(worldMapData)
        .enter()
        .append("circle")
        .attr("class","dot")
        .attr("transform",translateCircle)
        .attr("r",4)
        .style("fill", "rgba("+app.color.themeRgb+")");


        function ready(error, data){

            var features = topojson.feature(data, data.objects.seongnam).features;
            svg.selectAll("path")
                .data(features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", "rgba("+app.color.whiteRgb+")")
                .attr("opacity", .5);

            svg.selectAll('text').data(features).enter().append("text")
			.attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.attr("class", "municipality-label")
			.text(function (d) { return d.properties.name; })
			.style("fill", "rgba("+app.color.whiteRgb+")")
			.attr('text-anchor', 'small')
			.attr("opacity", .8);


        }





        function translateCircle(datum, index)
          {
            return "translate(" +  projection([datum[1], datum[0]]) + ")";
          };

        setInterval(function(){
	      worldMapData.forEach(function(datum)
          {
			  svg
			  	.append("circle")
			  	.attr({
                    "class": "ring",
                    "transform": translateCircle(datum),
                    "fill":"rgba("+app.color.themeRgb+")",
                    "stroke":"rgba("+app.color.whiteRgb+")",
                    "stroke-opacity": .5,
                    "stroke-width": 0,
                    "r":1,
                    "opacity": 0.14,
                    "fill-opacity":0.14
                })
                .transition()
                .duration(6000)
                .attr("r", 40)
                .attr("opacity", 0)
                .remove();






//			      .attr("class", "ring")
//			      .attr("transform", translateCircle(datum))
//			      .attr("r", 1)
//			      .style("fill", "rgba("+app.color.themeRgb+")")
//			      .style("opacity", .14)
//			      .style("fill-opacity", .14)
//			    .transition()
//			      .ease("linear")
//			      .duration(2000)
//			      .style("stroke-opacity", .14)
//			      .style("stroke-width", 0.1)
//			      .style("stroke", "rgba("+app.color.themeRgb+")")
//			      .attr("r", 30)
//			      .remove();
          })
      }, 800);



//d3.select(window).on("resize", sizeChange);
//    function sizeChange() {
//	    d3.select("g").attr("transform", "scale(" + $("#seongnam-map").width()/900 + ")");
//	    $("svg").height($("#seongnam-map").width()*0.618);
//	}
//
//	var width = 740, height = 351;
//	var svg = d3.select("#seongnam-map").append("svg").attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);
//	var map = svg.append("g").attr("id", "map"), places = svg.append("g").attr("id", "places");
//	var projection = d3.geo.mercator().center([127.1094211519, 37.398]).scale(115000).translate([width / 2, height / 2]);
//	var path = d3.geo.path().projection(projection);
//
//	svg.selectAll("circle")
//        .data(worldMapData)
//        .enter()
//        .append("circle")
//        .attr("class","dot")
//        .attr("transform",translateCircle)
//        .attr("r",4)
//        .style("fill", "red");
//
//	function translateCircle(datum, index)
//          {
//            return "translate(" +  projection([datum[1], datum[0]]) + ")";
//          };
//
//        setInterval(function(){
//	      worldMapData.forEach(function(datum)
//          {
//			  svg
//			  	.append("circle")
//			      .attr("class", "ring")
//			      .attr("transform", translateCircle(datum))
//			      .attr("r", 1)
//			      .style("fill", "rgba("+app.color.themeRgb+")")
//			      .style("opacity", .14)
//			      .style("fill-opacity", .14)
//			    .transition()
//			      .ease("linear")
//			      .duration(2000)
//			      .style("stroke-opacity", .14)
//			      .style("stroke-width", 0.1)
//			      .style("stroke", "rgba("+app.color.themeRgb+")")
//			      .attr("r", 30)
//			      .remove();
//          })
//      }, 800);
//
//
//
//	d3.json("../static/assets/plugins/jvectormap-content/seongnam.json", function (error, data) {
//		var features = topojson.feature(data, data.objects.seongnam).features;
//
//		map.selectAll('path').data(features).enter().append('path')
//			.attr('class', function (d) { return 'municipality c' + d.properties.OBJECTID })
//			.attr('d', path)
//			.attr("opacity", 0.5)
//			.style("fill", "#c7cbce")
//			.attr("stroke-opacity", 0)
//			.attr("stroke-width", 5);
//
//		map.selectAll('text').data(features).enter().append("text")
//			.attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
//			.attr("dy", ".35em")
//			.attr("class", "municipality-label")
//			.text(function (d) { return d.properties.sggnm; })
//			.style("fill", "#fff")
//			.attr("opacity", 0.5);
//	});


}

function seoulMap(worldMapData) {
    d3.select(window).on("resize", sizeChange);
    function sizeChange() {
	    d3.select("g").attr("transform", "scale(" + $("#seoul-map").width()/900 + ")");
	    $("svg").height($("#seoul-map").width()*0.618);
	}

	var width = 800, height = 350;
	var svg = d3.select("#seoul-map").append("svg").attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);;
	var map = svg.append("g").attr("id", "map"), places = svg.append("g").attr("id", "places");
	var projection = d3.geo.mercator().center([126.9774211519, 37.560]).scale(60000).translate([width / 2, height / 2]);
	var path = d3.geo.path().projection(projection);

	svg.selectAll("circle")
        .data(worldMapData)
        .enter()
        .append("circle")
        .attr("class","dot")
        .attr("transform",translateCircle)
        .attr("r",4)
        .style("fill", "rgba("+app.color.themeRgb+")");

	function translateCircle(datum, index)
          {
            return "translate(" +  projection([datum[1], datum[0]]) + ")";
          };

        setInterval(function(){
	      worldMapData.forEach(function(datum)
          {
			  svg
			  	.append("circle")
			  	.attr({
                    "class": "ring",
                    "transform": translateCircle(datum),
                    "fill":"rgba("+app.color.themeRgb+")",
                    "stroke":"rgba("+app.color.whiteRgb+")",
                    "stroke-opacity": .5,
                    "stroke-width": 0,
                    "r":1,
                    "opacity": 0.14,
                    "fill-opacity":0.14
                })
                .transition()
                .duration(6000)
                .attr("r", 40)
                .attr("opacity", 0)
                .remove();





//			      .attr("class", "ring")
//			      .attr("transform", translateCircle(datum))
//			      .attr("r", 1)
//			      .style("fill", "rgba("+app.color.themeRgb+")")
//			      .style("opacity", .14)
//			      .style("fill-opacity", .14)
//			    .transition()
//			      .ease("linear")
//			      .duration(2000)
//			      .style("stroke-opacity", .14)
//			      .style("stroke-width", 0.1)
//			      .style("stroke", "rgba("+app.color.themeRgb+")")
//			      .attr("r", 30)
//			      .remove();
          })
      }, 800);

	d3.json("../static/assets/plugins/jvectormap-content/seoul.json", function (error, data) {
		var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;

		map.selectAll('path').data(features).enter().append('path')
			.attr('class', function (d) { return 'municipality c' + d.properties.SIG_CD })
			.attr('d', path)
			.style("fill", "rgba("+app.color.whiteRgb+")")
			.attr("opacity", .5);

		map.selectAll('text').data(features).enter().append("text")
			.attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.attr("class", "municipality-label")
			.text(function (d) { return d.properties.SIG_KOR_NM; })
			.style("fill", "rgba("+app.color.whiteRgb+")")
			.attr('text-anchor', 'small')
			.attr("opacity", .8);
	});
}




/* Controller
------------------------------------------------ */
$(document).ready(function() {
	handleRenderChartNC();
	worldMap(worldMapData);
	koreaMap(worldMapData);
	seongnamMap(worldMapData);
    seoulMap(worldMapData);


	document.addEventListener('theme-reload', function() {
	$('[data-render="apexchart"], #world-map #korea-map #seongnamMap').empty();
		handleRenderChartNC();
        worldMap(worldMapData);
		koreaMap(worldMapData);
        seongnamMap(worldMapData);
		seoulMap(worldMapData);
	});
});
