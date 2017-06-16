import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

import { Events } from '../../../events.js';

Meteor.methods({
  'removeEvent'( event ) {
    check( event, String );

    try {
      return Events.remove( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});