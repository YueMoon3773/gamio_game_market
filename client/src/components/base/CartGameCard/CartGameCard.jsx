import { Link } from 'react-router-dom';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import { DeleteTrashIcon } from '../../../assets/svgIcons';

import pageBaseStyles from '../../../styles/modules/basePageStyles.module.scss';
import './CartGameCard.scss';

const cartGameCardSchema = z.object({
    isCartGameCardLoading: z.boolean(),
    gameId: z.number().optional(),
    gameName: z.string().optional(),
    gameImg: z.string().optional(),
    gamePrice: z.number().optional(),
    cartDeleteBtnOnClickHandler: z.function().optional(),
});

const CartGameCard = ({ isCartGameCardLoading, gameId, gameName, gameImg, gamePrice, cartDeleteBtnOnClickHandler }) => {
    return (
        <div className="cartGameCard">
            <div className="cartCardLeft">
                <div className="cartCardImgWrapper">
                    {isCartGameCardLoading ? (
                        <div className={`cartCardSkeletonImg ${pageBaseStyles.skeletonLoading}`}></div>
                    ) : (
                        <img src={gameImg} alt="Game image" className="cartCardImg" />
                    )}
                </div>

                {isCartGameCardLoading ? (
                    <div className={`cartCardSkeletonName ${pageBaseStyles.skeletonLoading}`}>Skeleton name</div>
                ) : (
                    <Link to={`/game-detail/${gameId}`} className="cartCardName">
                        {gameName}
                    </Link>
                )}
            </div>
            <div className="cartCardRight">
                {isCartGameCardLoading ? (
                    <div className={`cartCardSkeletonPrice ${pageBaseStyles.skeletonLoading}`}>Skeleton price</div>
                ) : (
                    <span className="cartCardPrice">${gamePrice}</span>
                )}

                {!isCartGameCardLoading && (
                    <button
                        onClick={() => {
                            cartDeleteBtnOnClickHandler(gameId);
                        }}
                        className="cartCardDeleteBtn"
                    >
                        <DeleteTrashIcon></DeleteTrashIcon>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ValidatedComponent(CartGameCard, cartGameCardSchema);
