package csx370.bo;

import javax.servlet.http.Cookie;

public class User {
	private int userId;
	private String username, displayname, email;
	private Cookie cookie;
	
	/**
	 * No-args Constructor
	 */
	public User() {
		this.userId = 0;
		this.username = "";
		this.displayname = "";
		this.email = "";
		this.cookie = null;
	}
	
	/**
	 * Default Constructor
	 * @param userId
	 * @param username
	 * @param displayname
	 * @param email
	 * @param cookie
	 */
	public User(int userId, String username, String displayname, String email, Cookie cookie) {
		super();
		this.userId = userId;
		this.username = username;
		this.displayname = displayname;
		this.email = email;
		this.cookie = cookie;
	}
	
	/**
	 * @return the userId
	 */
	public int getUserId() {
		return userId;
	}
	
	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}
	
	/**
	 * @return the displayname
	 */
	public String getDisplayname() {
		return displayname;
	}
	
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	
	/**
	 * @return the cookie
	 */
	public Cookie getCookie() {
		return cookie;
	}

	/**
	 * @param cookie the cookie to set
	 */
	public void setCookie(Cookie cookie) {
		this.cookie = cookie;
	}
}
