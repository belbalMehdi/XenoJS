module.exports = (function(window){
	var $ = function(query){
		return document.querySelectorAll(query);
	}	
	window.$ = $;
	var $target = {};
	var handler = {
		set : function(target,prop,value){
			console.log(prop+' : '+value);
			target[prop] = value;
			bindToDom(prop,value);
			return Reflect.get(target,prop,value);
		}

	}
	var $scope = new Proxy($target,handler);
	refreshBind = function(){
		for(i in $target){
			console.log($target);
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