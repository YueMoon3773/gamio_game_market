const baseBeApiUrl = import.meta.env.VITE_BE_API_URL;

const backEndApiHelper = () => {
    const userAuthenticationUrl = () => {
        return `${baseBeApiUrl}/user/authenticate/me`;
    };

    const logInUrl = () => {
        return `${baseBeApiUrl}/user/log-in`;
    };

    const logOutUrl = () => {
        return `${baseBeApiUrl}/user/log-out`;
    };

    const signUpUrl = () => {
        return `${baseBeApiUrl}/user/sign-up`;
    };

    const addGameToUserCartUrl = () => {
        return `${baseBeApiUrl}/game/add-game-cart`;
    };

    const removeGameFromUserCartUrl = () => {
        return `${baseBeApiUrl}/game/remove-game-cart`;
    };

    const checkIfGameIsInUserCartUrl = () => {
        return `${baseBeApiUrl}/game/check-if-game-in-cart`;
    };

    const getAllGameIdsInUserCartUrl = (userId) => {
        return `${baseBeApiUrl}/game/get-game-ids-in-cart?userId=${userId}`;
    };

    const addUserFavGameUrl = () => {
        return `${baseBeApiUrl}/game/add-game-fav`;
    };

    const removeUserFavGameUrl = () => {
        return `${baseBeApiUrl}/game/remove-game-fav`;
    };

    const getAllUserFavGameIdsUrl = (userId) => {
        return `${baseBeApiUrl}/game/get-fav-game-ids?userId=${userId}`;
    };

    return {
        userAuthenticationUrl,
        logInUrl,
        logOutUrl,
        signUpUrl,
        addGameToUserCartUrl,
        removeGameFromUserCartUrl,
        checkIfGameIsInUserCartUrl,
        getAllGameIdsInUserCartUrl,
        addUserFavGameUrl,
        removeUserFavGameUrl,
        getAllUserFavGameIdsUrl,
    };
};

export default backEndApiHelper;
