import * as reflect from 'reflect-metadata';
/**
 * Represents an injectable Service.
 *
 * Services are able to be injected into other components via the
 * global `CentralRegsitry` singleton. Before they can be injected, they first
 * must be listed as a `provider` in the `CentralRegistry`.
 */
export interface Service {

  /**
   *  The key the service will be provided under.
   */
  key: string;

  /**
   * Called when the Service is initialized.
   */
  onInit();
}

/* TODO: Should reflection even be used for DI? Should DI even be used??? */
/**
 * Marks a class as an injectable Service.
 *
 * @param key                 the key under which the `Service` will be provided
 *                            in the Injector.
 */
export function Service(key?: string | Function): ClassDecorator {
  return function (target: Function) {
    if (!key)
      key = target; // Use the class as the key

    Reflect.defineMetadata('service:key', key, target);
  };
}
