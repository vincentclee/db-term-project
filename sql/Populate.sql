INSERT INTO User(UserID, DisplayName, Email, UserName, Password,Avatar) 
VALUES
 (1, 'John Doe', 'jdeo@uga.edu', 'JDO',UNHEX(SHA2('aaaa', 512)),'http://data.pusheen.com/july2014ad.png'),
 (2, 'Joseph Public', 'jopu@uga.edu', 'jpub',UNHEX(SHA2('1234', 512)),'http://data.pusheen.com/july2014ad.png'), 
 (3, 'Mary Smith', 'msmith@uga.edu', 'MSmith',UNHEX(SHA2('2233', 512)),'http://data.pusheen.com/july2014ad.png'), 
 (4, 'Bart Simpson', 'basim@uga.edu', 'basim2',UNHEX(SHA2('2323', 512)),'http://data.pusheen.com/july2014ad.png'),
 (5, 'Homer Simpson', 'HomSim@uga.edu', 'Homsim',UNHEX(SHA2('1112', 512)),'http://data.pusheen.com/july2014ad.png'), 
 (6, 'CJ Bennet', 'Cj@uga.edu', 'CJ', UNHEX(SHA2('12353', 512)),'http://data.pusheen.com/july2014ad.png'),
 (7, 'Vincent Lee', 'Vincent@uga.edu', 'Vince', UNHEX(SHA2('1333', 512)),'http://data.pusheen.com/july2014ad.png'),
 (8, 'Bita Kazemi', 'bitak@uga.edu', 'bitaa', UNHEX(SHA2('1666', 512)),'http://data.pusheen.com/july2014ad.png'),
 (9, 'Matthew Baron', 'mtb@uga.edu', 'Matt', UNHEX(SHA2('1555', 512)),'http://data.pusheen.com/july2014ad.png'),
 (10, 'Collin Watts', 'watts@uga.edu', 'Collin', UNHEX(SHA2('1444', 512)),'http://data.pusheen.com/july2014ad.png');


INSERT INTO Project (ProjectID,Title, Description, StartDate,TargetDate, ManagerID,Status,Icon,ImageURL)
	VALUES 
	(1, 'DB1', 'CS related',null, null,5, 'Not Started',null,null),
	(2, 'DB2', 'MGT related', null,null, 5, 'Started',null,null),
	(3, 'CMS', 'Business',null,null, 6,'Finished',null,null),
	(4, 'Mathemathics', 'Algebra',null,null, 7, 'Not Started',null,null),
	(5, 'SoftEng', 'CS software development', null,null, 4, 'In Progress',null,null),
	(6, 'Statistics', 'MGT', null,null, 8, 'Finished',null,null),
	(7, 'Relational algebra', 'MAT', null,null,2, 'In Progress',null,null );



INSERT INTO ProjectUser(UserID, ProjectID)
	VALUES 
	(1, 1 ),
	(1, 2 ),

	(2, 2),
	(2, 3),
	(2, 7),

	(3, 3),
	(3, 4),

	(4, 4),
	(4, 5),

	(5, 1),
	(5, 1),
	
	(6, 2),
	(6, 3),
	(6, 7),
	
	(7, 3),
	(7, 4),
	
	(8, 4),
	(8, 5),
	(8, 6),

	(9, 1),
	(9, 2),
	(9, 6),

	(10, 2),
	(10, 3),
	(10, 7);


INSERT INTO Task(TaskID, Priority,HasDependency, Deadline, Title, Notes, Description,Scope,Status)
	VALUES 
	(1, 'Low', True, null, 'sub1', null, null, null, 'Backlog'),
	(2, 'Normal', False, null, 'sub2', null,null,null, 'In Progress'),
	(3, 'High', False, null, 'sub1', null, null, null, 'Testing'),
	(4, 'Low' , True , null, 'sub35', null, null, null, 'Complete'),
	(5, 'Normal', False, null, 'no-name', null, null, null, 'Peer Review'),
	(6, 'Urgent', False, null, 'no-name', null, null,null, 'Peer Review'),
	(7, 'Low', True, null, 'sub1', null, null, null, 'Backlog'),
	(8, 'Low', True, null, 'sub1', null, null, null, 'Backlog'),
	(9, 'Low', True, null, 'sub1', null, null, null, 'Backlog'),
	(10, 'Normal', False, null, 'sub2', null,null,null, 'In Progress'),
	(11, 'High', False, null, 'sub1', null, null, null, 'Testing'),
	(12, 'Low' , True , null, 'sub35', null, null, null, 'Complete'),
	(13, 'Normal', False, null, 'no-name', null, null, null, 'Peer Review'),
	(14, 'Urgent', False, null, 'no-name', null, null,null, 'Peer Review'),
	(15, 'Low', True, null, 'sub1', null, null, null, 'Backlog'),
	(16, 'Normal', False, null, 'sub2', null,null,null, 'In Progress'),
	(17, 'High', False, null, 'sub1', null, null, null, 'Testing'),
	(18, 'Low' , True , null, 'sub35', null, null, null, 'Complete'),
	(19, 'Normal', False, null, 'no-name', null, null, null, 'Peer Review'),
	(20, 'Urgent', False, null, 'no-name', null, null,null, 'Peer Review');

Insert into ProjectTask(ProjectID, TaskID)
Values 
(1,1),
(1,8),
(1,15),
(2,2),
(2,16),
(3,3),
(3,17),
(4,4),
(4,18),
(5,5),
(5,19),
(6,6),
(6,20),
(7,7);

INSERT INTO UserTask(TaskID, UserID)
VALUES 
(1,5),
(2,6),
(3,7),
(4,4),
(5,2),
(6,1);
INSERT INTO TaskDependencies(TaskID, DependentTask)
VALUES 
	(6,5),
	(5,4),
	(4,3),
	(3,2),
	(2,1);




SELECT COUNT(*) FROM User;
SELECT COUNT(*) FROM Project;
SELECT COUNT(*) FROM ProjectUser;
SELECT COUNT(*) FROM Task;
SELECT COUNT(*) FROM UserTask;
SELECT COUNT(*) FROM ProjectTask;
SELECT COUNT(*) FROM TaskDependencies;
