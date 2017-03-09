/**
 * Created by steal on 05.03.2017.
 */
'use strict';

angular.
module('starWarsApp').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/characters/filter/:filter/:filterid/page/:page', {
            template: '<character-list></character-list>'
        }).
        when('/characters/page/:page', {
            template: '<character-list></character-list>'
        }).
        when('/characters/:characterId', {
            template: '<character-detail></character-detail>'
        }).
        otherwise('/characters/page/1');
    }
]);