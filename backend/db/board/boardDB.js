/** 
 * 파일 생성자 : 오자현
 * 게시글 백엔드 코드
 * 
 * 기능 구현 - 오자현
 * - 게시글 저장, 수정, 삭제, 검색, 조회 기능
 */
const express = require("express");
const router = express.Router();
const mysqlconnection = require("../../server");

// 데이터저장
router.post("/", (req, res) => {
    const { board_title, board_content, board_writer, writer_type, files } = req.body;

    const insertBoardQuery = `INSERT INTO board (board_title, board_content, board_writer, writer_type, board_date) VALUES (?, ?, ?, ?, NOW())`;
    const insertAttachmentQuery = `INSERT INTO board_attachment (board_id, file_name, file_data, upload_date, file_size, file_type) VALUES (?, ?, ?, NOW(), ?, ?)`;
    
    // 필수 필드 체크(Not Null)
    if (!board_title || !board_content || !board_writer) {
        return res.status(400).send("board_title, board_content, board_writer 값이 필요합니다.");
    }

    mysqlconnection.query(insertBoardQuery, [board_title, board_content, board_writer, writer_type], (err, results) => {
        if (err) {
            // console.error("게시물 삽입 중 에러 발생:", err);
            return res.status(500).json({ message: "게시물 삽입 중 오류가 발생했습니다." });
        }

        const boardId = results.insertId; // 삽입된 게시물의 ID를 가져옵니다.

        if (files && files.length > 0 && boardId) {
            // 각 파일에 대해 처리
            files.forEach((file) => {
                const { file_name, file_data, file_size, file_type } = file;

                // 파일 데이터를 Base64에서 Buffer로 변환합니다.
                const fileBuffer = Buffer.from(file_data, 'base64');

                mysqlconnection.query(insertAttachmentQuery, [boardId, file_name, fileBuffer, file_size, file_type], (err) => {
                    if (err) {
                        // console.error("첨부파일 삽입 중 에러 발생:", err);
                        return res.status(500).json({ message: "첨부파일 삽입 중 오류가 발생했습니다." });
                    }
                });
            });
        }

        // 게시물과 파일이 모두 성공적으로 추가된 경우
        res.send("데이터 및 파일 추가 성공!");
    });
});

// 게시판목록
router.get("/", (req, res) => {
    const selectQuery = "SELECT * FROM board";
    
    mysqlconnection.query(selectQuery, (err, results) => {
        if (err) {
            // console.error("테이블 검색 중 에러 발생:", err);
            return res.status(500).json({ message: "테이블 검색 중 오류가 발생했습니다." });  // 500 상태 코드와 함께 오류 메시지 반환
        }
        // console.log("테이블이 검색되었습니다.", results);
        res.json(results); // 클라이언트에게 쿼리 결과를 JSON 형식으로 반환
    });
});

// 검색
router.get("/search/:searchQuery", (req, res) => {
    // console.log("검색요청 진입")
    const searchData = `%${req.params.searchQuery}%`; // 부분 일치를 위해 '%'를 추가

    const searchQuery = "SELECT * FROM board WHERE board_title LIKE ? OR board_writer LIKE ?";

    mysqlconnection.query(searchQuery, [searchData, searchData], (err, results) => {
        if (err) {
            // console.error("테이블 검색 중 에러 발생:", err);
            return res.status(500).json({ message: "테이블 검색 중 오류가 발생했습니다." });
        } else if (results.length === 0) {
            // console.log("검색 결과와 일치하는 데이터가 없습니다.");
            return res.status(404).json({ error: "해당 검색어와 일치하는 게시물이 없습니다." }); // JSON 형식으로 반환
        } else {
            // console.log("검색결과가 존재")
            // 결과를 클라이언트에 반환
            res.json({
                board: results,
            });
        }
    });
});


