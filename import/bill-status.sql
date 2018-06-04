INSERT INTO pennywise_db.bill_status (id, max_days, min_days, name, color) VALUES (1, null, null, 'None', 'white');
INSERT INTO pennywise_db.bill_status (id, max_days, min_days, name, color) VALUES (2, 99999, 31, 'Future', 'white');
INSERT INTO pennywise_db.bill_status (id, max_days, min_days, name, color) VALUES (3, 30, 8, 'Upcoming', 'light-blue');
INSERT INTO pennywise_db.bill_status (id, max_days, min_days, name, color) VALUES (4, 7, 1, 'Due Soon', 'blue');
INSERT INTO pennywise_db.bill_status (id, max_days, min_days, name, color) VALUES (5, 0, 0, 'Due Today', 'yellow');
INSERT INTO pennywise_db.bill_status (id, max_days, min_days, name, color) VALUES (6, -1, -5, 'Late', 'orange');
INSERT INTO pennywise_db.bill_status (id, max_days, min_days, name, color) VALUES (7, -6, -99999, 'Extra Late', 'red');