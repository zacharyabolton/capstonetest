import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

import { Events } from '../../../events.js';

Meteor.methods({
  'addEvent'( event ) {
    check( event, {
      title: String,
      start: String,
      end: String,
      department: String,
      // guests: Number
    });

    try {
      return Events.insert( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});