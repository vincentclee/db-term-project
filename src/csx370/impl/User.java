package csx370.impl;

/**
 * An entity object for tranferring data from the User table to the application.
 */
public class User
{
  private int userID;
  private String username, email, displayName, cookieID;

  /**
   * Create a User object with the given info.
   *
   * @param userID the primary key of the row containing this user's info
   * @param username the unique username of the user
   * @param email the unique registration email of the user
   * @param displayName the non-unique display name of the user
   * @param cookieID the cookieID of the user
   */
  public User(int userID, String username, String email, String displayName, String cookieID)
  {
    super();
    
    this.userID = userID;
    this.username = username;
    this.email = email;
    this.displayName = displayName;
    this.cookieID = cookieID;
  }// ctor

/**
 * Check if two User objects contain the same info.
 *
 * @param other the User to compare against this one
 * @return true if the user objects contain the same info, false if otherwise
 */
  public boolean equals(User other)
  {
    return (this.userID == other.userID && this.username.equals(other.username) &&
	    this.email.equals(other.email) && this.displayName.equals(other.displayName) &&
	    this.cookieID.equals(other.cookieID));
  }// equals

  /**
   * @return the userID
   */
  public int getUserID() {
    return this.userID;
  }

  /**
   * @return the username
   */
  public String getUsername() {
    return username;
  }

  /**
   * @return the email
   */
  public String getEmail() {
    return email;
  }
  
  /**
   * @return the displayName
   */
  public String getDisplayName() {
    return displayName;
  }

  /**
   * @return the cookieID
   */
  public String getCookieID() {
    return cookieID;
  }
}// User