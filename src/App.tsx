import { useState } from 'react';    
import { v4 as uuidv4 } from 'uuid';          
import InputList from './components/inputList';

function App() {
  const [inputList, setInputList] = useState([{ "id": uuidv4(), "inputId": "example id", "inputValue": "example value" }]);

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
      console.log("Saved!");
    });
  };

  const getAllLocalItems = () => {
    chrome.storage.local.get(null, (items) => {
      console.log('items', items)
    });
  };

  const addInput = () => {
    setInputList((pre) =>  [ ...pre, { "id": uuidv4(), "inputId": "example id", "inputValue": "example value" } ]);
  };

  return (
    <>
      <h1>Auto Filler</h1>
      <InputList inputList={inputList} setInputList={setInputList} />
      <div className="card">
        <button id="save-btn" onClick={save}>Save</button>
        <button id="get-all-btn" onClick={getAllLocalItems}>Get All</button>
        {/* <button onClick={() => submitHandler()}>Submit</button> */}
        <button id="add-new-input-btn" onClick={addInput}>Add Input Container</button>
        {/* <button id="delete-input-btn" onClick={deleteInput}></button> */}
      </div>
    </>
  )
}

export default App
