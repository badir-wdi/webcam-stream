  var options = {};
  options.app_key = '9a3470f7c66c4d69ad5255f133c1e3ee';
  options.onSuccessCallback = success;
  options.onFailureCallback = failure;
  const emotions = {
    anger: 0, 
    disgust: 0, 
    fear: 0, 
    happiness: 0, 
    sadness: 0, 
    surprise: 0,
    count: 0
  }

function success( result ) {
    const {anger, disgust, fear, happiness, sadness, surprise} = result.people[0].emotions
    emotions.count++
    emotions.anger = (emotions.anger + anger) / emotions.count
    emotions.disgust = (emotions.disgust + disgust) / emotions.count
    emotions.fear = (emotions.fear + fear) / emotions.count
    emotions.happiness = (emotions.happiness + happiness) / emotions.count
    emotions.sadness = (emotions.sadness + sadness) / emotions.count
    emotions.surprise = (emotions.surprise + surprise) / emotions.count
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
    new Chart(document.getElementById("pie-chart"), {
      type: 'pie',
      data: {
        labels: ['anger', 'disgust', 'fear', 'happiness', 'sadness', 'surprise'],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [emotions.anger, emotions.disgust, emotions.fear, emotions.happiness, emotions.sadness, emotions.surprise]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
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




