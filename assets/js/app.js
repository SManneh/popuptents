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


