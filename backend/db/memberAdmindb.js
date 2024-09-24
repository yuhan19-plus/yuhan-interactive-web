/** 파일 생성자 : 이석재
 *  memberAdmindb 모듈화
 * 회원목록조회 기능, 회원탈퇴 기능
 * */
const express = require('express');
const router = express.Router();
const mysqlconnection = require('../server'); // DB 연결

// 학생 목록 조회 API
router.get('/fetchstudent', (req, res) => {
    const query = `
        SELECT u.user_id, u.user_major, 
               s.student_number, s.student_grade, s.student_class
        FROM user u
        INNER JOIN student s ON u.user_id = s.student_id
    `;
    mysqlconnection.query(query, (err, results) => {
        if (err) {
            console.error("학생 정보 조회 중 에러 발생:", err);
            return res.status(500).send("학생 정보 조회 중 오류가 발생했습니다.");
        }
        res.json(results);
    });
});

// 교수 목록 조회 API
router.get('/fetchmember', (req, res) => {
    const query = `
        SELECT u.user_id, u.user_major, 
               p.professor_position
        FROM user u
        INNER JOIN professor p ON u.user_id = p.professor_id
    `;
    mysqlconnection.query(query, (err, results) => {
        if (err) {
            console.error("교수 정보 조회 중 에러 발생:", err);
            return res.status(500).send("교수 정보 조회 중 오류가 발생했습니다.");
        }
        res.json(results);
    });
});

// 회원 삭제 API
router.delete('/deleteMember/:userId', (req, res) => {
    const { userId } = req.params;

    const deleteStudentQuery = `DELETE FROM student WHERE student_id = ?`;
    const deleteProfessorQuery = `DELETE FROM professor WHERE professor_id = ?`;
    const deleteUserQuery = `DELETE FROM user WHERE user_id = ?`;

    // 트랜잭션을 사용하여 원자성 보장
    mysqlconnection.beginTransaction((err) => {
        if (err) {
            console.error("트랜잭션 시작 중 에러 발생:", err);
            return res.status(500).send("회원 삭제 중 오류가 발생했습니다.");
        }

        // 학생 정보 삭제
        mysqlconnection.query(deleteStudentQuery, [userId], (err, result) => {
            if (err) {
                return mysqlconnection.rollback(() => {
                    console.error("학생 정보 삭제 중 에러 발생:", err);
                    res.status(500).send("학생 정보 삭제 중 오류가 발생했습니다.");
                });
            }

            // 교수 정보 삭제
            mysqlconnection.query(deleteProfessorQuery, [userId], (err, result) => {
                if (err) {
                    return mysqlconnection.rollback(() => {
                        console.error("교수 정보 삭제 중 에러 발생:", err);
                        res.status(500).send("교수 정보 삭제 중 오류가 발생했습니다.");
                    });
                }

                // 마지막으로 사용자 정보 삭제
                mysqlconnection.query(deleteUserQuery, [userId], (err, result) => {
                    if (err) {
                        return mysqlconnection.rollback(() => {
                            console.error("회원 삭제 중 에러 발생:", err);
                            res.status(500).send("회원 삭제 중 오류가 발생했습니다.");
                        });
                    }

                    // 트랜잭션 커밋
                    mysqlconnection.commit((err) => {
                        if (err) {
                            return mysqlconnection.rollback(() => {
                                console.error("트랜잭션 커밋 중 에러 발생:", err);
                                res.status(500).send("회원 삭제 중 오류가 발생했습니다.");
                            });
                        }
                        res.send("회원 삭제 성공");
                    });
                });
            });
        });
    });
});

module.exports = router;
