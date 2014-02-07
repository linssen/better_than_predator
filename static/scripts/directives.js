'use strict';

angular.module('btp.directives', [])
    .directive('ngSearch', function (Film) {
        return {
            restrict: 'A',
            // templateUrl: 'static/scripts/templates/_search.html',
            template: '<input class="search" type="search" ng-model="title" placeholder="Search for a film...">' +
                '<p>Directive: {{title}}</p>' +
                '<ul>' +
                    '<li ng-repeat="f in films" id="{{f.id}}">{{f.title}} ({{f.year}})</li>' +
                '</ul>',
            link: function (scope) {
                scope.$watch('title', _.debounce(function (newValue) {
                    if (newValue && newValue.length < 3) { return; }
                    scope.films = Film.query({q: newValue});
                }, 100));
            }
        };
    }
);