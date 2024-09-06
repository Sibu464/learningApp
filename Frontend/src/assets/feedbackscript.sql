-- Insert feedback into the 'feedback' table
INSERT INTO feedback (id, feedback_text, question_id_fk) VALUES
-- For question 1
(1, 'That''s not correct. A firewall''s main role is to monitor and block unauthorized access to or from a network.', 1),

-- For question 2
(2, 'Incorrect. A worm is designed to replicate itself and spread to other computers.', 2),

-- For question 3
(3, 'That''s not right. VPN stands for Virtual Private Network.', 3),

-- For question 4
(4, 'That''s not correct. The Principle of Least Privilege ensures users have only the access they need to perform their tasks.', 4),

-- For question 5
(5, 'Incorrect. Phishing involves sending fraudulent emails to obtain sensitive information.', 5),

-- For question 6
(6, 'That''s not right. Data encryption is a common method to secure data at rest.', 6),

-- For question 7
(7, 'Incorrect. A penetration test is conducted to assess the security of a system by simulating an attack.', 7),

-- For question 8
(8, 'That''s not correct. Patching involves identifying and addressing security vulnerabilities.', 8),

-- For question 9
(9, 'Incorrect. The main goal of an IDS is to detect and alert on potential security threats or breaches.', 9),

-- For question 10
(10, 'That''s not right. A strong password includes a mix of upper and lower case letters, numbers, and special characters.', 10);
