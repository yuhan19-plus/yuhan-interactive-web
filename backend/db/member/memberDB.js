/** 파일 생성자 : 이석재
 *  memberDB 모듈화
 * 로그인 기능, 회원가입 기능, 아이디 중복검사 기능, 회원정보수정 기능, 회원정보조회 기능
 * */
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mysqlconnection = require('../../server'); // 서버에서 내보낸 MySQL 연결 객체
const { emailconfig } = require('../../config');
const bcrypt = require('bcrypt');


// 이메일 인증 코드 생성 함수
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 인증 코드
};


// 이메일 전송 함수
const sendVerificationEmail = async (toEmail, verificationCode) => {
    const transporter = nodemailer.createTransport({
        service: emailconfig.service, // config.js에서 가져온 서비스
        auth: {
            user: emailconfig.user,    // config.js에서 가져온 이메일
            pass: emailconfig.password // config.js에서 가져온 비밀번호
        }
    });

    const mailOptions = {
        from: emailconfig.user,       // 발신자 이메일
        to: toEmail,                  // 수신자 이메일
        subject: '이메일 인증',
        text: `인증 코드는 ${verificationCode}입니다. 10분 이내에 입력하세요.`
    };

    await transporter.sendMail(mailOptions);
};

// 이메일 인증 코드 전송 라우트
router.post('/sendVerification', async (req, res) => {
    const { email } = req.body;
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10분 유효 기간 설정

    // 데이터베이스에 인증 코드와 유효 시간 저장
    const insertQuery = `
        INSERT INTO member_email_verifications (user_id, verification_code, expires_at)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE verification_code = VALUES(verification_code), expires_at = VALUES(expires_at)
    `;

    try {
        // Promise 기반의 query 실행 (콜백 없이 사용)
        const [result] = await mysqlconnection.promise().query(insertQuery, [email, verificationCode, expiresAt]);

        // 이메일 전송
        await sendVerificationEmail(email, verificationCode);
        res.status(200).json({ message: '인증 코드가 전송되었습니다. 이메일을 확인하세요.' });
    } catch (error) {
        // console.error('인증 코드 저장 또는 이메일 전송 실패:', error);
        res.status(500).json({ message: '이메일 전송에 실패했습니다.' });
    }
});

