function pieChart (data) {
    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
    var pieChart       = new Chart(pieChartCanvas)

    var dataYear = new Array();
    var dataCount = new Array();

    var datas;
    if(Array.isArray(data) == false)
      datas = JSON.parse(data);
    else
      datas = data;

    for(var i=0; i<datas.length; i++) {
      dataYear[i] = datas[i].split(",")[0];
      dataCount[i] = datas[i].split(",")[1];
    }

    for(var i=0; i<datas.length; i++) {
      dataYear[i] = dataYear[i]*1;
      dataCount[i] = dataCount[i]*1;
    }
    
    var PieData        = [
      {
        value    : dataCount[0],
        color    : '#f56954',
        highlight: '#f56954',
        label    : '1학년'
      },
      {
        value    : dataCount[1],
        color    : '#00a65a',
        highlight: '#00a65a',
        label    : '2학년'
      },
      {
        value    : dataCount[2],
        color    : '#f39c12',
        highlight: '#f39c12',
        label    : '3학년'
      },
      {
        value    : dataCount[3],
        color    : '#00c0ef',
        highlight: '#00c0ef',
        label    : '4학년'
      }
    ]
    var pieOptions     = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke    : true,
      //String - The colour of each segment stroke
      segmentStrokeColor   : '#fff',
      //Number - The width of each segment stroke
      segmentStrokeWidth   : 2,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 50, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps       : 100,
      //String - Animation easing effect
      animationEasing      : 'easeOutBounce',
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate        : true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale         : false,
      //Boolean - whether to make the chart responsive to window resizing
      responsive           : true,
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio  : true
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions)
  };