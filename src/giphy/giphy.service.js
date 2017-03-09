/**
 * Created by steal on 05.03.2017.
 */
'use strict';

angular.
module('giphy').
factory('Giphy', ['$resource',
    function($resource) {
        return $resource('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=:tag');
    }
]);