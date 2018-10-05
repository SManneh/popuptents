const queryURL = 'https://api.nps.gov/api/v1/campgrounds?total=611&fields=addresses&fields=contact&fields=operating%20hours&fields=fee&fields=photoapi_key=8y6XS6YXPcnGb4WJty65Kktjn72zJhZ4q4jkfzkz'
//'https://developer.nps.gov/api/v1/campgrounds?total=611&fields=addresses&api_key=8y6XS6YXPcnGb4WJty65Kktjn72zJhZ4q4jkfzkz';

let currentLocation = {};

    //Location function
    function findPosition() 
    {
        if (navigator.geolocation) {
    
            navigator.geolocation.getCurrentPosition(getCampsites);
            
        } else {
            console.log("Geolocation is not supported by this browser!");
        }
        
    }
    
    //stores current position coordinates in variables                      
    let currentlat = position.coords.latitude;
    let currentlong = position.coords.longitude;
    
function getCampsites()
{

    $.ajax({
    url: queryURL,

    method: "GET"
    }).then(function(response){

    console.log(response);

    //variable to store response object elements
    currentLocation = response;


     for (i = 0; i < response.length; i++)
        {
            const longCamp = response.data[i].latlong.lng;
            const latCamp = response.data[i].latlogn.lat;

           let latright = currentlat + 30;
           let latleft = currentlat - 30;
           let longright = currentlong + 30;
           let longleft = currentlong - 30;

         if (latCamp <= latright && latCamp >= latleft|| longCamp <= longright && longCamp >= longleft)
             {
                 //modal #1
                $('#exampleModalLabel').append(`<b>${response.data[i].name}</b>`);
                $('#quickview-btn').append(response.data[i].name);
                $('.modal-body').append(`<b>Address</b><br/> ${response.data[i].addresses[1].line1}<br/>`);
                $('.modal-body').append(` ${response.data[i].addresses[1].city},`);
                $('.modal-body').append(` ${response.data[i].addresses[1].stateCode}`);
                $('.modal-body').append(` ${response.data[i].addresses[1].postalCode}<br/><br/>`);
   
  
                //modal #2 (more details button)
                $('#modal2-header').append(`<b>${response.data[i].name}</b>`);
                // $('#modal2-body').append(`<b>Address</b><br/> ${currentLocation.data[0].addresses[1].line1}<br/>`);
                // $('#modal2-body').append(` ${currentLocation.data[0].addresses[1].city},`);
                // $('#modal2-body').append(` ${currentLocation.data[0].addresses[1].stateCode}`);
                // $('#modal2-body').append(` ${currentLocation.data[0].addresses[1].postalCode}<br/><br/>`);
                $('#modal2-body').append(`<b>Park Code</b><br/>${response.data[i].parkCode}<br/><br/>`);
                $('#modal2-body').append(`<b>Description</b><br/>${response.data[i].description}`);

            }    

    }

    
    });
}
