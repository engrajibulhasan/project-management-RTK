import moment from 'moment';
import React, { useCallback, useState } from 'react';
import plusIcon from "../../assets/images/plus.svg";
import teamsIcon from "../../assets/images/teams.svg";
import AddMemberModal from './AddMemberModal';
import Avaters from './Avaters';
import ViewMembersModal from './ViewMembersModal';

const Team = ({ team }) => {

    const [opened, setOpened] = useState(false);
    const [membersOpened, setMembersOpened] = useState(false);
    const controlModal = useCallback(() => {
        setOpened((prevState) => !prevState);
    }, [])

    const membersControlModal = useCallback(() => {
        setMembersOpened((prevState) => !prevState);
    }, []);

    // Team
    // users is the array of members
    // Owner is an Object
    const { name, bgColor, textColor, description, users, timestamp } = team;


    return (
        <>
            <div
                className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                draggable="true"
            >

                <button
                    className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                    onClick={controlModal}
                    key="1"
                >
                    <img src={plusIcon} className="h-6 w-6" alt="plusIcon" />
                </button>

                <button
                    className="absolute top-0 right-8 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                    onClick={membersControlModal}
                    key="2"
                >
                    <img src={teamsIcon} className="h-6 w-6" alt="teamsIcon" />
                </button>



                <span
                    className="flex items-center h-6 px-3 text-xs font-semibold capitalize rounded-full"
                    style={{ backgroundColor: `${bgColor ? bgColor : '#14b8a6'}`, color: `${textColor ? textColor : 'black'}` }}
                >{name}</span>

                <Avaters members={users} />
                <h4 className="mt-3 text-sm font-medium">
                    {description}
                </h4>
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
                        <span className="ml-1 leading-none">{moment(timestamp).format('MMM DD')}</span>
                    </div>
                </div>
            </div>
            <AddMemberModal open={opened} control={controlModal} team={team} />
            <ViewMembersModal open={membersOpened} control={membersControlModal} addModalControl={controlModal} team={team} />
        </>
    )
}

export default Team