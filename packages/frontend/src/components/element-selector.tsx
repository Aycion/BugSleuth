import { h } from 'preact';
import { PublisherComponent } from '../management/registry';

/**
 * Overlay for selecting elements for feedback.
 */
export class ElementSelector extends PublisherComponent {
  /**
   * Current Element the cursor is hovering over during element selection.
   * This is intentionally not in the Component's state object because this
   * property is used for direct DOM manipulation. Therefore, we don't need the
   * virtual DOM to update.
   */
  hoverTarget: Element = null;

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
    this.subscribe('SELECTOR_HIDE', this.hide);
  }

  componentWillUnmount() {
    this.unsubscribe();
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
    let target: HTMLElement = e.target as HTMLElement;

    if (target.classList.contains('selector-exit')) {
      this.hide();
      return;
    }

    this.setState({
      shouldFindSelectedElement: true,
      clickCoords: [e.x, e.y],
      hidden: true
    });
  }

  /**
   * Handles highlighting of hovered elements.
   *
   * When the mouse moves during element selection mode, this method finds the
   * element being hovered over and highlights it. If the element is different
   * from the previous highlighted element, the previously highlighted element
   * is un-highlighted.
   *
   * @param e the event object sent from the 'mousemove' event
   */
  handleMouseMove(e: MouseEvent) {
    let target = document.elementsFromPoint(e.x, e.y)[1];

    if (!target.classList.contains('bs-hover')) {
      this.updateElementHighlight(target);
    }

  }

  /**
   * Highlights a target element and un-highlights the previous hover target.
   *
   * @param target the element to highlight
   */
  updateElementHighlight = (target: Element) => {
    if (this.hoverTarget && !this.hoverTarget.isSameNode(target)) {
      this.hoverTarget.classList.remove('bs-hover');
    }

    this.hoverTarget = target;
    target.classList.add('bs-hover');
    this.forceUpdate();
  }

  /**
   * Un-highlight the hover target
   */
  removeHighlight = () => {
    this.hoverTarget.classList.remove('bs-hover');
    this.hoverTarget = null;
  }

  /**
   * Called after render() is called.
   */
  componentDidUpdate() {
    if (this.state.shouldFindSelectedElement && this.state.hidden) {
      let [x, y] = this.state.clickCoords;
      this.publish('SELECTOR_ELEM_SELECTED', document.elementsFromPoint(x, y));
    }
  }

  /**
   * Hide the element selector overlay component.
   * @param e
   */
  hide(e?: MouseEvent) {
    this.removeHighlight();
    this.setState({
      hidden: true
    });
  }

  /**
   * Show the element selector overlay component.
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
      <div class="selector-dimmer"
        onClick={this.handleClick.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onKeyPress={console.log}>
        <span class="selector-exit" onClick={this.hide.bind(this)}>&times;</span>
        {/* props.children */}
      </div>
    );
  }
}
