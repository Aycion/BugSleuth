import { Adapter } from './adapter';
import { Service } from '../service';

@Service()
export default class JiraAdapter implements Adapter {

  public key: string = 'ADAPTER';

  onInit() {
    /* TODO */
  }

  authenticate(username: string, password: string): void {
    throw new Error('Method not implemented.');
  }

  getIssues() {
    throw new Error('Method not implemented.');
  }

  submitIssueOnElement() {
    throw new Error('Method not implemented.');
  }

  submitIssueOnPage() {
    throw new Error('Method not implemented.');
  }


}
