package csx370.impl.dao;

import java.util.List;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.sql.Date;

import javax.servlet.http.Cookie;

import csx370.impl.entities.Priority;
import csx370.impl.entities.Project;
import csx370.impl.entities.ProjectStatus;
import csx370.impl.entities.Specialization;
import csx370.impl.entities.Task;
import csx370.impl.entities.TaskBoard;
import csx370.impl.entities.TaskStatus;
import csx370.impl.entities.User;
import csx370.impl.util.CookieUtil;

/**
 * This is the data access object for the CSCI X370 term project. It performs
 * the necessary database operations needed by the application.
 *
 * @author C.J. Bennett <mrbennett513@gmail.com>
 */
public class DAO {

	private Connection conn;

	/**
	 * Create a DAO using the provided target and loginc specifications, using
	 * the dependency class DAOTarget to allow for dynamic definition.
	 * 
	 * @param DAOTarget
	 *            The target to connect the DAO to.
	 */
	public DAO(DAOTarget target) {

		try {
			// set up connection using DAOTarget
			Class.forName(DAOQueries.JDBC_DRIVER);
			conn = DriverManager.getConnection(target.getTarget(),
					target.getUser(), target.getPass());
		}// try
		catch (Exception e) {
			System.err.println("Error creating database connection: "
					+ e.getMessage());
		}// catch
	}// ctor

	/**
	 * Authenticate user login. The first argument is the user's username. If
	 * authentication is successful, a User object with data pertaining to the
	 * corresponding user is returned. Returns null in the case of an
	 * unsuccessful login.
	 *
	 * @param username
	 *            the username given by the user
	 * @param password
	 *            the password given by the user
	 * @return User object with user's details upon success, null upon failed
	 *         attempt
	 */
	public User authenticate(String username, String password) {
		// user object to return
		User user = null;

		try {
			PreparedStatement usernameAuthenticate = this.conn
					.prepareStatement(DAOQueries.AUTHENTICATE_USER);
			usernameAuthenticate.setString(1, username);
			usernameAuthenticate.setString(2, password);

			ResultSet rsUsername = usernameAuthenticate.executeQuery();

			// if username query returns a row, then use it. otherwise, function
			// will return null
			if (rsUsername.next()) {
				Cookie cookie;

				// make new cookie and make sure it's not already in the db
				ResultSet rsCopyCheck;
				do {
					cookie = CookieUtil.generateCookie();

					PreparedStatement copyCheck = this.conn
							.prepareStatement(DAOQueries.SELECT_BY_COOKIEID);
					copyCheck.setString(1, cookie.getValue());

					rsCopyCheck = copyCheck.executeQuery();
				} while (rsCopyCheck.next());

				// insert new cookie into db
				PreparedStatement insertCookie = this.conn
						.prepareStatement(DAOQueries.UPDATE_BY_COOKIEID);
				insertCookie.setString(1, cookie.getValue());
				insertCookie.setInt(2,
						rsUsername.getInt(DAOColumns.USER_USERID));

				insertCookie.executeUpdate();

				user = new User(rsUsername.getInt(DAOColumns.USER_USERID),
						username, rsUsername.getString(DAOColumns.USER_EMAIL),
						rsUsername.getString(DAOColumns.USER_DISPLAY_NAME),
						cookie.getValue());
			}// if
		}// try
		catch (Exception e) {
			System.err.println("Error authenticating user: " + e.getMessage());
			user = null;
		}// catch

		return user;
	}// authenticate

	/**
	 * Create a new user account in the DB with the given details and return a
	 * User object detailing the newly created user
	 *
	 * @param username
	 *            the unique username of the user
	 * @param email
	 *            the unique registration email of the user
	 * @param displayName
	 *            the non-unique display name of the user
	 * @param cookieID
	 *            the user's cookieID
	 * @param password
	 *            the user's password
	 * @return a user object containing all info about this user from the User
	 *         table, or null if an error occured
	 */
	public User createUser(String username, String email, String displayName,
			String cookieID, String password) {
		// user object to return
		User user = null;

		try {
			// insert info into db
			PreparedStatement insertUser = this.conn.prepareStatement(
					DAOQueries.CREATE_USER,
					PreparedStatement.RETURN_GENERATED_KEYS);
			insertUser.setString(1, username);
			insertUser.setString(2, email);
			insertUser.setString(3, displayName);
			insertUser.setString(4, cookieID);
			insertUser.setString(5, password);

			insertUser.executeUpdate();

			// get userID from freshly inserted row
			ResultSet rs = insertUser.getGeneratedKeys();
			rs.next();
			int userID = rs.getInt(1);

			// create user object to return
			user = new User(userID, username, email, displayName, cookieID);
		}// try
		catch (Exception e) {
			System.err
					.println("Error creating user account: " + e.getMessage());
			user = null;
		}// catch

		return user;
	}// createUser

	/**
	 * Get info about the user identified by their id
	 *
	 * @param userID
	 *            the user's id
	 * @return a user object containing information about the user or null if an
	 *         error occured. if the query returns no users, an object with a
	 *         userID of -1 will be returned.
	 */
	public User getUserByID(int userID) {
		return getUserBy(Integer.valueOf(userID), Integer.class);
	}// getUserByID

	/**
	 * Get info about the user identified by their username
	 *
	 * @param username
	 *            the user's username
	 * @return a user object containing information about the user or null if an
	 *         error occured. if the query returns no users, an object with a
	 *         userID of -1 will be returned.
	 */
	public User getUserByUsername(String username) {
		return getUserBy(username, String.class);
	}// getUserByUsername

	/**
	 * Get info about the user identified by their email
	 *
	 * @param email
	 *            the user's email
	 * @return a user object containing information about the user or null if an
	 *         error occured. if the query returns no users, an object with a
	 *         userID of -1 will be returned.
	 */
	public User getUserByEmail(String email) {
		return getUserBy(email, String.class);
	}// getUserByEmail

	/**
	 * Get info about the user identified by their cookieID
	 *
	 * @param cookieID
	 *            the user's cookieID
	 * @return a user object containing information about the user or null if an
	 *         error occured. if the query returns no users, an object with a
	 *         userID of -1 will be returned.
	 */
	public User getUserByCookieID(String cookieID) {
		return getUserBy(cookieID, String.class);
	}// getUserByCookieID

