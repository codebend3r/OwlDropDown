/*
 * Owl Dropdown
 * crivas.net
 *
 * Author: Chester Rivas
 * Version: 1.1
 */

var Owl = Owl || {};

Owl.event = Owl.event || {};
Owl.event.DROPDOWNOPENED = 'dropdownopened';
Owl.event.DROPDOWNCLOSED = 'dropdownclosed';
Owl.event.DROPDOWNITEMSELECTED = 'dropdownitemselected';

$.fn.owldropdown = function(options) {

    var settings = $.extend({
        // These are the defaults.
        labelElement: 'p',
        dropDownElement: 'ul',
        changeLabelOnItemClick: false,
        customActionOnClick: function(){},
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
        $this.css({
            height: settings.componentHeight
        });
        $this.find('> .' + settings.labelElement).css({
            height: settings.componentHeight
        });
        $this.find(settings.dropDownElement).find('li').css({
            height: settings.dropdownHeight
        });
        $this.find(settings.dropDownElement).css({
            zIndex: '99997'
        });
        $this.on('click', openDropDown);

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
                $('body').append("<div class='bg-clickaway'></div>"); // create element on body
                $('div.bg-clickaway').css({ // style hidden background
                    width: '200%',
                    height: '200%',
                    position: 'fixed',
                    backgroundColor: 'rgba(0,0,0,0)',
                    display: 'block',
                    left: '0px',
                    top: '0px',
                    zIndex: '99996'
                });
                $('div.bg-clickaway').on('click', closeDropDown); // add handler for background clicking
            }
        }
        $this.off('click'); // remove handler for entire element click
        $this.find(settings.labelElement).on('click', closeDropDown);  // add handlers to close dropdown
        $this.find(settings.dropDownElement).find('li').on('click', itemClicked); // add handler for item clicking
        $this.trigger(Owl.event.DROPDOWNOPENED);
    };

    var closeDropDown = function() {
        menuOpen = false;
        if ($this.find(settings.dropDownElement).hasClass('open')) $this.find(settings.dropDownElement).removeClass('open');
        if ($('.bg-clickaway').length) $('.bg-clickaway').remove(); // remove background click away element
        $this.find(settings.dropDownElement).find('li').off('click'); // remove handlers for for item clicking
        $this.on('click', openDropDown); // re-add open dropdown handler
        $this.trigger(Owl.event.DROPDOWNCLOSED);
    };

    var itemClicked = function(e) {
        var itemTextValue = $(e.currentTarget).text();
        if (settings.changeLabelOnItemClick) $this.find(settings.labelElement).text(itemTextValue); // change label element text on item click
        if (settings.closeWhenSelected) closeDropDown(); // close dropdown when item is clicked
        settings.customActionOnClick.call(settings); // call custom method if defined
        $this.trigger(Owl.event.DROPDOWNITEMSELECTED, itemTextValue);
        e.stopPropagation();
    };

    initDropdown();
};