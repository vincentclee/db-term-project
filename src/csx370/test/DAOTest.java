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
    assertTrue("2", user1.equals(user2));
  }// testAuthenticate
    
  public void testGetUserFunctions()
  {
    User user1 = dao.createUser("spongebob", "sb@kp.com", "squarepants", "a1b2c3", "gary");
    
    // by ID
    User user2 = dao.getUserByID(user1.getUserID());
    assertTrue("3", user1.equals(user2));

    // by username    
    user2 = dao.getUserByUsername(user1.getUsername());
    assertTrue("4", user1.equals(user2));

    // by email
    user2 = dao.getUserByEmail(user1.getEmail());
    assertTrue("5", user1.equals(user2));

    // by cookieID
    user2 = dao.getUserByCookieID(user1.getEmail());
    assertTrue("6", user1.equals(user2));
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

    Task task1 = dao.createTask(Priority.HIGH, true, new Timestamp(1000123l), "triangle", 
				"tyui", "rtyu", "iop[", TaskStatus.IN_PROGRESS);
    Task task2 = dao.createTask(Priority.NORMAL, false, new Timestamp(1000234l), "circle", 
				"cvbn", "iop[", "rtyu", TaskStatus.BLOCKED);
    Task task3 = dao.createTask(Priority.LOW, false, new Timestamp(1000345l), "x", 
				"xcvb", "xcvb", "xcvb", TaskStatus.QUEUED);
    Task task4 = dao.createTask(Priority.URGENT, true, new Timestamp(1000456l), "square", 
				"sdfg", "qwer", "asdf", TaskStatus.COMPLETE);
    Task task5 = dao.createTask(Priority.HIGH, false, new Timestamp(1000567l), "star", 
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
    assertEquals("10", ala, dao.getUserTasksForProjectByCookieID(user1.getCookieID(), proj1.getProjectID()));
    assertEquals("11", calb, dao.getUserTasksForProjectByCookieID(user3.getCookieID(), proj2.getProjectID()));
    assertEquals("12", elvisc, dao.getUserTasksForProjectByCookieID(user5.getCookieID(), proj3.getProjectID()));
    assertEquals("13", empty, dao.getUserTasksForProjectByCookieID(user4.getCookieID(), proj3.getProjectID()));
  }// testGetUserTasksForProjectFunctions
  
  public void testUserUpdates()
  {
    User user1 = dao.createUser("spock", "spock@", "spock", "sdfcqoweg3808hv3084h", "llap");
    int user1ID = user1.getUserID();
    dao.updateUsername(user1ID, "antispock");
    dao.updateUserEmail(user1ID, "antispock@");
    dao.updateUserDisplayName(user1ID, "antispock");
    dao.updateUserCookieID(user1ID, "asdf1234");
    dao.updateUserPassword(user1ID, "lsad");

    assertNull("14", dao.authenticate("spock", "llap"));
    
    User user1Updated = dao.authenticate("antispock", "lsad");
    assertEquals("15", user1ID, user1Updated.getUserID());
    assertEquals("16", "antispock@", user1Updated.getEmail());
    assertEquals("17", "antispock", user1Updated.getDisplayName());
    assertEquals("18", "asdf1234", user1Updated.getCookieID());
  }// testUserUpdates

  public void testDeleteUser()
  {
    User user1 = dao.createUser("leonardo", "donatello", "rafael", ";lavksvpoij49094gq", "michaelangelo");
    dao.deleteUser(user1.getUserID());
    assertNull("19", dao.authenticate("leonardo", "michaelangelo"));
  }// testDeleteUser

  public void testGetUserProjectsFunctions()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    // by id
    // by cookieid
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    User user1 = dao.createUser("al2", "al@2", "al1232", "cnvqoweg3808hv3084h2", "apples2");
    User user2 = dao.createUser("bob2", "bob@2", "bob1232", "vnqowginp23488nvqns2", "bananas2");
    User user3 = dao.createUser("cal2", "cal@2", "cal1232", "q[orinv3048nnrogq3n4p082", "cherries2");
    User user4 = dao.createUser("don2", "don@2", "don1232", "nvqpo3480384ngore082", "dates2");
    User user5 = dao.createUser("elvis2", "elvis@2", "elvis1232", "angpqoi4[0234808432", "enema2");

    Project proj1 = dao.createProject("a2", "asdf2", new Date(1232l), new Date(2342l),
				      user1.getUserID(), ProjectStatus.NOT_STARTED);
    Project proj2 = dao.createProject("b2", "bnm,2", new Date(3452l), new Date(4562l), 
				      user3.getUserID(), ProjectStatus.IN_PROGRESS);
    Project proj3 = dao.createProject("c2", "cvbn2", new Date(5672l), new Date(6782l), 
				      user4.getUserID(), ProjectStatus.NOT_STARTED);

    Task task1 = dao.createTask(Priority.HIGH, true, new Timestamp(10001232l), "triangle2", 
				"tyui2", "rtyu2", "iop[2", TaskStatus.IN_PROGRESS);
    Task task2 = dao.createTask(Priority.NORMAL, false, new Timestamp(10002342l), "circle2", 
				"cvbn2", "iop[2", "rtyu2", TaskStatus.BLOCKED);
    Task task3 = dao.createTask(Priority.LOW, false, new Timestamp(10003452l), "x2", 
				"xcvb2", "xcvb2", "xcvb2", TaskStatus.QUEUED);
    Task task4 = dao.createTask(Priority.URGENT, true, new Timestamp(10004562l), "square2", 
				"sdfg2", "qwer2", "asdf2", TaskStatus.COMPLETE);
    Task task5 = dao.createTask(Priority.HIGH, false, new Timestamp(10005672l), "star2", 
				"sdfg2","tyui2", "asdf2", TaskStatus.WAITING);

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
    List<Project> al = new ArrayList<Project>();
    al.add(proj1);
    al.add(proj3);
    
    List<Project> bob = new ArrayList<Project>();
    bob.add(proj1);

    List<Project> cal = new ArrayList<Project>();
    cal.add(proj2);

    List<Project> don = new ArrayList<Project>();
    don.add(proj3);

    List<Project> elvis = new ArrayList<Project>();
    elvis.add(proj2);
    elvis.add(proj3);

    User user6 = dao.createUser("falco2", "falco@2", "falco1232", "vnq;orngp34809dwnv2", "falafel2");
    List<Project> empty = new ArrayList<Project>();
    
    // by id
    assertEquals("20", al, dao.getProjectsByUserID(user1.getUserID()));
    assertEquals("21", bob, dao.getProjectsByUserID(user2.getUserID()));
    assertEquals("22", cal, dao.getProjectsByUserID(user3.getUserID()));
    assertEquals("23", don, dao.getProjectsByUserID(user3.getUserID()));
    assertEquals("24", elvis, dao.getProjectsByUserID(user5.getUserID()));
    assertEquals("25", empty, dao.getProjectsByUserID(user6.getUserID()));
    
    // by cookieid
    assertEquals("26", al, dao.getProjectsByCookieID(user1.getCookieID()));
    assertEquals("27", bob, dao.getProjectsByCookieID(user2.getCookieID()));
    assertEquals("28", cal, dao.getProjectsByCookieID(user3.getCookieID()));
    assertEquals("29", don, dao.getProjectsByCookieID(user4.getCookieID()));
    assertEquals("30", elvis, dao.getProjectsByCookieID(user5.getCookieID()));
    assertEquals("31", empty, dao.getProjectsByCookieID(user6.getCookieID()));
  }// testGetUserProjectsFunctions
  
  public void testGetProject()
  {
    User user1 = dao.createUser("noah", "noah@", "noah", "sdfcqoweg39gv8v3084h", "birdsnshit");
    Project proj1 = dao.createProject("ark", "save everything from god", new Date(1l), new Date(2l),
					user1.getUserID(), ProjectStatus.FINISHED);
    
    Project proj2 = dao.getProject(proj1.getProjectID());
    assertTrue("32", proj1.equals(proj2));
  }// testGetProject

  public void testProjectUpdates()
  {
    User user1 = dao.createUser("man1", "man1@", "man1", "sdaerhqjg3808hv3084h", "man1");
    Project proj1 = dao.createProject("proj", "proj", new Date(135l), new Date(246l),
					user1.getUserID(), ProjectStatus.IN_PROGRESS);
    int proj1ID = proj1.getProjectID();

    User user2 = dao.createUser("man2", "man2@", "man2", "sdaerhqjg38082384h", "man2");
    Date newStartDate = new Date(159l);
    Date newTargetDate = new Date(260l);
    
    dao.updateProjectTitle(proj1ID, "newproj");
    dao.updateProjectDescription(proj1ID, "newproj");
    dao.updateProjectStartDate(proj1ID, newStartDate);
    dao.updateProjectTargetDate(proj1ID, newTargetDate);
    dao.updateProjectManager(proj1ID, user2.getUserID());
    dao.updateProjectStatus(proj1ID, ProjectStatus.FINISHED);
        
    Project proj1Updated = dao.getProject(proj1ID);
    
    assertEquals("33", "newproj", proj1Updated.getTitle());
    assertEquals("34", "newproj", proj1Updated.getDescription());
    assertEquals("35", newStartDate, proj1Updated.getStartDate());
    assertEquals("36", newTargetDate, proj1Updated.getTargetDate());
    assertEquals("37", user2.getUserID(), proj1Updated.getManager());
    assertEquals("38", ProjectStatus.FINISHED, proj1Updated.getStatus());
  }// testProjectUpdates

  public void testDeleteProject()
  {
    User user1 = dao.createUser("fookinprawn", "asdfsdfg@", "effin a man", "n35ndqjg3808hv3084h", "guest");
    Project proj1 = dao.createProject("be excellent to each other", "au rule", new Date(135344l), new Date(24634l),
					user1.getUserID(), ProjectStatus.STARTED);
    dao.deleteProject(proj1.getProjectID());
    assertEquals("39", -1, dao.getProject(proj1.getProjectID()).getProjectID());
  }// testDeleteProject

  public void testGetTask()
  {
    Task task1 = dao.createTask(Priority.HIGH, false, new Timestamp(100321l), "step1: cut a hole in the box", 
				"need scissors", "also, a box", "words words words", TaskStatus.IN_PROGRESS);
    Task task2 = dao.getTask(task1.getTaskID());
    assertTrue("40", task1.equals(task2));    
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