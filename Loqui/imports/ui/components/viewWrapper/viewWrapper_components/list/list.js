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
today.setDate(today.getDate());

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
    var d = new Date(x.start);
    return d.getFullYear();
  }), true);
  return distinctYears;
};

let findMonths = function(year){
  var selectedDep = Session.get('selectedDep');
  var query = {
    start: {
      $gt: new Date(year - 1, 11, 31).toISOString(),
      $lt: new Date(year + 1, 0, 1).toISOString()
    }
  }
  var distinctMonths = _.uniq(Events.find( { $and: [ upcoming, query, selectedDep ] }, {
    sort: {start: 1}, fields: {start: true}
  }).fetch().map(function(x) {
    var d = new Date(x.start);
      return monthNames[d.getMonth()];    
  }), true);
  return distinctMonths;
};

let findEvents = function(month, year){
  var selectedDep = Session.get('selectedDep');
  var finalEvents = [];
  var events = Events.find( { $and: [ upcoming, selectedDep ] }, {sort: {start: 1}}).fetch();
  events.forEach(function(event){
    var mDigits = monthNames.indexOf(month);
    mDigits += 1
    mDigits = mDigits.toString();
    var yearMonthSlice = "";
    if(mDigits.length === 1){
      yearMonthSlice = year+"-"+"0"+mDigits;
    }else{
      yearMonthSlice = year+"-"+mDigits;
    }
    var getStart = event.start;
      if(yearMonthSlice === getStart.substring(0, 7)){
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
    getYears() {
      foundYears = findYears();
      return foundYears;
    },
    getMonths(year) {
      foundMonthNames = findMonths(year);
      return foundMonthNames;
    },
    getEvents(month, year) {
      foundEvents = findEvents(month, year);
      return foundEvents;
    },
    formatDate(start) {
      var dayNumber = Number(moment(start).format('DD'))+1;
      return dayNumber;
    },
    dayOfWeek(start) {
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var x = Number(new Date(start).getDay())+1;
      var dayName = days[x];
      return dayName;
    }
  });