import { h, Component } from 'preact';
import { PublisherComponent } from '../management/registry';
import { Modal } from './modal';

/**
 * Feedback data transfer object (DTO). Defines how feedback data is transferred
 * to the adapter.
 */
export interface FeedbackDTO {
  /** The element the feedback is being provided for */
  element: Element;

  /** Feedback title */
  title: string;

  /** Long description of issue */
  feedback: string;

  /** TODO: Add user providing feedback and severity (1 - 5) */
}

/**
 * This component is the modal that the user sees when they want to
 * submit feedback.
 */
export class FeedbackModal extends PublisherComponent {

  private modal: Modal;

  constructor(props) {
    super(props);

    this.setState({
      // TODO
    });

    /*
     * The SELECTOR_ELEM_SELECTED event opens the element feedback form, while
     * the SIDEBAR_FEEDBACK_PAGE event opens the page feedback form.
     */
    this.subscribe('SELECTOR_ELEM_SELECTED', this.openElemFeedback);
    this.subscribe('SIDEBAR_FEEDBACK_PAGE', this.openPageFeedback);
  }

  openElemFeedback(elem: Element): void {
    this.setState({
      feedbackElement: elem
    });
    this.modal.open(null);
  }

  openPageFeedback(): void {
    this.setState({
      feedbackElement: window
    });
    this.modal.open(null);
  }

  onSubmit = (e: Event, feedback: FeedbackDTO): void => {
    e.preventDefault(); // Don't let the form perform it's default submit action
    this.modal.close(null);
    feedback.element = this.state.feedbackElement;
    this.publish('FEEDBACK_SUBMITTED', feedback);
  }

  render(props, state): JSX.Element {
    return (
      <Modal id={1} ref={modal => this.modal = modal}>
        <FeedbackForm onSubmit={this.onSubmit} elem={state.feedbackElement} />
      </Modal>
    );
  }
}

/**
 * Feedback form element. Only used in the FeedbackModal.
 *
 * Feedback Form Options:
 *  - Title
 *  - Description
 *  - Track who submitted it
 *  - Severity [1, 2, 3, 4, 5], start off with default
 *    - color pins by severity
 *
 */
class FeedbackForm extends Component<{ onSubmit: Function, elem: Element }, FeedbackDTO> {

  constructor(props) {
    super(props);

    this.setState({
      element: props.elem
    });

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event): void {
    let { name, value } = event.target;
    console.log(`${name} changed: ${value}`);

    if (name === 'feedback') {
      this.setState({ feedback: value });
    } else if (name === 'title') {
      this.setState({ title: value });
    } else {
      throw new Error('Illegal state change: form can only take feedback and title fields');
    }

  }

  render({ onSubmit }, state: FeedbackDTO): JSX.Element {
    return (
      <form class="feedback-form" onSubmit={e => onSubmit(e, this.state)}>
        <label for="title">Title:</label>
        <br />
        <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
        <br />
        <label for="feedback">What is your feedback?</label>
        <br />
        <input name="feedback" type="text" value={this.state.feedback} onChange={this.handleChange} />
        <br />
        <button type="submit" value="Submit">Submit</button>
      </form>
    );
  }
}
