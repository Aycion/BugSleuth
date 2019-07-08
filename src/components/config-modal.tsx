import { h } from 'preact';
import { PublisherComponent } from '../management/registry';
import { Modal } from './modal';
import { ConfigService } from '../services/config.service';

/**
 * Modal that displays the config/settings modal. Config data is sent to the
 * config service
 *
 * @see ConfigService
 */
export class ConfigModal extends PublisherComponent<any, any> {
  private modal: Modal;
  private config: ConfigService;

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);

    this.subscribe('SIDEBAR_OPEN_CONFIG', this.open);
  }

  /**
   * Opens the config modal.
   */
  open(): void {
    this.modal.open(null);
  }

  /**
   * Saturates the config component with data from the config service.
   */
  pullConfigData(): void {
    // todo
  }

  /**
   * Sends updated config data to the config service.
   */
  pushConfigData(): void {
    // todo
  }

  render({ }, { }): JSX.Element {
    return(
      <Modal id={2} ref={modal => this.modal = modal}>
        <h1>Config Modal Works :)</h1>
      </Modal>
    );
  }
}
