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

let testing = new Date("2017-07-01");
let testingTwo = moment(testing).utc().format('llll');
console.log(testingTwo);

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
    
    let getEventsStart = new Date(year,monthNumber,1);
    let getEventsEnd = new Date(year,monthNumber+1,1);
    console.log(moment(getEventsStart).utc());
    console.log(moment(getEventsEnd).utc());

    return Events.find(
      { $and: [
        {start: {$gte: getEventsStart, $lt: getEventsEnd}},
        selectedDep,
        upcoming
      ]},
      {sort: {start: 1}});
  },
  monthName(month){
    return monthNames[month];
  }
});
