import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useVideoBgChange } from './hooks/useVideoBgChange';
import helperFunctions from './utils/helper';
import apiHelper from './utils/apiHelper';

import { GithubIcon, Last30DaysIcon, PopularInYearIcon, BestOfYearIcon, AllTimeTopIcon } from './assets/svgIcons';
import RawgImg from './assets/img/prj/RAWG.jpg';

import PageLayout from './components/layout/PageLayout/PageLayout';

import './App.scss';

const api = apiHelper();
const helper = helperFunctions();

const App = () => {
    const { bgVideo, isBgVideoBright, bgPosterImg, changeBgVideo } = useVideoBgChange();
    // console.log(bgVideo);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.66, ease: 'easeInOut' }}
        >
            <PageLayout
                pageType={'introPage'}
                bgVideo={bgVideo}
                bgPosterImg={bgPosterImg}
                isBgVideoBright={isBgVideoBright}
            >
                <motion.div
                    className="introCard introCardLeft"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.66, ease: 'easeInOut' }}
                >
                    {/* <div className="introCard introCardLeft"></div> */}

                    <div className="introCardTop">
                        <h1>Gamio</h1>
                        <p>
                            This is not an actual commercial site. Games are not available for purchase. All prices are
                            purely for display and simulation a real game store. Enjoy 😉
                        </p>
                    </div>

                    <div className="introCardBottom">
                        <Link
                            to="https://github.com/YueMoon3773"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="introPageBtn"
                        >
                            <GithubIcon></GithubIcon>
                            <span>YueMoon</span>
                        </Link>

                        <Link
                            to="https://rawg.io/apidocs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="introPageBtn"
                        >
                            <img src={RawgImg} alt="RAWG image" />
                            <span>RAWG API</span>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="introCard introCardRight"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.66, ease: 'easeInOut' }}
                >
                    <h4>Quick navigation</h4>
                    <Link
                        to={api.FILTER_LINKS.LAST_30_DAYS.value}
                        className="introPageBtn introQuickNavigationBtn"
                        onClick={changeBgVideo}
                    >
                        <Last30DaysIcon></Last30DaysIcon>
                        <span>Last 30 days</span>
                    </Link>

                    <Link
                        to={api.FILTER_LINKS.POPULAR_LAST_YEAR.value}
                        className="introPageBtn introQuickNavigationBtn"
                        onClick={changeBgVideo}
                    >
                        <PopularInYearIcon></PopularInYearIcon>
                        <span>{`Popular in ${helper.getThisYearAndLastYear().lastYear}`}</span>
                    </Link>

                    <Link
                        to={api.FILTER_LINKS.BEST_OF_THIS_YEAR.value}
                        className="introPageBtn introQuickNavigationBtn"
                        onClick={changeBgVideo}
                    >
                        <BestOfYearIcon></BestOfYearIcon>
                        <span>Best of this year</span>
                    </Link>

                    <Link
                        to={api.FILTER_LINKS.ALL_TIME_TOP.value}
                        className="introPageBtn introQuickNavigationBtn"
                        onClick={changeBgVideo}
                    >
                        <AllTimeTopIcon></AllTimeTopIcon>
                        <span>All time top</span>
                    </Link>
                </motion.div>
            </PageLayout>
        </motion.div>
    );
};

export default App;
