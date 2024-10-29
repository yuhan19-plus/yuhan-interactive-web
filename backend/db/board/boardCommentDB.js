/** 파일 생성자 : 오자현
 *  게시물과 첨부파일등록, 수정, 삭제 기능
 * */
const express = require("express");
const router = express.Router(); // Express 라우터 객체 생성
const mysqlconnection = require("../../server"); // server.js에서 MySQL 연결 객체 가져오기

// 댓글 저장
router.post("/save", (req, res) => {
    const { boardID, userId, comment_content } = req.body;  // URL에서 boardID와 userId를 추출
    // console.log("댓글저장 게시판id", boardID, "회원id", userId, "댓글내용", comment_content)

    const commentSaveQuery = "INSERT INTO board_comment (board_id, comment_writer, comment_content, comment_date) VALUES (?, ?, ?, NOW())";

    mysqlconnection.query(commentSaveQuery, [boardID, userId, comment_content], (err, result) => {
        if (err) {
            // console.error("댓글 저장 중 에러발생", err);
            return res.status(500).json({ message: "댓글 저장 중 에러가 발생" });
        }
        res.json({ message: "댓글 저장 성공" });
    })

})

// 댓글 불러오기
router.get("/List/:boardID", (req, res) => {
    const { boardID } = req.params;  // URL에서 boardID를 추출
    // console.log("댓글 불러오기 게시판 id:", boardID);

    const commentListQuery = "SELECT * from board_comment where board_id = ?";

    mysqlconnection.query(commentListQuery, [boardID], (err, result) => {
        if (err) {
            // console.error("댓글 목록 불러오는 중 에러 발생:", err);
            return res.status(500).json({ message: "댓글 목록을 불러오는 중 에러가 발생했습니다." });
        }
        res.send(result);
    });
});


// 댓글 삭제
router.delete("/delete", (req, res) => {
    // console.log("req.params",req)
    const { commentId } = req.query;
    // console.log("요청진입체크 commentId", commentId)

    const commentDeleteQuery = "DELETE FROM board_comment WHERE comment_id =?;"
    mysqlconnection.query(commentDeleteQuery, [commentId], (err, result) => {
        if (err) {
            // console.error("댓글목록 불러오는 중 에러발생", err);
            return res.status(500).json({ message: "댓글목록 읽어들이는 중 에러가 발생" });
        }
        res.json({ message: "댓글목록 불러오기 성공" })
    })
})

module.exports = router; // 라우터 객체 내보내기