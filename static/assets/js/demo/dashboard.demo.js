/*
Template Name: HUD - Responsive Bootstrap 5 Admin Template
Version: 1.8.0
Author: Sean Ngu
Website: http://www.seantheme.com/hud/
*/
//console.log(a); 
var randomNo = function() {
  return Math.floor(Math.random() * 60) + 30
};
value = ""
https: var handleRenderChart = function () {
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
        show: true,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
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
        show: true,
        color: "rgba(" + app.color.whiteRgb + ", .25)",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: -1,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "rgba(" + app.color.whiteRgb + ", .25)",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
          fontFamily: app.font.family,
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 20,
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
          fontFamily: app.font.family,
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
  };

  // small stat chart
  var x = 0;
  var chart = [];

  var elmList = [].slice.call(
    document.querySelectorAll('[data-render="apexchart"]')
  );
  elmList.map(function (elm) {
    var chartType = elm.getAttribute("data-type");
    var chartHeight = elm.getAttribute("data-height");
    var chartTitle = elm.getAttribute("data-title");
    var chartColors = [];
    var chartPlotOptions = {};
    var chartData = [];
    var chartStroke = {
      show: false,
    };
	  if (chartType == "bar") {
      BarValue = []
      for (x in a.barChartDataList) {
        dict = {
          'x': a.barChartDataList[x].name, 'y':a.barChartDataList[x].value
        };
        BarValue.push(dict);
      }
      console.log(BarValue);
      
      chartPlotOptions = {
        bar: {
          horizontal: false,
          columnWidth: "65%",
          endingShape: "rounded",
        },
      };
      console.log(BarValue);
      chartData = [
        {
          name: "",
          data: BarValue,
        },
      ];
      Label = {
        enabled: false,
      },
      chartColors = [
        "rgba(" + app.color.themeRgb + ", .55)",
        "rgba(" + app.color.themeRgb + ", .35)",
        "rgba(" + app.color.themeRgb + ", .55)",
        "rgba(" + app.color.themeRgb + ", .75)",
        ],
      xdata = {
        type: "category",
        labels: {
          show: true,
        },
      };
	  } else if (chartType == "pie") {
		  pieValue = []
		  for (x in a.pieChartDataList) {
			  pieValue.push(a.pieChartDataList[x].value);
      }
      chartColors = [
        "rgba(" + app.color.themeRgb + ", 1)",
        "rgba(" + app.color.themeRgb + ", .75)",
        "rgba(" + app.color.themeRgb + ", .5)",
      ];
      console.log(pieValue);
      Label = {
        enabled: false,
        formatter: function (val) {
          return val;
        },
      },
      chartData = pieValue,
      xdata = {
        type: "category",
        labels: {
          show: true,
        },
      };
    } else if (chartType == "donut") {
      chartColors = [
        "rgba(" + app.color.themeRgb + ", .15)",
        "rgba(" + app.color.themeRgb + ", .35)",
        "rgba(" + app.color.themeRgb + ", .55)",
        "rgba(" + app.color.themeRgb + ", .75)",
        "rgba(" + app.color.themeRgb + ", .95)",
      ];
      Label = {
        enabled: false,
      },
      chartData = [randomNo(), randomNo(), randomNo(), randomNo(), randomNo()];
      chartStroke = {
        show: false,
        curve: "smooth",
        lineCap: "butt",
        colors: "rgba(" + app.color.blackRgb + ", .25)",
        width: 2,
        dashArray: 0,
      };
      chartPlotOptions = {
        pie: {
          donut: {
            background: "transparent",
          },
        },
      },
      xdata = {
        type: "category",
        labels: {
          show: true,
        },
      };
    } else if (chartType == "line") {
      NoteBook = [];
		Desktop = [];
		RMC = [];
      Virtual = [];
      list = ["{x: }"]
		for (x in a.lineChartDataList) {
			if (a.lineChartDataList[x].name == "Notebook") {
          dict = { 'x': a.lineChartDataList[x].date, 'y': a.lineChartDataList[x].value };
          NoteBook.push(dict);
        } else if (a.lineChartDataList[x].name == "Desktop") {
          dict = { 'x': a.lineChartDataList[x].date, 'y': a.lineChartDataList[x].value };
          Desktop.push(dict);
        } else if (a.lineChartDataList[x].name == "Rack Mount Chassis") {
          dict = { 'x': a.lineChartDataList[x].date, 'y': a.lineChartDataList[x].value };
          RMC.push(dict);
        } else if (a.lineChartDataList[x].name == "Virtual") {
          dict = { 'x': a.lineChartDataList[x].date, 'y': a.lineChartDataList[x].value, };
          Virtual.push(dict);
        }
      }
		chartColors = [
      "rgba(" + app.color.themeRgb + ", .45)",
      "rgba(" + app.color.themeRgb + ", .55)",
      "rgba(" + app.color.themeRgb + ", .75)",
      "rgba(" + app.color.themeRgb + ", .95)",
    ];
		chartData = [
      {
        name: "Desktop",
        data: Desktop,
      },
      {
        name: "NoteBook",
        data: NoteBook,
      },
      {
        name: "RMC",
        data: RMC,
      },
      {
        name: "Virtual",
        data: Virtual,
      },
      ];
      Label = {
        enabled: false,
      },
		chartStroke = {
			curve: "straight",
			width: 2,
        },
      xdata = {
          axisBorder: {
          show: true,
          color: 'rgba('+ app.color.whiteRgb + ', .25)',
          height: 1,
          width: '100%',
          offsetX: 0,
          offsetY: -1
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: 'rgba('+ app.color.whiteRgb + ', .25)',
          height: 6,
          offsetX: 0,
          offsetY: 0
        },
        labels: {
          show: true,
        }
      };
    }

    var chartOptions = {
      chart: {
        height: chartHeight,
        type: chartType,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: Label,
      colors: chartColors,
      stroke: chartStroke,
      plotOptions: chartPlotOptions,
      series: chartData,
      grid: {
        show: false,
      },
      tooltip: {
        theme: "dark",
        x: {
          show: true,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "" + seriesName;
            },
          },
          formatter: (value) => {
            return "" + value;
          },
        },
      },
      xaxis: xdata,
      yaxis: {
        labels: {
          show: false,
        },
      },
    };
    chart[x] = new ApexCharts(elm, chartOptions);
    chart[x].render();
    x++;
  });

  var serverChartOptions = {
    chart: {
      height: "100%",
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: "rgba(" + app.color.whiteRgb + ", .15)",
    },
    stroke: {
      show: false,
    },
    colors: ['rgba('+ app.color.themeRgb + ', .35)', 'rgba('+ app.color.themeRgb + ', .55)', 'rgba('+ app.color.themeRgb + ', .75)', 'rgba('+ app.color.themeRgb + ', .95)'],
    series: [{
    	name: 'Desktop',
      data: [
      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(),
      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo()
      ]
    },{
    	name: 'Notebook',
      data: [
      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(),
      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo()
      ]
    },{
    	name: 'Rack',
      data: [
      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(),
      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo()
      ]
    },{
    	name: 'Virtual',
      data: [
      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(),
      	randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo()
      ]
    }],
    xaxis: {
      categories: ['Desktop', 'Notebook', 'Rack', 'Virtual'],
      labels: {
        show: true,
      },
    },
    fill: {
      opacity: 0.65,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };
  var apexServerChart = new ApexCharts(
    document.querySelector('#chart-server'),
    serverChartOptions
  );
  //apexServerChart.render();
};

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

