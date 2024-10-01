import React, { useEffect, useState } from 'react';
import { Hamburger } from './Food/Hamburger';
import { Pizza } from './Food/Pizza';
import { Udon } from './Food/Udon';

const FoodGroup = ({ position }) => {
    const foodItems = [
        <Hamburger />,
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