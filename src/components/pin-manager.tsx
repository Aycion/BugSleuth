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
import { FeedbackDTO } from './feedback-modal';

export class PinManager extends PublisherComponent {
  constructor(props) {
    super(props);

    this.setState({
      pins: []
    });

    this.getNewFeedback = this.getNewFeedback.bind(this);
    this.addPin = this.addPin.bind(this);
    this.subscribe('FEEDBACK_SUBMITTED', this.getNewFeedback);
  }

  getNewFeedback(feedback: FeedbackDTO) {
    console.log('feedback received in PinManager');
    console.dir(feedback);
  }

  addPin(elem: Element, pos: {x: Number, y: Number}): void {
    let id = `bs-pin-${Date.now().toString()}`;
    let pin = <Pin id={id} top={pos.y} right={pos.x} elem={elem}/>;

    this.setState({
      pins: this.state.pins.push(pin)
    });
  }

  render({ }, { }, context?: any) {
    return (<div class="bs-pin-manager">

    </div>);
  }
}

export class Pin extends PublisherComponent {

  constructor(props) {
    super(props);

    this.setState({
      elem: props.elem
    });
  }

  render ({ id, top, right }, { }) {
    return (
      <span id={id} class="bs-pin fa fa-map-marker-alt" style={`top: ${top}; right: ${right}`}></span>
    );
  }
}
