const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("users.db");

db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
)`);

// 비동기 -> 테이블 생성 전에 조회를 해서 error
// 모든 사용자 조회
db.all("SELECT * FROM users", (err, rows) => {
  if (err) throw err;
  console.log("1. 사용자 조회: ", rows);
});

// 새로운 사용자 생성(all - 배열)
const newUser = {
  username: "soohyun",
  email: "soohyun@naver.com",
};
db.run("INSERT INTO users (username, email) VALUES (?,?)", [newUser.username, newUser.email], (err) => {
  // 함수 안에서 this 재생성
  // ()=>{} 람다함수...this의 scope가 바깥쪽에 있음

  if (err) throw err;
  console.log(`삽입 성공: ${JSON.stringify(newUser)}, 삽입된 rowId: ${this.lastID}`);
});

// 특정 사용자 조회(get - 하나만)
const searchUserId = 1;
db.get("SELECT * FROM users WHERE id = ?", [searchUserId], (err, row) => {
  if (err) throw err;
  console.log("조회된 사용자: ", searchUserId, " : ", row); // 자동으로 알아서 파싱
  console.log(`조회된 사용자: ${searchUserId} : ${JSON.stringify(row)}`); // 안에 있는 toString 함수 사용
});

// 사용자 정보 업데이트
const updateUser = {
  id: 1,
  username: "kkk",
  email: "kkk@kkk.com",
};

db.run("UPDATE users SET username = ?, email = ? WHERE id = ?", [updateUser.username, updateUser.email, updateUser.id], (err) => {
  if (err) throw err;
  console.log("업데이트 완료");
});

// 사용자 삭제
const deleteUser = {
  id: 2,
};

db.run("DELETE FROM users WHERE id = ?", [deleteUser.id], (err) => {
  if (err) throw err;
  console.log("사용자 삭제 성공");
});

// 모든 사용자 조회
db.all("SELECT * FROM users", (err, rows) => {
  if (err) throw err;
  console.log("2. 사용자 조회: ", rows);
});
