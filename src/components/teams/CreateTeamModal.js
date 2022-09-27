import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Error from "../../components/ui/Error";
import { TOAST } from "../../constant";
import { useCreateTeamMutation, useGetTeamQuery } from "../../features/teams/teamsApi";
import Spin from "../ui/Spin";

export default function CreateTeamModal({ open, control }) {
    const { user } = useSelector(state => state.auth);
    const [teamCheck, setTeamCheck] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [textColor, setTextColor] = useState('');
    const [description, setDescription] = useState('');


    // Reset
    const reset = () => {
        setTeamName('');
        setBgColor('');
        setTextColor('');
        setDescription('');
        setBgColor('');
        control();
    }

    // RTK Query
    const [createTeam, { isLoading, isSuccess, isError, error: responseError }] = useCreateTeamMutation();
    const { data: machedTeam } = useGetTeamQuery(teamName, { skip: !teamCheck })


    // Render Handling and Message shoow
    useEffect(() => {
        if (isSuccess) {
            toast.success('Team created Successfull', TOAST);
            setTimeout(() => {
                reset();
            }, 2000);
        } else if (isError) {
            toast.error(responseError.data, TOAST);
        }
    }, [isSuccess, isError, responseError, reset])


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
        setTeamName(value.toLowerCase());
        setTeamCheck(true)

    }

    // Event Handler. Step one
    const handleSearch = debounceHandler(doSearch, 1000)


    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: teamName, bgColor, textColor, description,
            members: user.email,
            owner: user,
            users: [{
                ...user,
                addedBy: user.name.toLowerCase(),
                timestamp: new Date().getTime()
            }],
            timestamp: new Date().getTime()
        }
        if (machedTeam?.length === 0) {
            createTeam(payload);
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
                        Create New Team
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm space-y-1">
                            <div>
                                <label htmlFor="name" className="sr-only">

                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={(e) => handleSearch(e.target.value)}
                                    minLength="2"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Team Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="bgColor" className="sr-only">

                                </label>
                                <input
                                    id="bgColor"
                                    name="bgColor"
                                    type="text"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Background Color"
                                />
                            </div>
                            <div>
                                <label htmlFor="textColor" className="sr-only">

                                </label>
                                <input
                                    id="textColor"
                                    name="textColor"
                                    type="text"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Text Color"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    type="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Description"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={machedTeam?.length > 0 || machedTeam === undefined || !bgColor || !textColor || !description}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  ${machedTeam?.length === 0 && bgColor && textColor && description ? 'text-white bg-violet-600 hover:bg-violet-700 ' : 'text-black bg-slate-400'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}
                            >
                                {isLoading ? <Spin /> : 'Create'}
                            </button>
                        </div>

                        {machedTeam?.length > 0 && <Error message={`"${teamName}" team is already exists!!`} />}
                    </form>
                </div>
            </>
        )
    );
}
