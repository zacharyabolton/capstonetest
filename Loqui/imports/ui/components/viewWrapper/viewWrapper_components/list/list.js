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

Template.list.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.list.helpers({
	events() {
    var selectedDep = Session.get('selectedDep');
    return Events.find(selectedDep);
  },
  month() {
    let date = this.start;
    console.log(date);
    return date;
  }
});