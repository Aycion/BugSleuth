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

/* Services */
import { IService } from './services/service';
/* TODO: Is this import neccessary? I don't think it is */
/* import './styles/app.scss'; */

const providers: Array<IService> = [
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

/* Root element for sidebar element */
let wrapper = document.createElement('div');
wrapper.setAttribute('id', 'tracker-ui-wrapper');
/* TODO: Are these styles neccessary? */
wrapper.setAttribute('style', 'position: absolute; right: 2rem; bottom: 1rem;');

/* Shadow DOM for sidebar */
let shadow = wrapper.attachShadow({ mode: 'open' });

/* Build the link tag that will get BugSleuth's stylesheet */
let stylesheet = document.createElement('link');
stylesheet.setAttribute('rel', 'stylesheet');
stylesheet.setAttribute('type', 'text/css');
/* Change this URL to your own custom URL */
stylesheet.setAttribute('href', 'http://localhost:3000/widget/stylesheet');


/* Close all overlays when the Escape key is pressed */
/* window.addEventListener('keydown', e => {
  if (e.code === 'Escape')
    // @ts-ignore
    window._tracker.registry.notify(window, 'OVERLAY_SIG_HIDE');
}); */

/* Attach everything to their respective mounts */
shadow.appendChild(stylesheet);

/* Add the components to the wrapper div's shadow DOM root node. */
[
  <Sidebar />,
  <FeedbackModal />,
  <ElementSelector />
].forEach(component => {
  render(component, shadow);
});

/* let sidebar = render(<Sidebar />, shadow);
render(<FeedbackModal />, shadow);
render(<ElementSelector />, shadow) */
document.body.appendChild(wrapper);
