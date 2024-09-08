/**파일 생성자 : 오자현
 *  tempboarddb 모듈화
 *  임시저장 등록, 읽기, 삭제기능 예정
*/

const express = require("express");
const router = express.Router(); // Express 라우터 객체 생성
const mysqlconnection = require("../server"); // server.js에서 MySQL 연결 객체 가져오기

// 임시 저장 데이터 읽기
router.post("/read", (req, res) => {

    console.log("임시저장읽기요청");
    res.send("임시저장읽기요청 완료");
});

// 임시 저장 데이터 체크
router.post("/checkTempData", (req, res) => {
    console.log("checkTempData");
    res.send("임시저장데이터 체크 완료");
});

// 임시 저장 데이터 삭제
router.delete("/delete", (req, res) => {
    console.log("delete");
    res.send("임시저장데이터 삭제 완료");
});

// 임시 저장 데이터 저장
router.post("/save", (req, res) => {
    const { board_title, board_content, board_writer } = req.body;
    console.log("req.body", req.body)

    const insertTempBoardQuery = `INSERT INTO tempboard (board_title, board_content, board_writer) VALUES (?, ?, ?)`;

    mysqlconnection.query(insertTempBoardQuery, [board_title, board_content, board_writer], (err, result) => {
        if (err) {
            console.error("임시저장 중 에러", err)
            res.status(500).send("임시저장 중 에러발생")
        }
        console.log("저장성공");
        res.send("임시저장 성공")
    })
});

module.exports = router;
