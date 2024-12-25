// utils.js - 工具函数

/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 延迟时间
 * @returns {Function} 防抖后的函数
 */
export const debounce = (fn, delay = 200) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

/**
 * 更新搜索结果数量显示
 * @param {number} count 结果数量
 * @param {string} searchTerm 搜索词
 */
export const updateSearchResults = (count, searchTerm) => {
  let resultsDiv = document.querySelector('.search-results');
  if (!resultsDiv) {
    resultsDiv = document.createElement('div');
    resultsDiv.className = 'search-results';
    document.querySelector('.search-box').appendChild(resultsDiv);
  }

  if (searchTerm) {
    resultsDiv.textContent = `找到 ${count} 个结果`;
    resultsDiv.classList.add('visible');
  } else {
    resultsDiv.classList.remove('visible');
  }
};

/**
 * 清除搜索
 * @param {Function} renderCallback 渲染回调函数
 * @param {Array} data 原始数据
 */
export const clearSearch = (renderCallback, data) => {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';
  searchInput.focus();
  renderCallback(data);
  updateSearchResults(data.length, '');
};