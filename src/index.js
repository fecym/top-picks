import { getBookmarks, getCategoryIcon } from './api.js';

let bookmarksData = []; // 存储所有书签数据

// 渲染函数
async function renderBookmarks() {
  const container = document.getElementById('bookmarks');
  try {
    const response = await getBookmarks();
    if (response.code === 0) {
      bookmarksData = response.data; // 保存数据到全局变量
      renderBookmarksList(bookmarksData);
    }
  } catch (error) {
    console.error('Failed to load bookmarks:', error);
    // 可以添加错误提示UI
  }
}

// 渲染书签列表
function renderBookmarksList(bookmarks) {
  const container = document.getElementById('bookmarks');
  container.innerHTML = ''; // 清空容器

  // 按category分组
  const groupedBookmarks = bookmarks.reduce((acc, bookmark) => {
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

  // 渲染分组后的数据
  Object.entries(groupedBookmarks).forEach(([category, data]) => {
    const categoryElement = document.createElement('div');
    categoryElement.className = 'category';

    categoryElement.innerHTML = `
      <h2>${data.name}</h2>
      <div class="links">
        ${data.items.map(item => `
          <div class="link-card">
            <a class="card-link" href="${item.url}" target="_blank" aria-label="${item.title}"></a>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(categoryElement);
  });
}

// 本地搜索功能
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();

  if (!searchTerm) {
    renderBookmarksList(bookmarksData); // 搜索词为空时显示所有数据
    updateSearchResults(bookmarksData.length, '');
    return;
  }

  // 在本地数据中搜索
  const filteredBookmarks = bookmarksData.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm) ||
    bookmark.description.toLowerCase().includes(searchTerm)
  );

  renderBookmarksList(filteredBookmarks);
  updateSearchResults(filteredBookmarks.length, searchTerm);
}

// 清除搜索
function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';
  searchInput.focus();
  renderBookmarksList(bookmarksData); // 恢复显示所有数据
  updateSearchResults(bookmarksData.length, '');
}

// 更新搜索结果数量
function updateSearchResults(count, searchTerm) {
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
}

// 初始化
function init() {
  // 添加搜索事件监听
  document.getElementById('searchInput').addEventListener('input', handleSearch);
  document.getElementById('clearSearch').addEventListener('click', clearSearch);

  // 加载数据
  renderBookmarks();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);