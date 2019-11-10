/* global document, window, Components, MozXULElement */

'use strict';

Components.utils.import('resource://gre/modules/Preferences.jsm');
const prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);

function newMenuItem(item){
  return (
    MozXULElement.parseXULToFragment(
      `<menuitem label="${item.text}" value="${item.value}" oncommand="snoozeItem(event)" />`
    )
  );
}

function buildCustomSnoozeMenu(menus){
  menus.forEach((menu) => {
    // Remove old items
    const items = menu.querySelectorAll('menuitem:not(.unit-menuitem)');
    items.forEach((item) => { item.parentNode.removeChild(item); });

    // Add new items
    if (prefs.getBoolPref('extensions.testextension.four')) menu.prepend(newMenuItem({ text: '4 Minutes', value: 4 }));
    if (prefs.getBoolPref('extensions.testextension.three')) menu.prepend(newMenuItem({ text: '3 Minutes', value: 3 }));
    if (prefs.getBoolPref('extensions.testextension.two')) menu.prepend(newMenuItem({ text: '2 Minutes', value: 2 }));
    if (prefs.getBoolPref('extensions.testextension.one')) menu.prepend(newMenuItem({ text: '1 Minute', value: 1 }));
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

// React to change in preferences
const myPrefObserver = {
  register() {
    const prefService = Components.classes['@mozilla.org/preferences-service;1']
                                .getService(Components.interfaces.nsIPrefService);

    this.branch = prefService.getBranch('extensions.testextension.');

    if (!('addObserver' in this.branch)){
      this.branch.QueryInterface(Components.interfaces.nsIPrefBranch2);
    }

    this.branch.addObserver('', this, false);
  },

  unregister() {
    this.branch.removeObserver('', this);
  },

  observe() {
    pollSnoozeMenus();
  }
};

// Kick it all off
myPrefObserver.register();
pollSnoozeMenus();
