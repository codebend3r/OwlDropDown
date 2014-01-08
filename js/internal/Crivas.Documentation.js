
CS.documentation = {

    options: [
		{
			key: 'labelElement',
			defaultValue: 'p',
			type: 'N/A',
			description: 'N/A',
			required: false
		},
		{
			key: 'dropDownElement',
			defaultValue: 'ul',
			type: 'N/A',
			description: 'N/A',
			required: false
		},
		{
			key: 'changeLabelOnItemClick',
			defaultValue: 'false',
			type: 'N/A',
			description: 'N/A',
			required: false
		},
		{
			key: 'clickAway',
			defaultValue: 'true',
			type: 'N/A',
			description: 'N/A',
			required: false
		},
		{
			key: 'closeWhenSelected',
			defaultValue: 'true',
			type: 'N/A',
			description: 'N/A',
			required: false
		},
		{
			key: 'componentWidth',
			defaultValue: '100',
			type: 'N/A',
			description: 'N/A',
			required: false
		},
		{
			key: 'componentHeight',
			defaultValue: '35',
			type: 'N/A',
			description: 'N/A',
			required: false
		},
		{
			key: 'dropdownHeight',
			defaultValue: 'settings.componentHeight',
			type: 'N/A',
			description: 'N/A',
			required: false
		}
    ],
	
	events: [
		{
			constant: 'Owl.event.DROPDOWNOPENED',
			eventName: 'dropdownopened',
			description: 'Dispatched when the dropdown element is open.',
			params: {}
		},
		{
			constant: 'Owl.event.DROPDOWNCLOSED',
			eventName: 'dropdownclosed',
			description: 'Dispatched when the dropdown element is closed.',
			params: {}
		},
		{
			constant: 'Owl.event.DROPDOWNITEMSELECTED',
			eventName: 'dropdownitemselected',
			description: 'Triggered when and dropdown item is clicked on.',
			params: {
				name: 'itemTextValue',
				value: 'The string value of the item that\'s clicked'
			}
		}
	]

};