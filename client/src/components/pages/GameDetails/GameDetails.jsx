import { useState, useEffect } from 'react';
import { useLocation, Link, Navigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

import { useFetchGetData } from '../../../hooks/useFetchData';
import { useGameHelper } from '../../../hooks/useGamesHelper';
import { useAuthenticate } from '../../../hooks/useAuthenticate';
import { useInfoBadge } from '../../../hooks/useInfoBadge';
import ValidatedComponent from '../../../utils/validateComponentProps';

import {
    BackBtnIcon,
    BackBtnHoverIcon,
    PrevImgInMediaLibraryIcon,
    PrevImgInMediaLibraryHoverIcon,
    NextImgInMediaLibraryIcon,
    NextImgInMediaLibraryHoverIcon,
    StarIcon,
    ExpandInfoBtnIcon,
} from '../../../assets/svgIcons';
import NoImgAvailable from '../../../assets/img/prj/no_image_found.png';
import helperFunctions from '../../../utils/helper';
import gameApiHelper from '../../../utils/gameApiHelper';

import PageLayout from '../../layout/PageLayout/PageLayout';
import FavGameBtn from '../../base/FavGameBtn/FavGameBtn';

import pageBaseStyles from '../../../styles/modules/basePageStyles.module.scss';
import './GameDetails.scss';

import gameDetailsData from '../../../../details.json';
const gameDetailsError = null;
const gameDetailsLoading = false;

import gameDetailsImgData from '../../../../details_img.json';
const gameDetailsImgError = null;
const gameDetailsImgLoading = false;

const gameDetailsSchema = z.object({});

const helper = helperFunctions();
const api = gameApiHelper();

const GameDetails = () => {
    const location = useLocation();

    const { gameId } = useParams();
    if (!gameId) return <Navigate to="/error"></Navigate>;

    const locationStates = location.state;

    const [navigatePrevPageBtnHover, setNavigatePrevPageBtnHover] = useState(false);

    const [carouselBtnLeftBtnHover, setCarouselBtnLeftBtnHover] = useState(false);
    const [carouselBtnRightBtnHover, setCarouselBtnRightBtnHover] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [imgList, setImgList] = useState(null);
    const [isShowMoreInfoExpanded, setIsShowMoreInfoExpanded] = useState(false);

    const [isInCart, setIsInCart] = useState(false);
    const [isGameFav, setIsGameFav] = useState(false);

    const { badgeTypeList, changeBadgeTypeAndMessageThenShowBadge } = useInfoBadge();

    const { user: userAuthenData, loading: userAuthenLoading } = useAuthenticate();

    // const {
    //     data: gameDetailsData,
    //     error: gameDetailsError,
    //     loading: gameDetailsLoading,
    // } = useFetchGetData(api.getGameDetailsUrl(gameId));

    // const {
    //     data: gameDetailsImgData,
    //     error: gameDetailsImgError,
    //     loading: gameDetailsImgLoading,
    // } = useFetchGetData(api.getGameMediaListUrl(gameId));

    const {
        gameIdInCartList,
        addGameToUserCart,
        removeGameFromUserCart,
        getAllGameIdsInUserCart,
        userFavGameIdList,
        getAllUserFavGameIds,
        addUserFavGame,
        removeUserFavGame,
    } = useGameHelper();

    const releaseDate = !gameDetailsData ? null : format(gameDetailsData.released, 'MMM d, yyyy');

    // LOGGING
    // console.log({ gameDetailsData, gameDetailsError, gameDetailsLoading });
    // console.log({ gameDetailsImgData, gameDetailsImgError, gameDetailsImgLoading });

    // console.log({ locationStates });
    // console.log({ gameId });
    // console.log({ imgList });
    // console.log({ currentImgIndex });
    // console.log({ isGameFav });
    // console.log({ userFavGameIdList });

    // set-up game media list
    useEffect(() => {
        if (gameDetailsImgData !== null) {
            setImgList(gameDetailsImgData.results);
        } else {
            if (locationStates !== null) {
                setImgList(locationStates.gameMediaLibrary);
            }
        }
    }, [gameDetailsData, gameDetailsImgData, locationStates]);

    // get all games in user cart and their fav games after render + when user info change
    useEffect(() => {
        if (userAuthenData !== null) {
            getAllGameIdsInUserCart(userAuthenData.id);
            getAllUserFavGameIds(userAuthenData.id);
        }
    }, []);
    useEffect(() => {
        if (userAuthenData !== null) {
            getAllGameIdsInUserCart(userAuthenData.id);
            getAllUserFavGameIds(userAuthenData.id);
        }
    }, [userAuthenData]);

    // get is in cart
    useEffect(() => {
        if (gameDetailsData !== null) {
            if (gameIdInCartList && gameIdInCartList.includes(Number(gameId))) {
                setIsInCart(true);
            } else setIsInCart(false);
        }
    }, [gameDetailsData, gameIdInCartList, gameId]);

    // get is user's fav game
    useEffect(() => {
        if (gameDetailsData !== null) {
            if (userFavGameIdList && userFavGameIdList.includes(Number(gameId))) {
                setIsGameFav(true);
            } else setIsGameFav(false);
        }
    }, [gameDetailsData, userFavGameIdList, gameId]);

    const previousCarouselImgClickHandle = () => {
        if (!imgList) return;
        else setCurrentImgIndex(currentImgIndex === 0 ? imgList.length - 1 : currentImgIndex - 1);
    };

    const nextCarouselImgClickHandle = () => {
        if (!imgList) return;
        else setCurrentImgIndex((currentImgIndex + 1) % imgList.length);
    };

    // auto switch game image in the media list
    useEffect(() => {
        const changeImgTimer = setTimeout(() => {
            if (!imgList) return;
            else nextCarouselImgClickHandle();
        }, 3600);

        return () => clearTimeout(changeImgTimer);
    }, [currentImgIndex, imgList]);

    const favGameBtnOnClickHandle = async () => {
        setIsGameFav((prev) => !prev);

        if (userAuthenLoading === false && userAuthenData === null) {
            changeBadgeTypeAndMessageThenShowBadge(badgeTypeList.warning.value, 'Log in to proceed this action.');
        } else if (userAuthenLoading === true && userAuthenData === null) {
            changeBadgeTypeAndMessageThenShowBadge(
                badgeTypeList.warning.value,
                'Checking your credential. Please try again later.',
            );
        } else if (userAuthenData !== null) {
            let res;

            if (!isGameFav) res = await addUserFavGame(userAuthenData.id, Number(gameId));
            else res = await removeUserFavGame(userAuthenData.id, Number(gameId));

            // console.log({ res });

            if (res.ok === true) {
                getAllUserFavGameIds(userAuthenData.id);
                changeBadgeTypeAndMessageThenShowBadge(badgeTypeList.info.value, res.msg);
            }
        }
    };

    const addGameToUserCartBtnHandler = async (isGameInCart, gameId, gameName, gameImg, gamePrice) => {
        if (userAuthenLoading === false && userAuthenData === null) {
            changeBadgeTypeAndMessageThenShowBadge(badgeTypeList.warning.value, 'Log in to proceed this action.');
        } else if (userAuthenLoading === true && userAuthenData === null) {
            changeBadgeTypeAndMessageThenShowBadge(
                badgeTypeList.warning.value,
                'Checking your credential. Please try again later.',
            );
        } else if (userAuthenData !== null) {
            // console.log({ gameId, gameName, gameImg, gamePrice });
            let res;
            if (!isGameInCart) {
                res = await addGameToUserCart(userAuthenData.id, gameId, gameName, gameImg, gamePrice);
            } else {
                res = await removeGameFromUserCart(userAuthenData.id, gameId);
            }

            // console.log(res);

            if (res.ok === true) {
                getAllGameIdsInUserCart(userAuthenData.id);
                changeBadgeTypeAndMessageThenShowBadge(badgeTypeList.info.value, res.msg);
            }
        }
    };

    if (gameDetailsError !== null) {
        return <Navigate to="/error"></Navigate>;
    } else {
        return (
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.66, ease: 'easeInOut' }}
            >
                <PageLayout pageType={'normalPage'}>
                    <div className="gameDetailsWrapper">
                        <div className="detailsTopWrapper">
                            <Link
                                to={locationStates !== null ? locationStates.fromUrl : '/'}
                                className="navigatePrevPage"
                                onMouseEnter={() => setNavigatePrevPageBtnHover(true)}
                                onMouseLeave={() => setNavigatePrevPageBtnHover(false)}
                            >
                                {navigatePrevPageBtnHover ? (
                                    <BackBtnHoverIcon></BackBtnHoverIcon>
                                ) : (
                                    <BackBtnIcon></BackBtnIcon>
                                )}
                                Go back
                            </Link>

                            <div className="gameDetailsTopRight">
                                {gameDetailsLoading === true && gameDetailsData === null ? (
                                    <div className={`${pageBaseStyles.skeletonLoading} detailsNameSkeleton`}></div>
                                ) : (
                                    <>
                                        <h1 className="detailsName">{gameDetailsData.name}</h1>
                                        <FavGameBtn
                                            gameBtnStyleClassName="gameDetailsFavBtn"
                                            isFavBtnActive={isGameFav}
                                            onClickHandler={favGameBtnOnClickHandle}
                                        ></FavGameBtn>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="detailsBottomWrapper">
                            <div className="detailsImgCarouselWrapper">
                                {gameDetailsImgLoading === true && gameDetailsImgData === null ? (
                                    <div className={`${pageBaseStyles.skeletonLoading} detailsCarouselSkeleton`}></div>
                                ) : (
                                    <>
                                        {imgList !== null && imgList.length > 0 ? (
                                            <div className="detailsImgCarousel">
                                                <button
                                                    className="carouselBtn carouselBtnLeft"
                                                    onMouseEnter={() => setCarouselBtnLeftBtnHover(true)}
                                                    onMouseLeave={() => setCarouselBtnLeftBtnHover(false)}
                                                    onClick={previousCarouselImgClickHandle}
                                                >
                                                    {carouselBtnLeftBtnHover ? (
                                                        <PrevImgInMediaLibraryHoverIcon></PrevImgInMediaLibraryHoverIcon>
                                                    ) : (
                                                        <PrevImgInMediaLibraryIcon></PrevImgInMediaLibraryIcon>
                                                    )}
                                                </button>

                                                <div className="detailsImgWrapper">
                                                    {imgList.map((item, index) => {
                                                        return (
                                                            <img
                                                                key={item.id + 'z' + index}
                                                                className={`gameDetailImg ${currentImgIndex === index ? 'show' : 'hidden'}`}
                                                                src={item.image}
                                                                alt="game image"
                                                            />
                                                        );
                                                    })}

                                                    <div className="thumbnailImgWrapper">
                                                        {imgList.map((item, index) => {
                                                            return (
                                                                <img
                                                                    key={item.id + 'z' + index}
                                                                    className={`gameImgThumbnail ${currentImgIndex === index ? 'active' : 'inactive'}`}
                                                                    src={item.image}
                                                                    alt="game image thumbnail"
                                                                    onClick={() => setCurrentImgIndex(index)}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                <button
                                                    className="carouselBtn carouselBtnRight"
                                                    onMouseEnter={() => setCarouselBtnRightBtnHover(true)}
                                                    onMouseLeave={() => setCarouselBtnRightBtnHover(false)}
                                                    onClick={nextCarouselImgClickHandle}
                                                >
                                                    {carouselBtnRightBtnHover ? (
                                                        <NextImgInMediaLibraryHoverIcon></NextImgInMediaLibraryHoverIcon>
                                                    ) : (
                                                        <NextImgInMediaLibraryIcon></NextImgInMediaLibraryIcon>
                                                    )}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="detailsImgCarousel">
                                                <img
                                                    className="gameDetailImg show noImg"
                                                    src={NoImgAvailable}
                                                    alt="game image"
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="detailsInfoWrapper">
                                {gameDetailsLoading === true && gameDetailsData === null ? (
                                    <div className={`${pageBaseStyles.skeletonLoading} detailsInfoSkeleton`}></div>
                                ) : (
                                    <div className="detailsInfoTopWrapper">
                                        <section className="infoSection top">
                                            <h4 className="sectionHeading">Description</h4>
                                            <div className="descriptionTextWrapper">
                                                <p className="descriptionText">{`${gameDetailsData.description_raw}`}</p>
                                            </div>
                                        </section>

                                        <section className="infoSection bottom">
                                            <ul
                                                className={`moreInfoList ${isShowMoreInfoExpanded ? 'expand' : 'hidden'}`}
                                            >
                                                <li className="moreInfoItem">
                                                    <span className="infoItemHeading">Release date:</span>
                                                    <div className="infoWrapper">
                                                        <span className="infoText">{releaseDate}</span>
                                                    </div>
                                                </li>

                                                <li className="moreInfoItem">
                                                    <span className="infoItemHeading">Rating:</span>
                                                    <div className="infoWrapper">
                                                        <span className="infoText">
                                                            {gameDetailsData.rating !== 0 ? (
                                                                <>
                                                                    <StarIcon></StarIcon>
                                                                    <span>{gameDetailsData.rating}</span>
                                                                </>
                                                            ) : (
                                                                'NA'
                                                            )}
                                                        </span>
                                                    </div>
                                                </li>

                                                <li className="moreInfoItem">
                                                    <span className="infoItemHeading">Genre(s):</span>
                                                    <div className="infoWrapper">
                                                        {gameDetailsData.genres !== null ? (
                                                            <>
                                                                {gameDetailsData.genres.map((genre, index) => {
                                                                    return (
                                                                        <p
                                                                            className="infoLinkWrapper"
                                                                            key={genre.id + 'z' + index}
                                                                        >
                                                                            <Link
                                                                                to={api.createGenreLinkBasedOnGenreType(
                                                                                    genre.name,
                                                                                )}
                                                                                key={genre.id + index}
                                                                            >
                                                                                {genre.name}
                                                                            </Link>
                                                                            {index === gameDetailsData.genres.length - 1
                                                                                ? ''
                                                                                : ', '}
                                                                        </p>
                                                                    );
                                                                })}
                                                            </>
                                                        ) : (
                                                            'NA'
                                                        )}
                                                    </div>
                                                </li>

                                                <li className="moreInfoItem">
                                                    <span className="infoItemHeading">Platform(s):</span>
                                                    <div className="infoWrapper">
                                                        {gameDetailsData.parent_platforms !== null ? (
                                                            <>
                                                                {gameDetailsData.parent_platforms.map(
                                                                    (platform, index) => {
                                                                        return (
                                                                            <p
                                                                                className="infoLinkWrapper"
                                                                                key={platform.platform.id + 'z' + index}
                                                                            >
                                                                                <Link
                                                                                    to={api.createPlatformLinkBasedOnPlatformType(
                                                                                        platform.platform.slug,
                                                                                    )}
                                                                                    key={platform.platform.id + index}
                                                                                >
                                                                                    {platform.platform.name}
                                                                                </Link>
                                                                                {index ===
                                                                                gameDetailsData.parent_platforms
                                                                                    .length -
                                                                                    1
                                                                                    ? ''
                                                                                    : ','}
                                                                            </p>
                                                                        );
                                                                    },
                                                                )}
                                                            </>
                                                        ) : (
                                                            'NA'
                                                        )}
                                                    </div>
                                                </li>

                                                <li className="moreInfoItem">
                                                    <span className="infoItemHeading">Store(s):</span>
                                                    <div className="infoWrapper">
                                                        {gameDetailsData.stores !== null ? (
                                                            <>
                                                                {gameDetailsData.stores.map((store, index) => {
                                                                    return (
                                                                        <p
                                                                            className="infoLinkWrapper"
                                                                            key={store.store.id + 'z' + index}
                                                                        >
                                                                            <Link
                                                                                to={
                                                                                    api.STORE_DOMAINS[
                                                                                        `${store.store.slug}`
                                                                                    ] === undefined
                                                                                        ? '/'
                                                                                        : api.STORE_DOMAINS[
                                                                                              `${store.store.slug}`
                                                                                          ]
                                                                                }
                                                                                key={store.store.id + index}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                {store.store.name}
                                                                            </Link>
                                                                            {index === gameDetailsData.stores.length - 1
                                                                                ? ''
                                                                                : ', '}
                                                                        </p>
                                                                    );
                                                                })}
                                                            </>
                                                        ) : (
                                                            'NA'
                                                        )}
                                                    </div>
                                                </li>

                                                <li className="moreInfoItem">
                                                    <span className="infoItemHeading">Developer(s):</span>
                                                    <div className="infoWrapper">
                                                        {gameDetailsData.developers !== null ? (
                                                            <>
                                                                {gameDetailsData.developers.map((developer, index) => {
                                                                    return (
                                                                        <p
                                                                            className="infoText"
                                                                            key={developer.id + 'z' + index}
                                                                        >
                                                                            <span>{developer.name}</span>
                                                                            {index ===
                                                                            gameDetailsData.developers.length - 1
                                                                                ? ''
                                                                                : ','}
                                                                        </p>
                                                                    );
                                                                })}
                                                            </>
                                                        ) : (
                                                            'NA'
                                                        )}
                                                    </div>
                                                </li>

                                                <li className="moreInfoItem">
                                                    <span className="infoItemHeading">Publisher(s):</span>
                                                    <div className="infoWrapper">
                                                        {gameDetailsData.publishers !== null ? (
                                                            <>
                                                                {gameDetailsData.publishers.map((publisher, index) => {
                                                                    return (
                                                                        <p
                                                                            className="infoText"
                                                                            key={publisher.id + 'z' + index}
                                                                        >
                                                                            <span>{publisher.name}</span>
                                                                            {index ===
                                                                            gameDetailsData.publishers.length - 1
                                                                                ? ''
                                                                                : ','}
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

                                            <button
                                                className="expandMoreInfoListBtn"
                                                onClick={() => setIsShowMoreInfoExpanded((prev) => !prev)}
                                            >
                                                Show
                                                {isShowMoreInfoExpanded ? ' less' : ' more'} info
                                                <ExpandInfoBtnIcon
                                                    iconClassName={isShowMoreInfoExpanded ? 'rotate' : ''}
                                                ></ExpandInfoBtnIcon>
                                            </button>
                                        </section>
                                    </div>
                                )}

                                {gameDetailsLoading !== true && gameDetailsData !== null && (
                                    <div className="detailsInfoBottomWrapper">
                                        <div className="detailsInfoPricesWrapper">
                                            <span className="newDetailsInfoPrice">
                                                {locationStates?.gameCurrentPrice
                                                    ? `$${locationStates.gameCurrentPrice.toFixed(2)}`
                                                    : '$60.00'}
                                            </span>
                                            <span className="oldDetailsInfoPrice">
                                                {locationStates?.gameOldPrice &&
                                                    `$${locationStates.gameOldPrice.toFixed(2)}`}
                                            </span>
                                        </div>

                                        <button
                                            className={`addToCartBtnDetailsInfo ${isInCart ? 'active' : ''}`}
                                            onClick={() => {
                                                const gameName = gameDetailsData.name ?? '';
                                                const gameImg = gameDetailsData.background_image ?? '';
                                                const gamePrice =
                                                    locationStates?.gameCurrentPrice.toFixed(2) ??
                                                    Number(60).toFixed(2);

                                                addGameToUserCartBtnHandler(
                                                    isInCart,
                                                    gameId,
                                                    gameName,
                                                    gameImg,
                                                    gamePrice,
                                                );
                                            }}
                                        >
                                            <span>{isInCart ? 'Remove game from cart' : 'Add to cart'}</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </PageLayout>
            </motion.div>
        );
    }
};

export default ValidatedComponent(GameDetails, gameDetailsSchema);
