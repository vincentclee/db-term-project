package csx370.impl;

public enum Priority
{
  LOW
  {
    public String toString()
    {
      return "Low";
    }
  },
    
  NORMAL
  {
    public String toString()
    {
      return "Normal";
    }
  },
   
  HIGH
  {
    public String toString()
    {
      return "High";
    }
  },
    
  URGENT  
  {
    public String toString()
    {
      return "Urgent";
    }
  }
}// Priority