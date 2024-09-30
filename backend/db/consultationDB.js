const express = require("express")
const router = express.Router()
const mysqlConnection = require("../server")

// 현재 사용자 정보 가져오기 (교수)
router.get("/current-professor-info", (req, res) => {
    const {professorId} = req.query
    // console.log("교수 아이디 : ", professorId)

    const selectProfessorQuery = `
        SELECT
            user_id,
            user_name,
            user_phone,
            user_email,
            user_major,
            professor_position
        FROM professor
        WHERE user_id = ?
    `

    mysqlConnection.query(selectProfessorQuery, [professorId], (err, results) => {
        if(err) {
            console.log("상담신청 - professor테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담신청 - professor테이블 검색 중 에러가 발생했습니다."})
        } else {
            res.json({
                professor: results,
            })
        }
    })
})

// 현재 사용자 정보 가져오기 (학생)
router.get("/current-student-info", (req, res) => {
    const {studentId} = req.query
    // console.log("학생 아이디 : ", studentId)

    const selectStudentQuery = `
        SELECT
            user_id,
            user_name,
            user_phone,
            user_email,
            user_major,
            student_number,
            student_grade
        FROM student
        WHERE user_id = ?
    `

    mysqlConnection.query(selectStudentQuery, [studentId], (err, results) => {
        if(err) {
            // console.log("상담신청 - student테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담신청 - student테이블 검색 중 에러가 발생했습니다."})
        } else {
            res.json({
                student: results,
            })
        }
    })
})

// 나의 교수정보 가져오기
router.get("/get-my-professor-info", (req, res) => {
    const {studentMajor} = req.query
    console.log("studentMajor : ", studentMajor)

    const selectProfessorQuery = `
        SELECT
            user_id,
            user_name,
            user_major,
            user_phone,
            user_email,
            professor_position
        FROM professor
        WHERE user_major = ? AND professor_position = "학과장"
    `

    mysqlConnection.query(selectProfessorQuery, [studentMajor], (err, results) => {
        if(err) {
            console.log("상담신청 - professor테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담신청 - professor테이블 검색 중 에러가 발생했습니다."})
        } else {
            console.log(results)
            res.json({
                professor: results,
            })
        }
    })
})

// 상담이력 데이터 불러오기 (학생)
router.get("/my-counsel", (req, res) => {
    const {userId} = req.query
    console.log("상담이력ID : ", userId)

    const selectMyConsultationStudentQuery = `
        SELECT 
            consultation_id,
            professor_name,
            counsel_date,
            counsel_time,
            consultation_category,
            employment_classification,
            counsel_content,
            counsel_state
        FROM consultation
        WHERE student_id = ?
        ORDER BY counsel_date, counsel_time ASC
    `
    
    mysqlConnection.query(selectMyConsultationStudentQuery, [userId], (err, results) => {
        if(err) {
            console.log("상담이력 - consultation테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담이력 - consultation테이블 검색 중 에러가 발생했습니다."})
        } else {
            res.json({
                myCounsel: results,
            })
        }
    })
})

// 상담신청목록 데이터 불러오기 (교수)
router.get("/req-for-consultation-list", (req, res) => {
    const {professorId} = req.query
    console.log("상담신청목록(사용자아이디) : ", professorId)

    const selectMyConsultationProfessorQuery = `
        SELECT 
            consultation_id,
            student_name,
            counsel_date,
            counsel_time,
            consultation_category,
            employment_classification,
            counsel_content,
            counsel_state,
            createdAt
        FROM consultation
        WHERE professor_id = ?
        ORDER BY counsel_date, counsel_time ASC
    `
    
    mysqlConnection.query(selectMyConsultationProfessorQuery, [professorId], (err, results) => {
        if(err) {
            console.log("상담신청목록 - consultation테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담신청목록 - consultation테이블 검색 중 에러가 발생했습니다."})
        } else {
            res.json({
                reqForConsultationList: results,
            })
        }
    })
})

