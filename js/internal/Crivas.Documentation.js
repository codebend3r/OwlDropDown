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
		    description: 'The default label to display on initializing.',
		    required: false
	    },
	    {
		    key: 'defaultValue',
		    defaultValue: '-1',
		    type: 'N/A',
		    description: 'The default value for the default label.',
		    required: false
	    },
	    {
		    key: 'defaultIndex',
		    defaultValue: 0,
		    type: 'Number',
		    description: 'The default index the plugin will initialize. By default it\'s 0.',
		    required: false
	    },
	    {
		    key: 'innerListItemSelector',
		    defaultValue: 'undefined',
		    type: 'String | Selector',
		    description: 'A JQuery selector which is used to get and set the value within a list item, ie: $(\'span\')',
		    required: false
	    },
		{
			key: 'labelElement',
			defaultValue: 'p',
			type: 'String',
			description: 'The tag representing the label shown when dropdown is closed. By default it\'s set to p meaning &lt;p&gt; tag.',
			required: false
		},
		{
			key: 'dropDownElement',
			defaultValue: 'ul',
			type: 'String',
			description: 'The tag representing the dropdown element. By default it\'s set to p meaning &lt;ul&gt; tag.',
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
			description: 'Whether to close the dropdown when clicked away from the dropdown.',
			required: false
		},
		{
			key: 'closeWhenSelected',
			defaultValue: 'true',
			type: 'N/A',
			description: 'Whether to close the dropdown when a value is selected.',
			required: false
		},
		{
			key: 'enableArrowKeys',
			defaultValue: 'true',
			type: 'N/A',
			description: 'Whether to use keyboard arrows and enter key to toggle through the dropdown options.',
			required: false
		},
		{
			key: 'labelWidth',
			defaultValue: '160',
			type: 'N/A',
			description: 'The width of the label element.',
			required: false
		},
		{
			key: 'labelHeight',
			defaultValue: '25',
			type: 'N/A',
			description: 'The height of the label element.',
			required: false
		},
		{
			key: 'dropDownWidth',
			defaultValue: '160',
			type: 'N/A',
			description: 'The width of the dropdown element.',
			required: false
		},
		{
			key: 'dropdownHeight',
			defaultValue: '25',
			type: 'N/A',
			description: 'The height of the dropdown element.',
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
			description: 'Triggered when and dropdown item is selected.',
			params: [
				{
					name: 'itemTextValue',
					value: 'The string value of the item that\'s selected'
				},
				{
					name: 'itemIndexValue',
					value: 'The index value of the item that\'s selected'
				}
			]
		}
	]

};