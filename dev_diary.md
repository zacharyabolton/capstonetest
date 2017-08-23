06-11-17

	dev_diary created.
	Styling with CSS in Loqui/client/main.css for now. Might want or need to learn LESS in order to simplify.
	Root EM set to 16px.

06-12-17

	got all the bare bones laid down before implementation of modal/responsive sideBar. This is next.
	Created new branch named modal_responsive_sideBar for development of this piece.
	When trying to push terminal threw:
			fatal: The current branch modal_responsive_sideBar has no upstream branch.
			To push the current branch and set the remote as upstream, use

	    	git push --set-upstream origin modal_responsive_sideBar

  Done and pushed...

  added data-toggle="modal" data-target="#sideBar" to sideBarBtn in navbar.
  using https://codepen.io/bootpen/pen/jbbaRa?editors=1000 for modal sidebar.

  As of now, if you close modal_sideBar at xs or sm viewport sizes and then resize above sm, sidebar "diplay" stays at "none".

06-13-17

	Completely scratched sideBar idea in favor of a suplimentary navbar at top.
	Some trouble with space between elements in calendarsNav buttons.
	Dont know how to hide scroll bar and keep scrolling, but I don't think it's a problem. I like the way it is now.

06-14-17

	Might need to import Events publication in calendar.js

06-15-17

	Having trouble getting fullcalendar to work. Gonna hook up the default "links" database and display in my list template.
	Added session package. Added themeteorchef:bert package.
	Form does not consistently populate when Event is clicked to edit & form maintains data from last insert/update and does not clear after submit.
	Left comment for TheMeteorChef @ http://chf.bz/2syx891 re:above.

06-16-17

	Fixed missing import of Events collection in add-edit-event-modal.js.
	Left new comment for TheMeteorChef @ http://chf.bz/2sBGkcG re:form fields mantaining input data.
	
06-20-17

	Initializing. Need to figure out how to clear form after submitting new event. Also should make Bert alert say "Event deleted" after remove rather than "Event edited."
	Left new comment for TheMeteorChef @ http://chf.bz/2tLgnUB.
	Partial fix: using jQuery to clear modal form starting at add-edit-event.js 11 but there is still a problem when clicking cancel on an edit event form. If same event is opened to edit immediately afterward then all forms are clear...

06-21-17

	Hackily fixed - 2nd edit click displaying blank form - by forcing page reload on cancel form. Don't like it and should look back at it towards the end of dev.
	For now moving on to designing my database and schema.

06-22-17

	Greatly improved UI IMHO. What i've learned: keep things simple for two reasons. One: it's better UI. Two: why waste time when you might need to scrap it later.

	I have hooked up the list template to the events db. Next I need to find a way to select by department...

06-29-17

	Skipped entries for several days. Got the list view started but facing some challenges parsing dates, particularly how to Query MongoDB with MM & YY.

07-01-17

	Got listView proof of concept.
	Next steps:
		• Responsive cal items
		• Details page and plumbing
		• Interested filter
		• Search functionality
		• User interface
		• Submit button on/DayClick off
		• Submtter/User login

	Problem: events that fall on the current day do not show up in list view but the distinct year and month headers still do...

07-07-17
	
	List logic quasi complete. Purely using JS dates now but having issues with GMT-3 local time zone screwing up the calender and shifting new events one day prior. Left a question on The Meteor Chef and got an answer at:

	https://themeteorchef.com/tutorials/reactive-calendars-with-fullcalendar#comment-m2gEyibj7BdzHGWLF

07-08-17

	Serious improvements with TZ problems but still having an issue with events that fall on the first of the month. I belive it is an issue with my GMT-003 location.

07-11-17

	Hacky fix for events falling on first issue: moving my $gte & $lt querys back a day. Works for now. Next step is making a "Add Event" page rather than modal (unless multi page is an issue for mobile build).

07-26-17

	Improved UI with CSS and trying to implement better mobile exp. w color coding dep. Having issues figuring out how to associate colors w/departments...

08-05-17

	Improved loginButtons as well as datepicker. Two problems. Don't have time picker and have accounts.js folder and file in client which i'm sure is not right. Also, need to figure out how to add permissions on account creation.
	
08-08-17

	Added user/contributor field to loginButtons. Styled some. Would like to work with css to make the radio buttons better but I think I will need to know how to inject classes into the package html to do this and I don't now how to do that. It's good for now, and I need to move onto dividing my templates based on user type. I might want to go away from the "u"/"c" seperation to a true/false way, but for now I'll experiment...

08-09-17

	Implemented some of the divide between user/contributor: submit button, I've added/Interested button, & events I've added filter with Session.
	Some problems with styling on I've added button.
	Ongoing issue with lack of "no events found" display.

08-10-17

	Implemented Details view and matching contributor id with event clicked to check if can edit or if user. Need to implement "interested" next and style the details modal.

08-21-17

	Completed form fields although I still need to figure out time of day for events and if I want to make the location form fields more specific. Next steps are time of day and filtering by institution if I want that. Also, UTC time vs. BR time... After that I am done with V. 1.0 i guess...

08-23-17

	Implemented institution filter.