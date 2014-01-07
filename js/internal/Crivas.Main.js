var CS = {};


CS.init = function () {

    ko.applyBindings(CS.ViewModel());

    CS.initSwipe();

};

CS.initSwipe = function() {

    $('.swipe-area').owlmobileswipe({
        swipe: function(distance) {
	        CS.output('SWIPED', distance);
        }
    });

};

CS.output = function(eventName, dis) {
	var outputString = eventName + ' --> x:' + dis.x + ', y: ' + dis.y;
	console.log(outputString);
	$('.output-container .output').text(outputString);
	//$('.swipe-area p').text(outputString);
};