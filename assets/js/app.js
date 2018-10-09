
const hikeTrails = []
const detailTrails = []
const trailURL = 'https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200370659-aecb67928b596e09a75b40d671f08d13'

$.ajax({
  url: trailURL,
  method: "GET"
}).then(function(response){
  // console.log(response);
  
  for (let i = 0; i < response.trails.length; i++){
    let popUp = { 
    tName : response.trails[i].name,
     tLength : response.trails[i].length,
     tDifficulty : response.trails[i].difficulty,
     tLong : response.trails[i].longitude,
     tLat : response.trails[i].latitude,
     tUrl: response.trails[i].url
  }
  hikeTrails.push(popUp);

   let moreDetails = {
    tName : response.trails[i].name,
    tLength : response.trails[i].length,
    tDifficulty : response.trails[i].difficulty,
    tLong : response.trails[i].longitude,
    tLat : response.trails[i].latitude,
    tUrl: response.trails[i].url,
    tSummary: response.trails[i].summary,
    tConditionStatus: response.trails[i].conditionStatus,
    tConditionDetails: response.trails[i].conditionDetails,
    tConditionDate: response.trails[i].conditionDate

   }
  //  console.log(moreDetails)
  detailTrails.push(moreDetails);
  // console.log(detailTrails)

  }
});



var campSite = [];
const queryURL = `https://ridb.recreation.gov/api/v1/facilities?activity=9&longitude=${lng}&latitude=${lat}&radius=30&apikey=38BDFB83F3714D9D9CBB807B847E4340`;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response){
  console.log(response);
})

// var modelCampSite =
//   { 
//     name: '', 
//     description: '',
//     location:  '',
//     addresses: ''
//   [{
//       line: '',
//       city: '',
//       state: '',
//       zip: ''
//     }],
// amenities: [{
//     showers: '',
//     toilets:  '',
//     internetNetwork: '',
//     laundry: '',
//     cellPhone: ''
// }],
// accessibility: [{
//    roads: '',
//    cell: '',
//    internet: '',
//    wheelChair: '',
//    ada: '',
//    addInfo: '' 
//   }]
// }];

var thisCampsite = [];


const key = "200367477-2b5b5ee846692e48eb30894d0d0c74ce";
let max = "30";
let pos = {lat: 44.427963, lng: -110.588455}
var trailsIcon;
var runOnce = false;  

