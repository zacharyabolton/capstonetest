// Definition of the events collection

import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection( 'events' );

Events.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Events.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let EventsSchema = new SimpleSchema({
  'title': {
    type: String,
    label: 'The title of this congress.'
  },
  'start': {
    type: String,
    label: 'When this event will start.'
  },
  'end': {
    type: String,
    label: 'When this event will end.'
  },
  'department': {
    type: String,
    label: 'Department',
    allowedValues: [ 'Art History', 'Chemistry', 'Social Science', 'Journalism' ]
  },
  // 'guests': {
  //   type: Number,
  //   label: 'The number of guests expected at this event.'
  // }
});

Events.attachSchema( EventsSchema );