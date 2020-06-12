
INSERT INTO `users` (`username`, `mail`, `pass`, `registration_type`) VALUES ('maxime','maxime@maxon.surf', '123', '0');
INSERT INTO `users` (`username`, `mail`, `pass`, `registration_type`) VALUES ('quentin','kentin@zebi.surf', '456', '0');
INSERT INTO `users` (`username`, `mail`, `pass`, `registration_type`) VALUES ('aurelie','zebi@tg.com', 'nYvTSXCLpdWadoYxWRi72ziEuvJpkOPA0tX/iBOE7s/vuAGZuoWwZSGlKeWWp/3lYZPn9RQthRI=', '0');
INSERT INTO `users` (`username`, `mail`, `pass`, `registration_type`) VALUES ('laurent','laurent@tg.surf', '101', '1');
INSERT INTO `users` (`username`, `first_name`, `last_name`, `mail`, `pass`, `registration_type`) VALUES ('eauthier', 'Authier', 'Edith', 'edith.authier@gmail.com', '123456', '1');
INSERT INTO `users` (`username`, `first_name`, `last_name`, `mail`, `pass`, `registration_type`) VALUES ('llavoie', 'Lavois', 'Louis', 'louis.lavoie@gmail.com', '123456', '1');
INSERT INTO `users` (`id`, `username`, `first_name`, `last_name`, `mail`, `pass`, `registration_type`) VALUES (NULL, 'bmasson', 'Masson', 'Benoit', 'benoit.masson@gmail.com', '123456', '2');



INSERT INTO `forms` ( `users_id`, `begin`, `end`, `name`) VALUES ( '5', NULL, NULL, 'soirée');
INSERT INTO `questions` (`forms_id`, `text`, `type`, `required`) VALUES ( '1', 'Est ce que vous venez ?', 'radio', '1');
INSERT INTO `answers` (`question_id`, `text`) VALUES ('1', 'oui');
INSERT INTO `answers` (`question_id`, `text`) VALUES ('1', 'non');
INSERT INTO `questions` (`forms_id`, `text`, `type`, `required`) VALUES ( '1', 'A quelle heure ?', 'text', '0');

INSERT INTO `answers_users` ( `answers_id`, `question_id`, `text`, `user_id`) VALUES ('1', '1', '', '9');
INSERT INTO `answers_users` ( `answers_id`, `question_id`, `text`, `user_id`) VALUES ( '1', '1', '', '3');
INSERT INTO `answers_users` ( `answers_id`, `question_id`, `text`, `user_id`) VALUES ( '1', '1', '', '4');
INSERT INTO `answers_users` ( `answers_id`, `question_id`, `text`, `user_id`) VALUES ( '2', '1', '', '6');
INSERT INTO `answers_users` ( `question_id`, `text`, `user_id`) VALUES ( '2', '18h30', '3');
INSERT INTO `answers_users` ( `question_id`, `text`, `user_id`) VALUES ( '2', '18h45', '4');
INSERT INTO `answers_users` ( `question_id`, `text`, `user_id`) VALUES ( '2', '19h', '9');

INSERT INTO `forms` ( `users_id`, `begin`, `end`, `name`) VALUES ( '5', NULL, NULL, 'sims');
INSERT INTO `questions` (`forms_id`, `text`, `type`, `required`) VALUES ( '2', 'Vous jouez aux sims?', 'radio', '1');
INSERT INTO `answers` (`id`, `question_id`, `text`) VALUES (NULL, '2', 'oui');
INSERT INTO `answers` (`id`, `question_id`, `text`) VALUES (NULL, '2', 'non');

INSERT INTO `questions` (`forms_id`, `text`, `type`, `required`) VALUES ( '2', 'Vous aimez bien ?', 'radio', '0');
INSERT INTO `answers` (`id`, `question_id`, `text`) VALUES (NULL, '3', 'oui');
INSERT INTO `answers` (`id`, `question_id`, `text`) VALUES (NULL, '3', 'non');

INSERT INTO `answers_users` (`answers_id`, `question_id`, `text`, `user_id`) VALUES ( '3', '3', '','8');
INSERT INTO `answers_users` (`answers_id`, `question_id`, `text`, `user_id`) VALUES ( '4', '3', '', '3');
INSERT INTO `answers_users` (`answers_id`, `question_id`, `text`, `user_id`) VALUES ('6', '4', '', '3');
INSERT INTO `answers_users` (`answers_id`, `question_id`, `text`, `user_id`) VALUES ( '5', '4', '', '8');