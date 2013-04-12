var oscdBackpackChrome = {};
oscdBackpackChrome.url="https://webkiosk.jiit.ac.in/*";
oscdBackpackChrome.preferences = {};
var chromeContentSettings = chrome.contentSettings;
var details = chrome.app.getDetails();

init();

function init() {
	if (!window.localStorage.osdc_backpack_chrome_preferences) {
		//window.localStorage.osdc_backpack_chrome_preferences = JSON.stringify({ "open_webkiosk": true});
	}
	oscdBackpackChrome.preferences = JSON.parse(window.localStorage.osdc_backpack_chrome_preferences);
}

if (oscdBackpackChrome.preferences.open_webkiosk) {
	chromeContentSettings.javascript.get({
		'primaryUrl': oscdBackpackChrome.url,
		'incognito': false
	},
	function(details) {
		setting = details.setting;
		if (setting) {
			var pattern = oscdBackpackChrome.url;
			var newSetting = (setting == 'allow' ? 'block' : 'allow');
			chromeContentSettings.javascript.set({
				'primaryPattern': pattern,
				'setting': newSetting,
				'scope': (false ? 'incognito_session_only' : 'regular')
			});
		}
	});
}