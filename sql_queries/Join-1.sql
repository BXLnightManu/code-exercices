USE wild_db_quest
GO

SELECT w.lastname, w.firstname, p.role as player_role, t.name as team_name
    FROM wizard as w
    INNER JOIN player as p ON w.id = p.wizard_id
    INNER JOIN team as t ON t.id = p.team_id
    ORDER BY team_name ASC, player_role ASC, lastname ASC, firstname ASC;