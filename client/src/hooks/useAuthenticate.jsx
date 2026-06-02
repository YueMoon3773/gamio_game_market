import { useState, useEffect, useContext, createContext } from 'react';
import backEndApiHelper from '../utils/backEndApiHelper';

const AuthenticationContext = createContext(null);

const beApi = backEndApiHelper();

const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserInfo = async () => {
        // console.log(beApi.userAuthenticationUrl());
        // fetch(beApi.userAuthenticationUrl(), { credentials: 'include' })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setUser(data.user || null);
        //         setLoading(false);
        //     });

        setTimeout(() => {
            fetch(beApi.userAuthenticationUrl(), { credentials: 'include' })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data.user || null);
                    setLoading(false);
                });
        }, 1600);
    };

    // when web app start, connect to BE and check for "active session"
    useEffect(() => {
        fetchUserInfo();
    }, []);

    const logIn = async (userName, pwd) => {
        const res = await fetch(beApi.logInUrl(), {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ userName, pwd }),
        });

        const data = await res.json();

        if (!data.ok) throw new Error(data.msg);

        const tmpUser = data.user;
        setUser(tmpUser);
        return tmpUser;
    };

    const logOut = async () => {
        const res = await fetch(beApi.logOutUrl(), {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
        });

        const data = await res.json();

        if (!data.ok) throw new Error(data.msg);

        setUser(null);
        return data;
    };

    return (
        <AuthenticationContext.Provider
            value={{
                user,
                loading,
                logIn,
                logOut,
                fetchUserInfo,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

const useAuthenticate = () => {
    const context = useContext(AuthenticationContext);

    if (!context) throw new Error('useAuthenticate must be used inside AuthenticationContextProvider');

    return context;
};

export { AuthenticationContextProvider, useAuthenticate };
