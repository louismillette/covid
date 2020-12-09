function HandleCalculator(event){
    event.preventDefault();
    var submission = {
        "percent_tests_asymp": Math.min(window.components.percent_tests_asymp()/100, 0.99),
        "percent_sick_get_test": window.components.percent_sick_get_test()/100
    };
    console.log(submission);
    $(".loading").html('<img src="http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_gray_512.gif" style="width:35px;height:35px;"></img>')
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: "https://c2cjl2yey7.execute-api.us-east-1.amazonaws.com/Covid",
        data: submission,
        jsonpCallback: "localJsonpCallback(",
        error: function(data) {
            $(".loading").html(data.error())
        }
    });
};

function localJsonpCallback(json) {
    if(json.error){
        $(version).find(".loading").html('ERROR: ' + json.error)
        return
    }
    var dates = json["dates"].splice(20, json["dates"].length);
    var covid_given_asym = json["covid_given_asym"].splice(20, json["covid_given_asym"].length);
    var symp_positivity_rate = json["symp_positivity_rate"].splice(20, json["symp_positivity_rate"].length);
    for (var i = covid_given_asym.length - 1; i >= 0; i--) {
        covid_given_asym[i] = 100 * covid_given_asym[i];
        symp_positivity_rate[i] = 100 * symp_positivity_rate[i];
    }
    $(".loading").html('');
    var start = (new Date(dates[0])).valueOf();
    series1=[{
        name:'Odds of Testing Positive, Given No Symotoms',
        type:'area',
        fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 1,
                y2: 1
            },
            stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
        },
        data: symp_positivity_rate,
        pointStart: start,
        pointIntervalUnit: 'day'
    }] 
    series2 = [{
            name:'Odds of Testing Positive, Given Symptoms',
            type:'area',
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[1]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0).get('rgba')]
                ]
            },
            data: covid_given_asym,
            pointStart: start,
            pointIntervalUnit: 'day'
    }];   

    $('#graphcontainer').html(
        '<div class="calc-container">' + 
            '<div id="mainchart1" style="min-width: 310px; height: 400px; margin: 0 auto"></div>' + 
            '<div id="mainchart2" style="min-width: 310px; height: 400px; margin: 0 auto"></div>' + 
        '</div>');
    graphCovid(series1, 'Maximum Rate of Covid Amoungst Symptomatic People in Rhode Island', 'The actual rate is gaurenteed lower, but not higher', 'mainchart1');
    graphCovid(series2, 'Maximum Rate of Covid Amoungst Asymptomatic People in Rhode Island', 'The actual rate is gaurenteed lower, but not higher', 'mainchart2');
}

function graphCovid(series, title, subtitle, id) {
    Highcharts.stockChart(id, {
        rangeSelector: {
            buttons: [{
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 2,
            inputEnabled: false
        },
        title:{
            text: title
        },
        subtitle:{
            text: subtitle
        },
        yAxis: {
            labels: {
                formatter: function () {
                    return  (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        xAxis: {
            type: 'date',
            title: {
                text: 'Date'
            },
        },
        plotOptions: {
            series: {
                showInNavigator: true,
                allowPointSelect: true,
            },
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} %</b> <br/>',
            valueDecimals: 4,
            split: true,
        },
        series: series
    });
};

function graphMoneyHist(version, series, title, subtitle){
    Highcharts.chart('histogram', {
        chart: {
            type: 'column',
        },
        title:{
            text: title
        },
        subtitle:{
            text: subtitle
        },
        xAxis: {
            title: { text: 'Returns' }
        },
        yAxis: {
            title: { text: 'Frequency' }
        },
        series: series
    });
}

//all credit to these guys for this function -> https://www.highcharts.com/blog/post/213-histogram-when-why-how/ 
function binData(data) {

  var hData = new Array(), //the output array
    size = data.length, //how many data points
    bins = Math.round(Math.sqrt(size)); //determine how many bins we need
  bins = bins > 50 ? 50 : bins; //adjust if more than 50 cells
  var max = Math.max.apply(null, data), //lowest data value
    min = Math.min.apply(null, data), //highest data value
    range = max - min, //total range of the data
    width = range / bins, //size of the bins
    bin_bottom, //place holders for the bounds of each bin
    bin_top;

  //loop through the number of cells
  for (var i = 0; i < bins; i++) {

    //set the upper and lower limits of the current cell
    bin_bottom = min + (i * width);
    bin_top = bin_bottom + width;

    //check for and set the x value of the bin
    if (!hData[i]) {
      hData[i] = new Array();
      hData[i][0] = bin_bottom + (width / 2);
    }

    //loop through the data to see if it fits in this bin
    for (var j = 0; j < size; j++) {
      var x = data[j];

      //adjust if it's the first pass
      i == 0 && j == 0 ? bin_bottom -= 1 : bin_bottom = bin_bottom;

      //if it fits in the bin, add it
      if (x > bin_bottom && x <= bin_top) {
        !hData[i][1] ? hData[i][1] = 1 : hData[i][1]++;
      }
    }
  }
  $.each(hData, function(i, point) {
    if (typeof point[1] == 'undefined') {
      hData[i][1] = 0;
    }
  });
  return hData;
}

HandleCalculator();