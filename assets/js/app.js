// $("#popup-view").on('click', function(event){ 
  
//   event.preventDefault();
//   const stock = $(this).val();
// navigator.geolocation.getCurrentPosition(showPosition);

// function showPosition(position){
//     console.log("Latitude: " + position.coords.latitude);  
//     console.log("Longitude: " + position.coords.longitude); 
// }

const campSites = [];
const queryURL = 'https://developer.nps.gov/api/v1/campgrounds?total=611&api_key=8y6XS6YXPcnGb4WJty65Kktjn72zJhZ4q4jkfzkz';
  
console.log(queryURL);
$.ajax({
  url:queryURL,
  method:"GET" 
}).then(function(response){
console.log(response);
 
console.log(response.data[0]);
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

           },
        };
        
        campSites.push(thisCampSite);
    }
    
//     // let contact = response.data[i].

}

});
// });