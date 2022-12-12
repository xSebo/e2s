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
  `facilityName` VARCHAR(45) NULL DEFAULT("Abacws"),
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
  `password` VARCHAR(65) NOT NULL,
  `authorityId` INT(11) NOT NULL,
  `organisationId` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `authorityId_idx` (`authorityId` ASC) VISIBLE,
  INDEX `organisationId_idx` (`organisationId` ASC) VISIBLE,
  CONSTRAINT `authorityId`
    FOREIGN KEY (`authorityId`)
    REFERENCES `e2s`.`authorities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `organisationId`
    FOREIGN KEY (`organisationId`)
    REFERENCES `e2s`.`organisations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2s`.`emaillinks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2s`.`emaillinks` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NOT NULL,
  `weekly` TINYINT(4) NOT NULL,
  `monthly` TINYINT(4) NOT NULL,
  `yearly` TINYINT(4) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userEmailLink_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userEmailLink`
    FOREIGN KEY (`userId`)
    REFERENCES `e2s`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `e2s`.`powerdata`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2s`.`powerdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `organisationId` INT(11) NOT NULL,
  `CHP1ElectricityGen` FLOAT NULL DEFAULT NULL,
  `CHP2ElectricityGen` FLOAT NULL DEFAULT NULL,
  `CHP1HeatGen` FLOAT NULL DEFAULT NULL,
  `CHP2HeatGen` FLOAT NULL DEFAULT NULL,
  `BoilerHeat` FLOAT NULL DEFAULT NULL,
  `FeelsLike` FLOAT NULL DEFAULT NULL,
  `WindSpeed` FLOAT NULL DEFAULT NULL,
  `SiteElectricityDemand` FLOAT NULL DEFAULT NULL,
  `DayPowerPrice` FLOAT NULL DEFAULT NULL,
  `SiteHeatDemand` FLOAT NULL DEFAULT NULL,
  `ImportElectricity` FLOAT NULL DEFAULT NULL,
  `ExportElectricity` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_powerdata_organisations1_idx` (`organisationId` ASC) VISIBLE,
  CONSTRAINT `fk_powerdata_organisations1`
    FOREIGN KEY (`organisationId`)
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


-- -----------------------------------------------------
-- Table `e2s`.`insights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e2s`.`insights` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `organisationId` INT(11) NOT NULL,
  `type` VARCHAR(45) NOT NULL DEFAULT '\"\"',
  `text` MEDIUMTEXT NULL DEFAULT '\"\"',
  PRIMARY KEY (`id`),
  INDEX `fk_powerdata_organisations1_idx` (`organisationId` ASC) VISIBLE,
  CONSTRAINT `fk_powerdata_organisations10`
    FOREIGN KEY (`organisationId`)
    REFERENCES `e2s`.`organisations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


insert into authorities (name) values ("User");
insert into authorities (name) values ("Admin");
insert into authorities (name) values ("Super Admin");

insert into organisations (name,logo, facilityName) values ("TestOrg1","Testimg.png", "Abacws");
insert into organisations (name,logo, facilityName) values ("TestOrg2","Testimg.png", "Abacws");

insert into users (name,email,password,authorityId,organisationId) values ("Seb","seb@email.com","$2a$12$lhy3gdLMAlhdIgXh3etcrOcPQmzVzffqUk4Tw3NEhvQ8eK8l4N3Wu",1,1);
insert into users (name,email,password,authorityId,organisationId) values ("Sam","sam@email.com","$2a$12$lhy3gdLMAlhdIgXh3etcrOcPQmzVzffqUk4Tw3NEhvQ8eK8l4N3Wu",2,1);
insert into users (name,email,password,authorityId,organisationId) values ("Sam2","sam2@email.com","$2a$12$IiRb3RdMSK4/nvfkyXkecuVtIUlwEdMLcB/3u/fstWm6Uuj5RoBWa",3,2);

insert into emaillinks (userId, weekly, monthly, yearly) values (1,0,0,0);
insert into emaillinks (userId, weekly, monthly, yearly) values (2,0,0,0);
insert into emaillinks (userId, weekly, monthly, yearly) values (3,0,0,0);

insert into insights (organisationId, type, text) values (1, "costs", "Considering your energy prices forecasts, your CHP units should be ran into thermal led mode. This could help you save £20k on your energy bills and 3 tCO2e.");
insert into insights (organisationId, type, text) values (1, "energy-imported", "Last month, your electricity consumption increased by 20% compared to your baseline.");
insert into insights (organisationId, type, text) values (1, "energy-exported", "You have exported 5,000 kWh this week. This is the equivalent of £2,000. By running your CHP units at maximum load, you could have exported an additional 6,000 kWh and increase your revenues by £3,000.");
insert into insights (organisationId, type, text) values (1, "co2-emissions", "Your carbon emissions have decreased by 10% for the past week compared to the week before.");

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
