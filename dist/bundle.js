(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./src/xeno":4}],2:[function(require,module,exports){
module.exports = (function(window){
	var $ = function(query){
		return document.querySelectorAll(query);
	}	
	window.$ = $;
	var $target = {};
	var handler = {
		set : function(target,prop,value){
			target[prop] = value;
			bindToDom(prop,value);
			return Reflect.get(target,prop,value);
		}

	}
	var $scope = new Proxy($target,handler);
	refreshBind = function(){
		for(i in $target){
			bindToDom(i,$target[i]);
		}
	};
	var bindToDom = function(prop,value){
		var query = 'v['+prop+']';
		var elems = $(query);
		for(var i=0;i<elems.length;i++){
			elems[i].innerHTML = value;
		}
	}
	var bindFromDom = function(){
		var inputs = $('input[type=text]');
		for(var i=0;i<inputs.length;i++)
		{
			if(inputs[i].getAttribute('v')!=undefined)
			{
				inputs[i].addEventListener('keyup', function(e){
					$scope[e.target.getAttribute('v')] = e.target.value;
				});
			}
		}
	};
	bindFromDom();
	return {
		'$scope' : $scope,
		'$refreshBind' : refreshBind
	}
})(window);
},{}],3:[function(require,module,exports){
module.exports = (function(window){
	var binder = require('./bind');
	var load = function(templateUrl){
		var xhr = new XMLHttpRequest();
		xhr.open('GET',templateUrl,true);
		xhr.addEventListener('load', function(e){
			if($("ui")[0]!=undefined)$("ui")[0].innerHTML = this.response;
			binder.$refreshBind();
		});
		xhr.send();
	}

	var states = [];
	var defaultState = '/';
	
	var state = function(state){
		if(state.hasOwnProperty('state')&&state.hasOwnProperty('url')&&state.hasOwnProperty('templateUrl'))
		states.push(state);
		return this;
	};
	var defaultState = function(state){
		defaultState = state;
	}

	var go = function(state){
		for(i in states){
			if(state == states[i].state) window.location.hash = '#'+states[i].url;
		}
	}

	window.addEventListener('hashchange', function(e){
		for(i in states){
			if(window.location.hash == ('#'+states[i].url)) load(states[i].templateUrl);
		}
	});
	window.addEventListener('load', function(e){
		if(window.location.hash == '') go(defaultState);
		else{
			for(i in states){
				if(window.location.hash == ('#'+states[i].url)) load(states[i].templateUrl);
			}
		}
		if($("ui")[0]!=undefined)$('ui')[0].style.display = 'block';
		return this;
	});

	return {
		'state' : state,
		'defaultState' : defaultState,
		'go' : go,
		'$scope' : binder.$scope
	}
})(window);
},{"./bind":2}],4:[function(require,module,exports){
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
},{"./router":3,"./xhr":5}],5:[function(require,module,exports){
// Ajax Methods
module.exports = (function(){
	$get = function(url,callback,errorCallback=function(){}){
		var ajax = new XMLHttpRequest();
		ajax.open("get",url,true);
		ajax.addEventListener("load", function(){callback(JSON.parse(ajax.responseText))});
		ajax.addEventListener("error", function(){errorCallback(ajax.status)});
		ajax.send(null);
	}

	$post = function(url,data,callback,errorCallback=function(){}){
		var ajax = new XMLHttpRequest();
		ajax.open("post",url,true);
		ajax.setRequestHeader("Content-Type", "application/json");
		ajax.addEventListener("load", function(){callback(JSON.parse(ajax.responseText))});
		ajax.addEventListener("error", function(){errorCallback(ajax.status)});
		ajax.send(data);
	}

	$put = function(url,data,callback,errorCallback=function(){}){
		var ajax = new XMLHttpRequest();
		ajax.open("put",url,true);
		ajax.addEventListener("load", function(){callback(JSON.parse(ajax.responseText))});
		ajax.addEventListener("error", function(){errorCallback(ajax.status)});
		ajax.setRequestHeader("Content-Type", "application/json");
		ajax.send(data);
	}

	$delete = function(url,callback,errorCallback=function(){}){
		var ajax = new XMLHttpRequest();
		ajax.open("delete",url,true);
		ajax.addEventListener("load", function(){callback(JSON.parse(ajax.responseText))});
		ajax.addEventListener("error", function(){errorCallback(ajax.status)});
		ajax.setRequestHeader("Content-Type", "application/json");
		ajax.send(null);
	}

	return{
		'get' : $get,
		'post': $post,
		'put' : $put,
		'delete' : $delete
	}
})();

},{}]},{},[1]);
