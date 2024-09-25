/** 파일 생성자 : 오자현
 *  reportdb 모듈화
 *  신고 저장, 수정, 삭제(상태업데이트)기능
 * */
const express = require("express");
const router = express.Router(); // Express 라우터 객체 생성
const mysqlconnection = require("../server"); // server.js에서 MySQL 연결 객체 가져오기

// 댓글 저장
router.post("/save", (req, res) => {
    // console.log(req)
    const { board_id, report_writer, report_content, report_type } = req.body;  // URL에서 boardID와 userId를 추출
    console.log("신고저장요청", board_id, "회원id", report_writer, "신고내용", report_content, "신고종류", report_type)
    const reportSaveQuery = "INSERT INTO report (report_writer, board_id, report_type, report_content, report_date) VALUES (?, ?, ?, ?, NOW())"

    mysqlconnection.query(reportSaveQuery, [report_writer, board_id, report_type, report_content], (err, result) => {
        if (err) {
            console.error("신고 중 에러발생", err);
            return res.status(500).json({ message: "신고 중 에러가 발생" });
        }
        res.send("신고완료")
    })

})

router.get("/fetch", (req, res) => {
    const fetchQuery = "SELECT * FROM report";
    mysqlconnection.query(fetchQuery, (err, result) => {
        if (err) {
            console.error("신고내역 불러오는 중 에러발생", err);
            return res.status(500).json({ message: "신고내역 불러오는 중 에러가 발생" });
        }
        res.send(result)
    })
})

router.get("/fetch/:reportID", (req, res) => {
    const report_id = req.params.reportID;
    // console.log(report_id)
    const reportAndBoardQuery = "SELECT r.*, b.* FROM report r JOIN board b ON r.board_id = b.board_id WHERE r.report_id = ?";

    mysqlconnection.query(reportAndBoardQuery, [report_id], (err, results) => {
        if (err) {
            console.error("데이터 조회 중 에러 발생", err);
            return res.status(500).json({ message: "데이터 조회 중 에러가 발생했습니다." });
        }

        res.status(200).json({
            reportData: results[0], // 결과를 JSON으로 응답
        });
    });
});

// 신고삭제 
// 해야할 것 게시판을 삭제된 상태로 만들기
// report테이블의 resolved_at을 현시간으로 report_status는 완료로 변경하고 report_resolution에 사유적을것
router.post("/delete", (req, res) => {
    console.log("삭제요청진입성공")
    const { board_id, report_id, report_resolution } = req.body;
    console.log("게시판id", board_id, "신고id", report_id, "신고내용", report_resolution);
    const boardDeleteQuery = "UPDATE board SET board_status = 'delete' WHERE board_id = ?"
    const reportDeleteQuery = "UPDATE report SET report_resolution = ?, report_status = 'delete', resolved_at = NOW()  WHERE report_id= ?"

    mysqlconnection.query(boardDeleteQuery, [board_id], (err, result) => {
        if (err) {
            console.error("게시판 삭제 처리 중 에러 발생", err);
            return res.status(500).json({ message: "게시판 삭제 처리 중 에러가 발생했습니다." });
        } else {
            mysqlconnection.query(reportDeleteQuery, [report_resolution, report_id], (err, result) => {
                if (err) {
                    console.error("신고 삭제 처리 중 에러 발생", err);
                    return res.status(500).json({ message: "신고 삭제 처리 중 에러가 발생했습니다." });
                } else {
                    return res.status(200).json({ message: "신고 삭제 처리 완료" });
                }
            });
        }
    });

})

// 신고무시
// 해야할 것 report테이블의 resolved_at을 현시간으로 report_status는 완료로 변경하고 report_resolution에 사유적을것
router.post("/ignore", (req, res) => {
    console.log("무시요청진입성공")
    const { report_id, report_resolution } = req.body;
    console.log("신고id", report_id, "신고내용", report_resolution);
    const reportIgnoreQuery = "UPDATE report SET report_resolution = ?, report_status = 'ignore', resolved_at = NOW()  WHERE report_id= ?"

    // MySQL 쿼리 실행
    mysqlconnection.query(reportIgnoreQuery, [report_resolution, report_id], (err, result) => {
        if (err) {
            console.error("신고 무시 처리 중 에러 발생:", err);
            return res.status(500).json({ message: "신고 무시 처리 중 에러가 발생했습니다." });
        } else {
            return res.status(200).json({ message: "신고 무시 처리 완료" });
        }
    });
})

// 게시판id를 받아서 먼저 테이블이 삭제여부를 확인 -> 신고테이블에 삭제처리되었는지 확인 -> 삭제처리인 경우 그 데이터를 하단에 출력 
// 삭제랑 관련된 것이니까 삭제쪽으로 보내기
// 삭제여부체크
router.post("/check/:boardId", (req, res) => {
    const { boardId } = req.params;  // URL에서 boardID를 추출
    // console.log("삭제여부확인 요청 진입, boardId", boardId)
    const checkBoardDeleteQuery = "select board_status from board where board_id = ?"
    const checkReportQuery = "select * from report where board_id = ? AND report_status = 'delete'"

    mysqlconnection.query(checkBoardDeleteQuery, [boardId], (err, result) => {
        if (err) {
            console.error("게시판 상태 확인 중 에러 발생:", err);
            return res.status(500).json({ message: "게시판 상태 확인 중 오류가 발생했습니다." }); // 500 상태 코드와 함께 오류 메시지 반환
        }
        if (result[0].board_status === 'delete') {
            // console.log("게시글이 삭제된 상태")
            mysqlconnection.query(checkReportQuery, [boardId], (err, results) => {
                if (err) {
                    console.error("게시판 신고 후 삭제 확인 중 에러 발생:", err);
                    return res.status(500).json({ message: "게시판 신고 후 삭제 확인 중 오류가 발생했습니다." }); // 500 상태 코드와 함께 오류 메시지 반환
                }
                res.status(200).json({
                    reportData: results[0], // 결과를 JSON으로 응답
                });

                // console.log(results)
            })
        }
        else {
            res.status(200).json({ message: "게시판이 삭제상태가 아닙니다." })
        }
    })
})


module.exports = router; // 라우터 객체 내보내기