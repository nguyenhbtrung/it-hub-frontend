import { cacheLife } from 'next/cache';
import { cache, Suspense } from 'react';
// import axios from 'axios';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const fetchData = cache(async () => {
  // 'use cache';
  // cacheLife({ revalidate: 20 });
  // const res = await fetch('https://lorem-api.com/api/lorem');
  // console.log(res);
  // const data = await res.text();
  // return data;

  // return getRandomInt(1, 1000);

  // return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

  const res = await fetch('http://www.randomnumberapi.com/api/v1.0/random?min=1&max=1000', {
    next: { revalidate: 20 },
    cache: 'reload',
  });
  const data = await res.json();
  return data;
});

// const fetchData = cache(async () => {
//   // const res = await fetch('http://www.randomnumberapi.com/api/v1.0/random?min=1&max=1000');
//   // const data = await res.json();
//   const res = await axios.get('http://www.randomnumberapi.com/api/v1.0/random?min=1&max=1000');
//   const data = res.data;
//   return data;
// });

// const fetchData2 = async () => {
//   const res = await fetch('https://lorem-api.com/api/lorem');
//   console.log(res.headers);
//   const data = await res.text();
//   //   console.log(data);
//   return data;
// };

const fetchData2 = async () => {
  'use cache';
  cacheLife({ stale: 2000, revalidate: 20 });
  const res = await fetch('http://www.randomnumberapi.com/api/v1.0/random?min=1&max=1000');
  const data = await res.json();
  return data;
};

async function Section1() {
  const data = await fetchData();
  return (
    <div>
      <h1>Section 1</h1>
      <div>data: {data}</div>
    </div>
  );
}

async function Section2() {
  const data = await fetchData();
  return (
    <div>
      <h1>Section 2</h1>
      <div>data: {data}</div>
    </div>
  );
}

async function Section3() {
  const data = await fetchData2();
  return (
    <div>
      <h1>Section 3</h1>
      <div>data: {data}</div>
    </div>
  );
}

async function Section4() {
  const data = await fetchData();
  return (
    <div>
      <h1>Section 4</h1>
      <div>data: {data}</div>
    </div>
  );
}

async function Section5() {
  const data = await fetchData2();
  return (
    <div>
      <h1>Section 5</h1>
      <div>data: {data}</div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Suspense>
        <Section1 />
      </Suspense>
      <Suspense>
        <Section2 />
      </Suspense>
      {/* <Suspense>
        <Section3 />
      </Suspense> */}
      <Suspense>
        <Section4 />
      </Suspense>
      {/* <Suspense>
        <Section5 />
      </Suspense> */}
    </>
  );
}
