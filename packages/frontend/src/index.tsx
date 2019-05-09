import { render, h } from 'preact';
import * as ulog from 'ulog';
import { CentralRegistry } from './management/registry';
import { Sidebar } from './components/sidebar';
import { NewFeedbackOverlay } from './components/new-feedback.overlay';
import './styles/app.scss';

let tracker: IssueTracker = window._tracker = {
  registry: new CentralRegistry(),
  logger: ulog('issue-tracker'),
  enableDebug: () => tracker.logger.level = tracker.logger.DEBUG,
  disableDebug: () => tracker.logger.level = tracker.logger.WARN
};

/* For development only. Remove during production. */
tracker.enableDebug();

/* Root element for sidebar element */
let wrapper = document.createElement('div');
wrapper.setAttribute('id', 'tracker-ui-wrapper');
wrapper.setAttribute('style', 'position: absolute; right: 2rem; bottom: 1rem;');

/* Shadow DOM for sidebar */
let shadow = wrapper.attachShadow({ mode: 'open' });

/* Add FontAwesome to the page */
let fontAwesome = document.createElement('link');
fontAwesome.setAttribute('rel', 'stylesheet');
fontAwesome.setAttribute('href', 'https://use.fontawesome.com/releases/v5.8.1/css/all.css');
fontAwesome.setAttribute('crossorigin', 'anonymous');
fontAwesome.setAttribute('integrity', 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf');

/* Attach everything to their respective mounts */
shadow.appendChild(fontAwesome);
document.body.appendChild(wrapper);



/* New Feedback Overlay sidebar element */
let overlayWrapper = document.createElement('div');
overlayWrapper.setAttribute('id', 'tracker-ui-overlay');
overlayWrapper.setAttribute('style', ' padding: 2.5em; margin: 0 auto; width: 80%;');
document.body.appendChild(overlayWrapper);

/* Close all overlays when the Escape key is pressed */
window.addEventListener('keydown', e => {
  if (e.code === 'Escape')
    // @ts-ignore
    window._tracker.registry.notify(this, 'OVERLAY_SIG_HIDE');
});

// @ts-ignore
let sidebar = render(<Sidebar />, shadow);
// @ts-ignore
let dimmer = render(<NewFeedbackOverlay />, shadow);