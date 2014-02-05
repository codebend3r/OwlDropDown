var CS = {};


CS.init = function () {

	$('.province-picker').owldropdown({
	    defaultLabel: 'Pick a Province Now'
    });

    ko.applyBindings(CS.ViewModel());

};