// counsel_schedule의 등록된 날짜 전부 가져오기
router.get("/counsel-dates", (req, res) => {
    const {professorId} = req.query
    console.log("counsel_schedule의 등록된 날짜 전부 가져오기 : ", professorId)

    let allCounselDates, allCounselDatesAndTimes

    const selectCounselDatesQuery = `
        SELECT DISTINCT counsel_date, counsel_state FROM counsel_schedule
        WHERE professor_id = ? AND counsel_date >= now()
    `

    const selectAllCounselDatesQuery = `
        SELECT counsel_date, counsel_time, counsel_state FROM counsel_schedule
        WHERE professor_id = ? AND counsel_date >= now()
    `

    mysqlConnection.query(selectCounselDatesQuery, [professorId], (err, results) => {
        if (err) {
            console.error('DB SELECT Error: ', err)
            return res.status(500).send('SELECT 중 오류가 발생했습니다.')
        } else {
            allCounselDates = results
            mysqlConnection.query(selectAllCounselDatesQuery, [professorId], (err, results) => {
                if (err) {
                    console.error('DB SELECT Error: ', err)
                    return res.status(500).send('SELECT 중 오류가 발생했습니다.')
                } else {
                    allCounselDatesAndTimes = results
                    res.json({
                        allCounselDates,
                        allCounselDatesAndTimes
                    })
                }
            })
        }
    })
})

// counsel_schedule의 등록된 날짜 가져오기
router.get("/counsel-date", (req, res) => {
    const {
        professorId,
        professorName,
        professorMajor,
        counselDate,
        userType
    } = req.query

    console.log("등록된 날짜 확인 : ", professorId)
    console.log("등록된 날짜 확인 : ", professorName)
    console.log("등록된 날짜 확인 : ", professorMajor)
    console.log("등록된 날짜 확인 : ", counselDate)
    console.log("등록된 날짜 확인 : ", userType)

    const selectCheckDateQuery = userType === 'professor' ? 
        `
            SELECT counsel_date FROM counsel_schedule
            WHERE professor_id = ? AND counsel_date = ? LIMIT 1
        ` : `
            SELECT counsel_date FROM counsel_schedule
            WHERE professor_name = ? AND professor_major = ? AND counsel_date = ? LIMIT 1
        `

    const selectCheckDateAndCounselStateQuery = userType === 'professor' ? 
        `
            SELECT counsel_date, counsel_time FROM counsel_schedule
            WHERE professor_id = ? AND counsel_date = ? AND counsel_state = 0
        ` : `
                SELECT counsel_date, counsel_time FROM counsel_schedule
                WHERE
                    professor_name = ?
                    AND professor_major = ?
                    AND counsel_date = ?
                    AND counsel_state = 0
            `

    const queryParams = userType === 'professor' ?
        [professorId, counselDate] : [professorName, professorMajor, counselDate]

    mysqlConnection.query(selectCheckDateQuery, queryParams, (err, results) => {
        if (err) {
            console.error('DB SELECT Error: ', err)
            return res.status(500).send('SELECT 중 오류가 발생했습니다.')
        }
        
        // 결과 확인
        if (results.length === 0) {
            return res.json({ checkedDate: [], checkedDateAndTime: [] })
        }
        
        mysqlConnection.query(selectCheckDateAndCounselStateQuery, queryParams, (err, stateResults) => {
            if (err) {
                console.error('DB SELECT Error: ', err)
                return res.status(500).send('SELECT 중 오류가 발생했습니다.')
            }
            res.json({
                checkedDate: results,
                checkedDateAndTime: stateResults
            })
        })
    })
})

// 상담날짜등록 (교수)
router.put("/counsel-date-register/register-date", (req, res) => {
    // put일 경우 req.query가 아닌 body로 읽어야 함
    console.log(req.body)
    const professorId = req.body.professorId
    const counselDate = req.body.counselDate
    const professorName = req.body.professorName
    const professorMajor = req.body.professorMajor
    console.log("상담날짜등록 : ", professorId)
    console.log("상담날짜등록 : ", counselDate)
    console.log("상담날짜등록 : ", professorName)
    console.log("상담날짜등록 : ", professorMajor)

    const timeData = [
        "09시~10시",
        "10시~11시",
        "11시~12시",
        "13시~14시",
        "14시~15시",
        "16시~17시"
    ]

    timeData.forEach((data) => {
        const insertCounselScheduleQuery = `
            INSERT INTO counsel_schedule (
                professor_id,
                professor_name,
                counsel_date,
                counsel_time,
                createdAt,
                professor_major
            ) VALUES (?, ?, ?, ?, now(), ?)
        `

        mysqlConnection.query(insertCounselScheduleQuery, [professorId, professorName, counselDate, data, professorMajor], (err, results) => {
            if(err) {
                console.error('DB Insert Error: ', err)
            }
        })
    })

    // 응답 전송
    res.status(200).json({ message: "상담가능날짜가 성공적으로 등록되었습니다." })
})

