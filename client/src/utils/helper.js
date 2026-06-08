import { format, subDays, startOfWeek, lastDayOfWeek, addDays, getYear, differenceInDays } from 'date-fns';

const helperFunctions = () => {
    const platformListBasedOnDevices = (platform) => {
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

    const calculateGamePrice = (releaseDate, gameId) => {
        const basePrice = 60;
        if (!releaseDate) return Number(basePrice.toFixed(2));

        const minPrice = 5;
        const daysInYear = 365;
        const currentDate = new Date();

        // set "random number" based on game id
        const seedRandomNumber = (max) => gameId % max;

        const releaseYear = getYear(releaseDate);
        const currentYear = getYear(currentDate);
        const yearDifferences = currentYear - releaseYear;
        const daysFromReleaseToNow = differenceInDays(currentDate, releaseDate);

        const discountPerYear = 0.26;
        let randomNumber = 0;
        let discount = 0;

        if (0 === yearDifferences) {
            randomNumber = seedRandomNumber(6);
            if (0 < daysFromReleaseToNow) {
                discount =
                    discountPerYear * randomNumber > 0.9
                        ? discountPerYear * randomNumber
                        : discountPerYear * randomNumber + 0.36 * randomNumber;
            }
        } else if (1 <= yearDifferences && 2 >= yearDifferences) {
            if (daysFromReleaseToNow / daysInYear <= 1.5) randomNumber = seedRandomNumber(8);
            else randomNumber = seedRandomNumber(10);
            discount = discountPerYear * randomNumber * 0.3 + randomNumber;
        } else if (2 < yearDifferences && 4 >= yearDifferences) {
            randomNumber = seedRandomNumber(20);
            discount = discountPerYear * randomNumber * 0.6 + randomNumber;
        } else if (4 < yearDifferences && 8 >= yearDifferences) {
            randomNumber = seedRandomNumber(36);
            discount = discountPerYear * randomNumber * 0.8 + randomNumber;
        } else {
            randomNumber = seedRandomNumber(60);
            discount = discountPerYear * randomNumber * 0.96 + randomNumber;
        }

        const newPrice = basePrice * ((100 - discount) / 100);
        return newPrice < minPrice ? Number(minPrice.toFixed(2)) : Number(newPrice.toFixed(2));
    };

    function randomHex() {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 40) + 60; // 60–90%
        const l = Math.floor(Math.random() * 40) + 30; // 30–70%

        const hslToHex = (h, s, l) => {
            s /= 100;
            l /= 100;
            const a = s * Math.min(l, 1 - l);
            const f = (n) => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color)
                    .toString(16)
                    .padStart(2, '0');
            };
            return `#${f(0)}${f(8)}${f(4)}`;
        };

        return hslToHex(h, s, l);
    }

    return {
        platformListBasedOnDevices,
        getSpecificPlatformId,
        getLast30Days,
        getThisWeekDates,
        getNextWeekDates,
        getThisYearBeginAndCurrentDates,
        getThisYearAndLastYear,
        getLastYearStartAndLastDates,
        calculateGamePrice,
        randomHex,
    };
};

export default helperFunctions;
