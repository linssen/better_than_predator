/*global module */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                options: {
                    report: 'min',
                    mangle: false
                },
                files: {
                    'static/scripts/dist/<%= pkg.name %>.js': [
                        'static/bower_components/jquery/jquery.js',
                        'static/bower_components/lodash/dist/lodash.js',
                        'static/bower_components/angular/angular.js',
                        'static/bower_components/angular-route/angular-route.js',
                        'static/bower_components/angular-resource/angular-resource.js',
                        'static/scripts/*.js',
                        'static/scripts/build/*.js',
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
                    'static/scripts/build/*.js',
                    '!static/test/**/*.js'
                ],
                dest: 'static/scripts/dist/<%= pkg.name %>.js'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['static/scripts/**/*.js', 'static/test/unit/**/*.js', '!static/scripts/dist/<%= pkg.name %>.js'],
                tasks: ['concat', 'karma:unit:run']
            },
            styles: {
                files: ['static/styles/main.scss'],
                tasks: ['sass', 'concat']
            },
            templates: {
                files: ['static/scripts/templates/**/*.tpl.html'],
                tasks: ['html2js']
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'static/styles/dist/<%= pkg.name %>.css': 'static/styles/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'static/styles/dist/<%= pkg.name %>.css': 'static/styles/main.scss'
                }
            }
        },
        html2js: {
            options: {},
            main: {
                src: ['static/scripts/templates/**/*.tpl.html'],
                dest: 'static/scripts/build/templates.js'
            }
        },
        protractor: {
            options: {
                configFile: 'node_modules/protractor/referenceConf.js', // Default config file
                keepAlive: true,
                noColor: false,
                args: {
                    // Arguments passed to the command
                }
            },
            runner: {
                options: {
                    configFile: 'static/test/conf/protractor.conf.js'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'static/test/conf/karma.conf.js',
                background: true
            },
            continuous: {
                configFile: 'static/test/conf/karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['uglify', 'sass:dist', 'html2js', 'karma:continuous', 'protractor']);
    grunt.registerTask('default', ['html2js', 'uglify', 'sass:dist']);

};
