import 'reflect-metadata';

export type GenericClassDecorator<T> = (target: T) => void;
export type InjectorToken<T> = Type<T> | string | Symbol;
export type Provider = Type<any> | object;

export interface Type<T> {
  new(...args: any[]): T;
}

// export interface Provider {
//   key?: string;
//   provide?: Service ;
//   provideFactory?: Function; // TODO
// }

export function Service(token?: InjectorToken<any>): GenericClassDecorator<Type<object>> {
  return (target: Type<object>) => {
    // When no custom token is provided, the class itself is the token
    if (!token) token = target;
    Reflect.defineMetadata('di:token', token, target);
  };
}

/**
 * Container for storing and serving Providers.
 *
 * Providers may be added to the Injector via the bind() method. After a
 * provider is bound, it may be retrieved by calling resolve().
 *
 * @author Donald Isaac
 */
export class Injector {
  readonly providers: Map<InjectorToken<any>, any>;

  constructor() {
    this.providers = new Map<InjectorToken<any>, Provider>();
  }

  resolve<T>(token: InjectorToken<T>): T {
    return this.providers.get(token);
  }


  /**
   * Binds a Provider to the Injector.
   *
   * Bound Providers can be retrieved after binding using the resolve() method.
   * Providers cannot be bound more than once.
   *
   * TODO: Handle circular dependencies
   * TODO: Handle factory functions
   *
   * @param provider the provider to bind
   * @param key the token the provider will be provided under
   *
   * @return a reference to the current Injector for method chaining
   */
  bind<T>(provider: Provider, key?: InjectorToken<any>): Injector {
    let token;
    let providerType = typeof provider;

    // Resolve the token to provide the service under
    if (providerType === 'function') {
      token = Reflect.getMetadata('di:token', provider);
      if (!token) throw new Error('Services must provide a token.');
    } else if (providerType === 'object') {
      token = key;
    } else {
      throw new Error('Invalid provider type; must be a service or an object.');
    }

    // Ensure a token was resolved
    if (!token) throw new Error('Cannot bind a provider without a token');

    // Make sure the provider has not already been registered
    if (this.providers.has(token)) throw new Error('Cannot have duplicate providers.');

    /*
     * Add the provider to the internal providers map. If the provider is a
     * service, resolve its dependencies and create an new instance.
     */
    if (providerType === 'function') {
      let providerDependencies = Reflect.getMetadata('design:paramtypes', provider) || [];
      let injections = providerDependencies.map(dependency => this.resolve<any>(dependency));
      let service = provider as Type<T>;
      this.providers.set(token, new service(...injections));
    } else {
      this.providers.set(token, provider);
    }

    return this;
  }
}
