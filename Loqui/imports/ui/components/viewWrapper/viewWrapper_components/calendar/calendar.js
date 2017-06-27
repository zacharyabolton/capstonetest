import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Events } from '../../../../../api/events/events.js';

import './calendar.html';

let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

Template.calendar.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );

  this.state = new ReactiveDict();
});

Template.calendar.onRendered( () => {
  $( '#events-calendar' ).fullCalendar({
    events( start, end, timezone, callback ) {
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
    //update our initialization of FullCalendar to customize event styles
    eventRender( event, element ) {
      element.find( '.fc-content' ).html(
        `<h4>${ event.title }</h4>
         <p class="type-${ event.department }">#${ event.department }</p>
        `
      );
    },eventDrop( event, delta, revert ) {
      let date = event.start.format();
      if ( !isPast( date ) ) {
        let update = {
          _id: event._id,
          start: date,
          end: date
        };

        Meteor.call( 'editEvent', update, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          }
        });
      } else {
        revert();
        Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
      }
    },
    dayClick( date ) {
      Session.set( 'eventModal', { type: 'add', date: date.format() } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    },
    eventClick( event ) {
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