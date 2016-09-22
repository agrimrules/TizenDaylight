//Handle back button to exit
document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

angular.module('myApp',[])
.controller('myCtrl', function($scope, $http, $timeout){
	$scope.sunrise = "loading";
	$scope.sunset = "data";
	$http.get('http://ip-api.com/json/').then(function(res){
		$http.get('http://api.sunrise-sunset.org/json?lat='+res.data.lat+'&lng='+res.data.lon+'&formatted=0').then(function(res){
			$scope.sunrise = returnformatteddate(res.data.results.sunrise);
			$scope.sunset = returnformatteddate(res.data.results.sunset);
		}, function(err) {
			$scope.sunrise = 'error';
			console.log(err);
		});
	}, function(err){
		$scope.sunrise = 'error';
	});
	
	function returnformatteddate(datestring){
		return new tizen.TZDate(new Date(datestring),tizen.time.getLocalTimezone()).toLocaleTimeString();
	}
	
	var reloadPage = function() {
		  location.reload();
		};
	$timeout(reloadPage, 10000);
});