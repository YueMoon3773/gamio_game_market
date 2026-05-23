import { format, subDays, startOfWeek, lastDayOfWeek, addDays, getYear } from 'date-fns';

const baseGameApiUrl = import.meta.env.VITE_API_GAMES_URL;
const gameApiUrlKey = import.meta.env.VITE_API_GAMES_URL_KEY;

const helperFunctions = () => {
    const svgPlatformsSelection = (platform) => {
        const ret = [];

        if (platform === null) return null;

        platform.forEach((item) => {
            if (item.platform.slug.includes('pc') && !ret.includes('pc')) {
                ret.push('pc');
            } else if (item.platform.slug.includes('xbox') && !ret.includes('xbox')) {
                ret.push('xbox');
            } else if (item.platform.slug.includes('3do') && !ret.includes('3do')) {
                ret.push('3do');
            } else if (
                (item.platform.slug.includes('playstation') || item.platform.slug.includes('ps')) &&
                !ret.includes('playstation')
            ) {
                ret.push('playstation');
            } else if (
                (item.platform.slug.includes('nintendo') ||
                    item.platform.slug.includes('wii') ||
                    item.platform.slug.includes('game-boy') ||
                    item.platform.slug.includes('snes') ||
                    item.platform.slug.includes('nes') ||
                    item.platform.slug.includes('gamecube')) &&
                !ret.includes('nintendo')
            ) {
                ret.push('nintendo');
            } else if (
                (item.platform.slug.includes('sega') ||
                    item.platform.slug.includes('genesis') ||
                    item.platform.slug.includes('dreamcast') ||
                    item.platform.slug.includes('game-gear')) &&
                !ret.includes('sega')
            ) {
                ret.push('sega');
            } else if (item.platform.slug.includes('ios') && !ret.includes('ios')) {
                ret.push('ios');
            } else if (item.platform.slug.includes('android') && !ret.includes('android')) {
                ret.push('android');
            } else if (
                (item.platform.slug.includes('macos') ||
                    item.platform.slug.includes('macintosh') ||
                    item.platform.slug.includes('mac') ||
                    item.platform.slug.includes('apple')) &&
                !ret.includes('macos')
            ) {
                ret.push('macos');
            } else if (item.platform.slug.includes('linux') && !ret.includes('linux')) {
                ret.push('linux');
            } else if (item.platform.slug.includes('amiga') && !ret.includes('amiga')) {
                ret.push('amiga');
            } else if (item.platform.slug.includes('web') && !ret.includes('web')) {
                ret.push('web');
            } else if (
                (item.platform.slug.includes('atari') || item.platform.slug.includes('jaguar')) &&
                !ret.includes('atari')
            ) {
                ret.push('atari');
            }
        });

        return ret;
    };

    const samplePlatformIds = [
        {
            id: 1,
            name: 'PC',
            slug: 'pc',
        },
        {
            id: 2,
            name: 'PlayStation',
            slug: 'playstation',
        },
        {
            id: 3,
            name: 'Xbox',
            slug: 'xbox',
        },
        {
            id: 4,
            name: 'iOS',
            slug: 'ios',
        },
        {
            id: 8,
            name: 'Android',
            slug: 'android',
        },
        {
            id: 5,
            name: 'Apple Macintosh',
            slug: 'mac',
        },
        {
            id: 6,
            name: 'Linux',
            slug: 'linux',
        },
        {
            id: 7,
            name: 'Nintendo',
            slug: 'nintendo',
        },
        {
            id: 9,
            name: 'Atari',
            slug: 'atari',
        },
        {
            id: 10,
            name: 'Commodore / Amiga',
            slug: 'commodore-amiga',
        },
        {
            id: 11,
            name: 'SEGA',
            slug: 'sega',
        },
        {
            id: 12,
            name: '3DO',
            slug: '3do',
        },
        {
            id: 13,
            name: 'Neo Geo',
            slug: 'neo-geo',
        },
        {
            id: 14,
            name: 'Web',
            slug: 'web',
        },
    ];

    const getSpecificPlatformId = (platformList, pageUrl) => {
        let ret = platformList.find((item, index) => pageUrl.includes(item.slug));

        if (ret === undefined) {
            ret = samplePlatformIds.find((item, index) => pageUrl.includes(item.slug));
        }
        
        return ret.id;
    };

    const getLast30Days = () => {
        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const getLast30Days = format(subDays(currentDate, 30), 'yyyy-MM-dd');
        // console.log({ currentDate, getLast30Days });

        return { currentDate, getLast30Days };
        // return getLast30Days + ',' + currentDate;
    };

    const getThisWeekDates = () => {
        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const startDateOfThisWeek = format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');
        const lastDateOfThisWeek = format(lastDayOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');
        return { startDateOfThisWeek, lastDateOfThisWeek };
    };

    const getNextWeekDates = () => {
        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const lastDateOfThisWeek = format(lastDayOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');
        const startDateOfNextWeek = format(addDays(lastDateOfThisWeek, 1), 'yyyy-MM-dd');
        const lastDateOfNextWeek = format(lastDayOfWeek(startDateOfNextWeek, { weekStartsOn: 1 }), 'yyyy-MM-dd');

        return { startDateOfNextWeek, lastDateOfNextWeek };
    };

    const getThisYearBeginAndCurrentDates = () => {
        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const thisYear = getYear(currentDate);
        const startDateOfThisYear = `${thisYear}-01-01`;

        return { startDateOfThisYear, currentDate };
    };

    const getThisYearAndLastYear = () => {
        const thisYear = getYear(new Date());
        const lastYear = thisYear - 1;

        return { lastYear, thisYear };
    };

    const getLastYearStartAndLastDates = () => {
        const lastYear = getYear(new Date()) - 1;
        const startDateOfLastYear = `${lastYear}-01-01`;
        const lastDateOfLastYear = `${lastYear}-12-31`;

        return { startDateOfLastYear, lastDateOfLastYear };
    };

    return {
        svgPlatformsSelection,
        getSpecificPlatformId,
        getLast30Days,
        getThisWeekDates,
        getNextWeekDates,
        getThisYearBeginAndCurrentDates,
        getThisYearAndLastYear,
        getLastYearStartAndLastDates,
    };
};

export default helperFunctions;
