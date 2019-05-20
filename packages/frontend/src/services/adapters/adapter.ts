/**
 * TODO
 */
export interface Adapter {

  /**
   * TODO
   * 
   * @param username 
   * @param password 
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
