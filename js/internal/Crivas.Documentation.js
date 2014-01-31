/*
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
*/

CS.documentation = {

    options: [
	    {
		    key: 'defaultLabel',
		    defaultValue: 'undefined',
		    type: 'N/A',
		    description: 'N/A',
		    required: false
	    },
	    {
		    key: 'defaultValue',
		    defaultValue: 'undefined',
		    type: 'N/A',
		    description: 'N/A',
		    required: false
	    },
	    {
		    key: 'defaultIndex',
		    defaultValue: 0,
		    type: 'N/A',
		    description: 'N/A',
		    required: false
	    },
	    {
		    key: 'innerListItemSelector',
		    defaultValue: 'undefined',
		    type: 'String | Selector',
		    description: 'A JQuery selector which is used to get and set the value within a list item',
		    required: false
	    },
		{
			key: 'labelElement',
			defaultValue: 'p',
			type: 'String',
			description: 'N/A',
			required: false
		},
		{
			key: 'dropDownElement',
			defaultValue: 'ul',
			type: 'String',
			description: 'N/A',
			required: false
		},
		{
			key: 'changeLabelOnItemClick',
			defaultValue: 'true',
			type: 'Boolean',
			description: 'Whether to change the label when a drop down value is selected.',
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
			key: 'labelWidth',
			defaultValue: '160',
			type: 'N/A',
			description: 'N/A',
			required: false
		},
		{
			key: 'labelHeight',
			defaultValue: '25',
			type: 'N/A',
			description: 'N/A',
			required: false
		},
		{
			key: 'dropDownWidth',
			defaultValue: '160',
			type: 'N/A',
			description: 'N/A',
			required: false
		},
		{
			key: 'dropdownHeight',
			defaultValue: '25',
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
			params: []
		},
		{
			constant: 'Owl.event.DROPDOWNCLOSED',
			eventName: 'dropdownclosed',
			description: 'Dispatched when the dropdown element is closed.',
			params: []
		},
		{
			constant: 'Owl.event.DROPDOWNITEMSELECTED',
			eventName: 'dropdownitemselected',
			description: 'Triggered when and dropdown item is clicked on.',
			params: [{
				name: 'itemTextValue',
				value: 'The string value of the item that\'s clicked'
			}]
		}
	]

};