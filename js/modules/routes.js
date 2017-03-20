var routes = (function () {

    var init = function () {
        console.log('routes called');

        // set route #start as default

        routie({

            'start': function () {
                var hashName = this.path;
                routes.toggle(hashName);
                // console.log(this.path);
            },

            'location': function () {
                var hashName = this.path;
                routes.toggle(hashName);
                // call data.autoSuggest
            },

            'kind': function () {
                var hashName = this.path;
                routes.toggle(hashName);
            },

            'price': function () {
                var hashName = this.path;
                // get inputs by kind
                inputs.price();

                routes.toggle(hashName);
            },

            'buy-rent': function () {
                var hashName = this.path;
                // get inputs by kind
                // inputs.price();

                routes.toggle(hashName);
            },

            'start-loader': function () {
                var hashName = this.path;

                routes.toggle(hashName);
            },

            'overview': function () {
                var hashName = this.path;

                routes.toggle(hashName);
            },
            
            'overview/:id' : function (objectId) {
                var hashName = this.path;

                data.getDetail(objectId);
                routes.toggle(hashName);
            },

            'overview/*' : function () {
                var hashName = this.path;

                routes.toggle(hashName);
            },

            'matches' : function () {
                var hashName = this.path;

                routes.toggle(hashName);
            }
        });
    }

    var toggle = function (activeSection) {

        var allSections = document.querySelectorAll('section');
        var activeSection = document.getElementById(activeSection);

        // add class hidden to hide sections
        for (i=0; i<allSections.length; i++) {
            allSections[i].classList.add('hidden');
        }


        if(activeSection) {
            // remove class hidden for the active section
            activeSection.classList.remove('hidden');

        } else {
            console.log('else');
        }

    }

    return {
        init,
        toggle
    }

})();