	private User getUserBy(Object searchParameter, Class parameterType) {

		// user object to return
		User user = null;

		try {
			PreparedStatement selectUser = this.conn
					.prepareStatement(DAOQueries.GET_USER);

			if (parameterType == String.class) {
				selectUser.setString(1, (String) searchParameter);
			} else if (parameterType == Integer.class) {
				selectUser.setInt(1, (Integer) searchParameter);
			}

			ResultSet rs = selectUser.executeQuery();
			if (rs.next()) {
				// if a user with the specified username exists, make the user
				// object with its data
				user = new User(rs.getInt(DAOColumns.USER_USERID),
						rs.getString(DAOColumns.USER_USERNAME),
						rs.getString(DAOColumns.USER_EMAIL),
						rs.getString(DAOColumns.USER_DISPLAY_NAME),
						rs.getString(DAOColumns.USER_COOKIEID));
			}// if
			else {
				user = new User(-1, "", "", "", "");
			}// else
		}// try
		catch (Exception e) {
			System.err.println("Error retrieving user info: " + e.getMessage());
			user = null;
		}// catch

		return user;
	}

	/**
	 * Retrieve a list of tasks associated with the user with the given id for
	 * the specified project
	 *
	 * @param userID
	 *            the id of the user
	 * @param projectID
	 *            the id of the project
	 * @return a list of tasks associated with the specified user for the
	 *         specified project
	 */
	public List<Task> getUserTasksForProjectByID(int userID, int projectID) {
		return getUserTasksForProject(projectID, Integer.valueOf(userID),
				Integer.class);
	}// getUserTasksForProjectByID

	/**
	 * Retrieve a list of tasks associated with the user with the given cookieid
	 * for the specified project
	 *
	 * @param cookieID
	 *            the id of the user
	 * @param projectID
	 *            the id of the project
	 * @return a list of tasks associated with the specified user for the
	 *         specified project
	 */
	public List<Task> getUserTasksForProjectByCookieID(String cookieID,
			int projectID) {
		return getUserTasksForProject(projectID, cookieID, String.class);
	}// getUserTasksForProjectByCookieID

	private List<Task> getUserTasksForProject(int projectID,
			Object searchParameter, Class parameterType) {

		List<Task> taskList = null;

		try {
			PreparedStatement selectTasks = this.conn
					.prepareStatement(DAOQueries.GET_USER_TASK);

			selectTasks.setInt(2, projectID);

			if (parameterType == String.class) {
				selectTasks.setString(1, (String) searchParameter);
			} else if (parameterType == Integer.class) {
				selectTasks.setInt(1, (Integer) searchParameter);
			}

			ResultSet rs = selectTasks.executeQuery();

			// iterate through returned items and add to list
			taskList = new ArrayList<Task>();
			while (rs.next()) {
				taskList.add(new Task(
						rs.getInt(DAOColumns.TASK_TASKID),
						rs.getBoolean(DAOColumns.TASK_HAS_DEPENDENCY),
						stringToPriority(rs.getString(DAOColumns.TASK_PRIORITY)),
						rs.getTimestamp(DAOColumns.TASK_DEADLINE),
						rs.getString(DAOColumns.TASK_TITLE),
						rs.getString(DAOColumns.TASK_NOTES),
						rs.getString(DAOColumns.TASK_DESCRIPTION),
						rs.getString(DAOColumns.TASK_SCOPE),
						stringToTaskStatus(rs.getString(DAOColumns.TASK_STATUS))));
			}// while
		}// try
		catch (Exception e) {
			System.err
					.println("Error retrieving user tasks: " + e.getMessage());
			taskList = null;
		}// catch

		return taskList;
	}

	/**
	 * Update username for user identified by the given id.
	 *
	 * @param userID
	 *            the id identifying the user
	 * @param username
	 *            the user's new username
	 * @return returns true if successfully updated
	 */
	public boolean updateUsername(int userID, String username) {
		return updateUser(userID, DAOColumns.USER_USERID, username);
	}// updateUserName

	/**
	 * Update email for user identified by the given id.
	 *
	 * @param userID
	 *            the id identifying the user
	 * @param email
	 *            the user's new email
	 * @return returns true if successfully updated
	 */
	public boolean updateUserEmail(int userID, String email) {
		return updateUser(userID, DAOColumns.USER_EMAIL, email);
	}// updateUserEmail

	/**
	 * Update display name for user identified by the given id.
	 *
	 * @param userID
	 *            the id identifying the user
	 * @param displayName
	 *            the user's new display name
	 * @return returns true if successfully updated
	 */
	public boolean updateUserDisplayName(int userID, String displayName) {
		return updateUser(userID, DAOColumns.USER_DISPLAY_NAME, displayName);
	}// updateUserDisplayName

	/**
	 * Update cookieID for user identified by the given id.
	 *
	 * @param userID
	 *            the id identifying the user
	 * @param cookieID
	 *            the user's new cookieID
	 * @return returns true if successfully updated
	 */
	public boolean updateUserCookieID(int userID, String cookieID) {
		return updateUser(userID, DAOColumns.USER_COOKIEID, cookieID);
	}// updateUserCookieID

	/**
	 * Update password for user identified by the given id.
	 *
	 * @param userID
	 *            the id identifying the user
	 * @param password
	 *            the user's new password
	 * @return returns true if successfully updated
	 */
	public boolean updateUserPassword(int userID, String password) {
		return updateUser(userID, DAOColumns.USER_PASSWORD, password);
	}// updateUserPassword

	private boolean updateUser(int userID, String columnName, String updateValue) {
		try {
			PreparedStatement updateUser = this.conn
					.prepareStatement("UPDATE User SET Password = SHA2((?), 256) WHERE UserID = (?)");

			updateUser.setString(1, columnName);
			updateUser.setString(2, updateValue);
			updateUser.setInt(3, userID);

			if (columnName == DAOColumns.USER_PASSWORD) {
				updateUser.setString(2, "SHA2(" + updateValue + ", 256)");
			}

			updateUser.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating user info: " + e.getMessage());
			return false;
		}// catch

		return true;
	}

	/**
	 * Get a list of all projects the given user is associated with
	 *
	 * @param userID
	 *            the id of the user whose list of projects you want
	 * @return a list of the projects the user is associated with, or null upon
	 *         failure
	 */
	public List<Project> getProjectsByUserID(int userID) {
		return getProjectsBy(Integer.valueOf(userID), Integer.class);
	}// getProjectsByUserID

