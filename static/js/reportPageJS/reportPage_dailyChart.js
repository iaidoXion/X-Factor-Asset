/*
Template Name: HUD - Responsive Bootstrap 5 Admin Template
Version: 1.8.0
Author: Sean Ngu
Website: http://www.seantheme.com/hud/
*/

var handleRenderApexChart = function () {
	Apex = {
		title: {
			style: {
				fontSize: '14px',
				fontWeight: 'bold',
				fontFamily: app.font.family,
				color: app.color.white
			},
		},
		legend: {
			fontFamily: app.font.family,
			labels: {
				colors: app.color.black
			}
		},
		tooltip: {
			style: {
				fontSize: '10px',
				fontFamily: app.font.family
			}
		},
		grid: {
			borderColor: 'rgba(' + app.color.whiteRgb + ', .25)',
		},
		dataLabels: {
			style: {
				fontSize: '10px',
				fontFamily: app.font.family,
				fontWeight: 'bold',
				colors: undefined
			}
		},
		xaxis: {
			axisBorder: {
				show: true,
				color: 'rgba(' + app.color.whiteRgb + ', .25)',
				height: 1,
				width: '100%',
				offsetX: 0,
				offsetY: -1
			},
			axisTicks: {
				show: true,
				borderType: 'solid',
				color: 'rgba(' + app.color.whiteRgb + ', .25)',
				height: 6,
				offsetX: 0,
				offsetY: 0
			},
			labels: {
				style: {
					colors: app.color.white,
					fontSize: '10px',
					fontFamily: app.font.family,
					fontWeight: app.font.weight,
					cssClass: 'apexcharts-xaxis-label',
				}
			}
		},
		yaxis: {
			labels: {
				style: {
					colors: app.color.white,
					fontSize: '10px',
					fontFamily: app.font.family,
					fontWeight: app.font.weight,
					cssClass: 'apexcharts-xaxis-label',
				}
			}
		}
	};

	// apexRadialBarChart
	var dailyApexRadialBarChartOptions = {
		chart: {
			height: 250,
			type: 'radialBar',
		},
		plotOptions: {
			radialBar: {
				offsetX: 10,
				offsetY: 0,
				startAngle: 0,
				endAngle: 270,
				hollow: {
					margin: 5,
					size: '30%',
					background: 'transparent',
					image: undefined,
				},
				track: {
					background: app.color.gray100
				},
				dataLabels: {
					name: {
						show: false,

					},
					value: {
						show: false,
					}
				}
			}
		},
		colors: ["#ff9f0c", "#d08412", "#a16916", "#71501c"],
		series: [80, 70, 80, 90],
		labels: ['V3', 'Zabbix', 'ForeScout', 'McAfee'],
		tooltip: {
			enabled: true,
			enabledOnSeries: undefined,
			followCursor: true,
			theme: 'dark',
			x: {
				show: true
			},
			y: {
				title: {
					formatter: function (seriesName) {
						return '' + seriesName + ':'
					}
				},
				formatter: (value) => { return '' + value },
			},
			style: {
				fontSize: '9px',
				fontFamily: undefined,
			},
		},
		legend: {
			show: true,
			floating: true,
			position: 'left',
			offsetX: 0,
			offsetY: -20,
			labels: {
				useSeriesColors: true,
			},
			markers: {
				size: 0
			},
			/* 			formatter: function (seriesName, opts) {
							return seriesName
						}, */
			/* formatter: function (label, opts) {
				return label + " - " + opts.w.globals.series[opts.seriesIndex]
			}, */
			formatter: function (series, opts) {
				return series + ":  " + opts.w.globals.series[opts.seriesIndex]
			},
			itemMargin: {
				horizontal: 1,
				vertical: 1
			}
		}
	}
	var dailyApexRadialBarChart = new ApexCharts(
		document.querySelector('#dailyChartRadialBarChart'),
		dailyApexRadialBarChartOptions
	);
	dailyApexRadialBarChart.render();


	// apexRadarChart
	var dailyApexRadarChartOptions = {
		chart: {
			width: "100%",
			height: 260,
			type: 'radar',
			toolbar: {
				show: false
			}
		},
		series: [{
			name: 'No Login History',
			data: [10, 20, 30, 40, 50, 60],
		}, {
			name: 'Drive Size No Change',
			data: [5, 6, 7, 8, 9, 77],
		}, {
			name: 'Listen Port No Change',
			data: [11, 22, 33, 44, 55, 66],
		}, {
			name: 'Established Port No Change',
			data: [16, 17, 18, 19, 34, 2],
		}, {
			name: 'RAM Usage Exceeded',
			data: [51, 21, 34, 67, 9, 45],
		}, {
			name: 'CPU Usage Exceeded',
			data: [17, 78, 6, 7, 35, 8],
		}],
		dataLabels: {
			enabled: false
		},
		plotOptions: {
			radar: {
				size: 100,
				polygons: {
					strokeColors: 'rgba(' + app.color.whiteRgb + ', .25)',
					strokeWidth: 1,
					connectorColors: 'rgba(' + app.color.whiteRgb + ', .25)',
					fill: {
						colors: [
							'rgba(' + app.color.gray500Rgb + ', .25)',
							'rgba(' + app.color.whiteRgb + ', .25)'
						]
					},
				},
			},
		},
		colors: [
			"#ffb573", "#ff9f0c", "#d08412", "#a16916", "#71501c", "#41341f"
		],
		markers: {
			size: 2,
			colors: ["#ffb573", "#ff9f0c", "#d08412", "#a16916", "#71501c", "#41341f"],
			strokeColor: ["#ffb573", "#ff9f0c", "#d08412", "#a16916", "#71501c", "#41341f"],
			strokeWidth: 1,
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
		},
		xaxis: {
			categories: [
				['No Login History'],
				['Drive Size', 'No Change'],
				['Listen Port', 'No Change'],
				['Established Port No Change'],
				['RAM Usage', 'Exceeded'],
				['CPU Usage', 'Exceeded']
			],
			labels: {
				show: true,
				rotate: 0,
				style: {
					colors: ['#000', '#000', '#000', '#000', '#000', '#000'],
					fontSize: '10px',
					cssClass: 'apexcharts-xaxis-label',
				},
			}
		},
		yaxis: {
			tickAmount: 5,
			labels: {
				formatter: function (val, i) {
					if (i % 1 === 0) {
						return val
					} else {
						return '';
					}
				}
			},
			style: {
				colors: '#c00;'
			}
		},
		legend: {
			show: true,
			floating: false,
			position: 'right',
			/* offsetX: 10,
			offsetY: -20, */
			horizontalAlign: 'center',
			fontSize: '10px',
			itemMargin: {
				horizontal: 1,
				vertical: 1
			},
		}
	}
	var dailyApexRadarChart = new ApexCharts(
		document.querySelector('#dailyChartRadarChart'),
		dailyApexRadarChartOptions
	);
	dailyApexRadarChart.render();

};


/* Controller
------------------------------------------------ */
$(document).ready(function () {
	handleRenderApexChart();

	$(document).on('theme-reload', function () {
		$('#dailyChartRadialBarChart').empty();
		$('#dailyChartRadarChart').empty();

		handleRenderApexChart();
	});
});