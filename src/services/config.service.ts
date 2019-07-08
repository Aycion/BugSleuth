/**
 * Format of config data.
 * 
 * This is the format of how config data is stored and sent between components.
 */
export interface ConfigDTO {
  /** User's email address for the 3rd party issue tracking service. */
  email: string;

  /** API Token for authentication. */
  apiToken: string;

  /** ID of the project being reviewed. */
  projectId: string;
}

export class ConfigService {
  private config: ConfigDTO;

  /**
   * Creates an empty ConfigService object.
   */
  constructor() {
    this.config = {
      email: null,
      apiToken: null,
      projectId: null
    };
  }

  /**
   * Gets the stored config data.
   */
  public getConfigData(): ConfigDTO {
    return this.config;
  }

  /**
   * Sets the stored config data.
   *
   * @param data the new configuration data
   */
  public setConfigData(data: ConfigDTO) {
    // todo sanitize input
    this.config = data;
  }
}
