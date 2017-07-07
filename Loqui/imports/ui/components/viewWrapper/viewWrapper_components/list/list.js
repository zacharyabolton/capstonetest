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
    $gt: today.toISOString()
  }
}

let findYears = function(){
  var selectedDep = Session.get('selectedDep');
  var distinctYears = _.uniq(Events.find( { $and: [ upcoming, selectedDep ] }, {
    sort: {start: 1}, fields: {start: true}
  }).fetch().map(function(x) {
    var d = Number(x.start.substring(0, 4));
    return d;
  }), true);
  return distinctYears;
};

let findMonths = function(year){
  var selectedDep = Session.get('selectedDep');
  var query = {
    start: {
      $gt: new Date(year - 1, 11, 31, 21, 59, 59, 999).toISOString(),
      $lt: new Date(year + 1, 0, 0, 22, 00, 00, 001).toISOString()
    }
  }
  var distinctMonths = _.uniq(Events.find( { $and: [ upcoming, query, selectedDep ] }, {
    sort: {start: 1}, fields: {start: true}
  }).fetch().map(function(x) {
      var d = Number(x.start.substring(5, 7));
      return monthNames[d];    
  }), true);
  return distinctMonths;
};

let findEvents = function(month, year){
  var selectedDep = Session.get('selectedDep');
  var events = Events.find( { $and: [ upcoming, selectedDep ] }, {sort: {start: 1}}).fetch();
  var finalEvents = new Array();
  events.forEach(function(event){
    var mDigits = monthNames.indexOf(month);
    mDigits += 1
    mDigits = mDigits.toString();
    var yearMonthSlice;
    if(mDigits.length === 1){
      yearMonthSlice = year+"-"+"0"+mDigits;
    }else if(mDigits.length === 2){
      yearMonthSlice = year+"-"+mDigits;
    }
    var getStart = event.start.substring(0, 7);
    if(yearMonthSlice === getStart){
      finalEvents.push(event);
    }
  });
  return finalEvents;
};

Template.list.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.list.helpers({
  // getYears() {
  //   foundYears = findYears();
  //   return foundYears;
  // },
  // getMonths(year) {
  //   foundMonthNames = findMonths(year);
  //   return foundMonthNames;
  // },
  // getEvents(month, year) {
  //   var foundEvents = findEvents(month, year);
  //   return foundEvents;
  // },
  // formatDate(start) {
  //   var dayNumber = start.substring(8, 10);
  //   return dayNumber;
  // },
  // dayOfWeek(start) {
  //   var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  //   var x = Number(new Date(start).getDay());
  //   var dayName = days[x];
  //   return dayName;
  // }
  getYears(){
    const years = Events.find({},{sort: {start: 1}}).map(event=>new Date(event.start).getFullYear());
    return _.uniq(years)
  },
  getMonths(year){
    const months = Events.find(
      {start: {$gte: new Date(year,0,1), $lt: new Date(year+1,0,1)}},
      {sort: {start: 1}}).map(event=>new Date(event.start).getMonth());
    return _.uniq(months); // this returns integers in [0,11]
  },
  getEvents(monthNumber,year){
    return Events.find(
      {start: {$gte: new Date(year,monthNumber,1), $lt: new Date(year,monthNumber+1,1)}},
      {sort: {start: 1}});
  },
  monthName(month){
    return monthNames[month];
  }
});

var TheDate = new Date();
console.log(TheDate);