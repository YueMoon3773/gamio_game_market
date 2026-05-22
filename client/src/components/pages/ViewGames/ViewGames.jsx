import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

import { useFetchGetData } from '../../../hooks/useFetchData';
import { useGameHelper } from '../../../hooks/useGamesHelper';
import helperFunctions from '../../../utils/helper';
import apiHelper from '../../../utils/apiHelper';

import PageLayout from '../../layout/PageLayout/PageLayout';
import SelectionController from '../../base/SelectionController/SelectionController';
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

const ViewGames = () => {
    const unauthorizedUsrPostPerPage = 10;
    const location = useLocation();
    const currentPageUrl = location.pathname;
    // console.log({currentPageUrl});

    const {
        orderByOptsList,
        postPerPageOptsList,
        platformIds,
        orderByValue,
        orderByOnChangeHandler,
        gamesPerPageValue,
        gamesPerPageOnChangeHandler,
    } = useGameHelper();

    // const [orderByValue, setOrderByValue] = useState(orderByOptsList[0].value);
    // const [gamesPerPageValue, setGamesPerPageValue] = useState(unauthorizedUsrPostPerPage);
    const [apiUrl, setApiUrl] = useState('');

    // scroll to the top of page after navigation
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const calculatedApi = api.getApiBasedOnPageUrl(currentPageUrl, platformIds, orderByValue, gamesPerPageValue);
        // console.log({ calculatedApi });
        setApiUrl(calculatedApi);
    }, [currentPageUrl, platformIds, orderByValue, gamesPerPageValue]);

    // console.log('api: ', apiUrl);
    // console.log({ platformIds });

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
                {currentPageUrl !== api.FILTER_LINKS.ALL_TIME_TOP && (
                    <section className="filterControllerSection">
                        {currentPageUrl !== api.FILTER_LINKS.NEXT_WEEK &&
                            currentPageUrl !== api.FILTER_LINKS.BEST_OF_THIS_YEAR &&
                            currentPageUrl !== api.FILTER_LINKS.POPULAR_LAST_YEAR &&
                            currentPageUrl !== api.FILTER_LINKS.ALL_TIME_TOP && (
                                <SelectionController
                                    labelText="Order by:"
                                    selectId="orderBy"
                                    selectOptionList={orderByOptsList}
                                    selectValue={orderByValue}
                                    selectOnChangeHandler={orderByOnChangeHandler}
                                ></SelectionController>
                            )}
                        <SelectionController
                            labelText="Games per page:"
                            selectId="gamesPerPage"
                            selectOptionList={orderByOptsList}
                            selectValue={orderByValue}
                            selectOnChangeHandler={orderByOnChangeHandler}
                        ></SelectionController>
                    </section>
                )}

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
