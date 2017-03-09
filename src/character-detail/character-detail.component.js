/**
 * Created by steal on 05.03.2017.
 */
'use strict';

// Register `characterDetail` component, along with its associated controller and template
angular.
module('characterDetail').
component('characterDetail', {
    templateUrl: 'character-detail/character-detail.template.html',
    controller: ['$routeParams', 'Giphy', 'swapi', 'urlFilter',
        function CharacterDetailController($routeParams, Giphy, swapi) {
            var self = this;

            self.fillObjects = function(obj, urls) {
                self[obj] = [];
                urls.forEach(function(url) {
                    url = urlFilter(url);
                    swapi.get(url).then(function(res) {
                        var arr = res.url.match( /\d+/i );
                        res.id = arr[0];
                        self[obj].push(res);
                    });
                });
            };

            self.character = swapi.people.id($routeParams.characterId).then(function(char) {
                self.character = {};

                for (var field in char) {
                    switch(typeof char[field]) {
                        case 'object' : self.fillObjects(field, char[field]); break;
                        default: self.character[field] = char[field];
                    }
                }

                Giphy.get({'tag': char.name}, function (img) {
                    self.imageUrl = img['data']['fixed_width_downsampled_url'];
                });
            });
        }
    ]
});