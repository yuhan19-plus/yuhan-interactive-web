/** 파일 생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 */

import React from 'react'
import { Link } from 'react-router-dom'

const MemberHeader = () => {
    return (
        <>
            <Link to='/'><img src='./assets/images/yuhan.png' className='image-logo' /></Link>
        </>
    )
}

export default MemberHeader