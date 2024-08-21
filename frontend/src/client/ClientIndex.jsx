import React, { useState, useEffect } from 'react';
import Loader from './components/loader/Loader';
import CanvasLayout from './components/canvas_layout/CanvasLayout';
import MainCanvas from './components/canvas/MainCanvas';

const ClientIndex = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1초 동안 로딩 화면을 유지

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <CanvasLayout>
        <MainCanvas />
      </CanvasLayout>
    </div>
  );
};

export default ClientIndex;
