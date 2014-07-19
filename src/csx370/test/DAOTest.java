package csx370.test;

import csx370.impl.*;
import java.util.List;
import java.util.ArrayList;
import java.sql.Date;
import java.sql.Timestamp;
import junit.framework.TestCase;

/**
 * Tests the DAO.
 *
 * @author C.J. Bennett <mrbennett513@gmail.com>
 */
public class DAOTest extends TestCase
{
  private DAO dao;

  @Before
  public void setUp()
  {
    dao = new DAO(false);
    dao.resetDB();
  }// setUp
  
  public void testAuthenticate()
  {
    assertNull("1", dao.authenticate("username", "password"));
    User user1 = dao.createUser("username", "1", "2", "3", "password");
    User user2 = dao.authenticate("username", "password");
    assertEquals("2", user1, user2);
  }// testAuthenticate
    
  public void testGetUserFunctions()
  {
    User user1 = dao.createUser("spongebob", "sb@kp.com", "squarepants", "a1b2c3", "gary");
    
    // by ID
    User user2 = dao.getUserByID(user1.getUserID());
    assertEquals("3", user1, user2);

    // by username    
    user2 = dao.getUserByUsername(user1.getUsername());
    assertEquals("4", user1, user2);

    // by email
    user2 = dao.getUserByEmail(user1.getEmail());
    assertEquals("5", user1, user2);

    // by cookieID
    user2 = dao.getUserByCookieID(user1.getEmail());
    assertEquals("6", user1, user2);
  }// testGetUserByID
  
  public void testGetUserTasksForProjectFunctions()
  {
    User user1 = dao.createUser("al", "al@", "al123", "cnvqoweg3808hv3084h", "apples");
    User user2 = dao.createUser("bob", "bob@", "bob123", "vnqowginp23488nvqns", "bananas");
    User user3 = dao.createUser("cal", "cal@", "cal123", "q[orinv3048nnrogq3n4p08", "cherries");
    User user4 = dao.createUser("don", "don@", "don123", "nvqpo3480384ngore08", "dates");
    User user5 = dao.createUser("elvis", "elvis@", "elvis123", "angpqoi4[023480843", "enema");

    Project proj1 = dao.createProject("a", "asdf", new Date(123l), new Date(234l),
				      user1.getUserID(), ProjectStatus.NOT_STARTED);
    Project proj2 = dao.createProject("b", "bnm,", new Date(345l), new Date(456l), 
				      user3.getUserID(), ProjectStatus.IN_PROGRESS);
    Project proj3 = dao.createProject("c", "cvbn", new Date(567l), new Date(678l), 
				      user4.getUserID(), ProjectStatus.NOT_STARTED);

    Task task1 = dao.createTask(Priority.HIGH, true, new Timestamp(123l), "triangle", 
				"tyui", "rtyu", "iop[", TaskStatus.IN_PROGRESS);
    Task task2 = dao.createTask(Priority.NORMAL, false, new Timestamp(234l), "circle", 
				"cvbn", "iop[", "rtyu", TaskStatus.BLOCKED);
    Task task3 = dao.createTask(Priority.LOW, false, new Timestamp(345l), "x", 
				"xcvb", "xcvb", "xcvb", TaskStatus.QUEUED);
    Task task4 = dao.createTask(Priority.URGENT, true, new Timestamp(456l), "square", 
				"sdfg", "qwer", "asdf", TaskStatus.COMPLETE);
    Task task5 = dao.createTask(Priority.HIGH, false, new Timestamp(567l), "star", 
				"sdfg","tyui", "asdf", TaskStatus.WAITING);

    dao.addUserToProject(user1.getUserID(), proj1.getProjectID(), "asdf", Specialization.FRONTEND, "dfgh");
    dao.addUserToProject(user2.getUserID(), proj1.getProjectID(), "asdf", Specialization.FRONTEND, "dfgh");
    dao.addUserToProject(user3.getUserID(), proj2.getProjectID(), "asdf", Specialization.FRONTEND, "dfgh");
    dao.addUserToProject(user5.getUserID(), proj2.getProjectID(), "asdf", Specialization.FRONTEND, "dfgh");
    dao.addUserToProject(user1.getUserID(), proj3.getProjectID(), "asdf", Specialization.FRONTEND, "dfgh");
    dao.addUserToProject(user4.getUserID(), proj3.getProjectID(), "asdf", Specialization.FRONTEND, "dfgh");
    dao.addUserToProject(user5.getUserID(), proj3.getProjectID(), "asdf", Specialization.FRONTEND, "dfgh");
    
    dao.addTaskToProject(proj1.getProjectID(), task1.getTaskID());
    dao.addTaskToProject(proj1.getProjectID(), task2.getTaskID());
    dao.addTaskToProject(proj3.getProjectID(), task3.getTaskID());
    dao.addTaskToProject(proj3.getProjectID(), task4.getTaskID());
    dao.addTaskToProject(proj3.getProjectID(), task5.getTaskID());

    dao.addUserToTask(task1.getTaskID(), user1.getUserID());
    dao.addUserToTask(task2.getTaskID(), user1.getUserID());
    dao.addUserToTask(task3.getTaskID(), user5.getUserID());
    dao.addUserToTask(task4.getTaskID(), user4.getUserID());
    dao.addUserToTask(task5.getTaskID(), user5.getUserID());
    
    // lists the functions should return
    List<Task> ala = new ArrayList<Task>();
    ala.add(task1);
    ala.add(task2);

    List<Task> calb = new ArrayList<Task>();

    List<Task> elvisc = new ArrayList<Task>();
    elvisc.add(task3);
    elvisc.add(task5);

    List<Task> empty = new ArrayList<Task>();
    empty.add(task4);
    
    // by id
    assertEquals("7", ala, dao.getUserTasksForProjectByID(user1.getUserID(), proj1.getProjectID()));
    assertEquals("8", calb, dao.getUserTasksForProjectByID(user3.getUserID(), proj2.getProjectID()));
    assertEquals("8", elvisc, dao.getUserTasksForProjectByID(user5.getUserID(), proj3.getProjectID()));
    assertEquals("9", empty, dao.getUserTasksForProjectByID(user4.getUserID(), proj3.getProjectID()));
    
    // by cookieid
    assertEquals("10", ala, dao.getUserTasksForProjectByID(user1.getUserID(), proj1.getProjectByCookieID()));
    assertEquals("11", calb, dao.getUserTasksForProjectByID(user3.getUserID(), proj2.getProjectByCookieID()));
    assertEquals("12", elvisc, dao.getUserTasksForProjectByID(user5.getUserID(), proj3.getProjectByCookieID()));
    assertEquals("13", empty, dao.getUserTasksForProjectByID(user4.getUserID(), proj3.getProjectByCookieID()));
  }// testGetUserTasksForProjectFunctions
  
