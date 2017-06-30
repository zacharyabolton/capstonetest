import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import {Events} from '../../../api/events/events.js';

import './add-edit-event-modal.html';

let closeModal = () => {
	$( '#add-edit-event-modal' ).modal( 'hide' );
	$( '.modal-backdrop' ).fadeOut();
};

let clearModal = () => {
	$('#add-edit-event-modal').on('hidden.bs.modal', function (e) {
	$(this)
		.find("input,textarea")
			.val('')
			.end();// can remove ; if below is used
		// .find("input[type=checkbox], input[type=radio]")
		//    .prop("checked", "")
		//    .end();
	});
}

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
          start: new Date(template.find( '[name="start"]' ).value).toISOString(),
          end: new Date(template.find( '[name="end"]' ).value).toISOString(),
          department: template.find( '[name="department"]' ).value
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
        clearModal();// added
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
  },
  // this fixes the problem of 2nd edit click showing empty form
  // kinda a hack. I don't like it.
  'click #cancelForm' (){
  	window.location.reload();
  }
});