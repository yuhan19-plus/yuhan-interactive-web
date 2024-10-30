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

const DeptSideBarMenu = () => {
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
    border-top: 0.3rem solid var(--sub-color);
`

const MainSideBarMenuItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0.7rem;
    gap: 1rem;
    border-bottom: 0.1rem solid var(--sub-color);
    cursor: pointer;
    color: var(--sub-color);

    svg {
        width: 2rem;
        height: 2rem;
    }

    span {
        font-size: 0.8rem;
        padding-top: 0.5rem;
        font-weight: 500;
    }

    & > * {
        transition: 0.2s ease-in-out;
    }
    
    &:hover {
        background-color: var(--sub-color);
        color: var(--main-color);

        span {
            font-size: 1rem;
            font-weight: 800;
        }

        span > a {
            color: var(--main-color);
        }

        svg {
            width: 2.3rem;
            height: 2.3rem;
        }
    }
`

export default DeptSideBarMenu