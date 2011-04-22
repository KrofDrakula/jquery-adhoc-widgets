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
        widgetAPI: function() {
            var API = this.data($.fn.extend.widgetAPI.name);
            return $.isPlainObject(API)? API: false;
        }
    
    });
    
    /**
     * We store the storage name so it can easily be customized in code without
     * source modification.
     */
    $.fn.extend.widgetAPI.name = 'widget-api';
    
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
                ret: {
                    _widget: $widget,
                    _templates: {},
                    _config: $widget.widgetAPI().config
                }
            
            $widget.find('script[type="text/x-jquery-tmpl"]').each(function() {
                // TODO: insert into templates
            });
            
            return $.extend(ret, viewModel);
        }
    });
    
}(jQuery));