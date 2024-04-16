import { Dispatch, SetStateAction } from 'react';
import { FaDev, FaPlusCircle, FaSave } from "react-icons/fa";
import { toastMsgs } from '@/constants';
import { InputItemType, CurrentInputItemType } from '@/types';
import { uuid } from '@/utils';
import { successNotify, errorNotify } from '@/utils/toast';

type BtnContainerProps = {
  inputList: InputItemType[];
  setInputList: Dispatch<SetStateAction<InputItemType[]>>;
  setCurrentInputInfo: Dispatch<SetStateAction<CurrentInputItemType[]>>;
}

function BtnContainer(props: BtnContainerProps) {
  const { inputList, setInputList, setCurrentInputInfo } = props;

  const save = () => {
    let isDataValid = true;
    const storageObj: { [key: string]: { inputValue: string; exp: number } } = {};
    for (let i = 0; i < inputList.length; i++) {
      const currentInputId = inputList[i].inputId;
      const currentInputVal = inputList[i].inputValue;
      if (!currentInputId && !currentInputVal) {
        isDataValid = false;
        break;
      }
      storageObj[currentInputId] = {
        "inputValue": currentInputVal,
        "exp": new Date().getTime(),
      };
    }

    if (!isDataValid) {
      errorNotify(toastMsgs.error.saveBtnMsg);

      return;
    }

    chrome.storage.local.set(storageObj, () => {
      successNotify(toastMsgs.success.saveMsg);
    });

    setInputList([{ "id": uuid(), "inputId": "", "inputValue": "" }]);
    setCurrentInputInfo((pre) => {
      const newArr = [...pre];
      Object.entries(storageObj).forEach((item) => {
        newArr.push({
          "id": uuid(),
          "inputId": item[0],
          "inputValue": item[1].inputValue,
          "exp": item[1].exp,
        });
      });

      return newArr;
    });
  };

  const addNewInput = () => {
    setInputList((pre) =>  [ ...pre, { "id": uuid(), "inputId": "", "inputValue": "" } ]);
  };

  // console log all ids and values
  const log = () => {
    chrome.storage.local.get(null, (items) => {
      console.log('items', items);
    });
  };

  return (
    <div className="btn-container">
      <div id="save-btn" className="btn save-btn" onClick={save}>
        <FaSave className="btn-icon" />
        Save
      </div>
      <div id="add-new-input-btn" className="btn add-new-input-btn" onClick={addNewInput}>
        <FaPlusCircle className="btn-icon"  />
        Add
      </div>
      <div id="log-btn" className="btn log-btn" onClick={log}>
        <FaDev className="btn-icon" />
        Log
      </div>
    </div>
  );
}

export default BtnContainer;
