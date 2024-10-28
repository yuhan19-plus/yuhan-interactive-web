/** 파일 생성자 : 이석재
 *  gallerydb 모듈화
 *  갤러리 데이터 가져오기 및 수정 기능
 * */
const express = require("express");
const router = express.Router(); // Express 라우터 객체 생성
const mysqlconnection = require("../server"); // server.js에서 MySQL 연결 객체 가져오기

// /fetchPicture 경로로 GET 요청 시 work_id와 work_picture를 가져오는 기능
router.get("/fetchPicture", (req, res) => {
    const query = "SELECT work_id, work_picture FROM gallerywork";

    mysqlconnection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching pictures:", error);
            return res.status(500).json({ message: "사진 데이터를 가져오는 중 오류가 발생했습니다." });
        }

        // 데이터가 없는 경우
        if (results.length === 0) {
            return res.status(404).json({ message: "사진 데이터가 없습니다." });
        }

        // BLOB 데이터를 Base64로 인코딩
        const encodedResults = results.map(row => ({
            work_id: row.work_id,
            work_picture: `data:image/png;base64,${row.work_picture.toString('base64')}`
        }));

        // 데이터가 있는 경우
        res.status(200).json(encodedResults);
    });
});

// 모든 작품의 상세 정보를 가져오는 기능
router.get("/fetchAllWorkInfo", (req, res) => {
    const query = "SELECT * FROM gallerywork"; // 모든 열을 가져오기 위한 쿼리

    mysqlconnection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching all details:", error);
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


module.exports = router; // 라우터 객체 내보내기
