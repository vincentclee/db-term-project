package csx370.impl;

/**
 * An entity object for tranferring data from the Project table to the application.
 */
public class Project
{
  private int projectID, manager;
  private String title, description, targetDate, status;

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // TODO
  // add parameter comments
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Create a Project object with the given info.
   *
   * @param projectID the primary key of the row containing this project's info
   * @param title
   * @param description
   * @param targetDate
   * @param manager
   * @param status
   */
  public Project(int projectID, String title, String description, String targetDate, 
		 int manager, String status)
  {
    super();

    this.projectID = projectID;
    this.title = title;
    this.description = description;
    this.targetDate = targetDate;
    this.manager = manager;
    this.status = status;
  }// ctor

  /**
   * @return the projectID
   */
  public int getProjectID() {
    return projectID;
  }

  /**
   * @return the manager
   */
  public int getManager() {
    return manager;
  }

  /**
   * @return the title
   */
  public String getTitle() {
    return title;
  }

  /**
   * @return the description
   */
  public String getDescription() {
    return description;
  }
  
  /**
   * @return the targetDate
   */
  public String getTargetDate() {
    return targetDate;
  }

  /**
   * @return the status
   */
  public String getStatus() {
    return status;
  }
}// Project