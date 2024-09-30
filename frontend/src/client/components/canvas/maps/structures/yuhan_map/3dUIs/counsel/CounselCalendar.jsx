import React from 'react'
import styled from 'styled-components'
import "react-calendar/dist/Calendar.css";
import YuhanCalendar from './YuhanCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

const CounselCalendar = () => {
    return (
        <CounselCalendarWrapper>
            <YuhanCalendar />
            <CalendarContentWrapper>
                <CalendarContentItem>
                    <CalendarContentTitle>
                        <FontAwesomeIcon icon={faBullhorn} color='#0F275C' /> 상담신청 안내사항
                    </CalendarContentTitle>
                    <CalendarContent>
                        <p>1. <b>지난 날짜</b> 혹은 <b>당일</b>은 상담신청을 할 수 없습니다.</p>
                        <p>2. 상담신청이 <b>체크된 날짜만</b> 상담신청이 가능합니다.</p>
                        <p>3. 상담신청은 <b>1시간 단위로 신청할 수 있으며 1:1 상담으로 진행</b>됩니다.</p>
                    </CalendarContent>
                </CalendarContentItem>
            </CalendarContentWrapper>
        </CounselCalendarWrapper>
    )
}

const CounselCalendarWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    margin-bottom: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
`

const CalendarContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border: none;
    padding: 15px;
`

const CalendarContentItem = styled.div`
    width: 100%;
    margin-bottom: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
`

const CalendarContentTitle = styled.h3`
    width: 100%;
    margin: 0;
    border-bottom: 3px solid #0F275C;
    margin-bottom: 15px;
`

const CalendarContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    p {
        margin: 0 5px 0 0;
    }
`

/* 점 표시 스타일 */
// const StyledDot = styled.div`
//     background-color: blue;
//     border-radius: 50%;
//     width: 0.5rem;
//     height: 0.5rem;
// `

export default CounselCalendar