angular.module('myApp',[])
.controller('myCtrl', function($scope, $http, $route, $timeout){
	$scope.sunrise = "loading";
	$scope.sunset = "data";
	$http.get('http://ip-api.com/json/').then(function(res){
		$http.get('http://api.sunrise-sunset.org/json?lat='+res.data.lat+'&lng='+res.data.lon+'&formatted=0').then(function(res){
			$scope.sunrise = new tizen.TZDate(new Date(res.data.results.sunrise),tizen.time.getLocalTimezone()).toLocaleTimeString();
			$scope.sunset = new tizen.TZDate(new Date(res.data.results.sunset),tizen.time.getLocalTimezone()).toLocaleTimeString();
		}, function(err) {
			$scope.sunrise = 'error';
			console.log(err);
		});
	}, function(err){
		$scope.sunrise = 'out error';
	});
	
	var reloadPage = function() {
		  $route.reload();
		};
	$timeout(reloadPage, 3000);
});