// 날짜등록취소(삭제)
router.delete("/counsel-date-delete", (req, res) => {
    console.log(req.body)
    const professorId = req.body.userId
    const counselDate = req.body.counselDate

    const updateMyCounselCancelQuery = `
        UPDATE consultation SET counsel_state = '승인거절'
        WHERE professor_id = ? AND counsel_date = ?
    `

    const deleteQuery = `
        DELETE FROM counsel_schedule
        WHERE professor_id = ? AND counsel_date = ?
    `

    mysqlConnection.query(deleteQuery, [professorId, counselDate], (err, results) => {
        if(err) {
            console.log("날짜등록취소 - counsel_schedule 테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "날짜등록취소 - counsel_schedule 테이블 검색 중 에러가 발생했습니다."})
        } else {
            mysqlConnection.query(updateMyCounselCancelQuery, [professorId, counselDate], (err, results) => {
                if(err) {
                    console.log("날짜등록취소 - counsel_schedule 테이블 검색 중 에러 발생 : ", err)
                    return res.status(500).json({ message: "날짜등록취소 - counsel_schedule 테이블 검색 중 에러가 발생했습니다."})
                } else {
                    return res.status(200).json({ message: "날짜등록취소 - 승인거절이 정상적으로 완료되었습니다."})
                }
            })
        }
    })
})

// 상담날짜 데이터 불러오기

// 상담일시가 지나기전에 상담 취소를 했을 경우
router.put("")

// 상담 상태 업데이트 (상담취소, 승인거절, 승인대기중, 상담승인, 상담완료)
// 상담완료

// 상담취소
router.put("/my-counsel/counsel-cancel", (req, res) => {
    const {userId, consultationId} = req.body
    console.log("상담이력(상담취소) : ", userId)
    console.log("상담이력(상담취소) : ", consultationId)

    const updateMyCounselCancelQuery = `
        UPDATE consultation SET counsel_state = '상담취소'
        WHERE student_id = ? AND consultation_id = ?
    `

    mysqlConnection.query(updateMyCounselCancelQuery, [userId, consultationId], (err, results) => {
        if(err) {
            console.log("상담취소 - consultation테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담취소 - consultation테이블 검색 중 에러가 발생했습니다."})
        } else {
            return res.status(200).json({ message: "상담취소 - 상담취소가 정상적으로 완료되었습니다."})
        }
    })
})
// 상담승인
router.put("/req-for-consultation-list/counsel-approve", (req, res) => {
    const {professorId, consultationId} = req.body
    console.log("상담신청목록(상담승인) : ", professorId)
    console.log("상담신청목록(상담승인) : ", consultationId)

    const updateMyCounselApproveQuery = `
        UPDATE consultation SET counsel_state = '상담승인'
        WHERE professor_id = ? AND consultation_id = ?
    `

    mysqlConnection.query(updateMyCounselApproveQuery, [professorId, consultationId], (err, results) => {
        if(err) {
            console.log("상담승인 - consultation테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담승인 - consultation테이블 검색 중 에러가 발생했습니다."})
        } else {
            return res.status(200).json({ message: "상담승인 - 상담승인이 정상적으로 완료되었습니다."})
        }
    })
})

