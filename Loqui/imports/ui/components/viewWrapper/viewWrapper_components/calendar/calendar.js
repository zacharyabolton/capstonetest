import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Events } from '../../../../../api/events/events.js';

import './calendar.html';

let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

Template.calendar.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.calendar.onRendered(()=>{
  $('#events-calendar').fullCalendar({
    events: function( start, end, timezone, callback ) {
      var selectedDep = Session.get('selectedDep');

      let data = Events.find(selectedDep).fetch().map( ( event ) => {
        event.editable = !isPast( event.start );
        return event;
      });

      //Here, we're saying once our data is available, 
      //go ahead and "update" the calendar. 
      if ( data ) {
        callback( data );
      }
    },
    timezone: "America/Sao_Paulo",
    //update our initialization of FullCalendar to customize event styles
    eventRender: function( event, element ) {
      element.find( '.fc-content' ).html(
        `<h4>${ event.title }</h4>
         <p class="type-${ event.department }">#${ event.department }</p>
        `
      );
    },
    eventClick: function( event ) {
      Session.set( 'eventModal', { type: 'edit', event: event._id } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    }
  });
  //to ensure that our calendar data always updates
  Tracker.autorun( () => {
    Events.find().fetch();
    $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  });
});