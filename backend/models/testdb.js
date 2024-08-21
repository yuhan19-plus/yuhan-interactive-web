/** 파일 생성자 : 오자현
 *  testdb 모듈화
 * 저장, 조회기능
 * */
const express = require("express");
const router = express.Router(); // Express 라우터 객체 생성
const mysqlconnection = require("../server"); // server.js에서 MySQL 연결 객체 가져오기

// 데이터베이스에 데이터를 삽입하는 라우트
router.post("/testdb", (req, res) => {
  //   console.log(req); 체크용
  const { text } = req.body;

  if (!text) {
    return res.status(400).send("Text 값이 필요합니다.");
  }

  const checkTableQuery = "SHOW TABLES LIKE 'test_table'";
  const createTableQuery = `
        CREATE TABLE test_table (
            ID_num INT AUTO_INCREMENT PRIMARY KEY,
            text VARCHAR(255) 
        )
    `;
  const insertQuery = "INSERT INTO test_table (text) VALUES (?)";

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
        mysqlconnection.query(insertQuery, [text], (err, results) => {
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
      mysqlconnection.query(insertQuery, [text], (err, results) => {
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

router.get("/testdb", (req, res) => {
  const selectQuery = "SELECT * FROM test_table";
  const checkTableQuery = "SHOW TABLES LIKE 'test_table'";
  const { text } = req.body;
  // 테이블이 존재하는지 확인 후 있으면 실행 없으면 없다고 알림
  mysqlconnection.query(checkTableQuery, (err, results) => {
    if (err) {
      console.error("테이블 확인 중 에러 발생:", err);
      return res.status(500).send("테이블 확인 중 오류가 발생했습니다.");
    }
    if (results.length === 0) {
      console.log("테이블이 없습니다.");
      return res.status(404).send("테이블이 존재하지 않습니다."); // 404에러 반환
    } else {
      mysqlconnection.query(selectQuery, (err, results) => {
        if (err) {
          console.error("테이블 검색 중 에러 발생:", err);
          return res.status(500).send("테이블 검색 중 오류가 발생했습니다."); // 500 상태 코드와 함께 오류 메시지 반환
        }
        console.log("테이블이 검색되었습니다.", results);
        res.json(results); // 클라이언트에게 쿼리 결과를 JSON 형식으로 반환
      });
    }
  });
});

router.put("/testdb/:index", (req, res) => {
  const index = req.params.index; // URL에서 index 추출
  const { text } = req.body; // 요청의 본문에서 업데이트할 텍스트를 가져옴
  console.log("index:", index); // index 확인
  console.log("text:", text); // 업데이트할 텍스트 확인
  if (!text) {
    return res.status(400).send("업데이트할 텍스트가 필요합니다."); // 텍스트가 없으면 400 에러 반환
  }
  const updateQuery = `UPDATE test_table SET text = ? WHERE ID_num = ?`;
  mysqlconnection.query(updateQuery, [text, index], (err, results) => {
    if (err) {
      console.error("테이블 수정 중 에러 발생:", err);
      return res.status(500).send("테이블 수정 중 오류가 발생했습니다.");
    }
    console.log("데이터가 성공적으로 업데이트되었습니다.");
    res.send("데이터 업데이트 성공!");
  });
});

router.delete("/testdb/:ID_num", (req, res) => {
  const ID_num = req.params.ID_num;
  const deleteQuery = `DELETE FROM test_table WHERE ID_num = ?`;

  mysqlconnection.query(deleteQuery, [ID_num], (err, results) => {
    if (err) {
      console.error("테이블 삭제 중 에러 발생:", err);
      return res.status(500).send("테이블 삭제 중 오류가 발생했습니다.");
    }

    if (results.affectedRows === 0) {
      console.log("삭제된 데이터가 없습니다.");
      return res.status(404).send("해당 ID_num을 가진 데이터가 없습니다.");
    }

    console.log("데이터가 성공적으로 삭제되었습니다.");
    res.send("데이터 삭제 성공!");
  });
});

module.exports = router; // 라우터 객체 내보내기
