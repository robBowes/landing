$(()=>{
    /*
    * Add CSS file for techno drums
    */
    $('head').append('<link rel="stylesheet" type="text/css" href="/node/public/techno_drums/style.css">');

    $('body').keydown((event)=>{
        const audio = $(`audio[data-key*=${event.keyCode}]`);
        const key = $(`.key[data-key*=${event.keyCode}]`);
        // console.log(event.keyCode);
        if (!audio[0]) return; // if the key has no audio element stop the function
        key.toggleClass('playing');
        audio[0].currentTime = 0; // start the audio from the begining
        // if (audio[0].classList.contains('loop')) audio[0].loop = true;
        audio[0].play();
    });
    /*
    * Remove the playing class once the transform has completed
    */
    $('div.key').on('transitionend', (event)=>{
        if (event.originalEvent.propertyName !== 'transform') return; // only handle transform events
        $(event.currentTarget).removeClass('playing');
    });
    $('audio').on('ended', (event)=>{
        if (event.currentTarget.classList.contains('loop')) {
            console.log('loop this');
            console.log(event.target);
            event.target.play();

        }
    });
})
