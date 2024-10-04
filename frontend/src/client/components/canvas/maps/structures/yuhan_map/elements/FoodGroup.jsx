/** 파일생성자 : 이정민
    음식 그룹 
 */
import React, { useEffect, useState } from 'react';
import { Hamburger } from './Food/Hamburger';
import { JapaneseRamen } from './Food/JapaneseRamen';
import { KoreaCheeseRamen } from './Food/KoreaCheeseRamen';
import { Pizza } from './Food/Pizza';
import { Udon } from './Food/Udon';

const FoodGroup = ({ position }) => {
    const foodItems = [
        <Hamburger />,
        <JapaneseRamen/>,
        <KoreaCheeseRamen/>,
        <Pizza rotation={[Math.PI, 0, Math.PI]} />,
        <Udon />
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <group position={position} scale={2}>
            {foodItems.map((item, index) => (
                <React.Fragment key={index}>
                    {index === activeIndex && item}
                </React.Fragment>
            ))}
        </group>
    );
};

export default FoodGroup;