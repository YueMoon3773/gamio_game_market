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

    return {
        userAuthenticationUrl,
        logInUrl,
        logOutUrl,
        signUpUrl,
    };
};

export default backEndApiHelper;
