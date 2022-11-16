-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema e2s
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema e2s
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `e2s`;
CREATE SCHEMA IF NOT EXISTS `e2s` DEFAULT CHARACTER SET latin1 ;
USE `e2s` ;

-- -----------------------------------------------------
-- Table `e2s`.`authorities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2s`.`authorities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2s`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2s`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2s`.`userauthoritieslink`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2s`.`userauthoritieslink` (
  `userId` INT(11) NOT NULL,
  `authorityId` INT(11) NOT NULL,
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  INDEX `authorityId_idx` (`authorityId` ASC) VISIBLE,
  CONSTRAINT `authorityId`
    FOREIGN KEY (`authorityId`)
    REFERENCES `e2s`.`authorities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `e2s`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

insert into authorities (name) values ("User");
insert into authorities (name) values ("Admin");
insert into authorities (name) values ("Super Admin");

insert into users (name,email,password) values ("Seb","email@email.com","example");
insert into users (name,email,password) values ("Sam","email@email.com","example");
insert into users (name,email,password) values ("Sam2","email@email.com","example");

insert into userauthoritieslink (userId, authorityId) values(1,1);
insert into userauthoritieslink (userId, authorityId) values(2,2);
insert into userauthoritieslink (userId, authorityId) values(3,3);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
