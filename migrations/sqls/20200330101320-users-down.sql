
SET @mydb = DATABASE();
SET @sql1 = CONCAT('DROP DATABASE ', @mydb);
SET @sql2 = CONCAT('CREATE DATABASE ', @mydb);
PREPARE stmt1 FROM  @sql1;
PREPARE stmt2 FROM  @sql2;
EXECUTE stmt1;
EXECUTE stmt2;