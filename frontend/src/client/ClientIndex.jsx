import React, { Suspense } from 'react'
import CanvasLayout from './components/canvas_layout/CanvasLayout'
import MainCanvas from './components/canvas/MainCanvas'
import Loader from './components/loader/Loader'
import { useSelector } from 'react-redux'
import DepartmentCanvas from './components/canvas/maps/structures/department_map/DepartmentCanvas'

const ClientIndex = () => {
    const currentMap = useSelector((state) => state.groundMap)
    const currentMapName = currentMap.mapName
    console.log(currentMapName)
    return (
      <Suspense fallback={<Loader />}>
        {
          currentMapName === 'yh_map' && 
            <CanvasLayout>
              <MainCanvas />
            </CanvasLayout>
        }
        {
          currentMapName === 'dept_map' &&
          <DepartmentCanvas />
        }
      </Suspense>
    )
}

export default ClientIndex