// 인증 코드 확인 라우트
router.post('/verifyCode', async (req, res) => {
    const { email, code } = req.body;

    // 데이터베이스에서 인증 코드 확인
    const selectQuery = `SELECT * FROM member_email_verifications WHERE user_id = ? AND verification_code = ?`;

    try {
        mysqlconnection.query(selectQuery, [email, code], (err, results) => {
            if (err) {
                // console.error('인증 코드 확인 중 오류:', err);
                return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
            }

            if (results.length === 0) {
                return res.status(400).json({ message: '인증 코드가 일치하지 않습니다.' });
            }

            const verification = results[0];
            const currentTime = new Date();

            // 인증 코드 유효 시간 확인
            if (currentTime > new Date(verification.expires_at)) {
                // 인증 시간이 만료되었을 때 인증 코드를 삭제
                const deleteExpiredQuery = `DELETE FROM member_email_verifications WHERE user_id = ?`;
                mysqlconnection.query(deleteExpiredQuery, [email], (err) => {
                    if (err) {
                        // console.error('만료된 인증 코드 삭제 중 오류:', err);
                    }
                });
                return res.status(400).json({ message: '인증 시간이 지났습니다. 재인증해주세요.' });
            }

            // 인증 완료 처리
            const deleteQuery = `DELETE FROM member_email_verifications WHERE user_id = ?`;
            mysqlconnection.query(deleteQuery, [email], (err) => {
                if (err) {
                    // console.error('인증 코드 삭제 중 오류:', err);
                }
            });

            res.status(200).json({ message: '인증이 완료되었습니다.' });
        });
    } catch (error) {
        // console.error('인증 코드 확인 중 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});  

// POST 요청 처리 - 사용자 등록
router.post('/register', async (req, res) => {
    const {
        memberID,
        memberPW,
        memberName,
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
        // 1. 아이디 중복 확인 (member_student, member_professor, admin 테이블 모두 확인)
        const checkIDQuery = memberType === true 
            ? 'SELECT user_id FROM member_student WHERE user_id = ? UNION SELECT user_id FROM admin WHERE user_id = ?' 
            : 'SELECT user_id FROM member_professor WHERE user_id = ? UNION SELECT user_id FROM admin WHERE user_id = ?';

        mysqlconnection.query(checkIDQuery, [memberID, memberID], (err, results) => {
            if (err) {
                // console.error('아이디 중복 확인 실패:', err);
                return res.status(500).send('서버 오류가 발생했습니다.');
            }

            if (results.length > 0) {
                // 이미 존재하는 아이디인 경우
                return res.status(409).send('이미 존재하는 아이디입니다.');
            }

            // 교수 등록 시 학과장 중복 확인
            if (memberType === false && professorPosition === '학과장') {
                const checkDeptHeadQuery = `
                    SELECT user_id FROM member_professor 
                    WHERE professor_position = '학과장' AND user_major = ?
                `;
                mysqlconnection.query(checkDeptHeadQuery, [memberMajor], (err, results) => {
                    if (err) {
                        // console.error('학과장 중복 확인 실패:', err);
                        return res.status(500).send('서버 오류가 발생했습니다.');
                    }

                    if (results.length > 0) {
                        // 이미 해당 학과에 학과장이 존재하는 경우
                        return res.status(418).send('이미 해당 학과에 학과장이 존재합니다.');
                    }

                    // 비밀번호 암호화 및 데이터 저장 진행
                    bcrypt.hash(memberPW, 10, (err, hashedPassword) => {
                        if (err) {
                            // console.error('비밀번호 암호화 실패:', err);
                            return res.status(500).send('서버 오류가 발생했습니다.');
                        }

                        // MySQL 트랜잭션 시작
                        mysqlconnection.beginTransaction((err) => {
                            if (err) {
                                throw err;
                            }

                            // member_professor 테이블에 데이터 저장
                            const professorQuery = `
                                INSERT INTO member_professor (user_id, user_password, user_name, user_phone, user_email, user_major, user_gender, professor_position, user_status)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)  -- user_status를 기본값으로 1로 설정
                            `;
                            mysqlconnection.query(professorQuery, [memberID, hashedPassword, memberName, memberPhone, memberEmail, memberMajor, memberGender, professorPosition], (err, results) => {
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
                            });
                        });
                    });
                });
            } else {
                // 비밀번호 암호화 및 데이터 저장 진행
                bcrypt.hash(memberPW, 10, (err, hashedPassword) => {
                    if (err) {
                        // console.error('비밀번호 암호화 실패:', err);
                        return res.status(500).send('서버 오류가 발생했습니다.');
                    }

                    // MySQL 트랜잭션 시작
                    mysqlconnection.beginTransaction((err) => {
                        if (err) {
                            throw err;
                        }

                        // member_student 테이블에 데이터 저장
                        const studentQuery = `
                            INSERT INTO member_student (user_id, user_password, user_name, user_phone, user_email, user_major, user_gender, student_number, student_grade, student_class, user_status)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)  -- user_status를 기본값으로 1로 설정
                        `;
                        mysqlconnection.query(studentQuery, [memberID, hashedPassword, memberName, memberPhone, memberEmail, memberMajor, memberGender, studentNum, studentGrade, studentClass], (err, results) => {
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
                        });
                    });
                });
            }
        });

    } catch (err) {
        // console.error('데이터 저장 실패:', err);
        res.status(500).send('데이터 저장 실패');
    }
});


// POST 요청 처리 - 로그인
router.post('/login', (req, res) => {
    const { memberID, memberPW } = req.body;

    // 1. 학생, 교수, 관리자 테이블에서 사용자 검색
    const studentQuery = 'SELECT * FROM member_student WHERE user_id = ?';
    const professorQuery = 'SELECT * FROM member_professor WHERE user_id = ?';
    const adminQuery = 'SELECT * FROM admin WHERE user_id = ?'; // 관리자 테이블 추가

    // 학생 여부 확인
    mysqlconnection.query(studentQuery, [memberID], (err, studentResults) => {
        if (err) {
            // console.error('로그인 중 오류 발생 (학생 테이블 조회):', err);
            return res.status(500).send('서버 오류가 발생했습니다.');
        }

        if (studentResults.length > 0) {
            const student = studentResults[0];

            // 2. 탈퇴한 상태인지 확인 (user_status가 1이어야 로그인 가능)
            if (student.user_status !== 1) {
                return res.status(403).send('탈퇴한 계정입니다. 로그인이 불가능합니다.');
            }

            // 3. 비밀번호 비교
            bcrypt.compare(memberPW, student.user_password, (err, isMatch) => {
                if (err) {
                    // console.error('비밀번호 비교 중 오류 발생:', err);
                    return res.status(500).send('서버 오류가 발생했습니다.');
                }

                if (isMatch) {
                    // 로그인 성공 - 학생
                    return res.status(200).json({
                        message: '로그인 성공',
                        userID: student.user_id,
                        userType: 'student',
                        userName: student.user_name // 쿠키에 사용할 이름도 전달
                    });
                } else {
                    return res.status(401).send('아이디 또는 비밀번호를 확인하세요.');
                }
            });
        } else {
            // 4. 교수 여부 확인
            mysqlconnection.query(professorQuery, [memberID], (err, professorResults) => {
                if (err) {
                    // console.error('로그인 중 오류 발생 (교수 테이블 조회):', err);
                    return res.status(500).send('서버 오류가 발생했습니다.');
                }

                if (professorResults.length > 0) {
                    const professor = professorResults[0];

                    // 5. 탈퇴한 상태인지 확인 (user_status가 1이어야 로그인 가능)
                    if (professor.user_status !== 1) {
                        return res.status(403).send('탈퇴한 계정입니다. 로그인이 불가능합니다.');
                    }

                    // 6. 비밀번호 비교
                    bcrypt.compare(memberPW, professor.user_password, (err, isMatch) => {
                        if (err) {
                            // console.error('비밀번호 비교 중 오류 발생:', err);
                            return res.status(500).send('서버 오류가 발생했습니다.');
                        }

                        if (isMatch) {
                            // 로그인 성공 - 교수
                            return res.status(200).json({
                                message: '로그인 성공',
                                userID: professor.user_id,
                                userType: 'professor',
                                userName: professor.user_name // 쿠키에 사용할 이름도 전달
                            });
                        } else {
                            return res.status(401).send('아이디 또는 비밀번호를 확인하세요.');
                        }
                    });
                } else {
                    // 7. 관리자 여부 확인
                    mysqlconnection.query(adminQuery, [memberID], (err, adminResults) => {
                        if (err) {
                            // console.error('로그인 중 오류 발생 (관리자 테이블 조회):', err);
                            return res.status(500).send('서버 오류가 발생했습니다.');
                        }

                        if (adminResults.length > 0) {
                            const admin = adminResults[0];

                            // 8. 탈퇴한 상태인지 확인 (user_status가 1이어야 로그인 가능)
                            if (admin.user_status !== 1) {
                                return res.status(403).send('탈퇴한 계정입니다. 로그인이 불가능합니다.');
                            }

                            // 9. 비밀번호 비교
                            bcrypt.compare(memberPW, admin.user_password, (err, isMatch) => {
                                if (err) {
                                    // console.error('비밀번호 비교 중 오류 발생:', err);
                                    return res.status(500).send('서버 오류가 발생했습니다.');
                                }

                                if (isMatch) {
                                    // 로그인 성공 - 관리자
                                    return res.status(200).json({
                                        message: '로그인 성공',
                                        userID: admin.user_id,
                                        userType: 'admin', // 관리자
                                        userName: admin.user_name // 쿠키에 사용할 이름도 전달
                                    });
                                } else {
                                    return res.status(401).send('아이디 또는 비밀번호를 확인하세요.');
                                }
                            });
                        } else {
                            // 학생도 교수도 관리자도 아닌 경우
                            return res.status(401).send('아이디 또는 비밀번호를 확인하세요.');
                        }
                    });
                }
            });
        }
    });
});

// POST 요청 처리 - 사용자 정보 수정
router.post('/modify', async (req, res) => {
    const {
        memberID,
        memberPW,
        memberName,
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

            // 2. 학생일 경우 student 테이블 업데이트
            if (memberType === 'student') {
                const studentQuery = `
                    UPDATE member_student 
                    SET 
                        ${memberPW ? 'user_password = ?, ' : ''} 
                        user_name = ?, 
                        user_phone = ?, 
                        user_email = ?, 
                        user_major = ?, 
                        user_gender = ?, 
                        student_number = ?, 
                        student_grade = ?, 
                        student_class = ?
                    WHERE user_id = ?
                `;
                const studentValues = memberPW
                    ? [hashedPassword, memberName, memberPhone, memberEmail, memberMajor, memberGender, studentNum, studentGrade, studentClass, memberID]
                    : [memberName, memberPhone, memberEmail, memberMajor, memberGender, studentNum, studentGrade, studentClass, memberID];

                mysqlconnection.query(studentQuery, studentValues, (err, results) => {
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
                });
            }

            // 3. 교수일 경우 professor 테이블 업데이트
            if (memberType === 'professor') {
                // 학과장이 중복되는지 확인
                if (professorPosition === '학과장') {
                    const checkDeptHeadQuery = `
                        SELECT user_id FROM member_professor 
                        WHERE professor_position = '학과장' AND user_major = ? AND user_id != ?
                    `;
                    mysqlconnection.query(checkDeptHeadQuery, [memberMajor, memberID], (err, results) => {
                        if (err) {
                            return mysqlconnection.rollback(() => {
                                throw err;
                            });
                        }

                        if (results.length > 0) {
                            // 이미 해당 학과에 학과장이 존재하는 경우
                            return res.status(418).send('이미 해당 학과에 학과장이 존재합니다.');
                        }

                        // 학과장이 중복되지 않은 경우 교수 정보 업데이트
                        const professorQuery = `
                            UPDATE member_professor 
                            SET 
                                ${memberPW ? 'user_password = ?, ' : ''} 
                                user_name = ?, 
                                user_phone = ?, 
                                user_email = ?, 
                                user_major = ?, 
                                user_gender = ?, 
                                professor_position = ?
                            WHERE user_id = ?
                        `;
                        const professorValues = memberPW
                            ? [hashedPassword, memberName, memberPhone, memberEmail, memberMajor, memberGender, professorPosition, memberID]
                            : [memberName, memberPhone, memberEmail, memberMajor, memberGender, professorPosition, memberID];

                        mysqlconnection.query(professorQuery, professorValues, (err, results) => {
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
                        });
                    });
                } else {
                    // 학과장이 아닌 경우 교수 정보 업데이트
                    const professorQuery = `
                        UPDATE member_professor 
                        SET 
                            ${memberPW ? 'user_password = ?, ' : ''} 
                            user_name = ?, 
                            user_phone = ?, 
                            user_email = ?, 
                            user_major = ?, 
                            user_gender = ?, 
                            professor_position = ?
                        WHERE user_id = ?
                    `;
                    const professorValues = memberPW
                        ? [hashedPassword, memberName, memberPhone, memberEmail, memberMajor, memberGender, professorPosition, memberID]
                        : [memberName, memberPhone, memberEmail, memberMajor, memberGender, professorPosition, memberID];

                    mysqlconnection.query(professorQuery, professorValues, (err, results) => {
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
                    });
                }
            }

            // 4. 관리자인 경우 admin 테이블 업데이트
            if (memberType === 'admin') {
                const adminQuery = `
                    UPDATE admin 
                    SET 
                        ${memberPW ? 'user_password = ?, ' : ''} 
                        user_name = ?, 
                        user_phone = ?, 
                        user_email = ?, 
                        user_gender = ?
                    WHERE user_id = ?
                `;
                const adminValues = memberPW
                    ? [hashedPassword, memberName, memberPhone, memberEmail, memberGender, memberID]
                    : [memberName, memberPhone, memberEmail, memberGender, memberID];

                mysqlconnection.query(adminQuery, adminValues, (err, results) => {
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
                        res.status(200).send('관리자 정보 수정 성공');
                    });
                });
            }
        });
    } catch (err) {
        // console.error('데이터 수정 실패:', err);
        res.status(500).send('데이터 수정 실패');
    }
});


