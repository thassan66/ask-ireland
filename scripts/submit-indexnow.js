const HOST = 'ask-ireland.vercel.app';
const KEY = 'b8949109d0fe460d7e55d698bda55a12';
const KEY_LOCATION = `https://${HOST}/b8949109d0fe460d7e55d698bda55a12.txt`;

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/calculator`,
  `https://${HOST}/emergency-tax`,
  `https://${HOST}/scorecard`,
  `https://${HOST}/letters`,
  `https://${HOST}/updates`,
  `https://${HOST}/directory`,
  `https://${HOST}/journey`
];

async function submitIndexNow() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      console.log(`✓ IndexNow: Successfully submitted ${URLS.length} URLs to IndexNow network (Status ${res.status}).`);
    } else {
      console.warn(`IndexNow response: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error('IndexNow ping failed:', err.message);
  }
}

submitIndexNow();
