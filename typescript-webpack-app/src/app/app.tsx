import { ipcRenderer } from 'electron';
import React, { useState } from 'react';

// register ipc event messages
ipcRenderer.on('channel1-response', (e, args) => {
  console.log(args)
})

ipcRenderer.on('mailbox', (e, args) => {
  console.log(args);
})

const App = () => {
  const [count, setCount] = useState(0)
  const onClickHandler = () => {
    // add a break point here
    setCount(count + 1);
    console.log('onClickHandler fired');
  }
  const onIpcSendChannel1Handler = () => {
    // send : asynchronous
    ipcRenderer.send('channel1', 'Hello from main window');
  }
  const onIpcSendSyncMessageHandler = () => {
    // sendSync : synchronous block wait for response
    let response = ipcRenderer.sendSync('sync-message', 'Waiting for response')
    console.log(response)
  }
  const onIpcHandleAndInvokeHandler = () => {
    ipcRenderer.invoke('ask-fruit').then(answer => {
      console.log(answer)
    })
  }

  return (
    <div className="app">
      <h1>React running in Electron App!!</h1>
      <button onClick={onClickHandler}>Increment counter</button>
      <p>counter: {count}</p>
      <button onClick={onIpcSendChannel1Handler}>Send Ipc Message to Main</button>
      <button onClick={onIpcSendSyncMessageHandler}>Send Ipc Message to Main and Back</button>
      <button onClick={onIpcHandleAndInvokeHandler}>Send Ipc Invoke to Main Handle</button>
    </div>
  );
}

export default App;
