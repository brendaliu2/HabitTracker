INSERT INTO users (username, password)
VALUES ('testuser1', 'password');

INSERT INTO habits (habit_name, weekly_goal, username)
VALUES ('testhabit1', 5, 'testuser1');

INSERT INTO habit_log(username, habit_id)
VALUES('testuser1', 1)