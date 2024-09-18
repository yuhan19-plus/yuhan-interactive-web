import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const useFoodData = (foodId) => {
    const [cookies] = useCookies(["user"]);
    const [foodData, setFoodData] = useState({
        foodID: "",
        foodName: "",
        foodType: "",
        foodPrice: 0,
        foodRating: 0,
        foodImg: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!foodId) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/food/${foodId}`);
                if (!response.ok) {
                    throw new Error("데이터를 불러오는데 실패했습니다.");
                }
                const data = await response.json();
                setFoodData(data.food);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [foodId]); // foodId가 변경될 때마다 호출됨

    const handleUpdateItem = async (updatedFood) => {
        try {
            const response = await fetch(`/api/food/${foodId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFood),
            });
            if (!response.ok) {
                throw new Error("데이터를 업데이트하는 것에 실패했습니다.");
            }
            const data = await response.json();
            setFoodData(data.food);
        } catch (error) {
            setError(error.message);
        }
    };

    // 삭제 핸들러
    const handleDeleteItem = async () => {
        try {
            const response = await fetch(`/api/food/delete/${foodId}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("데이터를 삭제하는 것에 실패했습니다.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return { foodData, loading, error, handleDeleteItem,handleUpdateItem };
};
