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

// 점수 업데이트 함수 (프라미스 기반)
const updateDeptScores = async (departmentData) => {
    let currentRank = 0;
    let previousScore = null;
    let displayRank = 0;

    try {
        for (let i = 0; i < departmentData.length; i++) {
            const { deptName, score } = departmentData[i];

            // 공동 순위 처리: 점수가 이전 학과와 같으면 순위를 증가시키지 않음
            if (score !== previousScore) {
                displayRank = currentRank + 1;
            }
            currentRank = displayRank; // 현재 순위는 항상 displayRank를 따라감
            previousScore = score;

            // 순위에 따른 점수 부여 (1등은 5점, 2등은 4점, ...)
            let scoreToAdd = Math.max(6 - displayRank, 1); // 최소 1점까지 부여

            // 점수 업데이트 쿼리
            const updateScoreQuery = `
                INSERT INTO dept_rank (dept_name, score)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE score = score + VALUES(score);
            `;

            // 프라미스 기반으로 쿼리 실행
            await mysqlconnection.promise().query(updateScoreQuery, [deptName, scoreToAdd]);

            console.log('점수 업데이트 성공:', deptName);
        }
        console.log('모든 학부 점수 업데이트 완료');
    } catch (err) {
        console.error('점수 업데이트 중 오류 발생:', err);
        throw err; // 오류 발생 시 오류를 던져서 상위에서 처리
    }
};

// API 엔드포인트: 학부 점수 업데이트
router.post('/updateScores', async (req, res) => {
    const { departmentData } = req.body; // 프론트엔드에서 departmentData로 전송

    // 디버깅용: 전송된 데이터 출력
    console.log('Received departmentData:', departmentData);

    if (!departmentData || departmentData.length === 0) {
        return res.status(400).json({ message: '순위 데이터가 없습니다.' });
    }

    try {
        await updateDeptScores(departmentData);
        res.status(200).json({ message: '점수 업데이트 완료' });
    } catch (error) {
        console.error('점수 업데이트 중 오류 발생:', error);
        res.status(500).json({ message: '점수 업데이트 중 오류 발생', error });
    }
});

module.exports = router;
