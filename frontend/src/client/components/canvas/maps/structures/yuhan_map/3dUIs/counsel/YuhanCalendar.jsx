import React, { useState } from 'react'
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faCircleXmark, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar'
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { counselBtn } from '../../../../../../../../redux/actions/actions';
import moment from 'moment';
import { useCookies } from 'react-cookie';

const YuhanCalendar = () => {
    // 쿠키(세션 쿠키)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    console.log(cookies)
    console.log(cookies.user)
    const currentUser = cookies.user

    const navigate = useNavigate()
    const counsel = useSelector((state) => state.counsel)
    const counselValue = counsel.value
    const counselName = counsel.name

    const dispatch = useDispatch()
    const today = new Date()
    const [date, setDate] = useState(today)
    // console.log(moment(date).format("MM"))
    const currentMonth = moment(date).format("M")
    const handleDateChange = (newDate) => {
        setDate(newDate);
    }

    const handleTodayClick = () => {
        const today = new Date()
        setDate(today)
    }

    // 상담 가능 날짜
    const okDay = ['2024-09-23', '2024-09-27', '2024-10-01', '2024-09-20']

    const handleReqForCounsel = (clickedDate) => {
        // navigate 함수의 state를 사용해 날짜를 루트 경로로 전달
        navigate('/', { state: { date: clickedDate } })
        dispatch(counselBtn())
    }
    return (
        <>
            <CalendarWrapper>
                <Button
                    variant="contained"
                    onClick={handleTodayClick}
                    color="info"
                >
                    오늘
                </Button>
                <StyledCalendar
                    locale="ko-KR" // 한국어 기준으로 표시
                    value={date}
                    onChange={handleDateChange}
                    formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
                    formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
                    formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
                    calendarType="gregory" // 일요일 부터 시작
                    showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
                    next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                    prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
                    minDetail="year" // 10년단위 년도 숨기기
                    tileClassName={({ date, view }) => {
                        // view는 달력의 현재 보기 모드를 나타냅니다. 'month', 'year', 'decade' 중 하나
                        if (view === 'month' && moment(date).day() === 6) { // 토요일을 확인 (day() === 6이면 토요일)
                          return 'saturday'
                        }
                    }}
                    tileContent={({date, view}) => {
                        let html = []
                        if(view === 'month' &&
                            date.getMonth() === today.getMonth()
                            && date.getDate() === today.getDate()) {
                                html.push(<TodayDate key={"today"}>오늘</TodayDate>)
                        }
                        if (okDay.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                            html.push(
                                <React.Fragment key={moment(date).format("okDay")}>
                                    {
                                        currentUser === 'sjsj' ? (
                                            <>
                                                <CounselBtn
                                                    variant="contained"
                                                    className='font-color-green'
                                                    onClick={() => {
                                                        const clickedDate = moment(date).format("YYYY-MM-DD")
                                                        Swal.fire({
                                                            icon: "success",
                                                            title: "상담신청",
                                                            text: `${clickedDate}에 신청하시겠습니까?`,
                                                            showCancelButton: true,
                                                            confirmButtonText: "신청",
                                                            cancelButtonText: "닫기",
                                                        }).then((res) => {
                                                            if (res.isConfirmed) {
                                                                handleReqForCounsel(clickedDate)
                                                            }
                                                            else{
                                                                return
                                                            }
                                                        })
                                                    }}
                                                >
                                                    {/* <FontAwesomeIcon icon={faCircleCheck} color='green' /> */}
                                                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                                                    <p>상담신청</p>
                                                </CounselBtn>
                                            </>
                                        ) : (
                                            <>
                                                {/* <CounselBtn
                                                    variant="contained"
                                                    className='font-color-green'
                                                    onClick={() => {
                                                        const clickedDate = moment(date).format("YYYY-MM-DD")
                                                        Swal.fire({
                                                            icon: "success",
                                                            title: "날짜등록",
                                                            text: `${clickedDate}에 신청하시겠습니까?`,
                                                            showCancelButton: true,
                                                            confirmButtonText: "신청",
                                                            cancelButtonText: "닫기",
                                                        }).then((res) => {
                                                            if (res.isConfirmed) {
                                                                handleReqForCounsel(clickedDate)
                                                            }
                                                            else{
                                                            //취소
                                                            return
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCalendarPlus} />
                                                    <p>날짜등록</p>
                                                </CounselBtn> */}
                                                <CounselBtn
                                                    variant="contained"
                                                    className='font-color-red'
                                                    onClick={() => {
                                                        const clickedDate = moment(date).format("YYYY-MM-DD")
                                                        Swal.fire({
                                                            icon: "warning",
                                                            title: "등록불가",
                                                            text: `${clickedDate}은 이미 등록된 날짜입니다. 등록을 취소하시겠습니까?`,
                                                            showCancelButton: true,
                                                            confirmButtonText: "등록취소",
                                                            cancelButtonText: "닫기",
                                                        }).then((res) => {
                                                            if (res.isConfirmed) {
                                                                // 등록취소 메서드 호출
                                                            }
                                                            else{
                                                                return
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCircleXmark} />
                                                    <p>등록불가</p>
                                                </CounselBtn>
                                            </>
                                        )
                                    }
                                </React.Fragment>
                            )
                        } else {
                            html.push(
                                <React.Fragment key={moment(date).format("noDay")}>
                                    {
                                        currentUser === 'sjsj' ? (
                                            <>
                                                <CounselBtn
                                                    variant="contained"
                                                    className='font-color-red'
                                                    onClick={() => {
                                                        Swal.fire({
                                                            icon: "warning",
                                                            title: "상담불가",
                                                            text: "상담신청 날짜를 선택해주세요"
                                                        })
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCircleXmark} color='red' />
                                                    <p>상담불가</p>
                                                </CounselBtn>
                                            </>
                                        ) : (
                                            <>
                                                <CounselBtn
                                                    variant="contained"
                                                    className='font-color-green'
                                                    onClick={() => {
                                                        Swal.fire({
                                                            icon: "success",
                                                            title: "날짜등록",
                                                            text: "상담가능 날짜로 등록하시겠습니까?",
                                                            showCancelButton: true,
                                                            confirmButtonText: "등록",
                                                            cancelButtonText: "닫기",
                                                        }).then((res) => {
                                                            if (res.isConfirmed) {
                                                                // 상담등록 메서드 호출
                                                            }
                                                            else{
                                                                return
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faCalendarPlus} color='green' />
                                                    <p>날짜등록</p>
                                                </CounselBtn>
                                            </>
                                        )
                                    }
                                </React.Fragment>
                            )
                        }
                        return <>{html}</>
                    }}
                />
            </CalendarWrapper>
        </>
    )
}

const CalendarWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 15px;

    /* 오늘 버튼 */
    button {
        width: 10%;
    }
    /* 전체 달력 배경 */
    .react-calendar {
        width: 100%;
        border: none;
        padding: 15px;
    }

    /* 달력 상단의 월/년도 이동 네비게이션 */
    .react-calendar__navigation {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0F275C;
    }

    /* 네비게이션 버튼 */
    .react-calendar__navigation button {
        font-weight: 800;
        font-size: 1rem;
        background: #0F275C;
        color: white;
    }

    /* 네비게이션 버튼 컬러 */
    .react-calendar__navigation button:focus,
    .react-calendar__navigation button:hover {
        background-color: #0F275C;
    }

    /* 오늘 날짜 폰트 컬러 */
    .react-calendar__tile--now {
        background: none;
        abbr {
            color: #015850;
            font-weight: 900;
            font-size: 16px;
        }
    }

    /* 각 날짜 셀 */
    /* .react-calendar__month-view__days__day {
        
    } */

    /* 현재 날짜 */
    .react-calendar__tile--now {
        background: #CAD5E0;
        border-radius: 5px;
    }

    /* 토요일, 일요일에만 폰트 색상 적용 */
    .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
        color: red;
    }
    .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
        color: blue;
    }

    /* 요일 밑줄 제거 */
    .react-calendar__month-view__weekdays abbr {
        text-align: center;
        text-decoration: none;
        font-weight: 800;
    }

    .react-calendar__tile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .react-calendar__month-view__days__day {
        padding: 15px;
    }

    /* 선택한 날짜 스타일 적용 */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus,
    .react-calendar__tile--active {
        background: #CAD5E0;
        border-radius: 5px;
        color: white;
        border: none;
    }

    /* 비활성화된 날짜 */
    .react-calendar__tile--disabled {
        background-color: #CAD5E0;
        color: #9e9e9e;
        pointer-events: none; /* 클릭 불가능 */
    }

`

/* 오늘 날짜에 텍스트 삽입 스타일 */
const TodayDate = styled.div`
    font-size: x-small;
    color: #0F275C;
    font-weight: 600;
`

const StyledCalendar = styled(Calendar)``

const CounselBtn = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default YuhanCalendar