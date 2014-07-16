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
   * Authenticate user login. The first argument can be either the username or email.
   * If authentication is successful, an User object with data pertaining to the corresponding
   * user is return. Returns null in the case of an unsuccessful login.
   *
   * @param usernameOrEmail either the username or email given by the user
   * @param password the password given by the user
   * @return User object with user's details upon success, null upon failed attempt
   */
  public User authenticate(String usernameOrEmail, String password)
  {
    // user object to return. if no match is found in the db, this will not change.
    User user = null;

    try
    {
      PreparedStatement usernameAuthenticate = this.conn.prepareStatement("SELECT * FROM User WHERE UserName = (?) AND Password = UNHEX(SHA1(?))");
      usernameAuthenticate.setString(1, usernameOrEmail);
      usernameAuthenticate.setString(2, password);
      
      ResultSet rsUsername = usernameAuthenticate.executeQuery();
      
      if(rsUsername.next())
      {
	// if username query returns a row, then use it
	user = new User(rsUsername.getInt("UserID"), 
			usernameOrEmail,
			rsUsername.getString("Email"), 
			rsUsername.getString("DisplayName"),
			rsUsername.getString("Specialization"));
      }// if
      else
      {
	// if username query does not return a row, try the email query
	PreparedStatement emailAuthenticate = this.conn.prepareStatement("SELECT * FROM User WHERE Email = (?) AND Password = UNHEX(SHA1(?))");
	emailAuthenticate.setString(1, usernameOrEmail);
	emailAuthenticate.setString(2, password);
	
	ResultSet rsEmail = emailAuthenticate.executeQuery();
	
	// if email query returns a row, then use it. otherwise, function will return null
	if(rsEmail.next())
	{
	  user = new User(rsEmail.getInt("UserID"), 
			  rsEmail.getString("UserName"), 
			  usernameOrEmail,
			  rsEmail.getString("DisplayName"),
			  rsEmail.getString("Specialization"));
	}// if
      }// else
    }// try
    catch(Exception e)
    {
      System.err.println("Error authenticating user: " + e.getMessage());
    }// catch

    return user;
  }// authenticate
  
  /**
   * Create a new user account in the DB with the given details and return a User
   * object detailing the newly created user
   *
   * @param username the unique username of the user
   * @param email the unique registration email of the user
   * @param displayName the non-unique display name of the user
   * @param specialization the user's specialization
   * @param password the user's password
   * @return a user object containing all info about this user from the User table
   */
  public User createUser(String username, String email, String displayName, String specialization, String password)
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check prepared statement for schema errors when they're made
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // user object to return
    User user =  null;

    try
    {
      // insert info into db
      PreparedStatement insertUser = this.conn.prepareStatement("INSERT INTO User(UserName, Email, DisplayName, Specialization, Password) VALUES (?,?,?,?,UNHEX(SHA1(?)))");
      insertUser.setString(1, username);
      insertUser.setString(2, email);
      insertUser.setString(3, displayName);
      insertUser.setString(4, specialization);
      insertUser.setString(5, password);
      
      insertUser.executeUpdate();

      // get userID from freshly inserted row
      int userID;
      PreparedStatement selectUser = this.conn.prepareStatement("SELECT UserID FROM User WHERE UserName = (?)");
      selectUser.setString(1, username);

      ResultSet rs = selectUser.executeQuery();
      rs.next();
      userID = rs.getInt("UserID");
      
      // create user object to return
      user = new User(userID, username, email, displayName, specialization);
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating user account: " + e.getMessage());
    }// catch

    return user;
  }// createUser

  /**
   * Create a new project in the DB with the given details and return a Project 
   * object detailing the newly created project
   *
   * @param title
   * @param description
   * @param targetDate
   * @param managerID
   * @param status
   * @return a Project object containing all info about this project from the Project table
   */
  public Project createProject(String title, String description, String targetDate, int managerID, String status)
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check prepared statement for schema errors when they're made
    // check types for variables (particularly targetDate and managerID)
    // maybe use default value for status?
    // update parameter comments
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // project object to return
    Project project = null;
    
    try
    {
      // insert info into db
      PreparedStatement insertProject = this.conn.prepareStatement("INSERT INTO Project(Title, Description, TargetDate, Manager, Status) VALUES (?,?,?,?,?)");
      insertProject.setString(1, title);
      insertProject.setString(2, description);
      insertProject.setString(3, targetDate);
      insertProject.setInt(4, managerID);
      insertProject.setString(5, status);
      
      insertProject.executeUpdate();

      // get projectID from freshly inserted row
      int projectID;
      PreparedStatement selectProject = this.conn.prepareStatement("SELECT ProjectID FROM Project WHERE Title = (?) AND Description = (?) AND TargetDate = (?) AND Manager = (?) AND Status = (?)");
      selectProject.setString(1, title);
      selectProject.setString(2, description);
      selectProject.setString(3, targetDate);
      selectProject.setInt(4, managerID);
      selectProject.setString(5, status);

      ResultSet rs = selectProject.executeQuery();
      rs.next();
      projectID = rs.getInt("ProjectID");
      
      // create prject object to return
      project = new Project(projectID, title, description, targetDate, managerID, status);
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating project: " + e.getMessage());
    }// catch
    
    return project;
  }// createProject

  /**
   * Create a new task in the DB with the given details and return a Task object
   * detailing the newly created task
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
   * @return a Task object containing all info about this task from the Task table
   */
  public Task createTask(String type, String priority, int projectID, boolean hasDependency, 
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
    
    // task object to return
    Task task = null;
    
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

      // get taskID from freshly inserted row
      int taskID;
      PreparedStatement selectTask = this.conn.prepareStatement("SELECT TaskID FROM Task WHERE Type = (?) AND Priority = (?) AND ProjectID = (?) AND HasDependency = (?) AND Deadline = (?) AND Title = (?) AND Notes = (?) AND Description = (?) AND Scope = (?) AND Status = (?)");
      selectTask.setString(1, type);
      selectTask.setString(2, priority);
      selectTask.setInt(3, projectID);
      selectTask.setBoolean(4, hasDependency);
      selectTask.setString(5, deadline);
      selectTask.setString(6, title);
      selectTask.setString(7, notes);
      selectTask.setString(8, description);
      selectTask.setString(9, scope);
      selectTask.setString(10, status);

      ResultSet rs = selectTask.executeQuery();
      rs.next();
      taskID = rs.getInt("TaskID");

      // create prject object to return
      task = new Task(taskID, projectID, hasDependency, type, priority, deadline, title, notes, description, scope, status);
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating task: " + e.getMessage());
    }// catch

    return task;
  }// createTask

  /**
   * Connect a user and a task, indentified by their respective IDs.
   *
   * @param taskID the taskID to connect to the given userID
   * @param userID the userID to connect to the given taskID
   */
  public void createUserTask(int taskID, int userID)
  {
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check prepared statement for schema errors when they're made
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    try
    {
      PreparedStatement insertUserTask = this.conn.prepareStatement("INSERT INTO UserTask(TaskID, UserID) VALUES (?,?)");
      insertUserTask.setInt(1, taskID);
      insertUserTask.setInt(2, userID);

      insertUserTask.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating usertask: " + e.getMessage());
    }// catch
  }// createUserTask

  /**
   * Connect a task and a project, indentified by their respective IDs.
   *
   * @param projectID the projectID to connect to the given taskID
   * @param taskID the taskID to connect to the given projectID
   */
  public void createProjectTask(int projectID, int taskID)
  {
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check prepared statement for schema errors when they're made
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    try
    {
      PreparedStatement insertProjectTask = this.conn.prepareStatement("INSERT INTO ProjectTask(ProjectID, TaskID) VALUES (?,?)");
      insertProjectTask.setInt(1, projectID);
      insertProjectTask.setInt(2, taskID);

      insertProjectTask.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating projecttask: " + e.getMessage());
    }// catch
  }// createProjectTask

  /**
   * Connect user and a project, indentified by their respective IDs.
   *
   * @param userID the userID to connect to the given projectID
   * @param projectID the projectID to connect to the given taskID
   * @param commits
   * @param contributions
   */
  public void createProjectUser(int userID, int projectID, String commits, String contributions)
  {
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check prepared statement for schema errors when they're made
    // update parameter comments
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    try
    {
      PreparedStatement insertProjectUser = this.conn.prepareStatement("INSERT INTO ProjectUser(ProjectID, TaskID, Commits, Contributions) VALUES (?,?,?,?)");
      insertProjectUser.setInt(1, projectID);
      insertProjectUser.setInt(2, userID);
      insertProjectUser.setString(3, commits);
      insertProjectUser.setString(4, contributions);

      insertProjectUser.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating projectuser: " + e.getMessage());
    }// catch
  }// createProjectUser

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
      this.conn.prepareStatement("TRUNCATE TABLE ProjectTask").executeUpdate();
      this.conn.prepareStatement("TRUNCATE TABLE UserTask").executeUpdate();
      this.conn.prepareStatement("TRUNCATE TABLE ProjectUser").executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error resetting database: " + e.getMessage());
    }// catch
  }// resetDB
}// DAO