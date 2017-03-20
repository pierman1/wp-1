var loader = (function () {

    var show = function () {
        constants.loader.classList.remove('hidden');
    };

    var hide = function () {
        constants.loader.classList.add('hidden');
    };

    return {
        show,
        hide
    }

})();