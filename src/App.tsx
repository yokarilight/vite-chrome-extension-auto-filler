import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toastMsgs } from './constants';
import CurrentInputList from './components/currentInputList';
import InputList from './components/inputList';
import { InputItemType } from './types';
import { uuid } from './utils';
import { successNotify } from './utils/toast';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [ inputList, setInputList ] = useState<InputItemType[]>([{ "id": uuid(), "inputId": "example id", "inputValue": "example value" }]);
  const [ currentInputInfo, setCurrentInputInfo ] = useState<InputItemType[]>([]);

  // const submitHandler = () => {
  //   console.log(signInRef.current?.value);
  // };

  // const onClick = async () => {
  //   const [tab] = await chrome.tabs.query({ active: true });
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: () => {
  //       alert('helloooooo')
  //     }
  //   });
  // }

  const save = () => {
    const storageObj: { [key: string]: string } = {};
    inputList.forEach((item) => {
      storageObj[item.inputId] = item.inputValue;
    })

    chrome.storage.local.set(storageObj, () => {
      successNotify(toastMsgs.success.saveMsg);
    });
  };

  const log = () => {
    chrome.storage.local.get(null, (items) => {
      console.log('items', items)
    });
  };

  const addInput = () => {
    setInputList((pre) =>  [ ...pre, { "id": uuid(), "inputId": "example id", "inputValue": "example value" } ]);
  };

  const loadExistingInputInfo = () => {
    chrome.storage.local.get(null, (items) => {
      const infoItems: InputItemType[] = [];
      Object.entries(items).forEach((item) => {
        infoItems.push({ "id": uuid(), "inputId": item[0], "inputValue": item[1] });
      });
      setCurrentInputInfo(infoItems);
    });
  };

  useEffect(() => {
    console.log('currentInputInfo', currentInputInfo)
  }, [currentInputInfo])

  return (
    <>
      <h1>Auto Filler</h1>
      <InputList
        data={inputList}
        setInputList={setInputList}
      />
      <div className="card">
        <button id="save-btn" onClick={save}>Save</button>
        <button id="log-btn" onClick={log}>Log</button>
        {/* <button onClick={() => submitHandler()}>Submit</button> */}
        <button id="add-new-input-btn" onClick={addInput}>Add Input Container</button>
        <button id="load-existing-input-info-btn" onClick={loadExistingInputInfo}>Load Existing Input Info</button>
      </div>
      <CurrentInputList
        data={currentInputInfo}
        setCurrentInputInfo={setCurrentInputInfo}
      />
      <ToastContainer />
    </>
  )
}

export default App;
