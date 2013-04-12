$(function() {
	// all preferences from extension options page 
    var inject_inputs = ['open_webkiosk'];

    // Saves options to localStorage.
    var save_options = function() {       

        var pref_json = {}

        // Injection
        $.each(inject_inputs, function(i, name) {
            var sel = 'input[name=' + name + ']';
            pref_json[name] = $(sel).is(':checked');
        });
        localStorage['osdc_backpack_chrome_preferences'] = JSON.stringify(pref_json);

        if($('input[name=open_webkiosk]').is(':checked'))
            $(".awesome-message").css('opacity', 0).slideDown('fast').animate(
                                                                                { opacity: 1 },
                                                                                { queue: false, duration: 'slow' }
                                                                              );

        chrome.extension.getBackgroundPage().init();

    };

    // Restores select box state to saved value from localStorage.
    var restore_options = function() {

        var osdc_backpack_chrome_preferences = localStorage['osdc_backpack_chrome_preferences'];
        var inject_inputs = JSON.parse(osdc_backpack_chrome_preferences);
        $.each(inject_inputs, function(key, value) {
            var sel = 'input[name=' + key + ']';
            var bool = value;
            if (bool == undefined) bool = true;
            $(sel).attr('checked', bool == true);
        });
    }
    
    restore_options();

    //save options
    $("button").click(save_options);

});