// Initialize Map
function initMap() {
  var infoWindow = new google.maps.InfoWindow;

  var youAreHere;
  var trailDifficulty = [true, true, true];
  var trailLow = 0;
  var trailHigh = 20;
  var trails = [];
  var trailsPopulated = false;
  var trailsObject;
  var trailsIcon = {
    url: "./assets/media/hiker.png",
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 30)
  };
  var trShape = {
    coords: [1, 1, 1, 30, 30, 30, 30, 1],
    type: 'poly'
  };

  var camps = [];
  var campsPopulated = false;
  var campsObject;
  var campsIcon = {
    url: "./assets/media/campfire.png",
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 30)
  };
  var cmpShape = {
    coords: [1, 1, 1, 30, 30, 30, 30, 1],
    type: 'poly'
  };


  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
  )

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
          };
      // You are Here Marker
      youAreHere = new google.maps.Marker({position: pos, map: map});
      youAreHere.setMap(map);
      map.setCenter(pos);
      }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
      });
  } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
      youAreHere = new google.maps.Marker({position: pos, map: map});
  }     

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
  // Initialize Map
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: pos,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
  });

  // Style Map
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  // Reset view to current location.
  $('#returnBtn').on('click',function(){
      map.setCenter(youAreHere.position);
  });
  
  //
  map.addListener('center_changed'&&'dragend',function(){
    pos = map.getCenter();
  });

  $("#form-d").submit(function(event){
    event.preventDefault();
    let address = $("#locationinput-d").val().trim();
    queryURL=`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCyHsn9dQoGsrijNRNtLiPTaILSC3Xkj3g`;
    searchByAddress(queryURL);
    }); 
  
  $("#form").submit(function(event){  
    event.preventDefault();
    let address = $("#locationinput").val().trim();
    queryURL=`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCyHsn9dQoGsrijNRNtLiPTaILSC3Xkj3g`;
    searchByAddress(queryURL);
  });
  
  //Filter save changes.
  $("#save-changes").click(function(event){
    event.preventDefault;
    trailDifficulty = [];
    if($("#easy").is(':checked')) {
      trailDifficulty.push(true);
    } else trailDifficulty.push(false);
    if($("#medium").is(':checked')) {
      trailDifficulty.push(true);
    } else trailDifficulty.push(false);
    if($("#difficult").is(':checked')) {
      trailDifficulty.push(true);
    } else trailDifficulty.push(false);
    console.log(trailDifficulty);
    trailLow = parseInt($('#distance').val());
    trailHigh = parseInt($('#distancehigh').val());
    });
  
    $("#save-changes-d").click(function(event){
      event.preventDefault;
      trailDifficulty = [];
      if($("#easy-d").is(':checked')) {
        trailDifficulty.push(true);
      } else trailDifficulty.push(false);
      if($("#medium-d").is(':checked')) {
        trailDifficulty.push(true);
      } else trailDifficulty.push(false);
      if($("#difficult-d").is(':checked')) {
        trailDifficulty.push(true);
      } else trailDifficulty.push(false);
      console.log(trailDifficulty);
      trailLow = parseInt($('#distance-d').val());
      trailHigh = parseInt($('#distancehigh-d').val());
      });
  
  function searchByAddress(queryURL){
    $.ajax({
      url:queryURL,
      method:"GET" 
    }).then(function(response){
      pos = response.results[0].geometry.location;
      map.setCenter(pos);
    });
  }


  $('#populate').on('click',function(){
    
    function placeMarkers(i, counter){
      let pos = ({lat: trailsObject[i].latitude, lng: trailsObject[i].longitude});
      trails.push(new google.maps.Marker({
        icon: trailsIcon,
        shape: trShape,
        title: trailsObject[i].name,
        position: pos,
        map: map
      }));
      //This is the marker name.
      $(this).addClass(`hiker${i}`);
      trails[counter].setMap(map);
      console.log(trails[counter]);
      return counter++;
    }

    if($('#campgrounds').is(':checked')&&$('#campgrounds-d').is(':checked')){
      // Remove markers from map
      if(campsPopulated) {
        for (let i=0; i<camps.length; i++) {
          camps[i].setMap(null);
        }
        // Reset length of marker array
        camps = [];
        campsPopulated = false;
      }
      //Set lat and lng as a number for queryURL
      let lat = Number(map.getCenter().lat());
      let lng = Number(map.getCenter().lng());
      console.log(lat);
      let queryURL = `https://ridb.recreation.gov/api/v1/facilities?activity=9&longitude=${lng}&latitude=${lat}&radius=30&apikey=38BDFB83F3714D9D9CBB807B847E4340`;
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(res){
          //Save GET data to object for Team use to display data
          console.log(res);
          campsObject = res.RECDATA;
          //Place markers for nearby trails
          for (let i=0; i<campsObject.length; i++) {
              let pos = ({lat: campsObject[i].FacilityLatitude, lng: campsObject[i].FacilityLongitude});
              camps[i] = new google.maps.Marker({
                icon: campsIcon,
                shape: cmpShape,
                title: campsObject[i].FacilityName,
                position: pos,
                map: map
              });
              //This is the marker name.
              $(this).addClass(`campfire${i}`);
              camps[i].setMap(map);
          }
      //set flag to track whether markers have been created once before.
      campsPopulated = true;
      });
    } else {
      for (let i=0; i<camps.length; i++) {
        camps[i].setMap(null);
      }
      // Reset length of marker array
      camps = [];
      campsPopulated = false;
    }
    
    if($('#trails').is(':checked')&&$('#trails-d').is(':checked')){
      // Remove markers from map
      if(trailsPopulated) {
        for (let i=0; i<trails.length; i++) {
          trails[i].setMap(null);
        }
        // Reset length of marker array
        trails = [];
        trailsPopulated = false;
      }
      //Set lat and lng as a number for queryURL
      let lat = map.getCenter().lat();
      let lng = map.getCenter().lng();
      let queryURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=30&key=200367477-2b5b5ee846692e48eb30894d0d0c74ce`;
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(res){
        //Filtering difficulty and length for trails.
        trailsObject = res.trails;
        let counter = 0;
          for(let i = 0; i<trailsObject.length; i++) {
            let check = ["green", "blue", "black"];
            for(let j = 0; j<trailDifficulty.length; j++) {
              if(trailDifficulty[j]) {
                if((trailsObject[i].difficulty.indexOf(check[j]) === 0) && (parseInt(trailsObject[i].length)>=trailLow && parseInt(trailsObject[i].length) <= trailHigh)) {
                  //Place markers for nearby trails
                  placeMarkers(i, counter);
                } 
              }
            }
          }
      //set flag to track whether markers have been created once before.
      trailsPopulated = true;
      trailsObject = [];
      });
    } else {
    for (let i=0; i<trails.length; i++) {
      trails[i].setMap(null);
    }
  
    // Reset length of marker array
    trailsPopulated = false;
    } 
  });
}




//Animate the cancel, filter, search buttons to appear upon input focus
$('#locationinput').on('focus', function(){
  if ($('#buttons').css("opacity")==="0"){
      $('#buttons').animate({
          opacity: "+=1",
      }, 250, function(){

      });
      $('#logo').animate({
          opacity: "-=1",
      }, 250, function(){

      });
  };
  $('#collapseOne').collapse('show');
});

//Animate the cancel, filter, search buttons to disappear upon cancel
$('#cancel').on('click', function(){
  $('#buttons').animate({
      opacity:"-=1",
  }, 250, function(){

  });
  $('#logo').animate({
      opacity: "+=1",
  }, 250, function(){
      
  });
  $('#collapseOne').collapse('hide');
});



$("#distance").on('input', function(){
  $('.minval').text($('#distance').val() + " Miles");
  let minval = parseInt($('#distance').val());
  let maxval = parseInt($('#distancehigh').val());
  if (minval >= (maxval-1)){
    $('#distance').prop("value", (maxval-1));
    $('.minval').text((maxval-1)+ " Miles");
    event.stopPropagation;
    return;
  };
});

$("#distancehigh").on('input', function(){
  $('.maxval').text($('#distancehigh').val() + " Miles");
  let minval = parseInt($('#distance').val());
  let maxval = parseInt($('#distancehigh').val());
  if (maxval <= minval + 1){
    $('#distancehigh').prop("value", (minval + 1));
    $('.maxval').text((minval+1)+ " Miles");
    event.stopPropagation();
    return;
  };
});

$('.reset').on('click', function(){
  $('.minval').text("0 Miles");
  $('.maxval').text("20 Miles");
});
 
$("#distance-d").on('input', function(){
  $('.minval-d').text($('#distance-d').val() + " Miles");
  let minval = parseInt($('#distance-d').val());
  let maxval = parseInt($('#distancehigh-d').val());
  if (minval >= (maxval-1)){
    $('#distance-d').prop("value", (maxval-1));
    $('.minval-d').text((maxval-1)+ " Miles");
    event.stopPropagation;
    return;
  };
});

$("#distancehigh-d").on('input', function(){
  $('.maxval-d').text($('#distancehigh-d').val() + " Miles");
  let minval = parseInt($('#distance-d').val());
  let maxval = parseInt($('#distancehigh-d').val());
  if (maxval <= minval + 1){
    $('#distancehigh-d').prop("value", (minval + 1));
    $('.maxval-d').text((minval+1)+ " Miles");
    event.stopPropagation();
    return;
  };
});

$('.reset-d').on('click', function(){
  $('.minval-d').text("0 Miles");
  $('.maxval-d').text("20 Miles");
});





