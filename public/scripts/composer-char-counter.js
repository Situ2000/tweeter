$(document).ready(function () {
    const textarea = $('#text');
    const characterCount = $('#character-count');


    function setCount() {
        const words = textarea.val().length;

        characterCount.text(140 - words);

        // Add or remove the "red" class based on the character
        if (words > 140) {
            characterCount.addClass('red');
        } else {
            characterCount.removeClass('red');
        }

    }
    setCount()
    textarea.on('input', setCount);

});
