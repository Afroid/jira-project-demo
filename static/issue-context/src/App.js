import React, { useEffect, useState } from 'react';
import { view } from '@forge/bridge';

function App() {
  const [issueKey, setIssueKey] = useState(null);

  useEffect(() => {
    view.getContext().then(ctx => {
      console.log('Context:', ctx);
      setIssueKey(ctx.extension.issue.key);
    });
  }, []);

  return (
    <div style={{ padding: '8px', background: '#ffeeba', color: '#333' }}>
      <h3>Issue Context Mount Successful!</h3>
      {issueKey && <p>Issue Key: <strong>{issueKey}</strong></p>}
    </div>
  );
}

export default App;
