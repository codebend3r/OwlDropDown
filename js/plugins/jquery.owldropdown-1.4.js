/*!
 * pluginName: OwlDropDown
 * author: Chester Rivas
 * website: crivas.net
 * description: jquery plugin for dropdown/combobox support, customizable actions and events
 * version: 1.4
 * Copyright (c) 2014 Crivas Inc.
 */

var Owl = Owl || {};

Owl.event = Owl.event || {};
Owl.event.DROPDOWNOPENED = 'dropdownopened';
Owl.event.DROPDOWNCLOSED = 'dropdownclosed';
Owl.event.DROPDOWNITEMSELECTED = 'dropdownitemselected';
Owl.event.DEFAULTSELECTED = 'defaultselected';

$.fn.owldropdown = function (options) {

	var settings = $.extend({
		// These are the defaults.
		defaultLabel: undefined,
		defaultValue: undefined,
		innerListItemSelector: undefined,
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
		dropDownHeight: 25,
		defaultIndex: 0
	}, options);

	var $this = this,
		menuOpen = false,
		currentItemNumber = 0,
		owlDropdownClassName = 'owl-dropdown',
		owlLabelClassName = 'owl-label',
		owlListClassName = 'owl-list',
		labelSelector = settings.labelElement + '.' + owlLabelClassName,
		listItemSelector = settings.listItemElement + '.' + owlListClassName;

	$this.currentLabel = null;
	$this.currentID = null;

	/**
	 init plugin

	 @method initDropdown
	 **/
	$this.initDropdown = function () {

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
			zIndex: $this.findHighestZIndex()
		});
		$this.find(listItemSelector).css({ // list <ul>
			zIndex: $this.findHighestZIndex()
		});
		$this.find(listItemSelector).find('li').css({ // list item <li>
		});

		$this.find(listItemSelector).find('li').each(function (i) {
			$(this).attr('buttonid', i);
		});

		if (settings.allowResetToDefault) {
			var prependElement = $($this.find(listItemSelector).find('li')[0]).clone(),
				defaultItemValue = '',
				innerLabelElement;
			$(prependElement).addClass('default');
			$(prependElement).attr('buttonid', '-1');
			innerLabelElement = typeof settings.innerListItemSelector == 'null' ?
				$(prependElement) :
				$(prependElement).find(settings.innerListItemSelector);
			if (typeof settings.defaultValue !== 'null') {
				defaultItemValue = settings.defaultValue;
			} else if (typeof settings.defaultLabel !== 'null') {
				defaultItemValue = settings.defaultLabel;
			} else {
				defaultItemValue = '';
			}
			$(innerLabelElement).text(defaultItemValue);
			$this.find(listItemSelector).prepend(prependElement);
		}

		if (typeof settings.defaultLabel !== 'undefined') {
			$this.find(labelSelector).text(settings.defaultLabel);
		} else {
			var firstValue = typeof settings.innerListItemSelector == 'null' ?
				$($this.find(listItemSelector).find('li').find(settings.innerListItemSelector)[settings.defaultIndex]).text().trim() :
				$($this.find(listItemSelector).find('li')[settings.defaultIndex]).text().trim();
			$this.find(labelSelector).text(firstValue);
		}

		$this.find(labelSelector).on('click', $this.toggleDropDown);
		$this.find(listItemSelector).find('li').on('click', $this.itemClicked); // add handler for item clicking

	};

	$this.getDefaultValue = function () {
		return typeof settings.defaultValue !== 'undefined' ? settings.defaultValue : settings.defaultLabel;
	};

	$this.toggleDropDown = function () {
		menuOpen = !menuOpen;
		if (menuOpen) {
			$this.openDropDown();
		} else {
			$this.closeDropDown();
		}
		return false;
	};

	$this.openDropDown = function () {
		menuOpen = true;
		$this.addClass('open');
		$this.find(listItemSelector).addClass('open');
		$this.find(labelSelector).addClass('open');
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
					zIndex: $this.findHighestZIndex() + 1
				});
				$('div.bg-clickaway').on('click', $this.closeDropDown); // add handler for background clicking
			}
			//$this.off('click'); // remove handler for entire element click
		}
		//$this.find(labelSelector).on('click', closeDropDown);  // add handlers to close dropdown
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

		$this.trigger(Owl.event.DROPDOWNOPENED);
		//return false;
	};

	$this.closeDropDown = function () {
		menuOpen = false;
		$this.removeClass('open');
		$this.find(listItemSelector).removeClass('open');
		$this.find(labelSelector).removeClass('open');
		if ($('.bg-clickaway').length) $('.bg-clickaway').remove(); // remove background click away element
		$this.on('click', $this.openDropDown); // re-add open dropdown handler
		if (settings.enableArrowKeys) {
			$(document).off('keydown');
		}
		$this.trigger(Owl.event.DROPDOWNCLOSED);
		//return false;
	};

	$this.itemClicked = function (e) {
		$this.currentLabel = $(e.currentTarget).text().trim();
		$this.currentID = $(e.currentTarget).attr('buttonid');

		if ($this.currentID == '-1') {
			if (settings.changeLabelOnItemClick) $this.find(labelSelector).text(settings.defaultLabel); // change label element text on item click
			$this.trigger(Owl.event.DEFAULTSELECTED, [ $this.getDefaultValue(), $this.currentID ]);
			$this.trigger(Owl.event.DROPDOWNITEMSELECTED, [ $this.getDefaultValue(), $this.currentID ]);
		} else {
			if (settings.changeLabelOnItemClick) $this.find(labelSelector).text($this.currentLabel); // change label element text on item click
			$this.trigger(Owl.event.DROPDOWNITEMSELECTED, [ $this.currentLabel, $this.currentID ]);
		}
		if (settings.closeWhenSelected) $this.closeDropDown(); // close dropdown when item is clicked
		e.stopPropagation();
		//return false;
	};

	$this.findHighestZIndex = function (elem) {
		var elems = document.getElementsByTagName(elem);
		var highest = 100;
		for (var i = 0; i < elems.length; i++) {
			var zindex = document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index");
			if ((zindex > highest) && (zindex != 'auto')) {
				highest = zindex;
			}
		}
		return highest;
	};

	$this.initDropdown();

	return $this;
};