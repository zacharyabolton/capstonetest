import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';

import { Events } from '../../../api/events/events.js';

import './calendarsNav.html';

let depFilter = {};
let ownerFilter = {};

Template.calendarsNav.onCreated(function(){
  const instance = this;
  instance.toggleIveAdded = new ReactiveVar(false);
  instance.toggleInterestedFilter = new ReactiveVar(false);
  let template = Template.instance();
  template.subscribe( 'events' );
  Session.set('selectedDep', depFilter);
  Session.set('seeEventsIveAdded', ownerFilter);
  Session.set('depBtnLabel', 'All Departments');
  Session.set('interestingEventsFilter', {});
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
	'click .departmentDropDownItem': function(){
		var thisToString = this.toString();
		var depFilter = {department: thisToString};
    Session.set('selectedDep', depFilter);
    Session.set('depBtnLabel', thisToString);
    Session.get('dayHeader');
    Session.set('dayHeader', '');
    Session.get('selectedDay');
    Session.set('selectedDay', {department: "jsTestDepartment"} );
	},
	'click #allDeps': function(){
		var depFilter = {};
    Session.set('selectedDep', depFilter);
    Session.set('depBtnLabel', 'All Departments');
    Session.get('dayHeader');
    Session.set('dayHeader', '');
    Session.get('selectedDay');
    Session.set('selectedDay', {department: "jsTestDepartment"} );
	},
  'click #iveAdded': function(event, instance){
    instance.toggleIveAdded.set(!instance.toggleIveAdded.get());
    var seeOrNo = instance.toggleIveAdded.get();
    if(seeOrNo){
      document.getElementById("iveAdded").classList.add('active');
      document.getElementById("iveAdded").setAttribute("style", "background-color:rgba(172,187,187,1);");
      Session.set('seeEventsIveAdded', {owner: Meteor.userId()});

      Session.set('selectedDep', depFilter);
      Session.set('depBtnLabel', 'All Departments');
    }else{
      document.getElementById("iveAdded").classList.remove('active');
      document.getElementById("iveAdded").setAttribute("style", "background-color:none;");
      Session.set('seeEventsIveAdded', ownerFilter);
    }
  },
  'click #interested': function(event, instance){
    instance.toggleInterestedFilter.set(!instance.toggleInterestedFilter.get());
    var interestedSeeOrNo = instance.toggleInterestedFilter.get();
    if(interestedSeeOrNo){
      document.getElementById("interested").classList.add('active');
      document.getElementById("interested").setAttribute("style", "background-color:rgba(172,187,187,1);");
      interestingArray = {_id: {$in: Meteor.user().profile.interested}};
      Session.set('interestingEventsFilter', interestingArray);

      Session.set('selectedDep', depFilter);
      Session.set('depBtnLabel', 'All Departments');
    }else{
      document.getElementById("interested").classList.remove('active');
      document.getElementById("interested").setAttribute("style", "background-color:none;");
      Session.set('interestingEventsFilter', {});
    }
  }
});