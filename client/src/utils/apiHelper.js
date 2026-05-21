import { z } from 'zod';

const baseGameApiUrl = import.meta.env.VITE_API_GAMES_URL;
const gameApiUrlKey = import.meta.env.VITE_API_GAMES_URL_KEY;

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
        SPORT_GENRE: '/games/sport-genre',
    };

    const getGenreFromUrl = (pageUrl) => {
        if (!pageUrl || !pageUrl.includes('genre')) return null;
        // console.log(pageUrl.split('-')[0].split('/'));

        return pageUrl.split('-')[0].split('/')[2] ? pageUrl.split('-')[0].split('/')[2] : 'role-playing-games-rpg';
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

    const getApi = (endPoint, params) => {
        const paramsToUrl = new URLSearchParams(params).toString();

        return `${baseGameApiUrl}/${endPoint}?${paramsToUrl}&key=${gameApiUrlKey}`;
    };

    const getGameListUrl = (params) => {
        return getApi('games', params);
    };

    const storeByIdUrl = (storeId) => {
        return `${baseGameApiUrl}/stores/${storeId}?key=${gameApiUrlKey}`;
    };

    return {
        STORE_DOMAINS,
        FILTER_LINKS,
        getGenreFromUrl,
        getGameListUrl,
        storeByIdUrl,
        getApi,
        getOrder,
    };
};

export default apiHelper;
