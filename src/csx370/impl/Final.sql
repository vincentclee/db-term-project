-- MySQL Script generated by MySQL Workbench
-- 07/17/14 22:44:39
-- Model: New Model    Version: 1.0
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
 UNIQUE `UserID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
 Unique `UserName` VARCHAR(200) NULL,
 UNIQUE `Email` VARCHAR(200) NULL,
  UNIQUE `DisplayName` VARCHAR(200) NULL,
  `Password` VARCHAR(100) NULL,
  `CookieID` VARCHAR(200) NULL,
  PRIMARY KEY (`UserID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `UserID_UNIQUE` ON `mydb`.`User` (`UserID` ASC);

CREATE UNIQUE INDEX `UserEmail_UNIQUE` ON `mydb`.`User` (`Email` ASC);

CREATE UNIQUE INDEX `UserName_UNIQUE` ON `mydb`.`User` (`UserName` ASC);

CREATE UNIQUE INDEX `CookieID_UNIQUE` ON `mydb`.`User` (`CookieID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`Project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Project` (
  `ProjectID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(200) NULL,
  `Description` VARCHAR(200) NULL,
  `StartDate` DATE NULL,
  `TargetDate` DATE NULL,
  `Manager` INT UNSIGNED NOT NULL,
  `Status` ENUM('Started','Not Started','Finished','In Progress') NULL DEFAULT 'Not Started',
  PRIMARY KEY (`ProjectID`),
  CONSTRAINT `Manager`
    FOREIGN KEY (`Manager`)
    REFERENCES `mydb`.`User` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `ProjectID_UNIQUE` ON `mydb`.`Project` (`ProjectID` ASC);

CREATE INDEX `Manager_idx` ON `mydb`.`Project` (`Manager` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`ProjectUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProjectUser` (
  `UserID` INT UNSIGNED NOT NULL,
  `ProjectID` INT UNSIGNED NOT NULL,
  `Commits` INT UNSIGNED NULL,
  `Contributions` DECIMAL(2,2) NULL,
  `Specialization` ENUM('Test','Backend','Frontend','Management') NULL,
  PRIMARY KEY (`ProjectID`),
  CONSTRAINT `UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `mydb`.`User` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ProjectID`
    FOREIGN KEY (`ProjectID`)
    REFERENCES `mydb`.`Project` (`ProjectID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `ProjectID_UNIQUE` ON `mydb`.`ProjectUser` (`ProjectID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`Task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Task` (
  `TaskID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Priority` ENUM('Low','Normal','High','Urgent') NULL DEFAULT 'Normal',
  `HasDependency` BOOLEAN NULL,
  `Deadline` TIMESTAMP NULL,
  `Title` VARCHAR(200) NULL,
  `Notes` VARCHAR(200) NULL,
  `Description` VARCHAR(200) NULL,
  `Scope` VARCHAR(200) NULL,
  `Status` ENUM('Queued', 'In Progress', 'Waiting', 'Blocked', 'Complete') NULL,
  PRIMARY KEY (`TaskID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `TaskID_UNIQUE` ON `mydb`.`Task` (`TaskID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`ProjectTask`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProjectTask` (
  `ProjectID` INT UNSIGNED NOT NULL,
  `TaskID` INT UNSIGNED NULL,
  PRIMARY KEY (`ProjectID`),
  CONSTRAINT `ProjectID`
    FOREIGN KEY ()
    REFERENCES `mydb`.`Project` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `TaskID`
    FOREIGN KEY ()
    REFERENCES `mydb`.`Task` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`UserTask`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`UserTask` (
  `UserID` INT UNSIGNED NULL,
  `TaskID` INT UNSIGNED NULL,
  CONSTRAINT `UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `mydb`.`User` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `TaskID`
    FOREIGN KEY (`TaskID`)
    REFERENCES `mydb`.`Task` (`TaskID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `UserID_idx` ON `mydb`.`UserTask` (`UserID` ASC);

CREATE INDEX `TaskID_idx` ON `mydb`.`UserTask` (`TaskID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`Log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Log` (
  `LogID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `RemoteAddr` VARCHAR(255) NULL,
  `RemoteHost` VARCHAR(255) NULL,
  `RemotePort` VARCHAR(255) NULL,
  `ServletPath` VARCHAR(255) NULL,
  `RequestType` VARCHAR(255) NULL,
  `RequestCookie` VARCHAR(255) NULL,
  `RequestTime` TIMESTAMP NULL,
  PRIMARY KEY (`LogID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `LogID_UNIQUE` ON `mydb`.`Log` (`LogID` ASC);


-- -----------------------------------------------------
-- Table `mydb`.`TaskDependencies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TaskDependencies` (
  `TaskID` INT UNSIGNED NOT NULL,
  `DependentTask` INT UNSIGNED NULL,
  PRIMARY KEY (`TaskID`),
  CONSTRAINT `TaskID`
    FOREIGN KEY (`TaskID`)
    REFERENCES `mydb`.`Task` (`TaskID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `DependentTask`
    FOREIGN KEY (`TaskID`)
    REFERENCES `mydb`.`Task` (`TaskID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
