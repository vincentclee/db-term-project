package csx370.test;

import csx370.impl.*;
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
    // test username authenticate
    assertNull("1", dao.authenticate("username", "password"));
    dao.createUser("username", "1", "2", "3", "password");
    User user = dao.authenticate("username", "password");
    assertEquals("2", "1", user.getEmail());
    assertEquals("3", "2", user.getDisplayName());
    assertEquals("4", "3", user.getSpecialization());

    // test email authenticate
    assertNull("5", dao.authenticate("email", "password"));
    dao.createUser("1", "email", "2", "3", "password");
    user = dao.authenticate("email", "password");
    assertEquals("6", "1", user.getUsername());
    assertEquals("7", "2", user.getDisplayName());
    assertEquals("8", "3", user.getSpecialization());
  }// testAuthenticate

  public void testCreateUser()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testCreateUser

  public void testGetUserFunctions()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // by ID
    // by username
    // by email
    // by cookieID
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testGetUserByID
  
  public void testGetUserTasksForProjectFunctions()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // by id
    // by cookieid
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
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

  
  public void testUpdateProjectDescription()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testUpdateProjectDescription

  public void testUpdateProjectTargetDate()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testUpdateProjectTargetDate

  public void testUpdateProjectManager()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testUpdateProjectManager

  public void testGetTasksForProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testGetTasksForProject

  public void testUpdateTaskType()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskType
  
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
  }// testUpdateTaskPriority
    
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

  
  public void testUpdateTaskProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskProject
  
  public void testUpdateTaskDependency()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskDependency
  
  public void testUpdateTaskDeadline()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskDeadline
  
  public void testUpdateTaskTitle()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskTitle
  
  public void testUpdateTaskNotes()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskNotes
  
  public void testUpdateTaskDescription()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskDescription
  
  public void testUpdateTaskScope()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskScope
  
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

  
  public void testUpdateTaskProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskProject
  
  public void testUpdateTaskDependency()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskDependency
  
  public void testUpdateTaskDeadline()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskDeadline
  
  public void testUpdateTaskTitle()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskTitle
  
  public void testUpdateTaskNotes()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskNotes
  
  public void testUpdateTaskDescription()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskDescription
  
  public void testUpdateTaskScope()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    fail("not yet implemented");
  }// testUpdateTaskScope
  
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