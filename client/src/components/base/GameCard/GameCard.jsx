import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { format } from 'date-fns';

import {
    PcIcon,
    PlayStationIcon,
    XBoxIcon,
    NintendoIcon,
    AndroidIcon,
    IosIcon,
    MacOsIcon,
    LinuxIcon,
    AmigaIcon,
    AtariIcon,
    SegaIcon,
    ThreeDOIcon,
    WebPlatformIcon,
    YourFavGamesIcon,
    StarIcon,
} from '../../../assets/svgIcons';
import NoImgAvailable from '../../../assets/img/prj/no_image_found.png';
import helperFunctions from '../../../utils/helper';
import ValidatedComponent from '../../../utils/validateComponentProps';
import apiHelper from '../../../utils/apiHelper';

import FavGameBtn from '../FavGameBtn/FavGameBtn';

import pageBaseStyles from '../../../styles/modules/basePageStyles.module.scss';
import './GameCard.scss';

const gameCardSchema = z
    .object({
        currentUrlLocationOfGameCard: z.string().optional(),
        isGameCardLoading: z.boolean().optional(),
        gameCardId: z.number().nullable().optional(),
        gameCardSingleMediaDisplay: z.string().nullable().optional(),
        gameCardMediaLibrary: z.array(z.looseObject({})).nullable().optional(),
        gameCardPlatforms: z.array(z.looseObject({})).nullable().optional(),
        gameCardName: z.string().nullable().optional(),
        gameCardReleaseDate: z.string().nullable().optional(),
        gameCardGenres: z.array(z.looseObject({})).nullable().optional(),
        gameCardRating: z.number().nullable().optional(),
        gameCardRatingCount: z.number().nullable().optional(),
        gameCardStores: z.array(z.looseObject({})).nullable().optional(),
    })
    .refine(
        (props) => {
            if (
                props.isGameCardLoading === false &&
                (props.gameCardId === undefined ||
                    props.currentUrlLocationOfGameCard === undefined ||
                    props.gameCardSingleMediaDisplay === undefined ||
                    props.gameCardMediaLibrary === undefined ||
                    props.gameCardPlatforms === undefined ||
                    props.gameCardName === undefined ||
                    props.gameCardReleaseDate === undefined ||
                    props.gameCardGenres === undefined ||
                    props.gameCardRating === undefined ||
                    props.gameCardRatingCount === undefined ||
                    props.gameCardStores === undefined)
            ) {
                return false;
            } else return true;
        },
        {
            message:
                'currentUrlLocationOfGameCard, gameCardId, gameCardSingleMediaDisplay, gameCardMediaLibrary, gameCardPlatforms, gameCardPlatformsParents, gameCardName, gameCardReleaseDate, gameCardGenres,gameCardRating, gameCardRatingCount, gameCardStores must be provided in case isGameCardLoading === false',
        },
    );

const helper = helperFunctions();
const api = apiHelper();

