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

Template.list.onCreated(()=>{
  Session.set('upcoming', {start: {$gt: new Date()}});
});

Template.list.helpers({
  getYears(){
    var selectedDep = Session.get('selectedDep');
    var eventsIveAdded = Session.get('seeEventsIveAdded');
    var interestingArray = Session.get('interestingEventsFilter');
    var upcoming = Session.get('upcoming');
    var filterByInstitution = Session.get('institution');
    const years = Events.find({ $and: [ selectedDep, upcoming, eventsIveAdded, interestingArray, filterByInstitution ] },
      {sort: {start: 1}}).map(event=>moment(event.start).year());
    return _.uniq(years)
  },
  getMonths(year){
    var selectedDep = Session.get('selectedDep');
    var eventsIveAdded = Session.get('seeEventsIveAdded');
    var interestingArray = Session.get('interestingEventsFilter');
    var upcoming = Session.get('upcoming');
    var filterByInstitution = Session.get('institution');
    const months = Events.find(
      { $and: [
        {start: {$gte: new Date(year,0,1), $lt: new Date(year+1,0,1)}},
        selectedDep,
        upcoming,
        eventsIveAdded,
        interestingArray,
        filterByInstitution
        ]},
      {sort: {start: 1}}).map(event=>moment(event.start).month());
    return _.uniq(months); // this returns integers in [0,11]
  },
  getEvents(monthNumber,year){
    var selectedDep = Session.get('selectedDep');
    var eventsIveAdded = Session.get('seeEventsIveAdded');
    var interestingArray = Session.get('interestingEventsFilter');
    var upcoming = Session.get('upcoming');
    var filterByInstitution = Session.get('institution');
    return Events.find(
      { $and: [
        {start: {$gte: new Date(year,monthNumber,0,23,59,59), $lt: new Date(year,monthNumber+1,0,23,59,59)}},
        selectedDep,
        upcoming,
        eventsIveAdded,
        interestingArray,
        filterByInstitution
      ]},
      {sort: {start: 1}});
  },
  monthName(month){
    return monthNames[month];
  },
  oldEvents(){
    var selectedDep = Session.get('selectedDep');
    var eventsIveAdded = Session.get('seeEventsIveAdded');
    var interestingArray = Session.get('interestingEventsFilter');
    var filterByInstitution = Session.get('institution');
    var hasOldEvents = Events.find(
        { $and: [
          selectedDep,
          eventsIveAdded,
          interestingArray,
          filterByInstitution
        ]},
        {sort: {start: 1}}).map(event=>event.title);
    if(hasOldEvents.length > 0){
      return Spacebars.SafeString(`<button id="checkOldEvents">Old events</button>`);
    }else{
      return ``;
    }
  }
});

Template.list.events({
  'click #checkOldEvents': function(){
    Session.get('upcoming');
    Session.set('upcoming', {});
  }
})
