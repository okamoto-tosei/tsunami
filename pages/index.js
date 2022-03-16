import { useEffect, useState, Fragment } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = async () => {
      fetch(process.env.NEXT_PUBLIC_API).then((res) => {
        res.json().then((json) => {
          setData(json);
        });
      });
    };
    data();
  }, []);

  console.log('data:', data);

  const kibo = (grade) => {
    if (grade === 'MajorWarning') {
      return <span style={{ color: 'red' }}>大津波警報</span>;
    } else if (grade === 'Warning') {
      return <span style={{ color: 'orange' }}>津波警報</span>;
    } else if (grade === 'Watch') {
      return <span style={{ color: 'yellowgreen' }}>津波注意報</span>;
    } else if (grade === 'Unknown') {
      return <span>不明</span>;
    }
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>津波情報</h1>

      <hr />
      <div>
        {data?.map((edges, index) => {
          return (
            <div key={index}>
              <h4>発表元情報：{edges.issue.source}</h4>
              <h4>発表時間：{edges.issue.time}</h4>
              <p>
                {edges?.areas?.map((d, index) => {
                  return (
                    <Fragment key={index}>
                      <div style={{ border: '1px gray solid' }}>
                        <p>
                          エリア：「<strong>{d.name}</strong>」
                        </p>
                        <p>
                          規模：「<strong>{kibo(d.grade)}</strong>」
                        </p>
                        <p>
                          津波が来る可能性 :
                          {d.immediate ? (
                            <strong style={{ color: 'red' }}>
                              すぐに津波が来る可能性があります
                            </strong>
                          ) : (
                            <strong>すぐに津波がくる可能性はありません</strong>
                          )}
                        </p>
                      </div>
                      <br />
                    </Fragment>
                  );
                })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
