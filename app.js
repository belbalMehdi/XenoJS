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

app.service('appService',function($http){
	return
	{
		getName : $http.get('user.json',function(data){
				console.log(data.name);
					return data.name;
					})
	}
});

app.controller('appController',function($router,$scope,appService){
	$scope.name = appService.getName;
	$('button')[0].addEventListener('click', function(){
		$router.go('home');
	});
	$('button')[1].addEventListener('click', function(){
		$router.go('info');
	});
});