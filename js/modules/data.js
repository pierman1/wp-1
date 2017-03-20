var data = (function () {

    var getLocalStorage = function (choice) {

        // get location
        var locationData = localStorage.getItem('location');
        var location = JSON.parse(locationData);

        // fallback when location is not set
        if (!location) {
            var location = "heel-nederland";
        }

        // get kind
        var kind = localStorage.getItem('kind');

        // TODO: if both kinds (extra radio button)

        // get price range
        var minPrice = localStorage.getItem('minPrice');
        var maxPrice = localStorage.getItem('maxPrice');

        // get choice house/apartment
        var choice = localStorage.getItem('choice');

        // build url with filter values
        var url = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/' + APIKEY + '/?type=' + kind + '&zo=/' + location + '/' + minPrice + '+' + maxPrice + '/' + choice;

        // get data with parameter url
            data.list(url, 'overview');
    }

    var list = function (url, section) {

        var stepIndicator = document.querySelector('.step-indicator');
        stepIndicator.classList.add('step-indicator--no-bg');

        // show loader
        loader.show();

        // do the call
        aja()
            .url(url)
            .type('json')
            .cache('false')
            .on('success', function(data) {

                if(section === 'overview') {
                    renderData(data);
                }

                if(section === 'matches') {
                    renderLikes(data);
                }
            })

            .on('error', function () {
                console.log('something went wrong');
            })

            .go()

    }

    var allItems = [];

    var renderData = function (data) {
        console.log(data.Objects);

        var objects = data.Objects;

        var overview = document.querySelector('.objects');

        var likeButton = document.querySelector('#like');


        var directives = {

            objectAdres: {

                text: function (params) {
                   return this.Adres;
                }

            },

            objectPrice : {
                text: function (params) {
                    if (localStorage.getItem('kind') === 'huur') {
                        return '€' + this.Prijs.Huurprijs + this.Prijs.HuurAbbreviation;
                    }

                    else {
                        return ' €' +  this.Koopprijs + ' k.k';
                    }
                }
            },

            objectPostCode :{

                text: function (params) {
                    return this.Postcode;

                }
            },

            objectImage: {

                src: function (params) {
                    return this.FotoLarge;
                }

            },

            objectId: {

                id: function (params) {
                    return this.Id;
                }

            },

            objectUrl: {

                href: function (params) {
                    return '#overview/' + this.Id;
                }

            }

        }


        loader.hide();
        // call Transparency
        Transparency.render(overview, objects, directives);
        like(objects);
    }

    var getDetail = function (objectId) {

        // show loader
        loader.show();

        var kind = localStorage.getItem('kind');

        console.log('getDetail');

        var url = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/' + APIKEY + '/' + kind + '/' + objectId;

        console.log(url);

        aja()
        .url(url)
            .type('json')
            .cache('false')
            .on('success', function(data) {
                detail(data)
            })

            .on('error', function () {
                console.log('something went wrong');
            })

            .go()
    }

    var detail = function (data) {

        console.log(data);
        var detail = document.getElementById('detail');

        var directives = {

            objectName : {
                text: function (params) {
                    return this.Adres;
                }
            },

            objectPostcode : {
                text: function (params) {
                    return this.Postcode + ' ' + this.Woonplaats;
                }
            },

            objectPrice : {
                text: function (params) {

                    if (localStorage.getItem('kind') === 'huur') {
                        return '€' + this.Prijs.Huurprijs + this.Prijs.HuurAbbreviation;
                    }

                    else {
                        return ' €' +  this.Koopprijs + ' k.k';
                    }
                }
            },

            objectImage : {
                src: function (params) {
                    return this.HoofdFoto;
                }
            },

            objectSummary : {
                text: function (params) {
                    return this.VolledigeOmschrijving;
                }
            },

            vraagPrijs : {
                text: function (params) {

                    if (localStorage.getItem('kind') === 'huur') {
                        return 'Huurprijs:  ' + '€ ' + this.Prijs.Huurprijs + this.Prijs.HuurAbbreviation;
                    }

                    else {
                        return 'Vraagprijs:  ' + '€ ' +  this.Koopprijs + ' k.k';
                    }
                }
            },

            aangebodenSinds : {
                text: function (params) {
                    return 'Aangeboden sinds: ' + this.AangebodenSindsTekst;
                }
            },

            status : {
                text: function (params) {
                    return 'Status:  ' + this.VerkoopStatus;
                }
            },

            aanvaarding : {
                text: function (params) {

                    if(!this.Aanvaarding) {
                        return 'Aanvaarding: niet beschikbaar';
                    } else {
                        return 'Aanvaarding: ' + this.Aanvaarding;
                    }

                }
            }

        }

        // hide loader
        loader.hide()

        // render data with transparency js
        Transparency.render(detail, data, directives);

        // routes toggle
        routes.toggle('detail');

    }

    var like = function () {

        var objecten = document.querySelectorAll('.objects__items');

        for(i=0;i<objecten.length;i++) {

            var objectId = objecten[i].id;

            likeClick(objectId)
        }
    }

    var likeClick = function (objectId) {

        var object = document.getElementById(objectId);
        var likeButton = object.querySelector('.like');
        var dislikeButton = object.querySelector('.dislike');

        likeButton.onclick = function () {
            console.log('liked');

            // push liked object to likeObject Array
            likedObjects.push(objectId);

            // store info locally
            localStorage.setItem('likedObjects', likedObjects);

            var objectToHide = document.getElementById(objectId);
            objectToHide.classList.add('objects__items--hide-like');
            objectToHide.remove();

            var kind = localStorage.getItem('kind');

            var url = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/' + APIKEY + '/' + kind + '/' + objectId ;

            list(url, 'matches');
        }

        dislikeButton.onclick = function () {
            var objectToHide = document.getElementById(objectId);
            objectToHide.classList.add('objects__items--hide');
            objectToHide.remove();
        }
    }

    var likedObjects = [];

    var renderLikes = function (data) {

        var section = document.querySelector('#matches .container');

        var match = document.createElement('a');

        var matchTitle = document.createElement('h2');

        match.href = '#overview/' + data.InternalId;

        matchTitle.innerHTML = data.Adres;

        match.appendChild(matchTitle)

        section.appendChild(match);

        constants.noMatchError.remove();

        loader.hide()

    }

    var location = function (location) {
        console.log('data location is called');

        aja()

            .url('http://partnerapi.funda.nl/feeds/Aanbod.svc/json/271175433a7c4fe2a45750d385dd9bfd/?type=koop&zo=/ede/')
            .cache(false)
            .type('jsonp')
            .on('succes', function (data) {
                // data is a javascript object
                console.log(data);
            })

            .on('error', function () {

            })

            .go()

    }

    return {
        // autoSuggest,
        location,
        getLocalStorage,
        renderData,
        list,
        allItems,
        like,
        likeClick,
        likedObjects,
        getDetail,
        detail
    }

})();