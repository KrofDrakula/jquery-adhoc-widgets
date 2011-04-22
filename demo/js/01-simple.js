/*global jQuery*/
(function($){
    
    /**
     * A simple list populated by fetching data from a
     * JSON endpoint.
     */
    $.fn.ajaxListWidget = function(_config) {
        return this.each(function() {
            
            var widget, config, API, list;
            
            /**
             * The widget jQuery instance
             */
            widget = $(this);
            
            /**
             * The unordered list, useful to avoid re-querying the widget
             * for the list.
             */
            list = widget.find('ul');
            
            /**
             * Configuration object, holds merged configuration by
             * overriding options according to the following descending
             * order of priority:
             * 
             *   - widget defaults
             *   - options passed to the `ajaxListWidget()` method
             *   - options passed within the data-config HTML
             *     attribute
             */
            config = $.extend(
                true,
                $.fn.ajaxListWidget.defaults,
                _config || {},
                widget.data('config') || {}
            );
            
            /**
             * We declare the widget's internal API to abstract operations
             * into an understandable set of operations.
             */
            API = {
                
                init: function() {
                    if(config.dataUrl !== false) API.refresh();
                },
                
                refresh: function() {
                    if(config.dataUrl !== false) {
                        $.getJSON(config.dataUrl, function(viewModel) {
                            // We extend the received viewModel with the widget's
                            // convenience properties.
                            viewModel = $.augmentViewModel(widget, viewModel);
                            
                            // Clear the current list.
                            list.children().remove();
                            
                            // We use the .tmpl() function to iterate over the
                            // elements using the appropriate template. If we pass
                            // an array of elements, .tmpl() will automatically
                            // iterate over all of them, rendering each object in
                            // the array as a new template instance.
                            $.tmpl(viewModel._templates.item, viewModel.roles).appendTo(list);
                        });
                    }
                }
            };
            
            
            /**
             * We only expose those methods and properties of the internal API
             * that we want accessible from outside of this code.
             */
            widget.API({
                refresh: API.refresh,
                config: config
            });
            
            // After everything's set up, we fire the widget initialization
            API.init();
            
        });
    };
    
    $.fn.ajaxListWidget.defaults = { context: '', dataUrl: false };
    
}(jQuery));