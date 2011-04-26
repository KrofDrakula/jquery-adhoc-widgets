/*global jQuery*/

(function($) {

    /*
     * We extend the instance object to append methods onto the set of elements
     */
    $.fn.extend({
        
        /**
         * This is a convenience method to fetch the element's API object.
         * Retursn the API object if found, `false` otherwise.
         */
        API: function(api) {
            var API;
            if(typeof api === 'undefined') {
                // with no arguments passed, we act as a getter
                API = this.data($.fn.API.name);
                return $.isPlainObject(API)? API: false;
            } else {
                // we set whatever is present in the config parameter
                // to the widget's data store and return the current
                // object for chaining purposes
                this.data($.fn.API.name, api);
                return this;
            }
        },
        
        /**
         * A convenience method for widget config, same as above.
         */
        config: function(_config) {
            var config;
            if(typeof _config === 'undefined') {
                // getter
                config = this.data($.fn.config.name);
                return $.isPlainObject(config)? config: false;  
            } else {
                // setter
                this.data($.fn.config.name, _config);
                return this;
            }
        },
        
        /**
         * Shorthand for exposing the API and configuration.
         */
        expose: function(API, config) {
            this.eq(0).API(API);
            this.eq(0).config(config);
        }
    
    });
    
    /**
     * We store the storage name so it can easily be customized in code without
     * source modification.
     */
    $.fn.API.name = 'widget-API';
    
    /**
     * Ditto for config object
     */
    $.fn.config.name = 'widget-config';
    
    /*
     * We extend the global jQuery object to provide utility methods
     */
    $.extend({
        
        /**
         * Augments the viewModel with convenience objects. Returns the
         * `viewModel` augmented with underscore-prefixed properties.
         */
        augmentViewModel: function(widget, viewModel) {
            var $widget = (typeof widget.jquery === 'undefined')? $(widget): widget,
                ret = {
                    /**
                     * A jQuery instance containing the widget
                     */
                    _widget: $widget,
                    
                    /**
                     * The configuration object for the current widget
                     */
                    _config: $widget.config(),
                    
                    /**
                     * This property contains all the jQuery templates contained
                     * within the current widget; it scans through all <script>
                     * elements having the type "text/x-jquery-tmpl". It uses their
                     * class name and camelCases it after adding it to the
                     * _templates member 
                     */
                    _templates: (function() {
                    	var r = {};
                    	$widget.find('script[type="text/x-jquery-tmpl"]').each(function() {
                            var className = $.trim($(this).attr('class'));
                            className = className.replace(/-[\w\d]/g, function($0) { return $0.toUpperCase(); });
                            r[className] = $(this).html(); 
                        });
                    	return r;
                    }())
                };
            
            return $.extend(true, ret, $.augmentViewModel.base, viewModel);
        },
        
        range: function(a, b) {
            var c = [];
            for(var i = a; i <= b; i++) {
                c.push(i);
            }
            return c;
        }
    });
    
    /**
     * This object contains additional members added to the
     * viewModel passed into the `$.augmentViewModel()` method
     * which can be overriden by data passed into the `viewModel`
     * parameter.
     */
    $.augmentViewModel.base = { };
    
}(jQuery));