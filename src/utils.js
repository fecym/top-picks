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

/**
 * 解析 Chrome 书签 HTML 文件
 * @param {string} html HTML 内容
 * @returns {Array} 解析后的书签数组
 */
export const parseBookmarks = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const bookmarks = [];

  /**
   * 递归解析书签文件夹
   * @param {Element} element DL元素
   * @param {string[]} categories 当前分类路径
   */
  const parseFolder = (element, categories = []) => {
    // 获取所有直接子元素
    const items = element.children;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.tagName === 'DT') {
        const h3 = item.querySelector('h3');
        const dl = item.querySelector('dl');
        const a = item.querySelector('a');

        if (h3) {
          // 这是一个文件夹
          const folderName = h3.textContent.trim();
          if (dl) {
            // 递归处理子文件夹
            parseFolder(dl, [...categories, folderName]);
          }
        } else if (a) {
          // 这是一个书签
          const url = a.href;
          const title = a.textContent.trim();
          const addDate = new Date(parseInt(a.getAttribute('add_date') || '0') * 1000);

          // 使用当前分类路径
          const categoryPath = categories.length > 0 ? categories.join(' / ') : '未分类';

          bookmarks.push({
            url,
            title,
            description: a.getAttribute('description') || '',
            category: `imported/${categoryPath.toLowerCase().replace(/\s+/g, '-')}`,
            categoryName: `📑 导入书签 / ${categoryPath}`,
            addDate
          });
        }
      }
    }
  };

  // 获取书签栏的根元素
  const bookmarkRoot = doc.querySelector('dl');
  if (bookmarkRoot) {
    parseFolder(bookmarkRoot, []);
  }

  return bookmarks;
};

/**
 * 处理书签导入
 * @param {File} file HTML 文件
 * @returns {Promise<Array>} 解析后的书签数组
 */
export const handleBookmarkImport = async (file) => {
  try {
    const text = await file.text();
    const bookmarks = parseBookmarks(text);

    // 按分类对书签进行分组和排序
    const groupedBookmarks = bookmarks.reduce((acc, bookmark) => {
      const category = bookmark.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(bookmark);
      return acc;
    }, {});

    // 将分组后的书签展平为数组，并按分类和标题排序
    const sortedBookmarks = Object.entries(groupedBookmarks)
      .sort(([a], [b]) => a.localeCompare(b))
      .flatMap(([_, items]) =>
        items.sort((a, b) => a.title.localeCompare(b.title))
      );

    return sortedBookmarks;
  } catch (error) {
    throw new Error('书签导入失败：' + error.message);
  }
};