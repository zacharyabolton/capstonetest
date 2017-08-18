import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Events } from '../../../../../api/events/events.js';

import './calendar.html';
import './day-view/day-view.html';
import './day-view/day-view.js';

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
      var eventsIveAdded = Session.get('seeEventsIveAdded');
      var interestingArray = Session.get('interestingEventsFilter');

      let data = Events.find({ $and: [selectedDep, eventsIveAdded, interestingArray]}).fetch().map( ( event ) => {
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
      let indicator = function(event){
        var depName = event.department;
        if(Meteor.user().profile.contributor){
          if(Meteor.userId() === event.owner) {
            return `<span class="glyphicon glyphicon-star" 
                          aria-hidden="true" 
                          style="color: ${numValueOfDepName(depName)}">
                    </span>`;
          }else{
            return ``;
          }
        }else{
          var eventId = event._id;
          var interestedArray = Meteor.user().profile.interested;
          for (var i = interestedArray.length - 1; i >= 0; i--) {
            if(interestedArray[i] === eventId){
              return `<span class="glyphicon glyphicon-ok" 
                            aria-hidden="true" 
                            style="color: ${numValueOfDepName(depName)}">
                      </span>`;
            }else{
              continue;
            }
          }
          return ``;
        }
      };
      element.find( '.fc-content' ).html(//Event token html injection
        ` <h4>${ indicator(event) } ${ event.title }</h4>
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
        if(Meteor.userId() === event.owner){
          Session.set( 'eventModal', { type: 'edit', event: event._id } );
          $( '#add-edit-event-modal' ).modal( 'show' );
        }else{
          Session.set( 'detailsModal', { type: 'viewDetails', event: event._id } );
          $( '#details-view-modal' ).modal( 'show' );//this is where i load in the details page for events...
        }
      }else{
        var selection = {start: {
          $gte: new Date(event.start.format("YYYY-MM-DD")+"T00:00:00"),
          $lt: new Date(event.start.format("YYYY-MM-DD")+"T23:59:59")
        }};
        Session.get('selectedDay');
        Session.set('selectedDay', selection);

        Session.get('dayHeader');
        Session.set('dayHeader', event.start.format("dddd MMM Do"));

        //here i want to trigger a scrol to the dayView
        $('html,body').animate({
        scrollTop: $(".mobileDayView").offset().top},
        'slow');
      }
    }
  });
  //to ensure that our calendar data always updates
  Tracker.autorun( () => {
    Events.find().fetch();
    $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  });
});