	/**
	 * Get a list of all projects associated with the given cookieID
	 *
	 * @param cookieID
	 *            the cookieid of the user whose list of projects you want
	 * @return a list of the projects the user is associated with, or null upon
	 *         failure
	 */
	public List<Project> getProjectsByCookieID(String cookieID) {
		return getProjectsBy(cookieID, String.class);
	}// getProjectsByCookieID

	private List<Project> getProjectsBy(Object searchParameter,
			Class parameterType) {

		List<Project> projectList = null;

		try {
			PreparedStatement selectProjects = this.conn
					.prepareStatement(DAOQueries.GET_PROJECT_BY);

			if (parameterType == String.class) {
				selectProjects.setString(1, (String) searchParameter);
			}
			if (parameterType == Integer.class) {
				selectProjects.setInt(1, (Integer) searchParameter);
			}

			ResultSet rs = selectProjects.executeQuery();

			// iterate through returned items and add to list
			projectList = new ArrayList<Project>();
			while (rs.next()) {
				projectList.add(new Project(rs
						.getInt(DAOColumns.PROJECT_PROJECTID), rs
						.getString(DAOColumns.PROJECT_TITLE), rs
						.getString(DAOColumns.PROJECT_DESCRIPTION), rs
						.getDate(DAOColumns.PROJECT_START_DATE), rs
						.getDate(DAOColumns.PROJECT_TARGET_DATE), rs
						.getInt(DAOColumns.PROJECT_MANAGER),
						stringToProjectStatus(rs
								.getString(DAOColumns.PROJECT_STATUS))));
			}// while
		}// try
		catch (Exception e) {
			System.err.println("Error retrieving user projects: "
					+ e.getMessage());
			projectList = null;
		}// catch

		return projectList;

	}

	/**
	 * Delete the user identified by the given id from the db
	 *
	 * @param userID
	 *            the id identifying the user
	 * @return returns true if successfully deleted
	 */
	public boolean deleteUser(int userID) {
		try {
			PreparedStatement deleteUser = this.conn
					.prepareStatement(DAOQueries.DELETE_USER);
			deleteUser.setInt(1, userID);

			deleteUser.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error deleting user: " + e.getMessage());
			return false;
		}// catch

		return true;
	}// deleteUser

	/**
	 * Create a new project in the DB with the given details and return a
	 * Project object detailing the newly created project
	 *
	 * @param title
	 *            The title of the project to be created
	 * @param description
	 *            A description of the project
	 * @param startDate
	 *            When the project is slated to start
	 * @param targetDate
	 *            When the project is expected to end
	 * @param managerID
	 *            The ID of the manager in charge
	 * @param status
	 *            The status of the project at creation
	 * @return a Project object containing all info about this project from the
	 *         Project table or null if an error occured.
	 */
	public Project createProject(String title, String description,
			Date startDate, Date targetDate, int managerID, ProjectStatus status) {

		// project object to return
		Project project = null;

		try {
			// insert info into db
			PreparedStatement insertProject = this.conn.prepareStatement(
					DAOQueries.CREATE_PROJECT,
					PreparedStatement.RETURN_GENERATED_KEYS);
			insertProject.setString(1, title);
			insertProject.setString(2, description);
			insertProject.setDate(3, startDate);
			insertProject.setDate(4, targetDate);
			insertProject.setInt(5, managerID);
			insertProject.setString(6, status.toString());

			insertProject.executeUpdate();

			// get projectID from freshly inserted row
			ResultSet rs = insertProject.getGeneratedKeys();
			rs.next();
			int projectID = rs.getInt(1);

			// create project object to return
			project = new Project(projectID, title, description, startDate,
					targetDate, managerID, status);
		}// try
		catch (Exception e) {
			System.err.println("Error creating project: " + e.getMessage());
			project = null;
		}// catch

		return project;
	}// createProject

	/**
	 * Retrieve from the db the project specified by the given id
	 *
	 * @param projectID
	 *            the project's id
	 * @return a Project object containing information about the project or null
	 *         if an error occured. if the query returns no projects, an object
	 *         with a projectID of -1 will be returned.
	 */
	public Project getProject(int projectID) {
		// project object to return, will stay null if no project is found
		Project project = null;

		try {
			PreparedStatement selectProject = this.conn
					.prepareStatement(DAOQueries.GET_PROJECT);
			selectProject.setInt(1, projectID);

			ResultSet rs = selectProject.executeQuery();
			if (rs.next()) {
				// if a project with the specified id exists, make the project
				// object with its data
				project = new Project(rs.getInt(DAOColumns.PROJECT_PROJECTID),
						rs.getString(DAOColumns.PROJECT_TITLE),
						rs.getString(DAOColumns.PROJECT_DESCRIPTION),
						rs.getDate(DAOColumns.PROJECT_START_DATE),
						rs.getDate(DAOColumns.PROJECT_TARGET_DATE),
						rs.getInt(DAOColumns.PROJECT_MANAGER),
						stringToProjectStatus(rs
								.getString(DAOColumns.PROJECT_STATUS)));
			}// if
			else {
				project = new Project(-1, "", "", null, null, -1,
						ProjectStatus.NOT_STARTED);
			}// else
		}// try
		catch (Exception e) {
			System.err.println("Error retrieving project info: "
					+ e.getMessage());
			project = null;
		}// catch

		return project;
	}// getProject

	/**
	 * Update the title of the project with the given id
	 *
	 * @param projectID
	 *            the id of the project to update
	 * @param title
	 *            the new title of the project
	 * @return returns true if successfully updated
	 */
	public boolean updateProjectTitle(int projectID, String title) {
		return updateProject(projectID, title, String.class);
	}// updateProjectTitle

	/**
	 * Update the description of the project with the given id
	 *
	 * @param projectID
	 *            the id of the project to update
	 * @param description
	 *            the new description of the project
	 * @return returns true if successfully updated
	 */
	public boolean updateProjectDescription(int projectID, String description) {
		return updateProject(projectID, description, String.class);
	}// updateProjectDescription

	/**
	 * Update the start date of the project with the given id
	 *
	 * @param projectID
	 *            the id of the project to update
	 * @param startDate
	 *            the new start date of the project
	 * @return returns true if successfully updated
	 */
	public boolean updateProjectStartDate(int projectID, Date startDate) {
		return updateProject(projectID, startDate, Date.class);
	}// updateProjectStartDate

