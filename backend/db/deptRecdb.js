/** 파일 생성자 : 이석재
 *  deptRecdb 모듈화
 * 학부 질문 가져오기 기능, 학부 추천 점수 업데이트 기능
 * */
const express = require('express');
const router = express.Router();
const mysqlconnection = require('../server'); // MySQL 연결 객체

// 학부 질문 가져오기
router.get('/questions', (req, res) => {
    const query = 'SELECT * FROM dept_questions';
    mysqlconnection.query(query, (err, results) => {
        if (err) {
            console.error('학부 질문 가져오기 중 오류 발생:', err);
            return res.status(500).send('서버 오류가 발생했습니다.');
        }
        res.status(200).json(results);
    });
});

// 학부 추천 점수 업데이트
router.post('/updateRank', (req, res) => {
    const { rankings } = req.body; // rankings는 [{dept_name: '공학부', score: 5}, ...] 형식

    const promises = rankings.map(ranking => {
        const { dept_name, score } = ranking;
        
        // 기존 점수에 새 점수 더하기
        const query = `
            UPDATE dept_rank 
            SET score = score + ? 
            WHERE dept_name = ?
        `;
        
        return new Promise((resolve, reject) => {
            mysqlconnection.query(query, [score, dept_name], (err, results) => {
                if (err) {
                    console.error(`학부 점수 업데이트 중 오류 발생 (${dept_name}):`, err);
                    return reject(err);
                }
                resolve(results);
            });
        });
    });

    Promise.all(promises)
        .then(() => {
            res.status(200).send('학부 점수 업데이트 성공');
        })
        .catch(err => {
            res.status(500).send('학부 점수 업데이트 실패');
        });
});

module.exports = router;
