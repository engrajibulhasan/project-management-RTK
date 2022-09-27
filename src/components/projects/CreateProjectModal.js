import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BACKLOG, TOAST } from "../../constant";
import { useCreateProjectMutation } from "../../features/projects/projectsApi";
import { useGetTeamQuery } from "../../features/teams/teamsApi";
import Error from "../ui/Error";
import Spin from "../ui/Spin";

export default function CreateProjectModal({ open, control }) {
    const { user } = useSelector(state => state.auth) || {}
    const [projectName, setProjectName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teamCheck, setTeamCheck] = useState(false)


    // Reset
    const reset = useCallback(() => {
        setProjectName('');
        // setTeamCheck(false);
        setTeamName('');
        control();
    }, [control])

    // RTK Query
    // Check is Team Available
    const { data: machedTeam } = useGetTeamQuery(teamName, { skip: !teamCheck });
    const [createProject, { isLoading, isSuccess, isError, error: responseError }] = useCreateProjectMutation();

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
        e.preventDefault();
        console.log(machedTeam, "machedTeam");
        const { id: teamId, name: selectedTeamName, bgColor, textColor, members } = machedTeam[0] || {}
        const data = {
            name: projectName.toLowerCase(),
            team: {
                id: teamId,
                name: selectedTeamName.toLowerCase(),
                bgColor,
                textColor,
                members
            },
            owner: { ...user },
            state: BACKLOG,
            participants: members.split("-").includes(user?.email) ? members : `${members}-${user?.email}`,
            timestamp: new Date().getTime()
        }

        if (machedTeam?.length > 0) {
            createProject(data)
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
                        Create New Project
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm space-y-1">
                            <div>
                                <label htmlFor="projectName" className="sr-only">

                                </label>
                                <input
                                    id="projectName"
                                    name="projectName"
                                    type="text"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    minLength="2"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Project Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="sr-only">

                                </label>
                                <input
                                    id="name"
                                    name="teamName"
                                    type="text"
                                    onChange={(e) => handleSearch(e.target.value)}
                                    minLength="2"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Team Name"
                                />
                            </div>



                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={machedTeam?.length === 0 || machedTeam === undefined}
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${machedTeam?.length === 0 || machedTeam === undefined ? 'text-black bg-slate-400' : 'text-white bg-violet-600 hover:bg-violet-700 '} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}
                            >
                                {isLoading ? <Spin /> : 'Create'}
                            </button>
                        </div>

                        {machedTeam?.length === 0 && <Error message="Team not found!" />}
                    </form>
                </div>
            </>
        )
    );
}
