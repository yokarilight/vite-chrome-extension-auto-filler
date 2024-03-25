import { uuid } from '../utils';

export const defaultInputList = [
  {
    "id": uuid(),
    "inputId": "",
    "inputValue": "",
  },
];

export const toastMsgs = {
  "success": {
    "saveMsg": "Save input info successfully!",
    "deleteFromLocalMsg": "Delete successfully!",
  },
  "error": {
    "deleteMsg": "It's only one item left. Deletion is not allowed.",
    "deleteFromLocalMsg": "Fail to delete from local",
    "saveBtnMsg": "Input Id and Input Value could not be empty",
  },
};
