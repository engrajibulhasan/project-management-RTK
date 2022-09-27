import React from 'react'
import { useSelector } from 'react-redux'
import ProjectCol from '../components/projects/ProjectCol'
import Error from '../components/ui/Error'
import Navigation from '../components/ui/Navigation'
import Spin from '../components/ui/Spin'
import { PROJECT_STATES } from '../constant'
import { useGetProjectsQuery } from '../features/projects/projectsApi'
import getFilteredProjects from '../utils/getFilteredProjects'

const Projects = () => {
    const { user } = useSelector(state => state.auth) || {}
    const { email } = user || {};
    const { data: projects, isLoading, isError, error: responseError } = useGetProjectsQuery(email, { skip: false });


    let content = '';
    if (isLoading && !isError) {
        content = <div className='flex content-start'><Spin /> Please Wait....</div>
    }
    if (!isLoading && isError) {
        content = <Error message={responseError} />
    }
    if (projects?.length > 0) {
        console.log(projects, "projects");
        content = PROJECT_STATES.map((projectState, index) => <ProjectCol key={index} projects={getFilteredProjects(projectState, projects)} projectState={projectState} />)
    }




    return (
        <div
            className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
        >
            <Navigation />

            <div className="px-10 mt-6">
                <h1 className="text-2xl font-bold">Project Board</h1>
            </div>
            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">

                {content}

            </div>
        </div>

    )
}

export default Projects