// 상담거절
router.put("/req-for-consultation-list/counsel-refusal", (req, res) => {
    const {professorId, consultationId, counselDate, counselTime} = req.body
    console.log("상담신청목록(승인거절) : ", professorId)
    console.log("상담신청목록(승인거절) : ", consultationId)

    const updateMyCounselCancelQuery = `
        UPDATE consultation SET counsel_state = '승인거절'
        WHERE professor_id = ? AND consultation_id = ?
    `

    const updateReqForConsultationListQuery = `
        UPDATE counsel_schedule SET counsel_state = 0
        WHERE professor_id = ? AND counsel_date = ? AND counsel_time = ?
    `
    mysqlConnection.query(updateMyCounselCancelQuery, [professorId, consultationId], (err, results) => {
        if(err) {
            console.log("승인거절 - consultation테이블 검색 중 에러 발생 : ", err)
        } else {
            mysqlConnection.query(updateReqForConsultationListQuery, [professorId, counselDate, counselTime], (err, results) => {
                if(err) {
                    console.log("승인거절 - consultation테이블 검색 중 에러 발생 : ", err)
                    return res.status(500).json({ message: "승인거절 - consultation테이블 검색 중 에러가 발생했습니다."})
                } else {
                    return res.status(200).json({ message: "승인거절 - 승인거절이 정상적으로 완료되었습니다."})
                }
            })
        }
    })
})

// counsel_schedule 테이블의 counsel_state 상태값 확인
router.get("/check-counsel-state", (req, res) => {
    const {counselDate, counselTime, professorId} = req.body

    const selectCounselStateQuery = `
        SELECT counsel_state
        FROM counsel_schedule
        WHERE professor_id = ? AND counsel_date = ? AND counsel_time = ?
    `

    mysqlConnection.query(selectCounselStateQuery, [professorId, counselDate, counselTime], (err, results) => {
        if(err) {
            console.log("상담상태 - 상태업데이트 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담상태 - 상태업데이트 중 에러가 발생했습니다."})
        } else {
            res.json({
                counselState: results
            })
        }
    })
})

// counsel_schedule 테이블의 counsel_state 상태 업데이트
router.put("/update-counsel-state", (req, res) => {
    console.log("상담상태 업데이트", req.body)
    // console.log(req.body.counselDate)
    // console.log(req.body.counselTime)
    const {counselDate, counselTime, professorId, counselState} = req.body

    const updateCounselDateAndTimeQuery = `
        UPDATE counsel_schedule
        SET counsel_state = ?
        WHERE professor_id = ? AND counsel_date = ? AND counsel_time = ?
    `

    mysqlConnection.query(updateCounselDateAndTimeQuery, [counselState, professorId, counselDate, counselTime], (err, results) => {
        if(err) {
            console.log("상담상태 - 상태업데이트 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담상태 - 상태업데이트 중 에러가 발생했습니다."})
        } else {
            return res.status(200).json({ message: "상담상태 - 상담상태가 정상적으로 업데이트 되었습니다."})
        }
    })
})

// 상담신청 (학생)
router.post("/req-for-consultation", (req, res) => {
    console.log(req.body)
    // req.body에서 데이터 추출
    const {
        studentId,
        studentName,
        studentMajor,
        studentNumber,
        studentGrade,
        counselDate,
        counselTime,
        consultationCategory,
        employmentClassification,
        studentPhone,
        studentEmail,
        counselContent,
        professorId,
        professorName,
        professorMajor
    } = req.body

    const insertConsultationQuery = `
        INSERT INTO consultation (
            counsel_date, 
            counsel_time,
            consultation_category,
            employment_classification,
            counsel_content,
            student_id,
            student_name,
            student_number,
            student_major, 
            student_grade,
            student_phone,
            student_email,
            professor_id,
            professor_name,
            professor_major,
            createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())
    `

    mysqlConnection.query(insertConsultationQuery, [
        counselDate,
        counselTime,
        consultationCategory,
        employmentClassification,
        counselContent,
        studentId,
        studentName,
        studentNumber,
        studentMajor,
        studentGrade,
        studentPhone,
        studentEmail,
        professorId,
        professorName,
        professorMajor
    ], (err, results) => {
        if(err) {
            console.error('DB Insert Error: ', err)
            return res.status(500).send('INSERT 중 오류가 발생했습니다.')
        }
        console.log('results: ', results)
        // 응답 전송
        res.status(200).json({ message: "상담 신청이 성공적으로 접수되었습니다." })
    })
})

module.exports = router