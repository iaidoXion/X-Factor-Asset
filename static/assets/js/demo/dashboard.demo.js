/*
Template Name: HUD - Responsive Bootstrap 5 Admin Template
Version: 1.8.0
Author: Sean Ngu
Website: http://www.seantheme.com/hud/
*/


var randomNo = function() {
  return Math.floor(Math.random() * 60) + 30
};

//value = ""
var handleRenderChart = function () {
  // global apexchart settings
  Apex = {
    title: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: app.font.family,
        color: app.color.white,
      },
    },
    legend: {
      fontFamily: app.font.family,
      labels: {
        colors: "#fff",
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "5px",
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
          fontSize: "7px",
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
          fontSize: "8px",
          fontFamily: app.font.family,
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
  };

  // small stat chart
//  var x = 0;
//  var chart = [];
//
//  var elmList = [].slice.call(
//    document.querySelectorAll('[data-render="apexchart"]')
//  );
//  elmList.map(function (elm) {
//    var chartType = elm.getAttribute("data-type");
//    var chartHeight = elm.getAttribute("data-height");
//    var chartTitle = elm.getAttribute("data-title");
//    var chartColors = [];
//    var chartPlotOptions = {};
//    var chartData = [];
//    var chartStroke = {
//      show: false,
//    };
//	  if (chartType == "bar") {
//      BarValue = []
//      for (x in a.barChartDataList) {
//        dict = {
//          'x': a.barChartDataList[x].name, 'y':a.barChartDataList[x].value
//        };
//        BarValue.push(dict);
//      }
//      console.log(BarValue);
//
//      chartPlotOptions = {
//        bar: {
//          horizontal: false,
//          columnWidth: "65%",
//          endingShape: "rounded",
//        },
//      };
//      console.log(BarValue);
//      chartData = [
//        {
//          name: "",
//          data: BarValue,
//        },
//      ];
//      Label = {
//        enabled: false,
//      },
//      chartColors = [
//        "rgba(" + app.color.themeRgb + ", .55)",
//        "rgba(" + app.color.themeRgb + ", .35)",
//        "rgba(" + app.color.themeRgb + ", .55)",
//        "rgba(" + app.color.themeRgb + ", .75)",
//        ],
//      xdata = {
//        type: "category",
//        labels: {
//          show: true,
//        },
//      };
//	  } else if (chartType == "pie") {
//		  pieValue = []
//		  for (x in a.pieChartDataList) {
//			  pieValue.push(a.pieChartDataList[x].value);
//      }
//      chartColors = [
//        "rgba(" + app.color.themeRgb + ", 1)",
//        "rgba(" + app.color.themeRgb + ", .75)",
//        "rgba(" + app.color.themeRgb + ", .5)",
//      ];
//      console.log(pieValue);
//      Label = {
//        enabled: false,
//        formatter: function (val) {
//          return val;
//        },
//      },
//      chartData = pieValue,
//      xdata = {
//        type: "category",
//        labels: {
//          show: true,
//        },
//      };
//    } else if (chartType == "donut") {
//      chartColors = [
//        "rgba(" + app.color.themeRgb + ", .15)",
//        "rgba(" + app.color.themeRgb + ", .35)",
//        "rgba(" + app.color.themeRgb + ", .55)",
//        "rgba(" + app.color.themeRgb + ", .75)",
//        "rgba(" + app.color.themeRgb + ", .95)",
//      ];
//      Label = {
//        enabled: false,
//      },
//      chartData = [randomNo(), randomNo(), randomNo(), randomNo(), randomNo()];
//      chartStroke = {
//        show: false,
//        curve: "smooth",
//        lineCap: "butt",
//        colors: "rgba(" + app.color.blackRgb + ", .25)",
//        width: 2,
//        dashArray: 0,
//      };
//      chartPlotOptions = {
//        pie: {
//          donut: {
//            background: "transparent",
//          },
//        },
//      },
//      xdata = {
//        type: "category",
//        labels: {
//          show: true,
//        },
//      };
//    } else if (chartType == "line") {
//      NoteBook = [];
//		Desktop = [];
//		RMC = [];
//      Virtual = [];
//      list = ["{x: }"]
//		for (x in a.lineChartDataList) {
//			if (a.lineChartDataList[x].name == "Notebook") {
//          dict = { 'x': a.lineChartDataList[x].date, 'y': a.lineChartDataList[x].value };
//          NoteBook.push(dict);
//        } else if (a.lineChartDataList[x].name == "Desktop") {
//          dict = { 'x': a.lineChartDataList[x].date, 'y': a.lineChartDataList[x].value };
//          Desktop.push(dict);
//        } else if (a.lineChartDataList[x].name == "Rack Mount Chassis") {
//          dict = { 'x': a.lineChartDataList[x].date, 'y': a.lineChartDataList[x].value };
//          RMC.push(dict);
//        } else if (a.lineChartDataList[x].name == "Virtual") {
//          dict = { 'x': a.lineChartDataList[x].date, 'y': a.lineChartDataList[x].value, };
//          Virtual.push(dict);
//        }
//      }
//		chartColors = [
//      "rgba(" + app.color.themeRgb + ", .45)",
//      "rgba(" + app.color.themeRgb + ", .55)",
//      "rgba(" + app.color.themeRgb + ", .75)",
//      "rgba(" + app.color.themeRgb + ", .95)",
//    ];
//		chartData = [
//      {
//        name: "Desktop",
//        data: Desktop,
//      },
//      {
//        name: "NoteBook",
//        data: NoteBook,
//      },
//      {
//        name: "RMC",
//        data: RMC,
//      },
//      {
//        name: "Virtual",
//        data: Virtual,
//      },
//      ];
//      Label = {
//        enabled: false,
//      },
//		chartStroke = {
//			curve: "straight",
//			width: 2,
//        },
//      xdata = {
//          axisBorder: {
//          show: true,
//          color: 'rgba('+ app.color.whiteRgb + ', .25)',
//          height: 1,
//          width: '100%',
//          offsetX: 0,
//          offsetY: -1
//        },
//        axisTicks: {
//          show: true,
//          borderType: 'solid',
//          color: 'rgba('+ app.color.whiteRgb + ', .25)',
//          height: 6,
//          offsetX: 0,
//          offsetY: 0
//        },
//        labels: {
//          show: true,
//        }
//      };
//    }

//    var chartOptions = {
//      chart: {
//        height: chartHeight,
//        type: chartType,
//        toolbar: {
//          show: false,
//        },
//        sparkline: {
//          enabled: true,
//        },
//      },
//      dataLabels: Label,
//      colors: chartColors,
//      stroke: chartStroke,
//      plotOptions: chartPlotOptions,
//      series: chartData,
//      grid: {
//        show: false,
//      },
//      tooltip: {
//        theme: "dark",
//        x: {
//          show: true,
//        },
//        y: {
//          title: {
//            formatter: function (seriesName) {
//              return "" + seriesName;
//            },
//          },
//          formatter: (value) => {
//            return "" + value;
//          },
//        },
//      },
//      xaxis: xdata,
//      yaxis: {
//        labels: {
//          show: false,
//        },
//      },
//    };
//    chart[x] = new ApexCharts(elm, chartOptions);
//    chart[x].render();
//    x++;
//  });



//----------------------------------------
// Asset Count By Item - bar chart
//---------------------------------------
   var D = []
   var E = []
   for (var i = 0; i <4; i++){
        D.push(JSON.stringify(a.barChartDataList[i]['value']))
        E.push(a.barChartDataList[i]['name'])
   }

var apexColumnChartOptions = {
		chart: {
			height: 100,
			type: 'bar',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '70%',
			},
		},
		dataLabels: {
			enabled: false

		},
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent']
		},
		colors: [app.color.theme],
		series: [{
			data: D
		}],
		grid: {
			show: true
		},
		xaxis: {
			categories: ['Desktop', 'Notebook', 'Rack', 'Virturl'
			],
			labels: {
				show: true,
                style: {}
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
				show: false
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
	var apexColumnChart = new ApexCharts(
		document.querySelector('#apexColumnChart'),
		apexColumnChartOptions
	);
	apexColumnChart.render();



//---------------------------------------
// Asset Count By Day Item - line chart
//----------------------------------------
var apexLineChartOptions = {
		chart: {
			height: 120,
			type: 'line',
			toolbar: {
				show: false
			}
		},
		colors: ['rgba(' + app.color.themeRgb + ', .37)', 'rgba(' + app.color.themeRgb + ', .57)', 'rgba(' + app.color.themeRgb + ', .77)', 'rgba(' + app.color.themeRgb + ', .98)'],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
			width: 2
		},
		grid: {
			row: {
				colors: ['rgba(' + app.color.whiteRgb + ', .25)', 'transparent'], // takes an array which will be repeated on columns
				opacity: 0.5
			}
		},
		series: [{
			name: 'Desktop',
			data: [10, 5, 6, 8, 5]
		}, {
			name: 'Notebook',
			data: [5, 6, 2, 8, 5]
		}, {
			name: 'Rack',
			data: [3, 4, 5, 7, 10]
		}, {
			name: 'Virtual',
			data: [2, 4, 6, 4, 3]
		}],
		markers: {
			size: 1,
		},
		xaxis: {
			categories: ['2022-08-20', '2022-08-21', '2022-08-22', '2022-08-23', '2022-08-24', '2022-08-25'],
			labels: {
				show: true,
			}
		},
		yaxis: {
			labels: {
				show: true,
			}
		},
		tooltip: {
			theme: 'dark',
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
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
	var apexLineChart = new ApexCharts(
		document.querySelector('#apexLineChart'),
		apexLineChartOptions
	);
	apexLineChart.render();



//----------------------------------------
// Asset Count By Day Item - pie chart
//---------------------------------------
var apexPieChartOptions = {
		chart: {
			height: 150,
			type: 'pie',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: 2
				}
			}
		},
		dataLabels: {
			enabled: true,
			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [name, val.toFixed(1) + '%']
			},
			style: {
				fontSize: '10px',
				colors: [app.color.white]
			},
			dropShadow: {
				enabled: true,
				color: 'rgba(' + app.color.darkRgb + ', .75)',
				top: -2,
				left: 4,
				blur: 1,
				opacity: 0.5
			}
		},
		stroke: {
			show: false
		},
		legend: {
			show: false,
		},
		colors: ['rgba(' + app.color.themeRgb + ', .57)', 'rgba(' + app.color.themeRgb + ', .77)', 'rgba(' + app.color.themeRgb + ', .98)'],
		labels: ['Linux', 'Windows', 'Mac'],
		series: [44, 55, 13],
		tooltip: {
			theme: 'dark',
			x: {
				show: false
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
	var apexPieChart = new ApexCharts(
		document.querySelector('#apexPieChart'),
		apexPieChartOptions
	);
	apexPieChart.render();



//---------------------------------------
// Asset Count By Day Item - dount chart
//---------------------------------------
var apexDountChartOptions = {
		chart: {
			height: 150,
			type: 'donut',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: 8
				}
			}
		},
		dataLabels: {
			enabled: true,
			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [name, val.toFixed(1) + '%']
			},
			style: {
				fontSize: '10px',
				colors: [app.color.white]
			},
			dropShadow: {
				enabled: true,
				color: 'rgba(' + app.color.darkRgb + ', .75)',
				top: -2,
				left: 4,
				blur: 1,
				opacity: 0.5
			}
		},
		stroke: {
			show: false
		},
		legend: {
			show: false,
		},
		colors: ['rgba(' + app.color.themeRgb + ', .57)', 'rgba(' + app.color.themeRgb + ', .77)', 'rgba(' + app.color.themeRgb + ', .98)'],
		labels: ['Desktop', 'Notebook', 'Rack'],
		series: [44, 55, 13],
		tooltip: {
			theme: 'dark',
			x: {
				show: false
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
	var apexDountChart = new ApexCharts(
		document.querySelector('#apexDountChart'),
		apexDountChartOptions
	);
	apexDountChart.render();



//----------------------------------------
// Failure Symptom Case - raider chart
//---------------------------------------

var apexRadarChartOptions = {
		chart: {
			width: '100%',
			height: 500,
			type: 'radar',
			toolbar: {
				show: false
			},
		},
		responsive: [{
			breakpoint: undefined,
			options: {},
		}],
		series: [{
			name: 'Failure Symptom Case',
			data: [10, 100, 40, 30, 50, 80, 33],
		}],
		dataLabels: {
			enabled: false
		},
		plotOptions: {
			radar: {
				size: 170,
				polygons: {
					strokeColors: 'rgba(' + app.color.whiteRgb + ', .25)',
					strokeWidth: 1,
					connectorColors: 'rgba(' + app.color.whiteRgb + ', .25)',
					fill: {
						colors: ['rgba(' + app.color.gray300Rgb + ', .25)', 'rgba(' + app.color.whiteRgb + ', .25)']
					}
				},
			}
		},
		colors: [app.color.theme],
		markers: {
			size: 4,
			colors: [app.color.theme],
			strokeColor: app.color.theme,
			strokeWidth: 2,
		},
		tooltip: {
			theme: 'dark',
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				},
				formatter: (value) => { return '' + value },
			}
		},
		xaxis: {
			categories: [
				['No Login History'],
				['Drive', 'Size', 'No Change'],
				['Listen', 'Port', 'No Change'],
				['Established', 'Port', 'No Change'],
				['RAM', 'Usage', 'Exceeded'],
				['CPU', 'Usage', 'Exceeded'],
				['Running', 'Process', 'Exceeded'],
			],
			labels: {
				show: true,
				rotate: 0,
				style: {
					colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
					fontSize: '10px',
					cssClass: 'apexcharts-xaxis-label',
				},
			}
		},
		yaxis: {
			tickAmount: 7,
			labels: {
				formatter: function (val, i) {
					if (i % 1 === 0) {
						return val
					} else {
						return ''
					}
				},
			}
		}
	}
	var apexRadarChart = new ApexCharts(
		document.querySelector('#apexRadarChart'),
		apexRadarChartOptions
	);
	apexRadarChart.render();



//----------------------------------------
// Failure Symptom Case - dount Achart
//---------------------------------------
var apexDountChartOptions = {
		chart: {
			height: 160,
			type: 'donut',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: 2
				}
			}
		},
		dataLabels: {
			enabled: true,
			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [name, val.toFixed(1) + '%']
			},
			style: {
				fontSize: '9px',
				colors: [app.color.white]
			},
			dropShadow: {
				enabled: true,
				color: 'rgba(' + app.color.darkRgb + ', .75)',
				top: -2,
				left: 4,
				blur: 1,
				opacity: 0.5
			}
		},
		stroke: {
			show: false
		},
		legend: {
			show: false,
		},
		colors: ['rgba(' + app.color.themeRgb + ', 1)', 'rgba(' + app.color.themeRgb + ', .8)', 'rgba(' + app.color.themeRgb + ', .6)', 'rgba(' + app.color.themeRgb + ', .4)', 'rgba(' + app.color.themeRgb + ', .2)'],
		labels: ['192.168.0', '192.168.1', '192.168.2', '192.168.3', '192.168.4'],
		series: [10, 20, 5, 2, 14],
		tooltip: {
			theme: 'dark',
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				},
				formatter: (value) => { return '' + value },
			}
		},
	};
	var apexDountChart = new ApexCharts(
		document.querySelector('#apexDountFailerAChart'),
		apexDountChartOptions
	);
	apexDountChart.render();



