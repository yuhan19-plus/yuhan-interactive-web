import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
export const socket = io("http://localhost:4000");

export const TestSocketControls = () => {
  useEffect(() => {
    const handleConnect = () => {
      console.info("연결됨");
    };
    const handleDisconnect = () => {
      console.info("연결이 끊김");
    };
    const handleEnter = () => {
      console.info("입장함");
    };
    const handleExit = () => {
      console.info("퇴장함");
    };

    // 소켓 이벤트 리스너 등록
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("enter", handleEnter);
    socket.on("exit", handleExit);

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("enter", handleEnter);
      socket.off("exit", handleExit);
    };
  }, []);

  return null;
};
