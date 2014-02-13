/*global module */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngmin: {
            dist: {
                src: ['static/scripts/*.js'],
                dest: 'static/scripts/build/<%= pkg.name %>.js'
            }
        },
        uglify: {
            dist: {
                options: {
                    report: 'min',
                    mangle: true,
                    compress: true
                },
                files: {
                    'static/dist/scripts/<%= pkg.name %>.js': [
                        'static/bower_components/jquery/jquery.js',
                        'static/bower_components/lodash/dist/lodash.js',
                        'static/bower_components/angular/angular.js',
                        'static/bower_components/angular-route/angular-route.js',
                        'static/bower_components/angular-resource/angular-resource.js',
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
                dest: 'static/dist/scripts/<%= pkg.name %>.js'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['static/scripts/**/*.js', 'static/test/unit/**/*.js','static/scripts/templates/**/*.tpl.html'],
                tasks: ['concurrent:angular', 'concat', 'karma:unit:run']
            },
            styles: {
                files: ['static/styles/main.scss'],
                tasks: ['sass', 'concat']
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    quiet: true
                },
                files: {
                    'static/dist/styles/<%= pkg.name %>.css': 'static/styles/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    quiet: true
                },
                files: {
                    'static/dist/styles/<%= pkg.name %>.css': 'static/styles/main.scss'
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
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './'
                }
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
        },
        concurrent: {
            angular: {
                tasks: ['html2js', 'ngmin']
            },
            dist: {
                tasks: ['uglify', 'sass:dist']
            },
            test: {
                tasks: ['karma:continuous', 'protractor']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('test', ['concurrent:angular', 'concurrent:dist', 'connect', 'concurrent:test']);
    grunt.registerTask('default', ['concurrent:angular', 'concurrent:dist']);

};
