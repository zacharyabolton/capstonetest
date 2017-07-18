import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {Events} from '../../../../../api/events/events.js';

import './list.html';

let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let today = new Date();
//today.setDate(today.getDate());

let upcoming = {
  start: {
    $gt: today
  }
}

Template.list.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.list.events({
  'click .divEvent': function( event ){
    Session.set( 'eventModal', { type: 'edit', event: event._id } );
    $( '#add-edit-event-modal' ).modal( 'show' );
    console.log();
  }
})

Template.list.helpers({
  formatDate(start) {
    var dayNumber = moment(start).utc().format("Do");
    return dayNumber;
  },
  dayOfWeek(start) {
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var x = Number(new Date(start).getDay());
    var dayName = days[x];
    return dayName;
  },
  getYears(){
    var selectedDep = Session.get('selectedDep');
    const years = Events.find({ $and: [ selectedDep, upcoming ] },
      {sort: {start: 1}}).map(event=>moment(event.start).utc().year());
    return _.uniq(years)
  },
  getMonths(year){
    var selectedDep = Session.get('selectedDep');
    const months = Events.find(
      { $and: [
        {start: {$gte: new Date(year,0,1), $lt: new Date(year+1,0,1)}},
        selectedDep,
        upcoming
        ]},
      {sort: {start: 1}}).map(event=>moment(event.start).utc().month());
    return _.uniq(months); // this returns integers in [0,11]
  },
  getEvents(monthNumber,year){
    var selectedDep = Session.get('selectedDep');
    
    return Events.find(
      { $and: [
        {start: {$gte: new Date(year,monthNumber,0), $lt: new Date(year,monthNumber+1,0)}},
        selectedDep,
        upcoming
      ]},
      {sort: {start: 1}});
  },
  monthName(month){
    return monthNames[month];
  }
});
