import { Dispatch, SetStateAction } from 'react';
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { toastMsgs } from '@/constants';
import { InputItemType, CurrentInputItemType } from '@/types/index';
import { successNotify, errorNotify } from '@/utils/toast';

type CurrentInputListProps = {
  data: InputItemType[];
  setCurrentInputInfo: Dispatch<SetStateAction<CurrentInputItemType[]>>;
}

function CurrentInputList(props: CurrentInputListProps) {
  const { data, setCurrentInputInfo } = props;

  const handleFillIn = (id: string, value: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { id, value }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
          }
  
          console.log(response.status);
        });
      } else {
        console.error("Unable to find active tab or tab id is undefined");
      }
    });
  };

  const handleDeleteFromLocal = (id: string) => {
    chrome.storage.local.remove(id, () => {
      try {
        setCurrentInputInfo((pre: CurrentInputItemType[]) => pre.filter(item => item.inputId !== id));
        successNotify(toastMsgs.success.deleteFromLocalMsg);
      } catch (err) {
        errorNotify(toastMsgs.error.deleteFromLocalMsg);
      }
    });
  };

  return (
    <div className="current-input-list-container">
      <div className="h3">Existing Input Info List</div>
      {data.map((item, index) => {
        return (
          <div className="input-list-item justify-between" key={`current-input-list-item-${index}`}>
            <div className="mr-5">
              <div className="input-box">
                <span className="input-box-title">Input Id</span>
                <span className="text-white">{item.inputId}</span>
              </div>
              <div className="input-box">
                <span className="input-box-title">Input Value</span>
                <span className="text-white">{item.inputValue}</span>
              </div>
            </div>
            <div>
              <div className="btn mb-2" onClick={() => handleFillIn(item.inputId, item.inputValue)}>
                <FaCheckCircle className="btn-icon" />
                Apply
              </div>
              <div className="btn" onClick={() => handleDeleteFromLocal(item.inputId)}>
                <FaTrash className="btn-icon" />
                Remove
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CurrentInputList;
