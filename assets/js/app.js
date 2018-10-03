// $("#popup-view").on('click', function(event){ 
  
//   event.preventDefault();
//   const stock = $(this).val();
navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position){
    console.log("Latitude: " + position.coords.latitude);  
    console.log("Longitude: " + position.coords.longitude); 
}

const campSites = [];
  const queryURL = `https://developer.nps.gov/api/v1/campgrounds?stateCode=tx&api_key=8y6XS6YXPcnGb4WJty65Kktjn72zJhZ4q4jkfzkz`;
// console.log(stock);
console.log(queryURL);
$.ajax({
  url:queryURL,
  method:"GET" 
}).then(function(response){

 
console.log(response.data[0]);
for (let i = 0; i < response.data.length; i++){
    let currentItem = response.data[i];
    if ( currentItem.latLong ){
        let thisCampSite = {
            name : currentItem.name,
            location:  currentItem.latLong,
            amenities: {
                showers: currentItem.amenities.showers,
                toilets:  currentItem.amenities.toilets,
                internet: currentItem.amenities.internetConnectivity,
                laundry: currentItem.amenities.laundry,
                cellPhone: currentItem.amenities.cellPhoneReception
            },
            description: currentItem.description
        };
        
        campSites.push(thisCampSite);
    }
    
    // let contact = response.data[i].

}

})
// });