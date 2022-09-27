import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { TOAST } from "../../constant";
import { useUpdateTeamMutation } from "../../features/teams/teamsApi";
import { useGetUserQuery } from "../../features/users/usersApi";
import isValidEmail from "../../utils/isValidEmail";
import Error from "../ui/Error";
import Spin from "../ui/Spin";

export default function AddMemberModal({ open, control, team }) {
    const { id: teamId, users } = team || {};
    const [email, setEmail] = useState('');
    const [userCheck, setUserCheck] = useState(false);
    const [memberPayload, setMemberPayload] = useState({})
    const [duplicateUserError, setDuplicateUserError] = useState(false);
    const { user } = useSelector(state => state.auth);
    console.log(users, "usersusersusers");


    // RTK Query
    // First Time no request.. SKIP
    // User Check
    const { data: machedUser } = useGetUserQuery(email, { skip: !userCheck }) || {};

    const [updateTeam, { isLoading: updatedIsLoading, isSuccess: updateIsSuccess, isError: updatedIsError, error: updatedError }] = useUpdateTeamMutation();

    useEffect(() => {
        if (updateIsSuccess) {
            toast.success('Member Added Successfully', TOAST);
            // Using set time out for better ui presentation
            setUserCheck(false);
            setMemberPayload({});
            setDuplicateUserError(false);
            setEmail('');
        } else if (updatedIsError) {
            toast.error(updatedError?.data, TOAST);

        }
    }, [updateIsSuccess, updatedIsError, updatedError?.data])

    // Use Effecte after matchedUser found/response
    useEffect(() => {
        setDuplicateUserError(false);
        setMemberPayload({})
        if (machedUser?.length > 0 && machedUser[0].email !== user.email) {
            const { id, email: matchedUserEmail, name, avater } = machedUser[0];

            // IF user exists in team
            const findExistingUser = users.find(singleUser => singleUser.email === matchedUserEmail);
            if (findExistingUser?.email) {
                setDuplicateUserError(true);
                setMemberPayload({})
            } else {

                const data = {
                    ...team,
                    members: `${team.members}-${email}`,
                    users: [...team.users, { id, email: matchedUserEmail, name, avater, addedBy: user.name, timestamp: new Date().getTime() }],
                    timestamp: new Date().getTime()
                }
                setMemberPayload({ id: teamId, data })
                setDuplicateUserError(false);
            }
        }
    }, [machedUser, updatedIsError, email, team, teamId, user.email, user?.name, users])


    // Debounce Function. Step Two
    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }


    // Action thrower. Step Three
    const doSearch = (value) => {
        if (isValidEmail(value)) {
            setEmail(value.toLowerCase());
            setUserCheck(true);
        }
    }

    // Event Handler. Step one
    const handleSearch = debounceHandler(doSearch, 1000)


    const handleSubmit = (e) => {
        e.preventDefault()
        if (memberPayload?.id) {
            updateTeam(memberPayload);
            control();

        }

    }
    return (
        open && (
            <>

                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>

                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Add New Member
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm space-y-1">
                            <div>
                                <label htmlFor="email" className="sr-only">

                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) => handleSearch(e.target.value)}
                                    minLength="2"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Member Name"
                                />
                            </div>

                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={!memberPayload?.id || machedUser?.length === 0 || duplicateUserError || updatedIsLoading}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${memberPayload?.id ? 'text-white bg-violet-600 hover:bg-violet-700 ' : 'text-black bg-slate-400  '} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}
                            >
                                {updatedIsLoading ? <Spin /> : 'Add Member'}
                            </button>
                        </div>

                        {updatedIsError && <Error message={updatedError.data} />}
                        {duplicateUserError && <Error message="Duplicate User!!" />}
                        {machedUser?.length === 0 && <Error message="This user Doesn't Exist!!" />}
                    </form>
                </div>
            </>
        )
    );
}
