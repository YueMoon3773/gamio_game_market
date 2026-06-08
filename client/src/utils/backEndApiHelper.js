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
        return `${baseBeApiUrl}/game/add-game`;
    };

    const removeGameFromUserCartUrl = () => {
        return `${baseBeApiUrl}/game/remove-game`;
    };

    const checkIfGameIsInUserCartUrl = () => {
        return `${baseBeApiUrl}/game/check-if-game-in-cart`;
    };

    const getAllGamesInUserCartUrl = (userId) => {
        return `${baseBeApiUrl}/game/get-games-in-cart?userId=${userId}`;
    };

    return {
        userAuthenticationUrl,
        logInUrl,
        logOutUrl,
        signUpUrl,
        addGameToUserCartUrl,
        removeGameFromUserCartUrl,
        checkIfGameIsInUserCartUrl,
        getAllGamesInUserCartUrl,
    };
};

export default backEndApiHelper;