const GameCard = ({
    currentUrlLocationOfGameCard,
    isGameCardLoading,
    gameCardId,
    gameCardSingleMediaDisplay,
    gameCardMediaLibrary,
    gameCardPlatforms,
    gameCardName,
    gameCardReleaseDate,
    gameCardGenres,
    gameCardRating,
    gameCardRatingCount,
    gameCardStores,
}) => {
    // const [isCardHover, setIsCardHover] = useState(true);
    const [isCardHover, setIsCardHover] = useState(false);
    const gameCardHoverTimer = useRef(null);
    const [imgHoverIndex, setImgHoverIndex] = useState(0);
    const [isGameFav, setIsGameFav] = useState(false);

    const platformIcons = !gameCardPlatforms ? null : helper.svgPlatformsSelection(gameCardPlatforms);
    const releaseDate = !gameCardReleaseDate ? null : format(gameCardReleaseDate, 'MMM d, yyyy');
    const gameCurrentPrice = !gameCardReleaseDate ? '$60.00' : '$60.00';
    const gameOldPrice = !gameCardReleaseDate ? null : '$60.00';

    // console.log({ gameCardName });
    // console.log({ platformIcons });
    // console.log({ gameCardPlatforms });
    // console.log({ releaseDate });
    // console.log({ gameCardMediaLibrary });
    // console.log({ gameCardSingleMediaDisplay });
    // console.log({ gameCardGenres });

    const favGameBtnOnClickHandle = () => {
        setIsGameFav((prev) => !prev);
    };

    return (
        <div
            className={`gameCardWrapper ${isCardHover ? 'cardHovering' : ''}`}
            onMouseEnter={() => {
                if (isGameCardLoading) return;
                else {
                    gameCardHoverTimer.current = setTimeout(() => {
                        setIsCardHover(true);
                    }, 360);
                }
            }}
            onMouseLeave={() => {
                if (isGameCardLoading) return;
                else {
                    clearTimeout(gameCardHoverTimer.current);
                    setIsCardHover(false);
                }
            }}
        >
            <div className={`gameCard ${isCardHover ? 'cardHovering' : ''}`}>
                <div className="gameCardMedia">
                    <div className={`cardMediaWrapper ${gameCardSingleMediaDisplay !== null ? 'mediaDisplayed' : ''}`}>
                        {isCardHover ? (
                            <div className="cardMediaLibrary">
                                {gameCardSingleMediaDisplay !== null &&
                                    gameCardMediaLibrary !== null &&
                                    gameCardMediaLibrary.length > 0 && (
                                        <>
                                            <img
                                                src={gameCardMediaLibrary[imgHoverIndex].image}
                                                alt="game image"
                                                onError={(e) => {
                                                    e.target.src = NoImgAvailable;
                                                }}
                                            />
                                            <div className="imgNavigatorWrapper">
                                                {gameCardMediaLibrary.map((item, index) => {
                                                    return (
                                                        <div className="navigatorWrapper" key={index + 'z'}>
                                                            <div
                                                                className={`imgNavigator ${imgHoverIndex === index ? 'active' : ''}`}
                                                                onMouseEnter={() => setImgHoverIndex(index)}
                                                            ></div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                            </div>
                        ) : (
                            <>
                                {isGameCardLoading && (
                                    <div className={`${pageBaseStyles.skeletonLoading} imageSkeleton`}></div>
                                )}
                                {!isGameCardLoading && gameCardSingleMediaDisplay !== null && (
                                    <img
                                        src={gameCardSingleMediaDisplay}
                                        alt="game image"
                                        onError={(e) => {
                                            e.target.src = NoImgAvailable;
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="gameCardInfo">
                    <div className="platformsWrapper">
                        {isGameCardLoading && (
                            <div className={`${pageBaseStyles.skeletonLoading} platformSkeleton`}></div>
                        )}
                        {!isGameCardLoading && platformIcons !== null && (
                            <>
                                {platformIcons.map((icon, index) => {
                                    if (icon === 'pc') return <PcIcon key={index + icon}></PcIcon>;
                                    else if (icon === 'xbox') return <XBoxIcon key={index + icon}></XBoxIcon>;
                                    else if (icon === 'playstation')
                                        return <PlayStationIcon key={index + icon}></PlayStationIcon>;
                                    else if (icon === 'nintendo')
                                        return <NintendoIcon key={index + icon}></NintendoIcon>;
                                    else if (icon === 'sega') return <SegaIcon key={index + icon}></SegaIcon>;
                                    else if (icon === 'ios') return <IosIcon key={index + icon}></IosIcon>;
                                    else if (icon === 'android') return <AndroidIcon key={index + icon}></AndroidIcon>;
                                    else if (icon === 'macos') return <MacOsIcon key={index + icon}></MacOsIcon>;
                                    else if (icon === 'linux') return <LinuxIcon key={index + icon}></LinuxIcon>;
                                    else if (icon === 'amiga') return <AmigaIcon key={index + icon}></AmigaIcon>;
                                    else if (icon === '3do') return <ThreeDOIcon key={index + icon}></ThreeDOIcon>;
                                    else if (icon === 'web')
                                        return <WebPlatformIcon key={index + icon}></WebPlatformIcon>;
                                    else if (icon === 'atari') return <AtariIcon key={index + icon}></AtariIcon>;
                                })}
                            </>
                        )}
                    </div>
                    {isGameCardLoading && (gameCardName === null || gameCardName === undefined) && (
                        <div className={`${pageBaseStyles.skeletonLoading} gameNameSkeleton`}></div>
                    )}
                    {!isGameCardLoading && (gameCardName !== null || gameCardName !== undefined) && (
                        <Link
                            className="gameName"
                            to="/game-detail"
                            state={{ gameMediaLibrary: gameCardMediaLibrary, fromUrl: currentUrlLocationOfGameCard }}
                        >
                            {gameCardName}
                        </Link>
                    )}
                    <div className="gamePricesAndLike">
                        <div className="pricesWrapper">
                            {isGameCardLoading ? (
                                <div className={`${pageBaseStyles.skeletonLoading} gamePriceSkeleton`}></div>
                            ) : (
                                <span className="discountPrice">{gameCurrentPrice}</span>
                            )}
                            {gameOldPrice && <span className="oldPrice">{gameOldPrice}</span>}
                        </div>

                        {isCardHover && (
                            <FavGameBtn
                                gameBtnStyleClassName="gameDetailsFavBtn"
                                isFavBtnActive={isGameFav}
                                onClickHandler={favGameBtnOnClickHandle}
                            ></FavGameBtn>
                        )}
                    </div>
                </div>

                {!isGameCardLoading && isCardHover && (
                    <div className="gameCardExtraInfo">
                        <ul className="gameDetailInfoWrapper">
                            <li className="detailInfoItem">
                                <p className="detailInfoTitle">Release date:</p>
                                <div className="detailInfoWrapper">
                                    <span className="detailInfoText">{releaseDate ? releaseDate : 'NA'}</span>
                                </div>
                            </li>
                            <li className="detailInfoItem">
                                <p className="detailInfoTitle">Genres:</p>
                                <div className="detailInfoWrapper">
                                    {gameCardGenres !== null && gameCardGenres.length !== 0 ? (
                                        <>
                                            {gameCardGenres.map((genre, index) => {
                                                return (
                                                    <p className="gameInfoLinkWrapper" key={genre.id + 'z' + index}>
                                                        <Link
                                                            to={api.createGenreLinkBasedOnGenreType(genre.name)}
                                                            key={genre.id + 'z' + index}
                                                        >
                                                            {genre.name}
                                                        </Link>
                                                        {index === gameCardGenres.length - 1 ? '' : ', '}
                                                    </p>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        'NA'
                                    )}
                                </div>
                            </li>
                            <li className="detailInfoItem">
                                <p className="detailInfoTitle">Rating:</p>
                                <div className="detailInfoWrapper">
                                    <span className="detailInfoText">
                                        <StarIcon></StarIcon>
                                        {gameCardRating !== 0 &&
                                        gameCardRating !== null &&
                                        gameCardRatingCount !== 0 &&
                                        gameCardRatingCount !== null
                                            ? gameCardRating + ' (' + gameCardRatingCount + ')'
                                            : gameCardRating !== 0 &&
                                                gameCardRating !== null &&
                                                (gameCardRatingCount === 0 || gameCardRatingCount === null)
                                              ? gameCardRating
                                              : 'NA'}
                                    </span>
                                </div>
                            </li>
                            <li className="detailInfoItem">
                                <p className="detailInfoTitle">Stores:</p>
                                <div className="detailInfoWrapper">
                                    {gameCardStores !== null ? (
                                        <>
                                            {gameCardStores.map((store, index) => {
                                                return (
                                                    <p
                                                        className="gameInfoLinkWrapper"
                                                        key={store.store.id + 'z' + index}
                                                    >
                                                        <Link
                                                            to={
                                                                api.STORE_DOMAINS[`${store.store.slug}`] === undefined
                                                                    ? '/'
                                                                    : api.STORE_DOMAINS[`${store.store.slug}`]
                                                            }
                                                            key={store.store.id + 'z' + index}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {store.store.name}
                                                        </Link>
                                                        {index === gameCardStores.length - 1 ? '' : ', '}
                                                    </p>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        'NA'
                                    )}
                                </div>
                            </li>
                        </ul>

                        <button className="addToCartBtn">
                            <span>Add to cart</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ValidatedComponent(GameCard, gameCardSchema);
