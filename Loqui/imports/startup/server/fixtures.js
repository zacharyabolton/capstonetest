// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/events.js';

Meteor.startup(() => {
  // if the Events collection is empty
  if (Events.find().count() === 0) {
    const data = [
      { title: 'EPHIS', 
        start: '2017-06-23', 
        end: '2017-06-06', 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Chem Congress', 
        start: '2017-07-07', 
        end: '2017-07-07', 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'The biology of Octopi', 
        start: '2017-07-01', 
        end: '2017-07-01', 
        editable: false, 
        department: 'Biology'
      },
      { title: 'Periodic Congress', 
        start: '2017-07-08', 
        end: '2017-07-08', 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'WWI', 
        start: '2017-06-30', 
        end: '2017-06-30', 
        editable: false, 
        department: 'History'
      },
      { title: 'Capitalism 101', 
        start: '2017-07-04', 
        end: '2017-07-04', 
        editable: true, 
        department: 'Econ'
      },
      { title: 'Contemporary Nudes', 
        start: '2017-06-27', 
        end: '2017-06-27', 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Baking soda volcanos', 
        start: '2017-07-01', 
        end: '2017-07-01', 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'Hedge Funds for dummies', 
        start: '2017-07-20', 
        end: '2017-07-20', 
        editable: false, 
        department: 'Econ'
      },
      { title: 'George Bellows', 
        start: '2017-07-10', 
        end: '2017-07-10', 
        editable: true, 
        department: 'Art History'
      }
    ];

    data.forEach(event => Events.insert(event));
  }
});
