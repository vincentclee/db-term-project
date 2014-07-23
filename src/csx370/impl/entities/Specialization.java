package csx370.impl.entities;

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