import moment from "moment";
import React from 'react';
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import { BACKLOG, TOAST } from "../../constant";
import { useRemoveProjectMutation } from "../../features/projects/projectsApi";
import filterMatch from "../../utils/filterMatch";


const Project = ({ project }) => {
    const { user } = useSelector(state => state.auth) || {};
    const { searchKey } = useSelector(state => state.filters)
    const { id: projectId, name: projectName, state: projectType, team, timestamp, owner } = project || {};
    const { bgColor, textColor, name: teamName } = team || {};
    const { name: ownerName, email: ownerEmail, avater } = owner || {};

    const [drag] = useDrag(() => ({
        type: "project",
        item: { id: projectId, data: { ...project } },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    // RTK Query
    const [removeProject] = useRemoveProjectMutation();

    const handleRemove = (id) => {
        console.log("remove project");
        removeProject(id);
        toast.success("Project removed successfully", TOAST);
    }

    return (
        <div
            className={`relative  ${filterMatch(searchKey, projectName) && 'animate-pulse outline outline-2'}  border flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100`}
            style={{ outlineColor: `${filterMatch(searchKey, projectName) ? bgColor : 'transparent'}`, outlineOffset: '-2px', borderBottomWidth: "5px", borderBottomColor: `${bgColor}` }}
            ref={drag}
        >

            {projectType === BACKLOG && user.email === ownerEmail && <button
                className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
            >
                <img src={deleteIcon} onClick={() => handleRemove(projectId)} alt="deleteIcon" className='w-6 h-6 cursor-pointer' />
            </button>}

            <span className="flex items-center h-6 px-3 text-xs font-semibold capitalize  rounded-full" style={{ backgroundColor: `${bgColor ? bgColor : '#14b8a6'}`, color: `${textColor ? textColor : 'black'}` }}>{teamName}</span>
            <h4 className="mt-3 text-sm font-medium capitalize">{projectName}</h4>
            <div
                className="flex items-center w-full mt-3 text-xs font-medium text-gray-400"
            >
                <div className="flex items-center">
                    <svg
                        className="w-4 h-4 text-gray-300 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="ml-1 leading-none text-xs">
                        {moment(timestamp).format('MMM DD |')}
                        <strong className="capitalize" title={`By ${ownerName} | Email ${ownerEmail}`}> {ownerName}</strong>
                    </span>
                </div>

                <img
                    className="w-6 h-6 ml-auto rounded-full"
                    alt="avater" src={avater}
                />
            </div>
        </div>
    )
}

export default Project