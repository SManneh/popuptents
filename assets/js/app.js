const key = "200367477-2b5b5ee846692e48eb30894d0d0c74ce";
let max = "30";
let pos = {lat: 44.427963, lng: -110.588455}



// Initialize Map
function initMap() {
  var infoWindow = new google.maps.InfoWindow;
  var trails = new Array ([]);
  var trailsObject;
  var isPopulated = false;
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
      pos = {
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

  // Initialize Map
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: pos,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
  });

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  // Style Map
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  // Reset view to current location.
  $('#returnloc').on('click',function(){
      map.setCenter(pos);
  });
  
  //
  map.addListener('center_changed'&&'idle',function(){
    pos = map.getCenter();
    infoWindow.setPosition(pos);
    infoWindow.setContent('Click populate to search here.');
    infoWindow.open(map);
  });

  $('#populate').on('click',function(){
      // Remove markers from map
      if(isPopulated) {
          for (let i=0; i<trails.length; i++) {
              trails[i].setMap(null);
          }
          // Reset length of marker array
          trails = [];
          isPopulated = false;
      }
      //Set lat and lng as a number for queryURL
      let lat = map.getCenter().lat();
      let lng = map.getCenter().lng();
      let queryURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=30&key=200367477-2b5b5ee846692e48eb30894d0d0c74ce`;
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(res){
          //Save GET data to object for Team use to display data
          trailsObject = res;
          //Place markers for nearby trails
          for (let i=0; i<res.trails.length; i++) {
              let pos = ({lat: res.trails[i].latitude, lng: res.trails[i].longitude});
              trails[i] = new google.maps.Marker({position: pos, map: map});
              trails[i].setMap(map);
          }
      //set flag to track whether markers have been created once before.
      isPopulated = true;
      });
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





