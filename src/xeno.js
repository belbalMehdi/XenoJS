module.exports = (function(){
	var router = require('./router');
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
		ctrlFct(router,router.$scope);
		return this;
	}
	service = function(serviceName, serviceFct){
		$serviceList[serviceName] = serviceFct();
		return this;
	}
	return{
		'config' : config,
		'controller' : controller,
		'service' : service,
	}
})();