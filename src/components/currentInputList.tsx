import { Dispatch, SetStateAction } from 'react';
import { toastMsgs } from '../constants';
import { InputItemType } from '../types/index';
import { successNotify, errorNotify } from '../utils/toast';

type CurrentInputListProps = {
  data: InputItemType[];
  setCurrentInputInfo: Dispatch<SetStateAction<InputItemType[]>>;
}

function CurrentInputList(props: CurrentInputListProps) {
  const { data, setCurrentInputInfo } = props;

  // const handleFillIn = (id: string, value: string) => {
  //   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //     try {
  //       document.getElementById(id).value = value;
  //       sendResponse({ status: "Success!" });
  //     } catch (error) {
  //       console.log(error);
  //       sendResponse({ status: "Exception occurred!" });
  //     }
  //   });
  // };

  const handleDeleteFromLocal = (id: string) => {
    chrome.storage.local.remove(id, () => {
      try {
        setCurrentInputInfo((pre: InputItemType[]) => pre.filter(item => item.inputId !== id));
        successNotify(toastMsgs.success.deleteFromLocalMsg);
      } catch (err) {
        errorNotify(toastMsgs.error.deleteFromLocalMsg);
      }
    });
  };

  return (
    <div className="current-input-list-container">
      {data.map((item, index) => {
        return (
          <div className="current-input-list-item" key={`current-input-list-item-${index}`}>
            <div className="current-input-id">{item.inputId}</div>
            <div className="current-input-value">{item.inputValue}</div>
            {/* <div onClick={() => handleFillIn(item.inputId, item.inputValue)}>
              Fill
            </div> */}
            <div onClick={() => handleDeleteFromLocal(item.inputId)}>
              Delete from local
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CurrentInputList;
