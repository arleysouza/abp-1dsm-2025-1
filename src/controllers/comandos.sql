DROP TABLE IF EXISTS room_has_course;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS professor;
DROP TABLE IF EXISTS degree;

CREATE TABLE degree (
  iddegree SERIAL NOT NULL,
  name VARCHAR(50) NOT NULL,
  period VARCHAR(20) NOT NULL,
  PRIMARY KEY(iddegree)
);

CREATE TABLE professor (
  idprofessor SERIAL NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY(idprofessor)
);

CREATE TABLE users (
  iduser SERIAL NOT NULL,
  name VARCHAR(100) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY(iduser)
);

CREATE TABLE room (
  idroom SERIAL NOT NULL,
  number INTEGER NOT NULL,
  level INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL,
  description VARCHAR(255) NULL,
  PRIMARY KEY(idroom)
);

CREATE TABLE course (
  idcourse SERIAL NOT NULL,
  idprofessor INTEGER NOT NULL,
  iddegree INTEGER NOT NULL,
  name VARCHAR(50) NULL,
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

CREATE TABLE room_has_course (
  idroom INTEGER NOT NULL,
  idcourse INTEGER NOT NULL,
  begin TIME NOT NULL,
  finish TIME NOT NULL,
  day_of_week VARCHAR(20) NOT NULL,
  PRIMARY KEY(idroom, idcourse),
  FOREIGN KEY(idroom)
    REFERENCES room(idroom)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(idcourse)
    REFERENCES course(idcourse)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

