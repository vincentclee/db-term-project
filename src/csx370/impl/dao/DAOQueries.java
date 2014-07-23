package csx370.impl.dao;

public class DAOQueries {

	public static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	
	public static final String AUTHENTICATE_USER = "SELECT * FROM User WHERE UserName = (?) AND Password = SHA2((?), 256)";
	
	public static final String SELECT_BY_COOKIEID = "SELECT * FROM User WHERE CookieID = (?)";
	public static final String UPDATE_BY_COOKIEID = "UPDATE User SET CookieID = (?) WHERE UserID = (?)";
	
	public static final String CREATE_USER = "INSERT INTO User(UserName, Email, DisplayName, CookieID, Password) VALUES (?,?,?,?,SHA2((?), 256))";
	public static final String GET_USER = "SELECT * FROM User WHERE UserName = (?)";
	public static final String GET_USER_TASK = "SELECT * FROM (UserTask NATURAL JOIN ProjectTask NATURAL JOIN Task) WHERE UserID = (?) AND ProjectID = (?)";
	public static final String UPDATE_USER = "UPDATE User SET (?) = (?) WHERE UserID = (?)";
	public static final String DELETE_USER = "DELETE FROM User WHERE UserID = (?)";
	
	public static final String GET_PROJECT_BY = "SELECT * FROM (User NATURAL JOIN ProjectUser NATURAL JOIN Project) WHERE CookieID = (?)";
	public static final String CREATE_PROJECT = "INSERT INTO Project(Title, Description, StartDate, TargetDate, Manager, Status) VALUES (?,?,?,?,?,?)";
	public static final String GET_PROJECT = "SELECT * FROM Project WHERE ProjectID = (?)";
	public static final String UPDATE_PROJECT = "UPDATE Project SET Status = (?) WHERE ProjectID = (?)";
	public static final String DELETE_PROJECT = "DELETE FROM Project WHERE ProjectID = (?)";
	
	public static final String CREATE_TASK = "INSERT INTO Task(Priority, HasDependency, Deadline, Title, Notes, Description, Scope, Status) VALUES (?,?,?,?,?,?,?,?)";
	public static final String GET_TASK = "SELECT * FROM Task WHERE TaskID = (?)";
	public static final String GET_PROJECT_TASKS = "SELECT * FROM (ProjectTask NATURAL JOIN Task) WHERE ProjectID = (?)";
	public static final String UPDATE_TASK = "UPDATE Task SET Status = (?) WHERE TaskID = (?)";
	public static final String DELETE_TASK = "DELETE FROM Task WHERE TaskID = (?)";
	
	public static final String[] RESET_DB = { "SET FOREIGN_KEY_CHECKS = 0",
			"TRUNCATE TABLE User", "TRUNCATE TABLE Project",
			"TRUNCATE TABLE Task", "TRUNCATE TABLE ProjectTask",
			"TRUNCATE TABLE UserTask", "TRUNCATE TABLE ProjectUser",
			"TRUNCATE TABLE Log", "TRUNCATE TABLE TaskDependencies",
			"SET FOREIGN_KEY_CHECKS = 1" };
}