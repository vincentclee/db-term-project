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
   * If authentication is successful, a User object with data pertaining to the corresponding
   * user is returned. Returns null in the case of an unsuccessful login.
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
      PreparedStatement usernameAuthenticate = this.conn.prepareStatement("SELECT * FROM User WHERE UserName = (?) AND Password = UNHEX(SHA2(?))");
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
			rsUsername.getString("CookieID"));
      }// if
      else
      {
	// if username query does not return a row, try the email query
	PreparedStatement emailAuthenticate = this.conn.prepareStatement("SELECT * FROM User WHERE Email = (?) AND Password = UNHEX(SHA2(?))");
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
			  rsEmail.getString("CookieID"));
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
   * @param cookieID the user's cookieID
   * @param password the user's password
   * @return a user object containing all info about this user from the User table, or null if an error occured
   */
  public User createUser(String username, String email, String displayName, String cookieID, String password)
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
      PreparedStatement insertUser = this.conn.prepareStatement("INSERT INTO User(UserName, Email, DisplayName, CookieID, Password) VALUES (?,?,?,?,UNHEX(SHA2(?)))");
      insertUser.setString(1, username);
      insertUser.setString(2, email);
      insertUser.setString(3, displayName);
      insertUser.setString(4, cookieID);
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
      user = new User(userID, username, email, displayName, cookieID);
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating user account: " + e.getMessage());
    }// catch

    return user;
  }// createUser

  /**
   * Get info about the user identified by their id
   *
   * @param id the user's id
   * @return a user object containing information about the user or null if an error occured
   */  
  public User getUserByID(int userID)
  {
    // user object to return, will stay null if no user is found
    User user =  null;

    try
    {
      PreparedStatement selectUser = this.conn.prepareStatement("SELECT * FROM User WHERE UserID = (?)");
      selectUser.setInt(1, userID);

      ResultSet rs = selectUser.executeQuery();
      if(rs.next())
      {
	// if a user with the specified id exists, make the user object with its data
	user = new User(userID, 
			rs.getString("UserName"),
			rs.getString("Email"),
			rs.getString("DisplayName"),
			rs.getString("CookieID"));
      }// if
    }// try
    catch(Exception e)
    {
      System.err.println("Error retrieving user info: " + e.getMessage());
    }// catch

    return user;
  }// getUserByID

  /**
   * Get info about the user identified by their username
   *
   * @param username the user's username
   * @return a user object containing information about the user or null if an error occured
   */  
  public User getUserByUsername(String username)
  {
    // user object to return, will stay null if no user is found
    User user =  null;

    try
    {
      PreparedStatement selectUser = this.conn.prepareStatement("SELECT * FROM User WHERE UserName = (?)");
      selectUser.setString(1, username);

      ResultSet rs = selectUser.executeQuery();
      if(rs.next())
      {
	// if a user with the specified username exists, make the user object with its data
	user = new User(rs.getInt("UserID"), 
			username,
			rs.getString("Email"),
			rs.getString("DisplayName"),
			rs.getString("CookieID"));
      }// if
    }// try
    catch(Exception e)
    {
      System.err.println("Error retrieving user info: " + e.getMessage());
    }// catch

    return user;
  }// getUserByUsername

  /**
   * Get info about the user identified by their email
   *
   * @param email the user's email
   * @return a user object containing information about the user or null if an error occured
   */  
  public User getUserByEmail(String email)
  {
    // user object to return, will stay null if no user is found
    User user =  null;

    try
    {
      PreparedStatement selectUser = this.conn.prepareStatement("SELECT * FROM User WHERE Email = (?)");
      selectUser.setString(1, email);

      ResultSet rs = selectUser.executeQuery();
      if(rs.next())
      {
	// if a user with the specified email exists, make the user object with its data
	user = new User(rs.getInt("UserID"), 
			rs.getString("UserName"),
			email,
			rs.getString("DisplayName"),
			rs.getString("CookieID"));
      }// if
    }// try
    catch(Exception e)
    {
      System.err.println("Error retrieving user info: " + e.getMessage());
    }// catch

    return user;
  }// getUserByUsername

  /**
   * Update username for user identified by the given id. 
   *
   * @param userID the id identifying the user
   * @param username the user's new username
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateUsername(int userID, String username)
  {
    try
    {
      PreparedStatement updateUser = this.conn.prepareStatement("UPDATE User SET UserName = (?) WHERE UserID = (?)");
      updateUser.setString(1, username);
      updateUser.setInt(2, userID);

      updateUser.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating user info: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// updateUserName

  /**
   * Update email for user identified by the given id. 
   *
   * @param userID the id identifying the user
   * @param email the user's new email
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateUserEmail(int userID, String email)
  {
    try
    {
      PreparedStatement updateUser = this.conn.prepareStatement("UPDATE User SET Email = (?) WHERE UserID = (?)");
      updateUser.setString(1, email);
      updateUser.setInt(2, userID);

      updateUser.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating user info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateUserEmail

  /**
   * Update display name for user identified by the given id. 
   *
   * @param userID the id identifying the user
   * @param displayName the user's new display name
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateUserDisplayName(int userID, String displayName)
  {
    try
    {
      PreparedStatement updateUser = this.conn.prepareStatement("UPDATE User SET DisplayName = (?) WHERE UserID = (?)");
      updateUser.setString(1, displayName);
      updateUser.setInt(2, userID);

      updateUser.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating user info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateUserDisplayName

  /**
   * Update cookieID for user identified by the given id. 
   *
   * @param userID the id identifying the user
   * @param cookieID the user's new cookieID
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateUserCookieID(int userID, String cookieID)
  {
    try
    {
      PreparedStatement updateUser = this.conn.prepareStatement("UPDATE User SET CookieID = (?) WHERE UserID = (?)");
      updateUser.setString(1, cookieID);
      updateUser.setInt(2, userID);

      updateUser.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating user info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateUserCookieID

  /**
   * Update password for user identified by the given id. 
   *
   * @param userID the id identifying the user
   * @param password the user's new password
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateUserPassword(int userID, String password)
  {
    try
    {
      PreparedStatement updateUser = this.conn.prepareStatement("UPDATE User SET Password = UNHEX(SHA2(?)) WHERE UserID = (?)");
      updateUser.setString(1, password);
      updateUser.setInt(2, userID);

      updateUser.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating user info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateUserPassword

  /**
   * Delete the user identified by the given id from the db
   *
   * @param userID the id identifying the user
   * @return 0 for successful delete, -1 if an error occurred
   */
  public int deleteUser(int userID)
  {
    try
    {
      PreparedStatement deleteUser = this.conn.prepareStatement("DELETE FROM User WHERE UserID = (?)");
      deleteUser.setInt(1, userID);

      deleteUser.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error deleting user: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// deleteUser

  /**
   * Create a new project in the DB with the given details and return a Project 
   * object detailing the newly created project
   *
   * @param title
   * @param description
   * @param targetDate
   * @param managerID
   * @param status
   * @return a Project object containing all info about this project from the Project table or null if an error occured
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
      
      // create project object to return
      project = new Project(projectID, title, description, targetDate, managerID, status);
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating project: " + e.getMessage());
    }// catch
    
    return project;
  }// createProject

  /**
   * Retrieve from the db the project specified by the given id
   *
   * @param projectID the project's id
   * @return a Project object containing information about the project or null if an error occured
   */
  public Project getProject(int projectID)
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check types for variables
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // project object to return, will stay null if no project is found
    Project project =  null;

    try
    {
      PreparedStatement selectProject = this.conn.prepareStatement("SELECT * FROM Project WHERE ProjectID = (?)");
      selectProject.setInt(1, projectID);

      ResultSet rs = selectProject.executeQuery();
      if(rs.next())
      {
	// if a project with the specified id exists, make the project object with its data
	project = new Project(projectID, 
			      rs.getString("Title"),
			      rs.getString("Description"), 
			      rs.getString("TargetDate"),
			      rs.getInt("ManagerID"), 
			      rs.getString("Status"));

      }// if
    }// try
    catch(Exception e)
    {
      System.err.println("Error retrieving project info: " + e.getMessage());
    }// catch

    return project;
  }// getProject
  
  /**
   * Update the title of the project with the given id
   *
   * @param projectID the id of the project to update
   * @param title the new title of the project
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateProjectTitle(int projectID, String title)
  {
    try
    {
      PreparedStatement updateProject = this.conn.prepareStatement("UPDATE Project SET Title = (?) WHERE ProjectID = (?)");
      updateProject.setString(1, title);
      updateProject.setInt(2, projectID);

      updateProject.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating project info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateProjectTitle

  /**
   * Update the description of the project with the given id
   *
   * @param projectID the id of the project to update
   * @param description the new description of the project
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateProjectDescription(int projectID, String description)
  {
    try
    {
      PreparedStatement updateProject = this.conn.prepareStatement("UPDATE Project SET Description = (?) WHERE ProjectID = (?)");
      updateProject.setString(1, description);
      updateProject.setInt(2, projectID);

      updateProject.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating project info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateProjectDescription

  /**
   * Update the target date of the project with the given id
   *
   * @param projectID the id of the project to update
   * @param targetDate the new target date of the project
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateProjectTargetDate(int projectID, String targetDate)
  {
    try
    {
      PreparedStatement updateProject = this.conn.prepareStatement("UPDATE Project SET TargetDate = (?) WHERE ProjectID = (?)");
      updateProject.setString(1, targetDate);
      updateProject.setInt(2, projectID);

      updateProject.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating project info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateProjectTargetDate

  /**
   * Update the manager of the project with the given id
   *
   * @param projectID the id of the project to update
   * @param managerID the id of the new manager of the project
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateProjectManager(int projectID, int managerID)
  {
    try
    {
      PreparedStatement updateProject = this.conn.prepareStatement("UPDATE Project SET Manager = (?) WHERE ProjectID = (?)");
      updateProject.setInt(1, managerID);
      updateProject.setInt(2, projectID);

      updateProject.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating project info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateProjectManager

  /**
   * Update the status of the project with the given id
   *
   * @param projectID the id of the project to update
   * @param status the new status of the project
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateProjectStatus(int projectID, String status)
  {
    try
    {
      PreparedStatement updateProject = this.conn.prepareStatement("UPDATE Project SET Status = (?) WHERE ProjectID = (?)");
      updateProject.setString(1, status);
      updateProject.setInt(2, projectID);

      updateProject.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating project info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateProjectStatus

  /**
   * Delete the project with the given id
   *
   * @param projectID the id of the project to delete
   * @return 0 for successful delete, -1 if an error occurred
   */
  public int deleteProject(int projectID)
  {
    try
    {
      PreparedStatement deleteProject = this.conn.prepareStatement("DELETE FROM Project WHERE ProjectID = (?)");
      deleteProject.setInt(1, projectID);

      deleteProject.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error deleting project: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// deleteProject
  
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
   * @return a Task object containing all info about this task from the Task table or null if an error occured
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

      // create task object to return
      task = new Task(taskID, projectID, hasDependency, type, priority, deadline, title, notes, description, scope, status);
    }// try
    catch(Exception e)
    {
      System.err.println("Error creating task: " + e.getMessage());
    }// catch

    return task;
  }// createTask

  /**
   * Retrieve from the db the task specified by the given id
   *
   * @param taskID the task's id
   * @return a Task object containing information about the task or null if an error occured
   */
  public Task getTask(int taskID)
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check types for variables
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // task object to return, will stay null if no task is found
    Task task =  null;

    try
    {
      PreparedStatement selectTask = this.conn.prepareStatement("SELECT * FROM Task WHERE TaskID = (?)");
      selectTask.setInt(1, taskID);

      ResultSet rs = selectTask.executeQuery();
      if(rs.next())
      {
	// if a task with the specified id exists, make the task object with its data
	task = new Task(taskID, 
			rs.getInt("ProjectID"),
			rs.getBoolean("HasDependency"), 
			rs.getString("Type"), 
			rs.getString("Priority"),
			rs.getString("Deadline"), 
			rs.getString("Title"), 
			rs.getString("Notes"),
			rs.getString("Description"),
			rs.getString("Scope"), 
			rs.getString("Status"));

      }// if
    }// try
    catch(Exception e)
    {
      System.err.println("Error retrieving task info: " + e.getMessage());
    }// catch

    return task;
  }// getTask

  /**
   * Update the type of the task with the given id
   *
   * @param taskID the id of the task to update
   * @param type the new type of the task
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateTaskType(int taskID, String type)
  {
    try
    {
      PreparedStatement updateTask = this.conn.prepareStatement("UPDATE Task SET Type = (?) WHERE TaskID = (?)");
      updateTask.setString(1, type);
      updateTask.setInt(2, taskID);

      updateTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating task info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateTaskType

  /**
   * Update the priority of the task with the given id
   *
   * @param taskID the id of the task to update
   * @param priority the new priority of the task
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateTaskPriority(int taskID, String priority)
  {
    try
    {
      PreparedStatement updateTask = this.conn.prepareStatement("UPDATE Task SET Priority = (?) WHERE TaskID = (?)");
      updateTask.setString(1, priority);
      updateTask.setInt(2, taskID);

      updateTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating task info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateTaskPriority

  /**
   * Update the project that the task with the given id is linked to
   *
   * @param taskID the id of the task to update
   * @param projectID the id of the new project that the task is linked to
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateTaskProject(int taskID, int projectID)
  {
    try
    {
      PreparedStatement updateTask = this.conn.prepareStatement("UPDATE Task SET ProjectID = (?) WHERE TaskID = (?)");
      updateTask.setInt(1, projectID);
      updateTask.setInt(2, taskID);

      updateTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating task info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateTaskProject

  /**
   * Update whether the task with the given id has dependencies
   *
   * @param taskID the id of the task to update
   * @param hasDependency true if the task has a dependency, false if otherwise
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateTaskDependency(int taskID, boolean hasDependency)
  {
    try
    {
      PreparedStatement updateTask = this.conn.prepareStatement("UPDATE Task SET HasDependency = (?) WHERE TaskID = (?)");
      updateTask.setBoolean(1, hasDependency);
      updateTask.setInt(2, taskID);

      updateTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating task info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateTaskDependency

  /**
   * Update the deadline of the task with the given id
   *
   * @param taskID the id of the task to update
   * @param deadline the new deadline of the task
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateTaskDeadline(int taskID, String deadline)
  {
    try
    {
      PreparedStatement updateTask = this.conn.prepareStatement("UPDATE Task SET Deadline = (?) WHERE TaskID = (?)");
      updateTask.setString(1, deadline);
      updateTask.setInt(2, taskID);

      updateTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating task info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateTaskDeadline
 
  /**
   * Update the title of the task with the given id
   *
   * @param taskID the id of the task to update
   * @param title the new title of the task
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateTaskTitle(int taskID, String title)
  {
    try
    {
      PreparedStatement updateTask = this.conn.prepareStatement("UPDATE Task SET Title = (?) WHERE TaskID = (?)");
      updateTask.setString(1, title);
      updateTask.setInt(2, taskID);

      updateTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating task info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateTaskTitle

  /**
   * Update the notes of the task with the given id
   *
   * @param taskID the id of the task to update
   * @param notes the new notes of the task
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateTaskNotes(int taskID, String notes)
  {
    try
    {
      PreparedStatement updateTask = this.conn.prepareStatement("UPDATE Task SET Notes = (?) WHERE TaskID = (?)");
      updateTask.setString(1, notes);
      updateTask.setInt(2, taskID);

      updateTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating task info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateTaskNotes

  /**
   * Update the description of the task with the given id
   *
   * @param taskID the id of the task to update
   * @param description the new description of the task
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateTaskDescription(int taskID, String description)
  {
    try
    {
      PreparedStatement updateTask = this.conn.prepareStatement("UPDATE Task SET Description = (?) WHERE TaskID = (?)");
      updateTask.setString(1, description);
      updateTask.setInt(2, taskID);

      updateTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating task info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateTaskDescription

  /**
   * Update the scope of the task with the given id
   *
   * @param taskID the id of the task to update
   * @param scope the new scope of the task
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateTaskScope(int taskID, String scope)
  {
    try
    {
      PreparedStatement updateTask = this.conn.prepareStatement("UPDATE Task SET Scope = (?) WHERE TaskID = (?)");
      updateTask.setString(1, scope);
      updateTask.setInt(2, taskID);

      updateTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating task info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateTaskScope

  /**
   * Update the status of the task with the given id
   *
   * @param taskID the id of the task to update
   * @param status the new status of the task
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateTaskStatus(int taskID, String status)
  {
    try
    {
      PreparedStatement updateTask = this.conn.prepareStatement("UPDATE Task SET Status = (?) WHERE TaskID = (?)");
      updateTask.setString(1, status);
      updateTask.setInt(2, taskID);

      updateTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating task info: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// updateTaskStatus

  /**
   * Delete the task with the given id
   *
   * @param taskID the id of the task to delete
   * @return 0 for successful delete, -1 if an error occurred
   */
  public int deleteTask(int taskID)
  {
    try
    {
      PreparedStatement deleteTask = this.conn.prepareStatement("DELETE FROM Task WHERE TaskID = (?)");
      deleteTask.setInt(1, taskID);

      deleteTask.executeQuery();
    }// try
    catch(Exception e)
    {
      System.err.println("Error deleting task: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// deleteTask

  /**
   * Add a user to a task, indentified by their respective IDs.
   *
   * @param taskID the taskID to connect to the given userID
   * @param userID the userID to connect to the given taskID
   * @return 0 for successful addition, -1 if an error occurred
   */
  public int addUserToTask(int taskID, int userID)
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
      System.err.println("Error adding user to task: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// addUserToTask

  /**
   * Remove a user from a task, indentified by their respective IDs.
   *
   * @param taskID the taskID that the user with the given userID is to be removed from
   * @param userID the userID to be removed from the task with the given taskID
   * @return 0 for successful removal, -1 if an error occurred
   */
  public int removeUserFromTask(int taskID, int userID)
  {
    try
    {
      PreparedStatement removeUserTask = this.conn.prepareStatement("DELETE FROM UserTask WHERE TaskID = (?) AND UserID = (?)");
      removeUserTask.setInt(1, taskID);
      removeUserTask.setInt(2, userID);
      
      removeUserTask.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error removing user from task: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// removeUserFromTask

  /**
   * Connect a task and a project, indentified by their respective IDs.
   *
   * @param projectID the projectID to connect to the given taskID
   * @param taskID the taskID to connect to the given projectID
   * @return 0 for successful addition, -1 if an error occurred
   */
  public int addTaskToProject(int projectID, int taskID)
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
      System.err.println("Error adding task to project: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// addTaskToProject

  /**
   * Remove a task from a project, indentified by their respective IDs.
   *
   * @param projectID the projectID that the task with the given taskID is to be removed from
   * @param taskID the taskID to be removed from the project with the given projectID
   * @return 0 for successful removal, -1 if an error occurred
   */
  public int removeTaskFromProject(int projectID, int taskID)
  {
    try
    {
      PreparedStatement removeProjectTask = this.conn.prepareStatement("DELETE FROM ProjectTask WHERE ProjectID = (?) AND TaskID = (?)");
      removeProjectTask.setInt(1, projectID);
      removeProjectTask.setInt(2, taskID);
      
      removeProjectTask.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error removing task from project: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// removeTaskFromProject

  /**
   * Connect user and a project, indentified by their respective IDs.
   *
   * @param userID the userID to connect to the given projectID
   * @param projectID the projectID to connect to the given taskID
   * @param commits
   * @param contributions
   * @return 0 for successful addition, -1 if an error occurred
   */
  public int addUserToProject(int userID, int projectID, String commits, String specialization, String contributions)
  {
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // check prepared statement for schema errors when they're made
    // update parameter comments
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    try
    {
      PreparedStatement insertProjectUser = this.conn.prepareStatement("INSERT INTO ProjectUser(ProjectID, TaskID, Commits, Specialization, Contributions) VALUES (?,?,?,?,?)");
      insertProjectUser.setInt(1, projectID);
      insertProjectUser.setInt(2, userID);
      insertProjectUser.setString(3, commits);
      insertProjectUser.setString(4, specialization);
      insertProjectUser.setString(5, contributions);

      insertProjectUser.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error adding user to project: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// addUserToProject

  /**
   * Update the commits on the specified project made by the specified user
   *
   * @param projectID the id of the project
   * @param userID the id of the user
   * @param commits the new commits
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateCommits(int projectID, int userID, String commits)
  {
    try
    {
      PreparedStatement updateProjectUser = this.conn.prepareStatement("UPDATE ProjectUser SET Commits = (?) WHERE ProjectID = (?) AND UserID = (?)");
      updateProjectUser.setString(1, commits);
      updateProjectUser.setInt(2, projectID);
      updateProjectUser.setInt(3, userID);

      updateProjectUser.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating user project data: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// updateCommits

  /**
   * Update the given user's specialization on the specified project
   *
   * @param projectID the id of the project
   * @param userID the id of the user
   * @param specialization the user's new specialization
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateSpecialization(int projectID, int userID, String specialization)
  {
    try
    {
      PreparedStatement updateProjectUser = this.conn.prepareStatement("UPDATE ProjectUser SET Specialization = (?) WHERE ProjectID = (?) AND UserID = (?)");
      updateProjectUser.setString(1, specialization);
      updateProjectUser.setInt(2, projectID);
      updateProjectUser.setInt(3, userID);

      updateProjectUser.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating user project data: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// updateSpecialization

  /**
   * Update the contributions to the specified project made by the specified user
   *
   * @param projectID the id of the project
   * @param userID the id of the user
   * @param contributions the new contributions
   * @return 0 for successful update, -1 if an error occurred
   */
  public int updateContributions(int projectID, int userID, String contributions)
  {
    try
    {
      PreparedStatement updateProjectUser = this.conn.prepareStatement("UPDATE ProjectUser SET Contributions = (?) WHERE ProjectID = (?) AND UserID = (?)");
      updateProjectUser.setString(1, contributions);
      updateProjectUser.setInt(2, projectID);
      updateProjectUser.setInt(3, userID);

      updateProjectUser.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error updating user project data: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// updateContributions

  /**
   * Remove a user from a project, indentified by their respective IDs.
   *
   * @param projectID the projectID that the user with the given userID is to be removed from
   * @param userID the userID to be removed from the project with the given projectID
   * @return 0 for successful removal, -1 if an error occurred
   */
  public int removeUserFromProject(int projectID, int userID)
  {
    try
    {
      PreparedStatement removeProjectUser = this.conn.prepareStatement("DELETE FROM ProjectUser WHERE ProjectID = (?) AND UserID = (?)");
      removeProjectUser.setInt(1, projectID);
      removeProjectUser.setInt(2, userID);
      
      removeProjectUser.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error removing user from project: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// removeUserFromProject

  /**
   * Create a dependency between two tasks.  The main task is dependent on dependency task,
   * meaning the dependency task must be completed before the main task can be completed.
   *
   * @param mainTaskID the id of the main task
   * @param dependencyTaskID the id of the dependency task
   * @return 0 for successful addition, -1 if an error occurred
   */
  public int addTaskDependency(int mainTaskID, int dependencyTaskID)
  {
    try
    {
      PreparedStatement insertTaskDependencies = this.conn.prepareStatement("INSERT INTO TaskDependencies(TaskID, DependencyTask) VALUES (?,?)");
      insertTaskDependencies.setInt(1, mainTaskID);
      insertTaskDependencies.setInt(2, dependencyTaskID);

      insertTaskDependencies.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error adding task dependency: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// addTaskDependency

  /**
   * Remove a dependency between two tasks.  The main task is dependent on dependency task,
   * meaning the dependency task must be completed before the main task can be completed.
   *
   * @param mainTaskID the id of the main task
   * @param dependencyTaskID the id of the dependency task
   * @return 0 for successful removal, -1 if an error occurred
   */
  public int removeTaskDependency(int mainTaskID, int dependencyTaskID)
  {
    try
    {
      PreparedStatement deleteTaskDependencies = this.conn.prepareStatement("DELETE FROM TaskDependencies WHERE TaskID = (?) AND DependencyTask = (?)");
      deleteTaskDependencies.setInt(1, mainTaskID);
      deleteTaskDependencies.setInt(2, dependencyTaskID);

      deleteTaskDependencies.executeUpdate();
    }// try
    catch(Exception e)
    {
      System.err.println("Error removing task dependency: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// removeTaskDependency
 
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
   *
   * @return 0 for successful close, -1 if an error occurred
   */
  public int close()
  {
    try
    {
      this.conn.close();
    }// try
    catch(Exception e)
    {
      System.err.println("Error closing connection: " + e.getMessage());
      return -1;
    }// catch
    
    return 0;
  }// close
  
  /**
   * Remove all tuples from the DB by truncating each table.
   *
   * @return 0 for successful removal, -1 if an error occurred
   */
  public int resetDB()
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
      
this.conn.prepareStatement("TRUNCATE TABLE TaskDependencies").executeUpdate();
      
    }// try
    catch(Exception e)
    {
      System.err.println("Error resetting database: " + e.getMessage());
      return -1;
    }// catch

    return 0;
  }// resetDB
}// DAO