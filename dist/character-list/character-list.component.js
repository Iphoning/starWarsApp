/**
 * Created by steal on 05.03.2017.
 */

'use strict';

angular.
module('characterList').
component('characterList', {
    templateUrl: 'character-list/character-list.template.html',
    controller: [ '$routeParams', 'Giphy', 'swapi', 'urlFilter',
        function CharacterListController($routeParams, Giphy, swapi, urlFilter) {
            var self = this;
            self.page = +$routeParams.page;
            self.per_page = 10;

            self.makePagination = function(base_url) {
                self.base_url = base_url;
                self.pages_count = Math.ceil(self.total / self.per_page);

                self.pages = [];
                for (var i = 1; i <= self.pages_count; i++) {
                    self.pages.push({
                        'num': i,
                        'url': base_url + '/page/' + i
                    });
                }
            };

            self.postFilter = function(char) {

                var arr = char.url.match( /\d+/i );
                char.id = arr[0];
                Giphy.get({'tag': char.name}, function (img) {
                    char.imageUrl = img['data']['fixed_width_small_url'];
                });
            };

            if ($routeParams.filter) {

                self.filter = $routeParams.filter;
                self.filterid = $routeParams.filterid;

                swapi[self.filter].id(self.filterid).then(function(res) {
                    if (!res.characters) res.characters = res.pilots;
                    self.total = res.characters.length;
                    self.filtername = res.title;
                    self.characters = [];
                    var chars = res.characters.splice(((self.page - 1) * self.per_page), self.per_page);
                    chars.forEach(function (url) {
                        url = urlFilter(url);
                        swapi.get(url).then(function (char) {
                            self.characters.push(char);
                            self.postFilter(self.characters[self.characters.length - 1]);
                            self.makePagination('#!/characters/filter/' + self.filter + '/' + self.filterid);
                        });
                    });
                });

            } else {
                self.characters = swapi.people.page(self.page).then(function(res) {
                    self.total = res.count;
                    if (self.page === 1) self.per_page = res.results.length;

                    self.characters = res.results;

                    self.characters.forEach(self.postFilter);
                    self.makePagination('#!/characters');
                });
            }

        }
    ]
});