INSERT INTO bill_status
(name, min_days, max_days, color)
VALUES
  ('None',null,null, 'white'),
  ('Future',31,99999,'white' ),
  ('Upcoming',8,30, ,'light-blue'),
  ('Due Soon',7,1, 'blue'),
  ('Due Today',0,0 , 'yellow'),
  ('Late',-1, -5, 'orange'),
  ('Extra Late',-6,-99999, 'red');