import { Dispatch, SetStateAction } from 'react';
import { InputItemType } from '../types/index';
import { toastMsgs } from '../constants';
import { errorNotify } from '../utils/toast';

type InputListProps = {
  inputList: InputItemType[];
  setInputList: Dispatch<SetStateAction<InputItemType[]>>;
}

function InputList(props: InputListProps) {
  const { inputList, setInputList } = props;
  console.log('inputList', inputList)

  const isDeleteBtnDisabled = inputList.length === 1;

  /**
   * change input value
   * @param {string} type - inputId, inputValue
   * @param {string} id - list id
   * @param {string} newValue - new value
   */
  const handleChangeInput = (type: string, id: string, newValue: string) => {
    setInputList((pre: InputItemType[]) => {
      const updatedList = [ ...pre ];
      const target = updatedList.find((item) => item.id === id);
      if (target) {
        if (type === 'inputId') {
          target.inputId = newValue;
        } else {
          target.inputValue = newValue;
        }
      }

      return updatedList;
    });
  };

  const handleDeleteInput = (id: string) => {
    if (isDeleteBtnDisabled) {
      errorNotify(toastMsgs.error.deleteMsg);
      return;
    }

    setInputList((pre: InputItemType[]) => pre.filter(item => item.id !== id));
  };

  return (
    <div className="input-list-container">
      {inputList.map((item, index) => {
        return (
          <div className="input-list-item" key={`input-list-item_${index}`}>
            <input value={item.inputId} type="text" id={`input_id_${index}`} className="input-id" onChange={(e) => handleChangeInput("inputId", item.id, e.target.value)} />
            <input value={item.inputValue} type="text" id={`input_value_${index}`} className="input-value" onChange={(e) => handleChangeInput("inputValue", item.id, e.target.value)} />
            <div onClick={() => handleDeleteInput(item.id)}>
              Delete
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InputList;
