/* global customElements */

'use strict';

const popupSnooze = customElements.get('calendar-snooze-popup');
const calendarAlarmWidget = customElements.get('calendar-alarm-widget');

console.log(popupSnooze);
console.log(calendarAlarmWidget);

// This will alter the snooze popup for the 'Snooze all for' menu
popupSnooze.prototype.connectedCallback = function() {
  console.log("Hello from the calendar-snooze-popup");

  if (this.delayConnectedCallback() || this.hasConnected) {
    return;
  }
  this.hasConnected = true;
  this.appendChild(
    MozXULElement.parseXULToFragment(
      `<menuitem label="Gimme 5!!!" value="5" oncommand="snoozeItem(event)"/>`,
    )
  );
};

// This doesn't log anything :()
calendarAlarmWidget.prototype.connectedCallback = function() {
  console.log("Hello from the calendar-alarm-widget");
};
