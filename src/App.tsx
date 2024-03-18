import { useState } from 'react';              
import InputList from './components/inputList';

function App() {
  const [count, setCount] = useState(0);
  const [inputList, setInputList] = useState([{ "id": 0, "inputId": "example id", "inputValue": "example value" }]);

  // const inputRefs = useRef<{ [key: string]: InputItemType }>({});

  // Ensure that the inputRefs array has the same length as inputList
  // if (inputRefs.current.length !== inputList.length) {
  //   // Reset the refs array to match the inputList length
  //   const obj: { [key: string]: InputItemType } = {};
  //   inputList.forEach((item, i) => {
  //     obj[`${i}`] = item;
  //   });
  //   inputRefs.current = obj;
  // }
  // console.log('inputRefs', inputRefs)

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

      return [...pre, { "id": currentLength + 1, "inputId": "example id", "inputValue": "example value"}];
    });
  };

  return (
    <>
      <h1>Auto Filler</h1>
      {/* Input fields */}
      {/* <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">Sign In User Name</span>
        <input type="text" id="sign-in-user-name" ref={signInRef} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
      </div>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">Sign In Password</span>
        <input type="text" id="sign-in-user-password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
      </div>
      {inputList.map((item, index) => {
        return (
          <>
            <div key={`input_container_${index}`}>
              <span>{item.id}</span>
              <input type="text" id={`input_id_${index}`} ref={signInRef} className="form-control" />
              <input type="text" id={`input_value_${index}`} ref={signInRef} className="form-control" />
            </div>
          </>
        );
      })} */}
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
