import { Adapter } from './adapter';
import { Service } from '../service';
import * as JiraClient from 'jira-connector';

@Service()
export default class JiraAdapter implements Adapter {

  public key: string = 'ADAPTER';
  private connector: JiraClient;

  constructor() {
    this.connector = null;
  }

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
