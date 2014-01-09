/*
 * Owl Dropdown
 * crivas.net
 *
 * Author: Chester Rivas
 * Version: 1.2
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
		clickAway: true,
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
		if (settings.inLineStyling) {
			$this.css({ // list
				width: settings.labelWidth
			});
		}
		if (settings.inLineStyling) {
			$this.find(labelSelector).css({ // label <p>
				zIndex: '9991',
				position: 'relative'
				//width: settings.labelWidth,
				//height: settings.labelHeight,
				//lineHeight: typeof settings.labelHeight == 'number' ? settings.labelHeight + 'px' : settings.labelHeight
			});
		}
		$this.find(listItemSelector).css({ // list <ul>
			zIndex: '9992',
			position: 'relative'
		});
		if (settings.inLineStyling) {
			$this.find(listItemSelector).find('li').css({ // list item <li>
				//width: settings.dropDownWidth,
				//height: settings.dropDownHeight
			});
		}

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

		//console.log('settings.defaultLabel', typeof settings.defaultLabel);
		//console.log('settings.defaultValue', typeof settings.defaultValue);
		//console.log('settings.labelSelector', typeof settings.labelSelector);
		//console.log('settings.allowResetToDefault', typeof settings.allowResetToDefault);

		if (typeof settings.defaultLabel !== 'undefined') {
			$this.find(labelSelector).text(settings.defaultLabel);
		}

		$this.on('click', toggleDropDown);
		$this.find(listItemSelector).find('li').on('click', itemClicked); // add handler for item clicking

	};

	var getDefaultValue = function() {
		return typeof settings.defaultValue !== 'null' ? settings.defaultValue : settings.defaultLabel;
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
		if (!$this.find(listItemSelector).hasClass('open')) {
			$this.find(listItemSelector).addClass('open');
			$this.find(labelSelector).addClass('open');
		}
		if (settings.clickAway) {
			if (!$('.bg-clickaway').length) {
				$('body').append("<div class='bg-clickaway'></div>"); // create element on body
				$('div.bg-clickaway').css({ // style hidden background
					width: '200%',
					height: '200%',
					position: 'fixed',
					backgroundColor: 'rgba(0,0,0,.9)',
					display: 'block',
					left: '0px',
					top: '0px',
					zIndex: '9990'
				});
				$('div.bg-clickaway').on('click', closeDropDown); // add handler for background clicking
			}
		}
		$this.off('click'); // remove handler for entire element click
		$this.find(labelSelector).on('click', closeDropDown);  // add handlers to close dropdown
		/*
		if (settings.enableArrowKeys) {
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
	};

	var closeDropDown = function() {
		menuOpen = false;
		if ($this.find(listItemSelector).hasClass('open')) {
			$this.find(listItemSelector).removeClass('open');
			$this.find(labelSelector).removeClass('open');
		}
		if ($('.bg-clickaway').length) $('.bg-clickaway').remove(); // remove background click away element
		//$this.find(listItemSelector).find('li').off('click'); // remove handlers for for item clicking
		$this.on('click', openDropDown); // re-add open dropdown handler
		/*
		if (settings.enableArrowKeys) {
		$(document).off('keydown');
		}
		*/
		$this.trigger(Owl.event.DROPDOWNCLOSED);
	};

	var itemClicked = function(e) {
		console.log('itemClicked');
		//var itemTextValue = $(e.currentTarget).text().replace(/\s+/g, ''),
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
	};

	initDropdown();
};