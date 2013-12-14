/*global module */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'static/scripts/dist/<%= pkg.name %>.js': [
                        'static/scripts/lib/jquery/jquery.js',
                        'static/scripts/lib/angular/angular.js',

                        'static/scripts/*.js',
                        'static/scripts/lib/**/*.js',
                        '!static/scripts/lib/qunit/qunit.js',
                        '!static/scripts/tests/*.js'
                    ]
                }
            }
        },
        concat: {
            scripts: {
                src: [
                    'static/scripts/lib/jquery/jquery.js',
                    'static/scripts/lib/angular/angular.js',

                    'static/scripts/lib/**/*.js',
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
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.'
                }
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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['uglify', 'sass:dist']);

};
