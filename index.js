  var options = {};
  options.app_key = '9a3470f7c66c4d69ad5255f133c1e3ee';
  options.onSuccessCallback = success;
  options.onFailureCallback = failure;
  

  function success( result ) {
    const {anger, disgust, fear, happiness, sadness, surprise} = result.people[0].emotions
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    
    // Add data
    chart.data = [{
      "emotion": "anger",
      "expression": anger
    }, {
      "emotion": "disgust",
      "expression": disgust
    }, {
      "emotion": "fear",
      "expression": fear
    }, {
      "emotion": "happiness",
      "expression": happiness
    }, {
      "emotion": "sadness",
      "expression": sadness
    }, {
      "emotion": "surprise",
      "expression": surprise
    },
    {
      "emotion": "",
      "expression": 90
    }
  ];
    
    // Create axes
    
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "emotion";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    
    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      if (target.dataItem && target.dataItem.index & 2 == 2) {
        return dy + 25;
      }
      return dy;
    });
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "expression";
    series.dataFields.categoryX = "emotion";
    series.name = "Expression";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;
    
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
  }

  function failure( errorCode, errorString ) {
    // alert( errorString );
  }

  function sendDetectRequest() {
    var img = document.querySelector( "#img_snapshot" );
    // Check if a snapshot has been taken
    if( img.naturalWidth == 0 ||  img.naturalHeight == 0 )
      return;
    options.img = FACE.util.dataURItoBlob( img.src );
    FACE.sendFaceRequest( options );
  }

  function startCapture() {
    FACE.webcam.startPlaying( "webcam_preview" );
    setInterval( function()
    {
      FACE.webcam.takePicture( "webcam_preview", "img_snapshot" );
      sendDetectRequest();
    },
    1100 );
  }

  // Trigger the start
  $( document ).ready( function() {
    if( options.app_key == '' ) {
      alert( 'Please specify your keys in the source' );
    } else {
      startCapture();
    }
  });
