const express = require("express")
const router = express.Router()
const mysqlConnection = require("../server")

router.get("/:userId", (req, res) => {
    const userId = req.params.userId
    console.log("학생아이디 : ", userId)

    // 응답 전송
    res.status(200).json({ message: "userId의 값을 성공적으로 가져왔습니다." })
})

// POST 요청 처리
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