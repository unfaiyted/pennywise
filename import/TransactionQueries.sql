
/* Total Spent Per Day */
select
    count(*) as tran_count,
  sum(t.amount) as total_spent,
  t.date as date
from transaction t
  where account_id != ''
GROUP BY  t.date
having sum(t.amount) > 0
ORDER BY t.date desc;



/* Total Spent by Category per Month */
select
tc.category,
concat(MONTH(t.date),"-",YEAR(t.date)) as month,
sum(t.amount) as total_spent  from transaction t
inner join transaction_category  tc ON (t.id= tc.transaction_id)
where MONTH(t.date) = 2 and YEAR(t.date) = 2018
group by tc.category, concat(MONTH(t.date),"-",YEAR(t.date))
having sum(t.amount) > 0;





