
CREATE TABLE `answers` (
  `id` bigint(20) UNSIGNED NOT NULL ,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `text` varchar(255) NOT NULL,
  `checked` tinyint(1)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;