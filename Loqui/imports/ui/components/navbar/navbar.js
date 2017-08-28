import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './navbar.html';

Template.navbar.events({
  'click #submitBtn': function() {
  	$('#add-edit-event-modal').on('hidden.bs.modal', function (e) {
			$(this)
				.find("input,textarea")
					.val('')
					.end().off();
			console.log("ON!");
		});

	  Session.set( 'eventModal', { type: 'add' } );
    $( '#add-edit-event-modal' ).modal( 'show' );

  },
});
