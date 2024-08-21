/** 파일 생성자 : 임성준
 *
 * 초기 연결셋팅 : 오자현
 * 시작방법 터미널에 node server.js 입력
 *
 * */
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// CORS 설정 추가
app.use(cors());
app.use(express.json()); // JSON 파싱 미들웨어

// MySQL 연결 설정
const mysqlconnection = mysql.createConnection({
  host: "localhost",
  user: "tester",
  password: "1234",
  database: "test1234",
});

// MySQL 연결 체크
mysqlconnection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err.message);
  } else {
    console.log("MySQL 연결 성공");
  }
});

// mysqlconnection 객체를 모듈로 내보내기
module.exports = mysqlconnection;

// testdb.js 라우트 가져오기
const testdbRoutes = require('./models/testdb');
app.use('/', testdbRoutes); // 해당 라우트를 기본 경로로 사용

// 클라이언트 연결 처리
io.on("connection", (socket) => {
  console.log("새 클라이언트 연결됨:", socket.id);

  // 클라이언트 연결 끊김 처리
  socket.on("disconnecting", () => {
    console.log("연결 끊어지는 중");
  });

  // 클라이언트 연결 종료 처리
  socket.on("disconnect", () => {
    console.log("연결 끊어짐");
  });
});

// 서버 시작
server.listen(4000, () => {
  console.log("서버가 4000번 포트에서 실행 중입니다.");
});
