import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { defaultInputList } from './constants';
import BtnContainer from './components/btnContainer';
import CurrentInputList from './components/currentInputList';
import InputList from './components/inputList';
import { InputItemType } from './types';
import { uuid } from './utils';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [ inputList, setInputList ] = useState<InputItemType[]>(defaultInputList);
  const [ currentInputInfo, setCurrentInputInfo ] = useState<InputItemType[]>([]);

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
        <BtnContainer
          inputList={inputList}
          setInputList={setInputList}
          setCurrentInputInfo={setCurrentInputInfo}
        />
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