	/**
	 * Update the target date of the project with the given id
	 *
	 * @param projectID
	 *            the id of the project to update
	 * @param targetDate
	 *            the new target date of the project
	 * @return returns true if successfully updated
	 */
	public boolean updateProjectTargetDate(int projectID, Date targetDate) {
		return updateProject(projectID, targetDate, Date.class);
	}// updateProjectTargetDate

	/**
	 * Update the manager of the project with the given id
	 *
	 * @param projectID
	 *            the id of the project to update
	 * @param managerID
	 *            the id of the new manager of the project
	 * @return returns true if successfully updated
	 */
	public boolean updateProjectManager(int projectID, int managerID) {
		return updateProject(projectID, Integer.valueOf(managerID), Integer.class);
	}// updateProjectManager

	/**
	 * Update the status of the project with the given id
	 *
	 * @param projectID
	 *            the id of the project to update
	 * @param status
	 *            the new status of the project
	 * @return returns true if successfully updated
	 */
	public boolean updateProjectStatus(int projectID, ProjectStatus status) {
		return updateProject(projectID, status, ProjectStatus.class);
	}// updateProjectStatus

	private boolean updateProject(int projectID, Object queryParameter, Class parameterType) {
		try {
			PreparedStatement updateProject = this.conn
					.prepareStatement(DAOQueries.UPDATE_PROJECT);
			
			if (parameterType == String.class) {
				updateProject.setString(1, (String) queryParameter);
			} else if (parameterType == Integer.class) {
				updateProject.setInt(1, (Integer) queryParameter);
			} else if (parameterType == Date.class) {
				updateProject.setDate(1, (Date) queryParameter);
			} else if (parameterType == ProjectStatus.class) {
				updateProject.setString(1, ((ProjectStatus) queryParameter).toString());
			}
			
			updateProject.setInt(2, projectID);

			updateProject.executeUpdate();
		}// try
		catch (Exception e) {
			System.err
					.println("Error updating project info: " + e.getMessage());
			return false;
		}// catch

		return true;
	}
	
