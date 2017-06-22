import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {Events} from '../../../../../api/events/events.js';

import './list.html';

let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

Template.list.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.list.helpers({
	events() {
    return Events.find({});
  },
  // events( start, end, timezone, callback ) {
  //   let data = Events.find().fetch().map( ( event ) => {
  //     event.editable = !isPast( event.start );
  //     return event;
  //   });

  //   //Here, we're saying once our data is available, 
  //   //go ahead and "update" the calendar. 
  //   if ( data ) {
  //     callback( data );
  //   }
  // },
  // //update our initialization of FullCalendar to customize event styles

  // // dayClick( date ) {
  // //   Session.set( 'eventModal', { type: 'add', date: date.format() } );
  // //   $( '#add-edit-event-modal' ).modal( 'show' );
  // // },
  // eventClick( event ) {
  //   Session.set( 'eventModal', { type: 'edit', event: event._id } );
  //   $( '#add-edit-event-modal' ).modal( 'show' );
  // }

  // //to ensure that our calendar data always updates
  // // Tracker.autorun( () => {
  // //   Events.find().fetch();
  // //   $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  // // });
});