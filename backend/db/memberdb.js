/** 파일 생성자 : 이석재
 *  memberdb 모듈화
 * 로그인 기능, 회원가입 기능, 아이디 중복검사 기능, 회원정보수정 기능, 회원정보조회 기능
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
                        INSERT INTO user (user_id, user_password, user_phone, user_email, user_major, user_gender)
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
                // 4. 학생 또는 교수 여부 확인
                const studentQuery = 'SELECT * FROM student WHERE student_id = ?';
                const professorQuery = 'SELECT * FROM professor WHERE professor_id = ?';

                // 학생 여부 확인
                mysqlconnection.query(studentQuery, [user.user_id], (err, studentResults) => {
                    if (err) {
                        console.error('학생 정보 조회 중 오류 발생:', err);
                        return res.status(500).send('서버 오류가 발생했습니다.');
                    }

                    if (studentResults.length > 0) {
                        // 로그인한 사용자가 학생인 경우
                        res.status(200).json({ message: '로그인 성공', userID: user.user_id, userType: 'student' });
                    } else {
                        // 교수 여부 확인
                        mysqlconnection.query(professorQuery, [user.user_id], (err, professorResults) => {
                            if (err) {
                                console.error('교수 정보 조회 중 오류 발생:', err);
                                return res.status(500).send('서버 오류가 발생했습니다.');
                            }

                            if (professorResults.length > 0) {
                                // 로그인한 사용자가 교수인 경우
                                res.status(200).json({ message: '로그인 성공', userID: user.user_id, userType: 'professor' });
                            } else {
                                // 학생도 교수도 아닌 경우 (데이터베이스에 오류 가능성)
                                res.status(500).send('사용자 정보에 오류가 있습니다.');
                            }
                        });
                    }
                });
            } else {
                // 5. 비밀번호가 일치하지 않는 경우
                res.status(401).send('아이디 또는 비밀번호를 확인하세요.');
            }
        });
    });
});

// POST 요청 처리 - 사용자 정보 수정
router.post('/modify', async (req, res) => {
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
        // 1. 비밀번호가 있을 경우 암호화 처리
        let hashedPassword;
        if (memberPW) {
            hashedPassword = await bcrypt.hash(memberPW, 10);
        }

        // MySQL 트랜잭션 시작
        mysqlconnection.beginTransaction((err) => {
            if (err) {
                throw err;
            }

            // 2. 공통된 정보를 user 테이블에 업데이트
            const userQuery = `
                UPDATE user 
                SET 
                    ${memberPW ? 'user_password = ?, ' : ''}
                    user_phone = ?, 
                    user_email = ?, 
                    user_major = ?, 
                    user_gender = ?
                WHERE user_id = ?
            `;
            const userValues = memberPW 
                ? [hashedPassword, memberPhone, memberEmail, memberMajor, memberGender, memberID]
                : [memberPhone, memberEmail, memberMajor, memberGender, memberID];

            mysqlconnection.query(userQuery, userValues, (err, results) => {
                if (err) {
                    return mysqlconnection.rollback(() => {
                        throw err;
                    });
                }

                // 3. 학생일 경우 student 테이블에 업데이트
                if (memberType === 'student') {
                    const studentQuery = `
                        UPDATE student 
                        SET student_number = ?, student_grade = ?, student_class = ?
                        WHERE student_id = ?
                    `;
                    mysqlconnection.query(
                        studentQuery,
                        [studentNum, studentGrade, studentClass, memberID],
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
                                res.status(200).send('학생 정보 수정 성공');
                            });
                        }
                    );
                }

                // 4. 교수일 경우 professor 테이블에 업데이트
                if (memberType === 'professor') {
                    const professorQuery = `
                        UPDATE professor 
                        SET professor_position = ?
                        WHERE professor_id = ?
                    `;
                    mysqlconnection.query(
                        professorQuery,
                        [professorPosition, memberID],
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
                                res.status(200).send('교수 정보 수정 성공');
                            });
                        }
                    );
                }
            });
        });

    } catch (err) {
        console.error('데이터 수정 실패:', err);
        res.status(500).send('데이터 수정 실패');
    }
});

// GET 요청 처리 - 사용자 정보 조회
router.get('/:userID', (req, res) => {
    const { userID } = req.params;

    // 1. user 테이블에서 기본 사용자 정보를 가져옴
    const userQuery = 'SELECT * FROM user WHERE user_id = ?';
    mysqlconnection.query(userQuery, [userID], (err, userResults) => {
        if (err) {
            console.error('사용자 정보 조회 중 오류 발생:', err);
            return res.status(500).send('서버 오류가 발생했습니다.');
        }

        // 2. 사용자가 존재하지 않는 경우
        if (userResults.length === 0) {
            return res.status(404).send('사용자를 찾을 수 없습니다.');
        }

        const user = userResults[0];

        // 3. 학생 여부 확인
        const studentQuery = 'SELECT * FROM student WHERE student_id = ?';
        mysqlconnection.query(studentQuery, [userID], (err, studentResults) => {
            if (err) {
                console.error('학생 정보 조회 중 오류 발생:', err);
                return res.status(500).send('서버 오류가 발생했습니다.');
            }

            if (studentResults.length > 0) {
                // 4. 학생인 경우 사용자 정보와 학생 정보를 함께 반환
                return res.status(200).json({
                    ...user,
                    student_number: studentResults[0].student_number,
                    student_grade: studentResults[0].student_grade,
                    student_class: studentResults[0].student_class,
                    userType: 'student'
                });
            }

            // 5. 교수 여부 확인
            const professorQuery = 'SELECT * FROM professor WHERE professor_id = ?';
            mysqlconnection.query(professorQuery, [userID], (err, professorResults) => {
                if (err) {
                    console.error('교수 정보 조회 중 오류 발생:', err);
                    return res.status(500).send('서버 오류가 발생했습니다.');
                }

                if (professorResults.length > 0) {
                    // 6. 교수인 경우 사용자 정보와 교수 정보를 함께 반환
                    return res.status(200).json({
                        ...user,
                        professor_position: professorResults[0].professor_position,
                        userType: 'professor'
                    });
                }

                // 7. 학생도 교수도 아닌 경우
                return res.status(500).send('사용자 정보에 오류가 있습니다.');
            });
        });
    });
});


module.exports = router;
