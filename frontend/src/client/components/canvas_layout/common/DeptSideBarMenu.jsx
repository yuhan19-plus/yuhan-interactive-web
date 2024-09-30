/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendarDays, faImage } from '@fortawesome/free-solid-svg-icons';
import SchoolIcon from '@mui/icons-material/School';
import { useSelector } from 'react-redux';

const DeptSideBarMenu = ({currentMapName}) => {
    // console.log(currentMapName)
    const groundMapState = useSelector((state) => state.groundMap)
    const pathData = groundMapState.pathData
    // console.log(groundMapState)
    return (
        <>
            <div>
                <SchoolIcon />
                <span><a href={pathData[0]} target='_blank'>학과소개</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faImage} />
                <span><a href={pathData[1]} target='_blank'>갤러리</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faBuilding} />
                <span><a href={pathData[2]} target='_blank'>학과사무실</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faCalendarDays} />
                <span><a href={pathData[3]} target='_blank'>학사일정</a></span>
            </div>
        </>
    )
}

export default DeptSideBarMenu