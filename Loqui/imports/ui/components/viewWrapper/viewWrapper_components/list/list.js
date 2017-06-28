import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {Events} from '../../../../../api/events/events.js';

import './list.html';

let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let findYears = function(){
  var distinctYears = _.uniq(Events.find({}, {
    sort: {start: 1}, fields: {start: true}
  }).fetch().map(function(x) {
    var d = new Date(x.start);
    return d.getFullYear();
  }), true);
  return distinctYears;
};

let findMonths = function(){
  var distinctMonths = _.uniq(Events.find({}, {
    sort: {start: 1}, fields: {start: true}
  }).fetch().map(function(x) {
    var d = new Date(x.start);
    if(d.getFullYear() === 2018){//Here's the crucial point
      return monthNames[d.getMonth()];
    }
    
  }), true);
  return distinctMonths;
};

Template.list.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.list.helpers({
  year() {
    var foundYears = findYears();
    //console.log(this);
    return foundYears;
  },
  month() {
    var foundMonthNames = findMonths();
    //console.log(this);
    return foundMonthNames;
    // var d = new Date(this.start);
    // return monthNames[d.getMonth()];
  },
  events() {
    // var selectedDep = Session.get('selectedDep');
    // var thisToString = this.toString();

    // selectedDep.month = thisToString;
    
    // console.log(selectedDep);

    return Events.find();
  }
});