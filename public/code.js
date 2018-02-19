
$(()=>{
    loadEventHandlers();

})
loadEventHandlers = () =>{
    $('.clickable').click((event)=>{
        $.ajax({
            url: '/node/',
            type: 'POST',
            // dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {'eventId': event.currentTarget.id},
        })
        .done(function(reply) {
            $('#main').html(reply);
            loadEventHandlers();
            console.log('Request sent to server: ' + event.currentTarget.id);
        })
        .fail(function() {
            console.log('Click event error');
        })
        .always(function() {
            //console.log('Click Event');
        });
    });
};
