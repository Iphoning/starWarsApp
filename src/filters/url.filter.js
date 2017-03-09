/**
 * Created by steal on 09.03.2017.
 */
angular.module('starWarsApp', [])
    .filter('url', function() {
        return function(input, protocol, replacement) {
            input = input || '';
            protocol = protocol || 'https://';
            replacement = replacement || 'http://';
            return input.replace(replacement, protocol);
        };
    });