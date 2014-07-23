package csx370.impl.entities;

public enum TaskStatus
{
  QUEUED
  {
    public String toString()
    {
      return "Queued";
    }
  },
    
  IN_PROGRESS
  {
    public String toString()
    {
      return "In Progress";
    }
  },
   
  WAITING
  {
    public String toString()
    {
      return "Waiting";
    }
  },
    
  BLOCKED 
  {
    public String toString()
    {
      return "Blocked";
    }
  },

  COMPLETE 
  {
    public String toString()
    {
      return "Complete";
    }
  }
}// TaskStatus