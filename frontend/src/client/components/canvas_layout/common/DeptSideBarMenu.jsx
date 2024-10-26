/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendarDays, faImage, faSchool } from '@fortawesome/free-solid-svg-icons';
import SchoolIcon from '@mui/icons-material/School';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const DeptSideBarMenu = ({currentMapName}) => {
    // console.log(currentMapName)
    const groundMapState = useSelector((state) => state.groundMap)
    const pathData = groundMapState.pathData
    // console.log(groundMapState)
    return (
        <MainSideBarMenuWrapper>
            <MainSideBarMenuItem>
                <FontAwesomeIcon icon={faSchool} />
                <span><a onClick={() => {history.back()}}>유한대학교</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <SchoolIcon />
                <span><a href={pathData[0]} target='_blank'>학과소개</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <FontAwesomeIcon icon={faImage} />
                <span><a href={pathData[1]} target='_blank'>갤러리</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <FontAwesomeIcon icon={faBuilding} />
                <span><a href={pathData[2]} target='_blank'>학과사무실</a></span>
            </MainSideBarMenuItem>
            <MainSideBarMenuItem>
                <FontAwesomeIcon icon={faCalendarDays} />
                <span><a href={pathData[3]} target='_blank'>학사일정</a></span>
            </MainSideBarMenuItem>
        </MainSideBarMenuWrapper>
    )
}

const MainSideBarMenuWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 15rem;
    border-top: 1px solid white;
`

const MainSideBarMenuItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    gap: 10px;
    border-bottom: 1px solid white;
    cursor: pointer;
    color: white;

    svg {
        width: 34px;
        height: 34px;
    }

    span {
        font-size: 12px;
        padding-top: 8px;
        font-weight: 500;
    }

    & > * {
        transition: 0.2s ease-in-out;
    }
    
    &:hover {
        background-color: white;
        color: #0F275C;

        span {
            font-size: 14px;
            font-weight: 800;
        }

        span > a {
            color: #0F275C;
        }

        svg {
            width: 36px;
            height: 36px;
        }
    }
`

export default DeptSideBarMenu