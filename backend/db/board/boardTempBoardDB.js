/**파일 생성자 : 오자현
 *  게시판 임시저장 등록, 읽기, 삭제기능 
*/

const express = require("express");
const router = express.Router(); // Express 라우터 객체 생성
const mysqlconnection = require("../../server"); // server.js에서 MySQL 연결 객체 가져오기


// 임시 저장 데이터 읽기
router.post("/read", (req, res) => {
    // console.log("임시저장 읽기 요청");
    const { userId } = req.body;

    const readTempDataQuery = "SELECT * FROM board_temp WHERE board_writer = ?";

    mysqlconnection.query(readTempDataQuery, [userId], (err, result) => {
        if (err) {
            // console.error("임시저장 데이터를 읽는 중 에러 발생", err);
            return res.status(500).send("임시저장 데이터를 불러오는 중 에러 발생");
        }

        // 임시 저장된 데이터가 없는 경우 404반환
        if (result.length === 0) {
            return res.status(404).json({ message: "임시 저장된 데이터가 없습니다." });
        }
        // 임시 저장된 데이터가 있을 경우 반환
        res.json({ tempData: result[0], message: "임시 저장된 데이터를 성공적으로 불러왔습니다." });
    });
});


// 임시 저장 데이터 체크
router.post("/checkTempData", (req, res) => {
    // console.log("checkTempData");
    const { userId } = req.body;

    const checkTempDataQuery = "SELECT * FROM board_temp where board_writer = ?";
    mysqlconnection.query(checkTempDataQuery, [userId], (err, result) => {
        if (err) {
            // console.error("체크 중 에러", err);
            return res.status(500).send("체크 중 에러 발생");
        }

        if (result.length === 0) {
            // console.log("임시저장 데이터 없음");
            return res.json({ hasTempData: false, message: "임시저장데이터가 없습니다." });
        } else {
            // console.log("임시저장 데이터 있음");
            return res.json({ hasTempData: true, tempData: result[0], message: "임시저장데이터가 있습니다." });
        }
    });
});


// 임시 저장 데이터 삭제
router.delete("/delete", (req, res) => {
    // console.log("임시 저장 데이터 삭제 요청");
    const { userId } = req.body;
    
    const deleteboard_tempQuery = "DELETE FROM board_temp WHERE board_writer = ?";

    mysqlconnection.query(deleteboard_tempQuery, [userId], (err, result) => {
        if (err) {
            // console.error("임시 데이터 삭제 중 에러:", err);
            return res.status(500).send("임시 데이터 삭제 중 에러 발생");
        }

        if (result.affectedRows === 0) {
            // console.log("삭제할 데이터가 없습니다.");
            return res.status(404).send("해당 작성자의 임시 저장된 데이터가 없습니다.");
        }
        // console.log("데이터가 성공적으로 삭제되었습니다.");
        res.send("임시 저장된 데이터가 성공적으로 삭제되었습니다.");
    });
});



// 임시 저장 데이터 저장
router.post("/save", (req, res) => {
    const { board_title, board_content, board_writer } = req.body;
    // console.log("req.body", req.body);

    // 제목과 내용이 비어있다면 저장하지 않고 응답을 반환
    if(!board_title && !board_content){
        return res.status(400).send("저장할 데이터가 없습니다.") 
    }

    // 먼저 데이터가 존재하는지 확인하는 쿼리
    const checkboard_tempQuery = `SELECT * FROM board_temp WHERE board_writer = ?`;

    mysqlconnection.query(checkboard_tempQuery, [board_writer], (err, result) => {
        if (err) {
            // console.error("임시저장 데이터 확인 중 에러", err);
            return res.status(500).send("데이터 확인 중 에러 발생");
        }

        if (result.length > 0) {
            // 데이터가 존재하면 UPDATE
            const updateboard_tempQuery = `
                UPDATE board_temp 
                SET board_title = ?, board_content = ? 
                WHERE board_writer = ?`;

            mysqlconnection.query(updateboard_tempQuery, [board_title, board_content, board_writer], (err, result) => {
                if (err) {
                    // console.error("임시저장 중 에러", err);
                    return res.status(500).send("임시저장 중 에러 발생");
                }
                // console.log("업데이트 성공");
                res.send("임시저장 업데이트 성공");
            });
        } else {
            // 데이터가 없으면 INSERT
            const insertboard_tempQuery = `
                INSERT INTO board_temp (board_title, board_content, board_writer) 
                VALUES (?, ?, ?)`;

            mysqlconnection.query(insertboard_tempQuery, [board_title, board_content, board_writer], (err, result) => {
                if (err) {
                    // console.error("임시저장 중 에러", err);
                    return res.status(500).send("임시저장 중 에러 발생");
                }
                // console.log("임시저장 성공");
                res.send("임시저장 성공");
            });
        }
    });
});


module.exports = router;
