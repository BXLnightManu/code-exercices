USE wild_db_quest
GO

SELECT t.name as team_name, COUNT(*) as number_of_player FROM player as p
    INNER JOIN team as t ON t.id = p.team_id
    GROUP BY t.name
    ORDER BY number_of_player DESC;