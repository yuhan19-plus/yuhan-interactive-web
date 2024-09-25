const express = require("express")
const router = express.Router()
const mysqlConnection = require("../server")

// 교수데이터 가져오기 (학생일 때)
router.get("/getProfessorData/:userType/:userMajor", (req, res) => {
    const userType = req.params.userType
    const userMajor = req.params.userMajor
    console.log("userType : ", userType)
    console.log("userMajor : ", userMajor)
})

// 사용자 정보 가져오기
router.get("/current-user/:userType/:userId", (req, res) => {
    const userId = req.params.userId
    const userType = req.params.userType
    console.log("사용자아이디 : ", userId)
    console.log("사용자타입 : ", userType)

    const selectUserQuery = `
        SELECT user_name, user_phone, user_email, user_major, user_type
        FROM user
        WHERE user_id = ?
    `
    
    const selectStudentQuery = `
        SELECT student_number, student_grade
        FROM student
        WHERE student_id = ?
    `

    const selectProfessorQuery = `
        SELECT professor_position
        FROM professor
        WHERE professor_id = ?
    `
    
    let userData, studentData, professorData
    
    // 응답이 2개일 경우 먼저 처리하는 것을 저장한 후 한번에 전송해야 함
    mysqlConnection.query(selectUserQuery, [userId], (err, results) => {
        if(err) {
            console.log("상담신청 - user테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담신청 - user테이블 검색 중 에러가 발생했습니다."})
        } else {
            userData = results
            if(userType === 'student') {
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
            } else if(userType === 'professor') {
                mysqlConnection.query(selectProfessorQuery, [userId], (err, results) => {
                    if(err) {
                        console.log("상담신청 - professor테이블 검색 중 에러 발생 : ", err)
                        return res.status(500).json({ message: "상담신청 - professor테이블 검색 중 에러가 발생했습니다."})
                    } else {
                        professorData = results
                        res.json({
                            user: userData,
                            professor: professorData
                        })
                    }
                })
            } else {
                return res.status(500).json({ message: "상담신청 - 에러가 발생했습니다."})
            }
        }
    })
})

// 상담이력 데이터 불러오기 (학생)
router.get("/my-counsel/:userType/:userId", (req, res) => {
    const userId = req.params.userId
    const userType = req.params.userType
    console.log("상담이력ID : ", userId)
    console.log("상담이력UserType : ", userType)

    const selectMyConsultationStudentQuery = `
        SELECT 
        consultation_id,
        user_id,
        counsel_date,
        counsel_time,
        consultation_category,
        employment_classification,
        counsel_content,
        counsel_state
        FROM consultation WHERE user_id = ?`
    
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
router.get("/req-for-consultation-list/:userType/:userId", (req, res) => {
    const userId = req.params.userId
    const userType = req.params.userType
    console.log("상담신청목록(사용자아이디) : ", userId)
    console.log("상담신청목록(사용자타입) : ", userType)

    const selectMyConsultationProfessorQuery = `
        SELECT 
        consultation_id,
        user_id,
        user_name,
        counsel_date,
        counsel_time,
        consultation_category,
        employment_classification,
        counsel_content,
        counsel_state
        FROM consultation WHERE student_major = ?`
    
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

// 상담날짜 데이터 불러오기

// 상담 상태 업데이트 (상담취소, 승인거절, 승인대기중, 상담승인, 상담완료)
router.put("/my-counsel/:userId/:consultationId", (req, res) => {
    const {userId, consultationId} = req.params
    console.log("상담이력(상담취소) : ", userId)
    console.log("상담이력(상담취소) : ", consultationId)

    const updateMyCounselCancelQuery = `
        UPDATE consultation SET counsel_state = '상담취소'
        WHERE user_id = ? AND consultation_id = ?
    `

    mysqlConnection.query(updateMyCounselCancelQuery, [userId, consultationId], (err, results) => {
        if(err) {
            console.log("상담이력 - consultation테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담이력 - consultation테이블 검색 중 에러가 발생했습니다."})
        } else {
            return res.status(200).json({ message: "상담취소 - 상담취소가 정상적으로 완료되었습니다."})
        }
    })
})

// 상담신청 (학생)
router.post("/req-for-consultation", (req, res) => {
    console.log(req.body)
    // req.body에서 데이터 추출
    const {
        userId,
        counselDate,
        counselTime,
        consultationCategory,
        employmentClassification,
        counselContent,
        studentMajor,
        studentNum,
        studentGrade,
        studentPhone,
        studentEmail,
        professorMajor
    } = req.body

    const insertConsultationQuery = `
        INSERT INTO consultation (
            user_id, 
            counsel_date, 
            counsel_time,
            consultation_category,
            employment_classification,
            counsel_content,
            student_major, 
            student_num, 
            student_grade,
            student_phone,
            student_email,
            professor_major,
            createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())
    `

    mysqlConnection.query(insertConsultationQuery, [
        userId,
        counselDate,
        counselTime,
        consultationCategory,
        employmentClassification,
        counselContent,
        studentMajor,
        studentNum,
        studentGrade,
        studentPhone,
        studentEmail,
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