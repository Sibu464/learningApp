-- Insert questions into the 'question' table
INSERT INTO question (id, question_text, module_id_fk) VALUES
(1, 'What is a firewall used for?', 1),
(2, 'Which malware spreads itself?', 1),
(3, 'What does VPN stand for?', 1),
(4, 'What is phishing?', 1),
(5, 'How to secure data at rest?', 1);

-- Insert options into the 'option' table
INSERT INTO option (id, is_correct, option_text, question_id_fk) VALUES
-- For question 1
(false, 'Detect viruses', 1),
(true, 'Block access', 1),
(false, 'Encrypt data', 1),
(false, 'Backup data', 1),

-- For question 2
INSERT INTO option (is_correct, option_text, question_id_fk) VALUES
(false, 'Trojan', 2),
(true, 'Worm', 2),
(false, 'Spyware', 2),
(false, 'Adware', 2),

INSERT INTO option (is_correct, option_text, question_id_fk) VALUES
-- For question 3
( true, 'Virtual Private Network', 3),
( false, 'Verified Network', 3),
( false, 'Virtual Node', 3),
( false, 'Private Network', 3);

INSERT INTO option (is_correct, option_text, question_id_fk) VALUES
-- For question 4
( false, 'Bug exploit', 4),
( true, 'Fake emails', 4),
( false, 'Break in', 4),
( false, 'Guess passwords', 4);

-- For question 5
INSERT INTO option (is_correct, option_text, question_id_fk) VALUES
( true, 'Encryption', 5),
( false, 'Firewall', 5),
( false, 'Antivirus', 5),
( false, 'IDS', 5);
