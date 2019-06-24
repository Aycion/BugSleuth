import { Service } from '../service';
/**
 * TODO
 */
export interface Adapter extends Service {

  /**
   * TODO
   *
   * @param username            The username for the specific service
   * @param password            The password in plaintext
   */
  authenticate(username: string, password: string): void;

  /**
   * TODO
   */
  getIssues();

  /**
   * TODO
   */
  submitIssueOnElement();

  /**
   * TODO
   */
  submitIssueOnPage();
  // TODO
}
