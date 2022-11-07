/*
Template Name: HUD - Responsive Bootstrap 5 Admin Template
Version: 1.8.0
Author: Sean Ngu
Website: http://www.seantheme.com/hud/
*/

var handleRenderWeeklyApexChart = function () {
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
			borderColor: 'rgba(' + app.color.darkRgb + ', .25)',
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
				height: 1,
				offsetX: 0,
				offsetY: 0
			},
			labels: {
				style: {
					colors: app.color.gray300,
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
					colors: app.color.gray300,
					fontSize: '10px',
					fontFamily: app.font.family,
					fontWeight: app.font.weight,
					cssClass: 'apexcharts-xaxis-label',
				}
			}
		}
	};

	//weeklyChart_deviceAsset
	var weeklyDeviceAssetChartOptions = {
		chart: {
			width: '100%',
			height: 260,
			type: 'bar',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '70%',
				distributed: true,
				endingShape: 'rounded'

			},
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		/* 		legend: {
					show: true,
					position: 'left',
					width: '100%',
					height: 150,
					itemMargin: {
						horizontal: 0,
						vertical: 0
					},
					labels: {
						colors: '#000',
						fontSize: '9px'
					}
				}, */
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent']
		},
		colors: [app.color.orange],
		series: [{
			data: [10, 21, 10, 21, 5]
		}],
		grid: {
			show: true
		},
		xaxis: {
			categories: [
				'Virturl', 'Desktop', 'Notebook', 'Rack', 'Etc'
			],
			labels: {
				show: true,

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
		},
	};
	var weeklyDeviceAssetChart = new ApexCharts(
		document.querySelector('#weeklyChart_deviceAsset'),
		weeklyDeviceAssetChartOptions
	);
	weeklyDeviceAssetChart.render();


	//weeklyChart_actionAsset
	var weeklyActionAssetChartOptions = {
		chart: {
			width: '100%',
			height: 245,
			type: 'pie',

		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: -10
				},
			}
		},
		dataLabels: {
			enabled: true,
			dropShadow: {
				enabled: true,
				top: 0,
				left: 0,
				blur: 0,
				opacity: 0.5
			},
			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [name, val.toFixed(1) + '%']
			},
			style: {
				fontSize: '10px',
				colors: [app.color.white],
				fontWeight: 400
			},
		},
		/* 		stroke: {
					show: false
				}, */
		stroke: {
			show: true,
			curve: 'smooth',
			lineCap: 'butt',
			colors: app.color.white,
			width: 1,
			dashArray: 0,
		},
		legend: {
			show: true,
			position: 'bottom',
			width: '100%',
			height: 18,
			horizontalAlign: 'bottom',
			formatter: (value, opts) => {
				return '<span class="chartBorder">' + value + ':' + '<span class="chartLegend">' + opts.w.globals.series[opts.seriesIndex] + '</span>' + '</span>';
			},
			itemMargin: {
				horizontal: 0,
				vertical: 0
			},
			labels: {
				colors: '#000',
				fontSize: '9px'
			}
		},
		colors: ["#ff9f0c", "#d08412", "#a16916", "#71501c"],
		labels: ['Linux', 'Windows', 'Mac', 'Etc'],
		series: [30, 25, 13, 52],
		tooltip: {
			theme: 'dark',
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (val) {
						return '' + val + ":"

					}
				},
				formatter: (value) => { return '' + value },
			}
		}
	};
	var weeklyActionAssetChart = new ApexCharts(
		document.querySelector('#weeklyChart_actionAsset'),
		weeklyActionAssetChartOptions
	);
	weeklyActionAssetChart.render();


	//weeklyChart_completedAsset
	var weeklyCompletedAssetChartOptions = {
		chart: {
			width: '100%',
			height: 245,
			type: 'pie',

		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: -10
				}
			}
		},
		dataLabels: {
			enabled: true,
			dropShadow: {
				enabled: true,
				top: 0,
				left: 0,
				blur: 0,
				opacity: 0.5
			},
			formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [name, val.toFixed(1) + '%']
			},
			style: {
				fontSize: '10px',
				colors: [app.color.white],
				fontWeight: 400
			},
		},
		/* 		stroke: {
					show: false
				}, */
		stroke: {
			show: true,
			curve: 'smooth',
			lineCap: 'butt',
			colors: app.color.white,
			width: 1,
			dashArray: 0,
		},
		legend: {
			show: true,
			position: 'bottom',
			width: '100%',
			height: 18,
			horizontalAlign: 'bottom',
			formatter: (value, opts) => {
				return '<span class="chartBorder">' + value + ':' + '<span class="chartLegend">' + opts.w.globals.series[opts.seriesIndex] + '</span>' + '</span>';
			},
			itemMargin: {
				horizontal: 0,
				vertical: 0
			},
			labels: {
				colors: '#000',
				fontSize: '9px'
			}
		},
		colors: ["#ff9f0c", "#d08412", "#a16916", "#71501c"],
		labels: ['완료', '조치중', '미확인', '오탐지'],
		series: [10, 11, 3, 5],
		tooltip: {
			theme: 'dark',
			x: {
				show: false
			},
			y: {
				title: {
					formatter: function (val) {
						return '' + val + ":"

					}
				},
				formatter: (value) => { return '' + value },
			}
		}
	};
	var weeklyCompletedAssetChart = new ApexCharts(
		document.querySelector('#weeklyChart_completedAsset'),
		weeklyCompletedAssetChartOptions
	);
	weeklyCompletedAssetChart.render();


	//weeklyChart_usedCPU
	var weeklyUsedCPUChartOptions = {
		chart: {
			width: '100%',
			height: 250,
			type: 'bar',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '70%',
				distributed: true,
				endingShape: 'rounded'

			},
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent']
		},
		colors: [app.color.orange],
		series: [{
			data: [5, 10, 21, 10]
		}],
		grid: {
			show: true
		},
		xaxis: {
			categories: [
				'W-3', 'W-2', 'W-1', 'W'
			],
			labels: {
				show: true,
			}
		},
		yaxis: {
			labels: {
				show: true,
			},
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
		},
	};
	var weeklyUsedCPUChart = new ApexCharts(
		document.querySelector('#weeklyChart_usedCPU'),
		weeklyUsedCPUChartOptions
	);
	weeklyUsedCPUChart.render();


	//weeklyChart_usedMemory
	var weeklyUsedMemoryChartOptions = {
		chart: {
			width: '100%',
			height: 250,
			type: 'bar',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '70%',
				distributed: true,
				endingShape: 'rounded'

			},
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent']
		},
		colors: [app.color.orange],
		series: [{
			data: [5, 10, 21, 10]
		}],
		grid: {
			show: true
		},
		xaxis: {
			categories: [
				'W-3', 'W-2', 'W-1', 'W'
			],
			labels: {
				show: true,
			}
		},
		yaxis: {
			labels: {
				show: true,
			},
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
		},
	};
	var weeklyUsedMemoryChart = new ApexCharts(
		document.querySelector('#weeklyChart_usedMemory'),
		weeklyUsedMemoryChartOptions
	);
	weeklyUsedMemoryChart.render();


	//weeklyChart_usedDisk
	var weeklyUsedDiskChartOptions = {
		chart: {
			width: '100%',
			height: 250,
			type: 'bar',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '70%',
				distributed: true,
				endingShape: 'rounded'

			},
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent']
		},
		colors: [app.color.orange],
		series: [{
			data: [5, 10, 21, 10]
		}],
		grid: {
			show: true
		},
		xaxis: {
			categories: [
				'W-3', 'W-2', 'W-1', 'W'
			],
			labels: {
				show: true,
			}
		},
		yaxis: {
			labels: {
				show: true,
			},
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
		},
	};
	var weeklyUsedDiskChart = new ApexCharts(
		document.querySelector('#weeklyChart_usedDisk'),
		weeklyUsedDiskChartOptions
	);
	weeklyUsedDiskChart.render();


	//weeklyChart_usedSystem
	var weeklyUsedSystemChartOptions = {
		chart: {
			width: '100%',
			height: 250,
			type: 'bar',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '70%',
				distributed: true,
				endingShape: 'rounded'

			},
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent']
		},
		colors: [app.color.orange],
		series: [{
			data: [5, 10, 21, 10]
		}],
		grid: {
			show: true
		},
		xaxis: {
			categories: [
				'W-3', 'W-2', 'W-1', 'W'
			],
			labels: {
				show: true,
			}
		},
		yaxis: {
			labels: {
				show: true,
			},
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
		},
	};
	var weeklyUsedSystemChart = new ApexCharts(
		document.querySelector('#weeklyChart_usedSystem'),
		weeklyUsedSystemChartOptions
	);
	weeklyUsedSystemChart.render();


	//weeklyChart_usedSw1
	var weeklyUsedSw1ChartOptions = {
		chart: {
			width: '100%',
			height: 250,
			type: 'bar',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '70%',
				distributed: true,
				endingShape: 'rounded'

			},
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent']
		},
		colors: [app.color.orange],
		series: [{
			data: [5, 10, 21, 10]
		}],
		grid: {
			show: true
		},
		xaxis: {
			categories: [
				'W-3', 'W-2', 'W-1', 'W'
			],
			labels: {
				show: true,
			}
		},
		yaxis: {
			labels: {
				show: true,
			},
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
		},
	};
	var weeklyUsedSw1Chart = new ApexCharts(
		document.querySelector('#weeklyChart_usedSw1'),
		weeklyUsedSw1ChartOptions
	);
	weeklyUsedSw1Chart.render();


	//weeklyChart_usedSw2
	var weeklyUsedSw2ChartOptions = {
		chart: {
			width: '100%',
			height: 250,
			type: 'bar',
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '70%',
				distributed: true,
				endingShape: 'rounded'

			},
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent']
		},
		colors: [app.color.orange],
		series: [{
			data: [5, 10, 21, 10]
		}],
		grid: {
			show: true
		},
		xaxis: {
			categories: [
				'W-3', 'W-2', 'W-1', 'W'
			],
			labels: {
				show: true,
			}
		},
		yaxis: {
			labels: {
				show: true,
			},
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
		},
	};
	var weeklyUsedSw2Chart = new ApexCharts(
		document.querySelector('#weeklyChart_usedSw2'),
		weeklyUsedSw2ChartOptions
	);
	weeklyUsedSw2Chart.render();
};


/* Controller
------------------------------------------------ */
$(document).ready(function () {
	handleRenderWeeklyApexChart();

	$(document).on('theme-reload', function () {
		$('#weeklyChart_deviceAsset, #weeklyChart_actionAsset, #weeklyChart_completedAsset, #weeklyChart_usedCPU, #weeklyChart_usedMemory, #weeklyChart_usedDisk, #weeklyChart_usedSystem, #weeklyChart_usedSw1, #weeklyChart_usedSw2').empty();

		handleRenderWeeklyApexChart();
	});
});