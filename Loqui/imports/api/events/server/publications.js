// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Events } from '../events.js';

Meteor.publish('events', function () {
  return Events.find();
});