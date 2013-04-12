var oscdBackpackChrome = {};

// Hardcoding  webkiosk url pattern
oscdBackpackChrome.url="https://webkiosk.jiit.ac.in/*";

oscdBackpackChrome.preferences = {};

// fetching Chrome's Content Settings
var chromeContentSettings = chrome.contentSettings;

var details = chrome.app.getDetails();

init();

// Icon click opens the options page.
chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.create({
		url: "options.html"
	});
});

// Background init method
function init() {

	// Check if backpack preference entry exist in local Storage - Possibly New installation. 

	if (!window.localStorage.osdc_backpack_chrome_preferences) {
		window.localStorage.osdc_backpack_chrome_preferences = JSON.stringify({ "open_webkiosk": true});
	}

	oscdBackpackChrome.preferences = JSON.parse(window.localStorage.osdc_backpack_chrome_preferences);
	
	var pattern = oscdBackpackChrome.url;

	//deciding new setting based on user's saved preferences
	var newSetting = (oscdBackpackChrome.preferences.open_webkiosk ? 'block' : 'allow');

	//Setting Javascript Content Setting for pattern
	chromeContentSettings.javascript.set({
		'primaryPattern': pattern,
		'setting': newSetting,
		'scope': (false ? 'incognito_session_only' : 'regular')
	});

}
