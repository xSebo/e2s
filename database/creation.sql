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
-- Table `e2s`.`organisations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2s`.`organisations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(45) NULL DEFAULT NULL,
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
  `authorityId` INT(11) NOT NULL,
  `organisationId` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `authorityId_idx` (`authorityId` ASC) VISIBLE,
  INDEX `orgId_idx` (`orgId` ASC) VISIBLE,
  CONSTRAINT `authorityId`
    FOREIGN KEY (`authorityId`)
    REFERENCES `e2s`.`authorities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `orgId`
    FOREIGN KEY (`orgId`)
    REFERENCES `e2s`.`organisations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2s`.`usertokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2s`.`usertokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NOT NULL,
  `tokenId` INT(11) NOT NULL,
  `refreshToken` VARCHAR(200) NOT NULL,
  `isActive` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
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

insert into organisations (name,logo) values ("TestOrg1","Testimg.png");
insert into organisations (name,logo) values ("TestOrg2","Testimg.png");

insert into users (name,email,password,authorityId,organisationId) values ("Seb","email@email.com","example",1,2);
insert into users (name,email,password,authorityId,organisationId) values ("Sam","email@email.com","example",2,1);
insert into users (name,email,password,authorityId,organisationId) values ("Sam2","email@email.com","example",3,2);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
