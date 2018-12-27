function morrisAreaChart (data) {
    "use strict";

    var result17 = new Array();
    var result18 = new Array();
    var data17 = new Array();
    var data18 = new Array();

    var datas = JSON.parse(data);

    for(var i=0; i<8; i++) {
      result17[i] = 0;
      result18[i] = 0;
    }

    for(var i=0; i<datas.length; i++) {
      data17[i] = datas[i].split(",")[0];
      data18[i] = datas[i].split(",")[1];
    }

    for(var i=0; i<datas.length; i++) {

      var temp = data17[i]*1;
      if(temp == 800)
        temp -=1;
      result17[parseInt(temp / 100)]++;

      temp = data18[i]*1;
      if(temp == 800)
        temp -=1;
      result18[parseInt(temp / 100)]++;
    }
    console.log(result17 + result18);
    // AREA CHART
    var area = new Morris.Area({
      element: 'revenue-chart',
      resize: true,
      data: [
        {y: '100', item1: result17[0], item2: result18[0]},
        {y: '200', item1: result17[1], item2: result18[1]},
        {y: '300', item1: result17[2], item2: result18[2]},
        {y: '400', item1: result17[3], item2: result18[3]},
        {y: '500', item1: result17[4], item2: result18[4]},
        {y: '600', item1: result17[5], item2: result18[5]},
        {y: '700', item1: result17[6], item2: result18[6]},
        {y: '800', item1: result17[7], item2: result18[7]}
      ],
      xkey: 'y',
      ykeys: ['item1', 'item2'],
      labels: ['2017년', '2018년'],
      lineColors: ['#a0d0e0', '#3c8dbc'],
      hideHover: 'auto'
    });
};