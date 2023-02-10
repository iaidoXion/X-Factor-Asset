var randomNo = function() {
  return Math.floor(Math.random() * 60) + 30
};

var handleRenderDataFabricApexChart = function () {
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

// BEGIN databaseConnectChart
  var DatabaseConnectChartOptions = {
    chart: {
      height: 190,
      type: 'bar',
        toolbar: {
          show: false
        },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
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
    colors: ["#f39c12", "#fdb43f", "#ffc365", "#c58a2e"],
    series: [{
      data: [41, 28, 36, 22]
    }],
    grid: {
        show: true
    },
    xaxis: {
      categories: ['Teradata', 'Postgres', 'ETC1', 'ETC2',],
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

    var databaseConnectChart = new ApexCharts(
      document.querySelector("#databaseConnectChart"),
      DatabaseConnectChartOptions
    );
    databaseConnectChart.render();
  // END databaseConnectChart
//--------------------------------------------------------------------------
  // BEGIN UserConnectChart
  var UserConnectChartOptions = {
    //    chart: {
    //      height: 190,
    //      type: 'bar',
    //        toolbar: {
    //          show: false
    //        },
    //    },
    //    plotOptions: {
    //      bar: {
    //        columnWidth: '50%',
    //        distributed: true,
    //      }
    //    },
    //    legend: {
    //      show: false
    //    },
    //    dataLabels: {
    //      enabled: false
    //    },
    //    stroke: {
    //        show: true,
    //        width: 1,
    //        colors: ['transparent']
    //    },
    //    colors: ["#c58a2e", "#ffc365", "#fdb43f", "#f39c12"],
    //    series: [{
    //      data: [4, 11, 8, 18,]
    //    }],
    //    grid: {
    //        show: true
    //    },
    //    xaxis: {
    //      categories: ['User1', 'Admin', 'Guest', 'Manager'],
    //      labels: {
    //        show: true,
    //        style: {
    //          colors: '#fff',
    //          fontSize: '9px',
    //          cssClass: 'apexcharts-xaxis-label',
    //        }
    //      }
    //    },
    //    yaxis: {
    //      labels: {
    //        show: true,
    //      }
    //    },
    //	fill: {
    //	  opacity: 1
    //	},
    //    tooltip: {
    //      theme: 'dark',
    //        x: {
    //          show: true,
    //        },
    //		y: {
    //	      title: {
    //		    formatter: function (seriesName) {
    //		    return ''
    //			}
    //		  },
    //	    formatter: (value) => { return '' + value },
    //	  }
    //    }


  }

    var UserConnectChart = new ApexCharts(
      document.querySelector("#UserConnectChart"),
      UserConnectChartOptions
    );
    UserConnectChart.render();
  // END UserConnectChart
//--------------------------------------------------------------------------
  // BEGIN Guide_LineChart
  var cpuusageChartOptions = {
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
  var cpuusageChart = new ApexCharts(
    document.querySelector("#CpuLinChart"),
    cpuusageChartOptions
  );
  DocumentLineChart.render();
  // END Guide_LineChart

};
/* Controller
------------------------------------------------ */
$(document).ready(function () {
	handleRenderDataFabricApexChart();
});