/*

Utility for checking the user's role and redirecting to another page

*/

export const rolesNavigate = (auth, role) => {
    if(auth === true && role === 'User') {
        return "/get-profiles";
    } else if (auth === true && role === 'Admin') {
        return "/get-users";
    } else {
        window.location.reload();
    }
}

export const statusNavigate = (status) => {
    if(status) {
        return "/user-login";
    } else {
        return;
    }
}