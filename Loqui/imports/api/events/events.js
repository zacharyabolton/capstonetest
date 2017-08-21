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
    type: Date,
    label: 'When this event will start.'
  },
  'end': {
    type: Date,
    label: 'When this event will end.'
  },
  'department': {
    type: String,
    label: 'Department'
  },
  'owner': {
    type: String,
    label: 'userId'
  },
  'description': {
    type: String,
    label: 'Description'
  },
  'institution': {
    type: String,
    label: 'Institution'
  },
  'location': {
    type: String,
    label: 'Location'
  }
});

Events.attachSchema( EventsSchema );