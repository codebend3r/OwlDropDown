var Owl = Owl || {};

Owl.event = Owl.event || {};
Owl.event.DROPDOWNOPENED = 'dropdownopened';
Owl.event.DROPDOWNCLOSED = 'dropdownclosed';
Owl.event.DROPDOWNITEMSELECTED = 'dropdownitemselected';

$.fn.owldropdown = function(options) {

    var settings = $.extend({
        // These are the defaults.
        labelElement: 'p',
        listItemElement: 'ul',
        changeLabelOnItemClick: true,
        clickAway: true,
        closeWhenSelected: true,
        enableArrowKeys: true,
        componentWidth: 160,
        componentHeight: 25,
        dropdownHeight: this.componentHeight
    }, options);

    var $this = this,
        menuOpen = false,
        currentItemNumber = 0,
        owlDropdownClassName = 'owl-dropdown',
        owlLabelClassName = 'owl-label',
        owlListClassName = 'owl-list',
        labelSelector = settings.labelElement + '.' + owlLabelClassName,
        listItemSelector = settings.listItemElement + '.' + owlListClassName;

    /**
     init plugin

     @method initDropdown
     **/
    var initDropdown = function() {

        $this.addClass(owlDropdownClassName);
        $this.find(settings.labelElement).addClass(owlLabelClassName);
        $this.find(settings.listItemElement).addClass(owlListClassName);
        $this.css({
            height: settings.componentHeight
        });
        $this.find('> .' + settings.labelElement).css({
            height: settings.componentHeight
        });
        $this.find(settings.listItemElement).find('li').css({
            height: settings.dropdownHeight
        });
        $this.find(settings.listItemElement).css({
            zIndex: '99997'
        });
        $this.on('click', openDropDown);

        /*
        if (settings.enableArrowKeys) {
            $(document).keydown(function(e){
                console.log('keyCode', e.keyCode);
                if (e.keyCode == 38) {
                    currentItemNumber -= 1;
                    var labelValue = $this.find(listItemSelector).find('li')[currentItemNumber].text();
                    console.log(labelValue);
                    $this.find(labelSelector).text(labelValue); 
                    return false;
                } else if (e.keyCode == 40) {
                    var labelValue = $this.find(listItemSelector).find('li')[currentItemNumber].text();
                    console.log(labelValue);
                    $this.find(labelSelector).text(labelValue);
                    currentItemNumber += 1;
                    return false;
                }
            });
        }
        */

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
        if (!$this.find(listItemSelector).hasClass('open')) $this.find(listItemSelector).addClass('open');
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
        $this.find(labelSelector).on('click', closeDropDown);  // add handlers to close dropdown
        $this.find(listItemSelector).find('li').on('click', itemClicked); // add handler for item clicking
        $this.trigger(Owl.event.DROPDOWNOPENED);
    };

    var closeDropDown = function() {
        menuOpen = false;
        if ($this.find(listItemSelector).hasClass('open')) $this.find(listItemSelector).removeClass('open');
        if ($('.bg-clickaway').length) $('.bg-clickaway').remove(); // remove background click away element
        $this.find(listItemSelector).find('li').off('click'); // remove handlers for for item clicking
        $this.on('click', openDropDown); // re-add open dropdown handler
        $this.trigger(Owl.event.DROPDOWNCLOSED);
    };

    var itemClicked = function(e) {
        var itemTextValue = $(e.currentTarget).text();
        if (settings.changeLabelOnItemClick) $this.find(labelSelector).text(itemTextValue); // change label element text on item click
        if (settings.closeWhenSelected) closeDropDown(); // close dropdown when item is clicked
        $this.trigger(Owl.event.DROPDOWNITEMSELECTED, itemTextValue);
        e.stopPropagation();
    };

    initDropdown();
};