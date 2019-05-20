import { Adapter } from './adapter';

export default class JiraAdapter implements Adapter {

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
