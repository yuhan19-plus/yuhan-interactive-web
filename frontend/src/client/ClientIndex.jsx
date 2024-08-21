/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import React, { Suspense } from 'react'
import CanvasLayout from './components/canvas_layout/CanvasLayout'
import MainCanvas from './components/canvas/MainCanvas'
import Loader from './components/loader/Loader'
import { useSelector } from 'react-redux'

const ClientIndex = () => {
    const currentMap = useSelector((state) => state.groundMap)
    const currentMapName = currentMap.mapName
    console.log(currentMapName)
    return (
      <Suspense fallback={<Loader />}>
          {/* {
            currentMapName === 'yh_map' && 
            <CanvasLayout>
              <MainCanvas />
            </CanvasLayout>
          }
          {
            currentMapName === 'dept_map' &&
            <DeptCanvasLayout>
              <DepartmentCanvas />
            </DeptCanvasLayout>
          } */}
          <CanvasLayout>
            <MainCanvas />
          </CanvasLayout>
          {/* <DeptCanvasLayout>
            <DepartmentCanvas />
          </DeptCanvasLayout> */}
      </Suspense>
    )
}

export default ClientIndex