import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import './oneEvent.html';

Template.oneEvent.events({
  'click li': function( event, template ){
    Session.set( 'eventModal', { type: 'edit', event: this.event._id } );
    $( '#add-edit-event-modal' ).modal( 'show' );
  }
})

Template.oneEvent.helpers({
  formatDate(start) {
    var dayNumber = moment(start).format("Do");
    return dayNumber;
  },
  dayOfWeek(start) {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var x = Number(new Date(start).getDay());
    var dayName = days[x];
    return dayName;
  }
});
