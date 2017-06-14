import {Template} from 'meteor/templating';

import './calendar.html';

Template.calendar.onRendered( () => {
  $( '#events-calendar' ).fullCalendar();
});