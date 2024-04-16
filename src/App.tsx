import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import init, { add } from "wasm-lib";
import { defaultInputList } from '@/constants';
import BtnContainer from '@/components/btnContainer';
import CurrentInputList from '@/components/currentInputList';
import InputList from '@/components/inputList';
import { InputItemType, CurrentInputItemType } from '@/types';
import { uuid } from '@/utils';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // https://www.tkat0.dev/posts/how-to-create-a-react-app-with-rust-and-wasm/
  init().then(() => {
    const res = add(10, 15);
    console.log('res', res);
  });
  const [ inputList, setInputList ] = useState<InputItemType[]>(defaultInputList);
  const [ currentInputInfo, setCurrentInputInfo ] = useState<CurrentInputItemType[]>([]);

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const infoItems: CurrentInputItemType[] = [];
      Object.entries(items).forEach((item) => {
        infoItems.push({
          "id": uuid(),
          "inputId": item[0],
          "inputValue": item[1].inputValue,
          "exp": item[1].exp,
        });
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
        {currentInputInfo.length ? (
          <CurrentInputList
            data={currentInputInfo}
            setCurrentInputInfo={setCurrentInputInfo}
          />
        ) : null}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
