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
  'click .divEvent': function( event, template ){
    var eventId = event.target.getAttribute("id");
    Session.set( 'eventModal', { type: 'edit', event: eventId } );
    $( '#add-edit-event-modal' ).modal( 'show' );
  }
})

Template.list.helpers({
  formatDate(start) {
    var dayNumber = moment(start).format("Do");
    return dayNumber;
  },
  dayOfWeek(start) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var x = Number(new Date(start).getDay());
    var dayName = days[x];
    return dayName;
  },
  getYears(){
    var selectedDep = Session.get('selectedDep');
    const years = Events.find({ $and: [ selectedDep, upcoming ] },
      {sort: {start: 1}}).map(event=>moment(event.start).year());
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
      {sort: {start: 1}}).map(event=>moment(event.start).month());
    return _.uniq(months); // this returns integers in [0,11]
  },
  getEvents(monthNumber,year){
    var selectedDep = Session.get('selectedDep');
    console.log(new Date(year,monthNumber,0,23,59,59));
    console.log(new Date(year,monthNumber+1,0,23,59,59));
    return Events.find(
      { $and: [
        {start: {$gte: new Date(year,monthNumber,0,23,59,59), $lt: new Date(year,monthNumber+1,0,23,59,59)}},
        selectedDep,
        upcoming
      ]},
      {sort: {start: 1}});
  },
  monthName(month){
    return monthNames[month];
  }
});
