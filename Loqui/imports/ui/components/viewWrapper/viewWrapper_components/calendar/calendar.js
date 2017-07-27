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
    height: "auto",
    //update our initialization of FullCalendar to customize event styles
    eventRender: function( event, element ) {
      let numValueOfDepName = function(depName){
        var chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      let getRandomColor = function() {
          var letters = '0123456789ABCDEF'.split('');
          var color = '#';
          for (var i = 0; i < 6; i++ ) {
              color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
      };
      element.find( '.fc-content' ).html(//Event token html injection
        ` <h4>${ event.title }</h4>
          <h5 class=" depIndicator 
                      ${event.department}
                    " 
              style=" color: ${getRandomColor()}; 
                      font-size: 0.5rem;
                    "
          >
            <span class="glyphicon glyphicon-education" aria-hidden="true"></span>
          </h5>
        `
      );//END Event token html injection
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

Template.calendar.helpers({
  colorGenerator(){
    console.log("colorGenerator fired");
  }
})