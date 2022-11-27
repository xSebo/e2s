-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema e2sTest
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema e2sTest
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `e2sTest`;
CREATE SCHEMA IF NOT EXISTS `e2sTest` DEFAULT CHARACTER SET latin1 ;
USE `e2sTest` ;

-- -----------------------------------------------------
-- Table `e2sTest`.`authorities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2sTest`.`authorities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2sTest`.`organisations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2sTest`.`organisations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2sTest`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2sTest`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(65) NOT NULL,
  `authorityId` INT(11) NOT NULL,
  `organisationId` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `authorityId_idx` (`authorityId` ASC) VISIBLE,
  INDEX `organisationId_idx` (`organisationId` ASC) VISIBLE,
  CONSTRAINT `authorityId`
    FOREIGN KEY (`authorityId`)
    REFERENCES `e2sTest`.`authorities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `organisationId`
    FOREIGN KEY (`organisationId`)
    REFERENCES `e2sTest`.`organisations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2sTest`.`usertokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2sTest`.`usertokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NOT NULL,
  `tokenId` INT(11) NOT NULL,
  `refreshToken` VARCHAR(200) NOT NULL,
  `isActive` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `e2sTest`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

insert into authorities (name) values ("User");
insert into authorities (name) values ("Admin");
insert into authorities (name) values ("Super Admin");

insert into organisations (name,logo) values ("TestOrg1","Testimg.png");
insert into organisations (name,logo) values ("TestOrg2","Testimg.png");

insert into users (name,email,password,authorityId,organisationId) values ("TestUser","user@email.com","example",1,2);
insert into users (name,email,password,authorityId,organisationId) values ("TestAdmin","admin@email.com","example",2,2);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
