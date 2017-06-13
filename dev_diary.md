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