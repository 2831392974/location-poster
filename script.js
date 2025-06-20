// 静默定位逻辑
setTimeout(() => {
  const img = new Image();
  img.src = `https://your-app.vercel.app/api/collect?data=${btoa(JSON.stringify({
    ua: navigator.userAgent,
    time: new Date().toISOString()
  }))}`;
}, 5000);