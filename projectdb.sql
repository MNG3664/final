create database projectdb ;
use projectdb;
show tables;

CREATE TABLE Admin (
    admin_ID INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE Student (
    student_ID INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    supervisor_ID INT,
    FOREIGN KEY (supervisor_ID) REFERENCES Supervisor(supervisor_ID)
);

CREATE TABLE Student_Details (
    student_ID INT PRIMARY KEY,
    email VARCHAR(255),
    FOREIGN KEY (student_ID) REFERENCES Student(student_ID)
);

CREATE TABLE Supervisor (
    supervisor_ID INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE Project (
    project_ID INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255),
    project_description TEXT,
    admin_ID INT,
    supervisor_ID INT,
    student_ID INT,
    FOREIGN KEY (admin_ID) REFERENCES Admin(admin_ID),
    FOREIGN KEY (supervisor_ID) REFERENCES Supervisor(supervisor_ID),
    FOREIGN KEY (student_ID) REFERENCES Student(student_ID)
);

CREATE TABLE Comment (
    comment_ID INT AUTO_INCREMENT PRIMARY KEY,
    comment_text TEXT,
    date DATE,
    supervisor_ID INT,
    student_ID INT,
    project_ID INT,
    FOREIGN KEY (supervisor_ID) REFERENCES Supervisor(supervisor_ID),
    FOREIGN KEY (student_ID) REFERENCES Student(student_ID),
    FOREIGN KEY (project_ID) REFERENCES Project(project_ID)
);




INSERT INTO Admin (user_name, password, first_name, last_name, email) 
VALUES ('admin1', 'adminpassword1', 'Admin', 'One', 'admin1@example.com');



INSERT INTO Supervisor (user_name, password, first_name, last_name, email) 
VALUES ('supervisor1', 'supervisorpassword1', 'Supervisor', 'One', 'supervisor1@example.com');


INSERT INTO Student (user_name, password, first_name, last_name, supervisor_ID) 
VALUES ('student1', 'studentpassword1', 'Student', 'One', 1);

INSERT INTO Student (user_name, password, first_name, last_name, supervisor_ID) 
VALUES ('abc', '123', 'John', 'Doe', 1);

ALTER TABLE student
ADD COLUMN email VARCHAR(255);




DELETE FROM Student
WHERE student_ID = 7;

DELETE FROM Admin
WHERE password = '123';




INSERT INTO Student_Details (student_ID, email) 
VALUES (1, 'student1@example.com');


INSERT INTO Project (project_name, project_description, admin_ID, supervisor_ID, student_ID) 
VALUES ('Project One', 'Description for Project One', 1, 1, 1);


INSERT INTO Comment (comment_text, date, supervisor_ID, student_ID, project_ID) 
VALUES ('Great job on the project!', '2024-04-15', 1, 1, 1);


SELECT p.project_name, COUNT(c.comment_ID) AS num_comments
FROM Project p
LEFT JOIN Comment c ON p.project_ID = c.project_ID
GROUP BY p.project_name;


select* from student;
select* from admin;
select* from supervisor;
select* from project;
select* from comment;

UPDATE student
SET email = '123@email.com'
WHERE student_id = 6; 




SELECT plugin FROM mysql.user WHERE user='root';



ALTER USER 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'nazeer3664';

SELECT host, user, plugin FROM mysql.user;


