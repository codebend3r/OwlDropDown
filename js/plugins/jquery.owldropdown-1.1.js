/*
 * Owl Dropdown
 * crivas.net
 *
 * Author: Chester Rivas
 * Version: 1.2
 */

var Owl = {};

$.fn.owldropdown = function(options) {

    var settings = $.extend({
        // These are the defaults.
        labelElement: 'p',
        dropDownElement: 'ul',
        clickAway: true,
        closeWhenSelected: true,
        componentWidth: 100,
        componentHeight: 35,
        dropdownHeight: this.componentHeight
    }, options);

    var $this = this,
        menuOpen = false,
        owlDropdownClassName = 'owl-dropdown',
        owlLabelClassName = 'owl-label',
        owlListClassName = 'owl-list';

    /**
     init plugin

     @method initDropdown
     **/
    var initDropdown = function() {

        $this.addClass(owlDropdownClassName);
        $this.find(settings.labelElement).addClass(owlLabelClassName);
        $this.find(settings.dropDownElement).addClass(owlListClassName);
        $this.find('.' + owlDropdownClassName).css({
            height: settings.componentHeight
        });
        $this.find('> .' + owlLabelClassName).css({
            height: settings.componentHeight
        });
        $this.find(settings.dropDownElement).find('li').css({
            height: settings.dropdownHeight
        });
        $this.find(settings.dropDownElement).css({
            zIndex: '99997'
        });
        $this.find(settings.labelElement).on('click', toggleDropDown);

    };

    var toggleDropDown = function() {
        menuOpen = !menuOpen;
        if (menuOpen) {
            openDropDown();
        } else {
            closeDropDown();
        }
    };

    var openDropDown = function() {
        menuOpen = true;
        if (!$this.find(settings.dropDownElement).hasClass('open')) $this.find(settings.dropDownElement).addClass('open');
        if (settings.clickAway) {
            if (!$('.bg-clickaway').length) {
                $('body').append("<div class='bg-clickaway'></div>");
                $('div.bg-clickaway').css({
                    width: '200%',
                    height: '200%',
                    position: 'fixed',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'block',
                    left: '0px',
                    top: '0px',
                    zIndex: '99996'
                });
                $('div.bg-clickaway').on('click', closeDropDown);
            }
        }
        $this.find(settings.dropDownElement).find('li').on('click', itemClicked);
    };

    var closeDropDown = function() {
        menuOpen = false;
        if ($this.find(settings.dropDownElement).hasClass('open')) $this.find(settings.dropDownElement).removeClass('open');
        if ($('.bg-clickaway').length) $('.bg-clickaway').remove();
        $this.find(settings.dropDownElement).find('li').off('click');
    };

    var itemClicked = function(e) {
        $this.find(settings.labelElement).text($(e.currentTarget).text());
        if (settings.closeWhenSelected) closeDropDown();
    };

    initDropdown();
};