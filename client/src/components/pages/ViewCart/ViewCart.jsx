import { useState, useEffect } from 'react';
import { useLocation, Link, Navigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { motion } from 'framer-motion';

import { useGameHelper } from '../../../hooks/useGamesHelper';
import { useAuthenticate } from '../../../hooks/useAuthenticate';
import { useInfoBadge } from '../../../hooks/useInfoBadge';

import gameApiHelper from '../../../utils/gameApiHelper';
import helperFunctions from '../../../utils/helper';

import PageLayout from '../../layout/PageLayout/PageLayout';
import CartGameCard from '../../base/CartGameCard/CartGameCard';

import './ViewCart.scss';

const helper = helperFunctions();

const ViewCart = () => {
    const [gamesInfoInCartLoading, setGamesInfoInCartLoading] = useState(true);
    const [gamesInfoInCartError, setGamesInfoInCartError] = useState(null);
    const [gamesInfoInCartList, setGamesInfoInCartList] = useState(null);

    const [isGameListChange, setIsGameListChange] = useState(0);

    const { user: userAuthenData, loading: userAuthenLoading, error: userAthenError } = useAuthenticate();

    const { getAllGamesInfoInUserCart, removeGameFromUserCart, removeAllGamesFromUserCart } = useGameHelper();

    useEffect(() => {
        let isActive = true;
        if (userAuthenData !== null) {
            const fetchGamesInfoData = async () => {
                if (!isActive) return;

                setGamesInfoInCartLoading(true);
                const data = await getAllGamesInfoInUserCart(userAuthenData.id);
                // console.log({ data });

                if (data) setGamesInfoInCartLoading(false);

                if (data?.ok === true) {
                    setGamesInfoInCartList(data?.gameList);
                } else {
                    setGamesInfoInCartError(data?.err);
                }
            };

            fetchGamesInfoData();
        }

        return () => {
            isActive = false;
        };
    }, [userAuthenData, isGameListChange]);

    const deleteGameInCartBtnOnClickHandler = async (gameId) => {
        await removeGameFromUserCart(userAuthenData.id, gameId);
        setIsGameListChange((prev) => prev + 1);
    };

    // LOGGING
    // console.log({ userAuthenData, userAuthenLoading });
    // console.log({ gamesInfoInCartList, gamesInfoInCartLoading, gamesInfoInCartError });

    if (userAuthenData === null && userAuthenLoading === false) {
        return <Navigate to="/"></Navigate>;
    } else if (gamesInfoInCartError !== null) {
        return <Navigate to="/"></Navigate>;
    } else {
        return (
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.66, ease: 'easeInOut' }}
            >
                <PageLayout pageType="normalPage">
                    <div className="viewCartWrapper">
                        <h1 className="viewCartHeading">Your cart</h1>
                        {gamesInfoInCartList !== null &&
                            gamesInfoInCartLoading === false &&
                            gamesInfoInCartError === null && (
                                <p className="productOverview">
                                    <span>{gamesInfoInCartList.length}</span> game(s){' '}
                                    {gamesInfoInCartList.length > 1 ? 'are' : 'is'} waiting for you
                                </p>
                            )}

                        <div className="cartGameCardWrapper">
                            {gamesInfoInCartList === null &&
                                gamesInfoInCartLoading === true &&
                                gamesInfoInCartError === null && (
                                    <>
                                        {[...Array(3)].map((_, index) => {
                                            return (
                                                <CartGameCard
                                                    key={'z' + index}
                                                    isCartGameCardLoading={true}
                                                ></CartGameCard>
                                            );
                                        })}
                                    </>
                                )}

                            {gamesInfoInCartList !== null &&
                                gamesInfoInCartLoading === false &&
                                gamesInfoInCartError === null && (
                                    <>
                                        {gamesInfoInCartList.map((item, index) => {
                                            return (
                                                <CartGameCard
                                                    key={item.game_id + 'z' + index}
                                                    isCartGameCardLoading={false}
                                                    gameId={item.game_id}
                                                    gameName={item.game_name}
                                                    gameImg={item.game_img}
                                                    gamePrice={Number(item.game_price)}
                                                    cartDeleteBtnOnClickHandler={deleteGameInCartBtnOnClickHandler}
                                                ></CartGameCard>
                                            );
                                        })}
                                    </>
                                )}
                        </div>

                        <div className="cartPriceAndControllerWrapper">
                            <div className="cartPriceWrapper">
                                <h3 className="cartPriceLeft">Total</h3>
                                <div className="cartPriceRight">
                                    {gamesInfoInCartList !== null &&
                                        gamesInfoInCartLoading === false &&
                                        gamesInfoInCartError === null && (
                                            <span>${helper.calculateTotalGamePriceInCart(gamesInfoInCartList)}</span>
                                        )}
                                </div>
                            </div>

                            <div className="cartControllerWrapper">
                                <button
                                    onClick={async () => {
                                        const userRes = confirm(
                                            "Thank you. Please note that this is a demo project. Clicking 'Yes/OK' will empty your cart to simulate a successful checkout.",
                                        );

                                        if (userRes === true) {
                                            await removeAllGamesFromUserCart(userAuthenData.id);
                                            setGamesInfoInCartList(null);
                                            setIsGameListChange((prev) => prev + 1);
                                        }
                                    }}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </PageLayout>
            </motion.div>
        );
    }
};

export default ViewCart;
