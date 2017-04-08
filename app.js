var app = require('./src/xeno');
app.config('routing',function($router) {
		$router.state({
		state : 'home',
		url : '/home',
		templateUrl : 'home.html'
		}).state({
			state : 'info',
			url : '/info',
			templateUrl : 'info.html'
		}).defaultState('home');
	});


app.controller('appController',function($router,$scope){
	$('button')[0].addEventListener('click', function(){
		$scope.name = 'wtf';
		$router.go('home');
	});
	$('button')[1].addEventListener('click', function(){
		$router.go('info');
	});
}).controller('infoController',function($router,$scope){
	$('button')[0].addEventListener('click', function(){
		$scope.name = 'infoPower';
		$router.go('home');
	});
	$('button')[1].addEventListener('click', function(){
		$router.go('info');
	});
});

app.service('appService',function($http){

});