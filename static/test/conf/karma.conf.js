module.exports = function(config){
    config.set({
        basePath : '../../../',

        files : [
            'static/bower_components/es5-shim/es5-shim.js',
            'static/bower_components/jquery/jquery.js',
            'static/bower_components/lodash/dist/lodash.js',
            'static/bower_components/angular/angular.js',
            'static/bower_components/angular-resource/angular-resource.js',
            'static/bower_components/angular-route/angular-route.js',
            'static/bower_components/angular-mocks/angular-mocks.js',
            'static/scripts/dist/better_than_predator.js',
            'static/test/unit/**/*.js'
        ],

        exclude : [],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome', 'PhantomJS'],

        plugins : [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],
    });
};