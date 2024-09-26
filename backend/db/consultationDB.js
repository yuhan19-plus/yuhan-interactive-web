const express = require("express")
const router = express.Router()
const mysqlConnection = require("../server")

// 교수정보 가져오기
router.get("/current-professor-info/:userId", (req, res) => {
    const professorId = req.params.userId
    console.log("교수 아이디 : ", professorId)

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

// 학생정보 가져오기
router.get("/current-student-info/:userId", (req, res) => {
    const studentId = req.params.userId
    console.log("학생 아이디 : ", studentId)

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
            console.log("상담신청 - student테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담신청 - student테이블 검색 중 에러가 발생했습니다."})
        } else {
            res.json({
                student: results,
            })
        }
    })
})
// 교수 정보 가져오기(학생일 경우)
router.get("/get-my-professor-info/:userMajor", (req, res) => {
    const userMajor = req.params.userMajor
    console.log("userMajor : ", userMajor)

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

    mysqlConnection.query(selectProfessorQuery, [userMajor], (err, results) => {
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
router.get("/my-counsel/:userId", (req, res) => {
    const userId = req.params.userId
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
        WHERE student_id = ?`
    
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
router.get("/req-for-consultation-list/:userId", (req, res) => {
    const userId = req.params.userId
    console.log("상담신청목록(사용자아이디) : ", userId)

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
        WHERE professor_id = ?`
    
    mysqlConnection.query(selectMyConsultationProfessorQuery, [userId], (err, results) => {
        if(err) {
            console.log("상담신청목록 - consultation테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담신청목록 - consultation테이블 검색 중 에러가 발생했습니다."})
        } else {
            res.json({
                myCounsel: results,
            })
        }
    })
})

// 상담날짜등록 (교수)
router.put("/counsel-date-register/register-date/:userId/:userName/:counselDate", (req, res) => {
    const {userId, counselDate, userName} = req.params
    console.log("상담날짜등록 : ", userId)
    console.log("상담날짜등록 : ", counselDate)
    console.log("상담날짜등록 : ", userName)

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
                createdAt
            ) VALUES (?, ?, ?, ?, now())
        `

        mysqlConnection.query(insertCounselScheduleQuery, [userId, userName, counselDate, data], (err, results) => {
            if(err) {
                console.error('DB Insert Error: ', err)
                return res.status(500).send('INSERT 중 오류가 발생했습니다.')
            }
        })
    })

    // 응답 전송
    res.status(200).json({ message: "상담가능날짜가 성공적으로 등록되었습니다." })
})

// 상담날짜 데이터 불러오기

// 상담 상태 업데이트 (상담취소, 승인거절, 승인대기중, 상담승인, 상담완료)
// 상담완료

// 상담취소
router.put("/my-counsel/counsel-cancel/:userId/:consultationId", (req, res) => {
    const {userId, consultationId} = req.params
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
router.put("/req-for-consultation-list/counsel-approve/:userId/:consultationId", (req, res) => {
    const {userId, consultationId} = req.params
    console.log("상담신청목록(상담승인) : ", userId)
    console.log("상담신청목록(상담승인) : ", consultationId)

    const updateMyCounselApproveQuery = `
        UPDATE consultation SET counsel_state = '상담승인'
        WHERE professor_id = ? AND consultation_id = ?
    `

    mysqlConnection.query(updateMyCounselApproveQuery, [userId, consultationId], (err, results) => {
        if(err) {
            console.log("상담승인 - consultation테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담승인 - consultation테이블 검색 중 에러가 발생했습니다."})
        } else {
            return res.status(200).json({ message: "상담승인 - 상담승인이 정상적으로 완료되었습니다."})
        }
    })
})
// 상담거절
router.put("/req-for-consultation-list/counsel-refusal/:userId/:consultationId", (req, res) => {
    const {userId, consultationId} = req.params
    console.log("상담신청목록(승인거절) : ", userId)
    console.log("상담신청목록(승인거절) : ", consultationId)

    const updateMyCounselCancelQuery = `
        UPDATE consultation SET counsel_state = '승인거절'
        WHERE professor_id = ? AND consultation_id = ?
    `

    mysqlConnection.query(updateMyCounselCancelQuery, [userId, consultationId], (err, results) => {
        if(err) {
            console.log("승인거절 - consultation테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "승인거절 - consultation테이블 검색 중 에러가 발생했습니다."})
        } else {
            return res.status(200).json({ message: "승인거절 - 승인거절이 정상적으로 완료되었습니다."})
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