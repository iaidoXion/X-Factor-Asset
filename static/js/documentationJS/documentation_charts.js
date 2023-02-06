var randomNo = function() {
  return Math.floor(Math.random() * 60) + 30
};

var handleRenderGuideApexChart = function () {
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

// BEGIN Guide_columnChart
  var DocumentColumnChartOptions = {
    chart: {
      height: 120,
      type: 'bar',
        toolbar: {
          show: false
        },
    },
    plotOptions: {
      bar: {
        columnWidth: '70%',
        distributed: true,
      }
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
      data: [11, 9, 7, 5, 3]
    }],
    grid: {
        show: true
    },
    xaxis: {
      categories: ['192.168.1', '192.168.0', '192.168.14', '192.168.64', '192.168.5'],
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
  }

    var DocumentColumnChart = new ApexCharts(
      document.querySelector("#DocumentColumnChart"),
      DocumentColumnChartOptions
    );
    DocumentColumnChart.render();
  // END Guide_columnChart
//--------------------------------------------------------------------------
  // BEGIN Guide_barChart
  var DocumentBarChartOptions = {
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
        distributed: true
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
      data: [8, 6, 4]
    }],
    grid: {
      show: true
    },
    xaxis: {
      categories: ['LG Electronics', 'SAMSUNG ELECTRONICS CO., LED.', 'To Be Filled By O.E.M.'],
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
  var DocumentBarChart = new ApexCharts(
    document.querySelector("#DocumentBarChart"),
    DocumentBarChartOptions
  );
  DocumentBarChart.render();
  // END Guide_BarChart
//--------------------------------------------------------------------------
  // BEGIN Guide_LineChart
  var DocumentLineChartOptions = {
    series: [{
      name: "virtual",
      data: [8, 9, 10, 7, 8, 12, 16, 20, 18, 14, 8, 10, 16, 20, 25, 18,
       10, 8, 3, 10, 19, 21, 27, 20, 23, 27 ,30, 34, 39, 44]
    },
    {
      name: "physical",
      data: [46, 42, 39, 36, 30, 32, 26, 28, 31, 10, 6, 14, 22, 26, 19,
      15, 20, 26, 22, 19, 6, 10, 17, 10, 6, 18, 26, 20, 16, 25]
    }],
    chart: {
      height: 145,
      type: 'line',
      toolbar: {
        show: false
      },
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        }
      }
    },
    colors: ['rgba(' + app.color.themeRgb + ', .95)', 'rgba(' + app.color.themeRgb + ', .30)'],
    dataLabels: {
      enabled: false,
    },
    legend : {
      show: false
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
      size: 1
    },
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
      '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',
      '24', '25', '26', '27', '28', '29', '30'],
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (val) {
          return Math.round(val);
        }
      }
    },
  };
  var DocumentLineChart = new ApexCharts(
    document.querySelector("#DocumentLineChart"),
    DocumentLineChartOptions
  );
  DocumentLineChart.render();
  // END Guide_LineChart
//--------------------------------------------------------------------------
  // BEGIN Guide_PieChart
  var DocumentPieChartOptions = {
     series: [{
      name: "Windows",
      data: [31]
    },
    {
      name: "Linux",
      data: [9]
    }],
      chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Windows', 'Linux'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    tooltip: {
      theme: 'dark',
      x: {
        show: true,
      },
      y: {
            title: {
                formatter: function (labelsname) {
                    return ''
                }
            },
            formatter: (value) => { return '' + value },
      }
    }
  };
  var DocumentPieChart = new ApexCharts(
    document.querySelector("#DocumentPieChart"),
    DocumentPieChartOptions
  );
  DocumentPieChart.render();
  // END Guide_PieChart
//--------------------------------------------------------------------------
  // BEGIN Guide_DonutChart
  var DocumentDonutChartOptions = {
    series: [35, 35, 35, 35, 35],
    chart: {
     type: 'donut',
    },
    labels: ['Cryptographic Services', 'Server', 'DNS Client','Shell Hardware Detection','Network List Service'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
  };
  var DocumentDonutChart = new ApexCharts(
    document.querySelector("#DocumentDonutChart"),
    DocumentDonutChartOptions
  );
  DocumentDonutChart.render();
  // END Guide_DonutChart
//--------------------------------------------------------------------------
  // BEGIN Guide_gaugeChart95
  var DocumentGaugeChart95Options = {
    series: [95],
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function(val) {
              return parseInt(val);
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['0'],
  };
    var DocumentGaugeChart95 = new ApexCharts(
      document.querySelector("#DocumentGaugeChart95"),
    DocumentGaugeChart95Options
  );
  DocumentGaugeChart95.render();
  // BEGIN Guide_gaugeChart95
//--------------------------------------------------------------------------
  // BEGIN Guide_gaugeChart75
  var DocumentGaugeChart75Options = {
    series: [75],
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function(val) {
              return parseInt(val);
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['0'],
  };
    var DocumentGaugeChart75 = new ApexCharts(
      document.querySelector("#DocumentGaugeChart75"),
    DocumentGaugeChart75Options
  );
  DocumentGaugeChart75.render();
  // BEGIN Guide_gaugeChart75
//--------------------------------------------------------------------------
  // BEGIN Guide_gaugeChart60
  var DocumentGaugeChart60Options = {
    series: [60],
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function(val) {
              return parseInt(val);
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['0'],
  };
    var DocumentGaugeChart60 = new ApexCharts(
      document.querySelector("#DocumentGaugeChart60"),
    DocumentGaugeChart60Options
  );
  DocumentGaugeChart60.render();
  // BEGIN Guide_gaugeChart60
//--------------------------------------------------------------------------
  // BEGIN Guide_CircleChart
  var DocumentRaderChartOptions = {
    series: [{
      name: '192.168.1',
      data: [1, 2, 3, 4, 5, 6, 7],
    }, {
      name: '192.168.14',
      data: [7, 6, 5, 4, 3, 2, 1],
    }, {
      name: '192.168.0',
      data: [2, 4, 6, 8, 10, 12, 2],
    }, {
      name: '192.168.5',
      data: [7, 12, 10, 8, 10, 4, 2],
    }, {
      name: '192.168.64',
      data: [1, 3, 5, 7, 9, 11, 6],
    }],
    chart: {
      height: 350,
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      }
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.1
    },
    markers: {
      size: 0
    },
    xaxis: {
      categories: ['No Login History', 'Drive Size No Change', 'Listen port No change', 'Established', 'RAM Usage Exceeded', 'CPU Usage Exceeded','Running Process Exceeded']
    }
    };
    var DocumentRaderChart = new ApexCharts(
      document.querySelector("#DocumentRaderChart"),
    DocumentRaderChartOptions
  );
  DocumentRaderChart.render();
};
/* Controller
------------------------------------------------ */
$(document).ready(function () {
	handleRenderGuideApexChart();
});