  public void testUserUpdates()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // username
    // email
    // display name
    // cookieid
    // password
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testUserUpdates

  public void testDeleteUser()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testDeleteUser

  public void testGetUserProjectsFunctions()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // by id
    // by cookieid
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testGetUserProjectsFunctions

  public void testCreateProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testCreateProject
  
  public void testGetProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testGetProject

  public void testProjectUpdates()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // title
    // description
    // startDate
    // targetDate
    // manager
    // status
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testProjectUpdates

  public void testDeleteProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testDeleteProject

  public void testCreateTask()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testCreateTask

  public void testGetTask()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testGetTask

  public void testGetTasksForProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testGetTasksForProject

  public void testTaskUpdates()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // priority
    // dependency
    // deadline
    // title
    // notes
    // description
    // scope
    // status
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testTaskUpdates
    
  public void testDeleteTask()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testDeleteTask

  public void testAddUserToTask()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testAddUserToTask

  public void testRemoveUserFromTask()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testRemoveUserFromTask

  public void testAddTaskToProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testAddTaskToProject

  public void testRemoveTaskFromProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testRemoveTaskFromProject

  public void testAddUserToProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testAddUserToProject

  public void testUserProjectUpdates()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // commits
    // specialization
    // contributions
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskStatus


  public void testRemoveUserFromProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testRemoveUserFromProject

  public void testAddTaskDependency()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testAddTaskDependency

  public void testRemoveTaskDependency()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testRemoveTaskDependency

  public void createLog()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// createLog  

  @After
  public void tearDown()
  {
    dao.close();
  }// tearDown
}// DAOTest