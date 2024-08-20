/** 파일 생성자 : 오자현
 *  testdb 모듈화
 *
 * */const express = require('express');
const router = express.Router(); // Express 라우터 객체 생성
const mysqlconnection = require("../server"); // server.js에서 MySQL 연결 객체 가져오기

// 데이터베이스에 데이터를 삽입하는 라우트
router.post("/testdb", (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send("ID 값이 필요합니다.");
    }

    const checkTableQuery = "SHOW TABLES LIKE 'test_table'";
    const createTableQuery = `
        CREATE TABLE test_table (
            id VARCHAR(255) PRIMARY KEY
        )
    `;
    const insertQuery = "INSERT INTO test_table (id) VALUES (?)";

    // 테이블이 존재하는지 확인
    mysqlconnection.query(checkTableQuery, (err, results) => {
        if (err) {
            console.error("테이블 확인 중 에러 발생:", err);
            return res.status(500).send("테이블 확인 중 오류가 발생했습니다.");
        }

        if (results.length === 0) {
            // 테이블이 존재하지 않는 경우 테이블 생성
            mysqlconnection.query(createTableQuery, (err) => {
                if (err) {
                    console.error("테이블 생성 중 에러 발생:", err);
                    return res.status(500).send("테이블 생성 중 오류가 발생했습니다.");
                }
                console.log("테이블이 생성되었습니다.");

                // 테이블 생성 후 데이터 삽입
                mysqlconnection.query(insertQuery, [id], (err, results) => {
                    if (err) {
                        console.error("데이터 삽입 중 에러 발생:", err);
                        return res.status(500).send("데이터 삽입 중 오류가 발생했습니다.");
                    }
                    console.log("데이터가 성공적으로 저장되었습니다.");
                    res.send("데이터 추가 성공!");
                });
            });
        } else {
            // 테이블이 이미 존재하는 경우 데이터 삽입
            mysqlconnection.query(insertQuery, [id], (err, results) => {
                if (err) {
                    console.error("데이터 삽입 중 에러 발생:", err);
                    return res.status(500).send("데이터 삽입 중 오류가 발생했습니다.");
                }
                console.log("데이터가 성공적으로 저장되었습니다.");
                res.send("데이터 추가 성공!");
            });
        }
    });
});

module.exports = router; // 라우터 객체 내보내기
