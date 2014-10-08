(function() {

	angular.module('myApp', ['ngRoute'])

	angular.module('myApp')
		.config(function( $routeProvider ){
			$routeProvider
				.when('/home', {
					templateUrl: 'views/home.html'
				})
				.when('/movies', {
					templateUrl: 'views/movies.html',
					controller: 'MoviesController'
				})
				.when('/movies/:id', {
					templateUrl: 'views/single-movie.html',
					controller: 'SingleMovieController'
				})
				.otherwise({
					redirectTo: '/home'
				})
		})

	angular.module('myApp')
		.service('HTTPService', function( $http ) {
			return {
				getMovies: function () {
					return $http({method: 'GET', url: 'http://www.dennistel.nl/movies'})
				},
				getSingleMovie: function ( id ) {
					return $http({method: 'GET', url: 'http://www.dennistel.nl/movies/' + id})
				}
			}
		});

	angular.module('myApp')
		.filter('reverse', function(  ) {
			return function ( input ) {
				return input.split('').reverse().join('');
			}
		}); 

	angular.module('myApp')
		.controller('MoviesController', function ( $scope, HTTPService ) {

			HTTPService.getMovies()
				.success(function (data) {
					$scope.movies = data;
				})
		})

	angular.module('myApp')
		.controller('SingleMovieController', function ( $scope, HTTPService, $routeParams ) {

			HTTPService.getSingleMovie( $routeParams.id )
				.success(function (data) {
					console.log(data);
					$scope.movie = data;
				})
		})

})()