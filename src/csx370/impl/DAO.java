package csx370.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * This is the data access object for the CSCI X370 term project. It performs the 
 * necessary database operations needed by the application.
 *
 * @author C.J. Bennett <mrbennett513@gmail.com>
 */
public class DAO
{
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // TODO
  // update to use real login info when available
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // db login info
  private final String DB_URL = "jdbc:mysql://localhost/db";
  private final String DB_USER = "user";
  private final String DB_PASS = "pass";

  private Connection conn;

  /**
   * Create a DAO using either the production DB or the test DB. The test DB is 
   * assumed to have the same name as the production with "test" concatenated onto 
   * the end, e.g. "hoorayDB" -> "hoorayDBtest".
   *
   * @param useProductionDB true to use the production database, false to use the test database
   */
  public DAO(boolean useProductionDB)
  {
    super();

    try 
    {
      // set up connection using either production or test database depending on parameter given
      Class.forName("com.mysql.jdbc.Driver");
      conn = DriverManager.getConnection((useProductionDB ? DB_URL : DB_URL.concat("test")), DB_USER, DB_PASS);
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating database connection: " + e.getMessage());
    }// catch
  }// ctor

  /**
   * Create a DAO using the production DB;
   */
  public DAO()
  {
    this(true);
  }// ctor

  /**
   * Create a new user account in the DB with the given details.
   *
   * @param username the unique username of the user
   * @param email the unique registration email of the user
   * @param displayName the non-unique display name of the user
   * @param specialization the user's specialization
   * @param password the user's password
   */
  public void createUserAccount(String username, String email, String displayName, String specialization, String password)
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check prepared statement for schema errors when they're made
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    try
    {
      PreparedStatement insertUser = this.conn.prepareStatement("INSERT INTO User(Username, Email, DisplayName, Specialization, Password) VALUES (?,?,?,?,?)");
      insertUser.setString(1, username);
      insertUser.setString(2, email);
      insertUser.setString(3, displayName);
      insertUser.setString(4, specialization);
      insertUser.setString(5, this.encryptString(password));
      
      insertUser.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating user account: " + e.getMessage());
    }// catch
  }// createUser

  /**
   * Create a new project in the DB with the given details.
   *
   * @param title
   * @param description
   * @param targetDate
   * @param managerID
   * @param status
   */
  public void createProject(String title, String description, String targetDate, int managerID, String status)
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check prepared statement for schema errors when they're made
    // check types for variables (particularly targetDate and managerID)
    // maybe use default value for status?
    // update parameter comments
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    try
    {
      PreparedStatement insertProject = this.conn.prepareStatement("INSERT INTO Project(Title, Description, TargetDate, Manager, Status) VALUES (?,?,?,?,?)");
      insertProject.setString(1, title);
      insertProject.setString(2, description);
      insertProject.setString(3, targetDate);
      insertProject.setInt(4, managerID);
      insertProject.setString(5, status);
      
      insertProject.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating project: " + e.getMessage());
    }// catch
  }// createProject

  /**
   * Create a new task in the DB with the given details.
   *
   * @param type
   * @param priority
   * @param projectID
   * @param hasDependency
   * @param deadline
   * @param title
   * @param notes
   * @param description
   * @param scope
   * @param status
   */
  public void createTask(String type, String priority, int projectID, boolean hasDependency, 
			 String deadline, String title, String notes, String description, 
			 String scope, String status)
  {
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check prepared statement for schema errors when they're made
    // check types for variables 
    // maybe use default value for status?
    // update parameter comments
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    try
    {
      PreparedStatement insertTask = this.conn.prepareStatement("INSERT INTO Task(Type, Priority, ProjectID, HasDependency, Deadline, Title, Notes, Description, Scope, Status) VALUES (?,?,?,?,?,?,?,?,?,?)");
      insertTask.setString(1, type);
      insertTask.setString(2, priority);
      insertTask.setInt(3, projectID);
      insertTask.setBoolean(4, hasDependency);
      insertTask.setString(5, deadline);
      insertTask.setString(6, title);
      insertTask.setString(7, notes);
      insertTask.setString(8, description);
      insertTask.setString(9, scope);
      insertTask.setString(10, status);
      
      insertTask.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating task: " + e.getMessage());
    }// catch
  }// createTask

  /**
   * Check the connection to the db.
   *
   * @returns true if db is still connected, false if otherwise
   */
  public boolean isConnected()
  {
    boolean returnVal = false;

    try
    {
      returnVal = this.conn.isValid(0);
    }// try
    catch(Exception e){}// catch

    return returnVal;
  }// isConnected

  /**
   * Close the connection to the db.
   */
  public void close()
  {
    try
    {
      this.conn.close();
    }// try
    catch(Exception e)
    {
      System.err.println("Error closing connection: " + e.getMessage());
    }// catch
  }// close
  
  /**
   * Remove all tuples from the DB by truncating each table.
   */
  public void resetDB()
  {
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // add all tables in the db to this 
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    try
    {
      this.conn.prepareStatement("TRUNCATE TABLE User").executeUpdate();
      this.conn.prepareStatement("TRUNCATE TABLE Project").executeUpdate();
      this.conn.prepareStatement("TRUNCATE TABLE Task").executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error resetting database: " + e.getMessage());
    }// catch
  }// resetDB

  // hashes the given string
  private String encryptString(String s)
  {
    return (new Integer(s.hashCode())).toString();
  }// encryptString
}// DAO