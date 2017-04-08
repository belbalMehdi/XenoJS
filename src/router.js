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