import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toastMsgs } from './constants';
import InputList from './components/inputList';
import { uuid } from './utils';
import { successNotify } from './utils/toast';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [ inputList, setInputList ] = useState([{ "id": uuid(), "inputId": "example id", "inputValue": "example value" }]);

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

  return (
    <>
      <h1>Auto Filler</h1>
      <InputList
        inputList={inputList}
        setInputList={setInputList}
      />
      <div className="card">
        <button id="save-btn" onClick={save}>Save</button>
        <button id="log-btn" onClick={log}>Log</button>
        {/* <button onClick={() => submitHandler()}>Submit</button> */}
        <button id="add-new-input-btn" onClick={addInput}>Add Input Container</button>
      </div>
      <ToastContainer />
    </>
  )
}

export default App;
