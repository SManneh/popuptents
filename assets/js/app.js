 JoshuaMapsFunctions
const key = "200367477-2b5b5ee846692e48eb30894d0d0c74ce";
let max = "30";


// Initialize Map
function initMap() {
    let pos = {lat: 44.427963, lng: -110.588455}
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: pos
    });
   

    // Create infoWindow overlay
    infoWindow = new google.maps.InfoWindow;
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
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



console.log(pos);
let queryURL = `https://www.hikingproject.com/data/get-trails?lat=${pos.lat}&lon=${pos.lng}&maxDistance=${max}&key=${key}`;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(res){
    console.log(res);
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

//Animate the cancel, filter, search buttons to disappear upon cancel click.
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
})



