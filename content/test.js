/* global document, window, MozXULElement */

'use strict';

function buildCustomSnoozeMenu(menus){
  menus.forEach((menu) => {
    menu.prepend(
      MozXULElement.parseXULToFragment(
        `<menuitem label="1 Minute" value="1" oncommand="snoozeItem(event)" />`
      )
    );
  });
}

function pollSnoozeMenus(){
  const menus = document.querySelectorAll('[is="calendar-snooze-popup"]');

  if(menus.length < 2) {
    window.requestAnimationFrame(pollSnoozeMenus);
  } else {
    buildCustomSnoozeMenu(menus);
  }
}

pollSnoozeMenus();
