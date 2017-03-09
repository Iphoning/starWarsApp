/**
 * Created by steal on 09.03.2017.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        imagemin: {                          // Task
            static: {
                files: {                         // Dictionary of files
                    'dist/assets/img/back.jpg': 'src/assets/img/back.jpg'
                }
            }
        },
        uncss: {
            dist: {
                files: [
                    {
                        src: [
                            'src/index.html',
                            'src/character-detail/character-detail.template.html',
                            'src/character-list/character-list.template.html'
                        ],
                        dest: 'src/assets/css/style.css'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: [
                    { src: 'src/assets/css/style.css', dest: 'dist/assets/css/style.min.css' }
                ]
            }
        },
        uglify: {
            my_target: {
                files: {
                        'dist/assets/js/script.min.js': [
                        "bower_components/jquery/dist/jquery.min.js",
                        "bower_components/angular/angular.min.js",
                        "bower_components/angular-animate/angular-animate.min.js",
                        "bower_components/angular-resource/angular-resource.min.js",
                        "bower_components/angular-route/angular-route.min.js",
                        "bower_components/ne-swapi/dist/ne-swapi.min.js",
                        "src/assets/js/app.module.js",
                        "src/assets/js/app.config.js",
                        "src/assets/js/app.animations.js",
                        "src/giphy/giphy.module.js",
                        "src/giphy/giphy.service.js",
                        "src/character-list/character-list.module.js",
                        "src/character-list/character-list.component.js",
                        "src/character-detail/character-detail.module.js",
                        "src/character-detail/character-detail.component.js"
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uncss', 'cssmin', 'imagemin', 'uglify']);

};