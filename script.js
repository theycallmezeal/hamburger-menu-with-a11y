var isDrawerPulledOut = false;

var state = "wide"; // "wide", "narrow-in", "narrow-out"

var header = document.querySelector("header");
var realNavElement = document.querySelector("#real-nav");
var mobileHeaderElement = document.querySelector("#mobile-header");
var menuTrigger = document.querySelector("#menu-trigger");
var firstNavLink = document.querySelector(".nav-link:not(#back) a");
var backButton = document.getElementById("back");
var realNavFocusableElements = document.querySelectorAll("#real-nav button, #real-nav a");
var realNavFirst = realNavFocusableElements[0];
var realNavLast = realNavFocusableElements[realNavFocusableElements.length - 1];

document.getElementById("cover").onclick = function () { setState("narrow-in") };
menuTrigger.onclick = function () { setState("narrow-out") };
backButton.onclick = function () { setState("narrow-in") };

function adjustBehaviorForWidth() {
	if (window.innerWidth >= 768) {
		setState("wide");
	} else {
		if (state === "wide") {
			setState("narrow-in");
		}
	}
}
window.onload = adjustBehaviorForWidth;
window.onresize = adjustBehaviorForWidth;

function trapFocus(e) {
	if (e.key === 'Tab') {
		if ( e.shiftKey ) /* shift + tab backwards */ {
			if (document.activeElement === realNavFirst) {
				realNavLast.focus();
				e.preventDefault();
			}
		} else /* tab forwards */ {
			if (document.activeElement === realNavLast) {
				realNavFirst.focus();
				e.preventDefault();
			}
		}
	}
}

function setRealNavFocusable(isFocusable) {
	for (var i in realNavFocusableElements) {
		realNavFocusableElements[i].tabIndex = isFocusable ? 0 : -1;
	}
}

function setState(newState) {
	state = newState;
	var lastFocusedElement = document.activeElement;

	if (state === "narrow-in") {
		if (lastFocusedElement === backButton) {
			menuTrigger.focus();
		}
		realNavElement.ariaHidden = true;
		mobileHeaderElement.ariaHidden = false;
		menuTrigger.tabIndex = 0;
	} else {
		realNavElement.ariaHidden = false;
		mobileHeaderElement.ariaHidden = true;
		menuTrigger.tabIndex = -1;
	}

	if (state === "narrow-out") {
		header.classList.add("pulled-out");
		realNavElement.addEventListener('keydown', trapFocus);
		setRealNavFocusable(true);

		if (lastFocusedElement === menuTrigger) {
			firstNavLink.focus();
		}
	} else {
		header.classList.remove("pulled-out");
		realNavElement.removeEventListener('keydown', trapFocus);
		setRealNavFocusable(false);
	}
}

/* THE BOTCHED ATTEMPT */

// function setDrawerPulledOut(newIsDrawerPulledOut) {
// 	isDrawerPulledOut = newIsDrawerPulledOut;
// 	if (isDrawerPulledOut) {
// 		header.classList.add("pulled-out");
// 		firstNavLink.focus();
// 		realNavElement.addEventListener('keydown', trapFocus);
// 		mobileHeaderElement.ariaHidden = true;
// 		realNavElement.ariaHidden = false;
// 		main.ariaHidden = true;
// 		setRealNavFocusable(true);
// 	} else {
// 		header.classList.remove("pulled-out");
// 		menuTrigger.focus();
// 		realNavElement.removeEventListener('keydown', trapFocus);
// 		mobileHeaderElement.ariaHidden = false;
// 		realNavElement.ariaHidden = true;
// 		main.ariaHidden = false;
// 		setRealNavFocusable(false);
// 	}
// }

// function adjustBehaviorForWidth() {
// 	if (window.innerWidth >= 768) {
// 		setDrawerPulledOut(false);
// 	} else {
// 		if (!isDrawerPulledOut) {
// 			mobileHeaderElement.ariaHidden = false;
// 			realNavElement.ariaHidden = true;
// 			setRealNavFocusable(false);
// 		}
// 	}
// }

// function toggleDrawer() {
// 	setDrawerPulledOut(!isDrawerPulledOut);
// }

// function trapFocus(e) {
// 	if (e.key === 'Tab') {
// 		if ( e.shiftKey ) /* shift + tab */ {
// 			if (document.activeElement === realNavFirstFocusableElement) {
// 				realNavLastFocusableElement.focus();
// 				e.preventDefault();
// 			}
// 		} else /* tab */ {
// 			if (document.activeElement === realNavLastFocusableElement) {
// 				realNavFirstFocusableElement.focus();
// 				e.preventDefault();
// 			}
// 		}
// 	}
// }

// function setRealNavFocusable(isFocusable) {
// 	console.log('called');
// 	for (var i in realNavFocusableElements) {
// 		realNavFocusableElements[i].tabIndex = isFocusable ? 0 : -1;
// 	}
// }

// window.onload = adjustBehaviorForWidth;
// window.onresize = adjustBehaviorForWidth;

// document.getElementById("cover").onclick = toggleDrawer;
// document.getElementById("menu-trigger").onclick = toggleDrawer;
// document.getElementById("back").onclick = toggleDrawer;