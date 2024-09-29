/** 파일 생성자 : 이석재
 *  memberAdmindb 모듈화
 * 회원목록조회 기능(화원, 탈퇴회원), 회원탈퇴 기능, 관리자 메뉴 로그인 기능
 * */
const express = require('express');
const router = express.Router();
const mysqlconnection = require('../server'); // DB 연결
const bcrypt = require('bcrypt');

// 학생 목록 조회 API
router.get('/fetchstudent', (req, res) => {
    const query = `
        SELECT user_id, user_major, 
               student_number, student_grade, student_class
        FROM student
        WHERE user_status = 1
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
router.get('/fetchprofessor', (req, res) => {
    const query = `
        SELECT user_id, user_major, 
               professor_position
        FROM professor
        WHERE user_status = 1
    `;
    mysqlconnection.query(query, (err, results) => {
        if (err) {
            console.error("교수 정보 조회 중 에러 발생:", err);
            return res.status(500).send("교수 정보 조회 중 오류가 발생했습니다.");
        }
        res.json(results);
    });
});

// 탈퇴된 학생 목록 조회 API
router.get('/fetchdeletedstudent', (req, res) => {
    const query = `
        SELECT user_id, user_major, 
               student_number, student_grade, student_class
        FROM student
        WHERE user_status = 0
    `;
    mysqlconnection.query(query, (err, results) => {
        if (err) {
            console.error("탈퇴된 학생 정보 조회 중 에러 발생:", err);
            return res.status(500).send("탈퇴된 학생 정보 조회 중 오류가 발생했습니다.");
        }
        res.json(results);
    });
});

// 탈퇴된 교수 목록 조회 API
router.get('/fetchdeletedprofessor', (req, res) => {
    const query = `
        SELECT user_id, user_major, 
               professor_position
        FROM professor
        WHERE user_status = 0
    `;
    mysqlconnection.query(query, (err, results) => {
        if (err) {
            console.error("탈퇴된 교수 정보 조회 중 에러 발생:", err);
            return res.status(500).send("탈퇴된 교수 정보 조회 중 오류가 발생했습니다.");
        }
        res.json(results);
    });
});

// 회원탈퇴 API
router.put('/deleteMember/:userId', (req, res) => {
    const { userId } = req.params;

    const updateStudentStatusQuery = `UPDATE student SET user_status = 0 WHERE user_id = ?`;
    const updateProfessorStatusQuery = `UPDATE professor SET user_status = 0 WHERE user_id = ?`;

    // 우선 학생 테이블에서 user_id가 존재하는지 확인
    mysqlconnection.query(updateStudentStatusQuery, [userId], (err, result) => {
        if (err) {
            console.error("학생 정보 업데이트 중 에러 발생:", err);
            return res.status(500).send("학생 정보 업데이트 중 오류가 발생했습니다.");
        }

        // 해당 user_id가 학생 테이블에 있는 경우
        if (result.affectedRows > 0) {
            return res.send("회원 탈퇴 성공 (학생)");
        }

        // 학생이 아닌 경우, 교수 테이블에서 user_id 확인
        mysqlconnection.query(updateProfessorStatusQuery, [userId], (err, result) => {
            if (err) {
                console.error("교수 정보 업데이트 중 에러 발생:", err);
                return res.status(500).send("교수 정보 업데이트 중 오류가 발생했습니다.");
            }

            // 해당 user_id가 교수 테이블에 있는 경우
            if (result.affectedRows > 0) {
                return res.send("회원 탈퇴 성공 (교수)");
            } else {
                // 학생도 교수도 아닌 경우
                return res.status(404).send("해당 회원을 찾을 수 없습니다.");
            }
        });
    });
});

// POST 요청 처리 - 관리자 코드 검증
router.post('/verifyAdminCode', (req, res) => {
    const { userID, code } = req.body;

    // admin_code 테이블에서 해당 사용자의 코드 검색
    const query = 'SELECT code FROM admin_code WHERE user_id = ?';

    mysqlconnection.query(query, [userID], (err, results) => {
        if (err) {
            console.error('코드 검증 중 오류 발생:', err);
            return res.status(500).send({ success: false, message: '서버 오류가 발생했습니다.' });
        }

        if (results.length > 0) {
            const storedCode = results[0].code;

            // bcrypt.compare로 입력한 코드와 저장된 코드 비교
            bcrypt.compare(code, storedCode, (err, isMatch) => {
                if (err) {
                    console.error('비밀번호 비교 중 오류 발생:', err);
                    return res.status(500).send({ success: false, message: '서버 오류가 발생했습니다.' });
                }

                if (isMatch) {
                    // 코드가 일치하는 경우
                    return res.send({ success: true, message: '코드가 일치합니다.' });
                } else {
                    // 코드가 일치하지 않는 경우
                    return res.send({ success: false, message: '코드가 일치하지 않습니다.' });
                }
            });
        } else {
            return res.send({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }
    });
});

module.exports = router;
