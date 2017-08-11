import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import {Events} from '../../../api/events/events.js';

import './details-view-modal.html';

let closeModal = () => {
  $( '#details-view-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};

Template.detailsViewModal.helpers({
  isUser(currentUser){
    if(currentUser.profile.contributor){
      return false;
    }else{
      return true;
    }
  },
  event() {
    let detailsModal = Session.get( 'detailsModal' );
    if ( detailsModal ) {
      return detailsModal.type === 'viewDetails' ? Events.findOne( detailsModal.event ) : {
        start: detailsModal.date,
        end: detailsModal.date
      };
    }
  },
  formatStart(start){
    start = moment(start).format("MMMM Do, YYYY");
    return start;
  },
  formatEnd(end){
    end = moment(end).format("MMMM Do, YYYY");
    return end;
  }
});