//----------------------------------------
// Failure Symptom Case - dount Bchart
//---------------------------------------
	var apexDountChartOptions = {
		chart: {
			height: 160,
			type: 'donut',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: 2
				}
			}
		},
		dataLabels: {
			enabled: true,

			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [name, val.toFixed(1) + '%']
			},
			style: {
				fontSize: '9px',
				colors: [app.color.white]
			},
			dropShadow: {
				enabled: true,
				color: 'rgba(' + app.color.darkRgb + ', .75)',
				top: -2,
				left: 4,
				blur: 1,
				opacity: 0.5
			}
		},
		stroke: {
			show: false
		},
		legend: {
			show: false,
		},
		colors: ['rgba(' + app.color.themeRgb + ', 1)', 'rgba(' + app.color.themeRgb + ', .8)', 'rgba(' + app.color.themeRgb + ', .6)', 'rgba(' + app.color.themeRgb + ', .4)', 'rgba(' + app.color.themeRgb + ', .2)'],
		labels: ['192.168.0', '192.168.1', '192.168.2', '192.168.3', '192.168.4'],
		series: [5, 4, 2, 20, 9],
		tooltip: {
			theme: 'dark',
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				},
				formatter: (value) => { return '' + value },
			}
		},
	};
	var apexDountChart = new ApexCharts(
		document.querySelector('#apexDountFailerBChart'),
		apexDountChartOptions
	);
	apexDountChart.render();



//----------------------------------------
// Failure Symptom Case - dount Cchart
//---------------------------------------
	var apexDountChartOptions = {
		chart: {
			height: 150,
			type: 'donut',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: 2
				}
			}
		},
		dataLabels: {
			enabled: true,

			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [name, val.toFixed(1) + '%']
			},
			style: {
				fontSize: '9px',
				colors: [app.color.white]
			},
			dropShadow: {
				enabled: true,
				color: 'rgba(' + app.color.darkRgb + ', .75)',
				top: -2,
				left: 4,
				blur: 1,
				opacity: 0.5
			}
		},
		stroke: {
			show: false
		},
		legend: {
			show: false,
		},
		colors: ['rgba(' + app.color.themeRgb + ', 1)', 'rgba(' + app.color.themeRgb + ', .8)', 'rgba(' + app.color.themeRgb + ', .6)', 'rgba(' + app.color.themeRgb + ', .4)', 'rgba(' + app.color.themeRgb + ', .2)'],
		labels: ['192.168.0', '192.168.1', '192.168.2', '192.168.3', '192.168.4'],
		series: [5, 4, 2, 20, 9],
		tooltip: {
			theme: 'dark',
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return ''
					}
				},
				formatter: (value) => { return '' + value },
			}
		},
	};
	var apexDountChart = new ApexCharts(
		document.querySelector('#apexDountFailerCChart'),
		apexDountChartOptions
	);
	apexDountChart.render();