	/**
	 * Delete the project with the given id
	 *
	 * @param projectID
	 *            the id of the project to delete
	 * @return 0 for successful delete, -1 if an error occurred
	 */
	public int deleteProject(int projectID) {
		try {
			PreparedStatement deleteProject = this.conn
					.prepareStatement("DELETE FROM Project WHERE ProjectID = (?)");
			deleteProject.setInt(1, projectID);

			deleteProject.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error deleting project: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// deleteProject

	/**
	 * Create a new task in the DB with the given details and return a Task
	 * object detailing the newly created task
	 *
	 * @param priority
	 * @param hasDependency
	 * @param deadline
	 * @param title
	 * @param notes
	 * @param description
	 * @param scope
	 * @param status
	 * @return a Task object containing all info about this task from the Task
	 *         table or null if an error occured
	 */
	public Task createTask(Priority priority, boolean hasDependency,
			Timestamp deadline, String title, String notes, String description,
			String scope, TaskStatus status) {
		// ///////////////////////////////////////////////////////////////////////////////////////////////////
		// TODO
		// update parameter comments
		// //////////////////////////////////////////////////////////////////////////////////////////////////

		// task object to return
		Task task = null;

		try {
			PreparedStatement insertTask = this.conn
					.prepareStatement(
							"INSERT INTO Task(Priority, HasDependency, Deadline, Title, Notes, Description, Scope, Status) VALUES (?,?,?,?,?,?,?,?)",
							PreparedStatement.RETURN_GENERATED_KEYS);
			insertTask.setString(1, priority.toString());
			insertTask.setBoolean(2, hasDependency);
			insertTask.setTimestamp(3, deadline);
			insertTask.setString(4, title);
			insertTask.setString(5, notes);
			insertTask.setString(6, description);
			insertTask.setString(7, scope);
			insertTask.setString(8, status.toString());

			insertTask.executeUpdate();

			// get taskID from freshly inserted row
			ResultSet rs = insertTask.getGeneratedKeys();
			rs.next();
			int taskID = rs.getInt(1);

			// create task object to return
			task = new Task(taskID, hasDependency, priority, deadline, title,
					notes, description, scope, status);
		}// try
		catch (Exception e) {
			System.err.println("Error creating task: " + e.getMessage());
			task = null;
		}// catch

		return task;
	}// createTask

	/**
	 * Retrieve from the db the task specified by the given id
	 *
	 * @param taskID
	 *            the task's id
	 * @return a Task object containing information about the task or null if an
	 *         error occured. if the query returns no tasks, an object with a
	 *         taskID of -1 will be returned.
	 */
	public Task getTask(int taskID) {
		// task object to return, will stay null if no task is found
		Task task = null;

		try {
			PreparedStatement selectTask = this.conn
					.prepareStatement("SELECT * FROM Task WHERE TaskID = (?)");
			selectTask.setInt(1, taskID);

			ResultSet rs = selectTask.executeQuery();
			if (rs.next()) {
				// if a task with the specified id exists, make the task object
				// with its data
				task = new Task(taskID, rs.getBoolean("HasDependency"),
						stringToPriority(rs.getString("Priority")),
						rs.getTimestamp("Deadline"), rs.getString("Title"),
						rs.getString("Notes"), rs.getString("Description"),
						rs.getString("Scope"),
						stringToTaskStatus(rs.getString("Status")));

			}// if
			else {
				task = new Task(-1, false, Priority.LOW, null, "", "", "", "",
						TaskStatus.BLOCKED);
			}// else
		}// try
		catch (Exception e) {
			System.err.println("Error retrieving task info: " + e.getMessage());
			task = null;
		}// catch

		return task;
	}// getTask

	/**
	 * Retrieve all tasks associated with the specified project
	 *
	 * @param projectID
	 *            the id of the project whose tasks you want
	 * @return a list of tasks associated with the given project
	 */
	public List<Task> getTasksForProject(int projectID) {
		List<Task> taskList = null;

		try {
			PreparedStatement selectTasks = this.conn
					.prepareStatement("SELECT * FROM (ProjectTask NATURAL JOIN Task) WHERE ProjectID = (?)");
			selectTasks.setInt(1, projectID);

			ResultSet rs = selectTasks.executeQuery();

			// iterate through returned items and add to list
			taskList = new ArrayList<Task>();
			while (rs.next()) {
				taskList.add(new Task(rs.getInt("TaskID"), rs
						.getBoolean("HasDependency"), stringToPriority(rs
						.getString("Priority")), rs.getTimestamp("Deadline"),
						rs.getString("Title"), rs.getString("Notes"), rs
								.getString("Description"), rs
								.getString("Scope"), stringToTaskStatus(rs
								.getString("Status"))));
			}// while
		}// try
		catch (Exception e) {
			System.err.println("Error retrieving project tasks: "
					+ e.getMessage());
			taskList = null;
		}// catch

		return taskList;
	}// getTasksForProject

	/**
	 * Returns the task board of the user with the given cookieID for the
	 * specified project
	 *
	 * @param cookieID
	 *            the cookieID of the user
	 * @param projectID
	 *            the id of the project
	 * @return the task board of the user with the given cookieID for the
	 *         specified project
	 */
	public TaskBoard getProjectTaskBoard(String cookieID, int projectID) {
		return new TaskBoard(this.getUserTasksForProjectByCookieID(cookieID,
				projectID));
	}// getProjectTaskBoard

	/**
	 * Update the priority of the task with the given id
	 *
	 * @param taskID
	 *            the id of the task to update
	 * @param priority
	 *            the new priority of the task
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateTaskPriority(int taskID, Priority priority) {
		try {
			PreparedStatement updateTask = this.conn
					.prepareStatement("UPDATE Task SET Priority = (?) WHERE TaskID = (?)");
			updateTask.setString(1, priority.toString());
			updateTask.setInt(2, taskID);

			updateTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating task info: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateTaskPriority

	/**
	 * Update whether the task with the given id has dependencies
	 *
	 * @param taskID
	 *            the id of the task to update
	 * @param hasDependency
	 *            true if the task has a dependency, false if otherwise
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateTaskDependency(int taskID, boolean hasDependency) {
		try {
			PreparedStatement updateTask = this.conn
					.prepareStatement("UPDATE Task SET HasDependency = (?) WHERE TaskID = (?)");
			updateTask.setBoolean(1, hasDependency);
			updateTask.setInt(2, taskID);

			updateTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating task info: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateTaskDependency

	/**
	 * Update the deadline of the task with the given id
	 *
	 * @param taskID
	 *            the id of the task to update
	 * @param deadline
	 *            the new deadline of the task
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateTaskDeadline(int taskID, Timestamp deadline) {
		try {
			PreparedStatement updateTask = this.conn
					.prepareStatement("UPDATE Task SET Deadline = (?) WHERE TaskID = (?)");
			updateTask.setTimestamp(1, deadline);
			updateTask.setInt(2, taskID);

			updateTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating task info: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateTaskDeadline

	/**
	 * Update the title of the task with the given id
	 *
	 * @param taskID
	 *            the id of the task to update
	 * @param title
	 *            the new title of the task
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateTaskTitle(int taskID, String title) {
		try {
			PreparedStatement updateTask = this.conn
					.prepareStatement("UPDATE Task SET Title = (?) WHERE TaskID = (?)");
			updateTask.setString(1, title);
			updateTask.setInt(2, taskID);

			updateTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating task info: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateTaskTitle

	/**
	 * Update the notes of the task with the given id
	 *
	 * @param taskID
	 *            the id of the task to update
	 * @param notes
	 *            the new notes of the task
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateTaskNotes(int taskID, String notes) {
		try {
			PreparedStatement updateTask = this.conn
					.prepareStatement("UPDATE Task SET Notes = (?) WHERE TaskID = (?)");
			updateTask.setString(1, notes);
			updateTask.setInt(2, taskID);

			updateTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating task info: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateTaskNotes

	/**
	 * Update the description of the task with the given id
	 *
	 * @param taskID
	 *            the id of the task to update
	 * @param description
	 *            the new description of the task
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateTaskDescription(int taskID, String description) {
		try {
			PreparedStatement updateTask = this.conn
					.prepareStatement("UPDATE Task SET Description = (?) WHERE TaskID = (?)");
			updateTask.setString(1, description);
			updateTask.setInt(2, taskID);

			updateTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating task info: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateTaskDescription

	/**
	 * Update the scope of the task with the given id
	 *
	 * @param taskID
	 *            the id of the task to update
	 * @param scope
	 *            the new scope of the task
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateTaskScope(int taskID, String scope) {
		try {
			PreparedStatement updateTask = this.conn
					.prepareStatement("UPDATE Task SET Scope = (?) WHERE TaskID = (?)");
			updateTask.setString(1, scope);
			updateTask.setInt(2, taskID);

			updateTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating task info: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateTaskScope

	/**
	 * Update the status of the task with the given id
	 *
	 * @param taskID
	 *            the id of the task to update
	 * @param status
	 *            the new status of the task
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateTaskStatus(int taskID, TaskStatus status) {
		try {
			PreparedStatement updateTask = this.conn
					.prepareStatement("UPDATE Task SET Status = (?) WHERE TaskID = (?)");
			updateTask.setString(1, status.toString());
			updateTask.setInt(2, taskID);

			updateTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating task info: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateTaskStatus

	/**
	 * Delete the task with the given id
	 *
	 * @param taskID
	 *            the id of the task to delete
	 * @return 0 for successful delete, -1 if an error occurred
	 */
	public int deleteTask(int taskID) {
		try {
			PreparedStatement deleteTask = this.conn
					.prepareStatement("DELETE FROM Task WHERE TaskID = (?)");
			deleteTask.setInt(1, taskID);

			deleteTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error deleting task: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// deleteTask

	/**
	 * Add a user to a task, indentified by their respective IDs.
	 *
	 * @param taskID
	 *            the taskID to connect to the given userID
	 * @param userID
	 *            the userID to connect to the given taskID
	 * @return 0 for successful addition, -1 if an error occurred
	 */
	public int addUserToTask(int taskID, int userID) {
		try {
			PreparedStatement insertUserTask = this.conn
					.prepareStatement("INSERT INTO UserTask(TaskID, UserID) VALUES (?,?)");
			insertUserTask.setInt(1, taskID);
			insertUserTask.setInt(2, userID);

			insertUserTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error adding user to task: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// addUserToTask

	/**
	 * Remove a user from a task, indentified by their respective IDs.
	 *
	 * @param taskID
	 *            the taskID that the user with the given userID is to be
	 *            removed from
	 * @param userID
	 *            the userID to be removed from the task with the given taskID
	 * @return 0 for successful removal, -1 if an error occurred
	 */
	public int removeUserFromTask(int taskID, int userID) {
		try {
			PreparedStatement removeUserTask = this.conn
					.prepareStatement("DELETE FROM UserTask WHERE TaskID = (?) AND UserID = (?)");
			removeUserTask.setInt(1, taskID);
			removeUserTask.setInt(2, userID);

			removeUserTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error removing user from task: "
					+ e.getMessage());
			return -1;
		}// catch

		return 0;
	}// removeUserFromTask

	/**
	 * Connect a task and a project, indentified by their respective IDs.
	 *
	 * @param projectID
	 *            the projectID to connect to the given taskID
	 * @param taskID
	 *            the taskID to connect to the given projectID
	 * @return 0 for successful addition, -1 if an error occurred
	 */
	public int addTaskToProject(int projectID, int taskID) {
		try {
			PreparedStatement insertProjectTask = this.conn
					.prepareStatement("INSERT INTO ProjectTask(ProjectID, TaskID) VALUES (?,?)");
			insertProjectTask.setInt(1, projectID);
			insertProjectTask.setInt(2, taskID);

			insertProjectTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error adding task to project: "
					+ e.getMessage());
			return -1;
		}// catch

		return 0;
	}// addTaskToProject

	/**
	 * Remove a task from a project, indentified by their respective IDs.
	 *
	 * @param projectID
	 *            the projectID that the task with the given taskID is to be
	 *            removed from
	 * @param taskID
	 *            the taskID to be removed from the project with the given
	 *            projectID
	 * @return 0 for successful removal, -1 if an error occurred
	 */
	public int removeTaskFromProject(int projectID, int taskID) {
		try {
			PreparedStatement removeProjectTask = this.conn
					.prepareStatement("DELETE FROM ProjectTask WHERE ProjectID = (?) AND TaskID = (?)");
			removeProjectTask.setInt(1, projectID);
			removeProjectTask.setInt(2, taskID);

			removeProjectTask.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error removing task from project: "
					+ e.getMessage());
			return -1;
		}// catch

		return 0;
	}// removeTaskFromProject

	/**
	 * Connect user and a project, indentified by their respective IDs.
	 *
	 * @param userID
	 *            the userID to connect to the given projectID
	 * @param projectID
	 *            the projectID to connect to the given taskID
	 * @param commits
	 * @param specialization
	 * @param contributions
	 * @return 0 for successful addition, -1 if an error occurred
	 */
	public int addUserToProject(int userID, int projectID, String commits,
			Specialization specialization, String contributions) {
		// ///////////////////////////////////////////////////////////////////////////////////////////////////
		// TODO
		// update parameter comments
		// //////////////////////////////////////////////////////////////////////////////////////////////////

		try {
			PreparedStatement insertProjectUser = this.conn
					.prepareStatement("INSERT INTO ProjectUser(ProjectID, UserID, Commits, Specialization, Contributions) VALUES (?,?,?,?,?)");
			insertProjectUser.setInt(1, projectID);
			insertProjectUser.setInt(2, userID);
			insertProjectUser.setString(3, commits);
			insertProjectUser.setString(4, specialization.toString());
			insertProjectUser.setString(5, contributions);

			insertProjectUser.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error adding user to project: "
					+ e.getMessage());
			return -1;
		}// catch

		return 0;
	}// addUserToProject

	/**
	 * Retrive the commits on the specified project made by the specified user
	 *
	 * @param projectID
	 *            the id of the project
	 * @param userID
	 *            the id of the user
	 * @return the users commits for this project or null if there was an error.
	 *         returns "-1" if the project/user combo does not exist.
	 */
	public String getCommits(int projectID, int userID) {
		String commits = null;

		try {
			PreparedStatement selectProjectUser = this.conn
					.prepareStatement("SELECT * FROM ProjectUser WHERE ProjectID = (?) AND UserID = (?)");
			selectProjectUser.setInt(1, projectID);
			selectProjectUser.setInt(2, userID);

			ResultSet rs = selectProjectUser.executeQuery();
			if (rs.next()) {
				commits = rs.getString("Commits");
			}// if
			else {
				commits = "-1";
			}//

		}// try
		catch (Exception e) {
			System.err.println("Error retrieving user project data: "
					+ e.getMessage());
			commits = null;
		}// catch

		return commits;
	}// getCommits

	/**
	 * Retrive the specialization on the specified project of the specified user
	 *
	 * @param projectID
	 *            the id of the project
	 * @param userID
	 *            the id of the user
	 * @return the users specialization for this project or null if there was an
	 *         error. returns "-1" if the project/user combo does not exist.
	 */
	public String getSpecialization(int projectID, int userID) {
		String specialization = null;

		try {
			PreparedStatement selectProjectUser = this.conn
					.prepareStatement("SELECT * FROM ProjectUser WHERE ProjectID = (?) AND UserID = (?)");
			selectProjectUser.setInt(1, projectID);
			selectProjectUser.setInt(2, userID);

			ResultSet rs = selectProjectUser.executeQuery();
			if (rs.next()) {
				specialization = rs.getString("Specialization");
			}// if
			else {
				specialization = "-1";
			}//

		}// try
		catch (Exception e) {
			System.err.println("Error retrieving user project data: "
					+ e.getMessage());
			specialization = null;
		}// catch

		return specialization;
	}// getSpecialization

	/**
	 * Retrive the contributions on the specified project made by the specified
	 * user
	 *
	 * @param projectID
	 *            the id of the project
	 * @param userID
	 *            the id of the user
	 * @return the users contributions for this project or null if there was an
	 *         error. returns "-1" if the project/user combo does not exist.
	 */
	public String getContributions(int projectID, int userID) {
		String contributions = null;

		try {
			PreparedStatement selectProjectUser = this.conn
					.prepareStatement("SELECT * FROM ProjectUser WHERE ProjectID = (?) AND UserID = (?)");
			selectProjectUser.setInt(1, projectID);
			selectProjectUser.setInt(2, userID);

			ResultSet rs = selectProjectUser.executeQuery();
			if (rs.next()) {
				contributions = rs.getString("Contributions");
			}// if
			else {
				contributions = "-1";
			}//

		}// try
		catch (Exception e) {
			System.err.println("Error retrieving user project data: "
					+ e.getMessage());
			contributions = null;
		}// catch

		return contributions;
	}// getContributions

	/**
	 * Update the commits on the specified project made by the specified user
	 *
	 * @param projectID
	 *            the id of the project
	 * @param userID
	 *            the id of the user
	 * @param commits
	 *            the new commits
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateCommits(int projectID, int userID, String commits) {
		try {
			PreparedStatement updateProjectUser = this.conn
					.prepareStatement("UPDATE ProjectUser SET Commits = (?) WHERE ProjectID = (?) AND UserID = (?)");
			updateProjectUser.setString(1, commits);
			updateProjectUser.setInt(2, projectID);
			updateProjectUser.setInt(3, userID);

			updateProjectUser.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating user project data: "
					+ e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateCommits

	/**
	 * Update the given user's specialization on the specified project
	 *
	 * @param projectID
	 *            the id of the project
	 * @param userID
	 *            the id of the user
	 * @param specialization
	 *            the user's new specialization
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateSpecialization(int projectID, int userID,
			Specialization specialization) {
		try {
			PreparedStatement updateProjectUser = this.conn
					.prepareStatement("UPDATE ProjectUser SET Specialization = (?) WHERE ProjectID = (?) AND UserID = (?)");
			updateProjectUser.setString(1, specialization.toString());
			updateProjectUser.setInt(2, projectID);
			updateProjectUser.setInt(3, userID);

			updateProjectUser.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating user project data: "
					+ e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateSpecialization

	/**
	 * Update the contributions to the specified project made by the specified
	 * user
	 *
	 * @param projectID
	 *            the id of the project
	 * @param userID
	 *            the id of the user
	 * @param contributions
	 *            the new contributions
	 * @return 0 for successful update, -1 if an error occurred
	 */
	public int updateContributions(int projectID, int userID,
			String contributions) {
		try {
			PreparedStatement updateProjectUser = this.conn
					.prepareStatement("UPDATE ProjectUser SET Contributions = (?) WHERE ProjectID = (?) AND UserID = (?)");
			updateProjectUser.setString(1, contributions);
			updateProjectUser.setInt(2, projectID);
			updateProjectUser.setInt(3, userID);

			updateProjectUser.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error updating user project data: "
					+ e.getMessage());
			return -1;
		}// catch

		return 0;
	}// updateContributions

	/**
	 * Remove a user from a project, indentified by their respective IDs.
	 *
	 * @param projectID
	 *            the projectID that the user with the given userID is to be
	 *            removed from
	 * @param userID
	 *            the userID to be removed from the project with the given
	 *            projectID
	 * @return 0 for successful removal, -1 if an error occurred
	 */
	public int removeUserFromProject(int projectID, int userID) {
		try {
			PreparedStatement removeProjectUser = this.conn
					.prepareStatement("DELETE FROM ProjectUser WHERE ProjectID = (?) AND UserID = (?)");
			removeProjectUser.setInt(1, projectID);
			removeProjectUser.setInt(2, userID);

			removeProjectUser.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error removing user from project: "
					+ e.getMessage());
			return -1;
		}// catch

		return 0;
	}// removeUserFromProject

