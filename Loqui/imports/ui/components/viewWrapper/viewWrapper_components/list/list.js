import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {Events} from '../../../../../api/events/events.js';

import './list.html';
import './oneEvent/oneEvent.js';

let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let today = new Date();

let upcoming = {
  start: {
    $gt: today
  }
};

Template.list.helpers({
  getYears(){
    var selectedDep = Session.get('selectedDep');
    var eventsIveAdded = Session.get('seeEventsIveAdded');
    var interestingArray = Session.get('interestingEventsFilter');
    const years = Events.find({ $and: [ selectedDep, upcoming, eventsIveAdded, interestingArray ] },
      {sort: {start: 1}}).map(event=>moment(event.start).year());
    return _.uniq(years)
  },
  getMonths(year){
    var selectedDep = Session.get('selectedDep');
    var eventsIveAdded = Session.get('seeEventsIveAdded');
    var interestingArray = Session.get('interestingEventsFilter');
    const months = Events.find(
      { $and: [
        {start: {$gte: new Date(year,0,1), $lt: new Date(year+1,0,1)}},
        selectedDep,
        upcoming,
        eventsIveAdded,
        interestingArray
        ]},
      {sort: {start: 1}}).map(event=>moment(event.start).month());
    return _.uniq(months); // this returns integers in [0,11]
  },
  getEvents(monthNumber,year){
    var selectedDep = Session.get('selectedDep');
    var eventsIveAdded = Session.get('seeEventsIveAdded');
    var interestingArray = Session.get('interestingEventsFilter');
    return Events.find(
      { $and: [
        {start: {$gte: new Date(year,monthNumber,0,23,59,59), $lt: new Date(year,monthNumber+1,0,23,59,59)}},
        selectedDep,
        upcoming,
        eventsIveAdded,
        interestingArray
      ]},
      {sort: {start: 1}});
  },
  monthName(month){
    return monthNames[month];
  }
});
