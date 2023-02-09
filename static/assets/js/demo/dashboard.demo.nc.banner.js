/*
Template Name: HUD - Responsive Bootstrap 5 Admin Template
Version: 1.8.0
Author: Sean Ngu

*/


var randomNo = function () {
    return Math.floor(Math.random() * 60) + 30
};

//value = ""
var apexMemory95usageChart
var apexMemory75usageChart
var apexMemory60usageChart
var apexCPU95usageChart
var apexCPU75usageChart
var apexCPU60usageChart
var apexDisk95usageChart
var apexDisk75usageChart
var apexDisk60usageChart

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
    var osDonutValue = []
    var osDonutName = []

    for (var i = 0; i < a.os_donutChartData.length; i++) {
    osDonutValue.push(a.os_donutChartData[i]['value']);
    osDonutName.push(a.os_donutChartData[i]['name']);
    };

    var apexOSversionChartOptions = {
        chart: {
          height: 130,
          type: 'donut',
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            },
          },
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
        colors: ["#934903", "#b76306", "#db7f08", "#ff9f0c", "#ffbe48", "#ffd16d", "#ffe49d", "#fff3ce"],
        labels: osDonutName,
        series: osDonutValue,
        tooltip: {
          theme: 'dark',
          x: {
            show: true
          },
          y: {
            title: {
              formatter: function (val) {
                return '' + val + "<br>" + " Count:"
              }
            },
            formatter: (value) => { return '' + value },
          }
        }
    };
    var apexOSversionChart = new ApexCharts(document.querySelector('#apexOSversionChart'),apexOSversionChartOptions);
    apexOSversionChart.render();


    //--------------------------------------------------------------------------
    // Number of servers IP list - IPlistchart
    //--------------------------------------------------------------------------

    group = [];
    value = [];

    for (var i = 0; i < a.server_barChartDataList.length; i++) {
        group.push(a.server_barChartDataList[i].name);
        value.push(parseInt(a.server_barChartDataList[i].value));
    }

    var apexIPlistChartOptions = {
        chart: {
          height: 120,
          type: 'bar',
          toolbar: {
            show: false
          },
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            }
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
            distributed: true,
            endingShape: 'rounded'
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
          data: value
        }],
        grid: {
          show: true
        },
        xaxis: {
          categories: group,
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
            formatter : function (val){
                return parseInt(val);
            }
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
    var apexIPlistChart = new ApexCharts(document.querySelector('#apexIPlistChart'),apexIPlistChartOptions);
    apexIPlistChart.render();



    //--------------------------------------------------------------------------
    // Service Running Statistics - apexRunServiceChart
    //--------------------------------------------------------------------------
    var donutValue = []
    var donutName = []

    for (var i = 0; i < a.donutChartDataList.length; i++) {
        donutValue.push(a.donutChartDataList[i]['value']);
        donutName.push(a.donutChartDataList[i]['name']);
    };

    var apexRunServiceOptions = {
        chart: {
          height: 130,
          type: 'donut',
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            }
          },
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
                return '' + val + "<br>" + " Count:"
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

    for (var i = 0; i < a.MemoryChartDataList.length; i++) {
        if (a.MemoryChartDataList[i]['name'] == '60Risk') {
          memory60 = a.MemoryChartDataList[i]['value']
        } else if (a.MemoryChartDataList[i]['name'] == '75Risk') {
          memory75 = a.MemoryChartDataList[i]['value']
        } else {
          memory95 = a.MemoryChartDataList[i]['value']
        }
    };

    if (a.MemoryChartDataList[0]['name'] == '-') {
        memory95 = '-'
        memory75 = ''
        memory60 = ''
    }

    var apexMemory95usageOptions = {
        series: [95],
        chart: {
          height: 250,
          type: 'radialBar',
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            }
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
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
              background: ['rgba(' + app.color.whiteRgb + ', .30)'],
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
                color: '#fff',
                fontSize: '28px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val) + '%';
                },
                color: '#fff',
                fontSize: '17px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          colors: '#b31217',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#870000'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [memory95],
    };
    apexMemory95usageChart = new ApexCharts(
    document.querySelector('#apexMemory95usageChart'),
    apexMemory95usageOptions
    );
    apexMemory95usageChart.render();


    //--------------------------------------------------------------------------
    // Memory Usage - apexMemory75usageChart
    //--------------------------------------------------------------------------
    var apexMemory75usageOptions = {
        series: [75],
        chart: {
          height: 250,
          type: 'radialBar',
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            }
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
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
              background: ['rgba(' + app.color.whiteRgb + ', .30)'],
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
                color: '#fff',
                fontSize: '28px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val) + '%';
                },
                color: '#fff',
                fontSize: '17px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          colors: '#fe8c00',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#f83600'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [memory95 + memory75],
    };
    apexMemory75usageChart = new ApexCharts(
    document.querySelector('#apexMemory75usageChart'),
    apexMemory75usageOptions
    );
    apexMemory75usageChart.render();


    //--------------------------------------------------------------------------
    // Memory Usage - apexMemory60usageChart
    //--------------------------------------------------------------------------
    var apexMemory60usageOptions = {
        series: [60],
        chart: {
          height: 250,
          type: 'radialBar',
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            }
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
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
              background: ['rgba(' + app.color.whiteRgb + ', .30)'],
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
                color: '#fff',
                fontSize: '28px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val) + '%';
                },
                color: '#fff',
                fontSize: '17px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          colors: '#F2C94C',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#F2994A'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [memory95 + memory75 + memory60],
    };
    apexMemory60usageChart = new ApexCharts(
    document.querySelector('#apexMemory60usageChart'),
    apexMemory60usageOptions
    );
    apexMemory60usageChart.render();


    //--------------------------------------------------------------------------
    // CPU Usage - apexCPU95usageChart
    //--------------------------------------------------------------------------

    for (var i = 0; i < a.CpuChartDataList.length; i++) {
        if (a.CpuChartDataList[i]['name'] == '60Risk') {
          cpu60 = a.CpuChartDataList[i]['value']
        } else if (a.CpuChartDataList[i]['name'] == '75Risk') {
          cpu75 = a.CpuChartDataList[i]['value']
        } else {
          cpu95 = a.CpuChartDataList[i]['value']
        }
    };

    if (a.CpuChartDataList[0]['name'] == '-') {
        cpu95 = '-'
        cpu75 = ''
        cpu60 = ''
    };

    var apexCPU95usageOptions = {
        series: [95],
        chart: {
          height: 250,
          type: 'radialBar',
          animations: {
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          events: {
            mounted: (chart) => {
            chart.windowResizeHandler();
            }
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
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
              background: ['rgba(' + app.color.whiteRgb + ', .30)'],
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
                color: '#fff',
                fontSize: '28px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val) + '%';
                },
                color: '#fff',
                fontSize: '17px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          colors: '#b31217',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#870000'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [cpu95],
    };
    apexCPU95usageChart = new ApexCharts(
    document.querySelector('#apexCPU95usageChart'),
    apexCPU95usageOptions
    );


    //--------------------------------------------------------------------------
    // CPU Usage - apexCPU75usageChart
    //--------------------------------------------------------------------------
    var apexCPU75usageOptions = {
        series: [75],
        chart: {
          height: 250,
          type: 'radialBar',
          events: {
            mounted: (chart) => {
                chart.windowResizeHandler();
            }
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
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
              background: ['rgba(' + app.color.whiteRgb + ', .30)'],
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
                color: '#fff',
                fontSize: '28px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val) + '%';
                },
                color: '#fff',
                fontSize: '17px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          colors: '#fe8c00',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#f83600'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [cpu95 + cpu75],
    };
    apexCPU75usageChart = new ApexCharts(
    document.querySelector('#apexCPU75usageChart'),
    apexCPU75usageOptions
    );



    //--------------------------------------------------------------------------
    // CPU Usage - apexCPU60usageChart
    //--------------------------------------------------------------------------
    var apexCPU60usageOptions = {
        series: [60],
        chart: {
          height: 250,
          type: 'radialBar',
          events: {
            mounted: (chart) => {
                chart.windowResizeHandler();
            }
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
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
              background: ['rgba(' + app.color.whiteRgb + ', .30)'],
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
                color: '#fff',
                fontSize: '28px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val) + '%';
                },
                color: '#fff',
                fontSize: '17px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          colors: '#F2C94C',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#F2994A'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [cpu95 + cpu75 + cpu60],
    };
    apexCPU60usageChart = new ApexCharts(
    document.querySelector('#apexCPU60usageChart'),
    apexCPU60usageOptions
    );


    //--------------------------------------------------------------------------
    // Disk Usage - apexDisk95usageChart
    //--------------------------------------------------------------------------

    for (var i = 0; i < a.DiskChartDataList.length; i++) {
        if (a.DiskChartDataList[i]['name'] == '60Risk') {
          disk60 = a.DiskChartDataList[i]['value']
        } else if (a.DiskChartDataList[i]['name'] == '75Risk') {
          disk75 = a.DiskChartDataList[i]['value']
        } else if (a.DiskChartDataList[i]['name'] == '95Risk') {
          disk95 = a.DiskChartDataList[i]['value']
        } else if (a.DiskChartDataList[i]['name'] == '99Risk') {
          disk99 = a.DiskChartDataList[i]['value']
        }
    };

    if (a.DiskChartDataList[0]['name'] == '-') {
        disk99 = '-'
        disk95 = ''
        disk75 = ''
        disk60 = ''
    };

    var apexDisk95usageOptions = {
        series: [95],
        chart: {
          height: 250,
          type: 'radialBar',
          events: {
            mounted: (chart) => {
                chart.windowResizeHandler();
            }
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
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
              background: ['rgba(' + app.color.whiteRgb + ', .30)'],
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
                color: '#fff',
                fontSize: '28px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val) + '%';
                },
                color: '#fff',
                fontSize: '17px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          colors: '#b31217',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#870000'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [disk99 + disk95],
    };
    apexDisk95usageChart = new ApexCharts(
    document.querySelector('#apexDisk95usageChart'),
    apexDisk95usageOptions
    );


    //--------------------------------------------------------------------------
    // Disk Usage - apexDisk75usageChart
    //--------------------------------------------------------------------------
    var apexDisk75usageOptions = {
        series: [75],
        chart: {
          height: 250,
          type: 'radialBar',
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            }
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
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
              background: ['rgba(' + app.color.whiteRgb + ', .30)'],
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
                color: '#fff',
                fontSize: '28px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val) + '%';
                },
                color: '#fff',
                fontSize: '17px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          colors: '#fe8c00',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#f83600'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [disk99 + disk95 + disk75],
    };
    apexDisk75usageChart = new ApexCharts(
    document.querySelector('#apexDisk75usageChart'),
    apexDisk75usageOptions
    );


    //--------------------------------------------------------------------------
    // Disk Usage - apexDisk60usageChart
    //--------------------------------------------------------------------------
    var apexDisk60usageOptions = {
        series: [60],
        chart: {
          height: 250,
          type: 'radialBar',
          events: {
            mounted: (chart) => {
                chart.windowResizeHandler();
            }
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
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
              background: ['rgba(' + app.color.whiteRgb + ', .30)'],
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
                color: '#fff',
                fontSize: '28px'
              },
              value: {
                formatter: function (val) {
                  return parseInt(val) + '%';
                },
                color: '#fff',
                fontSize: '17px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          colors: '#F2C94C',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#F2994A'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [disk99 + disk95 + disk75 + disk60],
    };
    apexDisk60usageChart = new ApexCharts(
    document.querySelector('#apexDisk60usageChart'),
    apexDisk60usageOptions
    );


    //--------------------------------------------------------------------------
    // Total quantity of servers - apexTotalServerChart
    //--------------------------------------------------------------------------
    var apexTotalServerOptions = {
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
          },
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
        series: a.server_LChartDataList[0].data,
        xaxis: {
          categories: a.server_LChartDataList[0].date,
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
            formatter: function (val) {
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
    // IP 대역별 총 알람 수 (상위 5개) - apexTotalAlarmChart
    //--------------------------------------------------------------------------
    var alarmValue = [];
    var alarmName = [];


//    for (var i = 0; i < a.alarm_donutChartData.length; i++) {
//        alarmValue.push(a.alarm_donutChartData[i]['value']);
//        alarmName.push(a.alarm_donutChartData[i]['key']);
//    };


    if (a.alarm_donutChartData.length >= 5) {
        for (var i = 0; i < 5; i++) {
          alarmValue.push(a.alarm_donutChartData[i]['value']);
          alarmName.push(a.alarm_donutChartData[i]['key']);
        };
    }
    else if (a.alarm_donutChartData.length == 0) {
        alarmValue.push('-');
        alarmName.push('-');
    }
    else {
        for (var i = 0; i < a.alarm_donutChartData.length; i++) {
          alarmValue.push(a.alarm_donutChartData[i]['value']);
          alarmName.push(a.alarm_donutChartData[i]['key']);
        };
    }

    var apexTotalAlarmOptions = {
        chart: {
          height: 170,
          type: 'donut',
          events: {
            mounted: (chart) => {
                chart.windowResizeHandler();
            }
          },
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
            width: 175,
            height: 120,
            position: 'right',
            fontSize: '10px',
            formatter: function (group, value) {
            return [group + "&nbsp;-&nbsp;" + value.w.globals.series[value.seriesIndex]]
            },
        },
        colors: ['rgba(' + app.color.themeRgb + ', .57)', 'rgba(' + app.color.themeRgb + ', .77)', 'rgba(' + app.color.themeRgb + ', .98)'],
        labels: alarmName,
        series: alarmValue,
        tooltip: {
          theme: 'dark',
          x: {
            show: true
          },
          y: {
            title: {
              formatter: function (val) {
                return '' + val + "<br>" + " Count:"
              }
            },
            formatter: (value) => { return '' + value },
          }
        },
    };
    var apexTotalAlarmChart = new ApexCharts(
    document.querySelector('#apexTotalAlarmChart'),
    apexTotalAlarmOptions
    );
    apexTotalAlarmChart.render();


    //--------------------------------------------------------------------------
    // physical server quantity - apexPhysicalServerChart
    //--------------------------------------------------------------------------
    var vendorValue = [];
    var vendorName = [];

    for (var i = 0; i < a.vendorChartList.length; i++) {
      vendorValue.push(a.vendorChartList[i]['value']);
      vendorName.push(a.vendorChartList[i]['name']);
    };

    if (a.vendorChartList.length == 0) {
        vendorValue.push(0);
        vendorName.push('-');
    }

    var apexPhysicalServerOptions = {
        chart: {
          height: 120,
          type: 'bar',
          toolbar: {
            show: false
          },
          events: {
            mounted: (chart) => {
            chart.windowResizeHandler();
            }
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
        colors: ["#f39c12", "#fdb43f", "#ffc365"],
        series: [{

          data: vendorValue
        }],
        grid: {
          show: true
        },

        xaxis: {
          categories: vendorName,
          labels: {
            show: true,
                formatter : function (val){
                return parseInt(val);
            },
            style: {
              colors: '#fff',
              fontSize: '9px',
              cssClass: 'apexcharts-xaxis-label',
            },
            /*offsetX: 30,*/
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
height = 350,
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
.defer(d3.json, "../static/assets/plugins/jvectormap-content/world.json")
.await(ready);


svg.selectAll("circle")
.data(worldMapData)
.enter()
.append("circle")
.attr("class", "dot")
.attr("transform", translateCircle)
.attr("r", 4)
.style("fill", "rgba(" + app.color.themeRgb + ")");


function ready(error, data) {

var features = topojson.feature(data, data.objects.countries).features;
svg.selectAll("path")
  .data(features)
  .enter()
  .append("path")
  .attr("d", path)
  .attr("fill", "rgba(" + app.color.whiteRgb + ")")
  .attr("opacity", .5)
}


function translateCircle(datum, index) {
return "translate(" + projection([datum[1], datum[0]]) + ")";
};
setInterval(function () {
worldMapData.forEach(function (datum) {
  svg
    .append("circle")
    .attr({
      "class": "ring",
      "transform": translateCircle(datum),
      "fill": "rgba(" + app.color.themeRgb + ")",
      "stroke": "rgba(" + app.color.whiteRgb + ")",
      "stroke-opacity": .5,
      "stroke-width": 0,
      "r": 1,
      "opacity": 0.74,
      "fill-opacity": 0.74
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
height = 350,
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

d3.json("../static/assets/plugins/jvectormap-content/korea.json", function (json) {
states.selectAll("path")
  .data(json.features)
  .enter().append("path")
  .attr("d", path)
  .attr("fill", "rgba(" + app.color.whiteRgb + ")")
  .attr("opacity", .5)
  .attr("id", function (d) { return 'path-' + d.id; });

labels = states.selectAll("text")
  .data(json.features)
  .enter().append("text")
  .attr("transform", labelsTransform)
  .attr("id", function (d) { return 'label-' + d.id; })
  .attr('text-anchor', 'small')
  .attr("dy", ".35em")
  .attr("fill", "rgba(" + app.color.whiteRgb + ")")
  .attr("opacity", .8)
  .text(function (d) { return d.properties.ShortName; });
});

svg.selectAll("circle")
.data(worldMapData)
.enter()
.append("circle")
.attr("class", "dot")
.attr("transform", translateCircle)
.attr("r", 4)
.style("fill", "rgba(" + app.color.themeRgb + ")");

function labelsTransform(d) {



if (d.id == 8) {
  var arr = path.centroid(d);
  arr[1] += (d3.event && d3.event.scale) ? (d3.event.scale / height + 20) : (initialScale / height + 20);

  return "translate(" + arr + ")";
} else {
  return "translate(" + path.centroid(d) + ")";
}
}



function translateCircle(datum, index) {
return "translate(" + projection([datum[1], datum[0]]) + ")";
};

setInterval(function () {
worldMapData.forEach(function (datum) {
  svg
    .append("circle")
    .attr({
      "class": "ring",
      "transform": translateCircle(datum),
      "fill": "rgba(" + app.color.themeRgb + ")",
      "stroke": "rgba(" + app.color.whiteRgb + ")",
      "stroke-opacity": .5,
      "stroke-width": 0,
      "r": 1,
      "opacity": 0.74,
      "fill-opacity": 0.74
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
height = 360,
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
.defer(d3.json, "../static/assets/plugins/jvectormap-content/seongnam.json")
.await(ready);


svg.selectAll("circle")
.data(worldMapData)
.enter()
.append("circle")
.attr("class", "dot")
.attr("transform", translateCircle)
.attr("r", 4)
.style("fill", "rgba(" + app.color.themeRgb + ")");


function ready(error, data) {

var features = topojson.feature(data, data.objects.seongnam).features;
svg.selectAll("path")
  .data(features)
  .enter()
  .append("path")
  .attr("d", path)
  .attr("fill", "rgba(" + app.color.whiteRgb + ")")
  .attr("opacity", .5);

svg.selectAll('text').data(features).enter().append("text")
  .attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .attr("class", "municipality-label")
  .text(function (d) { return d.properties.name; })
  .style("fill", "rgba(" + app.color.whiteRgb + ")")
  .attr('text-anchor', 'small')
  .attr("opacity", .8);


}


function translateCircle(datum, index) {
return "translate(" + projection([datum[1], datum[0]]) + ")";
};

setInterval(function () {
worldMapData.forEach(function (datum) {
  svg
    .append("circle")
    .attr({
      "class": "ring",
      "transform": translateCircle(datum),
      "fill": "rgba(" + app.color.themeRgb + ")",
      "stroke": "rgba(" + app.color.whiteRgb + ")",
      "stroke-opacity": .5,
      "stroke-width": 0,
      "r": 1,
      "opacity": 0.74,
      "fill-opacity": 0.74
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
d3.select("g").attr("transform", "scale(" + $("#seoul-map").width() / 900 + ")");
$("svg").height($("#seoul-map").width() * 0.618);
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
.attr("class", "dot")
.attr("transform", translateCircle)
.attr("r", 4)
.style("fill", "rgba(" + app.color.themeRgb + ")");

function translateCircle(datum, index) {
return "translate(" + projection([datum[1], datum[0]]) + ")";
};

setInterval(function () {
worldMapData.forEach(function (datum) {
  svg
    .append("circle")
    .attr({
      "class": "ring",
      "transform": translateCircle(datum),
      "fill": "rgba(" + app.color.themeRgb + ")",
      "stroke": "rgba(" + app.color.whiteRgb + ")",
      "stroke-opacity": .5,
      "stroke-width": 0,
      "r": 1,
      "opacity": 0.74,
      "fill-opacity": 0.74
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
  .style("fill", "rgba(" + app.color.whiteRgb + ")")
  .attr("opacity", .5);

map.selectAll('text').data(features).enter().append("text")
  .attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .attr("class", "municipality-label")
  .text(function (d) { return d.properties.SIG_KOR_NM; })
  .style("fill", "rgba(" + app.color.whiteRgb + ")")
  .attr('text-anchor', 'small')
  .attr("opacity", .8);
});



}




/* Controller
------------------------------------------------ */
$(document).ready(function () {
handleRenderChartNC();
worldMap(worldMapData);
koreaMap(worldMapData);
seongnamMap(worldMapData);
seoulMap(worldMapData);
apexCPU95usageChart.render();
apexCPU75usageChart.render();
apexCPU60usageChart.render();
apexDisk95usageChart.render();
apexDisk75usageChart.render();
apexDisk60usageChart.render();

});





