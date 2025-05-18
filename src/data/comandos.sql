DROP TABLE IF EXISTS room_has_course;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS professor;
DROP TABLE IF EXISTS degree;

CREATE TABLE degree (
  iddegree SERIAL NOT NULL,
  name VARCHAR(50) NOT NULL,
  acronym VARCHAR(4) NOT NULL,
  period VARCHAR(20) NOT NULL,
  PRIMARY KEY(iddegree)
);

CREATE TABLE professor (
  idprofessor SERIAL NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY(idprofessor)
);

CREATE TABLE room (
  number INTEGER NOT NULL,
  level INTEGER NOT NULL,
  description VARCHAR(100) NOT NULL,
  PRIMARY KEY(number)
);

CREATE TABLE course (
  idcourse SERIAL NOT NULL,
  idprofessor INTEGER NOT NULL,
  iddegree INTEGER NOT NULL,
  name VARCHAR(100) NULL,
  semester INTEGER NULL,
  PRIMARY KEY(idcourse),
  FOREIGN KEY(iddegree)
    REFERENCES degree(iddegree)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(idprofessor)
    REFERENCES professor(idprofessor)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);


-- criar um tipo enumerado (ENUM) com os dias úteis
DROP TYPE IF EXISTS day_of_week_enum;
CREATE TYPE day_of_week_enum AS ENUM (
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira'
);

-- Para restringir o campo day_of_week usou-se o ENUM
CREATE TABLE room_has_course (
  room INTEGER NOT NULL,
  idcourse INTEGER NOT NULL,
  begin TIME NOT NULL,
  finish TIME NOT NULL,
  day_of_week day_of_week_enum NOT NULL,
  PRIMARY KEY (room, idcourse, day_of_week),
  FOREIGN KEY (room)
    REFERENCES room(number)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (idcourse)
    REFERENCES course(idcourse)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
