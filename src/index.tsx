/**
 * BugSleuth mount point.
 *
 * This script attaches all the needed components and does all requisite
 * initialization logic for BugSleuth to work.
 *
 * @author Donald Isaac
 *
 * @copyright 2019. See LICENSE for details.
 */

/* Utilities */
import { render, h } from 'preact';
import * as ulog from 'ulog';

/* Central Registry, the brains of the whole thing */
import { CentralRegistry } from './management/registry';

/* Components */
import { Sidebar } from './components/sidebar';
import { FeedbackModal } from './components/feedback-modal';
import { ElementSelector } from './components/element-selector';
import { PinManager } from './components/pin-manager';

/* Services */
import { Service } from './services/service';

const providers: Array<Service> = [
  /* TODO: Put services in here */
];

/* Create the global BugSleuth object */
let tracker: IssueTracker = window._tracker = {
  registry: new CentralRegistry(providers),
  logger: ulog('issue-tracker'),
  enableDebug: () => tracker.logger.level = tracker.logger.DEBUG,
  disableDebug: () => tracker.logger.level = tracker.logger.WARN
};

/* For development only. Remove during production. */
tracker.enableDebug();

const root = document.getElementById('bugsleuth-bootstrap').getAttribute('data-bs-loc');

/* Root element for sidebar element */
let wrapper = document.createElement('div');
wrapper.setAttribute('id', 'tracker-ui-wrapper');
/* TODO: Are these styles neccessary? */
wrapper.setAttribute('style', 'position: absolute; right: 2rem; bottom: 1rem;');

/* Shadow DOM for sidebar */
let shadow = wrapper.attachShadow({ mode: 'open' });

/* Build the link tag that will get BugSleuth's stylesheet */
let fontawesome = document.createElement('link');
fontawesome.setAttribute('rel', 'stylesheet');
fontawesome.setAttribute('href', 'https://use.fontawesome.com/releases/v5.8.2/css/all.css');
fontawesome.setAttribute('integrity', 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay');
fontawesome.setAttribute('crossorigin', 'anonymous');

let stylesheet = document.createElement('link');
stylesheet.setAttribute('rel', 'stylesheet');
stylesheet.setAttribute('type', 'text/css');
/* Change this URL to your own custom URL */
stylesheet.setAttribute('href', root + 'bugsleuth.css');

let publicStylesheet = document.createElement('link');
publicStylesheet.setAttribute('rel', 'stylesheet');
publicStylesheet.setAttribute('type', 'text/css');
publicStylesheet.setAttribute('href', root + 'bugsleuth_public.css');

/* Add the components to the wrapper div's shadow root. */
[
  <Sidebar />,
  <FeedbackModal />,
  <ElementSelector />,
  <PinManager />
].forEach(component => {
  render(component, shadow);
});

/* Attach everything else to their respective mounts */
document.head.appendChild(publicStylesheet);
// I don't know why, but fontawesome needs to be in the head
// not the shadow root). Otherwise, icons will not render correctly.
document.head.appendChild(fontawesome);
shadow.appendChild(stylesheet);
document.body.appendChild(wrapper);