	/**
	 * Create a dependency between two tasks. The dependent task is dependent on
	 * the main task, meaning the main task must be completed before the
	 * dependent task can be completed.
	 *
	 * @param mainTaskID
	 *            the id of the main task
	 * @param dependentTaskID
	 *            the id of the dependency task
	 * @return 0 for successful addition, -1 if an error occurred
	 */
	public int addTaskDependency(int mainTaskID, int dependentTaskID) {
		try {
			PreparedStatement insertTaskDependencies = this.conn
					.prepareStatement("INSERT INTO TaskDependencies(TaskID, DependentTask) VALUES (?,?)");
			insertTaskDependencies.setInt(1, mainTaskID);
			insertTaskDependencies.setInt(2, dependentTaskID);

			insertTaskDependencies.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error adding task dependency: "
					+ e.getMessage());
			return -1;
		}// catch

		return 0;
	}// addTaskDependency

	/**
	 * Get a list of dependent tasks waiting directly on the given task. This
	 * does not include transitive dependencies.
	 *
	 * @param taskID
	 *            the id of the task whose dependencies you want
	 * @return the list of dependent tasks waiting on the given task or null if
	 *         an error occurred.
	 */
	public List<Task> getDependentTasks(int taskID) {
		List<Task> taskList = null;

		try {
			PreparedStatement selectTasks = this.conn
					.prepareStatement("SELECT * FROM TaskDependencies WHERE TaskID = (?)");
			selectTasks.setInt(1, taskID);

			ResultSet rs = selectTasks.executeQuery();

			taskList = new ArrayList<Task>();

			// iterate through returned items and add to list
			while (rs.next()) {
				taskList.add(this.getTask(rs.getInt("DependentTask")));
			}// while
		}// try
		catch (Exception e) {
			System.err.println("Error retrieving dependent tasks: "
					+ e.getMessage());
			taskList = null;
		}// catch

		return taskList;
	}// getDependentTasks

	/**
	 * Get a list of tasks that the given task is directly dependent on. This
	 * does not include transitive dependencies.
	 *
	 * @param taskID
	 *            the id of the task being blocked
	 * @return the list of tasks the given task is waiting on or null if an
	 *         error occurred
	 */
	public List<Task> getBlockingTasks(int dependentTaskID) {
		List<Task> taskList = null;

		try {
			PreparedStatement selectTasks = this.conn
					.prepareStatement("SELECT * FROM TaskDependencies WHERE DependentTask = (?)");
			selectTasks.setInt(1, dependentTaskID);

			ResultSet rs = selectTasks.executeQuery();

			taskList = new ArrayList<Task>();

			// iterate through returned items and add to list
			while (rs.next()) {
				taskList.add(this.getTask(rs.getInt("TaskID")));
			}// while
		}// try
		catch (Exception e) {
			System.err.println("Error retrieving blocked tasks: "
					+ e.getMessage());
			taskList = null;
		}// catch

		return taskList;
	}// getBlockedTasks

	/**
	 * Remove a dependency between two tasks. The dependent task is dependent on
	 * the main task, meaning the main task must be completed before the
	 * dependent task can be completed.
	 *
	 * @param mainTaskID
	 *            the id of the main task
	 * @param dependentTaskID
	 *            the id of the dependent task
	 * @return 0 for successful removal, -1 if an error occurred
	 */
	public int removeTaskDependency(int mainTaskID, int dependentTaskID) {
		try {
			PreparedStatement deleteTaskDependencies = this.conn
					.prepareStatement("DELETE FROM TaskDependencies WHERE TaskID = (?) AND DependentTask = (?)");
			deleteTaskDependencies.setInt(1, mainTaskID);
			deleteTaskDependencies.setInt(2, dependentTaskID);

			deleteTaskDependencies.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error removing task dependency: "
					+ e.getMessage());
			return -1;
		}// catch

		return 0;
	}// removeTaskDependency

	/**
	 * Create an entry in the application log.
	 *
	 * @param remoteAddr
	 * @param remoteHost
	 * @param remotePort
	 * @param servletPath
	 * @param requestType
	 * @param requestCookie
	 * @param requestTime
	 * @return 0 for successful addition, -1 if an error occurred
	 */
	public int createLog(String remoteAddr, String remoteHost,
			String remotePort, String servletPath, String requestType,
			String requestCookie, Timestamp requestTime) {
		// ///////////////////////////////////////////////////////////////////////////////////////////////////
		// TODO
		// update parameter comments
		// //////////////////////////////////////////////////////////////////////////////////////////////////

		try {
			// insert log into db
			PreparedStatement insertLog = this.conn
					.prepareStatement("INSERT INTO Log(RemoteAddr, RemoteHost, RemotePort, ServletPath, RequestType, RequestCookie, RequestTime) VALUES (?,?,?,?,?,?,?)");
			insertLog.setString(1, remoteAddr);
			insertLog.setString(2, remoteHost);
			insertLog.setString(3, remotePort);
			insertLog.setString(4, servletPath);
			insertLog.setString(5, requestType);
			insertLog.setString(6, requestCookie);
			insertLog.setTimestamp(7, requestTime);

			insertLog.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error creating log: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// createLog

	/**
	 * Check the connection to the db.
	 *
	 * @return true if db is still connected, false if otherwise
	 */
	public boolean isConnected() {
		boolean returnVal = false;

		try {
			returnVal = this.conn.isValid(0);
		}// try
		catch (Exception e) {
		}// catch

		return returnVal;
	}// isConnected

	/**
	 * Close the connection to the db.
	 *
	 * @return 0 for successful close, -1 if an error occurred
	 */
	public int close() {
		try {
			this.conn.close();
		}// try
		catch (Exception e) {
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
	public int resetDB() {
		try {
			this.conn.prepareStatement("SET FOREIGN_KEY_CHECKS = 0")
					.executeUpdate();
			this.conn.prepareStatement("TRUNCATE TABLE User").executeUpdate();
			this.conn.prepareStatement("TRUNCATE TABLE Project")
					.executeUpdate();
			this.conn.prepareStatement("TRUNCATE TABLE Task").executeUpdate();
			this.conn.prepareStatement("TRUNCATE TABLE ProjectTask")
					.executeUpdate();
			this.conn.prepareStatement("TRUNCATE TABLE UserTask")
					.executeUpdate();
			this.conn.prepareStatement("TRUNCATE TABLE ProjectUser")
					.executeUpdate();
			this.conn.prepareStatement("TRUNCATE TABLE Log").executeUpdate();
			this.conn.prepareStatement("TRUNCATE TABLE TaskDependencies")
					.executeUpdate();
			this.conn.prepareStatement("SET FOREIGN_KEY_CHECKS = 1")
					.executeUpdate();
		}// try
		catch (Exception e) {
			System.err.println("Error resetting database: " + e.getMessage());
			return -1;
		}// catch

		return 0;
	}// resetDB

	private ProjectStatus stringToProjectStatus(String s) throws Exception {
		ProjectStatus returnVal = null;

		switch (s) {
		case "Started": {
			returnVal = ProjectStatus.STARTED;
			break;
		}
		case "Not Started": {
			returnVal = ProjectStatus.NOT_STARTED;
			break;
		}
		case "Finished": {
			returnVal = ProjectStatus.FINISHED;
			break;
		}
		case "In Progress": {
			returnVal = ProjectStatus.IN_PROGRESS;
			break;
		}
		default: {
			throw new Exception(s
					+ " is not a valid state for a project's status");
		}
		}// switch

		return returnVal;
	}// stringToProjectStatus

	private TaskStatus stringToTaskStatus(String s) throws Exception {
		TaskStatus returnVal = null;

		switch (s) {
		case "Queued": {
			returnVal = TaskStatus.QUEUED;
			break;
		}
		case "In Progress": {
			returnVal = TaskStatus.IN_PROGRESS;
			break;
		}
		case "Waiting": {
			returnVal = TaskStatus.WAITING;
			break;
		}
		case "Blocked": {
			returnVal = TaskStatus.BLOCKED;
			break;
		}
		case "Complete": {
			returnVal = TaskStatus.COMPLETE;
			break;
		}
		default: {
			throw new Exception(s + " is not a valid state for a task's status");
		}
		}// switch

		return returnVal;
	}// stringToTaskStatus

	private Priority stringToPriority(String s) throws Exception {
		Priority returnVal = null;

		switch (s) {
		case "Low": {
			returnVal = Priority.LOW;
			break;
		}
		case "Normal": {
			returnVal = Priority.NORMAL;
			break;
		}
		case "High": {
			returnVal = Priority.HIGH;
			break;
		}
		case "Urgent": {
			returnVal = Priority.URGENT;
			break;
		}
		default: {
			throw new Exception(s + " is not a valid state for a priority");
		}
		}// switch

		return returnVal;
	}// stringToPriority

	private Specialization stringToSpecialization(String s) throws Exception {
		Specialization returnVal = null;

		switch (s) {
		case "Test": {
			returnVal = Specialization.TEST;
			break;
		}
		case "Backend": {
			returnVal = Specialization.BACKEND;
			break;
		}
		case "Frontend": {
			returnVal = Specialization.FRONTEND;
			break;
		}
		case "Management": {
			returnVal = Specialization.MANAGEMENT;
			break;
		}
		default: {
			throw new Exception(s
					+ " is not a valid state for a specialization");
		}
		}// switch

		return returnVal;
	}// stringToSpecialization
}// DAO