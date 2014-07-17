package csx370.impl;

/**
 * An entity object for tranferring data from the Task table to the application.
 */
public class Task
{
  private int taskID, projectID;
  private boolean hasDependency;
  private String type, priority, deadline, title, notes, description, scope, status;
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // TODO
  // add parameter comments
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Create a Task object with the given info.
   *
   * @param taskID 
   * @param projectID
   * @param hasDependency
   * @param type
   * @param priority
   * @param deadline
   * @param title
   * @param notes
   * @param description
   * @param scope
   * @param status
   */
  public Task(int taskID, int projectID, boolean hasDependency, String type,
	      String priority, String deadline, String title, String notes,
	      String description, String scope, String status) 
  {
    super();
    
    this.taskID = taskID;
    this.projectID = projectID;
    this.hasDependency = hasDependency;
    this.type = type;
    this.priority = priority;
    this.deadline = deadline;
    this.title = title;
    this.notes = notes;
    this.description = description;
    this.scope = scope;
    this.status = status;
  }// ctor

  /**
   * @return the taskID
   */
  public int getTaskID() {
    return taskID;
  }

  /**
   * @return the projectID
   */
  public int getProjectID() {
    return projectID;
  }

  /**
   * @return the hasDependency
   */
  public boolean hasDependency() {
    return hasDependency;
  }

  /**
   * @return the type
   */
  public String getType() {
    return type;
  }

  /**
   * @return the priority
   */
  public String getPriority() {
    return priority;
  }

  /**
   * @return the deadline
   */
  public String getDeadline() {
    return deadline;
  }

  /**
   * @return the title
   */
  public String getTitle() {
    return title;
  }

  /**
   * @return the notes
   */
  public String getNotes() {
    return notes;
  }

  /**
   * @return the description
   */
  public String getDescription() {
    return description;
  }

  /**
   * @return the scope
   */
  public String getScope() {
    return scope;
  }
 
  /**
   * @return the status
   */
  public String getStatus() {
    return status;
  }
}// Task