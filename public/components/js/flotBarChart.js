  function flotBarChart (data) {
    /*
     * BAR CHART
     * ---------
     */
    var dataX = new Array();
    var dataY = new Array();

    console.log(data);
    var datas;
    if(Array.isArray(data) == false)
      datas = JSON.parse(data);
    else
      datas = data;
    console.log(datas);

    for(var i=0; i<datas.length; i++) {
      dataX[i] = datas[i].split(",")[0];
      dataY[i] = datas[i].split(",")[1];
    }

    for(var i=0; i<datas.length; i++){
      if(dataX[i].length == 1)
        dataX[i] += "학년";
      dataY[i] = dataY[i]*1;
    }
    
    var result = [];
    for(var i=0; i<datas.length; i++) {
      result[i] = [dataX[i], dataY[i]];
    }
    
    var bar_data = {
      data : result,
      color: '#3c8dbc'
    }
    $.plot('#bar-chart', [bar_data], {
      grid  : {
        borderWidth: 1,
        borderColor: '#f3f3f3',
        tickColor  : '#f3f3f3'
      },
      series: {
        bars: {
          show    : true,
          barWidth: 0.5,
          align   : 'center'
        }
      },
      xaxis : {
        mode      : 'categories',
        tickLength: 0
      }
    })
    /* END BAR CHART */
  }