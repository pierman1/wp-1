var constants = (function () {

    var loader = document.querySelector('#loader');

    var noMatchError = document.querySelector('#matches .error');

    var inputElements = (function () {

        var locationElements = (function () {

            var input = document.querySelector('#location .input');
            var submit = document.querySelector('#location .submit');

            return {
                input,
                submit
            };

        })();

        var kindElements = (function () {

            var inputs = document.querySelectorAll('#kind input[type="radio"]');
            var submit = document.querySelector('#kind .submit');

            return {
                submit,
                inputs
            };

        })();

        var priceElements = (function () {

            var buy = document.querySelector('.price-buy');
            var rent = document.querySelector('.price-rent');

            var submit = document.querySelector('#price .submit');
            var elements = document.querySelectorAll('#price form > div');
            var inputMinBuy = document.querySelector('#price #min-price-buy');
            var inputMaxBuy = document.querySelector('#price #max-price-buy');
            var inputMinRent= document.querySelector('#price #min-price-rent');
            var inputMaxRent = document.querySelector('#price #max-price-rent');

            return {
                buy,
                rent,
                submit,
                elements,
                inputMinBuy,
                inputMaxBuy,
                inputMinRent,
                inputMaxRent
            };

        })();

        var buyOrRentElements = (function () {

            var inputs = document.querySelectorAll('#buy-rent input[type="radio"]');
            var submit = document.querySelector('#buy-rent .submit');

            return {
                submit,
                inputs
            };

        })();

        var likeElements = (function () {

            var like = document.querySelector('.objects__items .like');
            var dislike = document.querySelector('.objects__items .dislike');
            
            console.log(like);

            return {
                like,
                dislike
            }

        })();

        return {
            locationElements,
            kindElements,
            priceElements,
            buyOrRentElements,
            likeElements
        }

    })();

    return {
        loader,
        inputElements,
        noMatchError
    }

})();