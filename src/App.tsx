import { useState } from 'react';              
import InputList from './components/inputList';

function App() {
  const [count, setCount] = useState(0);
  const [inputList, setInputList] = useState([{ "id": 0, "inputId": "example id", "inputValue": "example value" }]);

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

  const addInputContainer = () => {
    setInputList((pre) => {
      const currentLength = pre.length;

      return [...pre, { "id": currentLength, "inputId": "example id", "inputValue": "example value"}];
    });
  };

  return (
    <>
      <h1>Auto Filler</h1>
      <InputList inputList={inputList} setInputList={setInputList} />

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button id="save" onClick={() => save()}>Save</button>
        <button id="get-all" onClick={() => getAllLocalItems()}>Get All</button>
        {/* <button onClick={() => submitHandler()}>Submit</button> */}
        <button id="add-new-input-container" onClick={() => addInputContainer()}>Add Input Container</button>
      </div>
    </>
  )
}

export default App
