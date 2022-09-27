import moment from "moment";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avaterDemo from "../../assets/images/avaterDemo.png";
import clockIcon from "../../assets/images/clock.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import emailIcon from "../../assets/images/email.svg";
import userIcon from "../../assets/images/user.svg";
import { TOAST } from '../../constant';
import { useUpdateTeamMutation } from '../../features/teams/teamsApi';
import Spin from '../ui/Spin';




const SingleMember = ({ user, owner, team }) => {
    const { user: loggedInUser } = useSelector(state => state.auth) || {};
    const { name, email, avater, } = user || {}
    const { id: teamId, members } = team || {}
    // RTK Query . Update Team
    const [updateTeam, { isLoading, isSuccess, isError, error }] = useUpdateTeamMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success('Member Removed Successfully', TOAST);
        } else if (isError) {
            toast.success(error.data, TOAST);
        }
        // isSuccess && toast.success('Member Removed Successfully', TOAST)
    }, [isSuccess, isError, error])

    const handleRemove = (user) => {
        const afterRemovingMembers = members.split("-").filter(singleEmail => singleEmail !== user.email).join("-")
        const afterRemovingUsers = team.users.filter(singleUser => singleUser.email !== user.email);
        const payload = {
            ...team,
            members: afterRemovingMembers,
            users: [...afterRemovingUsers],
            timestamp: new Date().getTime()
        }
        updateTeam({ id: teamId, data: payload });

    }

    return (
        <>


            <li className='py-2 px-2 mb-2 rounded-md flex justify-between  items-center  bg-slate-200 hover:bg-slate-300 cursor-default text-black text-sm'>
                <div className='flex justify-start  items-center'>
                    <img src={avater ? avater : avaterDemo} alt={name} className="w-10 h-10 mr-5  rounded-full" />

                    <div>
                        <span className='flex justify-start font-semibold capitalize'><img src={userIcon} alt="deleteIcon" className='w-4 h-4 mr-1 ' /> {name} {owner?.email === email && '(Owner)'}</span>
                        <span className='flex justify-start text-xs'><img src={emailIcon} alt="deleteIcon" className='w-3 h-3 mr-1' />  {email}</span>
                        <span className='flex justify-start text-xs'><img src={clockIcon} alt="deleteIcon" className='w-3 h-3 mr-1' /> {moment(user?.timestamp).format('MMM DD | hh:mm a')}, <strong>Added by: <span className="capitalize">{user?.addedBy}</span></strong></span>
                    </div>
                </div>
                {loggedInUser.email === owner.email && owner.email !== email && !isLoading && <img src={deleteIcon} onClick={() => handleRemove(user)} alt="deleteIcon" className='w-6 h-6 cursor-pointer' />}
                {isLoading && <Spin />}
            </li>
        </>
    )
}

export default SingleMember