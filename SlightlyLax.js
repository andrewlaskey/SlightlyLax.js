/*!
 * SlightlyLax
 * http://idiom.co
 * 
 *
 * Created by Idiom (@idiom_)
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "slightlylax",
        defaults = {
            wrapper: '.lax-wrap',
            slideDistance   : -160,
            slideOffsetUp   : 400,
            slideOffsetDown : 600
        },

        slidePanel = function(elem, distance) {
            var t;
            t = 'translate3d(0, ' + distance + 'px, 0)';
            elem.style.WebkitTransform = t;
            elem.style.MozTransform = t;
            elem.style.OTransform = t;
            elem.style.msTransform = t;
            elem.style.transform = t;
        };


    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.$element = $(this.element);

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var self = this;

            this.panels = [];
            this.windowTop = 0;
            this.currentTop = 0;

            //get the sliding panels
            this._addPanels();

            //adjust wapper height
            this._fixWrapHeight();

            //add the listener for scrolling
            this.$element.scroll(function() {
                self._scrolling();
            });
        
        },

        _addPanels: function() {
            var self = this;

            $('[data-lax]').each(function(i) {
                var slideOffset = self.options.slideDistance * i;

                self.panels.push({
                        $panel: $(this),
                        position: slideOffset,
                        startPos: slideOffset,
                        slideMax: slideOffset + self.options.slideDistance
                    });

                //$(this).css({ 'top' : slideOffset + 'px' });
                slidePanel($(this).get(0), slideOffset);
            });
        },

        _fixWrapHeight: function() {
            var self = this,
                wrapStartHeight = $(self.options.wrapper).height(),
                heightAdjust = self.options.slideDistance * self.panels.length;

            $(self.options.wrapper).css('height',wrapStartHeight + heightAdjust + 'px');

        },

        _scrolling: function() {

            //get the current position of the top of the window
            this.windowTop = this.$element.scrollTop();

            var change = this.currentTop - this.windowTop;
            var direction = 'down';

            if (change >= 0) {
                direction = 'up';
            }

            for (var i = 0; i <= this.panels.length - 1; i++) {

                var panel = this.panels[i],
                    panelTop = panel.$panel.offset().top,
                    panelDistance = panelTop - this.windowTop;

                //if we're scrolling down
                if (direction === 'down') {

                    //if we're past offset
                    if (panelDistance < this.options.slideOffsetDown) {

                        panel.position += change;

                        if (panel.position <= panel.slideMax) {
                            panel.position = panel.slideMax;
                        }

                        //panel.$panel.css({ 'top' : panel.position + 'px' });
                        slidePanel(panel.$panel.get(0), panel.position);                     
                    }

                //scrolling up
                } else {

                    //if we're past offset
                    if (panelDistance > this.options.slideOffsetUp) {

                        panel.position += change;

                        if (panel.position >= panel.startPos) {
                            panel.position = panel.startPos;
                        }

                        //panel.$panel.css({ 'top' : panel.position + 'px' });
                        slidePanel(panel.$panel.get(0), panel.position);

                    }
                }
            }         
            //update the current position of the window
            this.currentTop = this.windowTop;
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );