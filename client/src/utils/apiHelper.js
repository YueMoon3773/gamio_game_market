import { z } from 'zod';
import helperFunctions from './helper';

const baseGameApiUrl = import.meta.env.VITE_API_GAMES_URL;
const gameApiUrlKey = import.meta.env.VITE_API_GAMES_URL_KEY;

const helper = helperFunctions();

const apiHelper = () => {
    const STORE_DOMAINS = {
        steam: 'https://store.steampowered.com',
        'playstation-store': 'https://store.playstation.com',
        'xbox-store': 'https://www.xbox.com',
        nintendo: 'https://www.nintendo.com',
        'epic-games': 'https://www.epicgames.com',
        gog: 'https://www.gog.com',
        'apple-appstore': 'https://apps.apple.com',
        'google-play': 'https://play.google.com',
    };

    const FILTER_LINKS = {
        LAST_30_DAYS: '/games/last-30-days',
        THIS_WEEK: '/games/this-week',
        NEXT_WEEK: '/games/next-week',
        BEST_OF_THIS_YEAR: '/games/best-of-year',
        POPULAR_LAST_YEAR: '/games/popular-last-year',
        ALL_TIME_TOP: '/games/all-time-top',
        PC_PLATFORM: '/games/pc-platform',
        PLAYSTATION_PLATFORM: '/games/playstation-platform',
        XBOX_PLATFORM: '/games/xbox-platform',
        ANDROID_PLATFORM: '/games/android-platform',
        IOS_PLATFORM: '/games/ios-platform',
        NINTENDO_PLATFORM: '/games/nintendo-platform',
        ACTION_GENRE: '/games/action-genre',
        STRATEGY_GENRE: '/games/strategy-genre',
        RPG_GENRE: '/games/rpg-genre',
        SHOOTER_GENRE: '/games/shooter-genre',
        ADVENTURE_GENRE: '/games/adventure-genre',
        PUZZLE_GENRE: '/games/puzzle-genre',
        RACING_GENRE: '/games/racing-genre',
        SPORT_GENRE: '/games/sports-genre',
    };

    const createGenreLinkBasedOnGenreType = (genreType) => {
        return `/games/${genreType.toLowerCase()}-genre`;
    };

    const createPlatformLinkBasedOnPlatformType = (platform) => {
        return `/games/${platform.toLowerCase()}-platform`;
    };

    const getGenreFromUrl = (pageUrl) => {
        if (!pageUrl || !pageUrl.includes('genre')) return null;
        // console.log(pageUrl.split('-')[0].split('/'));

        return pageUrl.split('-')[0].split('/')[2] !== 'rpg'
            ? pageUrl.split('-')[0].split('/')[2]
            : 'role-playing-games-rpg';
    };

    const getOrder = (orderValue) => {
        switch (orderValue) {
            case 'oldToNew':
                return 'released';
            case 'newToOld':
                return '-released';
            default:
                return '';
        }
    };

    const getApiStructure = (endPoint, params) => {
        const paramsToUrl = new URLSearchParams(params).toString();

        return `${baseGameApiUrl}/${endPoint}?${paramsToUrl}&key=${gameApiUrlKey}`;
    };

    const getGameListUrl = (params) => {
        return getApiStructure('games', params);
    };

    const getParentPlatformApi = () => {
        return `${baseGameApiUrl}/platforms/lists/parents?key=${gameApiUrlKey}`;
    };

    const storeByIdUrl = (storeId) => {
        return `${baseGameApiUrl}/stores/${storeId}?key=${gameApiUrlKey}`;
    };

    const getApiBasedOnPageUrl = (pageTargetUrl, platformIds, orderValue, resultsPerPage) => {
        let ordering = getOrder(orderValue);
        let calculatedApi = '';

        if (pageTargetUrl.includes('genre')) {
            calculatedApi = getGameListUrl({
                genres: getGenreFromUrl(location.pathname),
                page_size: resultsPerPage,
                ordering,
            });
        } else if (pageTargetUrl.includes('platform')) {
            calculatedApi = getGameListUrl({
                parent_platforms: platformIds !== null ? helper.getSpecificPlatformId(platformIds, pageTargetUrl) : 1,
                page_size: resultsPerPage,
                ordering,
            });
        } else {
            switch (pageTargetUrl) {
                case FILTER_LINKS.LAST_30_DAYS:
                    calculatedApi = getGameListUrl({
                        dates: helper.getLast30Days().getLast30Days + ',' + helper.getLast30Days().currentDate,
                        page_size: resultsPerPage,
                        ordering,
                    });
                    break;
                case FILTER_LINKS.THIS_WEEK:
                    calculatedApi = getGameListUrl({
                        dates:
                            helper.getThisWeekDates().startDateOfThisWeek +
                            ',' +
                            helper.getThisWeekDates().lastDateOfThisWeek,
                        page_size: resultsPerPage,
                        ordering,
                    });
                    break;
                case FILTER_LINKS.NEXT_WEEK:
                    ordering = 'released';
                    calculatedApi = getGameListUrl({
                        dates:
                            helper.getNextWeekDates().startDateOfNextWeek +
                            ',' +
                            helper.getNextWeekDates().lastDateOfNextWeek,
                        page_size: resultsPerPage,
                        ordering,
                    });
                    break;
                case FILTER_LINKS.BEST_OF_THIS_YEAR:
                    ordering = '-rating';
                    calculatedApi = getGameListUrl({
                        dates:
                            helper.getThisYearBeginAndCurrentDates().startDateOfThisYear +
                            ',' +
                            helper.getThisYearBeginAndCurrentDates().currentDate,
                        page_size: resultsPerPage,
                        ordering,
                    });
                    break;
                case FILTER_LINKS.POPULAR_LAST_YEAR:
                    ordering = '-added';
                    calculatedApi = getGameListUrl({
                        dates:
                            helper.getLastYearStartAndLastDates().startDateOfLastYear +
                            ',' +
                            helper.getLastYearStartAndLastDates().lastDateOfLastYear,
                        page_size: resultsPerPage,
                        ordering,
                    });
                    break;
                case FILTER_LINKS.ALL_TIME_TOP:
                    ordering = '-added';
                    calculatedApi = getGameListUrl({
                        page_size: 30,
                        ordering,
                    });
                    break;
                default:
                    break;
            }
        }

        return calculatedApi;
    };

    return {
        STORE_DOMAINS,
        FILTER_LINKS,
        createGenreLinkBasedOnGenreType,
        createPlatformLinkBasedOnPlatformType,
        getGenreFromUrl,
        getGameListUrl,
        storeByIdUrl,
        getApiBasedOnPageUrl,
        getOrder,
        getParentPlatformApi,
    };
};

export default apiHelper;
