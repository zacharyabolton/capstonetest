Accounts.ui.config({
  requestPermissions: {},
  extraSignupFields: [
    {
      fieldName: 'first-name',
      fieldLabel: 'First name',
      inputType: 'text',
      visible: true,
      validate: function(value, errorFunction) {
        if (!value) {
          errorFunction("Please write your first name");
          return false;
        } else {
          return true;
        }
      }
    },
    {
      fieldName: 'last-name',
      fieldLabel: 'Last name',
      inputType: 'text',
      visible: true,
    },
    {
      fieldName: 'contributor',
      fieldLabel: 'I am a',
      inputType: 'radio',
      showFieldLabel: true,       // If true, fieldLabel will be shown before radio group
      radioLayout: 'horizontal',  // It can be 'inline' or 'vertical'
      data: [{                    // Array of radio options, all properties are required
  		    id: 1,                      // id suffix of the radio element
          label: 'User',          // label for the radio element
          value: '',              // value of the radio element, this will be saved.
          checked: 'checked'              
        }, {
          id: 2,
          label: 'Contributor',
          value: 'Y'
      }],
      visible: true
    },
    {
      fieldName: 'institution',
      fieldLabel: 'institution',
      inputType: 'text',
      visible: false
    }]
});