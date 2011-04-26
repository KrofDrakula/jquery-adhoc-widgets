/*global jQuery*/
(function($) {
    
    $.fn.flickrGallery = function(_config) {
        return this.each(function() {
            var widget = $(this),
                config = $.extend(true, {}, $.fn.flickrGallery.defaults, _config || {}, widget.data('config') || {}),
                currentPage = 0,
                list, items;
            
            var API = {
                
                init: function() {
                    list = widget.find('ol');
                    items = list.children();
                    if(config.dataUrl != '') {
                        API.refresh();
                    }
                },
                
                refresh: function() {
                    $.getJSON(config.dataUrl, function(data) {
                        var viewModel = [];
                        for(var i = 0; i < data.items.length; i++) {
                            // Flickr data model -> viewModel
                            viewModel.push({
                                link: data.items[i].link,
                                src: data.items[i].media.m,
                                alt: data.items[i].title
                            });
                        }
                        API.buildContent(viewModel);
                    });
                },
                
                buildContent: function(viewModel) {
                    var itemTemplate = widget.find('script.item').html(),
                        controlsTemplate = widget.find('script.controls').html();
                    list.children().remove();
                    $.tmpl(itemTemplate, viewModel).appendTo(list);
                    items = list.children();
                    $.tmpl(controlsTemplate, {pages:$.range(1, Math.ceil(items.length / config.itemsPerPage))}).appendTo(widget);
                    API.goToPage(0);
                },
                
                next: function() {
                    API.goToPage(currentPage + 1);
                },
                
                prev: function() {
                    API.goToPage(currentPage - 1);
                },
                
                goToPage: function(n) {
                    var pages = Math.ceil(items.length / config.itemsPerPage);
                    n = Math.max(0, Math.min(n, pages - 1));
                    items.hide();
                    for(var i = 0; i < config.itemsPerPage; i++) {
                        items.eq(n * config.itemsPerPage + i).show();
                    }
                    currentPage = n;
                }
            };
            
            widget.delegate('.controls a.next, .controls a.prev', 'click', function(ev) {
                if($(this).is('.next'))
                    API.next();
                else
                    API.prev();
                ev.preventDefault();
            }).delegate('.controls li a', 'click', function(ev) {
                API.goToPage($(this).parent().index());
            });
            
            widget.API({
                refresh: API.refresh,
                next: API.next,
                prev: API.prev,
                goToPage: API.goToPage,
                // an example of a custom function that provides
                // a value from an internal variable
                getPage: function() { return currentPage; }
            });
            
            widget.config(config);
            
            API.init();
            
        });
    };
    
    $.fn.flickrGallery.defaults = {
        dataUrl: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?',
        itemsPerPage: 3
    }
    
}(jQuery));