import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

import { useFetchGetData } from '../../../hooks/useFetchData';
import helperFunctions from '../../../utils/helper';
import apiHelper from '../../../utils/apiHelper';

import PageLayout from '../../layout/PageLayout/PageLayout';
import GameCard from '../../base/GameCard/GameCard';

import './ViewGames.scss';

import gamesData from '../../../../data.json';
import { useEffect, useState } from 'react';

const baseGameApiUrl = import.meta.env.VITE_API_GAMES_URL;
const gameApiUrlKey = import.meta.env.VITE_API_GAMES_URL_KEY;
const helpers = helperFunctions();
const api = apiHelper();

const breakpointColumnsObj = {
    default: 3,
    1200: 2,
    740: 1,
};

const orderByOptsList = [
    { id: 1, content: 'Oldest to Newest', value: 'oldToNew' },
    { id: 2, content: 'Newest to Oldest', value: 'newToOld' },
    { id: 3, content: 'Most comments', value: 'mostCmt' },
    { id: 4, content: 'Fewest comments', value: 'leastCmt' },
];
const postPerPageOptsList = [
    { id: 1, content: 20, value: 20 },
    { id: 2, content: 30, value: 30 },
    { id: 3, content: 50, value: 50 },
];

const ViewGames = () => {
    const unauthorizedUsrPostPerPage = 10;
    const location = useLocation();
    console.log(location.pathname);

    // console.log(helpers.getLast30Days());
    // console.log(helpers.getLastYearStartAndLastDates());
    console.log(api.getGenreFromUrl(location.pathname));
    // api.getGenreFromUrl(location.pathname);

    const [orderByValue, setOrderByValue] = useState(orderByOptsList[0].value);
    const [gamesPerPageValue, setGamesPerPageValue] = useState(unauthorizedUsrPostPerPage);
    const [apiUrl, setApiUrl] = useState('');

    const [platformIds, setPlatformIds] = useState(null);

    // get platform ids
    useEffect(() => {
        let isActive = true;
        const getPlatformIds = async () => {
            try {
                const res = await fetch(`${baseGameApiUrl}/platforms/lists/parents?key=${gameApiUrlKey}`);

                if (!res.ok) throw new Error(res.message);

                const data = await res.json();
                const tmp = data.results.map((item, index) => {
                    return { id: item.id, name: item.name, slug: item.slug };
                });
                // console.log({ data });
                // console.log({ tmp });
                setPlatformIds(tmp);
            } catch (e) {
                console.log(e);
            }
        };

        if (isActive) getPlatformIds();
        return () => (isActive = false);
    }, []);

    useEffect(() => {
        let ordering = api.getOrder(orderByValue);
        let calculatedApi = '';

        switch (location.pathname) {
            case api.FILTER_LINKS.LAST_30_DAYS:
                calculatedApi = api.getGameListUrl({
                    dates: helpers.getLast30Days().getLast30Days + ',' + helpers.getLast30Days().currentDate,
                    page_size: gamesPerPageValue,
                    ordering,
                });
                break;
            case api.FILTER_LINKS.THIS_WEEK:
                calculatedApi = api.getGameListUrl({
                    dates:
                        helpers.getThisWeekDates().startDateOfThisWeek +
                        ',' +
                        helpers.getThisWeekDates().lastDateOfThisWeek,
                    page_size: gamesPerPageValue,
                    ordering,
                });
                break;
            case api.FILTER_LINKS.NEXT_WEEK:
                ordering = 'released';
                calculatedApi = api.getGameListUrl({
                    dates:
                        helpers.getNextWeekDates().startDateOfNextWeek +
                        ',' +
                        helpers.getNextWeekDates().lastDateOfNextWeek,
                    page_size: gamesPerPageValue,
                    ordering,
                });
                break;
            case api.FILTER_LINKS.BEST_OF_THIS_YEAR:
                ordering = '-rating';
                calculatedApi = api.getGameListUrl({
                    dates:
                        helpers.getThisYearBeginAndCurrentDates().startDateOfThisYear +
                        ',' +
                        helpers.getThisYearBeginAndCurrentDates().currentDate,
                    page_size: gamesPerPageValue,
                    ordering,
                });
                break;
            case api.FILTER_LINKS.POPULAR_LAST_YEAR:
                ordering = '-added';
                calculatedApi = api.getGameListUrl({
                    dates:
                        helpers.getLastYearStartAndLastDates().startDateOfLastYear +
                        ',' +
                        helpers.getLastYearStartAndLastDates().lastDateOfLastYear,
                    page_size: gamesPerPageValue,
                    ordering,
                });
                break;
            case api.FILTER_LINKS.ALL_TIME_TOP:
                ordering = '-added';
                calculatedApi = api.getGameListUrl({
                    page_size: 30,
                    ordering,
                });
                break;
            case api.FILTER_LINKS.PC_PLATFORM:
            case api.FILTER_LINKS.PLAYSTATION_PLATFORM:
            case api.FILTER_LINKS.XBOX_PLATFORM:
            case api.FILTER_LINKS.ANDROID_PLATFORM:
            case api.FILTER_LINKS.IOS_PLATFORM:
            case api.FILTER_LINKS.NINTENDO_PLATFORM:
                calculatedApi = api.getGameListUrl({
                    parent_platforms:
                        platformIds !== null ? helpers.getSpecificPlatformId(platformIds, location.pathname) : 1,
                    page_size: gamesPerPageValue,
                    ordering,
                });
                break;
            case api.FILTER_LINKS.ACTION_GENRE:
            case api.FILTER_LINKS.STRATEGY_GENRE:
            case api.FILTER_LINKS.RPG_GENRE:
            case api.FILTER_LINKS.SHOOTER_GENRE:
            case api.FILTER_LINKS.ADVENTURE_GENRE:
            case api.FILTER_LINKS.PUZZLE_GENRE:
            case api.FILTER_LINKS.RACING_GENRE:
            case api.FILTER_LINKS.SPORT_GENRE:
                calculatedApi = api.getGameListUrl({
                    genres: api.getGenreFromUrl(location.pathname),
                    page_size: gamesPerPageValue,
                    ordering,
                });
                break;
            default:
                break;
        }
        // console.log({ calculatedApi });
        setApiUrl(calculatedApi);
    }, [location.pathname, platformIds, orderByValue, gamesPerPageValue]);

    console.log('api: ', apiUrl);
    console.log({ platformIds });

    // const gamesData = null;

    // console.log({ gamesData });

    // const {
    //     data: gamesData,
    //     error: gamesError,
    //     loading: gamesLoading,
    //     refetch: gamesRefetch,
    //     newFetchUrl: gameNewFetchUrl,
    // } = useFetchGetData(`${baseGameApiUrl}/games?key=${gameApiUrlKey}`);

    return (
        <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.66, ease: 'easeInOut' }}
        >
            <PageLayout pageType="viewGamesPage">
                <section className="filterControllerSection"></section>
                <section className="gamesDisplaySection">
                    {gamesData === null ? (
                        <>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="masonryGrid"
                                columnClassName="masonryGridColumn"
                            >
                                {[...Array(6)].map((_, index) => {
                                    return <GameCard key={index} isGameCardLoading={true}></GameCard>;
                                })}
                            </Masonry>
                        </>
                    ) : (
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="masonryGrid"
                            columnClassName="masonryGridColumn"
                        >
                            {gamesData.results.map((item, index) => {
                                return (
                                    <GameCard
                                        key={item.id + index}
                                        currentUrlLocationOfGameCard={location.pathname}
                                        isGameCardLoading={false}
                                        gameCardId={item.id}
                                        gameCardSingleMediaDisplay={item.background_image}
                                        gameCardMediaLibrary={item.short_screenshots}
                                        gameCardPlatforms={item.platforms}
                                        gameCardName={item.name}
                                        gameCardReleaseDate={item.released}
                                        gameCardGenres={item.genres}
                                        gameCardRating={item.rating}
                                        gameCardRatingCount={item.ratings_count}
                                        gameCardStores={item.stores}
                                    ></GameCard>
                                );
                            })}
                        </Masonry>
                    )}
                </section>
                <section className="paginationControllerSection"></section>
            </PageLayout>
        </motion.div>
    );
};

export default ViewGames;
