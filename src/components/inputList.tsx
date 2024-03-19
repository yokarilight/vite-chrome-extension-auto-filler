import { InputItemType } from '../types/index';

type InputListProps = {
  inputList: InputItemType[];
  setInputList: React.Dispatch<React.SetStateAction<InputItemType[]>>;
}

function InputList(props: InputListProps) {
  const { inputList, setInputList } = props;
  console.log('inputList', inputList)


  /**
   * change input value
   * @param {string} type - inputId, inputValue
   * @param {string} index - list id
   * @param {string} newValue - new value
   */
  const handleChangeInput = (type: string, index: number, newValue: string) => {
    setInputList((pre: InputItemType[]) => {
      const updatedList = [...pre];
      const target = updatedList[index];
      if (type === 'inputId') {
        target.inputId = newValue;
      } else {
        target.inputValue = newValue;
      }

      return updatedList;
    });
  };

  const handleDeleteInput = (id: number) => {
    setInputList((pre: InputItemType[]) => pre.filter(item => item.id !== id));
  };

  return (
    <div className="input-list-container">
      {inputList.map((item, index) => {
        return (
          <div className='input-list-item' key={`input-list-item_${index}`}>
            <div>Number {item.id + 1}</div>
            <input value={item.inputId} type="text" id={`input_id_${index}`} className="input-id" onChange={(e) => handleChangeInput('inputId', item.id, e.target.value)} />
            <input value={item.inputValue} type="text" id={`input_value_${index}`} className="input-value" onChange={(e) => handleChangeInput('inputValue', item.id, e.target.value)} />
            <div onClick={() => handleDeleteInput(item.id)}>
              Delete
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InputList;
