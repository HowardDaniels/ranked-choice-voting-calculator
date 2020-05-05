DROP DATABASE IF EXISTS results_db;
CREATE DATABASE results_db;

CREATE TABLE `results_db`.`results` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `candidate` VARCHAR(45) NOT NULL,
  `first_round_votes` INT,
  `second_round_votes` INT,
  `third_round_votes` INT,
  `fourth_round_votes` INT,
  `fifth_round_votes` INT,
  `sixth_round_votes` INT,
  `seventh_round_votes` INT,
  `eighth_round_votes` INT,
  PRIMARY KEY (`id`));

CREATE TABLE `results_db`.`ballots` (
`id` INT NOT NULL AUTO_INCREMENT,
`first_choice` VARCHAR(45) NOT NULL,
`second_choice` VARCHAR(45),
`third_choice` VARCHAR(45),
`votes` INT,
PRIMARY KEY (`id`));
); 