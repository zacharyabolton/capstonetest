import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Events } from '../../../api/events/events.js';

import './calendarsNav.html';

let depFilter = {};

Template.calendarsNav.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
  Session.set('selectedDep', depFilter);
  Session.set('depBtnLabel', 'All Departments');
});

Template.calendarsNav.helpers({
	distinctDepartments() {
    var distinctDepartments = _.uniq(Events.find({}, {
		  sort: {department: 1}, fields: {department: true}
		}).fetch().map(function(x) {
		  return x.department;
		}), true);
		return distinctDepartments;
  },
  depBtnLabel(){
  	return Session.get("depBtnLabel");
  }
});

Template.calendarsNav.events({
	'click .departmentDropDownItem'(){
		var thisToString = this.toString();
		var depFilter = {department: thisToString};
    Session.set('selectedDep', depFilter);
    Session.set('depBtnLabel', thisToString);
    Session.get('dayHeader');
    Session.set('dayHeader', '');
    Session.get('selectedDay');
    Session.set('selectedDay', {department: "jsTestDepartment"} );
	},
	'click #allDeps'(){
		var depFilter = {};
    Session.set('selectedDep', depFilter);
    Session.set('depBtnLabel', 'All Departments');
    Session.get('dayHeader');
    Session.set('dayHeader', '');
    Session.get('selectedDay');
    Session.set('selectedDay', {department: "jsTestDepartment"} );
	}
});