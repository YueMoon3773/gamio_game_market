import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

import { useFetchGetData } from '../../../hooks/useFetchData';
import { useGameHelper } from '../../../hooks/useGamesHelper';
import helperFunctions from '../../../utils/helper';
import gameApiHelper from '../../../utils/gameApiHelper';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../assets/svgIcons';
import PageLayout from '../../layout/PageLayout/PageLayout';
import SelectionController from '../../base/SelectionController/SelectionController';
import GameCard from '../../base/GameCard/GameCard';
import MainBtn from '../../base/MainBtn/MainBtn';

import gamesData from '../../../../data.json';
const gamesLoading = false;
const gamesError = null;

import './ViewGames.scss';

const helpers = helperFunctions();
const api = gameApiHelper();

const breakpointColumnsObj = {
    default: 3,
    1200: 2,
    740: 1,
};

const ViewGames = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPageUrl = location.pathname;
    const { viewTypes } = useParams();
    const [searchParams] = useSearchParams();
    const gameNameSearchParam = searchParams.get('game-name');

    const {
        orderByOptsList,
        gamesPerPageOptsList,
        platformIds,
        orderByValue,
        orderByOnChangeHandler,
        gamesPerPageValue,
        gamesPerPageOnChangeHandler,
    } = useGameHelper();

    const [apiUrl, setApiUrl] = useState('');

    // scroll to the top of page after navigation
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });

    // set up api url to get games data
    useEffect(() => {
        let calculatedApi;
        if (viewTypes !== 'search') {
            calculatedApi = api.getApiBasedOnPageUrl(currentPageUrl, platformIds, orderByValue, gamesPerPageValue);
        } else {
            if (gameNameSearchParam !== null) calculatedApi = api.searchApiBasedOnGameName(gameNameSearchParam);
            else navigate('/error');
        }
        // console.log({ calculatedApi });
        setApiUrl(calculatedApi);
    }, [currentPageUrl, platformIds, orderByValue, gamesPerPageValue, gameNameSearchParam]);

    // const { data: gamesData, error: gamesError, loading: gamesLoading } = useFetchGetData(apiUrl);

    // LOGGING
    // console.log({ currentPageUrl });
    // console.log({ viewTypes });
    // console.log('api: ', apiUrl);
    // console.log({ platformIds });
    // console.log({ gamesData, gamesError, gamesLoading });

    const previousPageBtnHandler = () => {
        setApiUrl(gamesData.previous);
        window.scrollTo({ top: 0, left: 0 });
    };

    const nextPageBtnHandler = () => {
        setApiUrl(gamesData.next);
        window.scrollTo({ top: 0, left: 0 });
    };

    if (gamesData === null && gamesError !== null && gamesLoading !== false) {
        return <Navigate to="/error"></Navigate>;
    } else {
        return (
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.66, ease: 'easeInOut' }}
            >
                <PageLayout pageType="viewGamesPage">
                    {currentPageUrl !== api.FILTER_LINKS.ALL_TIME_TOP.value && (
                        <section className="filterControllerSection">
                            {currentPageUrl !== api.FILTER_LINKS.NEXT_WEEK.value &&
                                currentPageUrl !== api.FILTER_LINKS.BEST_OF_THIS_YEAR.value &&
                                currentPageUrl !== api.FILTER_LINKS.POPULAR_LAST_YEAR.value &&
                                currentPageUrl !== api.FILTER_LINKS.ALL_TIME_TOP.value && (
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
                                selectOptionList={gamesPerPageOptsList}
                                selectValue={gamesPerPageValue}
                                selectOnChangeHandler={gamesPerPageOnChangeHandler}
                            ></SelectionController>
                        </section>
                    )}

                    <section className="gamesDisplaySection">
                        {gamesLoading === true && gamesData === null ? (
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
                                    const gamePrice = helpers.calculateGamePrice(item.released);
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
                                            gameCurrentPrice={gamePrice}
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

                    {currentPageUrl !== api.FILTER_LINKS.ALL_TIME_TOP.value &&
                        gamesData !== null &&
                        gamesLoading === false && (
                            <section className="paginationControllerSection">
                                {gamesData?.previous !== null && (
                                    <MainBtn
                                        btnClassName="paginationBtn prevBtn"
                                        btnOnClickHandler={previousPageBtnHandler}
                                    >
                                        <ArrowLeftIcon></ArrowLeftIcon>
                                        Previous
                                    </MainBtn>
                                )}
                                {gamesData?.next !== null && (
                                    <MainBtn
                                        btnClassName="paginationBtn nextBtn"
                                        btnOnClickHandler={nextPageBtnHandler}
                                    >
                                        Next
                                        <ArrowRightIcon></ArrowRightIcon>
                                    </MainBtn>
                                )}
                            </section>
                        )}
                </PageLayout>
            </motion.div>
        );
    }
};

export default ViewGames;
