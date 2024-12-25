// import 'reset.css'
// import './index.css'

import { getBookmarks, getCategoryIcon } from './api.js';
import { debounce, updateSearchResults, clearSearch, handleBookmarkImport } from './utils.js';

let bookmarksData = []; // 存储所有书签数据

/**
 * 渲染书签列表
 * @param {Array} bookmarks 书签数据
 */
function renderBookmarksList(bookmarks) {
  const container = document.getElementById('bookmarks');
  const fragment = document.createDocumentFragment();

  // 按category分组
  const groupedBookmarks = groupBookmarksByCategory(bookmarks);

  // 渲染分组后的数据
  Object.entries(groupedBookmarks).forEach(([category, data]) => {
    const categoryElement = createCategoryElement(category, data);
    fragment.appendChild(categoryElement);
  });

  // 一次性更新 DOM
  requestAnimationFrame(() => {
    container.innerHTML = '';
    container.appendChild(fragment);
  });
}

/**
 * 按分类对书签进行分组
 * @param {Array} bookmarks 书签数据
 * @returns {Object} 分组后的数据
 */
function groupBookmarksByCategory(bookmarks) {
  return bookmarks.reduce((acc, bookmark) => {
    const category = bookmark.category;
    if (!acc[category]) {
      acc[category] = {
        name: `${getCategoryIcon(category)} ${bookmark.categoryName.split(' ').slice(1).join(' ')}`,
        items: []
      };
    }
    acc[category].items.push(bookmark);
    return acc;
  }, {});
}

/**
 * 创建分类元素
 * @param {string} category 分类名
 * @param {Object} data 分类数据
 * @returns {HTMLElement} 分类元素
 */
function createCategoryElement(category, data) {
  const element = document.createElement('div');
  element.className = 'category';
  element.setAttribute('data-type', category.toLowerCase());

  element.innerHTML = `
    <h2>${data.name}</h2>
    <div class="links">
      ${data.items.map(createBookmarkCard).join('')}
    </div>
  `;

  return element;
}

/**
 * 创建书签卡片HTML
 * @param {Object} item 书签数据
 * @returns {string} 卡片HTML
 */
function createBookmarkCard(item) {
  return `
    <div class="link-card">
      <a class="card-link" href="${item.url}" target="_blank" aria-label="${item.title}"></a>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `;
}

/**
 * 处理搜索
 * @param {Event} event 输入事件
 */
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase().trim();

  if (!searchTerm) {
    renderBookmarksList(bookmarksData);
    updateSearchResults(bookmarksData.length, '');
    return;
  }

  const filteredBookmarks = bookmarksData.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm) ||
    bookmark.description.toLowerCase().includes(searchTerm)
  );

  requestAnimationFrame(() => {
    renderBookmarksList(filteredBookmarks);
    updateSearchResults(filteredBookmarks.length, searchTerm);
  });
}

/**
 * 初始化渲染
 */
async function renderBookmarks() {
  const container = document.getElementById('bookmarks');
  try {
    container.innerHTML = '<div class="loading">加载中...</div>';
    const response = await getBookmarks();
    if (response.code === 0) {
      bookmarksData = response.data;
      renderBookmarksList(bookmarksData);
    } else {
      throw new Error(response.message || '加载失败');
    }
  } catch (error) {
    console.error('Failed to load bookmarks:', error);
    container.innerHTML = `<div class="error">加载失败: ${error.message}</div>`;
  }
}

/**
 * 添加导入相关代码
 */
function initImport() {
  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importFile');

  importBtn.addEventListener('click', () => {
    importFile.click();
  });

  importFile.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const importedBookmarks = await handleBookmarkImport(file);
      // 合并书签数据
      bookmarksData = [...bookmarksData, ...importedBookmarks];
      renderBookmarksList(bookmarksData);
      // 清除文件选择
      event.target.value = '';
      // 显示成功提示
      alert(`成功导入 ${importedBookmarks.length} 个书签`);
    } catch (error) {
      console.error('Import failed:', error);
      alert(error.message);
    }
  });
}

/**
 * 初始化
 */
function init() {
  const debouncedSearch = debounce(handleSearch);
  document.getElementById('searchInput').addEventListener('input', debouncedSearch);
  document.getElementById('clearSearch').addEventListener('click', () => clearSearch(renderBookmarksList, bookmarksData));
  initImport(); // 初始化导入功能
  renderBookmarks();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);