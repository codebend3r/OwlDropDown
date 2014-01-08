var CS = {};


CS.init = function () {

    ko.applyBindings(CS.ViewModel());
    console.log('OWL DROPDOWN');
    $('.province-picker').owldropdown();

};