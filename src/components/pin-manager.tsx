import { h, Component } from 'preact';


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
import { FeedbackDTO } from './feedback-modal';

export class PinManager extends PublisherComponent<any, any> {
  constructor(props) {
    super(props);

    this.setState({
      pins: [] as FeedbackDTO[],
      parent: props.parent as HTMLElement
    });

    this.addPin = this.addPin.bind(this);
    this.render = this.render.bind(this);

    this.subscribe('FEEDBACK_SUBMITTED', this.addPin);
  }

  addPin(feedback: FeedbackDTO): void {
    this.state.pins.push(feedback);
    this.forceUpdate();
  }

  render({ parent }, { pins }, context?: any) {
    return (<div class="bs-pin-manager">
      {pins.map(pin => <Pin parent={parent} feedback={pin} />)}
    </div>);
  }
}

export class Pin extends Component<{ parent: HTMLElement, feedback: FeedbackDTO} , any> {

  constructor(props) {
    super(props);

    this.render = this.render.bind(this);
  }

  componentWillUpdate() {
    console.log(this.base);
  }

  render ({ parent, feedback }, { }) {
    let parentRect = parent.getBoundingClientRect();
    let base = this.base;
    let pinHeight = this.base ? this.base.clientHeight : 32;
    let pinMid = this.base ? this.base.clientWidth / 2 : 12;
    let styles = {
      top: `${feedback.coords.y - parentRect.top - pinHeight}px`,
      left: `${feedback.coords.x - parentRect.left}px`
    };

    return (
      <span id={`bs-pin-${feedback.created}`}
      class="bs-pin fa fa-map-marker-alt"
      style={styles}
      ></span>
    );
  }
}
