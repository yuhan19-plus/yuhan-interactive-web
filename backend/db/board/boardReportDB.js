/** 
 * 파일 생성자 - 오자현
 * 게시글 신고 백엔드 코드
 * 
 * 기능 구현 - 오자현
 * - 신고 저장, 수정, 삭제(상태업데이트)기능
 */
const express = require("express");
const router = express.Router(); // Express 라우터 객체 생성
const mysqlconnection = require("../../server"); // server.js에서 MySQL 연결 객체 가져오기

// 신고 저장
router.post("/save", (req, res) => {
    const { board_id, report_writer, report_content, report_type } = req.body;  // URL에서 boardID와 userId를 추출
    // console.log("신고저장요청", board_id, "회원id", report_writer, "신고내용", report_content, "신고종류", report_type)
    const reportSaveQuery = "INSERT INTO board_report (report_writer, board_id, report_type, report_content, report_date) VALUES (?, ?, ?, ?, NOW())"

    mysqlconnection.query(reportSaveQuery, [report_writer, board_id, report_type, report_content], (err, result) => {
        if (err) {
            // console.error("신고 중 에러발생", err);
            return res.status(500).json({ message: "신고 중 에러가 발생" });
        }
        res.send("신고완료")
    })

})

// 신고목록
router.get("/fetch", (req, res) => {
    const fetchQuery = "SELECT * FROM board_report";
    mysqlconnection.query(fetchQuery, (err, result) => {
        if (err) {
            // console.error("신고내역 불러오는 중 에러발생", err);
            return res.status(500).json({ message: "신고내역 불러오는 중 에러가 발생" });
        }
        res.send(result)
    })
})

// 신고조회
router.get("/fetch/:reportID", (req, res) => {
    const report_id = req.params.reportID;
    
    const reportAndBoardQuery = "SELECT r.*, b.* FROM board_report r JOIN board b ON r.board_id = b.board_id WHERE r.report_id = ?";

    mysqlconnection.query(reportAndBoardQuery, [report_id], (err, results) => {
        if (err) {
            // console.error("데이터 조회 중 에러 발생", err);
            return res.status(500).json({ message: "데이터 조회 중 에러가 발생했습니다." });
        }

        res.status(200).json({
            reportData: results[0], // 결과를 JSON으로 응답
        });
    });
});

// 신고삭제 
router.post("/delete", (req, res) => {
    // console.log("삭제요청진입성공")
    const { board_id, report_id, report_resolution } = req.body;
    // console.log("게시판id", board_id, "신고id", report_id, "신고내용", report_resolution);

    const boardDeleteQuery = "UPDATE board SET board_status = 'delete' WHERE board_id = ?"
    const reportDeleteQuery = "UPDATE board_report SET report_resolution = ?, report_status = 'delete', resolved_at = NOW()  WHERE report_id= ?"

    mysqlconnection.query(boardDeleteQuery, [board_id], (err, result) => {
        if (err) {
            // console.error("게시판 삭제 처리 중 에러 발생", err);
            return res.status(500).json({ message: "게시판 삭제 처리 중 에러가 발생했습니다." });
        } else {
            mysqlconnection.query(reportDeleteQuery, [report_resolution, report_id], (err, result) => {
                if (err) {
                    // console.error("신고 삭제 처리 중 에러 발생", err);
                    return res.status(500).json({ message: "신고 삭제 처리 중 에러가 발생했습니다." });
                } else {
                    return res.status(200).json({ message: "신고 삭제 처리 완료" });
                }
            });
        }
    });

})

// 신고무시
router.post("/ignore", (req, res) => {
    const { report_id, report_resolution } = req.body;
    // console.log("신고id", report_id, "신고내용", report_resolution);

    const reportIgnoreQuery = "UPDATE board_report SET report_resolution = ?, report_status = 'ignore', resolved_at = NOW()  WHERE report_id= ?"

    mysqlconnection.query(reportIgnoreQuery, [report_resolution, report_id], (err, result) => {
        if (err) {
            // console.error("신고 무시 처리 중 에러 발생:", err);
            return res.status(500).json({ message: "신고 무시 처리 중 에러가 발생했습니다." });
        } else {
            return res.status(200).json({ message: "신고 무시 처리 완료" });
        }
    });
})


// 신고로 삭제된 경우 사유
router.post("/check/:boardId", (req, res) => {
    const { boardId } = req.params;  // URL에서 boardID를 추출
    // console.log("삭제여부확인 요청 진입, boardId", boardId)
    
    const checkBoardDeleteQuery = "select board_status from board where board_id = ?"
    const checkReportQuery = "select * from board_report where board_id = ? AND report_status = 'delete'"

    mysqlconnection.query(checkBoardDeleteQuery, [boardId], (err, result) => {
        if (err) {
            // console.error("게시판 상태 확인 중 에러 발생:", err);
            return res.status(500).json({ message: "게시판 상태 확인 중 오류가 발생했습니다." }); // 500 상태 코드와 함께 오류 메시지 반환
        }
        if (result[0].board_status === 'delete') {
            // console.log("게시글이 삭제된 상태")
            mysqlconnection.query(checkReportQuery, [boardId], (err, results) => {
                if (err) {
                    // console.error("게시판 신고 후 삭제 확인 중 에러 발생:", err);
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

// 뱃지
router.get("/fetchBadge", (req, res) => {
    const badgeNumQuery = "SELECT COUNT(*) AS badge_count FROM board_report WHERE report_status = 'Waiting'";

    mysqlconnection.query(badgeNumQuery, (err, result) => {
        if (err) {
            // console.error("게시판 신고 후 삭제 확인 중 에러 발생:", err);
            return res.status(500).json({ message: "게시판 신고 후 삭제 확인 중 오류가 발생했습니다." }); // 500 상태 코드와 함께 오류 메시지 반환
        }
        // 결과가 정상적으로 존재하는지 확인
        if (result && result.length > 0) {
            res.status(200).json({
                badge: result[0].badge_count // badge_count 값 반환
            });
        } else {
            res.status(200).json({
                badge: 0 // 결과가 없으면 0 반환
            });
        }
        // console.log("뱃지 개수:", result[0].badge_count);
    })

})

module.exports = router; // 라우터 객체 내보내기