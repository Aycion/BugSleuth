import { Component } from 'preact';
import { Service } from '../services/service';

/**
 * Stores a map of subscribers and observers and handles all event emissions and
 * listener functions. This class is effectively an implementation of the
 * Publisher/Subscriber design pattern.
 *
 * Components should never directly interface with the `CentralRegistry`; they
 * should instead extend the `EventComponent` class and use the interface
 * it provides.
 *
 * This class should be created only once as a singleton attached to the
 * global `window` object. Do not create new instances of this class.
 *
 * @see https://en.wikipedia.org/wiki/Observer_pattern
 */
export class CentralRegistry {

  /**
   * Map storing all registered EventComponents. The `key` is the event
   * that triggers the event, while the `value` is the subscriber
   * that listens for said event.
   */
  private subscriptions: Map<string, Subscription[]>;
  private services: Map<string, Service>;

  constructor(providers?: Array<Service>) {
    this.subscriptions = new Map();
    this.services = new Map();

    for (let provider of providers) {
      /* TODO: Should the singleton be initialized before being put into the
      registry, or should a class be passed? If a class, then HOW? */
      this.services.set(provider.key, provider);
    }

  }

  /**
   * Get a reference to a service.
   *
   * @param key the key the service is provided under
   */
  service(key: string): Service {
    return this.services.get(key);
  }

  /**
   * Adds a new `Subscription` to the specified event.
   *
   * @param event         The Event to register to
   * @param subscriber    The object that is subscribing
   * @param callback      The callback to function to invoke
   *                      when the Event is published
   */
  registerSubscriber(event: string, subscriber: any, callback: Function): void {
    if (!this.subscriptions.has(event))
      this.subscriptions.set(event, []);

    /* Add the subscription to the registry */
    this.subscriptions.get(event).push({ subscriber, callback });

    window._tracker.logger.info(`Subscriber ${subscriber} has subscribed to ${event}.`);
  }

  /**
   * Removes all `Subscriptions` that `subscriber` has for `event`.
   *
   * @param event         The event to unsubscribe from
   * @param subscriber    The subscriber being removed
   */
  removeSubscriber(event: string, subscriber: any): void {
    if (!this.subscriptions.has(event)) return;

    /*
      Filter out Subscriptions for the specified subscriber, storing the
      result.
    */
    let subscriptions = this.subscriptions.get(event).filter(subscription =>
      subscription.subscriber !== subscriber);

    /* Store the filtered array */
    this.subscriptions.set(event, subscriptions);
  }

  /**
   * Notifies all `Subscriptions` when an event occurs.
   *
   * @param publisher     The object or class publishing the event
   * @param event         The event being published
   * @param args          Arguments to send to the `Subscription`'s callback
   *                      function
   */
  notify(publisher: PublisherComponent | Window | Document, event: string, ...args: any[]): void {
    /* TODO: This jawn gets mangled by webpack, so constructor.name is kinda useless */
    window._tracker.logger.info(`REGISTRY: event ${event} was published \
    with ${args && args[0].length ? `args: ${args}` : 'no args'}`);
    /* Get list of subscribers to this event */
    let subscriptions = this.subscriptions.get(event);
    if (!subscriptions) return;

    for (let sub of subscriptions) {
      // sub.callback(...args);
      sub.callback.apply(sub.subscriber, ...args);
    }
  }

  /**
   * Gets a reference to a service singleton.
   *
   * @param key The key the service is provided under
   *
   * @returns The service being requested
   */
  getService(key: string): Service {
    return this.services.get(key);
  }

}

/**
 * Parent class for all widget Components. Contains logic for interacting with
 * the CentralRepository.
 */
export abstract class PublisherComponent extends Component<any, any> {

  private events: string[];

  constructor(props) {
    super(props);
    this.events = [];
  }

  /**
   * Publishes an event to the listening subscribers.
   *
   * @property event      The event to publish
   * @property args       Arguments to send the subscribers
   */
  protected publish(event: string, ...args: any[]): void {
    window._tracker.registry.notify(this, event, args);
  }

  /**
   * Subscribes this object to an event. Whenever `event` is published, the
   * callback function will be invoked.
   *
   * @param event          The event to subscribe to
   * @param callback       The callback function that will be called when
   *                       `event` is published
   */
  protected subscribe(event: string, callback: Function): void {
    if (event in this.events === false)
      this.events.push(event);

    window._tracker.registry.registerSubscriber(event, this, callback);
  }

  /**
   * Unsubscribes this object from the specified `event`. If no `event` is
   * specified, this object is unsubscribed from all events.
   *
   * @param event         The event to unsubscribe from
   */
  protected unsubscribe(event?: string) {
    if (event == null) {
      for (let e of this.events) {
        window._tracker.registry.removeSubscriber(e, this);
      }
      window._tracker.logger.info(`Component ${this} unsubscribed from`);
      this.events = [];

    } else {
      window._tracker.registry.removeSubscriber(event, this);
      this.events = this.events.filter(e => e !== event);
    }
  }

}

/* TODO: Doesn't work :( something something target isn't really the
  PublisherComponent instance or something? */

/**
 * Subscribes a method to the central registry.
 *
 * NOTE: When used, the 'this' argument is kinda weird.
 *
 * @param event            The event to subscribe to.
 */
export function Subscribe(event: string): MethodDecorator {
  if (typeof event !== 'string') {
    let err = new TypeError('event must be of type "string"');
    window._tracker.logger.error(err);

    throw err;
  }

  return function (target, propertyKey, descriptor) {

    if (typeof descriptor.value !== 'function') {
      window._tracker.logger.error(`ERROR: Attempted to register a non-function to event ${event}.`);
      window._tracker.logger.debug(`Target: ${target}, descriptor value: ${descriptor.value}.`);
      return;
    }

    window._tracker.registry.registerSubscriber(event, target, descriptor.value as Function);
  };
}

export function Inject(key: string): PropertyDecorator {
  if (typeof key !== 'string') {
    let err = new TypeError('key must be of type "string"');
    window._tracker.logger.error(err);

    throw err;
  }

  return function(target, propertyKey) {
    // TODO
  };
}
