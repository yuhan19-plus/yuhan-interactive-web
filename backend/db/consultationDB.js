const express = require("express")
const router = express.Router()
const mysqlConnection = require("../server")

// 학생정보 가져오기
router.get("/:userId", (req, res) => {
    const userId = req.params.userId
    console.log("사용자아이디 : ", userId)

    const selectUserQuery = "SELECT user_phone, user_email, user_major FROM user WHERE user_id = ?"
    const selectStudentQuery = "SELECT student_number, student_grade FROM student WHERE student_id = ?"
    let userData, studentData

    // 응답이 2개일 경우 먼저 처리하는 것을 저장한 후 한번에 전송해야 함
    mysqlConnection.query(selectUserQuery, [userId], (err, results) => {
        if(err) {
            console.log("상담신청 - user테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담신청 - user테이블 검색 중 에러가 발생했습니다."})
        } else {
            userData = results
            mysqlConnection.query(selectStudentQuery, [userId], (err, results) => {
                if(err) {
                    console.log("상담신청 - student테이블 검색 중 에러 발생 : ", err)
                    return res.status(500).json({ message: "상담신청 - student테이블 검색 중 에러가 발생했습니다."})
                } else {
                    studentData = results
                    res.json({
                        user: userData,
                        student: studentData
                    })
                }
            })
        }
    })
})

// 상담이력 데이터 불러오기 (학생)
router.get("/:userId", (req, res) => {
    const userId = req.params.userId
    console.log(userId)
})

// 상담신청목록 데이터 불러오기 (교수)

// 상담날짜등록 (교수)

// 상담날짜 데이터 불러오기

// 상담 상태 업데이트 (상담취소, 승인거절, 승인대기중, 상담승인, 상담완료)

// 상담신청 (학생)
router.post("/", (req, res) => {
    console.log(req.body)
    // req.body에서 데이터 추출
    const {
        professorMajor,
        studentMajor,
        studentNum,
        studentGrade,
        counselDate,
        counselTime,
        counselFile,
        consultationCategory,
        employmentClassification,
        studentPhone,
        studentEmail,
        counselContent
    } = req.body

    const insertConsultationQuery = `
        INSERT INTO consultation (
            professor_major, 
            student_major, 
            student_num, 
            student_grade, 
            counsel_date, 
            counsel_time,
            consultation_category,
            employment_classification,
            student_phone,
            student_email,
            counsel_content,
            createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())
    `

    mysqlConnection.query(insertConsultationQuery, [
        professorMajor,
        studentMajor,
        studentNum,
        studentGrade,
        counselDate,
        counselTime,
        consultationCategory,
        employmentClassification,
        studentPhone,
        studentEmail,
        counselContent
    ], (err, results) => {
        if(err) {
            return res.status(500).send('INSERT 중 오류가 발생했습니다.')
        }
        console.log('results: ', results)
        // 응답 전송
        res.status(200).json({ message: "상담 신청이 성공적으로 접수되었습니다." })
    })
})

module.exports = router