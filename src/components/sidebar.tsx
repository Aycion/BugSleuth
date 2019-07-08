/**
 * This component is the sidebar. The sidebar contains the button that creates
 * a new issue. When this button is clicked, the overlay component is displayed.
 * If the user's connection config has not been apropriately set up, they are
 * taken to a form that let them modify that instead.
 */

import { h } from 'preact';
import { PublisherComponent } from '../management/registry';

export class Sidebar extends PublisherComponent<any, any> {

  constructor(props) {
    super(props);
  }

  elemFeedbackClickClick = (e: MouseEvent) => {
    this.publish('SIDEBAR_FEEDBACK_ELEM');
  }

  pageFeedbackClick = (e: MouseEvent) => {
    this.publish('SIDEBAR_FEEDBACK_PAGE');
  }

  configClick = (e: MouseEvent) => {
    this.publish('SIDEBAR_OPEN_CONFIG');
  }

  render({ }, { }) {
    return (
        <div class="tracker sidebar">
          <div class="sidebar-btn" onClick={this.elemFeedbackClickClick}>
            <span class="fa fa-map-marker-alt"></span>
          </div>
          <div class="sidebar-btn" onClick={this.pageFeedbackClick}>
            <span class="fas fa-columns"></span>
          </div>
          <div class="sidebar-btn" onClick={this.configClick}>
            <span class="fas fa-cog"></span>
          </div>
        </div>
    );
  }
}
