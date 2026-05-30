import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import './MainBtn.scss';

const mainBtnSchema = z.object({
    btnClassName: z.string().optional(),
    btnOnClickHandler: z.function(),
    btnOnMouseEnterHandler: z.function().optional(),
    btnOnMouseLeaveHandler: z.function().optional(),
    children: z.unknown().optional(),
});

const MainBtn = ({ btnClassName, btnOnClickHandler, btnOnMouseEnterHandler, btnOnMouseLeaveHandler, children }) => {
    return (
        <button
            className={`mainBtn ${btnClassName}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                btnOnClickHandler();
            }}
            onMouseEnter={btnOnMouseEnterHandler}
            onMouseLeave={btnOnMouseLeaveHandler}
        >
            {children}
        </button>
    );
};

export default ValidatedComponent(MainBtn, mainBtnSchema);
