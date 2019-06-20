USE wild_db_quest
GO

SELECT w.lastname, w.firstname FROM wizard as w
    LEFT JOIN player as p ON w.id = p.wizard_id
    WHERE p.role IS NULL