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