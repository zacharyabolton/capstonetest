import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './viewWrapper.html';

import './viewWrapper_components/calendar/calendar.js';
import './viewWrapper_components/list/list.js';

Template.viewWrapper.onCreated(function() {
  const instance = this;
  instance.toggleDisplay = new ReactiveVar(true);
  instance.calOrList = new ReactiveVar("Switch to list view");
});

Template.viewWrapper.helpers({
  toggleDisplay() {
    const instance = Template.instance();
    return instance.toggleDisplay.get();
  },
  calOrList() {
  	const instance = Template.instance();
  	return instance.calOrList.get();
  }
});

Template.viewWrapper.events({
  "click #viewBtn": function(event, instance) {
	  instance.toggleDisplay.set(!instance.toggleDisplay.get());
	  var calView = instance.toggleDisplay.get();
	  if(calView === true){
	  	instance.calOrList.set("Switch to list view");
	  }else{
	  	instance.calOrList.set("Switch to calendar view");
  	}
  }
});

// Template.viewWrapper.rendered=function(){
//   element = document.getElementById("viewWrapper");
//   if (element.firstChild) {
//     console.log(element.firstChild);// If it has at least one, do nothing...
//   }else{
//     console.log("no 2nd child!");// Inform user there are no items matching their filters.
//   }
// };