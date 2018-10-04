// $("#popup-view").on('click', function(event){ 
  
//   event.preventDefault();
//   const stock = $(this).val();
// navigator.geolocation.getCurrentPosition(showPosition);

// function showPosition(position){
//     console.log("Latitude: " + position.coords.latitude);  
//     console.log("Longitude: " + position.coords.longitude); 
// }

const campSites = [];
const queryURL = 'https://developer.nps.gov/api/v1/campgrounds?total=611&fields=addresses&api_key=8y6XS6YXPcnGb4WJty65Kktjn72zJhZ4q4jkfzkz';
  
console.log(queryURL);
$.ajax({
  url:queryURL,
  method:"GET" 
}).then(function(response){
// console.log(response);


for (let i = 0; i < response.data.length; i++){
    let currentItem = response.data[i];
    if ( currentItem.latLong ){
        let thisCampSite = {
            name : currentItem.name,
            description: currentItem.description,
            location:  currentItem.latLong,
            addresses: {
                line: currentItem.addresses[1].line1,
                city: currentItem.addresses[1].city,
                state: currentItem.addresses[1].stateCode,
                zip: currentItem.addresses[1].postalCode
            }, 
            amenities: {
                showers: currentItem.amenities.showers,
                toilets:  currentItem.amenities.toilets,
                internetNetwork: currentItem.amenities.internetConnectivity,
                laundry: currentItem.amenities.laundry,
                cellPhone: currentItem.amenities.cellPhoneReception
            },
           accessibility: {
               roads: currentItem.accessibility.accessRoads,
               cell: currentItem.accessibility.cellPhoneInfo,
               internet: currentItem.accessibility.internetinfo,
               wheelChair: currentItem.accessibility.wheelChairAccess,
               ada: currentItem.accessibility.adaInfo,
               addInfo: currentItem.accessibility.additionalInfo

           }
        }; 
    
        
        campSites.push(thisCampSite);
    }
    
// //     // let contact = response.data[i].
   console.log(response.data[i].name)
}

});
// });
const key = "200367477-2b5b5ee846692e48eb30894d0d0c74ce";
let max = "30";
let pos = {lat: 44.427963, lng: -110.588455}

// Initialize Map
function initMap() {
    var styledMapType = new google.maps.StyledMapType(
        [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#94e4d1"
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
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#ae9e90"
                },
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#94e4d1"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#0c8e56"
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
                  "visibility": "simplified"
                },
                {
                  "weight": 1
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#efefef"
                },
                {
                  "weight": 0.5
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#efefef"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#f4dffb"
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
                  "color": "#3d9cb8"
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
          ],
        {name: 'Styled Map'});

    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };

        // You are Here Marker
        var youAreHere = new google.maps.Marker({position: pos, map: map});
        youAreHere.setMap(map);
        map.setCenter(pos);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });

        
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }     

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: pos,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    // Create infoWindow overlay
    infoWindow = new google.maps.InfoWindow;

    $('#returnloc').on('click',function(){
        map.setCenter(pos);
    });

    $('#populate').on('click',function(){
        let queryURL = `https://www.hikingproject.com/data/get-trails?lat=${pos.lat}&lon=${pos.lng}&maxDistance=${max}&key=${key}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(res){
            for (let i=0; i<res.trails.length; i++) {
                let pos = ({lat: res.trails[i].latitude, lng: res.trails[i].longitude});
                let marker = new google.maps.Marker({position: pos, map: map});
                marker.setMap(map);
            }
        });
    });
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
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





