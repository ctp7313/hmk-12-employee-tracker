USE ds9_db;

INSERT INTO organization(org_name)
VALUES
('Command'),
('Engineering'),
('Medical'),
('Science'),
('Security'),
('Civilian');

INSERT INTO role(title, salary, org_id)
VALUES
('Commanding Officer', 200000, 1),
('First Officer', 175000, 1),
('Chief of Security', 150000, 5),
('Bar Owner', 100000, 6),
('Chief Medical Officer', 150000, 3),
('Chief Science Officer', 150000, 4),
('Counselor', 125000, 6),
('Strategic Operations Officer', 125000, 5),
('Chief Operations Officer', 150000, 2),
('Journalist', 75000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Benjamin', 'Sisko', 1, null),
('Kira','Nerys', 2, 1),
('Odo', null, 3, 2),
('Quark', null, 4, null),
('Julian', 'Bashir', 5, 1),
('Jadzia', 'Dax', 6, 1),
('Ezri', 'Dax', 7, null),
('Worf', null, 8, 2),
('Miles', "O'Brien", 9, 1),
('Jake', 'Sisko', 10, null);

