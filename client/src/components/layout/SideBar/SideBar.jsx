// import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';

import { useGameHelper } from '../../../hooks/useGamesHelper';

import {
    YourFavGamesIcon,
    Last30DaysIcon,
    ThisWeekIcon,
    NextWeekIcon,
    BestOfYearIcon,
    PopularInYearIcon,
    AllTimeTopIcon,
    PcIcon,
    PlayStationIcon,
    XBoxIcon,
    NintendoIcon,
    IosIcon,
    AndroidIcon,
    ActionIcon,
    StrategyIcon,
    RpgIcon,
    ShooterIcon,
    AdventureIcon,
    PuzzleIcon,
    RacingIcon,
    SportIcon,
    ShowAllButtonIcon,
} from '../../../assets/svgIcons';
import gameApiHelper from '../../../utils/gameApiHelper';
import helperFunctions from '../../../utils/helper';

import './SideBar.scss';

const helper = helperFunctions();
const api = gameApiHelper();

const SideBar = () => {
    // const [isPlatformsShowAll, setIsPlatformsShowAll] = useState(false);
    // const [isGenresShowAll, setIsGenresShowAll] = useState(false);

    const { sideBarPlatformsShowAll, toggleSideBarPlatformShowAll, sideBarGenresShowAll, toggleSideBarGenresShowAll } =
        useGameHelper();

    return (
        <aside className="sideBar">
            {/* <section className="sideBarSection">
                <h1 className="sideBarSectionHeading">Your games</h1>
                <NavLink to={api.FILTER_LINKS.POPULAR_LAST_YEAR.value} className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}>
                    <div className="sideBarIconWrapper">
                        <YourFavGamesIcon iconClassName={'sideBarIcon'}></YourFavGamesIcon>
                    </div>
                    <span></span>
                </NavLink>
            </section> */}

            {/* NEW RELEASE SECTION  */}
            <section className="sideBarSection">
                <h1 className="sideBarSectionHeading">New releases</h1>

                <div className="sideBarSectionContent">
                    <NavLink
                        to={api.FILTER_LINKS.LAST_30_DAYS.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <Last30DaysIcon iconClassName={'sideBarIcon'}></Last30DaysIcon>
                        </div>
                        <span>{api.FILTER_LINKS.LAST_30_DAYS.displayName}</span>
                    </NavLink>
                    <NavLink
                        to={api.FILTER_LINKS.THIS_WEEK.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <ThisWeekIcon iconClassName={'sideBarIcon'}></ThisWeekIcon>
                        </div>
                        <span>{api.FILTER_LINKS.THIS_WEEK.displayName}</span>
                    </NavLink>
                    <NavLink
                        to={api.FILTER_LINKS.NEXT_WEEK.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <NextWeekIcon iconClassName={'sideBarIcon'}></NextWeekIcon>
                        </div>
                        <span>{api.FILTER_LINKS.NEXT_WEEK.displayName}</span>
                    </NavLink>
                </div>
            </section>

            {/* TOP GAMES SECTION  */}
            <section className="sideBarSection">
                <h1 className="sideBarSectionHeading">Top</h1>

                <div className="sideBarSectionContent">
                    <NavLink
                        to={api.FILTER_LINKS.BEST_OF_THIS_YEAR.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <BestOfYearIcon iconClassName={'sideBarIcon'}></BestOfYearIcon>
                        </div>
                        <span>{api.FILTER_LINKS.BEST_OF_THIS_YEAR.displayName}</span>
                    </NavLink>
                    <NavLink
                        to={api.FILTER_LINKS.POPULAR_LAST_YEAR.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <PopularInYearIcon iconClassName={'sideBarIcon'}></PopularInYearIcon>
                        </div>
                        <span>{api.FILTER_LINKS.POPULAR_LAST_YEAR.displayName}</span>
                    </NavLink>
                    <NavLink
                        to={api.FILTER_LINKS.ALL_TIME_TOP.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <AllTimeTopIcon iconClassName={'sideBarIcon'}></AllTimeTopIcon>
                        </div>
                        <span>{api.FILTER_LINKS.ALL_TIME_TOP.displayName}</span>
                    </NavLink>
                </div>
            </section>

            {/* PLATFORMS SECTION */}
            <section className="sideBarSection">
                <h1 className="sideBarSectionHeading">Platforms</h1>

                <div className="sideBarSectionContent">
                    <NavLink
                        to={api.FILTER_LINKS.PC_PLATFORM.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <PcIcon iconClassName={'sideBarIcon'}></PcIcon>
                        </div>
                        <span>{api.FILTER_LINKS.PC_PLATFORM.displayName}</span>
                    </NavLink>
                    <NavLink
                        to={api.FILTER_LINKS.PLAYSTATION_PLATFORM.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <PlayStationIcon iconClassName={'sideBarIcon'}></PlayStationIcon>
                        </div>
                        <span>{api.FILTER_LINKS.PLAYSTATION_PLATFORM.displayName}</span>
                    </NavLink>
                    <NavLink
                        to={api.FILTER_LINKS.XBOX_PLATFORM.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <XBoxIcon iconClassName={'sideBarIcon'}></XBoxIcon>
                        </div>
                        <span>{api.FILTER_LINKS.XBOX_PLATFORM.displayName}</span>
                    </NavLink>

                    {sideBarPlatformsShowAll && (
                        <>
                            <NavLink
                                to={api.FILTER_LINKS.ANDROID_PLATFORM.value}
                                className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                            >
                                <div className="sideBarIconWrapper">
                                    <AndroidIcon iconClassName={'sideBarIcon'}></AndroidIcon>
                                </div>
                                <span>{api.FILTER_LINKS.ANDROID_PLATFORM.displayName}</span>
                            </NavLink>
                            <NavLink
                                to={api.FILTER_LINKS.IOS_PLATFORM.value}
                                className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                            >
                                <div className="sideBarIconWrapper">
                                    <IosIcon iconClassName={'sideBarIcon'}></IosIcon>
                                </div>
                                <span>{api.FILTER_LINKS.IOS_PLATFORM.displayName}</span>
                            </NavLink>
                            <NavLink
                                to={api.FILTER_LINKS.NINTENDO_PLATFORM.value}
                                className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                            >
                                <div className="sideBarIconWrapper">
                                    <NintendoIcon iconClassName={'sideBarIcon'}></NintendoIcon>
                                </div>
                                <span>{api.FILTER_LINKS.NINTENDO_PLATFORM.displayName}</span>
                            </NavLink>
                        </>
                    )}

                    <button
                        className="showHideSideBarSectionBtn"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleSideBarPlatformShowAll();
                        }}
                    >
                        <div className={`sideBarIconWrapper ${sideBarPlatformsShowAll ? 'rotateIcon' : ''}`}>
                            <ShowAllButtonIcon iconClassName={'sideBarShowHideIcon'}></ShowAllButtonIcon>
                            {/* <ShowAllButtonIcon></ShowAllButtonIcon> */}
                        </div>
                        <span>{sideBarPlatformsShowAll ? 'Show less' : 'Show all'}</span>
                    </button>
                </div>
            </section>

            {/* GENRES SECTION */}
            <section className="sideBarSection">
                <h1 className="sideBarSectionHeading">Genres</h1>

                <div className="sideBarSectionContent">
                    <NavLink
                        to={api.FILTER_LINKS.ACTION_GENRE.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            {/* <ActionIcon iconClassName={'sideBarIcon'}></ActionIcon> */}
                            <ActionIcon iconClassName={'sideBarFilledIcon'}></ActionIcon>
                        </div>
                        <span>{api.FILTER_LINKS.ACTION_GENRE.displayName}</span>
                    </NavLink>
                    <NavLink
                        to={api.FILTER_LINKS.STRATEGY_GENRE.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <StrategyIcon iconClassName={'sideBarIcon'}></StrategyIcon>
                        </div>
                        <span>{api.FILTER_LINKS.STRATEGY_GENRE.displayName}</span>
                    </NavLink>
                    <NavLink
                        to={api.FILTER_LINKS.RPG_GENRE.value}
                        className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                    >
                        <div className="sideBarIconWrapper">
                            <RpgIcon iconClassName={'sideBarIcon'}></RpgIcon>
                        </div>
                        <span>{api.FILTER_LINKS.RPG_GENRE.displayName}</span>
                    </NavLink>

                    {sideBarGenresShowAll && (
                        <>
                            <NavLink
                                to={api.FILTER_LINKS.SHOOTER_GENRE.value}
                                className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                            >
                                <div className="sideBarIconWrapper">
                                    <ShooterIcon iconClassName={'sideBarIcon'}></ShooterIcon>
                                </div>
                                <span>{api.FILTER_LINKS.SHOOTER_GENRE.displayName}</span>
                            </NavLink>
                            <NavLink
                                to={api.FILTER_LINKS.ADVENTURE_GENRE.value}
                                className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                            >
                                <div className="sideBarIconWrapper">
                                    <AdventureIcon iconClassName={'sideBarIcon'}></AdventureIcon>
                                </div>
                                <span>{api.FILTER_LINKS.ADVENTURE_GENRE.displayName}</span>
                            </NavLink>
                            <NavLink
                                to={api.FILTER_LINKS.PUZZLE_GENRE.value}
                                className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                            >
                                <div className="sideBarIconWrapper">
                                    <PuzzleIcon iconClassName={'sideBarIcon'}></PuzzleIcon>
                                </div>
                                <span>{api.FILTER_LINKS.PUZZLE_GENRE.displayName}</span>
                            </NavLink>
                            <NavLink
                                to={api.FILTER_LINKS.RACING_GENRE.value}
                                className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                            >
                                <div className="sideBarIconWrapper">
                                    <RacingIcon iconClassName={'sideBarIcon'}></RacingIcon>
                                </div>
                                <span>{api.FILTER_LINKS.RACING_GENRE.displayName}</span>
                            </NavLink>
                            <NavLink
                                to={api.FILTER_LINKS.SPORT_GENRE.value}
                                className={({ isActive }) => `sideBarLink ${isActive ? 'active' : ''}`}
                            >
                                <div className="sideBarIconWrapper">
                                    <SportIcon iconClassName={'sideBarIcon'}></SportIcon>
                                </div>
                                <span>{api.FILTER_LINKS.SPORT_GENRE.displayName}</span>
                            </NavLink>
                        </>
                    )}

                    <button
                        className="showHideSideBarSectionBtn"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleSideBarGenresShowAll();
                        }}
                    >
                        <div className={`sideBarIconWrapper ${sideBarGenresShowAll ? 'rotateIcon' : ''}`}>
                            <ShowAllButtonIcon iconClassName={'sideBarShowHideIcon'}></ShowAllButtonIcon>
                        </div>
                        <span>{sideBarGenresShowAll ? 'Show less' : 'Show all'}</span>
                    </button>
                </div>
            </section>
        </aside>
    );
};

export default SideBar;
