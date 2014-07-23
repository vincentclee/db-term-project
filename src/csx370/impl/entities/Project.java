package csx370.impl.entities;

import java.sql.Date;

/**
 * An entity object for tranferring data from the Project table to the application.
 */
public class Project
{
  private int projectID, manager;
  private String title, description, status;
  private Date startDate, targetDate;

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
   * @param startDate
   * @param targetDate
   * @param manager
   * @param status
   */
  public Project(int projectID, String title, String description, Date startDate, Date targetDate, 
		 int manager, ProjectStatus status)
  {
    super();

    this.projectID = projectID;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.targetDate = targetDate;
    this.manager = manager;
    this.status = status.toString();
  }// ctor

  /**
   * Check if two Project objects contain the same info.
   *
   * @param other the Project to compare against this one
   * @return true if the project objects contain the same info, false if otherwise
   */
  public boolean equals(Project other)
  {
    if(other == null)
    {
      return false;
    }// if

    return (this.projectID == other.projectID && this.title.equals(other.title) &&
	    this.description.equals(other.description) && 
	    this.manager == other.manager && this.status.equals(other.status));
  }// equals

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
   * @return the startDate
   */
  public Date getStartDate() {
    return startDate;
  }
  
  /**
   * @return the targetDate
   */
  public Date getTargetDate() {
    return targetDate;
  }

  /**
   * @return the status
   */
  public String getStatus() {
    return status;
  }
}// Project