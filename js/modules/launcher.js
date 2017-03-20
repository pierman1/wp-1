'use strict'

window.location.hash = '#start';

var launcher = (function () {

    var init = function () {
        routes.init();

        inputs.location();
        inputs.kind();
        inputs.buyOrRent();

    }

    return {
        init
    }

})();

launcher.init()