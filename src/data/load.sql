TRUNCATE room_has_course, course, room, professor, degree;

COPY degree
  FROM 'D:\pessoal\fatec\jacarei\DSM\Algoritmos\abp\2025-1\server\src\data/degree.csv'
  WITH (
  FORMAT csv,
  DELIMITER ';',
  HEADER,
  NULL 'NULL'
);

COPY room
  FROM 'D:\pessoal\fatec\jacarei\DSM\Algoritmos\abp\2025-1\server\src\data/room.csv'
  WITH (
  FORMAT csv,
  DELIMITER ';',
  HEADER,
  NULL 'NULL'
);

COPY professor
  FROM 'D:\pessoal\fatec\jacarei\DSM\Algoritmos\abp\2025-1\server\src\data/professor.csv'
  WITH (
  FORMAT csv,
  DELIMITER ';',
  HEADER,
  NULL 'NULL'
);

COPY course
  FROM 'D:\pessoal\fatec\jacarei\DSM\Algoritmos\abp\2025-1\server\src\data/course.csv'
  WITH (
  FORMAT csv,
  DELIMITER ';',
  HEADER,
  NULL 'NULL'
);

COPY room_has_course
  FROM 'D:\pessoal\fatec\jacarei\DSM\Algoritmos\abp\2025-1\server\src\data/room_has_course.csv'
  WITH (
  FORMAT csv,
  DELIMITER ';',
  HEADER,
  NULL 'NULL'
);