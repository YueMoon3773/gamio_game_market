import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import './SelectionController.scss';

const selectionControllerSchema = z.object({
    labelText: z.string(),
    selectId: z.string(),
    selectOptionList: z.array(z.looseObject({})).min(1, 'Array options can not be empty.'),
    selectValue: z.union([z.string(), z.number()]),
    selectOnChangeHandler: z.function(),
});

const SelectionController = ({ labelText, selectId, selectOptionList, selectValue, selectOnChangeHandler }) => {
    return (
        <label htmlFor={selectId} className="sortControllerLabel">
            {labelText}
            <select
                name={selectId}
                id={selectId}
                className="sortSelection"
                value={selectValue}
                onChange={selectOnChangeHandler}
            >
                {selectOptionList.map((option) => {
                    return (
                        <option key={option.content} value={option.value}>
                            {option.content}
                        </option>
                    );
                })}
            </select>
        </label>
    );
};

// export default ValidatedComponent(SelectionController, selectionControllerSchema);
export default SelectionController;
