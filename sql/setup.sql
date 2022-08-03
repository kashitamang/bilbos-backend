-- -- Use this file to define your SQL tables
-- -- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS authors_books CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    released VARCHAR
);

INSERT INTO books (title, released) VALUES
  ('ALL THE WHITE SPACES', '2022'),
  ('AND THEN I WOKE UP', '2022'),
  ('THE BLACK MAYBE LIMINAL TALES', '2022'),
  ('BOYS BEASTS AND MEN', '2022'),
  ('INSOMNIA', '2022'),
  ('DEVIL HOUSE', '2022'),
  ('QUANTUM OF NIGHTMARES', '2022'),
  ('THE PATH OF THORNS', '2022'),
  ('THE PALLBEARERS CLUB', '2022'),
  ('THE LAST STORM', '2022');

CREATE table authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR,
  dob VARCHAR,
  pob VARCHAR
);

INSERT INTO authors (name, dob, pob) VALUES
('Ally Wilkes', '1988', 'California'),
('Malcolm Devlin', '1967', 'Oregon'),
('Attila Veres', '1946', 'Washington'),
('Sam J. Miller', '1943', 'Idaho'),
('Sarah Pinborough', '1958', 'Utah'),
('John Darnielle', '1964', 'Texas'),
('Charles Stross', '2021', 'New York'),
('Amos Amostein', '1967', 'New Jersey'),
('Me Me Me', '1092', 'Doonberg'),
('Everybody Else', '1992', 'La La Land');

CREATE TABLE authors_books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author_id BIGINT,
  book_id BIGINT,
  FOREIGN KEY (author_id) REFERENCES authors(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO authors_books (author_id, book_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (6, 6),
  (7, 7),
  (8, 8),
  (9, 9),
  (10, 10);


