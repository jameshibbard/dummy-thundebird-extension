/* global ChromeUtils document */
/* exported init */

const { Services } = ChromeUtils.import('resource://gre/modules/Services.jsm');

const preferences = [
  { id: 'extensions.testextension.one', type: 'bool' },
  { id: 'extensions.testextension.two', type: 'bool' },
  { id: 'extensions.testextension.three', type: 'bool' },
  { id: 'extensions.testextension.four', type: 'bool' },
];

const branchName = 'extensions.testextension.';
const branchNameLength = branchName.length;
const branch = Services.prefs.getBranch(branchName);

function init() {
  for (const pref of preferences) {
    const element = document.getElementById(pref.id);
    const prefName = pref.id.substring(branchNameLength);

    element.setAttribute('checked', branch.getBoolPref(prefName) ? 'true' : 'false');
  }
  document.addEventListener('dialogaccept', save);
}

function save() {
  for (const pref of preferences) {
    const element = document.getElementById(pref.id);
    const prefName = pref.id.substring(branchNameLength);

    branch.setBoolPref(prefName, element.getAttribute('checked') == 'true');
  }
}
