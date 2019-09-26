  var options = {};
  options.app_key = '9a3470f7c66c4d69ad5255f133c1e3ee';
  options.onSuccessCallback = success;
  options.onFailureCallback = failure;
  

  function success( result ) {
    const {anger, disgust, fear, happiness, sadness, surprise} = result.people[0].emotions
    // Here put your chart
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
