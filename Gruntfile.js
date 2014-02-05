/*global module */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'static/scripts/dist/<%= pkg.name %>.js': [
                        'static/bower_components/jquery/jquery.js',
                        'static/bower_components/angular/angular.js',
                        'static/bower_components/angular-route/angular-route.js',
                        'static/bower_components/angular-resource/angular-resource.js',
                        'static/scripts/*.js',
                        '!static/scripts/tests/*.js'
                    ]
                }
            }
        },
        concat: {
            scripts: {
                src: [
                    'static/bower_components/jquery/jquery.js',
                    'static/bower_components/lodash/dist/lodash.js',
                    'static/bower_components/angular/angular.js',
                    'static/bower_components/angular-route/angular-route.js',
                    'static/bower_components/angular-resource/angular-resource.js',
                    'static/scripts/*.js',
                    '!static/test/**/*.js'
                ],
                dest: 'static/scripts/dist/<%= pkg.name %>.js'
            }
        },
        watch: {
            scripts: {
                files: ['static/scripts/**/*.js', '!static/scripts/dist/<%= pkg.name %>.js'],
                tasks: ['concat']
            },
            styles: {
                files: ['static/styles/screen.scss'],
                tasks: ['sass', 'concat']
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'static/styles/dist/<%= pkg.name %>.css': 'static/styles/screen.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'static/styles/dist/<%= pkg.name %>.css': 'static/styles/screen.scss'
                }
            }
        },
        protractor: {
            options: {
                configFile: "node_modules/protractor/referenceConf.js", // Default config file
                keepAlive: true,
                noColor: false,
                args: {
                    // Arguments passed to the command
                }
            },
            runner: {
                options: {
                    configFile: "static/test/conf/protractor.conf.js",
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('test', ['uglify', 'sass:dist', 'protractor']);
    grunt.registerTask('default', ['uglify', 'sass:dist']);

};
