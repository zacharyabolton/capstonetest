// Methods related to events

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from './events.js';

Meteor.methods({
  'events.insert'(title, start, end, timezone, guests) {
    check(title, String);
    check(start, String);
    check(end, String);
    check(timezone, String);
    check(guests, number);

    return Events.insert({
      title,
      start,
      end,
      timezone,
      guests,
      createdAt: new Date(),
    });
  },
});
