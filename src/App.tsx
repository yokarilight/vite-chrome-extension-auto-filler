import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { FaDev, FaPlusCircle, FaSave } from "react-icons/fa";
import { toastMsgs } from './constants';
import CurrentInputList from './components/currentInputList';
import InputList from './components/inputList';
import { InputItemType } from './types';
import { uuid } from './utils';
import { successNotify, errorNotify } from './utils/toast';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const defaultInputList = [
    {
      "id": uuid(),
      "inputId": "",
      "inputValue": "",
    },
  ];

  const [ inputList, setInputList ] = useState<InputItemType[]>(defaultInputList);
  const [ currentInputInfo, setCurrentInputInfo ] = useState<InputItemType[]>([]);

  const save = () => {
    let isDataValid = true;
    const storageObj: { [key: string]: string } = {};
    for (let i = 0; i < inputList.length; i++) {
      const currentInputId = inputList[i].inputId;
      const currentInputVal = inputList[i].inputValue;
      if (!currentInputId && !currentInputVal) {
        isDataValid = false;
        break;
      }
      storageObj[currentInputId] = currentInputVal;
    }

    if (!isDataValid) {
      errorNotify(toastMsgs.error.saveBtnMsg);

      return;
    }

    chrome.storage.local.set(storageObj, () => {
      successNotify(toastMsgs.success.saveMsg);
    });

    setInputList(defaultInputList);
    setCurrentInputInfo((pre) => {
      const newArr = [...pre];
      Object.entries(storageObj).forEach((item) => {
        newArr.push({ "id": uuid(), "inputId": item[0], "inputValue": item[1] });
      });

      return newArr;
    });
  };

  // console log all ids and values
  const log = () => {
    chrome.storage.local.get(null, (items) => {
      console.log('items', items);
    });
  };

  const addNewInput = () => {
    setInputList((pre) =>  [ ...pre, { "id": uuid(), "inputId": "", "inputValue": "" } ]);
  };

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const infoItems: InputItemType[] = [];
      Object.entries(items).forEach((item) => {
        infoItems.push({ "id": uuid(), "inputId": item[0], "inputValue": item[1] });
      });
      setCurrentInputInfo(infoItems);
    });
  }, []);

  return (
    <>
      <div className="auto-filler-container">
        <div className="h1">Auto Filler</div>
        <InputList
          data={inputList}
          setInputList={setInputList}
        />
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
        <CurrentInputList
          data={currentInputInfo}
          setCurrentInputInfo={setCurrentInputInfo}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
