// loadBMapGL.js
export function loadBMapGL(ak) {
    return new Promise((resolve, reject) => {
      // 检查是否已经加载了百度地图脚本
      if (window.BMapGL) {
        resolve(window.BMapGL);
        return;
      }
  
      // 创建一个script标签来加载百度地图GL JS API
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://api.map.baidu.com/api?type=webgl&v=1.0&ak=${ak}&callback=initBMapGL`;
      script.onerror = reject;
  
      // 定义一个全局函数，当百度地图脚本加载完成后会调用
      window.initBMapGL = function() {
        resolve(window.BMapGL);
      };
  
      document.head.appendChild(script);
    });
  }