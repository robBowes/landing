
$(()=>{
    loadEventHandlers();
});
loadEventHandlers = () =>{
    $('body').on('click', '.clickable', ((event)=>{
        $.ajax({
            url: '/node/',
            type: 'POST',
            data: {'eventId': event.currentTarget.id},
        })
        .done(function(reply) {
            $('#main').html(reply);
            console.log('Request sent to server: ' + event.currentTarget.id);
        })
        .fail(function() {
            console.log('Click event error');
        })
        .always(function() {
            console.log('Click Event');
        });
    }));
};
