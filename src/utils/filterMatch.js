const filterMatch = (searchKey, projectName) => {
    if (!searchKey || !projectName) {
        return false
    }
    let comparison = new RegExp(searchKey, 'gi');
    const isMatch = projectName.match(comparison);
    return isMatch
}
export default filterMatch;