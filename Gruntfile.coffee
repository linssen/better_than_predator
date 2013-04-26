module.exports = (grunt) ->

    grunt.initConfig

        pkg: grunt.file.readJSON "package.json"

        paths:
            static: "./static/"

        concat:
            scripts:
                src: [
                    "<%= paths.static %>scripts/lib/jquery/jquery.js"
                    "<%= paths.static %>scripts/lib/jquery/jquery-ui.js"
                    "<%= paths.static %>scripts/lib/**/*.js"
                    "<%= paths.static %>scripts/*.js"
                    "<%= paths.static %>scripts/build/*.js"
                    "!<%= paths.static %>scripts/lib/modernizr/modernizr.js"
                ]
                dest: "<%= paths.static %>scripts/dist/<%= pkg.name %>.js"

        uglify:
            options:
                banner: "/*!\n" +
                    "<%= pkg.title %> - v<%= pkg.version %> - " +
                    "<%= grunt.template.today('yyyy-mm-dd') %>\n" +
                    "<%= pkg.homepage %>\n" +
                    "Copyright (c) <%= grunt.template.today('yyyy') %>" +
                    "<%= pkg.author.name %>\n" +
                    "Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %>\n" +
                    "*/\n"

                mangle: false
                compress: true
                preserveComments: false
            dist:
                files: [
                    src: [
                        "<%= paths.static %>scripts/lib/jquery/jquery.js"
                        "<%= paths.static %>scripts/lib/**/*.js"
                        "<%= paths.static %>scripts/build/*.js"
                        "<%= paths.static %>scripts/*.js"
                        "!<%= paths.static %>scripts/lib/modernizr/modernizr.js"
                    ]
                    dest: "<%= paths.static %>scripts/dist/<%= pkg.name %>.js"
                ]

        coffee:
            build:
                files: [
                    expand: true
                    cwd: "<%= paths.static %>scripts/"
                    src: ["*.coffee"]
                    dest: "<%= paths.static %>scripts/build/"
                    ext: ".js"
                ]

            tests:
                expand: true
                cwd: "<%= paths.static %>scripts/test/"
                src: "*.coffee"
                dest: "<%= paths.static %>scripts/test/build/"
                ext: ".test.js"
                options:
                    bare: true

        sass:
            dev:
                options:
                    style: "expanded"
                files: [
                    expand: true
                    cwd: "<%= paths.static %>styles/"
                    src: ["**/*.scss", "!**/_*.scss"]
                    dest: "<%= paths.static %>styles/dist/"
                    ext: ".css"
                ]
            dist:
                options:
                    style: "compressed"
                files: [
                    expand: true
                    cwd: "<%= paths.static %>styles/"
                    src: ["**/*.scss", "!**/_*.scss"]
                    dest: "<%= paths.static %>styles/dist/"
                    ext: ".css"
                ]

        watch:
            files: [
                "<%= paths.static %>styles/**/*.scss"
                "<%= paths.static %>scripts/**/*.coffee"
                "<%= paths.static %>scripts/**/*.js"
                "!<%= paths.static %>scripts/build/*.js"
                "!<%= paths.static %>scripts/dist/*.js"
                "!<%= paths.static %>scripts/test/build/*.js"
            ]
            tasks: ["sass:dev", "coffee", "concat"]

        connect:
            server:
                options:
                    port: 9001
                    base: "./"
        qunit:
            dist:
                options:
                    urls: ["http://localhost:9001/static/scripts/test/index.html"]

        grunt.loadNpmTasks "grunt-contrib-sass"
        grunt.loadNpmTasks "grunt-contrib-coffee"
        grunt.loadNpmTasks "grunt-contrib-concat"
        grunt.loadNpmTasks "grunt-contrib-uglify"
        grunt.loadNpmTasks "grunt-contrib-watch"
        grunt.loadNpmTasks "grunt-contrib-connect"
        grunt.loadNpmTasks "grunt-contrib-qunit"

        grunt.registerTask "default", ["connect", "coffee", "sass:dist", "uglify", "qunit"]
        grunt.registerTask "dev", ["connect", "coffee", "sass:dev", "concat", "qunit"]
        grunt.registerTask "test", ["connect", "coffee", "concat", "qunit"]
