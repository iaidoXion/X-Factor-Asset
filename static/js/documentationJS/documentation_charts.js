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
      series: [{
      data: [11, 9, 7, 5, 3]
    }],
      chart: {
      height: 120,
      type: 'bar',
        toolbar: {
          show: false
      },
      events: {
        click: function(chart, w, e) {
          // console.log(chart, w, e)
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        '192.168.1',
        '192.168.0',
        '192.168.14',
        '192.168.64',
        '192.168.5',
      ],
      labels: {
        style: {
          fontSize: '12px'
        }
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
    series: [{
      data: [8, 4, 2]
    }],
      chart: {
      type: 'bar',
      width: 500,
      height: 150,
        toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['LG Electronics', 'HP', 'To Be FilledBy O.E.M'
      ],
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
      data: [8, 4, 2]
    }],
      chart: {
      type: 'bar',
      width: 500,
      height: 150,
        toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['LG Electronics', 'HP', 'To Be FilledBy O.E.M'
      ],
    }
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
    series: [31,9],
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
    }]
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
    }]
  };
  var DocumentDonutChart = new ApexCharts(
    document.querySelector("#DocumentDonutChart"),
    DocumentDonutChartOptions
  );
  DocumentDonutChart.render();
  // END Guide_DonutChart
//--------------------------------------------------------------------------
  // BEGIN Guide_DonutChart
  var DocumentCircleChartOptions = {
    series: [44, 55, 41, 17, 15],
    chart: {
     type: 'donut',
    },
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
    }]
  };
  var DocumentCircleChart = new ApexCharts(
    document.querySelector("#DocumentCircleChart"),
    DocumentCircleChartOptions
  );
  DocumentCircleChart.render();
  // END Guide_DonutChart
};
/* Controller
------------------------------------------------ */
$(document).ready(function () {
	handleRenderGuideApexChart();
});