var handleRenderSeongnamMap = function() {
	var gdpData = { "AF": 16.63, "AL": 11.58, "DZ": 158.97, "AO": 85.81, "AG": 1.1, "AR": 351.02, "AM": 8.83, "AU": 1219.72, "AT": 366.26, "AZ": 52.17, "BS": 7.54, "BH": 21.73, "BD": 105.4, "BB": 3.96, "BY": 52.89, "BE": 461.33, "BZ": 1.43, "BJ": 6.49, "BT": 1.4, "BO": 19.18, "BA": 16.2, "BW": 12.5, "BR": 2023.53, "BN": 11.96, "BG": 44.84, "BF": 8.67, "BI": 1.47, "KH": 11.36, "CM": 21.88, "CA": 1563.66, "CV": 1.57, "CF": 2.11, "TD": 7.59, "CL": 199.18, "CN": 5745.13, "CO": 283.11, "KM": 0.56, "CD": 12.6, "CG": 11.88, "CR": 35.02, "CI": 22.38, "HR": 59.92, "CY": 22.75, "CZ": 195.23, "DK": 304.56, "DJ": 1.14, "DM": 0.38, "DO": 50.87, "EC": 61.49, "EG": 216.83, "SV": 21.8, "GQ": 14.55, "ER": 2.25, "EE": 19.22, "ET": 30.94, "FJ": 3.15, "FI": 231.98, "FR": 2555.44, "GA": 12.56, "GM": 1.04, "GE": 11.23, "DE": 3305.9, "GH": 18.06, "GR": 305.01, "GD": 0.65, "GT": 40.77, "GN": 4.34, "GW": 0.83, "GY": 2.2, "HT": 6.5, "HN": 15.34, "HK": 226.49, "HU": 132.28, "IS": 12.77, "IN": 1430.02, "ID": 695.06, "IR": 337.9, "IQ": 84.14, "IE": 204.14, "IL": 201.25, "IT": 2036.69, "JM": 13.74, "JP": 5390.9, "JO": 27.13, "KZ": 129.76, "KE": 32.42, "KI": 0.15, "KR": 986.26, "UNDEFINED": 5.73, "KW": 117.32, "KG": 4.44, "LA": 6.34, "LV": 23.39, "LB": 39.15, "LS": 1.8, "LR": 0.98, "LY": 77.91, "LT": 35.73, "LU": 52.43, "MK": 9.58, "MG": 8.33, "MW": 5.04, "MY": 218.95, "MV": 1.43, "ML": 9.08, "MT": 7.8, "MR": 3.49, "MU": 9.43, "MX": 1004.04, "MD": 5.36, "MN": 5.81, "ME": 3.88, "MA": 91.7, "MZ": 10.21, "MM": 35.65, "NA": 11.45, "NP": 15.11, "NL": 770.31, "NZ": 138, "NI": 6.38, "NE": 5.6, "NG": 206.66, "NO": 413.51, "OM": 53.78, "PK": 174.79, "PA": 27.2, "PG": 8.81, "PY": 17.17, "PE": 153.55, "PH": 189.06, "PL": 438.88, "PT": 223.7, "QA": 126.52, "RO": 158.39, "RU": 1476.91, "RW": 5.69, "WS": 0.55, "ST": 0.19, "SA": 434.44, "SN": 12.66, "RS": 38.92, "SC": 0.92, "SL": 1.9, "SG": 217.38, "SK": 86.26, "SI": 46.44, "SB": 0.67, "ZA": 354.41, "ES": 1374.78, "LK": 48.24, "KN": 0.56, "LC": 1, "VC": 0.58, "SD": 65.93, "SR": 3.3, "SZ": 3.17, "SE": 444.59, "CH": 522.44, "SY": 59.63, "TW": 426.98, "TJ": 5.58, "TZ": 22.43, "TH": 312.61, "TL": 0.62, "TG": 3.07, "TO": 0.3, "TT": 21.2, "TN": 43.86, "TR": 729.05, "TM": 0, "UG": 17.12, "UA": 136.56, "AE": 239.65, "GB": 2258.57, "US": 14624.18, "UY": 40.71, "UZ": 37.72, "VU": 0.72, "VE": 285.21, "VN": 101.99, "YE": 30.02, "ZM": 15.69, "ZW": 5.57};
	$('#seongnamMap').vectorMap({
		map: 'sn_mill',
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










function seongnamMap(worldMapData, seongnamNetwork){
    var width = 879.5, height = 376.92;
    var svg = d3.select("#seongnam-map").append("svg").attr("width", width).attr("height", height).attr("viewBox", "0 0 879.5 376.92").style("margin-left", '1%');
    var map = svg.append("g").attr("id", "map"),places = svg.append("g").attr("id", "places");
    var projection = d3.geo.mercator().center([127.1094211519, 37.399]).scale(120000).translate([width/2, height/2]);
    var path = d3.geo.path().projection(projection);

svg.selectAll("circle")
    .data(worldMapData)
    .enter()
    .append("circle")
    .attr("class","dot")
    .attr("transform",translateCircle)
    .attr("r",4)
    .style("fill", "#e08a0b");

function translateCircle(datum, index)
          {
            return "translate(" +  projection([datum.y, datum.x]) + ")";
          };

setInterval(function(){
	      worldMapData.forEach(function(datum)
          {
			  svg
			  	.append("circle")
			      .attr("class", "ring")
			      .attr("transform", translateCircle(datum))
			      .attr("r", 1)
			      .style("fill", "#e06f0b")
			      .style("opacity", "0.3")
			      .style("fill-opacity", "0.3")
			    .transition()
			      .ease("linear")
			      .duration(2000)
			      .style("stroke-opacity", 1e-6)
			      .style("stroke-width", 1)
			      .style("stroke", "e06f0b")
			      .attr("r", 30)
			      .remove();
          })
      }, 800);

    d3.json("../static/assets/plugins/jvectormap-content/seongnam.json", function(error, data) {
        var features = topojson.feature(data, data.objects.seongnam).features;

        map.selectAll('path').data(features).enter().append('path')
        .attr('class', function(d) { return 'municipality c' + d.properties.code })
        .attr('d', path);

        map.selectAll('text').data(features).enter().append("text")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("class", "municipality-label")
        .text(function(d) { return d.properties.sggnm; })
        .style("fill", "#717384")
    });


  var simulation = d3v4.forceSimulation()
    .force("link", d3v4.forceLink().distance(d => d.distance).id(function(d) { return d.id; }))
    .force("charge", d3v4.forceManyBody().strength(-170));

      seongnamNetwork.forEach(function(graph) {
      var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
          .attr("stroke-width", "1.7")
          .style("stroke", "#e18a0a");

      var fillCircle = function(g){
            if(g == "Ncrd"){
                return "/web/static/img/dashboard/ncrd.png";
            }else if(g=="Ncalpha"){
                return "/web/static/img/dashboard/ncalpha.png";
            }
        };

    });







}







/* Controller
------------------------------------------------ */
$(document).ready(function() {
	handleRenderChart();
	handleRenderMap();
	handleRenderKoreaMap();
	handleRenderSeongnamMap();
	seongnamMap(worldMapData, seongnamNetwork);

	document.addEventListener('theme-reload', function() {
	$('[data-render="apexchart"], #chart-server, #world-map').empty();
		handleRenderChart();
		handleRenderMap();
		handleRenderKoreaMap();
		handleRenderSeongnamMap();
		seongnamMap(worldMapData, seongnamNetwork);
	});
});