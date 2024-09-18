/** 파일 생성자 : 이석재
 *  deptRecAdmindb 모듈화
 * 질문 조회, 질문 수정, 학과 점수 및 순위 조회 기능
 * */

const express = require('express');
const router = express.Router();
const mysqlconnection = require('../server'); // DB 연결

// 학과별 질문 조회 API
router.get('/questions/:deptName', (req, res) => {
    const { deptName } = req.params;
    
    const query = `SELECT question_id, question FROM dept_questions WHERE dept_name = ?`;

    mysqlconnection.query(query, [deptName], (err, results) => {
        if (err) {
            console.error("질문 조회 중 에러 발생:", err);
            return res.status(500).send("질문 조회 중 오류가 발생했습니다.");
        }

        res.json(results);
    });
});

// 질문 수정 API
router.put('/questions/:questionId', (req, res) => {
    const { questionId } = req.params;
    const { question } = req.body;

    const updateQuery = `UPDATE dept_questions SET question = ? WHERE question_id = ?`;

    mysqlconnection.query(updateQuery, [question, questionId], (err, results) => {
        if (err) {
            console.error("질문 수정 중 에러 발생:", err);
            return res.status(500).send("질문 수정 중 오류가 발생했습니다.");
        }

        res.send("질문 수정 성공");
    });
});

// 학과 점수 및 순위 조회 API
router.get('/rankings', (req, res) => {
    const query = `SELECT dept_name, score FROM dept_rank ORDER BY score DESC`;

    mysqlconnection.query(query, (err, results) => {
        if (err) {
            console.error("점수 조회 중 에러 발생:", err);
            return res.status(500).send("점수 조회 중 오류가 발생했습니다.");
        }

        let rank = 1;           // 현재 순위
        let prevScore = null;   // 이전 학과의 점수
        let actualRank = 1;     // 실제로 표시할 순위 (공동 순위를 포함)

        const rankings = results.map((row, index) => {
            if (row.score === prevScore) {
                // 점수가 동일한 경우 공동 순위 유지
                return {
                    dept_name: row.dept_name,
                    score: row.score,
                    rank: actualRank,  // 동일한 순위 부여
                };
            } else {
                // 새로운 점수인 경우 순위를 증가시킴
                actualRank = rank;  // 실제 순위를 업데이트
                prevScore = row.score;  // 이전 점수 갱신
                rank += 1;  // 다음 항목을 위해 rank 증가
                return {
                    dept_name: row.dept_name,
                    score: row.score,
                    rank: actualRank,  // 새로운 순위 부여
                };
            }
        });

        res.json(rankings);
    });
});


module.exports = router;
