/** 파일 생성자 : 임성준
 * 임성준
 * - 상담신청 라우트 연결
 *
 * 오자현
 * - 데이터베이스 연동
 * - 게시판 관련 라우트 연결
 *
 * 이석재
 * - nas의 mysql 컨테이너와 연결 설정 및 회원 라우트 연결
 * - 회원관리 라우트 연결
 * - 학부 추천 관리 라우트 연결
 * */
const express = require("express");
const http = require("http");
const mysql = require("mysql2");
const cors = require("cors");
const { dbconfig } = require('./config');

const app = express();
const server = http.createServer(app);

// CORS 설정 추가
app.use(cors());
// JSON 파싱 미들웨어에 크기 제한 설정
app.use(express.json({ limit: '50mb' })); // 요청 본문 크기를 50MB로 제한
app.use(express.urlencoded({ limit: '50mb', extended: true })); // URL 인코딩된 데이터도 동일하게 설정

// MySQL 연결 설정
const mysqlconnection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
});

// MySQL 연결 체크
mysqlconnection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err.message);
  } else {
    console.log("MySQL connection successful");
  }
});

// mysqlconnection 객체를 모듈로 내보내기
module.exports = mysqlconnection;

// 라우트 설정
const todaymenuRoutes = require('./db/food/todayMenuDB');
const memberRoutes = require('./db/member/memberDB');
const memberAdminRoutes = require('./db/member/memberAdminDB');
const boardRoutes = require('./db/board/boardDB');
const boardTempRoutes = require('./db/board/boardTempBoardDB'); 
const boardLikeRoutes = require('./db/board/boardLikedDB'); 
const boardCommentRoutes = require('./db/board/boardCommentDB'); 
const boardReportRoutes = require('./db/board/boardReportDB'); 
const deptRecAdminRoutes = require('./db/dept/deptRecAdminDB');
const consultationRoutes = require('./db/counsel/consultationDB')
const deptRecRoutes = require('./db/dept/deptRecDB');
const galleryRoutes = require('./db/gallery/galleryDB');
const galleryAdminRoutes = require('./db/gallery/galleryAdminDB');
const memberInfoRoutes = require('./db/counsel/memberInfoDB')
app.use('/board', boardRoutes);
app.use('/member', memberRoutes);
app.use('/memberAdmin', memberAdminRoutes);
app.use('/boardTemp', boardTempRoutes);
app.use('/boardLike', boardLikeRoutes);
app.use('/deptrecadmin', deptRecAdminRoutes);  // 학부 추천 관리 라우트를 '/deptrec' 경로로 사용
app.use('/boardComment', boardCommentRoutes);
app.use('/boardReport', boardReportRoutes);
app.use('/food', todaymenuRoutes);
app.use('/consultation', consultationRoutes)
app.use('/deptrec', deptRecRoutes);
app.use('/gallery', galleryRoutes);
app.use('/galleryAdmin', galleryAdminRoutes);
app.use('/memberInfo', memberInfoRoutes)


// 서버 시작
server.listen(4000, () => {
  // console.log("서버가 4000번 포트에서 실행 중입니다.");
});

// 서버와 프론트 연결체크
app.get('/healthCheck', (req, res) => {
  console.log("Connected to Frontend: Health Check Success");
  res.status(200).json({ message: '서버가 정상적으로 작동 중입니다!' });
});
