import React from 'react';
import SingleMember from './SingleMember';
const ViewMembersModal = ({ open, control, team, addModalControl }) => {
    const { id: teamId, name: teamName, bgColor, textColor, description, owner, users, timestamp } = team || {};
    let totalUser = users.length;
    let content = null
    if (users.length > 0) {
        content = users.map((user, index) => < SingleMember key={index} user={user} owner={owner} team={team} />)
    }

    const closeOpenModal = () => {
        control()
        addModalControl()
    }
    return (open && (
        <>


            <div
                onClick={control}
                className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
            ></div>

            <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 " style={{ color: textColor === '#ffffff' ? '#000000' : textColor }}>
                    All Members ({totalUser})
                </h2>
                <ul className="list-none ">
                    {content}
                </ul>
                <div className='relative w-full flex justify-center'>
                    <button
                        type="button"
                        onClick={control}
                        className={`group mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}
                    >
                        Close Modal
                    </button>
                    <button
                        type="button"
                        onClick={closeOpenModal}
                        className={`group  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}
                    >
                        Add Member
                    </button>
                </div>

            </div>
        </>
    )
    )
}

export default ViewMembersModal