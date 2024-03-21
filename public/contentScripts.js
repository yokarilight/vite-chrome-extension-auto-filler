chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  try {
    if (request && request.id && request.value) {
      const element = document.getElementById(request.id);
      if (element) {
        element.value = request.value;
        sendResponse({ status: "Success!" });
      } else {
        console.log('Cannot find element!');
        sendResponse({ status: "Element not found!" });
      }
    }
  } catch (err) {
    console.error(err);
    sendResponse({ status: "Exception occurred!" });
  }
});
