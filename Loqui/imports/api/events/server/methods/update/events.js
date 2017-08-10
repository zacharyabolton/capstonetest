import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

import { Events } from '../../../events.js';

Meteor.methods({
  'editEvent'( event ) {
    check( event, {
      _id: String,
      title: Match.Optional( String ),
      start: Date,
      end: Date,
      department: Match.Optional( String ),
      owner: String
    });

    try {
      return Events.update( event._id, {
        $set: event
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
