import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import logoutIcon from "../../assets/images/logout.svg";
import logoImage from "../../assets/images/lws-logo-dark.svg";
import projectIcon from "../../assets/images/projects.svg";

import teamsIcon from "../../assets/images/teams.svg";
import { userLoggedOut } from "../../features/auth/authSlice";
import SearchForm from "./SearchForm";

export default function Navigation() {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth) || {}

    // Logot
    const logout = () => {
        dispatch(userLoggedOut())
        localStorage.clear();
    }

    const match = useMatch('/projects');



    return (
        <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
            <div className="w-full px-10 bg-opacity-75">
                <div className="flex justify-between h-14 items-center">

                    <div className="flex justify-start">
                        <Link to="/">
                            <img
                                className="h-10 "
                                src={logoImage}
                                alt="Learn with Sumit"
                            />
                        </Link>
                        {match && <SearchForm />}
                        <div className="ml-10 py-2">
                            <Link
                                className="mx-2 text-sm font-semibold text-black px-3 hover:text-white"
                                to="/projects"
                            >
                                <img
                                    className="h-5 inline-block"
                                    src={projectIcon}
                                    alt="projectIcon"
                                />  Projects</Link>
                            <Link
                                className="mx-2 text-sm font-semibold text-black px-3 hover:text-white"
                                to="/teams"
                            ><img
                                    className="h-5 inline-block"
                                    src={teamsIcon}
                                    alt="Team"
                                /> Team</Link>
                        </div>
                    </div>

                    <ul className="flex justify-start">
                        <li className="text-white touch-pinch-zoom cursor-pointer" >
                            <img
                                className="h-8 w-8 rounded-full inline-block mx-1"
                                src={user?.avater}
                                alt={user?.name}
                            />
                            <span className="font-bold capitalize">{user?.name}</span>
                        </li>
                        <li className="mx-3">|</li>
                        <li className="text-white touch-pinch-zoom cursor-pointer" onClick={logout}>
                            <img
                                className="h-5 inline-block mx-1"
                                src={logoutIcon}
                                alt="Logout"
                            />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
