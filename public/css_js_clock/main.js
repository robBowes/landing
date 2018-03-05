$(()=>{
    /*
    * Add CSS file for techno drums
    */
    $('head').append('<link rel="stylesheet" type="text/css" href="/node/public/css_js_clock/style.css">');
    setDate = () =>{
        const now = new Date();
        const secondsDegrees = ((now.getSeconds() / 60)*360)+90;
        const minutesDegrees = ((now.getMinutes()/60)*360)+90;
        const hoursDegrees = (((now.getHours()-12)/12)*360)+90;
        $('#second-hand').css('transform', `rotate(${secondsDegrees}deg)`);
        $('#min-hand').css('transform', `rotate(${minutesDegrees}deg)`);
        $('#hour-hand').css('transform', `rotate(${hoursDegrees}deg)`);

    }
    setInterval(setDate, 1000);
});
