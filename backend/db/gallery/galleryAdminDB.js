/** 파일 생성자 : 이석재
 *  galleryAdminDB 모듈화
 *  갤러리 데이터 가져오기 및 수정 기능
 * */
const express = require("express");
const router = express.Router(); // Express 라우터 객체 생성
const mysqlconnection = require("../../server"); // server.js에서 MySQL 연결 객체 가져오기

// 모든 작품의 상세 정보를 가져오는 기능
router.get("/fetchAllWorkInfo", (req, res) => {
    const query = "SELECT * FROM gallerywork"; // 모든 열을 가져오기 위한 쿼리

    mysqlconnection.query(query, (error, results) => {
        if (error) {
            // console.error("작품 데이터 조회 중 에러 발생:", error);
            return res.status(500).json({ message: "작품 데이터를 가져오는 중 오류가 발생했습니다." });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "작품 데이터가 없습니다." });
        }

        const encodedResults = results.map(row => ({
            ...row,
            work_picture: `data:image/png;base64,${row.work_picture.toString('base64')}`
        }));

        res.status(200).json(encodedResults);
    });
});

// 특정 작품의 정보를 수정하는 기능
router.put("/updateWorkInfo/:id", (req, res) => {
    const workId = req.params.id;
    const { work_name, team_name, team_member, tech_stack, work_desc, work_repository_url, work_picture } = req.body;

    // 이미지 데이터를 Buffer 형식으로 디코딩하여 저장
    const decodedImage = work_picture ? Buffer.from(work_picture.split(",")[1], 'base64') : null;

    const query = `
        UPDATE gallerywork 
        SET work_name = ?, team_name = ?, team_member = ?, tech_stack = ?, work_desc = ?, work_repository_url = ?, work_picture = ?
        WHERE work_id = ?
    `;
    const values = [work_name, team_name, team_member, tech_stack, work_desc, work_repository_url, decodedImage, workId];

    mysqlconnection.query(query, values, (error, results) => {
        if (error) {
            // console.error("작품 데이터 수정 중 에러 발생:", error);
            return res.status(500).json({ message: "작품 데이터를 수정하는 중 오류가 발생했습니다." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "해당 작품을 찾을 수 없습니다." });
        }

        res.status(200).json({ message: "작품 데이터가 성공적으로 수정되었습니다." });
    });
});

module.exports = router; // 라우터 객체 내보내기