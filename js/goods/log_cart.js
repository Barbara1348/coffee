function cart() {
    let userManager = new UsersManager();

    const stateUser = userManager.readCurrentUser();

    if (!stateUser) {
        window.location.href = "/log/authorization/";
    }

    else {
        window.location.href = "/bag/";
    }

}