// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/events.js';

Meteor.startup(() => {
  // if the Events collection is empty
  if (Events.find().count() === 0) {
    const data = [
      { title: 'EPHIS', 
        start: new Date("2017-06-23"), 
        end: new Date("2017-06-06"), 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Chem Congress', 
        start: "2017-07-07", 
        end: "2017-07-07", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'The biology of Octopi', 
        start: "2017-08-01", 
        end: "2017-08-01", 
        editable: false, 
        department: 'Biology'
      },
      { title: 'Periodic Congress', 
        start: "2018-01-08", 
        end: "2018-01-08", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'WWI', 
        start: "2016-11-30", 
        end: "2016-11-30", 
        editable: false, 
        department: 'History'
      },
      { title: 'Capitalism 101', 
        start: "2017-09-04", 
        end: "2017-09-04", 
        editable: true, 
        department: 'Econ'
      },
      { title: 'Contemporary Nudes', 
        start: "2017-12-27", 
        end: "2017-12-27", 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Baking soda volcanos', 
        start: "2017-10-01", 
        end: "2017-10-01", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'Hedge Funds for dummies', 
        start: "2017-10-20", 
        end: "2017-10-20", 
        editable: false, 
        department: 'Econ'
      },
      { title: 'George Bellows', 
        start: "2017-08-10", 
        end: "2017-08-10", 
        editable: true, 
        department: 'Art History'
      },
      { title: 'Maple Syrup Studies', 
        start: "2017-11-11", 
        end: "2017-11-11", 
        editable: true, 
        department: 'Canadian Studies'
      },
      { title: 'The History of Submarines', 
        start: "2017-09-02", 
        end: "2017-09-02", 
        editable: false, 
        department: 'History'
      },
      { title: 'The biology of Platupi', 
        start: "2017-08-01", 
        end: "2017-08-01", 
        editable: false, 
        department: 'Biology'
      },
      { title: 'Explosions', 
        start: "2018-04-10", 
        end: "2018-04-10", 
        editable: false, 
        department: 'Chemistry'
      },
      { title: 'WWII', 
        start: "2017-12-30", 
        end: "2017-12-30", 
        editable: false, 
        department: 'History'
      },
      { title: 'Marxism 101', 
        start: "2017-11-27", 
        end: "2017-11-27", 
        editable: true, 
        department: 'Econ'
      },
      { title: 'Limits', 
        start: "2017-05-27", 
        end: "2017-05-27", 
        editable: true, 
        department: 'Mathematics'
      },
      { title: 'Javascript For the Masses', 
        start: "2017-09-01", 
        end: "2017-09-01", 
        editable: false, 
        department: 'Computer Science'
      },
      { title: 'Meteor', 
        start: "2017-08-23", 
        end: "2017-08-23", 
        editable: false, 
        department: 'Computer Science'
      },
      { title: 'Monet', 
        start: "2019-08-10", 
        end: "2019-08-10", 
        editable: true, 
        department: 'Art History'
      }
    ];

    data.forEach(event => Events.insert(event));
  }
});
