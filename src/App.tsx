import React, { useState, useEffect } from 'react';
import { Cache } from 'aws-amplify';
import { StorageValue, useAllStorageValue } from './hooks/useAllStorageValue';

function App() {
  const [comment, setComment] = useState('');
  const [expireAt, setExpireAt] = useState(new Date())
  const { getAllStorageValue } = useAllStorageValue()
  const [storageValues, setStorageValues] = useState<StorageValue[]>([])

  // テキストをcacheに保存するfunction
  const setCommentCache = (comment: string) => {
    Cache.setItem('comment', comment, {
      expires: Math.floor(expireAt.getTime())
    });
    setStorageValues(getAllStorageValue())
  }

  useEffect(() => {
    Cache.configure({
      defaultTTL: 60000, // 60秒
      keyPrefix: "react-amplify-sandbox-",
    })

    setComment(Cache.getItem("comment"))
    setStorageValues(getAllStorageValue())
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Amplify React Sandbox</h1>
      </header>

      <section>
        {/* テキストを入力する */}
        <textarea value={ comment || '' } onChange={ (e) => { setComment(e.target.value) } } ></textarea>

        {/* 日付を入力する */}
        <input type="date" value={expireAt.toISOString().slice(0, 10)} onChange={(e) => { console.log(e.target.value); setExpireAt(new Date(e.target.value)) } } />

        {/* ボタン */}
        <button onClick={() => { setCommentCache(comment) }}>保存</button>

        {/* キャッシュの値を表示する */}
        <h4>実際に保存されている値</h4>
        <table>
          <thead>
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {/* getAllStorageValueの内容をリスト表示する */}
            {storageValues.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.key}</td>
                  <td>{value.value}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* キャッシュの値をクリアするボタン */}
        <button onClick={() => { Cache.clear() }}>キャッシュをクリア</button>
      </section>
    </div>
  );
}

export default App;
