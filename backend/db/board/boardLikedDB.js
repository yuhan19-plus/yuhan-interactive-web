/** 
 * 파일 생성자 : 오자현
 * 좋아요 백엔드 코드
 * 
 * 기능 구현 - 오자현
 * - 저장, 수정, 삭제 기능
 */
const express = require("express");
const router = express.Router();
const mysqlconnection = require("../../server");

// 좋아요 여부를 저장하고 게시판의 좋아요를 1 증가/감소시키는 동작
router.post("/", (req, res) => {
    // console.log("req.body", req.body);
    const { userId, boardId } = req.body;

    const checkLikedQuery = `SELECT like_status FROM board_likes WHERE user_id = ? AND board_id = ?`;
    const insertBoardLikedQuery = `INSERT INTO board_likes (user_id, board_id, like_at, like_status) VALUES (?, ?, NOW(), 1)`;
    const updateLikeStatusToLikedQuery = `UPDATE board_likes SET like_status = 1 WHERE user_id = ? AND board_id = ?`;
    const updateLikeStatusToUnlikedQuery = `UPDATE board_likes SET like_status = 0 WHERE user_id = ? AND board_id = ?`;
    const boardlikePlusQuery = `UPDATE board SET board_like = board_like + 1 WHERE board_id = ?`;
    const boardlikeMinusQuery = `UPDATE board SET board_like = board_like - 1 WHERE board_id = ?`;

    // 트랜잭션 시작
    mysqlconnection.beginTransaction((err) => {
        if (err) {
            // console.error("트랜잭션 시작 중 에러 발생:", err);
            return res.status(500).send("트랜잭션 시작 중 오류가 발생했습니다.");
        }

        // 첫 번째 쿼리: 좋아요 여부 체크
        mysqlconnection.query(checkLikedQuery, [userId, boardId], (err, results) => {
            if (err) {
                // console.error("좋아요 여부 체크 중 에러 발생:", err);
                return mysqlconnection.rollback(() => {
                    res.status(500).send("좋아요 여부 체크 중 오류가 발생했습니다.");
                });
            }

            // 좋아요를 처음 추가하는 경우
            if (results.length === 0) {
                mysqlconnection.query(insertBoardLikedQuery, [userId, boardId], (err, results) => {
                    if (err) {
                        // console.error("좋아요 입력 중 에러 발생:", err);
                        return mysqlconnection.rollback(() => {
                            res.status(500).send("좋아요 입력 중 오류가 발생했습니다.");
                        });
                    }

                    // 게시판의 좋아요 수 증가
                    mysqlconnection.query(boardlikePlusQuery, [boardId], (err, results) => {
                        // 에러체크
                        if (err) {
                            // console.error("게시판에서 좋아요 증가 중 에러 발생:", err);
                            return mysqlconnection.rollback(() => {
                                res.status(500).send("게시판 좋아요 증가 중 오류가 발생했습니다.");
                            });
                        }

                        // 트랜잭션 커밋
                        mysqlconnection.commit((err) => {
                            if (err) {
                                // console.error("트랜잭션 커밋 중 에러 발생:", err);
                                return mysqlconnection.rollback(() => {
                                    res.status(500).send("트랜잭션 커밋 중 오류가 발생했습니다.");
                                });
                            }
                            res.send("좋아요 추가 성공");
                        });
                    });
                });
            } else {
                const currentStatus = results[0].like_status;
                // 취소한 좋아요를 다시하는 경우
                if (currentStatus === 0) {
                    // 좋아요 상태로 변경
                    mysqlconnection.query(updateLikeStatusToLikedQuery, [userId, boardId], (err, results) => {
                        if (err) {
                            // console.error("좋아요 상태 수정 중 에러 발생:", err);
                            return mysqlconnection.rollback(() => {
                                res.status(500).send("좋아요 상태 수정 중 오류가 발생했습니다.");
                            });
                        }

                        // 게시판의 좋아요 수 증가
                        mysqlconnection.query(boardlikePlusQuery, [boardId], (err, results) => {
                            if (err) {
                                // console.error("게시판에서 좋아요 증가 중 에러 발생:", err);
                                return mysqlconnection.rollback(() => {
                                    res.status(500).send("게시판 좋아요 증가 중 오류가 발생했습니다.");
                                });
                            }

                            // 트랜잭션 커밋
                            mysqlconnection.commit((err) => {
                                if (err) {
                                    // console.error("트랜잭션 커밋 중 에러 발생:", err);
                                    return mysqlconnection.rollback(() => {
                                        res.status(500).send("트랜잭션 커밋 중 오류가 발생했습니다.");
                                    });
                                }
                                res.send("좋아요 상태 변경 성공");
                            });
                        });
                    });
                }
                // 좋아요를 취소하는 경우 
                else {
                    // 좋아요 취소 (like_status = 0)
                    mysqlconnection.query(updateLikeStatusToUnlikedQuery, [userId, boardId], (err, results) => {
                        if (err) {
                            // console.error("좋아요 취소 중 에러 발생:", err);
                            return mysqlconnection.rollback(() => {
                                res.status(500).send("좋아요 취소 중 오류가 발생했습니다.");
                            });
                        }

                        // 게시판의 좋아요 수 감소
                        mysqlconnection.query(boardlikeMinusQuery, [boardId], (err, results) => {
                            if (err) {
                                // console.error("게시판에서 좋아요 감소 중 에러 발생:", err);
                                return mysqlconnection.rollback(() => {
                                    res.status(500).send("게시판 좋아요 감소 중 오류가 발생했습니다.");
                                });
                            }

                            // 트랜잭션 커밋
                            mysqlconnection.commit((err) => {
                                if (err) {
                                    // console.error("트랜잭션 커밋 중 에러 발생:", err);
                                    return mysqlconnection.rollback(() => {
                                        res.status(500).send("트랜잭션 커밋 중 오류가 발생했습니다.");
                                    });
                                }
                                res.send("좋아요 취소 성공");
                            });
                        });
                    });
                }
            }
        });
    });
});


// 게시글에 대한 좋아요 여부를 알려준다.
router.post("/:boardID/:userId", (req, res) => {
    // console.log("게시글에 대한 좋아요여부 체크요청 들어옴")
    const { boardID, userId } = req.params;  // URL에서 boardID와 userId를 추출

    const checkQuery = `SELECT like_status FROM board_likes where board_id = ? and user_id = ?`

    mysqlconnection.query(checkQuery, [boardID, userId], (err, results) => {
        if (err) {
            // console.error("졿아요 여부 체크 중 에러 발생:", err);
            return res.status(500).send("좋아요 여부 체크 중 오류가 발생했습니다.");
        }

        // 결과가 없는 경우
        if (results.length === 0) {
            return res.json({ liked: false, message: "좋아요를 누르지 않았습니다." });
        }
        // 좋아요 상태를 기반으로 반환 (like_status가 1이면 좋아요, 0이면 취소됨)
        const likeStatus = results[0].like_status;
        if (likeStatus === 1) {
            res.json({ liked: true, message: "좋아요를 이미 눌렀습니다." });
        } else {
            res.json({ liked: false, message: "좋아요를 취소한 상태입니다." });
        }
    });
});


// 데이터저장
module.exports = router; // 라우터 객체 내보내기
