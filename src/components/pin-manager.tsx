import { h } from 'preact';


/**
 * On hover:
 *  - display issue title and ID (format - ID:title)
 *
 * On click:
 *  - Display modal with title, description, and severity
 * 
 * Store pins in local storage. On startup, load cached pins and lazy
 * load pins from adapter to improve speed
 */
import { PublisherComponent } from '../management/registry';

export class PinManager extends PublisherComponent {
  render({ }, { }, context?: any) {
    return (<div>

    </div>);
  }
}

export class Pin extends PublisherComponent {

  render ({ }, { }) {
    return (
      <div></div>
    );
  }
}
