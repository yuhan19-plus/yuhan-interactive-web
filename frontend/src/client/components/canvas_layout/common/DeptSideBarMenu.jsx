/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import React, { useEffect } from 'react'
import { BIO_PATH, CSW_PATH, FN_PATH, ID_PATH } from '../../../../data/commonData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendarDays, faImage } from '@fortawesome/free-solid-svg-icons';
import SchoolIcon from '@mui/icons-material/School';
let pathArr = []
const DeptSideBarMenu = ({ mapName }) => {

    console.log(mapName)

    if(mapName === 'computer_sw_map') pathArr = CSW_PATH
    else if(mapName === 'industrial_design_map') pathArr = ID_PATH
    else if(mapName === 'food_nutrition_map') pathArr = FN_PATH
    else if(mapName === 'yuhan_bio_map') pathArr = BIO_PATH
    else pathArr = '#'

    console.log(pathArr)

    return (
        <>
            <div>
                <SchoolIcon />
                <span><a href={pathArr[0]}>학과소개</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faImage} />
                <span><a href={pathArr[1]}>갤러리</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faBuilding} />
                <span><a href={pathArr[2]}>학과사무실</a></span>
            </div>
            <div>
                <FontAwesomeIcon icon={faCalendarDays} />
                <span><a href={pathArr[3]}>학사일정</a></span>
            </div>
        </>
    )
}

export default DeptSideBarMenu