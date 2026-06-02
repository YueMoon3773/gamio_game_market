import { useState, useEffect, createContext, useContext } from 'react';

import gameApiHelper from '../utils/gameApiHelper';

const api = gameApiHelper();
const unauthorizedUsrPostPerPage = 10;

const GameHelperContext = createContext(null);

export const GameHelperProvider = ({ children }) => {
    const orderByOptsList = [
        { id: 1, content: 'Oldest to Newest', value: 'oldToNew' },
        { id: 2, content: 'Newest to Oldest', value: 'newToOld' },
        { id: 3, content: 'Name (A-Z)', value: 'nameIncrease' },
        { id: 4, content: 'Name (Z-A)', value: 'nameDecrease' },
    ];
    const gamesPerPageOptsList = [
        { id: 1, content: 20, value: 20 },
        { id: 2, content: 30, value: 30 },
        { id: 3, content: 50, value: 50 },
    ];

    const [orderByValue, setOrderByValue] = useState(orderByOptsList[0].value);
    const [gamesPerPageValue, setGamesPerPageValue] = useState(unauthorizedUsrPostPerPage);

    const [sideBarPlatformsShowAll, setSideBarPlatformsShowAll] = useState(false);
    const [sideBarGenresShowAll, setSideBarGenresShowAll] = useState(false);

    const [platformIds, setPlatformIds] = useState(null);

    const toggleSideBarPlatformShowAll = () => {
        setSideBarPlatformsShowAll((prev) => !prev);
    };

    const toggleSideBarGenresShowAll = () => {
        setSideBarGenresShowAll((prev) => !prev);
    };

    const orderByOnChangeHandler = (e) => {
        // if (userAuthen === null) {
        //     e.preventDefault();
        //     showBadge();
        //     return;
        // } else {
        //     setCurrentPaginationNumber(1);
        //     const newSortByVal = e.target.value;
        //     setSortByValue(newSortByVal);

        //     setPostApiUrl(`${baseBeURL}/post/get-posts?sortBy=${newSortByVal}&postPerPage=${postsPerPageValue}`);
        // }
        e.preventDefault();
        const newSortByVal = e.target.value;
        setOrderByValue(newSortByVal);
    };

    const gamesPerPageOnChangeHandler = (e) => {
        // if (userAuthen === null) {
        //     e.preventDefault();
        //     // showBadge();
        //     return;
        // } else {
        //     setCurrentPaginationNumber(1);
        //     const newPostsPerPageVal = e.target.value;
        //     setPostsPerPageValue(newPostsPerPageVal);
        //     setPostApiUrl(`${baseBeURL}/post/get-posts?sortBy=${sortByValue}&postPerPage=${newPostsPerPageVal}`);
        // }
        e.preventDefault();
        const newPostsPerPageVal = e.target.value;
        setGamesPerPageValue(newPostsPerPageVal);
    };

    // get platform ids
    useEffect(() => {
        let isActive = true;
        const getPlatformIds = async () => {
            try {
                const res = await fetch(api.getParentPlatformApi());

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
