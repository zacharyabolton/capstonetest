// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/events.js';

Meteor.startup(() => {
  // if the Events collection is empty
  if (Events.find().count() === 0) {
    const data = [
      { title: 'Event Title', 
        start: '2017-06-06', 
        end: '2017-06-06', 
        editable: true, 
        type: 'Corporate', 
        guests: 50 
      },
      { title: 'Event Title', 
        start: '2017-07-07', 
        end: '2017-07-07', 
        editable: false, 
        type: 'Wedding', 
        guests: 200 
      }
    ];

    data.forEach(event => Events.insert(event));
  }
});
