-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema e2stest
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema e2stest
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `e2stest`;
CREATE SCHEMA IF NOT EXISTS `e2stest` DEFAULT CHARACTER SET latin1 ;
USE `e2stest` ;

-- -----------------------------------------------------
-- Table `e2stest`.`authorities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2stest`.`authorities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2stest`.`organisations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2stest`.`organisations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2stest`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2stest`.`users` (
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
    REFERENCES `e2stest`.`authorities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `organisationId`
    FOREIGN KEY (`organisationId`)
    REFERENCES `e2stest`.`organisations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2stest`.`usertokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2stest`.`usertokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NOT NULL,
  `tokenId` INT(11) NOT NULL,
  `refreshToken` VARCHAR(200) NOT NULL,
  `isActive` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `e2stest`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2stest`.`emaillinks`
-- -----------------------------------------------------
CREATE TABLE `e2stest`.`emaillinks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `weekly` TINYINT NOT NULL,
  `monthly` TINYINT NOT NULL,
  `yearly` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userEmailLink_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userEmailLink`
    FOREIGN KEY (`userId`)
    REFERENCES `e2stest`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE `e2stest`.`powerdata` (
  `date` DATETIME NOT NULL,
  `CHP1ElectricityGen` FLOAT NULL,
  `CHP2ElectricityGen` FLOAT NULL,
  `CHP1HeatGen` FLOAT NULL,
  `CHP2HeatGen` FLOAT NULL,
  `BoilerHeat` FLOAT NULL,
  `FeelsLike` FLOAT NULL,
  `WindSpeed` FLOAT NULL,
  `SiteElectricityDemand` FLOAT NULL,
  `DayPowerPrice` FLOAT NULL,
  `SiteHeatDemand` FLOAT NULL,
  `ImportElectricity` FLOAT NULL,
  `ExportElectricity` FLOAT NULL,
  PRIMARY KEY (`date`));


insert into authorities (name) values ("User");
insert into authorities (name) values ("Admin");
insert into authorities (name) values ("Super Admin");

insert into organisations (name,logo) values ("TestOrg1","Testimg.png");
insert into organisations (name,logo) values ("TestOrg2","Testimg.png");

insert into users (name,email,password,authorityId,organisationId) values ("TestUser","user@email.com","$2a$12$lhy3gdLMAlhdIgXh3etcrOcPQmzVzffqUk4Tw3NEhvQ8eK8l4N3Wu",1,2);
insert into users (name,email,password,authorityId,organisationId) values ("TestAdmin","admin@email.com","$2a$12$lhy3gdLMAlhdIgXh3etcrOcPQmzVzffqUk4Tw3NEhvQ8eK8l4N3Wu",2,2);

insert into emaillinks (userId, weekly, monthly, yearly) values (1,0,0,0);
insert into emaillinks (userId, weekly, monthly, yearly) values (2,0,0,0);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
