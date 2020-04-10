CREATE TABLE `questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `forms_id` bigint(20) UNSIGNED NOT NULL ,
  `text` varchar(255) NOT NULL,
  `type` varchar(31) NOT NULL,
  `required` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;