function flotDonutChart (data) {

    /*
     * DONUT CHART
     * -----------
     */

    var dataYear = new Array();
    var dataCount = new Array();

    var datas = JSON.parse(data);

    for(var i=0; i<datas.length; i++) {
      dataYear[i] = datas[i].split(",")[0];
      dataCount[i] = datas[i].split(",")[1];
    }

    for(var i=0; i<datas.length; i++) {
      dataYear[i] = dataYear[i]*1;
      dataCount[i] = dataCount[i]*1;
    }

    var colorList = ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#0073b7', '#00c0ef']

    var result = [];
    for(var i=0; i<datas.length; i++)
      result[i] = { label: dataYear[i] + "학년", data: dataCount[i], color: colorList[i] };

    var donutData = result
    $.plot('#donut-chart', donutData, {
      series: {
        pie: {
          show       : true,
          radius     : 1,
          innerRadius: 0.5,
          label      : {
            show     : true,
            radius   : 2 / 3,
            formatter: labelFormatter,
            threshold: 0.1
          }

        }
      },
      legend: {
        show: false
      }
    })
    /*
     * END DONUT CHART
     */

  }

  /*
   * Custom Label formatter
   * ----------------------
   */
  function labelFormatter(label, series) {
    return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
      + label
      + '<br>'
      + Math.round(series.percent) + '%</div>'
  }