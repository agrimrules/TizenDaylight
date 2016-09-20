window.onload = function() {
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
    /**
     * Gets The Sunrise and sunset based on location.
     */
    function getTimeSpan() {
    	var xmlHttp = new XMLHttpRequest(),
    	elSunset = document.querySelector("#content-Sunset"),
    	elSunrise = document.querySelector("#content-Sunrise"),
    	lat,
    	lon,
    	SunRes,
    	sunrise,
    	sunset;
    	xmlHttp.onload = function(){
    		if(xmlHttp.status === 200 && xmlHttp.readyState === 4) {
    			elSunrise.innerHTML = 'Loading';
    			elSunset.innerHTML = 'Data';
    			var res = JSON.parse(xmlHttp.responseText);
    			lat = res.lat;
    			lon = res.lon;
    			var xmlHttp2 = new XMLHttpRequest();
    			xmlHttp2.onload = function() {
    				if(xmlHttp2.status === 200 && xmlHttp2.readyState === 4) {
    					SunRes = JSON.parse(xmlHttp2.responseText);
    					sunrise = new tizen.TZDate(new Date(SunRes.results.sunrise),tizen.time.getLocalTimezone()).toLocaleTimeString();
    					sunset = new tizen.TZDate(new Date(SunRes.results.sunset),tizen.time.getLocalTimezone()).toLocaleTimeString();
    					elSunset.innerHTML = 'Sunset: '+sunset;
    					elSunrise.innerHTML = 'Sunrise: '+sunrise;
    				}    		
    			};
    			xmlHttp2.open("GET","http://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lon+"&formatted=0", true);
    			xmlHttp2.send();
    		}
    	};
    	xmlHttp.overrideMimeType("application/json");
    	xmlHttp.open("GET","http://ip-api.com/json/", true);
    	xmlHttp.send();
    	
    }
    
    getTimeSpan();
};