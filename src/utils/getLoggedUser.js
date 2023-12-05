export const getLoggedUser = () => {
    const lsUser = localStorage.getItem('user');
    let loggedInUser;

    if (lsUser) {
        loggedInUser = JSON.parse(lsUser).user
    }
    return loggedInUser
}