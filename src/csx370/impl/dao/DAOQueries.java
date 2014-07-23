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
	public static final String GET_PROJECT_BY = "SELECT * FROM (User NATURAL JOIN ProjectUser NATURAL JOIN Project) WHERE CookieID = (?)";
	public static final String DELETE_USER = "DELETE FROM User WHERE UserID = (?)";
	public static final String CREATE_PROJECT = "INSERT INTO Project(Title, Description, StartDate, TargetDate, Manager, Status) VALUES (?,?,?,?,?,?)";
	public static final String GET_PROJECT = "SELECT * FROM Project WHERE ProjectID = (?)";
	public static final String UPDATE_PROJECT = "UPDATE Project SET Status = (?) WHERE ProjectID = (?)";
	
}
