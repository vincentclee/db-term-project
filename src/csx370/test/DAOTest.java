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
    User user1 = dao.createUser("username", "1", "2", "password");
    User user2 = dao.authenticate("username", "password");

    assertEquals("1a", user1.getUserID(), user2.getUserID());
    assertEquals("1b", user1.getUsername(), user2.getUsername());
    assertEquals("1c", user1.getEmail(), user2.getEmail());
    assertEquals("1d", user1.getDisplayName(), user2.getDisplayName());
    assertFalse("1e", user1.getCookieID().equals(user2.getCookieID()));
  }// testAuthenticate
    
  public void testGetUserFunctions()
  {
    User user1 = dao.createUser("spongebob", "sb@kp.com", "squarepants", "gary");
    
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
    User user1 = dao.createUser("al", "al@", "al123", "apples");
    User user2 = dao.createUser("bob", "bob@", "bob123", "bananas");
    User user3 = dao.createUser("cal", "cal@", "cal123", "cherries");
    User user4 = dao.createUser("don", "don@", "don123", "dates");
    User user5 = dao.createUser("elvis", "elvis@", "elvis123", "enema");

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

    dao.addUserToProject(user1.getUserID(), proj1.getProjectID());
    dao.addUserToProject(user2.getUserID(), proj1.getProjectID());
    dao.addUserToProject(user3.getUserID(), proj2.getProjectID());
    dao.addUserToProject(user5.getUserID(), proj2.getProjectID());
    dao.addUserToProject(user1.getUserID(), proj3.getProjectID());
    dao.addUserToProject(user4.getUserID(), proj3.getProjectID());
    dao.addUserToProject(user5.getUserID(), proj3.getProjectID());
    
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
    
    // by id
    assertEquals("7", 2, dao.getUserTasksForProjectByID(user1.getUserID(), proj1.getProjectID()).size());
    assertEquals("8", 0, dao.getUserTasksForProjectByID(user3.getUserID(), proj2.getProjectID()).size());
    assertEquals("8", 2, dao.getUserTasksForProjectByID(user5.getUserID(), proj3.getProjectID()).size());
    assertEquals("9", 1, dao.getUserTasksForProjectByID(user4.getUserID(), proj3.getProjectID()).size());
    
    // by cookieid
    assertEquals("10", 2, dao.getUserTasksForProjectByCookieID(user1.getCookieID(), proj1.getProjectID()).size());
    assertEquals("11", 0, dao.getUserTasksForProjectByCookieID(user3.getCookieID(), proj2.getProjectID()).size());
    assertEquals("12", 2, dao.getUserTasksForProjectByCookieID(user5.getCookieID(), proj3.getProjectID()).size());
    assertEquals("13", 1, dao.getUserTasksForProjectByCookieID(user4.getCookieID(), proj3.getProjectID()).size());
  }// testGetUserTasksForProjectFunctions
  
  public void testUserUpdates()
  {
    User user1 = dao.createUser("spock", "spock@", "spock", "llap");
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
    User user1 = dao.createUser("leonardo", "donatello", "rafael", "michaelangelo");
    dao.deleteUser(user1.getUserID());
    assertNull("19", dao.authenticate("leonardo", "michaelangelo"));
  }// testDeleteUser

  public void testGetUserProjectsFunctions()
  {
    User user1 = dao.createUser("al2", "al@2", "al1232", "apples2");
    User user2 = dao.createUser("bob2", "bob@2", "bob1232", "bananas2");
    User user3 = dao.createUser("cal2", "cal@2", "cal1232", "cherries2");
    User user4 = dao.createUser("don2", "don@2", "don1232", "dates2");
    User user5 = dao.createUser("elvis2", "elvis@2", "elvis1232", "enema2");
    User user6 = dao.createUser("falco2", "falco@2", "falco1232", "falafel2");

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

    dao.addUserToProject(user1.getUserID(), proj1.getProjectID());
    dao.addUserToProject(user2.getUserID(), proj1.getProjectID());
    dao.addUserToProject(user3.getUserID(), proj2.getProjectID());
    dao.addUserToProject(user5.getUserID(), proj2.getProjectID());
    dao.addUserToProject(user1.getUserID(), proj3.getProjectID());
    dao.addUserToProject(user4.getUserID(), proj3.getProjectID());
    dao.addUserToProject(user5.getUserID(), proj3.getProjectID());
    
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

    assertEquals("20", 2, dao.getProjectsByUserID(user1.getUserID()).size());
    assertEquals("21", 1, dao.getProjectsByUserID(user2.getUserID()).size());
    assertEquals("22", 1, dao.getProjectsByUserID(user3.getUserID()).size());
    assertEquals("23", 1, dao.getProjectsByUserID(user3.getUserID()).size());
    assertEquals("24", 2, dao.getProjectsByUserID(user5.getUserID()).size());
    assertEquals("25", 0, dao.getProjectsByUserID(user6.getUserID()).size());
    
    // by cookieid
    assertEquals("26", 2, dao.getProjectsByCookieID(user1.getCookieID()).size());
    assertEquals("27", 1, dao.getProjectsByCookieID(user2.getCookieID()).size());
    assertEquals("28", 1, dao.getProjectsByCookieID(user3.getCookieID()).size());
    assertEquals("29", 1, dao.getProjectsByCookieID(user4.getCookieID()).size());
    assertEquals("30", 2, dao.getProjectsByCookieID(user5.getCookieID()).size());
    assertEquals("31", 0, dao.getProjectsByCookieID(user6.getCookieID()).size());
  }// testGetUserProjectsFunctions
  
  public void testGetProject()
  {
    User user1 = dao.createUser("noah", "noah@", "noah", "birdsnshit");
    Project proj1 = dao.createProject("ark", "save everything from god", new Date(100001l), new Date(100002l),
					user1.getUserID(), ProjectStatus.FINISHED);
    
    Project proj2 = dao.getProject(proj1.getProjectID());
    assertTrue("32", proj1.equals(proj2));
  }// testGetProject

  public void testProjectUpdates()
  {
    User user1 = dao.createUser("man1", "man1@", "man1", "man1");
    Project proj1 = dao.createProject("proj", "proj", new Date(135l), new Date(246l),
					user1.getUserID(), ProjectStatus.IN_PROGRESS);
    int proj1ID = proj1.getProjectID();

    User user2 = dao.createUser("man2", "man2@", "man2", "man2");
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
    User user1 = dao.createUser("fookinprawn", "asdfsdfg@", "effin a man", "guest");
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
    User user1 = dao.createUser("al4", "al@4", "al1244", "apples4");
    User user2 = dao.createUser("bob4", "bob@4", "bob1444", "bananas4");
    User user3 = dao.createUser("cal4", "cal@4", "cal1444", "cherries4");
    User user4 = dao.createUser("don4", "don@4", "don1444", "dates4");
    User user5 = dao.createUser("elvis4", "elvis@4", "elvis1444", "enema4");

    Project proj1 = dao.createProject("a4", "asdf4", new Date(1444l), new Date(4444l),
				      user1.getUserID(), ProjectStatus.NOT_STARTED);
    Project proj2 = dao.createProject("b4", "bnm,4", new Date(4454l), new Date(4564l), 
				      user4.getUserID(), ProjectStatus.IN_PROGRESS);
    Project proj3 = dao.createProject("c4", "cvbn4", new Date(5674l), new Date(6784l), 
				      user4.getUserID(), ProjectStatus.NOT_STARTED);

    Task task1 = dao.createTask(Priority.HIGH, true, new Timestamp(10001444l), "triangle4", 
				"tyui4", "rtyu4", "iop[4", TaskStatus.IN_PROGRESS);
    Task task2 = dao.createTask(Priority.NORMAL, false, new Timestamp(10004444l), "circle4", 
				"cvbn4", "iop[4", "rtyu4", TaskStatus.BLOCKED);
    Task task3 = dao.createTask(Priority.LOW, false, new Timestamp(10004454l), "x4", 
				"xcvb4", "xcvb4", "xcvb4", TaskStatus.QUEUED);
    Task task4 = dao.createTask(Priority.URGENT, true, new Timestamp(10004564l), "square4", 
				"sdfg4", "qwer4", "asdf4", TaskStatus.COMPLETE);
    Task task5 = dao.createTask(Priority.HIGH, false, new Timestamp(10005674l), "star4", 
				"sdfg4","tyui4", "asdf4", TaskStatus.WAITING);

    dao.addUserToProject(user1.getUserID(), proj1.getProjectID());
    dao.addUserToProject(user2.getUserID(), proj1.getProjectID());
    dao.addUserToProject(user3.getUserID(), proj2.getProjectID());
    dao.addUserToProject(user5.getUserID(), proj2.getProjectID());
    dao.addUserToProject(user1.getUserID(), proj3.getProjectID());
    dao.addUserToProject(user4.getUserID(), proj3.getProjectID());
    dao.addUserToProject(user5.getUserID(), proj3.getProjectID());
    
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

    TaskBoard tb = dao.getProjectTaskBoard(user1.getCookieID(), proj1.getProjectID());
    assertEquals("40a1", 1, tb.getInProgressTasks().size());
    assertEquals("40a2", 1, tb.getBlockedTasks().size());
    assertEquals("40a3", 0, tb.getQueuedTasks().size());
    assertEquals("40a4", 0, tb.getCompletedTasks().size());
    assertEquals("40a5", 0, tb.getWaitingTasks().size());
  }// testGetProjectTaskBoard

  public void testGetTasksForProject()
  {
    User user1 = dao.createUser("al3", "al@3", "al1233", "apples3");
    User user2 = dao.createUser("bob3", "bob@3", "bob1333", "bananas3");
    User user3 = dao.createUser("cal3", "cal@3", "cal1333", "cherries3");
    User user4 = dao.createUser("don3", "don@3", "don1333", "dates3");
    User user5 = dao.createUser("elvis3", "elvis@3", "elvis1333", "enema3");

    Project proj1 = dao.createProject("a3", "asdf3", new Date(1333l), new Date(3343l),
				      user1.getUserID(), ProjectStatus.NOT_STARTED);
    Project proj2 = dao.createProject("b3", "bnm,3", new Date(3453l), new Date(4563l), 
				      user3.getUserID(), ProjectStatus.IN_PROGRESS);
    Project proj3 = dao.createProject("c3", "cvbn3", new Date(5673l), new Date(6783l), 
				      user4.getUserID(), ProjectStatus.NOT_STARTED);

    Task task1 = dao.createTask(Priority.HIGH, true, new Timestamp(10001333l), "triangle3", 
				"tyui3", "rtyu3", "iop[3", TaskStatus.IN_PROGRESS);
    Task task2 = dao.createTask(Priority.NORMAL, false, new Timestamp(10003343l), "circle3", 
				"cvbn3", "iop[3", "rtyu3", TaskStatus.BLOCKED);
    Task task3 = dao.createTask(Priority.LOW, false, new Timestamp(10003453l), "x3", 
				"xcvb3", "xcvb3", "xcvb3", TaskStatus.QUEUED);
    Task task4 = dao.createTask(Priority.URGENT, true, new Timestamp(10004563l), "square3", 
				"sdfg3", "qwer3", "asdf3", TaskStatus.COMPLETE);
    Task task5 = dao.createTask(Priority.HIGH, false, new Timestamp(10005673l), "star3", 
				"sdfg3","tyui3", "asdf3", TaskStatus.WAITING);

    dao.addUserToProject(user1.getUserID(), proj1.getProjectID());
    dao.addUserToProject(user2.getUserID(), proj1.getProjectID());
    dao.addUserToProject(user3.getUserID(), proj2.getProjectID());
    dao.addUserToProject(user5.getUserID(), proj2.getProjectID());
    dao.addUserToProject(user1.getUserID(), proj3.getProjectID());
    dao.addUserToProject(user4.getUserID(), proj3.getProjectID());
    dao.addUserToProject(user5.getUserID(), proj3.getProjectID());
    
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
    
    assertEquals("40a", 2, dao.getTasksForProject(proj1.getProjectID()).size());
    assertEquals("40b", 0, dao.getTasksForProject(proj2.getProjectID()).size());
    assertEquals("40c", 3, dao.getTasksForProject(proj3.getProjectID()).size());
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
    User user1 = dao.createUser("nj5wdv", "erj46@", "ernerm", "qqejrnern");
    Project proj1 = dao.createProject("tests n stuff", "n stuff", new Date(1235344l), new Date(234634l),
					user1.getUserID(), ProjectStatus.STARTED);
    Task task1 = dao.createTask(Priority.HIGH, false, new Timestamp(1452721l), "blah", 
				"blah", "blah", "blah", TaskStatus.IN_PROGRESS);
    dao.addUserToProject(user1.getUserID(), proj1.getProjectID());
    dao.addUserToTask(task1.getTaskID(), user1.getUserID());
    dao.addTaskToProject(proj1.getProjectID(), task1.getTaskID());

    assertEquals("50", 1, dao.getUserTasksForProjectByID(user1.getUserID(), proj1.getProjectID()).size());

    dao.removeUserFromTask(task1.getTaskID(), user1.getUserID());

    assertEquals("51", 0, dao.getUserTasksForProjectByID(user1.getUserID(), proj1.getProjectID()).size());
  }// testRemoveUserFromTask

  public void testRemoveTaskFromProject()
  {
    User user1 = dao.createUser("nj5wdv2", "erj46@2", "ernerm2", "qqejrnern2");
    Project proj1 = dao.createProject("tests n stuff2", "n stuff2", new Date(12353442l), new Date(2346342l),
					user1.getUserID(), ProjectStatus.STARTED);
    Task task1 = dao.createTask(Priority.HIGH, false, new Timestamp(14527212l), "blah2", 
				"blah2", "blah2", "blah2", TaskStatus.IN_PROGRESS);
    dao.addUserToProject(user1.getUserID(), proj1.getProjectID());
    dao.addUserToTask(task1.getTaskID(), user1.getUserID());
    dao.addTaskToProject(proj1.getProjectID(), task1.getTaskID());

    assertEquals("52", 1, dao.getTasksForProject(proj1.getProjectID()).size());

    dao.removeTaskFromProject(proj1.getProjectID(), task1.getTaskID());

    assertEquals("53", 0, dao.getTasksForProject(proj1.getProjectID()).size());
  }// testRemoveTaskFromProject

  public void testRemoveUserFromProject()
  {
    User user1 = dao.createUser("132nj5wdv", "ererj46@", "erqwnerm", "qqejrneqwvrn");
    Project proj1 = dao.createProject("tests n stuff", "n stuff", new Date(1235344l), new Date(234634l),
				      user1.getUserID(), ProjectStatus.STARTED);
    Task task1 = dao.createTask(Priority.HIGH, false, new Timestamp(1452721l), "blah", 
				"blah", "blah", "blah", TaskStatus.IN_PROGRESS);
    dao.addUserToProject(user1.getUserID(), proj1.getProjectID());
    dao.addUserToTask(task1.getTaskID(), user1.getUserID());
    dao.addTaskToProject(proj1.getProjectID(), task1.getTaskID());
    
    assertEquals("54", 1, dao.getProjectsByUserID(user1.getUserID()).size());
    
    dao.removeUserFromProject(proj1.getProjectID(), user1.getUserID());

    assertEquals("55", 0, dao.getProjectsByUserID(user1.getUserID()).size());
  }// testRemoveUserFromProject

  public void testDependencyGetters()
  {
    Task task1 = dao.createTask(Priority.HIGH, true, new Timestamp(1000123l), "triangleA", 
				"tyui", "rtyu", "iop[", TaskStatus.IN_PROGRESS);
    Task task2 = dao.createTask(Priority.NORMAL, false, new Timestamp(1000234l), "circleA", 
				"cvbn", "iop[", "rtyu", TaskStatus.BLOCKED);
    Task task4 = dao.createTask(Priority.URGENT, true, new Timestamp(1000456l), "squareA", 
				"sdfg", "qwer", "asdf", TaskStatus.COMPLETE);
    Task task5 = dao.createTask(Priority.HIGH, false, new Timestamp(1000567l), "starA", 
				"sdfg","tyui", "asdf", TaskStatus.WAITING);

    dao.addTaskDependency(task2.getTaskID(), task1.getTaskID());
    dao.addTaskDependency(task2.getTaskID(), task4.getTaskID());
    dao.addTaskDependency(task5.getTaskID(), task4.getTaskID());

    assertEquals("57", 2, dao.getDependentTasks(task2.getTaskID()).size());
    assertEquals("58", 1, dao.getDependentTasks(task5.getTaskID()).size());
    assertEquals("59", 0, dao.getDependentTasks(task4.getTaskID()).size());

    assertEquals("60", 2, dao.getBlockingTasks(task4.getTaskID()).size());
    assertEquals("61", 1, dao.getBlockingTasks(task1.getTaskID()).size());
    assertEquals("62", 0, dao.getBlockingTasks(task5.getTaskID()).size());
  }// testDependencyGetters

  public void testRemoveTaskDependency()
  {
    Task task1 = dao.createTask(Priority.HIGH, true, new Timestamp(1000123l), "triangleB", 
				"tyui", "rtyu", "iop[", TaskStatus.IN_PROGRESS);
    Task task2 = dao.createTask(Priority.NORMAL, false, new Timestamp(1000234l), "circleB", 
				"cvbn", "iop[", "rtyu", TaskStatus.BLOCKED);

    dao.addTaskDependency(task1.getTaskID(), task2.getTaskID());

    assertEquals("63", 1, dao.getDependentTasks(task1.getTaskID()).size());

    dao.removeTaskDependency(task1.getTaskID(), task2.getTaskID());

    assertEquals("64", 0, dao.getDependentTasks(task1.getTaskID()).size());
  }// testRemoveTaskDependency

  public void tearDown()
  {
    dao.close();
  }// tearDown
}// DAOTest