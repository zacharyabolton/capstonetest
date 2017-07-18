import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './navbar.html';

Template.navbar.events({
  'click #submitBtn': function() {
	  Session.set( 'eventModal', { type: 'add' } );
    $( '#add-edit-event-modal' ).modal( 'show' );
  },

});
