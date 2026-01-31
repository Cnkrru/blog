// service-worker.js for Cnkrru's Blog
// 缓存名称和版本
const CACHE_NAME = 'cnkrru-blog-v1';

// 需要预缓存的资源列表
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/404.html',
  '/manifest.json',
  '/img/avatar.png',
  '/robots.txt',
  '/sitemap.xml'
];

// 安装事件：预缓存静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活事件：清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

//  fetch 事件：缓存优先策略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中存在，直接返回缓存的响应
        if (response) {
          return response;
        }

        // 否则，发起网络请求
        return fetch(event.request)
          .then(response => {
            // 检查响应是否有效
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 克隆响应（因为响应流只能使用一次）
            const responseToCache = response.clone();

            // 将响应存入缓存
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('Fetch error:', error);
            // 如果网络请求失败，返回离线页面
            if (event.request.mode === 'navigate') {
              return caches.match('/404.html');
            }
          });
      })
  );
});

// 后台同步事件（可选）
self.addEventListener('sync', event => {
  if (event.tag === 'sync-posts') {
    event.waitUntil(syncPosts());
  }
});

// 推送通知事件（可选）
self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/img/avatar.png',
    badge: '/img/avatar.png',
    data: {
      url: data.url
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 通知点击事件（可选）
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// 同步文章函数（示例）
async function syncPosts() {
  try {
    const response = await fetch('/api/posts/sync');
    const data = await response.json();
    console.log('Posts synced:', data);
  } catch (error) {
    console.error('Sync error:', error);
  }
}

// 定期同步（可选）
self.addEventListener('periodicsync', event => {
  if (event.tag === 'daily-sync') {
    event.waitUntil(syncDailyData());
  }
});

// 每日同步函数（示例）
async function syncDailyData() {
  try {
    // 同步站点数据
    await syncPosts();
    console.log('Daily sync completed');
  } catch (error) {
    console.error('Daily sync error:', error);
  }
}