const sqlite3 = require("sqlite3");

// const db = new sqlite3.Database("user2.db");
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  // 테이블 생성
  //   db.run("CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)");
  db.run("CREATE TABLE users (id INT, name TEXT)");

  // 데이터 삽입
  db.run('INSERT INTO users(id,name) VALUES (1,"Alice")');
  db.run('INSERT INTO users(id,name) VALUES (2,"Bob")');

  // prepared statement로 데이터 삽입하기
  const statement = db.prepare("INSERT INTO users VALUES (?,?)");
  statement.run(3, "User3");
  statement.run(4, "User4");
  statement.finalize();

  // 데이터 조회
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    console.log("조회된 데이터: ", rows);
  });

  db.each("SELECT * FROM users", (err, row) => {
    console.log("조회: ", row.id, row.name);
  });
});

// 끝날 때 db 종료
db.close((err) => {
  if (err) throw err;
  console.log("DB 연결 정상 종료");
});
// 프로그램이 종료되면 자동종료 되긴 하지만, 이렇게 종료시키는 게 좋은 습관임.
