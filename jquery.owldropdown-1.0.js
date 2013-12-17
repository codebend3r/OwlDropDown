/*
 * Owl Dropdown
 * crivas.net
 *
 * Author: Chester Rivas
 * Version: 1.0
 */

var Owl = {};

$.fn.owldropdown = function(options) {

    var settings = $.extend({
        // These are the defaults.
        clickAway: false,
        clickAgainToClose: true,
        componentWidth: 100,
        componentHeight: 35,
        dropdownHeight: this.componentHeight
    }, options);

    var $this = this,
        $label = 'a',
        $ul = 'ul',
        menuOpen = false,
        componentWidth = settings.componentWidth,
        componentHeight = settings.componentHeight,
        clickAway = settings.clickAway,
        clickAgainToClose = settings.clickAgainToClose,
        owlDropdownClassName = 'owl-dropdown',
        owlLabelClassName = 'owl-label',
        owlListClassName = 'owl-list';

    /**
     init plugin

     @method initDropdown
     **/
    var initDropdown = function() {

        $this.addClass(owlDropdownClassName);
        $this.find($label).addClass(owlLabelClassName);
        $this.find($ul).addClass(owlListClassName);

        $this.find('.' + owlDropdownClassName).css({
            height: settings.componentHeight,
            lineHeight: settings.componentHeight + 'px'
        });

        $this.find('li').css({
            height: settings.dropdownHeight,
            lineHeight: settings.dropdownHeight + 'px'
        });

        $this.find('> .' + owlLabelClassName).css({
            height: settings.componentHeight,
            lineHeight: settings.componentHeight + 'px'
        });

        $this.on('click', function(){
            clickAway = !clickAway;
            if (clickAway) {
                if (!$this.find('ul').hasClass('open')) $this.find('ul').addClass('open');
            } else {
                if ($this.find('ul').hasClass('open')) $this.find('ul').removeClass('open');
            }
        });

    };

    initDropdown();
};