//  var serverChartOptions = {
//    chart: {
//      height: "100%",
//      type: "bar",
//      toolbar: {
//        show: false,
//      },
//    },
//    plotOptions: {
//      bar: {
//        horizontal: false,
//        columnWidth: "55%",
//        endingShape: "rounded",
//      },
//    },
//    dataLabels: {
//      enabled: false,
//    },
//    grid: {
//      show: true,
//      borderColor: "rgba(" + app.color.whiteRgb + ", .15)",
//    },
//    stroke: {
//      show: false,
//    },
//    colors: ['rgba('+ app.color.themeRgb + ', .35)', 'rgba('+ app.color.themeRgb + ', .55)', 'rgba('+ app.color.themeRgb + ', .75)', 'rgba('+ app.color.themeRgb + ', .95)'],
//    series: [{
//    	name: 'Desktop',
//      data: [
//      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(),
//      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo()
//      ]
//    },{
//    	name: 'Notebook',
//      data: [
//      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(),
//      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo()
//      ]
//    },{
//    	name: 'Rack',
//      data: [
//      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(),
//      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo()
//      ]
//    },{
//    	name: 'Virtual',
//      data: [
//      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(),
//      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo()
//      ]
//    }],
//    xaxis: {
//      categories: ['Desktop', 'Notebook', 'Rack', 'Virtual'],
//      labels: {
//        show: true,
//      },
//    },
//    fill: {
//      opacity: 0.65,
//    },
//    tooltip: {
//      y: {
//        formatter: function (val) {
//          return "$ " + val + " thousands";
//        },
//      },
//    },
//  };
//  var apexServerChart = new ApexCharts(
//    document.querySelector('#chart-server'),
//    serverChartOptions
//  );
//  apexServerChart.render();

};


