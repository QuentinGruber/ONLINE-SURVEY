CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `mail` varchar(255) NOT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `registration_type` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;