// 게시글조회
router.get("/:board_id", (req, res) => {
    // console.log("req.params 데이터",  req.params)
    const board_id = req.params.board_id;

    const selectIdQuery = "SELECT * FROM board where board_id = ?";
    const checkAttachmentQuery = "SELECT * FROM board_attachment where board_id = ?";
    const boardViewPlusQuery = "UPDATE board SET board_view = board_view + 1, board_last_modified = board_last_modified WHERE board_id = ?";

    // board_id에 해당하는 데이터를 검색
    mysqlconnection.query(selectIdQuery, [board_id], (err, boardResults) => {
        if (err) {
            // console.error("테이블 검색 중 에러 발생:", err);
            return res.status(500).json({ message: "테이블 검색 중 오류가 발생했습니다." });
        }
        if (boardResults.length === 0) {
            // console.log("board_id와 일치하는 항목이 없습니다.");
            return res.status(404).send("해당 board_id와 일치하는 게시물이 없습니다.");
        } else {
            // 조회수증가 쿼리 실행
            mysqlconnection.query(boardViewPlusQuery, [board_id], (err, result) => {
                if (err) {
                    // console.error("조회수 증가중 오류발생", err)
                    return res.status(500).json({ message: "조회수 증가 중 오류발생" });
                }
            })
        }

        // 첨부파일 확인
        mysqlconnection.query(checkAttachmentQuery, [board_id], (err, attachmentResults) => {
            if (err) {
                // console.error("첨부파일 검색 중 에러 발생:", err);
                return res.status(500).json({ message: "첨부파일 검색 중 오류가 발생했습니다." });
            }

            // 결과를 클라이언트에 반환
            res.json({
                board: boardResults[0],
                attachments: attachmentResults // 첨부파일이 없으면 빈 배열 반환
            });
        });
    });

});

// 게시글 삭제
router.delete("/delete/:board_id", (req, res) => {
    // console.log("삭제요청 들어옴 board_id:", board_id)
    const board_id = req.params.board_id;

    const deleteQuery = "UPDATE board set board_status = 'delete' where board_id = ?"

    mysqlconnection.query(deleteQuery, [board_id], (err, results) => {
        if (err) {
            // console.error("삭제중 오류 발생")
            return res.status(500).json({ message: "게시판삭제중 오류발생" });
        }
        // console.log("테이블이 삭제되었습니다.")
        res.send("테이블 삭제 성공!")
    })

})

// 게시판 수정
router.put("/update/:board_id", (req, res) => {
    // console.log("수정요청 들어옴 board_id", board_id);
    const board_id = req.params.board_id;
    const { board_title, board_content, files } = req.body;

    const updateBoardQuery = "UPDATE board SET board_title = ?, board_content = ? WHERE board_id = ?";
    const updateAttachmentQuery = "UPDATE board_attachment SET file_name = ?, file_data = ?, file_size = ?, file_type = ? WHERE attachment_id = ?";

    // 게시판 수정쿼리실행
    mysqlconnection.query(updateBoardQuery, [board_title, board_content, board_id], (err, updateResult) => {
        if (err) {
            // console.error("게시물 수정 중 오류 발생:", err);
            return res.status(500).json({ message: "게시물 수정 중 오류 발생" });
        }

        // 첨부파일이 있는 경우
        if (files && files.length > 0) {
            // 파일 수정 작업을 Promise로 처리하여 모든 파일 수정 후 응답
            const fileUpdatePromises = files.map((file) => {
                return new Promise((resolve, reject) => {
                    const { attachment_id, file_name, file_data, file_size, file_type } = file;
                    const fileBuffer = Buffer.from(file_data, 'base64');

                    // 첨부파일 수정쿼리 동작
                    mysqlconnection.query(updateAttachmentQuery, [file_name, fileBuffer, file_size, file_type, attachment_id], (err) => {
                        if (err) {
                            // console.error("첨부파일 수정 중 에러 발생:", err);
                            return reject(err);
                        }
                        // console.log("쿼리 실행됨 - 파일 이름:", file_name, " 첨부파일 id:", attachment_id);
                        resolve();
                    });
                });
            });

            // 모든 파일 수정이 완료된 후 응답
            Promise.all(fileUpdatePromises)
                .then(() => {
                    res.status(200).send("게시물 및 첨부파일이 성공적으로 수정되었습니다.");
                })
                .catch((error) => {
                    // console.error("파일 수정 중 에러 발생:", error);
                    res.status(500).json({ message: "첨부파일 수정 중 오류 발생" });
                });

        } else {
            // 파일이 없는 경우 게시물만 수정된 경우의 응답
            res.status(200).send("게시물이 성공적으로 수정되었습니다.");
        }
    });
});

module.exports = router;
