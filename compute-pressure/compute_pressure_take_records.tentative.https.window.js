// META: script=/resources/test-only-api.js
// META: script=resources/pressure-helpers.js

'use strict';

test(t => {
  const observer = new PressureObserver(
      t.unreached_func('This callback should not have been called.'),
      {samplerate: 1.0});

  const records = observer.takeRecords();
  assert_equals(records.length, 0, 'No record before observe');
}, 'Calling takeRecords() before observe()');

pressure_test(async (t, mockPressureService) => {
  let observer;
  const update = await new Promise(async resolve => {
    observer = new PressureObserver(resolve);
    await observer.observe('cpu');

    mockPressureService.setPressureUpdate('critical');
    mockPressureService.sendUpdate();
  });
  await assert_equals(update.state, 'critical');

  const records = observer.takeRecords();
  assert_equals(records.length, 0, 'No record available');
}, 'takeRecords() returns empty record after callback invoke');
