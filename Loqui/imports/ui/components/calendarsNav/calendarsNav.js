import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {Events} from '../../../api/events/events.js';

import './calendarsNav.html';

export var depFilter = {};

Template.calendarsNav.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
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
});

Template.calendarsNav.events({
	'click .departmentDropDownItem'(){
		var thisToString = this.toString();
		depFilter = {department: thisToString};

		// var depFilter = Events.find({department: thisToString}).fetch().map(function(x){
		// 	return x;
		// });

		// console.log(depFilter);
		console.log(depFilter);
	},
	'click #allDeps'(){
		depFilter = {};

		console.log(depFilter);
	}
});

console.log(depFilter);