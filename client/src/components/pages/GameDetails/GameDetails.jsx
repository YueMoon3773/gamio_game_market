import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { z } from 'zod';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

import { useFetchGetData } from '../../../hooks/useFetchData';

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
import ValidatedComponent from '../../../utils/validateComponentProps';
import NoImgAvailable from '../../../assets/img/prj/no_image_found.png';
import apiHelper from '../../../utils/apiHelper';

import PageLayout from '../../layout/PageLayout/PageLayout';

import pageBaseStyles from '../../../styles/modules/basePageStyles.module.scss';
import './GameDetails.scss';

const gameDetailsSchema = z.object({});

import gameDetailsData from '../../../../details.json';
import gameDetailsImgData from '../../../../details_img.json';
const api = apiHelper();

const GameDetails = () => {
    // const gameDetailsImgData = null;
    const location = useLocation();
    const locationStates = location.state;

    const [navigatePrevPageBtnHover, setNavigatePrevPageBtnHover] = useState(false);

    const [carouselBtnLeftBtnHover, setCarouselBtnLeftBtnHover] = useState(false);
    const [carouselBtnRightBtnHover, setCarouselBtnRightBtnHover] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [imgList, setImgList] = useState(null);
    const [isShowMoreInfoExpanded, setIsShowMoreInfoExpanded] = useState(false);

    const [isInCart, setIsInCart] = useState(false);

    const releaseDate = !gameDetailsData ? null : format(gameDetailsData.released, 'MMM d, yyyy');

    // console.log({ locationStates });
    // console.log({ imgList });
    // console.log({ currentImgIndex });

    useEffect(() => {
        if (gameDetailsImgData !== null) {
            setImgList(gameDetailsImgData.results);
        } else {
            if (locationStates !== null) {
                setImgList(locationStates.gameMediaLibrary);
            }
        }
    }, [gameDetailsData, gameDetailsImgData]);

    const previousCarouselImgClickHandle = () => {
        if (!imgList) return;
        else setCurrentImgIndex(currentImgIndex === 0 ? imgList.length - 1 : currentImgIndex - 1);
    };

    const nextCarouselImgClickHandle = () => {
        if (!imgList) return;
        else setCurrentImgIndex((currentImgIndex + 1) % imgList.length);
    };

    const addToCardBtnHandler = () => {
        setIsInCart((prev) => !prev);
    };

    useEffect(() => {
        const changeImgTimer = setTimeout(() => {
            if (!imgList) return;
            else nextCarouselImgClickHandle();
        }, 3600);

        return () => clearTimeout(changeImgTimer);
    }, [currentImgIndex, imgList]);

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
                        <h1 className="detailsName">{gameDetailsData.name}</h1>
                    </div>

                    <div className="detailsBottomWrapper">
                        <div className="detailsImgCarouselWrapper">
                            {imgList !== null ? (
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
                                                    key={item.id + index}
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
                                                        key={item.id + index}
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
                                    <img className="gameDetailImg show noImg" src={NoImgAvailable} alt="game image" />
                                </div>
                            )}
                        </div>

                        <div className="detailsInfoWrapper">
                            <div className="detailsInfoTopWrapper">
                                <section className="infoSection top">
                                    <h4 className="sectionHeading">Description</h4>
                                    <p className="descriptionText">{gameDetailsData.description_raw}</p>
                                </section>

                                <section className="infoSection bottom">
                                    <ul className={`moreInfoList ${isShowMoreInfoExpanded ? 'expand' : 'hidden'}`}>
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
                                                                <p className="infoLinkWrapper" key={genre.id + index}>
                                                                    <Link to={`/`} key={genre.id + index}>
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
                                                        {gameDetailsData.parent_platforms.map((platform, index) => {
                                                            return (
                                                                <p
                                                                    className="infoLinkWrapper"
                                                                    key={platform.platform.id + index}
                                                                >
                                                                    <Link
                                                                        to="/"
                                                                        key={platform.platform.id + index}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {platform.platform.name}
                                                                    </Link>
                                                                    {index ===
                                                                    gameDetailsData.parent_platforms.length - 1
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
                                            <span className="infoItemHeading">Store(s):</span>
                                            <div className="infoWrapper">
                                                {gameDetailsData.stores !== null ? (
                                                    <>
                                                        {gameDetailsData.stores.map((store, index) => {
                                                            return (
                                                                <p
                                                                    className="infoLinkWrapper"
                                                                    key={store.store.id + index}
                                                                >
                                                                    <Link
                                                                        to={
                                                                            api.STORE_DOMAINS[`${store.store.slug}`] ===
                                                                            undefined
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
                                                                <p className="infoText" key={developer.id + index}>
                                                                    <span>{developer.name}</span>
                                                                    {index === gameDetailsData.developers.length - 1
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
                                                                <p className="infoText" key={publisher.id + index}>
                                                                    <span>{publisher.name}</span>
                                                                    {index === gameDetailsData.publishers.length - 1
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

                            <div className="detailsInfoBottomWrapper">
                                <div className="detailsInfoPricesWrapper">
                                    <span className="newDetailsInfoPrice">$60.00</span>
                                    <span className="oldDetailsInfoPrice">$90.00</span>
                                </div>

                                <button className="addToCartBtnDetailsInfo" onClick={addToCardBtnHandler}>
                                    <span>{isInCart ? 'Added' : 'Add to cart'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>
        </motion.div>
    );
};

export default ValidatedComponent(GameDetails, gameDetailsSchema);
