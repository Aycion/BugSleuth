import { h } from 'preact';
import { PublisherComponent } from '../management/registry';

/**
 * Utility component for any other component that needs a modal. A modal is a
 * pop-up that floats in front of the screen. Modals usually contain alerts
 * or forms (in this case, they will mostly contain forms.)
 */
export class Modal extends PublisherComponent<any, any> {
  constructor(props) {
    super(props);

    this.setState({
      hidden: true,
      id: props.id || -1
    });
  }

  /**
   * Close and hide the modal.
   */
  close(e) {
    this.setState({
      hidden: true
    });
  }

  /**
   * Open and show the modal
   */
  open(e) {
    this.setState({
      hidden: false
    });
  }

  render(props, state) {

    /* If the modal is hidden, don't render it */
    if (state.hidden)
      return (<div></div>);
    return (
      <div id={`modal-${state.id}`} class="modal">

        <div class="modal-body">
          <div class="modal-header">
            <span class="modal-close far fa-times-circle" onClick={this.close.bind(this)}></span>
          </div>
          <div class="modal-content">
          {props.children}
          </div>
          <div class="modal-footer">
          </div>
        </div>

      </div>
    );
  }

}
