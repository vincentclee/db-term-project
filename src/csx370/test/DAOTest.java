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

    assertEquals("1a", user1.getUserID(), user2.getUserID());
    assertEquals("1b", user1.getUsername(), user2.getUsername());
    assertEquals("1c", user1.getEmail(), user2.getEmail());
    assertEquals("1d", user1.getDisplayName(), user2.getDisplayName());
    assertFalse("1e", user1.getCookieID().equals(user2.getCookieID()));
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
    user2 = dao.getUserByCookieID(user1.getCookieID());
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

    List<Task> donc = new ArrayList<Task>();
    donc.add(task4);
    
    // by id
    assertEquals("7", ala.size(), dao.getUserTasksForProjectByID(user1.getUserID(), proj1.getProjectID()).size());
    assertEquals("8", calb.size(), dao.getUserTasksForProjectByID(user3.getUserID(), proj2.getProjectID()).size());
    assertEquals("8", elvisc.size(), dao.getUserTasksForProjectByID(user5.getUserID(), proj3.getProjectID()).size());
    assertEquals("9", donc.size(), dao.getUserTasksForProjectByID(user4.getUserID(), proj3.getProjectID()).size());
    
    // by cookieid
    assertEquals("10", ala.size(), dao.getUserTasksForProjectByCookieID(user1.getCookieID(), proj1.getProjectID()).size());
    assertEquals("11", calb.size(), dao.getUserTasksForProjectByCookieID(user3.getCookieID(), proj2.getProjectID()).size());
    assertEquals("12", elvisc.size(), dao.getUserTasksForProjectByCookieID(user5.getCookieID(), proj3.getProjectID()).size());
    assertEquals("13", donc.size(), dao.getUserTasksForProjectByCookieID(user4.getCookieID(), proj3.getProjectID()).size());
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

    assertEquals("13a", "asdf1234", dao.getUserByID(user1ID).getCookieID());
    
    assertNull("14", dao.authenticate("spock", "llap"));
    
    User user1Updated = dao.authenticate("antispock", "lsad");
    assertEquals("15", user1ID, user1Updated.getUserID());
    assertEquals("16", "antispock@", user1Updated.getEmail());
    assertEquals("17", "antispock", user1Updated.getDisplayName());
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
    List<Project> falco = new ArrayList<Project>();

    // by id
    assertEquals("20", al.size(), dao.getProjectsByUserID(user1.getUserID()).size());
    assertEquals("21", bob.size(), dao.getProjectsByUserID(user2.getUserID()).size());
    assertEquals("22", cal.size(), dao.getProjectsByUserID(user3.getUserID()).size());
    assertEquals("23", don.size(), dao.getProjectsByUserID(user3.getUserID()).size());
    assertEquals("24", elvis.size(), dao.getProjectsByUserID(user5.getUserID()).size());
    assertEquals("25", falco.size(), dao.getProjectsByUserID(user6.getUserID()).size());
    
    // by cookieid
    assertEquals("26", al.size(), dao.getProjectsByCookieID(user1.getCookieID()).size());
    assertEquals("27", bob.size(), dao.getProjectsByCookieID(user2.getCookieID()).size());
    assertEquals("28", cal.size(), dao.getProjectsByCookieID(user3.getCookieID()).size());
    assertEquals("29", don.size(), dao.getProjectsByCookieID(user4.getCookieID()).size());
    assertEquals("30", elvis.size(), dao.getProjectsByCookieID(user5.getCookieID()).size());
    assertEquals("31", falco.size(), dao.getProjectsByCookieID(user6.getCookieID()).size());
  }// testGetUserProjectsFunctions
  
  public void testGetProject()
  {
    User user1 = dao.createUser("noah", "noah@", "noah", "sdfcqoweg39gv8v3084h", "birdsnshit");
    Project proj1 = dao.createProject("ark", "save everything from god", new Date(100001l), new Date(100002l),
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
    assertEquals("37", user2.getUserID(), proj1Updated.getManager());
    assertEquals("38", ProjectStatus.FINISHED.toString(), proj1Updated.getStatus());
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

  public void testGetProjectTaskBoard()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testGetProjectTaskBoard

  public void testGetTasksForProject()
  {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    fail("not yet implemented");
  }// testGetTasksForProject

  public void testTaskUpdates()
  {
    Task task1 = dao.createTask(Priority.HIGH, false, new Timestamp(100321l), "to be changed", 
				"changey", "changey changey", "changey changey changey", TaskStatus.IN_PROGRESS);
    int task1ID = task1.getTaskID();
    
    dao.updateTaskPriority(task1ID, Priority.URGENT);
    dao.updateTaskDependency(task1ID, true);
    dao.updateTaskTitle(task1ID, "new title");
    dao.updateTaskNotes(task1ID, "new notes");
    dao.updateTaskDescription(task1ID, "new desc");
    dao.updateTaskScope(task1ID, "new scope");
    dao.updateTaskStatus(task1ID, TaskStatus.COMPLETE);
    
    Task task1Updated = dao.getTask(task1ID);
    
    assertEquals("41", task1ID, task1Updated.getTaskID());
    assertEquals("42", Priority.URGENT.toString(), task1Updated.getPriority());
    assertTrue("43", task1Updated.hasDependency());
    assertEquals("44", "new title", task1Updated.getTitle());
    assertEquals("45", "new notes", task1Updated.getNotes());
    assertEquals("46", "new desc", task1Updated.getDescription());
    assertEquals("47", "new scope", task1Updated.getScope());
    assertEquals("48", TaskStatus.COMPLETE.toString(), task1Updated.getStatus());
  }// testTaskUpdates
    
  public void testDeleteTask()
  {
    Task task1 = dao.createTask(Priority.HIGH, false, new Timestamp(1456721l), "lorem", 
				"ipsum", "spacefiller", "text", TaskStatus.IN_PROGRESS);
    dao.deleteTask(task1.getTaskID());
    assertEquals("49", -1, dao.getTask(task1.getTaskID()).getTaskID());
  }// testDeleteTask

  public void testRemoveUserFromTask()
  {
    User user1 = dao.createUser("nj5wdv", "erj46@", "ernerm", "sdnht14jg3808hv3084h", "qqejrnern");
    Project proj1 = dao.createProject("tests n stuff", "n stuff", new Date(1235344l), new Date(234634l),
					user1.getUserID(), ProjectStatus.STARTED);
    Task task1 = dao.createTask(Priority.HIGH, false, new Timestamp(1452721l), "blah", 
				"blah", "blah", "blah", TaskStatus.IN_PROGRESS);
    dao.addUserToProject(user1.getUserID(), proj1.getProjectID(), "herp", Specialization.BACKEND, "derp");
    dao.addUserToTask(task1.getTaskID(), user1.getUserID());
    dao.addTaskToProject(proj1.getProjectID(), task1.getTaskID());

    assertEquals("50", 1, dao.getUserTasksForProjectByID(user1.getUserID(), proj1.getProjectID()).size());

    dao.removeUserFromTask(task1.getTaskID(), user1.getUserID());

    assertEquals("51", 0, dao.getUserTasksForProjectByID(user1.getUserID(), proj1.getProjectID()).size());
  }// testRemoveUserFromTask

  public void testRemoveTaskFromProject()
  {
    User user1 = dao.createUser("nj5wdv2", "erj46@2", "ernerm2", "sdnht14jg3808hv3084h2", "qqejrnern2");
    Project proj1 = dao.createProject("tests n stuff2", "n stuff2", new Date(12353442l), new Date(2346342l),
					user1.getUserID(), ProjectStatus.STARTED);
    Task task1 = dao.createTask(Priority.HIGH, false, new Timestamp(14527212l), "blah2", 
				"blah2", "blah2", "blah2", TaskStatus.IN_PROGRESS);
    dao.addUserToProject(user1.getUserID(), proj1.getProjectID(), "herp2", Specialization.BACKEND, "derp2");
    dao.addUserToTask(task1.getTaskID(), user1.getUserID());
    dao.addTaskToProject(proj1.getProjectID(), task1.getTaskID());

    assertEquals("52", 1, dao.getTasksForProject(proj1.getProjectID()).size());

    dao.removeTaskFromProject(proj1.getProjectID(), task1.getTaskID());

    assertEquals("53", 0, dao.getTasksForProject(proj1.getProjectID()).size());
  }// testRemoveTaskFromProject

  public void testRemoveUserFromProject()
  {
    User user1 = dao.createUser("nj5wdv", "erj46@", "ernerm", "sdnht14jg3808hv3084h", "qqejrnern");
    Project proj1 = dao.createProject("tests n stuff", "n stuff", new Date(1235344l), new Date(234634l),
					user1.getUserID(), ProjectStatus.STARTED);
    Task task1 = dao.createTask(Priority.HIGH, false, new Timestamp(1452721l), "blah", 
				"blah", "blah", "blah", TaskStatus.IN_PROGRESS);
    dao.addUserToProject(user1.getUserID(), proj1.getProjectID(), "herp", Specialization.BACKEND, "derp");
    dao.addUserToTask(task1.getTaskID(), user1.getUserID());
    dao.addTaskToProject(proj1.getProjectID(), task1.getTaskID());
    
    assertEquals("54", 1, dao.getProjectsByUserID(user1.getUserID()).size());
    
    dao.removeUserFromProject(proj1.getProjectID(), user1.getUserID());

    assertEquals("55", 0, dao.getProjectsByUserID(user1.getUserID()).size());
  }// testRemoveUserFromProject

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

  public void tearDown()
  {
    dao.close();
  }// tearDown
}// DAOTest