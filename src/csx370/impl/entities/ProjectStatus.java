package csx370.impl.entities;

public enum ProjectStatus
{
  STARTED
  {
    public String toString()
    {
      return "Started";
    }
  },
    
  NOT_STARTED
  {
    public String toString()
    {
      return "Not Started";
    }
  },
   
  FINISHED
  {
    public String toString()
    {
      return "Finished";
    }
  },
    
  IN_PROGRESS
  {
    public String toString()
    {
      return "In Progress";
    }
  }
}// ProjectStatus