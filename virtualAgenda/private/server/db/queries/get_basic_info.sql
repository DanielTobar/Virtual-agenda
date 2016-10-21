select * from users
  join dates on dates.owner = users.user_name where users.id = $1;
