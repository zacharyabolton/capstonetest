// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/events.js';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Events.find().count() === 0) {
    const data = [
      { title: 'Event Title', 
        start: '2016-03-03', 
        end: '2016-03-03', 
        editable: true, 
        type: 'Corporate', 
        guests: 50 
      },
      { title: 'Event Title', 
        start: '2016-03-01', 
        end: '2016-03-01', 
        editable: false, 
        type: 'Wedding', 
        guests: 200 
      }
    ];

    data.forEach(event => Events.insert(event));
  }
});
