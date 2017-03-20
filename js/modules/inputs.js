var inputs = (function () {

    var location = function () {
        constants.inputElements.locationElements.submit.onclick = function () {

            // get value from input field
            var value = constants.inputElements.locationElements.input.value;

            // store value locally
            localStorage.setItem('location', JSON.stringify(value));

        }
    };

    var kind = function () {
        constants.inputElements.kindElements.submit.onclick = function () {
            console.log(constants.inputElements.kindElements.inputs);

            var inputs = constants.inputElements.kindElements.inputs;

            for(i=0;i<inputs.length;i++) {

                // get checked radio button
                if (inputs[i].checked) {

                    //store value in local storage
                    var value = inputs[i].value;
                    localStorage.setItem('kind', value);

                    //stop loop, only one radio button can be checked
                    break;

                }
            }
        }
    };

    var price = function () {

            var kind = localStorage.getItem('kind');

            // check if kind is "huur" or "koop"
            if(kind == 'koop'){
                console.log('kind is koop');
                constants.inputElements.priceElements.buy.classList.remove('hidden');
                constants.inputElements.priceElements.rent.classList.add('hidden');
            }

            if (kind == 'huur') {
                console.log('kind is huur');
                constants.inputElements.priceElements.buy.classList.add('hidden');
                constants.inputElements.priceElements.rent.classList.remove('hidden');
            }

        constants.inputElements.priceElements.submit.onclick = function () {

            if(kind == 'koop'){
                // hide/show kind price selectors
                localStorage.setItem('minPrice', constants.inputElements.priceElements.inputMinBuy.value);
                localStorage.setItem('maxPrice', constants.inputElements.priceElements.inputMaxBuy.value);
            }

            if (kind == 'huur'){
                // hide/show kind price selectors
                localStorage.setItem('minPrice', constants.inputElements.priceElements.inputMinRent.value);
                localStorage.setItem('maxPrice', constants.inputElements.priceElements.inputMaxRent.value);
            }
        }

    };

    var buyOrRent = function () {
      var choice = localStorage.getItem('choice');

        constants.inputElements.buyOrRentElements.submit.onclick = function () {

            var inputs = constants.inputElements.buyOrRentElements.inputs;

            for(i=0;i<inputs.length;i++) {

                // get checked radio button
                if (inputs[i].checked) {

                    //store value in local storage
                    var value = inputs[i].value;
                    localStorage.setItem('choice', value);

                    //stop loop, only one radio button can be checked
                    break;

                }
            }

            // call loader();
            startLoader();

        }

    };

    var startLoader = function () {
        
            var getListButton = document.querySelector('#start-loader .submit');

            getListButton.onclick = function () {

                data.getLocalStorage();

            }
        
    };

    // TODO: PUT THIS IN IN LOADER.JS AND THINK ABOUT IT..


    return {

        location,
        kind,
        price,
        buyOrRent,
        startLoader

    }

})();