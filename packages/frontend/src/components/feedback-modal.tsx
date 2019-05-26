import { h, Component } from 'preact';
import { PublisherComponent } from '../management/registry';
import { Modal } from './modal';

/**
 * This component is the modal that the user sees when they want to
 * submit feedback.
 */
export class FeedbackModal extends PublisherComponent {

  private modal: Modal;

  constructor(props) {
    super(props);

    this.setState({

    });

    /*
     * The SELECTOR_ELEM_SELECTED event opens the element feedback form, while
     * the SIDEBAR_FEEDBACK_PAGE event opens the page feedback form.
     */
    this.subscribe('SELECTOR_ELEM_SELECTED', this.openElemFeedback);
    this.subscribe('SIDEBAR_FEEDBACK_PAGE', this.openPageFeedback);
  }

  openElemFeedback(...args: any[]) {
    this.setState({
      feedbackType: 'elem'
    });
    this.modal.open(null);
    console.dir(args);
  }

  openPageFeedback(...args: any[]) {
    this.setState({
      feedbackType: 'page'
    });
    this.modal.open(null);
  }

  render(props, state) {
    let form = state.feedbackType === 'elem' ?
               <ElemFeedbackForm /> :
               <PageFeedbackForm />;
    return (
      <Modal id={1} ref={modal => this.modal = modal}>
        {form}
      </Modal>
    );
  }
}

const ElemFeedbackForm = ({ }, { }) => (
  <form>
    <input type="text" value="What is your feedback?" />
  </form>
);

const PageFeedbackForm = ({ }, { }) => {
  return (
    <form>
      <input type="text" value="What is your feedback?" />
    </form>
  );
};
