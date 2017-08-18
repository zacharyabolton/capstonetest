import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import './day-view.html';

import {Events} from '../../../../../../api/events/events.js';

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

Template.dayView.onCreated(function dayViewOnCreated() {
  Session.set('selectedDay', {department: "jsTestDepartment"} );
  Session.set('dayHeader', "" );
});

Template.dayView.helpers({
	dayHeader() {
    return Session.get("dayHeader");
  },
	events(){
		var selectedDay = Session.get('selectedDay');
    var eventsIveAdded = Session.get('seeEventsIveAdded');
    var interestingArray = Session.get('interestingEventsFilter');
		var results = Events.find({ $and: [ selectedDay, Session.get('selectedDep'), eventsIveAdded, interestingArray ] });
		return results;
	},
	formatTimeRange(start, end) {
    var startTime = moment(start).format("h:mm a");
    var endTime = moment(end).format("h:mm a");
    var timeRange = startTime+" to "+endTime;
    return timeRange;
  },
  indicator(department, _id, owner){
    var depName = department;
    if(Meteor.user().profile.contributor){
      if(Meteor.userId() === owner) {
        return Spacebars.SafeString(`<span class="glyphicon glyphicon-star" 
                                          aria-hidden="true" 
                                          style="color: ${numValueOfDepName(depName)}">
                                    </span>`);
      }else{
        return ``;
      }
    }else{
      var interestedArray = Meteor.user().profile.interested;
      for (var i = interestedArray.length - 1; i >= 0; i--) {
        if(interestedArray[i] === _id){
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

Template.dayView.events({
  'click .liEvent': function( event, template ){
    if(Meteor.userId() === this.owner){
      Session.set( 'eventModal', { type: 'edit', event: this._id } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    }else{
      Session.set( 'detailsModal', { type: 'viewDetails', event: this._id } );
      $( '#details-view-modal' ).modal( 'show' );
    }
  }
});
