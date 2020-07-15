-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `question_id` INTEGER NULL DEFAULT NULL,
  `question_body` VARCHAR NULL DEFAULT NULL,
  `question_date` DATE NULL DEFAULT NULL,
  `asker_name` VARCHAR NULL DEFAULT NULL,
  `question_helpfulness` INTEGER NULL DEFAULT NULL,
  `reported` INTEGER NULL DEFAULT NULL,
  `product_id` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`question_id`)
);

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answers` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `answer_id` INTEGER NULL DEFAULT NULL,
  `answer_body` VARCHAR NULL DEFAULT NULL,
  `answer_date` DATE NULL DEFAULT NULL,
  `answerer_name` VARCHAR NULL DEFAULT NULL,
  `answer_helpfulness` INTEGER NULL DEFAULT NULL,
  `question_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`answer_id`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `photo_url` VARCHAR NULL DEFAULT NULL,
  `answer_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `answers` ADD FOREIGN KEY (question_id) REFERENCES `questions` (`question_id`);
ALTER TABLE `photos` ADD FOREIGN KEY (answer_id) REFERENCES `answers` (`answer_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `questions` (`id`,`question_id`,`question_body`,`question_date`,`asker_name`,`question_helpfulness`,`reported`,`product_id`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `answers` (`id`,`answer_id`,`answer_body`,`answer_date`,`answerer_name`,`answer_helpfulness`,`question_id`) VALUES
-- ('','','','','','','');
-- INSERT INTO `photos` (`id`,`photo_url`,`answer_id`) VALUES
-- ('','','');