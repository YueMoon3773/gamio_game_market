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
        xbox360: 'https://www.xbox.com',
        nintendo: 'https://www.nintendo.com',
        'epic-games': 'https://www.epicgames.com',
        gog: 'https://www.gog.com',
        'apple-appstore': 'https://apps.apple.com',
        'google-play': 'https://play.google.com',
    };

    const FILTER_LINKS = {
        LAST_30_DAYS: { displayName: 'Last 30 days', value: '/games/last-30-days' },
        THIS_WEEK: { displayName: 'This week', value: '/games/this-week' },
        NEXT_WEEK: { displayName: 'Next week', value: '/games/next-week' },
        BEST_OF_THIS_YEAR: { displayName: 'Best of this year', value: '/games/best-of-year' },
        POPULAR_LAST_YEAR: {
            displayName: `Popular in ${helper.getThisYearAndLastYear().lastYear}`,
            value: '/games/popular-last-year',
        },
        ALL_TIME_TOP: { displayName: 'All time top', value: '/games/all-time-top' },
        PC_PLATFORM: { displayName: 'PC', value: '/games/pc-platform' },
        PLAYSTATION_PLATFORM: { displayName: 'PlayStation', value: '/games/playstation-platform' },
        XBOX_PLATFORM: { displayName: 'Xbox', value: '/games/xbox-platform' },
        ANDROID_PLATFORM: { displayName: 'Android', value: '/games/android-platform' },
        IOS_PLATFORM: { displayName: 'iOS', value: '/games/ios-platform' },
        NINTENDO_PLATFORM: { displayName: 'Nintendo', value: '/games/nintendo-platform' },
        ACTION_GENRE: { displayName: 'Action', value: '/games/action-genre' },
        STRATEGY_GENRE: { displayName: 'Strategy', value: '/games/strategy-genre' },
        RPG_GENRE: { displayName: 'RPG', value: '/games/rpg-genre' },
        SHOOTER_GENRE: { displayName: 'Shooter', value: '/games/shooter-genre' },
        ADVENTURE_GENRE: { displayName: 'Adventure', value: '/games/adventure-genre' },
        PUZZLE_GENRE: { displayName: 'Puzzle', value: '/games/puzzle-genre' },
        RACING_GENRE: { displayName: 'Racing', value: '/games/racing-genre' },
        SPORT_GENRE: { displayName: 'Sports', value: '/games/sports-genre' },
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
            case 'nameIncrease':
                return 'name';
            case 'nameDecrease':
                return '-name';
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
                genres: getGenreFromUrl(pageTargetUrl),
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
                case FILTER_LINKS.LAST_30_DAYS.value:
                    calculatedApi = getGameListUrl({
                        dates: helper.getLast30Days().getLast30Days + ',' + helper.getLast30Days().currentDate,
                        page_size: resultsPerPage,
                        ordering,
                    });
                    break;
                case FILTER_LINKS.THIS_WEEK.value:
                    calculatedApi = getGameListUrl({
                        dates:
                            helper.getThisWeekDates().startDateOfThisWeek +
                            ',' +
                            helper.getThisWeekDates().lastDateOfThisWeek,
                        page_size: resultsPerPage,
                        ordering,
                    });
                    break;
                case FILTER_LINKS.NEXT_WEEK.value:
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
                case FILTER_LINKS.BEST_OF_THIS_YEAR.value:
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
                case FILTER_LINKS.POPULAR_LAST_YEAR.value:
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
                case FILTER_LINKS.ALL_TIME_TOP.value:
                    ordering = '-added';
                    calculatedApi = getGameListUrl({
                        page_size: 60,
                        ordering,
                    });
                    break;
                default:
                    break;
            }
        }

        return calculatedApi;
    };

    const getGameDetailsUrl = (gameId) => {
        return `${baseGameApiUrl}/games/${gameId}?key=${gameApiUrlKey}`;
    };

    const getGameMediaListUrl = (gameId) => {
        return `${baseGameApiUrl}/games/${gameId}/screenshots?key=${gameApiUrlKey}`;
    };

    const searchApiBasedOnGameName = (gameName) => {
        const gameNameEncoded = encodeURIComponent(gameName);
        return `${baseGameApiUrl}/games?search=${gameNameEncoded}&key=${gameApiUrlKey}`;
    };

    const searchSuggestionApiBasedOnGameName = (gameName) => {
        const gameNameEncoded = encodeURIComponent(gameName);
        return `${baseGameApiUrl}/games?search=${gameNameEncoded}&page_size=3&key=${gameApiUrlKey}`;
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
        getGameDetailsUrl,
        getGameMediaListUrl,
        searchApiBasedOnGameName,
        searchSuggestionApiBasedOnGameName,
    };
};

export default apiHelper;
