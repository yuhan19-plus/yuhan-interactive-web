/** 회원 정보 가져오기 - 임성준
 * - 현재 사용자 정보 가져오기 (학생, 교수)
 * - 나의 교수정보 가져오기
 * - 상담이력 데이터 불러오기 (학생)
 */
const express = require("express")
const router = express.Router()
const mysqlConnection = require("../../server")

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
            // console.log("상담신청 - professor테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담신청 - professor테이블 검색 중 에러가 발생했습니다."})
        } else {
            res.json({
                professor: results,
            })
        }
    })
})

// 나의 교수정보 가져오기
router.get("/get-my-professor-info", (req, res) => {
    const {studentMajor} = req.query
    // console.log("studentMajor : ", studentMajor)

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
            // console.log("상담신청 - professor테이블 검색 중 에러 발생 : ", err)
            return res.status(500).json({ message: "상담신청 - professor테이블 검색 중 에러가 발생했습니다."})
        } else {
            // console.log(results)
            res.json({
                professor: results,
            })
        }
    })
})

module.exports = router