// GET 요청 처리 - 사용자 정보 조회
router.get('/:userID', (req, res) => {
    const { userID } = req.params;

    // 1. 학생 테이블에서 사용자 정보 조회
    const studentQuery = 'SELECT * FROM member_student WHERE user_id = ?';
    mysqlconnection.query(studentQuery, [userID], (err, studentResults) => {
        if (err) {
            // console.error('학생 정보 조회 중 오류 발생:', err);
            return res.status(500).send('서버 오류가 발생했습니다.');
        }

        // 2. 학생인 경우
        if (studentResults.length > 0) {
            const student = studentResults[0];
            return res.status(200).json({
                ...student,
                userType: 'student'
            });
        }

        // 3. 교수 테이블에서 사용자 정보 조회
        const professorQuery = 'SELECT * FROM member_professor WHERE user_id = ?';
        mysqlconnection.query(professorQuery, [userID], (err, professorResults) => {
            if (err) {
                // console.error('교수 정보 조회 중 오류 발생:', err);
                return res.status(500).send('서버 오류가 발생했습니다.');
            }

            // 4. 교수인 경우
            if (professorResults.length > 0) {
                const professor = professorResults[0];
                return res.status(200).json({
                    ...professor,
                    userType: 'professor'
                });
            }

            // 5. admin 테이블에서 사용자 정보 조회
            const adminQuery = 'SELECT * FROM admin WHERE user_id = ?';
            mysqlconnection.query(adminQuery, [userID], (err, adminResults) => {
                if (err) {
                    // console.error('관리자 정보 조회 중 오류 발생:', err);
                    return res.status(500).send('서버 오류가 발생했습니다.');
                }

                // 6. 관리자일 경우
                if (adminResults.length > 0) {
                    const admin = adminResults[0];
                    return res.status(200).json({
                        ...admin,
                        userType: 'admin'
                    });
                }

                // 7. 학생도 교수도 관리자도 아닌 경우
                return res.status(404).send('사용자를 찾을 수 없습니다.');
            });
        });
    });
});

module.exports = router;