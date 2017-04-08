module.exports = (function(){
	var router = require('./router');
	var $http = require('./xhr');
	$configList = {};
	$ctrlList = {};
	$serviceList = {};
	config = function(configName, configFct){
		$configList[configName] = configFct;
		configFct(router);
		return this;
	}
	controller = function(ctrlName, ctrlFct){
		$ctrlList[ctrlName] = ctrlFct;
		console.log($serviceList['appService']);
		ctrlFct(router,router.$scope,$serviceList['appService']);
		return this;
	}
	service = function(serviceName, serviceFct){
		console.log(serviceName);
		$serviceList[serviceName] = serviceFct($http);

				console.log(serviceFct($http));

		return this;
	}
	return{
		'config' : config,
		'controller' : controller,
		'service' : service,
	}
})();