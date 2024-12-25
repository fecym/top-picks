import {getBookmarks} from './api.js';
import {renderBookmarksList} from './renderUtils.js';
import {
  bookmarkStore,
  handleError,
  updateSearchResults,
  handleBookmarkImport,
  debounce,
  clearSearch
} from './utils.js';

const getElementById = id => document.getElementById(id);

// DOM 元素缓存
const ELEMENTS = {
  get bookmarks() {
    return getElementById('bookmarks')
  },
  get searchInput() {
    return getElementById('searchInput')
  },
  get clearSearchBtn() {
    return getElementById('clearSearch')
  },
  get importBtn() {
    return getElementById('importBtn')
  },
  get importFile() {
    return getElementById('importFile')
  }
};

/**
 * 处理搜索
 */
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase().trim();
  const bookmarks = bookmarkStore.getBookmarks();

  if (!searchTerm) {
    renderBookmarksList(bookmarks, ELEMENTS.bookmarks);
    updateSearchResults(bookmarks.length, '');
    return;
  }

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm) ||
    bookmark.description.toLowerCase().includes(searchTerm)
  );

  renderBookmarksList(filteredBookmarks, ELEMENTS.bookmarks);
  updateSearchResults(filteredBookmarks.length, searchTerm);
}

/**
 * 初始化导入功能
 */
function initImport() {
  const handleFileSelect = async event => {
    const file = event.target.files[0];
    if (!file) return;

    const importedBookmarks = await handleBookmarkImport(file);
    if (importedBookmarks) {
      const allBookmarks = bookmarkStore.addBookmarks(importedBookmarks);
      renderBookmarksList(allBookmarks, ELEMENTS.bookmarks);
      event.target.value = '';
    }
  };

  ELEMENTS.importBtn.addEventListener('click', () => ELEMENTS.importFile.click());
  ELEMENTS.importFile.addEventListener('change', handleFileSelect);
};

/**
 * 初始化渲染
 */
async function initializeApp() {
  try {
    ELEMENTS.bookmarks.innerHTML = '<div class="loading">加载中...</div>';
    const response = await getBookmarks();

    if (response.code === 0) {
      bookmarkStore.setBookmarks(response.data);
      renderBookmarksList(response.data, ELEMENTS.bookmarks);
    } else {
      throw new Error(response.message || '加载失败');
    }
  } catch (error) {
    handleError(error, '加载失败');
    ELEMENTS.bookmarks.innerHTML = `<div class="error">加载失败: ${error.message}</div>`;
  }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  const debouncedSearch = debounce(handleSearch, 200);
  ELEMENTS.searchInput.addEventListener('input', debouncedSearch);
  ELEMENTS.clearSearchBtn.addEventListener('click', () => {
    clearSearch(ELEMENTS.searchInput);
    const bookmarks = bookmarkStore.getBookmarks();
    renderBookmarksList(bookmarks, ELEMENTS.bookmarks);
    updateSearchResults(bookmarks.length, '');
  });

  initImport();
  initializeApp();
});