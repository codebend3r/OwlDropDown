/*!
 * pluginName: OwlDropDown
 * author: Chester Rivas
 * website: crivas.net
 * description: jquery plugin for dropdown/combobox support, customizable actions and events
 * version: 1.3
 * Copyright (c) 2014 Crivas Inc.
 */

var Owl = Owl || {};

Owl.event = Owl.event || {};
Owl.event.DROPDOWNOPENED = 'dropdownopened';
Owl.event.DROPDOWNCLOSED = 'dropdownclosed';
Owl.event.DROPDOWNITEMSELECTED = 'dropdownitemselected';
Owl.event.DEFAULTSELECTED = 'defaultselected';

$.fn.owldropdown = function(options) {

	var settings = $.extend({
		// These are the defaults.
		defaultLabel: undefined,
		defaultValue: undefined,
		labelSelector: undefined,
		allowResetToDefault: false,
		labelElement: 'p',
		listItemElement: 'ul',
		changeLabelOnItemClick: true,
		inLineStyling: true,
		clickAway: false,
		closeWhenSelected: true,
		enableArrowKeys: false,
		labelWidth: 160,
		labelHeight: 25,
		dropDownWidth: 160,
		dropDownHeight: 25
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

		if (settings.allowResetToDefault && typeof settings.defaultLabel == 'undefined' && typeof settings.defaultValue == 'undefined') {
			throw Error('if allowResetDefault is set to true then defaultLabel and defaultValue must be defined');
		}

		$this.addClass(owlDropdownClassName);
		$this.find(settings.labelElement).addClass(owlLabelClassName);
		$this.find(settings.listItemElement).addClass(owlListClassName);
		$this.css({ // list
			width: settings.labelWidth
		});
		$this.find(labelSelector).css({ // label <p>
			zIndex: findHighestZIndex()
		});
		$this.find(listItemSelector).css({ // list <ul>
			zIndex: findHighestZIndex()
		});
		$this.find(listItemSelector).find('li').css({ // list item <li>
		});

		$this.find(listItemSelector).find('li').each(function(i){
			$(this).attr('buttonID', i);
		});

		if (settings.allowResetToDefault) {
			var prependElement = $($this.find(listItemSelector).find('li')[0]).clone();
			$(prependElement).addClass('default');
			$(prependElement).attr('buttonID', '-1');
			var innerLabelElement = typeof settings.labelSelector == 'null' ? $(prependElement) : $(prependElement).find(settings.labelSelector);
			$(innerLabelElement).text(typeof settings.defaultLabel !== 'null' ? settings.defaultLabel : '');
			$this.find(listItemSelector).prepend(prependElement);
		}

		if (typeof settings.defaultLabel !== 'undefined') {
			$this.find(labelSelector).text(settings.defaultLabel);
		}

		$this.on('click', toggleDropDown);
		$this.find(listItemSelector).find('li').on('click', itemClicked); // add handler for item clicking

	};

	var getDefaultValue = function() {
		return typeof settings.defaultValue !== 'undefined' ? settings.defaultValue : settings.defaultLabel;
	};

	var toggleDropDown = function() {
		menuOpen = !menuOpen;
		$this.toggleClass('open');
		$this.find(listItemSelector).toggleClass('open');
		$this.find(labelSelector).toggleClass('open');
		if (menuOpen) {
			openDropDown();
		} else {
			closeDropDown();
		}
		return false;
	};

	var openDropDown = function() {
		menuOpen = true;
		if (settings.clickAway) {
			if (!$('.bg-clickaway').length) {
				$('body').append("<div class='bg-clickaway'></div>"); // create element on body
				$('div.bg-clickaway').css({ // style hidden background
					width: '200%',
					height: '200%',
					position: 'fixed',
					backgroundColor: 'rgba(0,0,0,0.8)',
					display: 'block',
					left: '0px',
					top: '0px',
					zIndex: findHighestZIndex() - 5
				});
				$('div.bg-clickaway').on('click', closeDropDown); // add handler for background clicking
			}
			//$this.off('click'); // remove handler for entire element click
		}
		//$this.find(labelSelector).on('click', closeDropDown);  // add handlers to close dropdown
		/*
		 if (settings.enableAsrrowKeys) {
		 $(document).on('keydown', function (e) {
		 console.log('keyCode', e.keyCode);
		 if (e.keyCode == 38) {
		 currentItemNumber -= 1;
		 var labelValue = $this.find(listItemSelector).find('li')[currentItemNumber].text();
		 console.log(labelValue);
		 $this.find(labelSelector).text(labelValue);
		 e.stopPropagation();
		 } else if (e.keyCode == 40) {
		 var labelValue = $this.find(listItemSelector).find('li')[currentItemNumber].text();
		 console.log(labelValue);
		 $this.find(labelSelector).text(labelValue);
		 currentItemNumber += 1;
		 e.stopPropagation();
		 }
		 });
		 }
		 */
		$this.trigger(Owl.event.DROPDOWNOPENED);
		return false;
	};

	var closeDropDown = function() {
		menuOpen = false;
		if ($('.bg-clickaway').length) $('.bg-clickaway').remove(); // remove background click away element
		$this.removeClass('open');
		$this.find(listItemSelector).removeClass('open');
		$this.find(labelSelector).removeClass('open');
		$this.on('click', openDropDown); // re-add open dropdown handler
		/*
		 if (settings.enableArrowKeys) {
		 $(document).off('keydown');
		 }
		 */
		$this.trigger(Owl.event.DROPDOWNCLOSED);
		return false;
	};

	var itemClicked = function(e) {
		var itemTextValue = $(e.currentTarget).text().trim(),
			itemIDValue = $(e.currentTarget).attr('buttonID');

		if (itemIDValue == '-1') {
			if (settings.changeLabelOnItemClick) $this.find(labelSelector).text(settings.defaultLabel); // change label element text on item click
			$this.trigger(Owl.event.DEFAULTSELECTED, [ getDefaultValue(), itemIDValue ]);
			$this.trigger(Owl.event.DROPDOWNITEMSELECTED, [ getDefaultValue(), itemIDValue ]);
		} else {
			if (settings.changeLabelOnItemClick) $this.find(labelSelector).text(itemTextValue); // change label element text on item click
			$this.trigger(Owl.event.DROPDOWNITEMSELECTED, [ itemTextValue, itemIDValue ]);
		}
		if (settings.closeWhenSelected) closeDropDown(); // close dropdown when item is clicked
		e.stopPropagation();
		return false;
	};

	var findHighestZIndex = function(elem) {
		var elems = document.getElementsByTagName(elem);
		var highest = 100;
		for (var i = 0; i < elems.length; i++)
		{
			var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
			if ((zindex > highest) && (zindex != 'auto'))
			{
				highest = zindex;
			}
		}
		return highest;
	};

	initDropdown();
};