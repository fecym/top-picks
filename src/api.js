// 接口基础配置
const API_BASE_URL = 'http://chengyuming.cn/api';
// const API_BASE_URL = 'http://localhost:4000/api';

// Emoji 映射表
const CATEGORY_ICONS = {
  1: "🔨",  // 常用工具
  2: "📚",  // 学习资源
  3: "🤖",  // AI工具
  4: "⚛️",  // 前端框架
  5: "🔋",  // 后端技术
  6: "💾",  // 数据库
  7: "☁️",  // 云服务
  8: "🎨",  // 设计资源
  9: "🔒",  // 安全工具
  10: "📱", // 移动开发
  11: "🎮", // 游戏开发
  12: "🧪", // 测试工具
  13: "📊", // 数据分析
  14: "🔄", // DevOps
  15: "⛓️", // 区块链
};

// 获取分类图标
function getCategoryIcon(categoryId) {
  return CATEGORY_ICONS[categoryId] || "🔍"; // 默认图标
}

// 封装fetch请求
async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    return getMockData();
  }
}

// Mock数据
function getMockData() {
  return {
    code: 0,
    message: 'success',
    data: [
      // 常用工具 category: 1
      {
        id: 1,
        title: "GitHub",
        url: "https://github.com",
        description: "代码托管和开发协作平台",
        category: 1,
        categoryName: `${getCategoryIcon(1)} 常用工具`
      },
      {
        id: 2,
        title: "ChatGPT",
        url: "https://chat.openai.com",
        description: "AI对话助手",
        category: 1,
        categoryName: `${getCategoryIcon(1)} 常用工具`
      },
      {
        id: 3,
        title: "Notion",
        url: "https://www.notion.so",
        description: "全能笔记和协作工具",
        category: 1,
        categoryName: `${getCategoryIcon(1)} 常用工具`
      },
      {
        id: 4,
        title: "Figma",
        url: "https://figma.com",
        description: "在线设计协作工具",
        category: 1,
        categoryName: `${getCategoryIcon(1)} 常用工具`
      },
      {
        id: 5,
        title: "Vercel",
        url: "https://vercel.com",
        description: "前端项目部署平台",
        category: 1,
        categoryName: `${getCategoryIcon(1)} 常用工具`
      },
      {
        id: 31,
        title: "CodePen",
        url: "https://codepen.io",
        description: "在线代码编辑器和前端开发环境",
        category: 1,
        categoryName: `${getCategoryIcon(1)} 常用工具`
      },
      {
        id: 32,
        title: "Sourcetree",
        url: "https://www.sourcetreeapp.com",
        description: "Git可视化管理工具",
        category: 1,
        categoryName: `${getCategoryIcon(1)} 常用工具`
      },
      {
        id: 33,
        title: "Postman",
        url: "https://www.postman.com",
        description: "API开发和测试工具",
        category: 1,
        categoryName: `${getCategoryIcon(1)} 常用工具`
      },

      // 学习资源 category: 2
      {
        id: 6,
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        description: "Web技术权威文档",
        category: 2,
        categoryName: `${getCategoryIcon(2)} 学习资源`
      },
      {
        id: 7,
        title: "掘金",
        url: "https://juejin.cn",
        description: "开发者技术社区",
        category: 2,
        categoryName: `${getCategoryIcon(2)} 学习资源`
      },
      {
        id: 8,
        title: "LeetCode",
        url: "https://leetcode.cn",
        description: "程序员刷题平台",
        category: 2,
        categoryName: `${getCategoryIcon(2)} 学习资源`
      },
      {
        id: 9,
        title: "Coursera",
        url: "https://www.coursera.org",
        description: "全球顶尖在线课程平台",
        category: 2,
        categoryName: `${getCategoryIcon(2)} 学习资源`
      },
      {
        id: 10,
        title: "freeCodeCamp",
        url: "https://www.freecodecamp.org",
        description: "免费学习编程的开源社区",
        category: 2,
        categoryName: `${getCategoryIcon(2)} 学习资源`
      },
      {
        id: 34,
        title: "Udemy",
        url: "https://www.udemy.com",
        description: "在线技能学习平台",
        category: 2,
        categoryName: `${getCategoryIcon(2)} 学习资源`
      },
      {
        id: 35,
        title: "Stack Overflow",
        url: "https://stackoverflow.com",
        description: "程序员问答社区",
        category: 2,
        categoryName: `${getCategoryIcon(2)} 学习资源`
      },
      {
        id: 36,
        title: "GitHub Learning Lab",
        url: "https://lab.github.com",
        description: "GitHub官方学习平台",
        category: 2,
        categoryName: `${getCategoryIcon(2)} 学习资源`
      },

      // AI工具 category: 3
      {
        id: 11,
        title: "Midjourney",
        url: "https://www.midjourney.com",
        description: "AI图像生成工具",
        category: 3,
        categoryName: `${getCategoryIcon(3)} AI工具`
      },
      {
        id: 12,
        title: "Claude",
        url: "https://claude.ai",
        description: "Anthropic开发的AI助手",
        category: 3,
        categoryName: `${getCategoryIcon(3)} AI工具`
      },
      {
        id: 13,
        title: "GitHub Copilot",
        url: "https://copilot.github.com",
        description: "AI代码助手",
        category: 3,
        categoryName: `${getCategoryIcon(3)} AI工具`
      },
      {
        id: 14,
        title: "Stable Diffusion",
        url: "https://stability.ai",
        description: "开源AI图像生成模型",
        category: 3,
        categoryName: `${getCategoryIcon(3)} AI工具`
      },
      {
        id: 15,
        title: "Bard",
        url: "https://bard.google.com",
        description: "Google的AI助手",
        category: 3,
        categoryName: `${getCategoryIcon(3)} AI工具`
      },
      {
        id: 37,
        title: "Anthropic",
        url: "https://www.anthropic.com",
        description: "AI研究和开发公司",
        category: 3,
        categoryName: `${getCategoryIcon(3)} AI工具`
      },
      {
        id: 38,
        title: "Hugging Face",
        url: "https://huggingface.co",
        description: "AI模型和数据集平台",
        category: 3,
        categoryName: `${getCategoryIcon(3)} AI工具`
      },
      {
        id: 39,
        title: "RunwayML",
        url: "https://runwayml.com",
        description: "创意AI工具平台",
        category: 3,
        categoryName: `${getCategoryIcon(3)} AI工具`
      },

      // 前端框架 category: 4
      {
        id: 16,
        title: "React",
        url: "https://react.dev",
        description: "用于构建用户界面的JavaScript库",
        category: 4,
        categoryName: `${getCategoryIcon(4)} 前端框架`
      },
      {
        id: 17,
        title: "Vue.js",
        url: "https://vuejs.org",
        description: "渐进式JavaScript框架",
        category: 4,
        categoryName: `${getCategoryIcon(4)} 前端框架`
      },
      {
        id: 18,
        title: "Angular",
        url: "https://angular.io",
        description: "现代Web开发平台",
        category: 4,
        categoryName: `${getCategoryIcon(4)} 前端框架`
      },
      {
        id: 19,
        title: "Svelte",
        url: "https://svelte.dev",
        description: "革命性的前端编译框架",
        category: 4,
        categoryName: `${getCategoryIcon(4)} 前端框架`
      },
      {
        id: 20,
        title: "Next.js",
        url: "https://nextjs.org",
        description: "React应用开发框架",
        category: 4,
        categoryName: `${getCategoryIcon(4)} 前端框架`
      },

      // 后端技术 category: 5
      {
        id: 21,
        title: "Node.js",
        url: "https://nodejs.org",
        description: "基于Chrome V8引擎的JavaScript运行时",
        category: 5,
        categoryName: `${getCategoryIcon(5)} 后端技术`
      },
      {
        id: 22,
        title: "Spring",
        url: "https://spring.io",
        description: "Java应用开发框架",
        category: 5,
        categoryName: `${getCategoryIcon(5)} 后端技术`
      },
      {
        id: 23,
        title: "Django",
        url: "https://www.djangoproject.com",
        description: "Python高级Web框架",
        category: 5,
        categoryName: `${getCategoryIcon(5)} 后端技术`
      },
      {
        id: 24,
        title: "Laravel",
        url: "https://laravel.com",
        description: "PHP Web应用框架",
        category: 5,
        categoryName: `${getCategoryIcon(5)} 后端技术`
      },
      {
        id: 25,
        title: "Go",
        url: "https://golang.org",
        description: "Google开发的编程语言",
        category: 5,
        categoryName: `${getCategoryIcon(5)} 后端技术`
      },

      // 数据库 category: 6
      {
        id: 26,
        title: "MongoDB",
        url: "https://www.mongodb.com",
        description: "流行的NoSQL数据库",
        category: 6,
        categoryName: `${getCategoryIcon(6)} 数据库`
      },
      {
        id: 27,
        title: "MySQL",
        url: "https://www.mysql.com",
        description: "最流行的关系型数据库",
        category: 6,
        categoryName: `${getCategoryIcon(6)} 数据库`
      },
      {
        id: 28,
        title: "Redis",
        url: "https://redis.io",
        description: "开源内存数据存储",
        category: 6,
        categoryName: `${getCategoryIcon(6)} 数据库`
      },
      {
        id: 29,
        title: "PostgreSQL",
        url: "https://www.postgresql.org",
        description: "功能强大的开源关系型数据库",
        category: 6,
        categoryName: `${getCategoryIcon(6)} 数据库`
      },
      {
        id: 30,
        title: "Elasticsearch",
        url: "https://www.elastic.co",
        description: "分布式搜索和分析引擎",
        category: 6,
        categoryName: `${getCategoryIcon(6)} 数据库`
      }
    ]
  };
}

// 获取书签列表
export function getBookmarks() {
  // return request('/bookmarks/list');
  return request('/tools');
}

// 导出函数供其他模块使用
export { getCategoryIcon };
