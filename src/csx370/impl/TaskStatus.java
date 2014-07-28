package csx370.impl;

public enum TaskStatus
{
  BACKLOG
  {
    public String toString()
    {
      return "Backlog";
    }
  },
    
  IN_PROGRESS
  {
    public String toString()
    {
      return "In Progress";
    }
  },
   
  STARTED
  {
    public String toString()
    {
      return "Started";
    }
  },
    
  TESTING 
  {
    public String toString()
    {
      return "Testing";
    }
  },

  COMPLETE 
  {
    public String toString()
    {
      return "Complete";
    }
  },
    
  PEER_REVIEW
  {
    public String toString()
    {
      return "Peer Review";
    }
  }
}// TaskStatus