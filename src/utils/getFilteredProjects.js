const getFilteredProjects = (state, projects) => {
    return projects.filter(projects => projects.state === state)
}

export default getFilteredProjects;