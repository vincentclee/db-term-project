package csx370.impl;

/**
 * An entity object for tranferring data from the User table to the application.
 */
public class User
{
  private int userID;
  private String username, email, displayName, specialization;

  /**
   * Create a User object with the given info.
   *
   * @param userID the primary key of the row containing this user's info
   * @param username the unique username of the user
   * @param email the unique registration email of the user
   * @param displayName the non-unique display name of the user
   * @param specialization the user's specialization
   */
  public User(int userID, String username, String email, String displayName, String specialization)
  {
    super();
    
    this.userID = userID;
    this.username = username;
    this.email = email;
    this.displayName = displayName;
    this.specialization = specialization;
  }// ctor

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
   * @return the specialization
   */
  public String getSpecialization() {
    return specialization;
  }
}// User