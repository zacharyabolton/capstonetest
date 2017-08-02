import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Events } from '../../../../../api/events/events.js';

import './calendar.html';
import '../../../day-view/day-view.html';
import '../../../day-view/day-view.js';

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
        var input = (depName+"      ").toLowerCase().split('');
        var chars = ' abcdefghijklmnopqrstuvwxyz';
        var letters = '0123456789ABCDEFBCDE1234567'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ){
          color += letters[chars.indexOf(input[i])];
        }
        return color;
      };
      element.find( '.fc-content' ).html(//Event token html injection
        ` <h4>${ event.title }</h4>
          <hr class=" depIndicator 
                      ${event.department}
                    " 
              style=" background-color: ${numValueOfDepName(event.department)};
                    "
          >
        `
      );//END Event token html injection
    },
    eventClick: function( event ) {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if(w > 575){
        Session.set( 'eventModal', { type: 'edit', event: event._id } );
        $( '#add-edit-event-modal' ).modal( 'show' );
      }else{
        Session.set('selectedDay', event.start.format("YYYY-DD-MM"));
        var dayView = Session.get('selectedDay');
        alert(dayView);
      }
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