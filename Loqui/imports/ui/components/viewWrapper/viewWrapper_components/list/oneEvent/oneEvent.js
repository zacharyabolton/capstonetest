import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker'

import './oneEvent.html';

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

Template.oneEvent.events({
  'click li': function( event, template ){
    if(Meteor.userId() === this.event.owner){
      Session.set( 'eventModal', { type: 'edit', event: this.event._id } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    }else{
      Session.set( 'detailsModal', { type: 'viewDetails', event: this.event._id } );
      $( '#details-view-modal' ).modal( 'show' );
    }
  }
})

Template.oneEvent.helpers({
  formatDate(start) {
    var dayNumber = moment(start).format("Do");
    return dayNumber;
  },
  dayOfWeek(start) {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var x = Number(new Date(start).getDay());
    var dayName = days[x];
    return dayName;
  },
  indicator(event){
    var depName = event.department;
    if(Meteor.user().profile.contributor){
      if(Meteor.userId() === event.owner){
        return Spacebars.SafeString(`<span class="glyphicon glyphicon-star" 
                                          aria-hidden="true" 
                                          style="color: ${numValueOfDepName(depName)}">
                                    </span>`);;
      }else{
        return ``;
      }
    }else{
      var eventId = event._id;
      var interestedArray = Meteor.user().profile.interested;
      for (var i = interestedArray.length - 1; i >= 0; i--) {
        if(interestedArray[i] === eventId){
          return Spacebars.SafeString(`<span class="glyphicon glyphicon-ok" 
                                            aria-hidden="true" 
                                            style="color: ${numValueOfDepName(depName)}">
                                      </span>`);
        }else{
          continue;
        }
      }
      return ``;
    }
  }
});

let testForEvents = function(nodes){
  if(nodes === 0){
    var elem = document.getElementById('noEventMSG');
    elem.style.display = "initial";
  }else if(nodes > 0){
    var elem = document.getElementById('noEventMSG');
    elem.style.display = "none";
  }else{
    nodes = 0;
  };
};

Tracker.autorun(() => {//for "no events" view
  var nodes = 0;

  Template.oneEvent.onRendered( () => {
    nodes++;
    testForEvents(nodes);
  });

  Template.oneEvent.onDestroyed( () => {
    nodes--;
    testForEvents(nodes);
  });
});
