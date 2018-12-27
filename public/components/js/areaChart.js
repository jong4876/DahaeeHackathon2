function areaChart (data) {
    /* ChartJS
     * -------
     * Here we will create a few charts using ChartJS
     */
    // var dataes = datas.match(/[0-9]{1,3}/g)
    //--------------
    //- AREA CHART -
    //--------------
    // Get context with jQuery - using jQuery's .get() method.
    var areaChartCanvas = $('#areaChart').get(0).getContext('2d')
    // This will get the first returned node in the jQuery collection.
    var areaChart       = new Chart(areaChartCanvas)

    var result = new Array(new Array(), new Array());
    var dataArray = new Array(new Array(), new Array());

    var datas;
    if(Array.isArray(data) == false)
      datas = JSON.parse(data);
    else
      datas = data;

    for(var i=0; i<datas[0].split(",").length; i++){
      for(var j=0; j<8; j++) {
        result[i][j] = 0;
      }
    }

    for(var i=0; i<datas[0].split(",").length; i++){
      for(var j=0; j<datas.length; j++) {
        dataArray[i][j] = datas[j].split(",")[i];
        var temp = dataArray[i][j]*1;
        if(temp == 800)
          temp -=1;
          result[i][parseInt(temp / 100)]++;
      }
    }

    var color = new Array('rgba(210, 214, 222, 1)', 'rgba(135,178,205,1)', 'rgba(60,141,188,1)');
    var color2 = new Array('#3c8dbc', '#0073b7', '#00c0ef');

    var areaData = [];
    for(var i=0; i<datas[0].split(",").length; i++)
      areaData[i] = 
      { 
        label               : '2017년',
        fillColor           : color[i],
        strokeColor         : color[i],
        pointColor          : color[i],
        pointStrokeColor    : color2[i],
        pointHighlightFill  : '#fff',
        pointHighlightStroke: color[i],
        data                : result[i]
      };

    var areaChartData = {
      labels  : ['0', '100', '200', '300', '400', '500', '600', '700'],
      datasets: areaData
    }

    var areaChartOptions = {
      //Boolean - If we should show the scale at all
      showScale               : true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines      : false,
      //String - Colour of the grid lines
      scaleGridLineColor      : 'rgba(0,0,0,.05)',
      //Number - Width of the grid lines
      scaleGridLineWidth      : 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines  : true,
      //Boolean - Whether the line is curved between points
      bezierCurve             : true,
      //Number - Tension of the bezier curve between points
      bezierCurveTension      : 0.3,
      //Boolean - Whether to show a dot for each point
      pointDot                : false,
      //Number - Radius of each point dot in pixels
      pointDotRadius          : 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth     : 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke           : true,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth      : 2,
      //Boolean - Whether to fill the dataset with a color
      datasetFill             : true,
      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio     : true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive              : true
    }

    //Create the line chart
    areaChart.Line(areaChartData, areaChartOptions)
  };