//----------------------------------------
// Failure Symptom Case - World Map chart
//----------------------------------------
var handleRenderMap = function() {
	var gdpData = { "AF": 16.63, "AL": 11.58, "DZ": 158.97, "AO": 85.81, "AG": 1.1, "AR": 351.02, "AM": 8.83, "AU": 1219.72, "AT": 366.26, "AZ": 52.17, "BS": 7.54, "BH": 21.73, "BD": 105.4, "BB": 3.96, "BY": 52.89, "BE": 461.33, "BZ": 1.43, "BJ": 6.49, "BT": 1.4, "BO": 19.18, "BA": 16.2, "BW": 12.5, "BR": 2023.53, "BN": 11.96, "BG": 44.84, "BF": 8.67, "BI": 1.47, "KH": 11.36, "CM": 21.88, "CA": 1563.66, "CV": 1.57, "CF": 2.11, "TD": 7.59, "CL": 199.18, "CN": 5745.13, "CO": 283.11, "KM": 0.56, "CD": 12.6, "CG": 11.88, "CR": 35.02, "CI": 22.38, "HR": 59.92, "CY": 22.75, "CZ": 195.23, "DK": 304.56, "DJ": 1.14, "DM": 0.38, "DO": 50.87, "EC": 61.49, "EG": 216.83, "SV": 21.8, "GQ": 14.55, "ER": 2.25, "EE": 19.22, "ET": 30.94, "FJ": 3.15, "FI": 231.98, "FR": 2555.44, "GA": 12.56, "GM": 1.04, "GE": 11.23, "DE": 3305.9, "GH": 18.06, "GR": 305.01, "GD": 0.65, "GT": 40.77, "GN": 4.34, "GW": 0.83, "GY": 2.2, "HT": 6.5, "HN": 15.34, "HK": 226.49, "HU": 132.28, "IS": 12.77, "IN": 1430.02, "ID": 695.06, "IR": 337.9, "IQ": 84.14, "IE": 204.14, "IL": 201.25, "IT": 2036.69, "JM": 13.74, "JP": 5390.9, "JO": 27.13, "KZ": 129.76, "KE": 32.42, "KI": 0.15, "KR": 986.26, "UNDEFINED": 5.73, "KW": 117.32, "KG": 4.44, "LA": 6.34, "LV": 23.39, "LB": 39.15, "LS": 1.8, "LR": 0.98, "LY": 77.91, "LT": 35.73, "LU": 52.43, "MK": 9.58, "MG": 8.33, "MW": 5.04, "MY": 218.95, "MV": 1.43, "ML": 9.08, "MT": 7.8, "MR": 3.49, "MU": 9.43, "MX": 1004.04, "MD": 5.36, "MN": 5.81, "ME": 3.88, "MA": 91.7, "MZ": 10.21, "MM": 35.65, "NA": 11.45, "NP": 15.11, "NL": 770.31, "NZ": 138, "NI": 6.38, "NE": 5.6, "NG": 206.66, "NO": 413.51, "OM": 53.78, "PK": 174.79, "PA": 27.2, "PG": 8.81, "PY": 17.17, "PE": 153.55, "PH": 189.06, "PL": 438.88, "PT": 223.7, "QA": 126.52, "RO": 158.39, "RU": 1476.91, "RW": 5.69, "WS": 0.55, "ST": 0.19, "SA": 434.44, "SN": 12.66, "RS": 38.92, "SC": 0.92, "SL": 1.9, "SG": 217.38, "SK": 86.26, "SI": 46.44, "SB": 0.67, "ZA": 354.41, "ES": 1374.78, "LK": 48.24, "KN": 0.56, "LC": 1, "VC": 0.58, "SD": 65.93, "SR": 3.3, "SZ": 3.17, "SE": 444.59, "CH": 522.44, "SY": 59.63, "TW": 426.98, "TJ": 5.58, "TZ": 22.43, "TH": 312.61, "TL": 0.62, "TG": 3.07, "TO": 0.3, "TT": 21.2, "TN": 43.86, "TR": 729.05, "TM": 0, "UG": 17.12, "UA": 136.56, "AE": 239.65, "GB": 2258.57, "US": 14624.18, "UY": 40.71, "UZ": 37.72, "VU": 0.72, "VE": 285.21, "VN": 101.99, "YE": 30.02, "ZM": 15.69, "ZW": 5.57};
	$('#world-map').vectorMap({
		map: 'world_mill',
		normalizeFunction: 'polynomial',
		hoverOpacity: 0.5,
		hoverColor: false,
		zoomOnScroll: false,
		series: {
			regions: [{
				normalizeFunction: 'polynomial'
			}]
		},
		focusOn: {
			x: 0.5,
			y: 0.5,
			scale: 1
		},
		markerStyle: {
			initial: {
				fill: app.color.theme,
				stroke: 'none',
				"stroke-width": 1,
			}
		},
		regionStyle: {
			initial: {
				fill: app.color.white,
				"fill-opacity": 0.35,
				stroke: 'none',
				"stroke-width": 0.4,
				"stroke-opacity": 1
			},
			hover: {
				"fill-opacity": 0.5
			}
		},
		backgroundColor: 'transparent',
		markers: [
			{latLng: [41.90, 12.45], name: 'Vatican City'},
			{latLng: [43.73, 7.41], name: 'Monaco'},
			{latLng: [-0.52, 166.93], name: 'Nauru'},
			{latLng: [-8.51, 179.21], name: 'Tuvalu'},
			{latLng: [43.93, 12.46], name: 'San Marino'},
			{latLng: [47.14, 9.52], name: 'Liechtenstein'},
			{latLng: [7.11, 171.06], name: 'Marshall Islands'},
			{latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
			{latLng: [3.2, 73.22], name: 'Maldives'},
			{latLng: [35.88, 14.5], name: 'Malta'},
			{latLng: [12.05, -61.75], name: 'Grenada'},
			{latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
			{latLng: [13.16, -59.55], name: 'Barbados'},
			{latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
			{latLng: [-4.61, 55.45], name: 'Seychelles'},
			{latLng: [7.35, 134.46], name: 'Palau'},
			{latLng: [42.5, 1.51], name: 'Andorra'},
			{latLng: [14.01, -60.98], name: 'Saint Lucia'},
			{latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
			{latLng: [1.3, 103.8], name: 'Singapore'},
			{latLng: [1.46, 173.03], name: 'Kiribati'},
			{latLng: [-21.13, -175.2], name: 'Tonga'},
			{latLng: [15.3, -61.38], name: 'Dominica'},
			{latLng: [-20.2, 57.5], name: 'Mauritius'},
			{latLng: [26.02, 50.55], name: 'Bahrain'},
			{latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
		]
	});
}

//-----------------------------------------
// Failure Symptom Case - Korea Map chart
//-----------------------------------------
var handleRenderKoreaMap = function() {
	var gdpData = { "AF": 16.63, "AL": 11.58, "DZ": 158.97, "AO": 85.81, "AG": 1.1, "AR": 351.02, "AM": 8.83, "AU": 1219.72, "AT": 366.26, "AZ": 52.17, "BS": 7.54, "BH": 21.73, "BD": 105.4, "BB": 3.96, "BY": 52.89, "BE": 461.33, "BZ": 1.43, "BJ": 6.49, "BT": 1.4, "BO": 19.18, "BA": 16.2, "BW": 12.5, "BR": 2023.53, "BN": 11.96, "BG": 44.84, "BF": 8.67, "BI": 1.47, "KH": 11.36, "CM": 21.88, "CA": 1563.66, "CV": 1.57, "CF": 2.11, "TD": 7.59, "CL": 199.18, "CN": 5745.13, "CO": 283.11, "KM": 0.56, "CD": 12.6, "CG": 11.88, "CR": 35.02, "CI": 22.38, "HR": 59.92, "CY": 22.75, "CZ": 195.23, "DK": 304.56, "DJ": 1.14, "DM": 0.38, "DO": 50.87, "EC": 61.49, "EG": 216.83, "SV": 21.8, "GQ": 14.55, "ER": 2.25, "EE": 19.22, "ET": 30.94, "FJ": 3.15, "FI": 231.98, "FR": 2555.44, "GA": 12.56, "GM": 1.04, "GE": 11.23, "DE": 3305.9, "GH": 18.06, "GR": 305.01, "GD": 0.65, "GT": 40.77, "GN": 4.34, "GW": 0.83, "GY": 2.2, "HT": 6.5, "HN": 15.34, "HK": 226.49, "HU": 132.28, "IS": 12.77, "IN": 1430.02, "ID": 695.06, "IR": 337.9, "IQ": 84.14, "IE": 204.14, "IL": 201.25, "IT": 2036.69, "JM": 13.74, "JP": 5390.9, "JO": 27.13, "KZ": 129.76, "KE": 32.42, "KI": 0.15, "KR": 986.26, "UNDEFINED": 5.73, "KW": 117.32, "KG": 4.44, "LA": 6.34, "LV": 23.39, "LB": 39.15, "LS": 1.8, "LR": 0.98, "LY": 77.91, "LT": 35.73, "LU": 52.43, "MK": 9.58, "MG": 8.33, "MW": 5.04, "MY": 218.95, "MV": 1.43, "ML": 9.08, "MT": 7.8, "MR": 3.49, "MU": 9.43, "MX": 1004.04, "MD": 5.36, "MN": 5.81, "ME": 3.88, "MA": 91.7, "MZ": 10.21, "MM": 35.65, "NA": 11.45, "NP": 15.11, "NL": 770.31, "NZ": 138, "NI": 6.38, "NE": 5.6, "NG": 206.66, "NO": 413.51, "OM": 53.78, "PK": 174.79, "PA": 27.2, "PG": 8.81, "PY": 17.17, "PE": 153.55, "PH": 189.06, "PL": 438.88, "PT": 223.7, "QA": 126.52, "RO": 158.39, "RU": 1476.91, "RW": 5.69, "WS": 0.55, "ST": 0.19, "SA": 434.44, "SN": 12.66, "RS": 38.92, "SC": 0.92, "SL": 1.9, "SG": 217.38, "SK": 86.26, "SI": 46.44, "SB": 0.67, "ZA": 354.41, "ES": 1374.78, "LK": 48.24, "KN": 0.56, "LC": 1, "VC": 0.58, "SD": 65.93, "SR": 3.3, "SZ": 3.17, "SE": 444.59, "CH": 522.44, "SY": 59.63, "TW": 426.98, "TJ": 5.58, "TZ": 22.43, "TH": 312.61, "TL": 0.62, "TG": 3.07, "TO": 0.3, "TT": 21.2, "TN": 43.86, "TR": 729.05, "TM": 0, "UG": 17.12, "UA": 136.56, "AE": 239.65, "GB": 2258.57, "US": 14624.18, "UY": 40.71, "UZ": 37.72, "VU": 0.72, "VE": 285.21, "VN": 101.99, "YE": 30.02, "ZM": 15.69, "ZW": 5.57};
	$('#korea-map').vectorMap({
		map: 'kr_mill',
		normalizeFunction: 'polynomial',
		hoverOpacity: 0.5,
		hoverColor: true,
		zoomOnScroll: false,
		series: {
			regions: [{
				normalizeFunction: 'polynomial'
			}]
		},
		focusOn: {
			x: 0.5,
			y: 0.5,
			scale: 1
		},
		markerStyle: {
			initial: {
				fill: app.color.theme,
				stroke: 'none',
				"stroke-width": 2,
			}
		},
		regionStyle: {
			initial: {
				fill: app.color.white,
				"fill-opacity": 0.35,
				stroke: 'none',
				"stroke-width": 0.4,
				"stroke-opacity": 1
			},
			hover: {
				"fill-opacity": 0.5
			}
		},
		backgroundColor: 'transparent',
		markers: [
			{ latLng: [35.866669, 128.600006], name: 'DaeGu' },
			{ latLng: [36.351002, 127.385002], name: 'DaeJeon' },
		]
	});
}

//------------------------------------------
// Failure Symptom Case - Seongnam Map chart
//------------------------------------------
//var handleRenderSeongnamMap = function() {
//	var gdpData = { "AF": 16.63, "AL": 11.58, "DZ": 158.97, "AO": 85.81, "AG": 1.1, "AR": 351.02, "AM": 8.83, "AU": 1219.72, "AT": 366.26, "AZ": 52.17, "BS": 7.54, "BH": 21.73, "BD": 105.4, "BB": 3.96, "BY": 52.89, "BE": 461.33, "BZ": 1.43, "BJ": 6.49, "BT": 1.4, "BO": 19.18, "BA": 16.2, "BW": 12.5, "BR": 2023.53, "BN": 11.96, "BG": 44.84, "BF": 8.67, "BI": 1.47, "KH": 11.36, "CM": 21.88, "CA": 1563.66, "CV": 1.57, "CF": 2.11, "TD": 7.59, "CL": 199.18, "CN": 5745.13, "CO": 283.11, "KM": 0.56, "CD": 12.6, "CG": 11.88, "CR": 35.02, "CI": 22.38, "HR": 59.92, "CY": 22.75, "CZ": 195.23, "DK": 304.56, "DJ": 1.14, "DM": 0.38, "DO": 50.87, "EC": 61.49, "EG": 216.83, "SV": 21.8, "GQ": 14.55, "ER": 2.25, "EE": 19.22, "ET": 30.94, "FJ": 3.15, "FI": 231.98, "FR": 2555.44, "GA": 12.56, "GM": 1.04, "GE": 11.23, "DE": 3305.9, "GH": 18.06, "GR": 305.01, "GD": 0.65, "GT": 40.77, "GN": 4.34, "GW": 0.83, "GY": 2.2, "HT": 6.5, "HN": 15.34, "HK": 226.49, "HU": 132.28, "IS": 12.77, "IN": 1430.02, "ID": 695.06, "IR": 337.9, "IQ": 84.14, "IE": 204.14, "IL": 201.25, "IT": 2036.69, "JM": 13.74, "JP": 5390.9, "JO": 27.13, "KZ": 129.76, "KE": 32.42, "KI": 0.15, "KR": 986.26, "UNDEFINED": 5.73, "KW": 117.32, "KG": 4.44, "LA": 6.34, "LV": 23.39, "LB": 39.15, "LS": 1.8, "LR": 0.98, "LY": 77.91, "LT": 35.73, "LU": 52.43, "MK": 9.58, "MG": 8.33, "MW": 5.04, "MY": 218.95, "MV": 1.43, "ML": 9.08, "MT": 7.8, "MR": 3.49, "MU": 9.43, "MX": 1004.04, "MD": 5.36, "MN": 5.81, "ME": 3.88, "MA": 91.7, "MZ": 10.21, "MM": 35.65, "NA": 11.45, "NP": 15.11, "NL": 770.31, "NZ": 138, "NI": 6.38, "NE": 5.6, "NG": 206.66, "NO": 413.51, "OM": 53.78, "PK": 174.79, "PA": 27.2, "PG": 8.81, "PY": 17.17, "PE": 153.55, "PH": 189.06, "PL": 438.88, "PT": 223.7, "QA": 126.52, "RO": 158.39, "RU": 1476.91, "RW": 5.69, "WS": 0.55, "ST": 0.19, "SA": 434.44, "SN": 12.66, "RS": 38.92, "SC": 0.92, "SL": 1.9, "SG": 217.38, "SK": 86.26, "SI": 46.44, "SB": 0.67, "ZA": 354.41, "ES": 1374.78, "LK": 48.24, "KN": 0.56, "LC": 1, "VC": 0.58, "SD": 65.93, "SR": 3.3, "SZ": 3.17, "SE": 444.59, "CH": 522.44, "SY": 59.63, "TW": 426.98, "TJ": 5.58, "TZ": 22.43, "TH": 312.61, "TL": 0.62, "TG": 3.07, "TO": 0.3, "TT": 21.2, "TN": 43.86, "TR": 729.05, "TM": 0, "UG": 17.12, "UA": 136.56, "AE": 239.65, "GB": 2258.57, "US": 14624.18, "UY": 40.71, "UZ": 37.72, "VU": 0.72, "VE": 285.21, "VN": 101.99, "YE": 30.02, "ZM": 15.69, "ZW": 5.57};
//	$('#seongnamMap').vectorMap({
//		map: 'sn_mill',
//		normalizeFunction: 'polynomial',
//		hoverOpacity: 0.5,
//		hoverColor: false,
//		zoomOnScroll: false,
//		series: {
//			regions: [{
//				normalizeFunction: 'polynomial'
//			}]
//		},
//		focusOn: {
//			x: 0.5,
//			y: 0.5,
//			scale: 1
//		},
//		markerStyle: {
//			initial: {
//				fill: app.color.theme,
//				stroke: 'none',
//				"stroke-width": 2,
//			}
//		},
//		regionStyle: {
//			initial: {
//				fill: app.color.white,
//				"fill-opacity": 0.35,
//				stroke: 'none',
//				"stroke-width": 0.4,
//				"stroke-opacity": 1
//			},
//			hover: {
//				"fill-opacity": 0.5
//			}
//		},
//		backgroundColor: 'transparent',
//		markers: [
//			{latLng: [41.90, 12.45], name: 'Vatican City'},
//			{latLng: [43.73, 7.41], name: 'Monaco'},
//			{latLng: [-0.52, 166.93], name: 'Nauru'},
//			{latLng: [-8.51, 179.21], name: 'Tuvalu'},
//			{latLng: [43.93, 12.46], name: 'San Marino'},
//			{latLng: [47.14, 9.52], name: 'Liechtenstein'},
//			{latLng: [7.11, 171.06], name: 'Marshall Islands'},
//			{latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
//			{latLng: [3.2, 73.22], name: 'Maldives'},
//			{latLng: [35.88, 14.5], name: 'Malta'},
//			{latLng: [12.05, -61.75], name: 'Grenada'},
//			{latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
//			{latLng: [13.16, -59.55], name: 'Barbados'},
//			{latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
//			{latLng: [-4.61, 55.45], name: 'Seychelles'},
//			{latLng: [7.35, 134.46], name: 'Palau'},
//			{latLng: [42.5, 1.51], name: 'Andorra'},
//			{latLng: [14.01, -60.98], name: 'Saint Lucia'},
//			{latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
//			{latLng: [1.3, 103.8], name: 'Singapore'},
//			{latLng: [1.46, 173.03], name: 'Kiribati'},
//			{latLng: [-21.13, -175.2], name: 'Tonga'},
//			{latLng: [15.3, -61.38], name: 'Dominica'},
//			{latLng: [-20.2, 57.5], name: 'Mauritius'},
//			{latLng: [26.02, 50.55], name: 'Bahrain'},
//			{latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
//		]
//	});
//}








/* Controller
------------------------------------------------ */
$(document).ready(function() {
	handleRenderChart();
	handleRenderMap();
	handleRenderKoreaMap();
	//handleRenderSeongnamMap();
	//seongnamMap(worldMapData, seongnamNetwork);

	document.addEventListener('theme-reload', function() {
	$('[data-render="apexchart"], #apexRadarChart #world-map #korea-map ').empty();
		handleRenderChart();
		handleRenderMap();
		handleRenderKoreaMap();
		//handleRenderSeongnamMap();
		//seongnamMap(worldMapData, seongnamNetwork);
	});
});