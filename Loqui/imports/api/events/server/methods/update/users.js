import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

//import { Events } from '../../../events.js';

Meteor.methods({
  'addInterested'( interestingEvent ) {
    Meteor.users.update({_id:Meteor.user()._id}, { $push: {"profile.interested": interestingEvent} });
  },
  'removeInterested'( interestingEvent ) {
    Meteor.users.update({_id:Meteor.user()._id}, { $pull: {"profile.interested": interestingEvent} });
  }
});
