package csx370.impl;

import java.util.List;
import java.util.ArrayList;

/**
 * Container class holding lists of tasks separated by completeness
 */
public class TaskBoard
{
  private List<Task> completedTasks;
  private List<Task> inProgressTasks;
  private List<Task> waitingTasks;
  private List<Task> queuedTasks;
  private List<Task> blockedTasks;

  /**
   * Pre-separated lists
   *
   * @param completedTasks list of tasks that are completed
   * @param inProgressTasks list of tasks that are in progress
   * @param waitingTasks list of tasks that are not being worked on yet
   * @param queuedTasks list of tasks that are queued
   * @param blockedTasks list of blocked tasks
   */
  public TaskBoard(List<Task> completedTasks, List<Task> inProgressTasks, List<Task> waitingTasks,
		   List<Task> queuedTasks, List<Task> blockedTasks)
  {
    this.completedTasks = completedTasks;
    this.inProgressTasks = inProgressTasks;
    this.waitingTasks = waitingTasks;
    this.queuedTasks = queuedTasks;
    this.blockedTasks = blockedTasks;
  }// ctor

  /**
   * Takes a list of tasks and separates them into lists of completed, in progress, 
   * and waiting tasks.
   *
   * @param allTasks list of tasks to be separated
   */
  public TaskBoard(List<Task> allTasks)
  {
    this.completedTasks = new ArrayList<Task>();
    this.inProgressTasks = new ArrayList<Task>();
    this.waitingTasks = new ArrayList<Task>();
    this.queuedTasks = new ArrayList<Task>();
    this.blockedTasks = new ArrayList<Task>();

    // loop through list and separate out tasks
    for(Task task : allTasks)
    {
      switch(task.getStatus())
      {
        case "Complete":
	{
	  completedTasks.add(task);
	  break;
	}
	case "In Progress":
	{
	  inProgressTasks.add(task);
	  break;
	}
        case "Waiting":
	{
	  waitingTasks.add(task);
	}
        case "Queued":
	{
	  queuedTasks.add(task);
	}
        case "Blocked":
	{
	  blockedTasks.add(task);
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
   * @return list of inactive tasks
   */
  public List<Task> getWaitingTasks()
  {
    return this.waitingTasks;
  }// getWaitingTasks

  /**
   * @return list of queued tasks
   */
  public List<Task> getQueuedTasks()
  {
    return this.queuedTasks;
  }// getQueuedTasks

  /**
   * @return list of blocked tasks
   */
  public List<Task> blockedTasks()
  {
    return this.blockedTasks;
  }// getBlockedTasks
}// TaskBoard