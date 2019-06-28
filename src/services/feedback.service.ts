import { Adapter } from './adapters/adapter';
import { Service } from './service';

export class FeedbackService implements Service {
  key: string;
  protected adapter: Adapter;

  onInit() {
    throw new Error('Method not implemented.');
  }

  constructor() {
    /* TODO */
  }
}
