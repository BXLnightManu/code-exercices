USE wild_db_quest
GO

SELECT w.lastname, w.firstname, p.enrollment_date FROM wizard as w
    INNER JOIN player as p ON w.id = p.wizard_id
    INNER JOIN team as t ON t.id = p.team_id
    WHERE t.name = 'Gryffindor' AND DATENAME(weekday, p.enrollment_date) = 'lundi'
    ORDER BY p.enrollment_date ASC;

