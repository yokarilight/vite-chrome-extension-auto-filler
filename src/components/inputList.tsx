import { InputItemType } from '../types/index';

type InputListProps = {
  inputList: InputItemType[];
  setInputList: (inputList: InputItemType[]) => void;
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
  // const handleChangeInput = (type: string, index: string, newValue: string) => {
  //   setInputList((pre) => {
  //     pre[index][type] = newValue;

  //     return pre;
  //   });
  // };

  return (
    <div className="input-list-container">
      {inputList.map((item, index) => {
        return (
          <div className='input-list-item' key={`input-list-item_${index}`}>
            <div>Number {item.id + 1}</div>
            <input value={item.inputId} type="text" id={`input_id_${index}`} className="form-control" onChange={() => {}} />
            <input value={item.inputValue} type="text" id={`input_value_${index}`} className="form-control" onChange={() => {}} />
          </div>
        );
      })}
    </div>
  );
}

export default InputList;
