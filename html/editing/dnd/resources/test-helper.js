'use strict';

const mouseMoveToCenter = element => {
    const clientRect = element.getBoundingClientRect();
    const centerX = (clientRect.left + clientRect.right) / 2;
    const centerY = (clientRect.top + clientRect.bottom) / 2;
    return new test_driver.Actions()
    .pointerMove(centerX, centerY)
    .send();
};

function dragDropTest(dragElement, dropElement, onDropCallBack, testDescription) {
  promise_test((t) => new Promise(async (resolve, reject) => {
    await new Promise(loaded => window.onload = loaded);
    addEventListener('drop', t.step_func((event) => {
    if (onDropCallBack(event) == true) {
      resolve();
    } else {
      reject();
    }
    }));
    try {
      await mouseMoveToCenter(dragElement);
      await new test_driver.Actions()
      .pointerDown()
      .send();
      await mouseMoveToCenter(dropElement);
      await new test_driver.Actions()
      .pointerUp()
      .send();
    } catch (e) {
      reject(e);
    }
  }, testDescription));
}
