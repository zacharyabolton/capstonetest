import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import './day-view.html';

import {Events} from '../../../api/events/events.js';

let dayView = {};

Template.dayView.onCreated( () => {
	let template = Template.instance();
  template.subscribe( 'events' );
  Session.set('selectedDay', dayView);
});

Template.dayView.helpers({
	events(){
		return Events.find({});
	}
});