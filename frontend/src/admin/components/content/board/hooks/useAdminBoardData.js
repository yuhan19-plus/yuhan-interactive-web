/** 
 * 파일생성자 - 오자현 
 * 게시판 상세페이지의 기능을 관리하는 커스텀 훅
 * 
 * 기능 구현 - 오자현
 * - 게시글 좋아요, 첨부파일 다운로드, 게시글 삭제, 삭제사유조회
 */

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

export const useAdminBoardData = (boardId) => {

    const [cookies] = useCookies(["user"]);

    const [attachments, setAttachments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [boardData, setBoardData] = useState({
        board_id: "",
        board_title: "",
        board_content: "",
        board_writer: "",
        board_date: "",
        board_last_modified: "",
        board_status: "",
        board_view: 0,
        board_like: 0,
        board_comments_count: 0,
        files: [],
    });
    const [reportData, setReportData] = useState({
        report_id: null,
        report_writer: '',
        report_content: '',
        report_type: '',
        report_status: 'Waiting',
        report_date: '',
        board_id: null,
        resolved_at: '',
        report_resolution: ''
    });

    // 좋아요핸들러
    const handleLikeToggle = async () => {
        if (!cookies.user) {
            Swal.fire({
                icon: 'warning',
                title: '로그인X',
                text: '로그인 후 좋아요를 눌러주세요!',
                confirmButtonColor: '#3085d6',
            });
            return; // 입력값이 비어있을 경우 저장 절차 중단
        }
        try {
            const response = await fetch("/api/boardLike", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: cookies.user,   // 현재 사용자 ID
                    boardId: boardId,       // 현재 게시물 ID
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 서버에서 성공 응답을 받은 후 상태를 변경
            setLiked(!liked);
            // 좋아요 누르고 해당페이지에서 바로 좋아요 올라간 것을 확인 가능하도록 수정
            fetchData();
        } catch (error) {
            console.error("좋아요 상태 변경 중 오류 발생:", error);
            Swal.fire({
                icon: 'error',
                title: '변경 중 에러',
                text: '좋아요 상태 변경 중 오류가 발생했습니다!',
                confirmButtonColor: '#3085d6',
            });
        }
    };

    // 첨부파일 다운로드 핸들러
    const handleDownload = (fileName, fileData, fileType) => {
        try {
            // Buffer의 data 배열을 Uint8Array로 변환하여 Blob 생성
            const arrayBufferView = new Uint8Array(fileData.data);
            const blob = new Blob([arrayBufferView], { type: fileType });
            // console.log("Blob 생성:", blob);

            // Blob을 다운로드 가능한 URL로 변환
            const url = URL.createObjectURL(blob);

            // a 태그를 생성하고 클릭하여 파일 다운로드
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // URL 해제
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("파일 다운로드 중 에러 발생:", error);
        }
    };

    // 삭제 핸들러
    const handleDeleteItem = async () => {
        try {
            const response = await fetch(`/api/board/delete/${boardId}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("데이터를 삭제하는 것에 실패했습니다.");
                return false;
            } else {
                return true;
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // 사용자의 좋아요 여부 체크 함수
    const handlecheckLiked = async () => {
        try {
            const response = await fetch(`/api/boardLike/${boardId}/${cookies.user}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: cookies.user,   // 현재 사용자 ID
                    boardId: boardId,       // 현재 게시물 ID
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // 서버에서 받은 liked 값을 상태에 반영
            setLiked(data.liked);
            // console.log("좋아요체크", data.liked);

        } catch (error) {
            console.error("좋아요 상태 체크 중 오류 발생:", error);
        }
    };

    // 신고로 삭제된 경우 이유를 보여주는 함수
    const deleteCheckReport = async () => {
        // console.log("deleteCheck진입 게시판번호", boardId);
        try {
            const response = await fetch(`/api/boardReport/check/${boardId}`, { method: "POST" });
            const data = await response.json();

            setReportData(data.reportData);

        } catch (error) {
            setError(error.message);
        }

    }

    // 데이터 가져오기 함수
    const fetchData = async () => {
        try {
            // console.log("데이터 가져오기 함수의 boardId",boardId)
            const response = await fetch(`/api/board/${boardId}`);
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            setBoardData(data.board);
            setAttachments(data.attachments || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDatas = async () => {
        await handlecheckLiked(); // 좋아요 여부 체크
        await fetchData();  // 게시물 데이터 가져오기
        await deleteCheckReport(); // 신고삭제사유 가져오기
    };
    
    useEffect(() => {
        fetchDatas();
    }, [boardId]);

    return { boardData, attachments, loading, error, liked, reportData, handleDeleteItem, handleLikeToggle, handleDownload, deleteCheckReport };
};
