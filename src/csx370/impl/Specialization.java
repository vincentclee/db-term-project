package csx370.impl;

public enum Specialization
{
  TEST
  {
    public String toString()
    {
      return "Test";
    }
  },
    
  BACKEND
  {
    public String toString()
    {
      return "Backend";
    }
  },
   
  FRONTEND
  {
    public String toString()
    {
      return "Frontend";
    }
  },
    
  MANAGEMENT
  {
    public String toString()
    {
      return "Management";
    }
  }
}// Specialization