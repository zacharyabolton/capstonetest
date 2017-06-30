// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/events.js';

Meteor.startup(() => {
  // if the Events collection is empty
  if (Events.find().count() === 0) {
    const data = [
      { title: 'EPHIS', 
        start: "2017-06-23T00:00:00Z", 
        end: "2017-06-06T00:00:00Z", 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Chem Congress', 
        start: "2017-06-07T00:00:00Z", 
        end: "2017-06-07T00:00:00Z", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'The biology of Octopi', 
        start: "2017-07-01T00:00:00Z", 
        end: "2017-07-01T00:00:00Z", 
        editable: false, 
        department: 'Biology'
      },
      { title: 'Periodic Congress', 
        start: "2018-01-08T00:00:00Z", 
        end: "2018-01-08T00:00:00Z", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'WWI', 
        start: "2016-11-30T00:00:00Z", 
        end: "2016-11-30T00:00:00Z", 
        editable: false, 
        department: 'History'
      },
      { title: 'Capitalism 101', 
        start: "2017-07-04T00:00:00Z", 
        end: "2017-07-04T00:00:00Z", 
        editable: true, 
        department: 'Econ'
      },
      { title: 'Contemporary Nudes', 
        start: "2017-06-27T00:00:00Z", 
        end: "2017-06-27T00:00:00Z", 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Baking soda volcanos', 
        start: "2017-07-01T00:00:00Z", 
        end: "2017-07-01T00:00:00Z", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'Hedge Funds for dummies', 
        start: "2017-07-20T00:00:00Z", 
        end: "2017-07-20T00:00:00Z", 
        editable: false, 
        department: 'Econ'
      },
      { title: 'George Bellows', 
        start: "2017-07-10T00:00:00Z", 
        end: "2017-07-10T00:00:00Z", 
        editable: true, 
        department: 'Art History'
      }
    ];

    data.forEach(event => Events.insert(event));
  }
});
