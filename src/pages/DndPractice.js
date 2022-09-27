import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
const DndPractice = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>DndPractice</div>
        </DndProvider>

    )
}

export default DndPractice