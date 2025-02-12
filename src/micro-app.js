
export function isMicroApp() {
  return !!window.__MICRO_APP_ENVIRONMENT__
}

export default (initFn) => {
  function mount() {
    console.log("top-picks mount");
    initFn()
  }

  // 将卸载操作放入 unmount 函数
  function unmount() {
    console.log("微应用 top-picks 卸载了");
  }

  // // 微前端环境下，注册mount和unmount方法
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
};