import React from 'react';
import { useDrop } from 'react-dnd';
import { useUpdateProjectMutation } from '../../features/projects/projectsApi';
import Project from './Project';
import ProjectColHeader from './ProjectColHeader';

const ProjectCol = ({ projects, projectState }) => {
    // const [draggedProjects, setDraggedProjects] = useState([...projects]);
    const [updateProject, { isLoading, isSuccess, isError, error }] = useUpdateProjectMutation()


    const handleAddToState = (item) => {
        const payload = {
            ...item,
            data: {
                ...item.data,
                state: projectState,
                timestamp: new Date().getTime()
            }
        }

        // setDraggedProjects([...draggedProjects, payload.data])
        updateProject(payload)
    }

    // DND
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "project",
        drop: (item) => handleAddToState(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    return (
        <div className="flex flex-col rounded-md flex-shrink-0 w-64 bg-violet-200" ref={drop}>
            <ProjectColHeader projectType={projectState} count={projects?.length} />
            <div className="flex flex-col pb-2 overflow-auto">
                {
                    projects.map(project => <Project key={project.id} project={project} />)
                }
            </div>
        </div>
    )
}

export default ProjectCol