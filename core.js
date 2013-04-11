		url="https://webkiosk.jiit.ac.in/*"
		
		var chromeContentSettings = chrome.contentSettings;

		init();

		var details = chrome.app.getDetails();

		chromeContentSettings.javascript.get({
			'primaryUrl': url,
			'incognito': false
		},
		function(details) {

			setting = details.setting;
			if (setting) {
				//var pattern = /^file:/.test(url) ? url : url.match(extractHostname)[0]+'/*';
				// old method : url.replace(/\/[^\/]*?$/, '/*')
				var pattern = url;
				var newSetting = (setting == 'allow' ? 'block' : 'allow');
				chromeContentSettings.javascript.set({
					'primaryPattern': pattern,
					'setting': newSetting,
					'scope': (false ? 'incognito_session_only' : 'regular')
				});
				
				//updateIcon(newSetting);

				//if (prefs.autoRefresh) {
					//chrome.tabs.reload(tabId);
				//}

				//setLocalStorageRule(pattern, newSetting);

				//console.info("javascript is now "+newSetting+"ed on "+pattern);
			}
			else {
				//console.error("error, the setting is "+setting);
			}
		});