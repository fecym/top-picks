// utils.js - 工具函数

/**
 * 书签状态管理
 */
export const bookmarkStore = {
  data: [],

  setBookmarks(bookmarks) {
    this.data = bookmarks;
  },

  getBookmarks() {
    return this.data;
  },

  addBookmarks(newBookmarks) {
    this.data = [...this.data, ...newBookmarks];
    return this.data;
  }
};

/**
 * 错误处理
 */
export function handleError(error, customMessage = '') {
  console.error(error);
  const message = customMessage || error.message || '操作失败';
  alert(message);
  return null;
};

/**
 * DOM 相关操作
 */
function getOrCreateResultsDiv() {
  let resultsDiv = document.querySelector('.search-results');
  if (!resultsDiv) {
    resultsDiv = document.createElement('div');
    resultsDiv.className = 'search-results';
    document.querySelector('.search-box').appendChild(resultsDiv);
  }
  return resultsDiv;
};

export function updateSearchResults(count, searchTerm) {
  const resultsDiv = getOrCreateResultsDiv();
  if (searchTerm) {
    resultsDiv.textContent = `找到 ${count} 个结果`;
    resultsDiv.classList.add('visible');
  } else {
    resultsDiv.classList.remove('visible');
  }
};

/**
 * 防抖函数
 */
export function debounce(fn, delay = 200) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

/**
 * 清除搜索
 */
export function clearSearch(searchInput) {
  searchInput.value = '';
  searchInput.focus();
};

/**
 * 书签导入相关
 */
function validateFile(file) {
  if (!file) {
    throw new Error('请选择文件');
  }
  if (!file.name.endsWith('.html')) {
    throw new Error('请选择有效的书签 HTML 文件');
  }
};

function parseBookmarks(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const bookmarks = [];

  const parseFolder = (element, categories = []) => {
    const items = element.children;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.tagName === 'DT') {
        const h3 = item.querySelector('h3');
        const dl = item.querySelector('dl');
        const a = item.querySelector('a');

        if (h3 && dl) {
          parseFolder(dl, [...categories, h3.textContent.trim()]);
        } else if (a) {
          const categoryPath = categories.length > 0 ? categories.join(' / ') : '未分类';
          bookmarks.push({
            url: a.href,
            title: a.textContent.trim(),
            description: a.getAttribute('description') || '',
            category: `imported/${categoryPath.toLowerCase().replace(/\s+/g, '-')}`,
            categoryName: `📑 导入书签 / ${categoryPath}`,
            addDate: new Date(parseInt(a.getAttribute('add_date') || '0') * 1000)
          });
        }
      }
    }
  };

  const bookmarkRoot = doc.querySelector('dl');
  if (bookmarkRoot) {
    parseFolder(bookmarkRoot, []);
  }

  return bookmarks;
};

const sortBookmarks = bookmarks => {
  return bookmarks.sort((a, b) => a.title.localeCompare(b.title));
};

export async function handleBookmarkImport(file) {
  try {
    validateFile(file);
    const text = await file.text();
    const bookmarks = parseBookmarks(text);
    return sortBookmarks(bookmarks);
  } catch (error) {
    return handleError(error, '书签导入失败');
  }
};