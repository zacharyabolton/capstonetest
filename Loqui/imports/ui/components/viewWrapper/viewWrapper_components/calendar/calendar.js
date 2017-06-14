import {Template} from 'meteor/templating';

import {Events} from '../../../../../api/events/events.js';

import './calendar.html';

Template.calendar.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.calendar.onRendered( () => {
  $( '#events-calendar' ).fullCalendar({
  	events( start, end, timezone, callback ) {
      let data = Events.find().fetch().map( ( event ) => {
        event.editable = !isPast( event.start );
        return event;
      });

      if ( data ) {
        callback( data );
      }
    }
  });
});