package csx370.impl;

import java.util.List;
import java.util.ArrayList;

/**
 * Container class holding lists of tasks separated by development status
 */
public class TaskBoard
{
  private List<Task> completedTasks;
  private List<Task> inProgressTasks;
  private List<Task> backlogTasks;
  private List<Task> startedTasks;
  private List<Task> testingTasks;
  private List<Task> peerReviewTasks;

  /**
   * Takes a list of tasks and separates them into lists of all types.
   *
   * @param allTasks list of tasks to be separated
   */
  public TaskBoard(List<Task> allTasks)
  {
    this.completedTasks = new ArrayList<Task>();
    this.inProgressTasks = new ArrayList<Task>();
    this.backlogTasks = new ArrayList<Task>();
    this.startedTasks = new ArrayList<Task>();
    this.testingTasks = new ArrayList<Task>();
    this.peerReviewTasks = new ArrayList<Task>();
    
    // loop through list and separate out tasks
    for(Task task : allTasks)
    {
      switch(task.getStatus())
      {
        case "Complete":
	{
	  this.completedTasks.add(task);
	  break;
	}
	case "In Progress":
	{
	  this.inProgressTasks.add(task);
	  break;
	}
        case "Backlog":
	{
	  this.backlogTasks.add(task);
	  break;
	}
        case "Started":
	{
	  this.startedTasks.add(task);
	  break;
	}
        case "Testing":
	{
	  this.testingTasks.add(task);
	  break;
	}
	case "Peer Review":
	{
	  this.peerReviewTasks.add(task);
	  break;
	}
      }// switch
    }// for
  }// ctor

  /**
   * @return list of completed tasks
   */
  public List<Task> getCompletedTasks()
  {
    return this.completedTasks;
  }// getCompletedTasks

  /**
   * @return list of tasks in progress
   */
  public List<Task> getInProgressTasks()
  {
    return this.inProgressTasks;
  }// getInProgressTasks

  /**
   * @return list of backlogged tasks
   */
  public List<Task> getBacklogTasks()
  {
    return this.backlogTasks;
  }// getBacklogTasks

  /**
   * @return list of started tasks
   */
  public List<Task> getStartedTasks()
  {
    return this.startedTasks;
  }// getStartedTasks

  /**
   * @return list of tasks in testing
   */
  public List<Task> getTestingTasks()
  {
    return this.testingTasks;
  }// getTestingTasks

  /**
   * @return list of tasks in peer review
   */
  public List<Task> getPeerReviewTasks()
  {
    return this.peerReviewTasks;
  }// getPeerReviewTasks
}// TaskBoard