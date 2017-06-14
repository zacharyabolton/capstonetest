// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Events } from '../Events.js';

Meteor.publish('events', function () {
  return Events.find();
});