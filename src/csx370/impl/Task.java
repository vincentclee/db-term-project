package csx370.impl;

import java.sql.Timestamp;

/**
 * An entity object for tranferring data from the Task table to the application.
 */
public class Task
{
  private int taskID;
  private boolean hasDependency;
  private String priority, title, notes, description, scope, status;
  private Timestamp deadline;
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // TODO
  // add parameter comments
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Create a Task object with the given info.
   *
   * @param taskID 
   * @param hasDependency
   * @param priority
   * @param deadline
   * @param title
   * @param notes
   * @param description
   * @param scope
   * @param status
   */
  public Task(int taskID, boolean hasDependency,
	      Priority priority, Timestamp deadline, String title, String notes,
	      String description, String scope, TaskStatus status) 
  {
    super();
    
    this.taskID = taskID;
    this.hasDependency = hasDependency;
    this.priority = priority.toString();
    this.deadline = deadline;
    this.title = title;
    this.notes = notes;
    this.description = description;
    this.scope = scope;
    this.status = status.toString();
  }// ctor

  /**
   * @return the taskID
   */
  public int getTaskID() {
    return taskID;
  }

  /**
   * @return the hasDependency
   */
  public boolean hasDependency() {
    return hasDependency;
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
  public Timestamp getDeadline() {
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