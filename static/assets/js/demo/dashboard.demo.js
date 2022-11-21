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
//
//      chartPlotOptions = {
//        bar: {
//          horizontal: false,
//          columnWidth: "65%",
//          endingShape: "rounded",
//        },
//      };
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
   var barValue = []
   var barName = []
    for (var i = 0; i < a.barChartDataList.length; i++){
        barValue.push(JSON.stringify(a.barChartDataList[i]['value']))
        barName.push(a.barChartDataList[i]['name']);
    };

var apexColumnChartOptions = {
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
			data: barValue
		}],
		grid: {
			show: true
		},
		xaxis: {
			categories: barName,
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
				show: true
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

//   var lineName = []
//   var lineValue = []
//   var lineDate = []
//    for (var i = 0; i < a.lineChartDataList.length; i++){
//        lineValue.push(a.lineChartDataList[i]['value']);
//        lineName.push(a.lineChartDataList[i]['name']);
//        lineDate.push(a.lineChartDataList[i]['date'])
//    };



//var lineDataGrouping = a.lineChartDataList.reduce(function(result, current){
//    result[current.name] = result[current.name] || [];
//    result[current.name].push(current);
//    return result;
//}, {});
//var lineOnlyName = []
//    for (var i = 0; i < lineDataGrouping.length; i++){
//            lineOnlyName.push(lineDataGrouping[i]['name']);
//    };

//var lineOnlyName = Object.keys(lineDataGrouping)
//var lineOnlyValue = Object.values(lineDataGrouping)
//
//var lineSeries = []
//    for (var i = 0; i < lineOnlyName.length; i++){
//            lineSeries.push({'name': lineOnlyName[i]});
//    };
//
//var linesss = []





//lineSeries = [

//{name: 'Desktop',data: [10, 5, 6, 8, 5]}, {name: 'Notebook',data: [5, 6, 2, 8, 5]}
//
//]
var apexLineChartOptions = {
		chart: {
			height: 120,
			type: 'line',
			toolbar: {
				show: false
			}
		},
		/*colors: ['rgba(' + app.color.themeRgb + ', .37)', 'rgba(' + app.color.themeRgb + ', .57)', 'rgba(' + app.color.themeRgb + ', .77)', 'rgba(' + app.color.themeRgb + ', .98)'],*/
        /*colors: ["#ff9f0c", "#d08412", "#a16916", "#71501c", "#41341f"],*/
        /*colors: ["#FFB573", "#DB674B", "#FF8811", "#EDAD09"],*/
        colors: ["#ff9f0c", "#d08412", "#a16916", "#71501c"],
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
		series: a.lineChartDataList[0].data,
		markers: {
			size: 1,
		},
		xaxis: {
			categories: a.lineChartDataList[0].date,
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
			}
		},
		tooltip: {
			theme: 'dark',
			x: {
				show: true
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
	var apexLineChart = new ApexCharts(
		document.querySelector('#apexLineChart'),
		apexLineChartOptions
	);
	apexLineChart.render();



//----------------------------------------
// Asset Count By Day Item - pie chart
//---------------------------------------

   var pieValue = []
   var pieName = []
    for (var i = 0; i < a.pieChartDataList.length; i++){
        pieValue.push(a.pieChartDataList[i]['value']);
        pieName.push(a.pieChartDataList[i]['name']);
    };

var apexPieChartOptions = {
		chart: {
			height: 150,
			type: 'pie',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: -8
				}
			}
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
		legend: {
			show: false,
		},
		colors: ['rgba(' + app.color.themeRgb + ', .57)', 'rgba(' + app.color.themeRgb + ', .77)', 'rgba(' + app.color.themeRgb + ', .98)'],
		labels: pieName,
		series: pieValue,
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
	var apexPieChart = new ApexCharts(
		document.querySelector('#apexPieChart'),
		apexPieChartOptions
	);
	apexPieChart.render();



//---------------------------------------
// Install Application Top5 - donut chart
//---------------------------------------
   var donutValue = []
   var donutName = []
    for (var i = 0; i < a.donutChartDataList.length; i++){
        donutValue.push(a.donutChartDataList[i]['value']);
        donutName.push(a.donutChartDataList[i]['name']);
    };
var apexDonutChartOptions = {
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
				return [val.toFixed(1) + '%']
			},
            style: {
                fontSize: '12px',
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
		legend: {
			show: false,
		},
		colors: ['rgba(' + app.color.themeRgb + ', .57)', 'rgba(' + app.color.themeRgb + ', .77)', 'rgba(' + app.color.themeRgb + ', .98)'],
		labels: donutName,
		series: donutValue,
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
	var apexDonutChart = new ApexCharts(
		document.querySelector('#apexDonutChart'),
		apexDonutChartOptions
	);
	apexDonutChart.render();


//----------------------------------------
// Failure Symptom Case - raider chart
//---------------------------------------\
	group = [];
	var radar_list = [];
	var category_list = [];
	
	for (var i = 0; i < 5; i++) {
		group.push(a.AssociationDataList.nodeDataList[i].group);
	}

	for (var i = 0; i < group.length; i++){
		list = [];
		alarm_list = [];
		var name;
		for (var j = 0; j < a.AssociationDataList.nodeDataList.length; j++){
			if (a.AssociationDataList.nodeDataList[j].group == group[i]) {
				if (a.AssociationDataList.nodeDataList[j].alarmCase == 'No Login History') {
					list[0] = parseInt(a.AssociationDataList.nodeDataList[j].alarmCount);
					alarm_list[0] = a.AssociationDataList.nodeDataList[j].alarmCase;
				} else {
					if (a.AssociationDataList.nodeDataList[j].alarmCase == 'Drive Size No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Listen Port No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == "Established Port No Change" ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'RAM Usage Exceeded' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'CPU Consumption is Excess' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Running Process is Exceeded') {
					} else {
						list[0] = parseInt(0);
						alarm_list[0] = a.AssociationDataList.nodeDataList[j].alarmCase;
					}
				}
				if (a.AssociationDataList.nodeDataList[j].alarmCase == 'Drive Size No Change') {
					list[1] = parseInt(a.AssociationDataList.nodeDataList[j].alarmCount);
					alarm_list[1] = a.AssociationDataList.nodeDataList[j].alarmCase;
				} else {
					if (a.AssociationDataList.nodeDataList[j].alarmCase == 'No Login History' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Listen Port No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == "Established Port No Change" ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'RAM Usage Exceeded' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'CPU Consumption is Excess' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Running Process is Exceeded') {
					} else {
						list[1] = parseInt(0);
						alarm_list[1] = a.AssociationDataList.nodeDataList[j].alarmCase;
					}
				}
				if (a.AssociationDataList.nodeDataList[j].alarmCase == 'Listen Port No Change') {
					list[2] = parseInt(a.AssociationDataList.nodeDataList[j].alarmCount);
					alarm_list[2] = a.AssociationDataList.nodeDataList[j].alarmCase;
				} else {
					if (a.AssociationDataList.nodeDataList[j].alarmCase == 'Drive Size No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'No Login History' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == "Established Port No Change" ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'RAM Usage Exceeded' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'CPU Consumption is Excess' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Running Process is Exceeded') {
					} else {
						list[2] = parseInt(0);
						alarm_list[2] = a.AssociationDataList.nodeDataList[j].alarmCase;
					}
				}
				if (a.AssociationDataList.nodeDataList[j].alarmCase == "Established Port No Change") {
					list[3] = parseInt(a.AssociationDataList.nodeDataList[j].alarmCount);
					alarm_list[3] = a.AssociationDataList.nodeDataList[j].alarmCase;
				} else {
					if (a.AssociationDataList.nodeDataList[j].alarmCase == 'Drive Size No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Listen Port No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'No Login History' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'RAM Usage Exceeded' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'CPU Consumption is Excess' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Running Process is Exceeded') {
					} else {
						list[3] = parseInt(0);
						alarm_list[3] = a.AssociationDataList.nodeDataList[j].alarmCase;
					}
				}
				if (a.AssociationDataList.nodeDataList[j].alarmCase == 'RAM Usage Exceeded' ) {
					list[4] = parseInt(a.AssociationDataList.nodeDataList[j].alarmCount);
					alarm_list[4] = a.AssociationDataList.nodeDataList[j].alarmCase;
				} else {
					if (a.AssociationDataList.nodeDataList[j].alarmCase == 'Drive Size No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Listen Port No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == "Established Port No Change" ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'No Login History' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'CPU Consumption is Excess' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Running Process is Exceeded') {
					} else {
						list[4] = parseInt(0);
						alarm_list[4] = a.AssociationDataList.nodeDataList[j].alarmCase;
					}
				}
				if (a.AssociationDataList.nodeDataList[j].alarmCase == 'CPU Consumption is Excess') {
					list[5] = parseInt(a.AssociationDataList.nodeDataList[j].alarmCount);
					alarm_list[5] = a.AssociationDataList.nodeDataList[j].alarmCase;
				} else {
					if (a.AssociationDataList.nodeDataList[j].alarmCase == 'Drive Size No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Listen Port No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == "Established Port No Change" ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'RAM Usage Exceeded' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'No Login History' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Running Process is Exceeded') {
					} else {
						list[5] = parseInt(0);
						alarm_list[5] = a.AssociationDataList.nodeDataList[j].alarmCase;
					}
				}
				if (a.AssociationDataList.nodeDataList[j].alarmCase == 'Running Process is Exceeded') {
					list[6] = parseInt(a.AssociationDataList.nodeDataList[j].alarmCount);
					alarm_list[6] = a.AssociationDataList.nodeDataList[j].alarmCase;
				} else {
					if (a.AssociationDataList.nodeDataList[j].alarmCase == 'Drive Size No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'Listen Port No Change' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == "Established Port No Change" ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'RAM Usage Exceeded' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'CPU Consumption is Excess' ||
						a.AssociationDataList.nodeDataList[j].alarmCase == 'No Login History') {
					} else {
						list[6] = parseInt(0);
						alarm_list[6] = a.AssociationDataList.nodeDataList[j].alarmCase;
					}
				}
				
          		name = group[i];
			}
		}
		
		var radar_dict = { "name" : name, "data" : list};
		radar_list.push(radar_dict);
	};
	category_list.push(radar_list);

var apexRadarChartOptions = {
  chart: {
    width: "100%",
    height: 500,
    type: "radar",
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: undefined,
      options: {},
    },
  ],
  series: radar_list,
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    radar: {
      size: 170,
      polygons: {
        strokeColors: "rgba(" + app.color.whiteRgb + ", .25)",
        strokeWidth: 1,
        connectorColors: "rgba(" + app.color.whiteRgb + ", .25)",
        fill: {
          colors: [
            "rgba(" + app.color.gray300Rgb + ", .25)",
            "rgba(" + app.color.whiteRgb + ", .25)",
          ],
        },
      },
    },
  },
  colors: ["#ff9f0c", "#d08412", "#a16916", "#71501c", "#41341f"],
  markers: {
    size: 2,
    colors: ["#ff9f0c", "#d08412", "#a16916", "#71501c", "#41341f"],
    strokeColor: ["#ff9f0c", "#d08412", "#a16916", "#71501c", "#41341f"],
    strokeWidth: 1,
  },
  tooltip: {
    theme: "dark",
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
    },
  },
  xaxis: {
    categories: [
      ["No Login History"],
      ["Drive", "Size", "No Change"],
      ["Listen", "Port", "No Change"],
      ["Established", "Port", "No Change"],
      ["RAM", "Usage", "Exceeded"],
      ["CPU", "Usage", "Exceeded"],
      ["Running", "Process", "Exceeded"],
    ],
    labels: {
      show: true,
      rotate: 0,
      style: {
        colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
        fontSize: "10px",
        cssClass: "apexcharts-xaxis-label",
      },
    },
  },
  yaxis: {
    tickAmount: 7,
    labels: {
      formatter: function (val, i) {
        if (i % 1 === 0) {
          return val;
		} else {
          return "";
        }
      },
    },
  },
};
	var apexRadarChart = new ApexCharts(
		document.querySelector('#apexRadarChart'),
		apexRadarChartOptions
	);
	apexRadarChart.render();



//----------------------------------------
// Failure Symptom Case - RAM Usage Exceeded - donut Achart
//---------------------------------------
	list = [];
	alarm_list = []
  for (var i = 0; i < a.minidonutData.length; i++) {
    if (a.minidonutData[i].name == "RAM Usage Exceeded") {
      list.push(parseInt(a.minidonutData[i].value));
      alarm_list.push(a.minidonutData[i].ip);
    }
  }
    var apexDonutChartOptions = {
        chart: {
                height: 300,
                type: 'donut',
            },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: 1
                }
            }
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
//            dropShadow: {
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
        title: {
            text: 'RAM 사용량 60% 초과',
            align: 'left',
        },
        legend: {
            show: true,
            position: "bottom",
            width: '100%',
            height: 113,
            horizontalAlign: 'left',
            formatter: (value, opts) => {
                return '<span class="chartBorder">' + value + '<span class="chartLegend">' + opts.w.globals.series[opts.seriesIndex] + '</span>' + '</span>';
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
        colors: ['rgba(' + app.color.themeRgb + ', 1)', 'rgba(' + app.color.themeRgb + ', .8)', 'rgba(' + app.color.themeRgb + ', .6)', 'rgba(' + app.color.themeRgb + ', .4)', 'rgba(' + app.color.themeRgb + ', .2)'],
        labels: alarm_list,
        series: list,
        tooltip: {
            theme: 'dark',
            x: {
                show: false
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
        };

        var apexDonutChart = new ApexCharts(
            document.querySelector('#apexDonutFailureAChart'),
            apexDonutChartOptions
        );
        apexDonutChart.render();

//----------------------------------------
// Failure Symptom Case - CPU Consumption is Excess - donut Bchart
//---------------------------------------
    list = [];
    alarm_list = [];
  for (var i = 0; i < a.minidonutData.length; i++) {
    if (a.minidonutData[i].name == "CPU Consumption is Excess") {
      list.push(parseInt(a.minidonutData[i].value));
      alarm_list.push(a.minidonutData[i].ip);
    }
  }
	var apexDonutChartOptions = {
		chart: {
			height: 300,
			type: 'donut',
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: 1
				}
			}
		},
		title: {
			text: 'CPU 사용량 60% 초과',
			align: 'left',
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
		legend: {
			show: true,
			position: "bottom",
			width : '100%',
			height: 113,
			horizontalAlign: 'left',
			floating: false,
			formatter: (value, opts) => {
				return value + '<span class="chartLegend">' + opts.w.globals.series[opts.seriesIndex] + '</span>';
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
		colors: ['rgba(' + app.color.themeRgb + ', 1)', 'rgba(' + app.color.themeRgb + ', .8)', 'rgba(' + app.color.themeRgb + ', .6)', 'rgba(' + app.color.themeRgb + ', .4)', 'rgba(' + app.color.themeRgb + ', .2)'],
		labels: alarm_list,
		series: list,
		tooltip: {
			theme: 'dark',
			x: {
				show: false
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
	};
	var apexDonutChart = new ApexCharts(
		document.querySelector('#apexDonutFailureBChart'),
		apexDonutChartOptions
	);
	apexDonutChart.render();



//----------------------------------------
// Failure Symptom Case - donut Cchart
//---------------------------------------


group=[];
value=[];
pertage=[]
for (var i=0; i < a.TotalTopDataList.nodeDataList.length; i++){
    group.push(a.TotalTopDataList.nodeDataList[i].group);
    value.push(parseInt(a.TotalTopDataList.nodeDataList[i].alarmCount));
    pertage.push(parseInt(a.TotalTopDataList.nodeDataList[i].totalPertage));
}
	var apexDonutChartOptions = {
		chart: {
			height: 115,
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
//			formatter(val, value) {
//				const name = value.w.globals.labels[value.seriesIndex]
//				return [name, val.toFixed(1) + '%']
//			},
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
			position: "right",
			width : "100%",
			height: 100,
			horizontalAlign: 'right',
			floating: false,
			/* formatter: (value, opts) => {
				return value + '<span class="chartLegend">' + opts.w.globals.series[opts.seriesIndex] + '</span>';
			}, */
			formatter: (value, opts) => {
                return '<span class="chartBorder">' + value + '<span class="chartLegend">' + opts.w.globals.series[opts.seriesIndex] + '</span>' + '</span>';
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

		colors: ['rgba(' + app.color.themeRgb + ', 1)', 'rgba(' + app.color.themeRgb + ', .8)', 'rgba(' + app.color.themeRgb + ', .6)', 'rgba(' + app.color.themeRgb + ', .4)', 'rgba(' + app.color.themeRgb + ', .2)'],
		labels: group,
		series: value,
		tooltip: {
			theme: 'dark',
			x: {
				show: false
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
	var apexDonutChart = new ApexCharts(
		document.querySelector('#apexDonutFailureCChart'),
		apexDonutChartOptions
	);
	apexDonutChart.render();




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
//var handleRenderMap = function(worldMapData) {
//	var gdpData = { "AF": 16.63, "AL": 11.58, "DZ": 158.97, "AO": 85.81, "AG": 1.1, "AR": 351.02, "AM": 8.83, "AU": 1219.72, "AT": 366.26, "AZ": 52.17, "BS": 7.54, "BH": 21.73, "BD": 105.4, "BB": 3.96, "BY": 52.89, "BE": 461.33, "BZ": 1.43, "BJ": 6.49, "BT": 1.4, "BO": 19.18, "BA": 16.2, "BW": 12.5, "BR": 2023.53, "BN": 11.96, "BG": 44.84, "BF": 8.67, "BI": 1.47, "KH": 11.36, "CM": 21.88, "CA": 1563.66, "CV": 1.57, "CF": 2.11, "TD": 7.59, "CL": 199.18, "CN": 5745.13, "CO": 283.11, "KM": 0.56, "CD": 12.6, "CG": 11.88, "CR": 35.02, "CI": 22.38, "HR": 59.92, "CY": 22.75, "CZ": 195.23, "DK": 304.56, "DJ": 1.14, "DM": 0.38, "DO": 50.87, "EC": 61.49, "EG": 216.83, "SV": 21.8, "GQ": 14.55, "ER": 2.25, "EE": 19.22, "ET": 30.94, "FJ": 3.15, "FI": 231.98, "FR": 2555.44, "GA": 12.56, "GM": 1.04, "GE": 11.23, "DE": 3305.9, "GH": 18.06, "GR": 305.01, "GD": 0.65, "GT": 40.77, "GN": 4.34, "GW": 0.83, "GY": 2.2, "HT": 6.5, "HN": 15.34, "HK": 226.49, "HU": 132.28, "IS": 12.77, "IN": 1430.02, "ID": 695.06, "IR": 337.9, "IQ": 84.14, "IE": 204.14, "IL": 201.25, "IT": 2036.69, "JM": 13.74, "JP": 5390.9, "JO": 27.13, "KZ": 129.76, "KE": 32.42, "KI": 0.15, "KR": 986.26, "UNDEFINED": 5.73, "KW": 117.32, "KG": 4.44, "LA": 6.34, "LV": 23.39, "LB": 39.15, "LS": 1.8, "LR": 0.98, "LY": 77.91, "LT": 35.73, "LU": 52.43, "MK": 9.58, "MG": 8.33, "MW": 5.04, "MY": 218.95, "MV": 1.43, "ML": 9.08, "MT": 7.8, "MR": 3.49, "MU": 9.43, "MX": 1004.04, "MD": 5.36, "MN": 5.81, "ME": 3.88, "MA": 91.7, "MZ": 10.21, "MM": 35.65, "NA": 11.45, "NP": 15.11, "NL": 770.31, "NZ": 138, "NI": 6.38, "NE": 5.6, "NG": 206.66, "NO": 413.51, "OM": 53.78, "PK": 174.79, "PA": 27.2, "PG": 8.81, "PY": 17.17, "PE": 153.55, "PH": 189.06, "PL": 438.88, "PT": 223.7, "QA": 126.52, "RO": 158.39, "RU": 1476.91, "RW": 5.69, "WS": 0.55, "ST": 0.19, "SA": 434.44, "SN": 12.66, "RS": 38.92, "SC": 0.92, "SL": 1.9, "SG": 217.38, "SK": 86.26, "SI": 46.44, "SB": 0.67, "ZA": 354.41, "ES": 1374.78, "LK": 48.24, "KN": 0.56, "LC": 1, "VC": 0.58, "SD": 65.93, "SR": 3.3, "SZ": 3.17, "SE": 444.59, "CH": 522.44, "SY": 59.63, "TW": 426.98, "TJ": 5.58, "TZ": 22.43, "TH": 312.61, "TL": 0.62, "TG": 3.07, "TO": 0.3, "TT": 21.2, "TN": 43.86, "TR": 729.05, "TM": 0, "UG": 17.12, "UA": 136.56, "AE": 239.65, "GB": 2258.57, "US": 14624.18, "UY": 40.71, "UZ": 37.72, "VU": 0.72, "VE": 285.21, "VN": 101.99, "YE": 30.02, "ZM": 15.69, "ZW": 5.57};
//	$('#world-map').vectorMap({
//		map: 'world_mill',
//		normalizeFunction: 'polynomial',
//		hoverOpacity: 0.5,
//		hoverColor: true,
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
//		markers:
//		    worldMapData
//	});
//}













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














//-----------------------------------------
// Failure Symptom Case - Korea Map chart
//-----------------------------------------
//var handleRenderKoreaMap = function(worldMapData) {
//	var gdpData2 = { "AF": 16.63, "AL": 11.58, "DZ": 158.97, "AO": 85.81, "AG": 1.1, "AR": 351.02, "AM": 8.83, "AU": 1219.72, "AT": 366.26, "AZ": 52.17, "BS": 7.54, "BH": 21.73, "BD": 105.4, "BB": 3.96, "BY": 52.89, "BE": 461.33, "BZ": 1.43, "BJ": 6.49, "BT": 1.4, "BO": 19.18, "BA": 16.2, "BW": 12.5, "BR": 2023.53, "BN": 11.96, "BG": 44.84, "BF": 8.67, "BI": 1.47, "KH": 11.36, "CM": 21.88, "CA": 1563.66, "CV": 1.57, "CF": 2.11, "TD": 7.59, "CL": 199.18, "CN": 5745.13, "CO": 283.11, "KM": 0.56, "CD": 12.6, "CG": 11.88, "CR": 35.02, "CI": 22.38, "HR": 59.92, "CY": 22.75, "CZ": 195.23, "DK": 304.56, "DJ": 1.14, "DM": 0.38, "DO": 50.87, "EC": 61.49, "EG": 216.83, "SV": 21.8, "GQ": 14.55, "ER": 2.25, "EE": 19.22, "ET": 30.94, "FJ": 3.15, "FI": 231.98, "FR": 2555.44, "GA": 12.56, "GM": 1.04, "GE": 11.23, "DE": 3305.9, "GH": 18.06, "GR": 305.01, "GD": 0.65, "GT": 40.77, "GN": 4.34, "GW": 0.83, "GY": 2.2, "HT": 6.5, "HN": 15.34, "HK": 226.49, "HU": 132.28, "IS": 12.77, "IN": 1430.02, "ID": 695.06, "IR": 337.9, "IQ": 84.14, "IE": 204.14, "IL": 201.25, "IT": 2036.69, "JM": 13.74, "JP": 5390.9, "JO": 27.13, "KZ": 129.76, "KE": 32.42, "KI": 0.15, "KR": 986.26, "UNDEFINED": 5.73, "KW": 117.32, "KG": 4.44, "LA": 6.34, "LV": 23.39, "LB": 39.15, "LS": 1.8, "LR": 0.98, "LY": 77.91, "LT": 35.73, "LU": 52.43, "MK": 9.58, "MG": 8.33, "MW": 5.04, "MY": 218.95, "MV": 1.43, "ML": 9.08, "MT": 7.8, "MR": 3.49, "MU": 9.43, "MX": 1004.04, "MD": 5.36, "MN": 5.81, "ME": 3.88, "MA": 91.7, "MZ": 10.21, "MM": 35.65, "NA": 11.45, "NP": 15.11, "NL": 770.31, "NZ": 138, "NI": 6.38, "NE": 5.6, "NG": 206.66, "NO": 413.51, "OM": 53.78, "PK": 174.79, "PA": 27.2, "PG": 8.81, "PY": 17.17, "PE": 153.55, "PH": 189.06, "PL": 438.88, "PT": 223.7, "QA": 126.52, "RO": 158.39, "RU": 1476.91, "RW": 5.69, "WS": 0.55, "ST": 0.19, "SA": 434.44, "SN": 12.66, "RS": 38.92, "SC": 0.92, "SL": 1.9, "SG": 217.38, "SK": 86.26, "SI": 46.44, "SB": 0.67, "ZA": 354.41, "ES": 1374.78, "LK": 48.24, "KN": 0.56, "LC": 1, "VC": 0.58, "SD": 65.93, "SR": 3.3, "SZ": 3.17, "SE": 444.59, "CH": 522.44, "SY": 59.63, "TW": 426.98, "TJ": 5.58, "TZ": 22.43, "TH": 312.61, "TL": 0.62, "TG": 3.07, "TO": 0.3, "TT": 21.2, "TN": 43.86, "TR": 729.05, "TM": 0, "UG": 17.12, "UA": 136.56, "AE": 239.65, "GB": 2258.57, "US": 14624.18, "UY": 40.71, "UZ": 37.72, "VU": 0.72, "VE": 285.21, "VN": 101.99, "YE": 30.02, "ZM": 15.69, "ZW": 5.57};
//	$('#korea-map').vectorMap({
//		map: 'kr_mill',
//		normalizeFunction: 'polynomial',
//		hoverOpacity: 0.5,
//		hoverColor: true,
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
//		markers:
//            worldMapData
//	});
//
//
//
//
//
//}





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
	handleRenderChart();
//	handleRenderMap(worldMapData);
    worldMap(worldMapData);
//	handleRenderKoreaMap(worldMapData);
    koreaMap(worldMapData);
	//handleRenderSeongnamMap();
	seongnamMap(worldMapData);
    seoulMap(worldMapData);
	document.addEventListener('theme-reload', function() {
	$('[data-render="apexchart"], #apexRadarChart #world-map #korea-map #seongnamMap').empty();
		handleRenderChart();
//		handleRenderMap(worldMapData);
		worldMap(worldMapData);
//		handleRenderKoreaMap(worldMapData);
		koreaMap(worldMapData);
		//handleRenderSeongnamMap();
		seongnamMap(worldMapData);
		seoulMap(worldMapData);
	});
});