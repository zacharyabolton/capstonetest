import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';

import {Events} from '../../../api/events/events.js';

import './details-view-modal.html';

let closeModal = () => {
  $( '#details-view-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};

Template.detailsViewModal.helpers({
  isUser(currentUser, eventId){
    Session.set("eventId",eventId);
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
  },
  checkedOrNo(currentUser, event){
    var interestedArray = currentUser.profile.interested;
    if(interestedArray){
      var thisId = event && event._id;
      for (var i = interestedArray.length - 1; i >= 0; i--) {
        if(interestedArray[i] === thisId){
          return "checked";
        }else{
          continue;
        }
        return "";
      }
    }else{
      return "";
    }
  }
});

Template.detailsViewModal.events({
  'click .interestedCheck': function(event){
    var interestingEvent = Session.get("eventId");
      if(event.target.checked){
        Meteor.call('addInterested', interestingEvent);
      }else{
        Meteor.call('removeInterested', interestingEvent);
      }
  }
});