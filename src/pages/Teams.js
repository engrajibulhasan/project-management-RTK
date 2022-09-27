import React from 'react'
import { useSelector } from 'react-redux'
import Team from '../components/teams/Team'
import TeamHeader from '../components/teams/TeamHeader'
import Error from '../components/ui/Error'
import Navigation from '../components/ui/Navigation'
import Spin from '../components/ui/Spin'
import { useGetTeamsQuery } from '../features/teams/teamsApi'

const Teams = () => {
    const { user } = useSelector(state => state.auth) || {}
    const { email } = user || {};
    const { data: teams, isLoading, isSuccess, isError, error: responseError } = useGetTeamsQuery(email, { skip: false });


    let content = '';

    if (isLoading && !isError) {
        content = <div className='flex content-start'><Spin /> Please Wait....</div>
    }
    if (!isLoading && isError) {
        content = <Error message={responseError} />
    }
    if (teams?.length > 0) {
        content = teams.map(team => <Team key={team.id} team={team} />)
    }


    return (


        <div className="flex flex-col h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <Navigation />
            {/* Teams header */}
            <TeamHeader />
            <div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto"
            >

                {content}

            </div>
        </div>


    )
}

export default Teams