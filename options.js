$(function() {
	// all preferences from extension options page 
    var inject_inputs = ['open_webkiosk'];

    // Saves options to localStorage.
    var save_options = function() {       

        // Injection
        $.each(inject_inputs, function(i, name) {
            var sel = 'input[name=' + name + ']';
            localStorage[name] = $(sel).is(':checked');
        });
    };

    // Restores select box state to saved value from localStorage.
    var restore_options = function() {

        $.each(inject_inputs, function(i, name) {
            var sel = 'input[name=' + name + ']';
            var bool = localStorage[name];
            if (bool == undefined) bool = 'true';
            $(sel).attr('checked', bool == 'true');
        });
    }
    
    restore_options();

    //save options
    $("button").click(save_options);

});

