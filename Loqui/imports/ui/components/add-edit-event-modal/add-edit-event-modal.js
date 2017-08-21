import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import {Events} from '../../../api/events/events.js';

import './add-edit-event-modal.html';

let closeModal = () => {
	$( '#add-edit-event-modal' ).modal( 'hide' );
	$( '.modal-backdrop' ).fadeOut();
};

Template.addEditEventModal.onRendered(function() {
    $('.input-daterange').datepicker({
      autoclose: true,
      todayHighlight: true
    });
});

Template.addEditEventModal.helpers({
  modalType( type ) {
    let eventModal = Session.get( 'eventModal' );
    if ( eventModal ) {
      return eventModal.type === type;
    }
  },
  modalLabel() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {
      return {
        button: eventModal.type === 'edit' ? 'Edit' : 'Add',
        label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
      };
    }
  },
  selected( v1, v2 ) {
    return v1 === v2;
  },
  event() {
    let eventModal = Session.get( 'eventModal' );
    if ( eventModal ) {
      return eventModal.type === 'edit' ? Events.findOne( eventModal.event ) : {
        start: eventModal.date,
        end: eventModal.date
      };
    }
  }
});

Template.addEditEventModal.events({
  'submit form' ( event, template ) {
    event.preventDefault();

    let eventModal = Session.get( 'eventModal' ),
        submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
        eventItem  = {
          title: template.find( '[name="title"]' ).value,
          start: new Date(template.find( '[name="start"]' ).value),
          end: new Date(template.find( '[name="end"]' ).value),
          department: template.find( '[name="department"]' ).value,
          owner: Meteor.userId(),
          description: template.find( '[name="description"]' ).value,
          institution: template.find( '[name="institution"]' ).value,
          location: template.find( '[name="location"]' ).value
        };
    if ( submitType === 'editEvent' ) {
      eventItem._id   = eventModal.event;
    }

    Meteor.call( submitType, eventItem, ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        Bert.alert( `Event ${ eventModal.type }ed!`, 'success' );
        closeModal();
      }
    });
  },
  'click .delete-event' ( event, template ) {
  	event.preventDefault();
    let eventModal = Session.get( 'eventModal' );
    if ( confirm( 'Deleting this is permanent!' ) ) {
      Meteor.call( 'removeEvent', eventModal.event, ( error ) => {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( 'Event deleted!', 'success' );
          closeModal();
        }
      });
    }
  }
});