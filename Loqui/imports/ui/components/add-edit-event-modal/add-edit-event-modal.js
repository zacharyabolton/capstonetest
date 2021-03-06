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
      todayHighlight: true,
      startDate: new Date()
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
  },
  pullStart(event){
    if(event){
      return moment(event.start).format('L');
    }else{
      return;
    }
  },
  pullEnd(event){
    if(event){
      return moment(event.end).format('L');
    }else{
      return
    }
  }
});

Template.addEditEventModal.events({
  'submit form' ( event, template ) {
    event.preventDefault();
    let dateAndTime = function(date, hour, minute, ampm){
      var dateAndTime = date+' '+hour+':'+minute+' '+ampm;
      return new Date(dateAndTime);
    };
    let eventModal = Session.get( 'eventModal' ),
        submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
        eventItem  = {
          title: template.find( '[name="title"]' ).value,
          start: dateAndTime(
              template.find( '[name="startDate"]' ).value,
              template.find( '[name="startHour"]' ).value,
              template.find( '[name="startMinute"]' ).value,
              template.find( '[name="startAMPM"]' ).value
            ),
          end: dateAndTime(
              template.find( '[name="endDate"]' ).value,
              template.find( '[name="endHour"]' ).value,
              template.find( '[name="endMinute"]' ).value,
              template.find( '[name="endAMPM"]' ).value
            ),
          department: template.find( '[name="department"]' ).value,
          owner: Meteor.userId(),
          description: template.find( '[name="description"]' ).value,
          institution: Meteor.user().profile.institution,
          location: template.find( '[name="location"]' ).value
        };
    if ( submitType === 'editEvent' ) {
      eventItem._id = eventModal.event;
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