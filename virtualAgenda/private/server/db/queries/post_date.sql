insert into dates ( owner, creator, bigining_date, ending_date, squetch_name, date)
values ($1, $2, $3, $4, $5, $6)
RETURNING id, owner, creator, bigining_date, ending_date, squetch_name, date;
