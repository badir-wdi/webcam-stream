  var options = {};
  options.app_key = '9a3470f7c66c4d69ad5255f133c1e3ee';
  options.onSuccessCallback = success;
  options.onFailureCallback = failure;
  

function success( result ) {
    const {anger, disgust, fear, happiness, sadness, surprise} = result.people[0].emotions

    // Here put your chart
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['anger', 'disgust', 'fear', 'happiness', 'sadness', 'surprise'],
            datasets: [{
                label: '# of Votes',
                data: [anger, disgust, fear, happiness, sadness, surprise],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        
        options: {
          maintainAspectRatio: false,
          responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        
        

    });
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
