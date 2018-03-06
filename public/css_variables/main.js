$(()=>{
    /*
    * Add CSS file
    */
    $('head').append('<link rel="stylesheet" type="text/css" href="/node/public/css_variables/style.css">');

    const inputs = document.querySelectorAll('.controls input');
    handleUpdate = (event) =>{
        const suffix = event.target.dataset.sizing || '';
        document.documentElement.style.setProperty(`--${event.target.name}`, event.target.value+suffix)
    }
    inputs.forEach(input=>{input.addEventListener('change', handleUpdate)});
    inputs.forEach(input=>input.addEventListener('mousemove', handleUpdate))

});
