window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

    /**
     * Gets the location based on IP.
     * */
    function getIPLocation() {
    	var xmlHttp = new XMLHttpRequest();
    	
    	xmlHttp.overrideMimeType("application/json");
    	xmlHttp.open("GET","http://ip-api.com/json/", false);
    	xmlHttp.onreadystatechange = function(){
    		if(xmlHttp.readyState === 4){
    			 return JSON.parse(xmlHttp.responseText);
    		}
    		else {
    			return null;
    		}
    	};
    	xmlHttp.send();
    	return xmlHttp.onreadystatechange();
    }
    
    /**
     * Gets The Sunrise and sunset based on location.
     */
    function getTimeSpan() {
    	var xmlHttp = new XMLHttpRequest(),
    	elSunset = document.querySelector("#content-Sunset"),
    	elSunrise = document.querySelector("#content-Sunrise"),
    	IPinfo,
    	SunRes,
    	sunrise,
    	sunset;
    	IPinfo = getIPLocation();
    	xmlHttp.overrideMimeType("application/json");
    	xmlHttp.open("GET","http://api.sunrise-sunset.org/json?lat="+IPinfo.lat+"&lng="+IPinfo.lon+"&formatted=0", false);
    	xmlHttp.onreadystatechange = function () {
    		if(xmlHttp.readyState === 4) {
    			SunRes = JSON.parse(xmlHttp.responseText);
    			sunrise = new tizen.TZDate(new Date(SunRes.results.sunrise)).toLocaleTimeString();
    			sunset = new tizen.TZDate(new Date(SunRes.results.sunset)).toLocaleTimeString();
    			elSunset.innerHTML = 'Sunset: '+sunset;
    			elSunrise.innerHTML = 'Sunrise: '+sunrise;
    		}
    	};
    	xmlHttp.send();
    }
    
    getTimeSpan();
};