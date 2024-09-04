/** 파일 생성자 : 이석재
 *  memberdb 모듈화
 * 로그인 기능, 회원가입 기능, 아이디 중복검사 기능
 * */
const express = require('express');
const router = express.Router();
const mysqlconnection = require('../server'); // 서버에서 내보낸 MySQL 연결 객체
const bcrypt = require('bcrypt');

// POST 요청 처리 - 사용자 등록
router.post('/register', async (req, res) => {
    const {
        memberID,
        memberPW,
        memberPhone,
        memberEmail,
        memberMajor,
        memberGender,
        studentNum,
        studentGrade,
        studentClass,
        professorPosition,
        memberType
    } = req.body;

    try {
        // 1. 아이디 중복 확인
        const checkIDQuery = 'SELECT * FROM user WHERE user_id = ?';
        mysqlconnection.query(checkIDQuery, [memberID], (err, results) => {
            if (err) {
                console.error('아이디 중복 확인 실패:', err);
                return res.status(500).send('서버 오류가 발생했습니다.');
            }
            
            if (results.length > 0) {
                // 이미 존재하는 아이디인 경우
                return res.status(409).send('이미 존재하는 아이디입니다.');
            }

            // 비밀번호 암호화
            bcrypt.hash(memberPW, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('비밀번호 암호화 실패:', err);
                    return res.status(500).send('서버 오류가 발생했습니다.');
                }

                // MySQL 트랜잭션 시작
                mysqlconnection.beginTransaction((err) => {
                    if (err) {
                        throw err;
                    }

                    // 2. 공통된 정보를 user 테이블에 저장
                    const userQuery = `
                        INSERT INTO user (user_id, user_password, user_phone, user_email, user_specialty, user_gender)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `;
                    mysqlconnection.query(
                        userQuery,
                        [memberID, hashedPassword, memberPhone, memberEmail, memberMajor, memberGender],
                        (err, results) => {
                            if (err) {
                                return mysqlconnection.rollback(() => {
                                    throw err;
                                });
                            }

                            // 3. 학생일 경우 student 테이블에 저장
                            if (memberType === true) { // memberType이 true면 학생
                                const studentQuery = `
                                    INSERT INTO student (student_id, student_number, student_grade, student_class)
                                    VALUES (?, ?, ?, ?)
                                `;
                                mysqlconnection.query(
                                    studentQuery,
                                    [memberID, studentNum, studentGrade, studentClass],
                                    (err, results) => {
                                        if (err) {
                                            return mysqlconnection.rollback(() => {
                                                throw err;
                                            });
                                        }
                                        // 트랜잭션 커밋
                                        mysqlconnection.commit((err) => {
                                            if (err) {
                                                return mysqlconnection.rollback(() => {
                                                    throw err;
                                                });
                                            }
                                            res.status(200).send('학생 데이터 저장 성공');
                                        });
                                    }
                                );
                            }

                            // 4. 교수일 경우 professor 테이블에 저장
                            if (memberType === false) { // memberType이 false면 교수
                                const professorQuery = `
                                    INSERT INTO professor (professor_id, professor_position)
                                    VALUES (?, ?)
                                `;
                                mysqlconnection.query(
                                    professorQuery,
                                    [memberID, professorPosition],
                                    (err, results) => {
                                        if (err) {
                                            return mysqlconnection.rollback(() => {
                                                throw err;
                                            });
                                        }
                                        // 트랜잭션 커밋
                                        mysqlconnection.commit((err) => {
                                            if (err) {
                                                return mysqlconnection.rollback(() => {
                                                    throw err;
                                                });
                                            }
                                            res.status(200).send('교수 데이터 저장 성공');
                                        });
                                    }
                                );
                            }
                        }
                    );
                });
            });
        });

    } catch (err) {
        console.error('데이터 저장 실패:', err);
        res.status(500).send('데이터 저장 실패');
    }
});


// POST 요청 처리 - 로그인
router.post('/login', (req, res) => {
    const { memberID, memberPW } = req.body;

    // 1. 데이터베이스에서 아이디로 사용자 검색
    const query = 'SELECT * FROM user WHERE user_id = ?';
    mysqlconnection.query(query, [memberID], (err, results) => {
        if (err) {
            console.error('로그인 중 오류 발생:', err);
            return res.status(500).send('서버 오류가 발생했습니다.');
        }

        // 2. 아이디가 존재하지 않는 경우
        if (results.length === 0) {
            return res.status(401).send('아이디 또는 비밀번호를 확인하세요.');
        }

        const user = results[0];

        // 3. 비밀번호 비교
        bcrypt.compare(memberPW, user.user_password, (err, isMatch) => {
            if (err) {
                console.error('비밀번호 비교 중 오류 발생:', err);
                return res.status(500).send('서버 오류가 발생했습니다.');
            }

            if (isMatch) {
                // 4. 비밀번호가 일치하는 경우 (로그인 성공)
                res.status(200).json({ message: '로그인 성공', userID: user.user_id });
            } else {
                // 5. 비밀번호가 일치하지 않는 경우
                res.status(401).send('아이디 또는 비밀번호를 확인하세요.');
            }
        });
    });
});


module.exports = router;
