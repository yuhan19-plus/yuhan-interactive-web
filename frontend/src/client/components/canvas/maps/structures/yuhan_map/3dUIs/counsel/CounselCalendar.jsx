import React from 'react'
import styled from 'styled-components'
import "react-calendar/dist/Calendar.css";
import moment from 'moment/moment';
import YuhanCalendar from './YuhanCalendar';

const CounselCalendar = () => {
    // 상담 가능 날짜
    const okDay = ['2024-09-23', '2024-09-27', '2024-10-01', '2024-09-20']

    return (
        <CounselCalendarWrapper>
            <YuhanCalendar />
            <CalendarContentWrapper>
                <CalendarContentItem>
                    <CalendarContentTitle>
                        Title One
                    </CalendarContentTitle>
                    <CalendarContent>
                        asdasd
                    </CalendarContent>
                </CalendarContentItem>
                <CalendarContentItem>
                    <CalendarContentTitle>
                        이번달 상담 가능 날짜는?
                    </CalendarContentTitle>
                    <CalendarContent>
                        {okDay.map((i) => (
                            <p key={i}>{moment(i).format("MM월DD일")}</p>
                        ))}
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
    align-items: center;
    justify-content: flex-start;
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