import { h } from 'preact';
import { PublisherComponent } from '../management/registry';

/**
 *
 */
export class ElementSelector extends PublisherComponent {

  constructor(props) {
    super(props);

    this.setState({
      hidden: true,                     /* Should the component be displayed? */
      shouldFindSelectedElement: false, /* Should the clicked element be searched for? */
      clickCoords: [-1, -1]             /* Where the click occurred */
    });

    /*
     * When the sidebar's element feedback selector button is pressed, display
     * this component
     */
    this.subscribe('SIDEBAR_FEEDBACK_ELEM', this.show);
  }

  /**
   * This method is called when the selector overlay is clicked.
   *
   * The location of the click is stored, and the state is updated to signal
   * that the topmost element should be selected and sent to the element
   * feedback modal/form.
   *
   * @param e data from the mouse click
   */
  handleClick(e: MouseEvent) {
    /* TODO: put clicked coord into state so componentDidUpdate can access it */
    this.setState({
      shouldFindSelectedElement: true,
      clickCoords: [e.x, e.y],
      hidden: true
    });
  }

  /**
   * Called after render() is called.
   */
  componentDidUpdate() {
    if (this.state.shouldFindSelectedElement && this.state.hidden) {
      let [x, y] = this.state.clickCoords;
      this.publish('SELECTOR_ELEM_SELECTED', document.elementFromPoint(x, y));
    }
  }

  /**
   * Hide the element selector
   * @param e
   */
  hide(e: MouseEvent) {
    this.setState({
      hidden: true
    });
  }

  /**
   * Show the Element Selector.
   *
   * @param e
   */
  show(e?: MouseEvent) {
    this.setState({
      hidden: false
    });
  }

  render(props, state) {
    if (state.hidden)
      return (<div></div>);
    else return (
      <div class="selector-dimmer" onClick={this.handleClick.bind(this)}>
        <span class="selector-exit" onClick={this.hide.bind(this)}>&times;</span>
        {/* props.children */}
      </div>
    );
  }
}
