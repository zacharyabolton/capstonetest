import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {ReactiveDict} from 'meteor/reactive-dict';

import './day-view.html';

import {Events} from '../../../api/events/events.js';

let today = new Date();

let upcoming = {
  start: {
    $gt: today
  }
}

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
		var results = Events.find({ $and: [ selectedDay, Session.get('selectedDep') ] });
		return results;
	},
	formatTimeRange(start, end) {
    var startTime = moment(start).format("h:mm a");
    var endTime = moment(end).format("h:mm a");
    var timeRange = startTime+" to "+endTime;
    return timeRange;
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
