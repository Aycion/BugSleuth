import * as reflect from 'reflect-metadata';
/**
 * Represents an injectable Service.
 *
 * Services are able to be injected into other components via the
 * global `CentralRegsitry` singleton. Before they can be injected, they first
 * must be listed as a `provider` in the `CentralRegistry`.
 */
export interface IService {

  /**
   * Called when the Service is initialized.
   */
  onInit();
}

/**
 * Marks a class as an injectable Service.
 *
 * @param key                 the key under which the `Service` will be provided
 *                            in the Injector.
 */
export function Service(key?: string | Function): ClassDecorator {
  return function (target: Function) {
    if (!key)
      key = target;

    Reflect.defineMetadata('service:key', key, target);
  };
}
