/** 파일 생성자 : 이정민
 *  오늘의 메뉴
 *  학생 평점 수정 등록만 가능
 *  관리자 음식 등록 수정 삭제만 가능
 * */
const express = require("express");
const router = express.Router();
const mysqlconnection = require("../server");

router.get("/", (req, res) => {
    const listQuery = "SELECT * FROM todaymenu";
    mysqlconnection.query(listQuery, (err, results) => {
        if (err) {
            console.error("목록을 불러오는데 실패했습니다", err);
            return res.status(500).json({ message: "실패" });
        }

        // Convert BLOB data to base64 strings
        const processedResults = results.map(item => {
            if (item.foodImg) {
                const base64Image = Buffer.from(item.foodImg).toString('base64');
                item.foodImg = `data:image/png;base64,${base64Image}`;
            }
            return item;
        });

        res.json(processedResults); // JSON 형태로 응답
    });
});

router.get("/:foodID", (req, res) => {
    const foodID = req.params.foodID;
    console.log("Request:", req.params); // 수정: req를 올바르게 출력

    const getFoodQuery = "SELECT * FROM todaymenu WHERE foodID = ?";

    mysqlconnection.query(getFoodQuery, [foodID], (err, results) => {
        if (err) {
            console.error("음식 데이터를 가져오는 중 에러 발생:", err);
            return res.status(500).json({ message: "음식 데이터를 가져오는 데 오류가 발생했습니다." });
        } else if (results.length === 0) {
            return res.status(404).json({ message: "해당 음식이 없습니다." });
        }

        // BLOB 데이터를 Base64 문자열로 변환
        const item = results[0];
        if (item.foodImg) {
            const base64Image = item.foodImg.toString('base64'); // Base64로 변환
            item.foodImg = `data:image/png;base64,${base64Image}`; // Data URL 형식으로 변환
        }

        res.json(item); // JSON 형태로 응답
    });
});

// 음식 등록 (이미지 데이터 포함)
router.post("/", (req, res) => {
    const { foodType, foodName, foodPrice, foodImg, day } = req.body;

    if (!foodType || !foodName || !foodPrice) {
        return res.status(400).send("foodType, foodName, foodPrice의 값이 필요합니다.");
    }

    // 이미지 데이터를 BLOB으로 저장
    const foodImgBlob = foodImg ? Buffer.from(foodImg, 'base64') : null;

    const insertFoodQuery = `INSERT INTO todaymenu (foodType, foodName, foodPrice, foodImg, day) VALUES (?, ?, ?, ?, ?)`;

    mysqlconnection.query(insertFoodQuery, [foodType, foodName, foodPrice, foodImgBlob, day], (err) => {
        if (err) {
            console.error("음식 등록 중 에러 발생:", err);
            return res.status(500).json({ message: "음식 등록 중 오류가 발생했습니다." });
        }
        res.send("음식 등록 성공");
    });
});

// 음식 수정
router.put("/update/:food_id", (req, res) => {
    const foodID = req.params.food_id;
    const { foodType, foodName, foodPrice, foodImg ,day} = req.body;

    console.log("수정 요청 들어옴 foodID", foodID);
    console.log("이미지 수정",foodImg);

    // foodImg가 있는 경우 base64 이미지를 BLOB으로 변환
    const foodImgBlob = foodImg ? Buffer.from(foodImg, 'base64') : null;

    // 음식 데이터 수정 쿼리
    const updateFoodQuery = `
        UPDATE todaymenu SET foodType = ?, foodName = ?, foodPrice = ?, foodImg = ?, day = ? WHERE foodID = ?
    `;

    // 음식 데이터 수정
    mysqlconnection.query(updateFoodQuery, [foodType, foodName, foodPrice, foodImgBlob, day, foodID], (err, result) => {
        if (err) {
            console.error("음식 데이터 수정 중 오류 발생:", err);
            return res.status(500).json({ message: "음식 데이터 수정 중 오류 발생" });
        }

        // 수정이 성공적으로 완료된 경우 응답
        res.status(200).send("음식 데이터가 성공적으로 수정되었습니다.");
    });
});

// 음식 삭제
router.delete("/delete/:foodID", (req, res) => {
    const foodID = req.params.foodID;

    const deleteFoodQuery = `DELETE FROM todaymenu WHERE foodID = ?`;

    mysqlconnection.query(deleteFoodQuery, [foodID], (err) => {
        if (err) {
            console.error("음식 삭제 중 에러 발생:", err);
            return res.status(500).json({ message: "음식 삭제 중 오류가 발생했습니다." });
        }
        res.send("음식 삭제 성공");
    });
});

// 음식 검색
router.get("/search/:foodName", (req, res) => {
    const foodName = `%${req.params.foodName}%`;
    const searchQuery = "SELECT foodID, foodType, foodName, foodPrice, foodImg FROM todaymenu WHERE foodName LIKE ?";

    mysqlconnection.query(searchQuery, [foodName], (err, results) => {
        if (err) {
            console.error("음식 검색 중 에러 발생:", err);
            return res.status(500).json({ message: "음식 검색 중 오류가 발생했습니다." });
        } else if (results.length === 0) {
            return res.status(404).json({ message: "해당 음식이 없습니다." });
        }
        // 이미지 데이터를 Base64로 인코딩
        const resultsWithBase64 = results.map(item => {
            return {
                ...item,
                foodImg: item.foodImg ? item.foodImg.toString('base64') : null
            };
        });
        res.json(resultsWithBase64);
    });
});

//평점 저장 수정
router.post("/ratings/:foodID", (req, res) => {
    const { foodID } = req.params;
    const { user_id, ratings } = req.body;

    if (!foodID || !user_id || !ratings) {
        return res.status(400).send("foodID, user_id, ratings 의 값이 필요합니다.");
    }

    const insertFoodQuery = 
        `INSERT INTO food_ratings (foodID, user_id, ratings)
        VALUES (?, ?, ?)
    `;

    mysqlconnection.query(insertFoodQuery, [foodID, user_id, ratings], (err) => {
        if (err) {
            console.error("평점 처리 중 에러 발생:", err);
            return res.status(500).json({ message: "평점 처리 중 오류가 발생했습니다." });
        }

        const avgQuery = `
            SELECT AVG(ratings) AS averageRating
            FROM food_ratings
            WHERE foodID = ?
        `;
        
        mysqlconnection.query(avgQuery, [foodID], (err, rows) => {
            if (err) {
                console.error("평점 계산 중 에러 발생:", err);
                return res.status(500).json({ message: "평점 계산 중 오류가 발생했습니다." });
            }

            const averageRating = rows[0].averageRating;

            const updateQuery = `
                UPDATE todaymenu
                SET foodRating = ?
                WHERE foodID = ?
            `;
            mysqlconnection.query(updateQuery, [averageRating, foodID], (err) => {
                if (err) {
                    console.error("평점 업데이트 중 에러 발생:", err);
                    return res.status(500).json({ message: "평점 업데이트 중 오류가 발생했습니다." });
                }
                res.send("음식 등록 및 평점 업데이트 성공");
            });
        });
    });
});

module.exports = router;
