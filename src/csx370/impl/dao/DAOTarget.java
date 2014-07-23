package csx370.impl.dao;

public class DAOTarget {

	public static final String DB_URL = "jdbc:mysql://localhost/mydb";
	public static final String DB_TEST_URL = "jdbc:mysql://localhost/mydbtest";
	public static final String DB_USER = "root";
	public static final String DB_PASS = "guest";

	private final String mTarget;
	private final String mUser;
	private final String mPass;

	public DAOTarget(String target, String user, String pass) {

		mTarget = target;
		mUser = user;
		mPass = pass;

	}

	public String getTarget() {
		return mTarget;
	}
	
	public String getUser() {
		return mUser;
	}
	
	public String getPass() {
		return mPass;
	}
	
}
