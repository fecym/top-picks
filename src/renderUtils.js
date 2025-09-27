// renderUtils.js - 渲染相关工具函数
import {getCategoryIcon} from './api.js';

/**
 * 创建书签卡片HTML
 */
const createBookmarkCard = item => `
  <div class="link-card">
    <a class="card-link" href="${item.url}" target="_blank" aria-label="${item.title}"></a>
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  </div>
`;

/**
 * 按分类对书签进行分组
 */
function groupBookmarksByCategory(bookmarks) {
  return bookmarks.reduce((acc, bookmark) => {
    const category = bookmark.category;
    if (!acc[category]) {
      acc[category] = {
        name: `${getCategoryIcon(category)} ${bookmark.categoryName}`,
        items: []
      };
    }
    acc[category].items.push(bookmark);
    return acc;
  }, {});
}

/**
 * 渲染书签列表
 */
export function renderBookmarksList(bookmarks, container) {
  // 处理空数据情况
  if (!bookmarks || bookmarks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>暂无数据</h3>
        <p>您可以通过导入书签或等待数据加载</p>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  const groupedBookmarks = groupBookmarksByCategory(bookmarks);

  Object.entries(groupedBookmarks).forEach(([category, data]) => {
    const element = document.createElement('div');
    element.className = 'category';
    element.setAttribute('data-type', category.toLowerCase());

    element.innerHTML = `
      <h2>${data.name}</h2>
      <div class="links">
        ${data.items.map(createBookmarkCard).join('')}
      </div>
    `;

    fragment.appendChild(element);
  });

  requestAnimationFrame(() => {
    container.innerHTML = '';
    container.appendChild(fragment);
  });
}