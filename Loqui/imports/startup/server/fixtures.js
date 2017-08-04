// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/events.js';

Meteor.startup(() => {
  // if the Events collection is empty
  if (Events.find().count() === 0) {
    const data = [
      { title: 'EPHIS', 
        start: "2017-08-23T20:00:00.000Z", 
        end: "2017-08-23T21:00:00.000Z", 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Chem Congress', 
        start: "2017-09-07T22:00:00.000Z", 
        end: "2017-09-07T22:30:00.000Z", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'The biology of Octopi', 
        start: "2017-10-01T10:00:00.000Z", 
        end: "2017-10-01T20:00:00.000Z", 
        editable: false, 
        department: 'Biology'
      },
      { title: 'Periodic Congress', 
        start: "2018-01-08T10:00:00.000Z", 
        end: "2018-01-08T15:30:00.000Z", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'WWI', 
        start: "2016-11-30T20:00:00.000Z", 
        end: "2016-11-30T22:00:00.000Z", 
        editable: false, 
        department: 'History'
      },
      { title: 'Capitalism 101', 
        start: "2017-09-04T20:00:00.000Z", 
        end: "2017-09-04T21:00:00.000Z", 
        editable: true, 
        department: 'Econ'
      },
      { title: 'Contemporary Nudes', 
        start: "2017-12-27T10:00:00.000Z", 
        end: "2017-12-27T12:30:00.000Z", 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Baking soda volcanos', 
        start: "2017-10-01T11:00:00.000Z", 
        end: "2017-10-01T16:45:00.000Z", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'Hedge Funds for dummies', 
        start: "2017-10-20T20:00:00.000Z", 
        end: "2017-10-20T20:45:00.000Z", 
        editable: false, 
        department: 'Econ'
      },
      { title: 'George Bellows', 
        start: "2017-08-10T20:00:00.000Z", 
        end: "2017-08-10T21:00:00.000Z", 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Maple Syrup Studies', 
        start: "2017-11-11T12:00:00.000Z", 
        end: "2017-11-11T13:00:00.000Z", 
        editable: true, 
        department: 'Canadian Studies'
      },
      { title: 'The History of Submarines', 
        start: "2017-09-02T10:00:00.000Z", 
        end: "2017-09-02T20:00:00.000Z", 
        editable: false, 
        department: 'History'
      },
      { title: 'The biology of Platupi', 
        start: "2017-08-01T21:00:00.000Z", 
        end: "2017-08-01T22:00:00.000Z", 
        editable: false, 
        department: 'Biology'
      },
      { title: 'Explosions', 
        start: "2018-04-10T14:00:00.000Z", 
        end: "2018-04-10T20:30:00.000Z", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'WWII', 
        start: "2017-12-30T10:00:00.000Z", 
        end: "2017-12-30T20:00:00.000Z", 
        editable: false, 
        department: 'History'
      },
      { title: 'Marxism 101', 
        start: "2017-11-27T10:00:00.000Z", 
        end: "2017-11-27T18:00:00.000Z", 
        editable: true, 
        department: 'Econ'
      },
      { title: 'Limits', 
        start: "2017-08-27T20:00:00.000Z", 
        end: "2017-08-27T22:00:00.000Z", 
        editable: true, 
        department: 'Mathematics'
      },
      { title: 'Javascript For the Masses', 
        start: "2017-09-01T21:00:00.000Z", 
        end: "2017-09-01T21:30:00.000Z", 
        editable: false, 
        department: 'Computer Science'
      },
      { title: 'Meteor', 
        start: "2017-08-23T10:00:00.000Z", 
        end: "2017-08-23T11:00:00.000Z", 
        editable: false, 
        department: 'Computer Science'
      },
      { title: 'Monet', 
        start: "2019-08-10T19:00:00.000Z", 
        end: "2019-08-10T20:15:00.000Z", 
        editable: true, 
        department: 'Art History'
      }
    ];

    data.forEach(event => Events.insert(event));
  }
});
