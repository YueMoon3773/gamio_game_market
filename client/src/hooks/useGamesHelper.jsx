import { useState, useEffect, createContext, useContext } from 'react';

import gameApiHelper from '../utils/gameApiHelper';
import backEndApiHelper from '../utils/backEndApiHelper';

const gameApi = gameApiHelper();
const beApi = backEndApiHelper();

const GameHelperContext = createContext(null);

export const GameHelperProvider = ({ children }) => {
    const orderByOptsList = [
        { id: 1, content: 'Oldest to Newest', value: 'oldToNew' },
        { id: 2, content: 'Newest to Oldest', value: 'newToOld' },
        { id: 3, content: 'Name (A-Z)', value: 'nameIncrease' },
        { id: 4, content: 'Name (Z-A)', value: 'nameDecrease' },
    ];
    const gamesPerPageOptsList = [
        { id: 1, content: 10, value: 10 },
        { id: 2, content: 20, value: 20 },
        { id: 3, content: 30, value: 30 },
        { id: 4, content: 50, value: 50 },
    ];

    const [orderByValue, setOrderByValue] = useState(orderByOptsList[0].value);
    const [gamesPerPageValue, setGamesPerPageValue] = useState(gamesPerPageOptsList[0].value);

    const [sideBarPlatformsShowAll, setSideBarPlatformsShowAll] = useState(false);
    const [sideBarGenresShowAll, setSideBarGenresShowAll] = useState(false);

    const [platformIds, setPlatformIds] = useState(null);
    const [gameIdInCartList, setGameIdInCartList] = useState(null);
    const [userFavGameIdList, setUserFavGames] = useState(null);

    const toggleSideBarPlatformShowAll = () => {
        setSideBarPlatformsShowAll((prev) => !prev);
    };

    const toggleSideBarGenresShowAll = () => {
        setSideBarGenresShowAll((prev) => !prev);
    };

    const orderByOnChangeHandler = (e) => {
        e.preventDefault();
        const newSortByVal = e.target.value;
        setOrderByValue(newSortByVal);
    };

    const gamesPerPageOnChangeHandler = (e) => {
        e.preventDefault();
        const newPostsPerPageVal = e.target.value;
        setGamesPerPageValue(newPostsPerPageVal);
    };

    const getAllGameIdsInUserCart = async (userId) => {
        const res = await fetch(beApi.getAllGameIdsInUserCartUrl(userId), { mode: 'cors', method: 'GET' });

        const data = await res.json();

        if (data.ok === false) throw new Error(data.msg);

        // console.log('User games in cart: ', data);

        setGameIdInCartList(data.gameList);
    };

    const resetGameIdInCartList = () => setGameIdInCartList(null);

    const addGameToUserCart = async (userId, gameId, gameName, gameImg, gamePrice) => {
        const res = await fetch(beApi.addGameToUserCartUrl(), {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, gameId, gameName, gameImg, gamePrice }),
        });

        const data = await res.json();

        if (data.ok === false) {
            if (data.err) throw new Error(data.err);
            else throw new Error(data.msg);
        }

        return data;
    };

    const removeGameFromUserCart = async (userId, gameId) => {
        const res = await fetch(beApi.removeGameFromUserCartUrl(), {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, gameId }),
        });

        const data = await res.json();

        if (data.ok === false) {
            if (data.err) throw new Error(data.err);
            else throw new Error(data.msg);
        }

        return data;
    };

    const getAllUserFavGameIds = async (userId) => {
        const res = await fetch(beApi.getAllUserFavGameIdsUrl(userId), { mode: 'cors', method: 'GET' });

        const data = await res.json();

        if (data.ok === false) throw new Error(data.msg);

        // console.log('User fav games: ', data);

        setUserFavGames(data.gameList);
    };

    const resetUserFavGameIdList = () => setUserFavGames(null);

    const addUserFavGame = async (userId, gameId) => {
        const res = await fetch(beApi.addUserFavGameUrl(), {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, gameId }),
        });

        const data = await res.json();

        if (data.ok === false) {
            if (data.err) throw new Error(data.err);
            else throw new Error(data.msg);
        }

        // console.log({ data });

        return data;
    };

    const removeUserFavGame = async (userId, gameId) => {
        const res = await fetch(beApi.removeUserFavGameUrl(), {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, gameId }),
        });

        const data = await res.json();

        if (data.ok === false) {
            if (data.err) throw new Error(data.err);
            else throw new Error(data.msg);
        }

        return data;
    };

    // get platform ids
    useEffect(() => {
        let isActive = true;
        const getPlatformIds = async () => {
            try {
                const res = await fetch(gameApi.getParentPlatformApi());

                if (!res.ok) throw new Error(res.statusText);

                const data = await res.json();
                const platformIds = data.results.map((item, index) => {
                    return { id: item.id, name: item.name, slug: item.slug };
                });
                // console.log({ data });
                // console.log({ platformIds });
                setPlatformIds(platformIds);
            } catch (e) {
                console.log(e);
            }
        };

        if (isActive) getPlatformIds();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <GameHelperContext.Provider
            value={{
                orderByOptsList,
                gamesPerPageOptsList,
                sideBarPlatformsShowAll,
                toggleSideBarPlatformShowAll,
                sideBarGenresShowAll,
                toggleSideBarGenresShowAll,
                platformIds,
                orderByValue,
                orderByOnChangeHandler,
                gamesPerPageValue,
                gamesPerPageOnChangeHandler,
                gameIdInCartList,
                addGameToUserCart,
                removeGameFromUserCart,
                getAllGameIdsInUserCart,
                resetGameIdInCartList,
                userFavGameIdList,
                getAllUserFavGameIds,
                resetUserFavGameIdList,
                addUserFavGame,
                removeUserFavGame,
            }}
        >
            {children}
        </GameHelperContext.Provider>
    );
};

export const useGameHelper = () => {
    const context = useContext(GameHelperContext);

    if (!context) throw new Error('useGameHelper must be used inside GameHelperProvider');

    return context;
};
