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
        start: "2017-07-07T00:00:00Z", 
        end: "2017-07-07T00:00:00Z", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'The biology of Octopi', 
        start: "2017-08-01T00:00:00Z", 
        end: "2017-08-01T00:00:00Z", 
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
        start: "2017-09-04T00:00:00Z", 
        end: "2017-09-04T00:00:00Z", 
        editable: true, 
        department: 'Econ'
      },
      { title: 'Contemporary Nudes', 
        start: "2017-12-27T00:00:00Z", 
        end: "2017-12-27T00:00:00Z", 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Baking soda volcanos', 
        start: "2017-10-01T00:00:00Z", 
        end: "2017-10-01T00:00:00Z", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'Hedge Funds for dummies', 
        start: "2017-10-20T00:00:00Z", 
        end: "2017-10-20T00:00:00Z", 
        editable: false, 
        department: 'Econ'
      },
      { title: 'George Bellows', 
        start: "2017-08-10T00:00:00Z", 
        end: "2017-08-10T00:00:00Z", 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Mapple Syrup Studies', 
        start: "2017-11-11T00:00:00Z", 
        end: "2017-11-11T00:00:00Z", 
        editable: true, 
        department: 'Canadian Studies'
      },
      { title: 'The History of Submarines', 
        start: "2017-09-02T00:00:00Z", 
        end: "2017-09-02T00:00:00Z", 
        editable: false, 
        department: 'History'
      },
      { title: 'The biology of Platupi', 
        start: "2017-08-01T00:00:00Z", 
        end: "2017-08-01T00:00:00Z", 
        editable: false, 
        department: 'Biology'
      },
      { title: 'Explosions', 
        start: "2018-04-10T00:00:00Z", 
        end: "2018-04-10T00:00:00Z", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'WWII', 
        start: "2017-12-30T00:00:00Z", 
        end: "2017-12-30T00:00:00Z", 
        editable: false, 
        department: 'History'
      },
      { title: 'Marxism 101', 
        start: "2017-11-27T00:00:00Z", 
        end: "2017-11-27T00:00:00Z", 
        editable: true, 
        department: 'Econ'
      },
      { title: 'Limits', 
        start: "2017-05-27T00:00:00Z", 
        end: "2017-05-27T00:00:00Z", 
        editable: true, 
        department: 'Mathematics'
      },
      { title: 'Javascript For the Masses', 
        start: "2017-09-01T00:00:00Z", 
        end: "2017-09-01T00:00:00Z", 
        editable: false, 
        department: 'Computer Science'
      },
      { title: 'Meteor', 
        start: "2017-08-23T00:00:00Z", 
        end: "2017-08-23T00:00:00Z", 
        editable: false, 
        department: 'Computer Science'
      },
      { title: 'Monet', 
        start: "2019-08-10T00:00:00Z", 
        end: "2019-08-10T00:00:00Z", 
        editable: true, 
        department: 'Art History'
      }
    ];

    data.forEach(event => Events.insert(event));
  }
});
