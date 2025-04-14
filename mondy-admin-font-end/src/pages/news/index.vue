<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Quản lý tin tức</h1>
      <NuxtLink to="/news/create" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
        <i class="pi pi-plus"></i>
        <span>Thêm tin tức</span>
      </NuxtLink>
    </div>

    <!-- Bộ lọc -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Danh mục</label>
          <select v-model="filters.category" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
            <option value="">Tất cả</option>
            <option value="market">Thị trường</option>
            <option value="policy">Chính sách</option>
            <option value="investment">Đầu tư</option>
            <option value="guide">Hướng dẫn</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Trạng thái</label>
          <select v-model="filters.status" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
            <option value="">Tất cả</option>
            <option value="draft">Nháp</option>
            <option value="published">Đã xuất bản</option>
            <option value="archived">Đã lưu trữ</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Tìm kiếm</label>
          <input v-model="filters.search" type="text" placeholder="Nhập tiêu đề..." class="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
        </div>
      </div>
    </div>

    <!-- Danh sách tin tức -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hình ảnh</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tiêu đề</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Danh mục</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tác giả</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ngày đăng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="news in newsList" :key="news.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <img :src="news.image" :alt="news.title" class="h-16 w-24 object-cover rounded">
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ news.title }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ news.summary }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 text-xs font-semibold rounded-full': true,
                  'bg-blue-100 text-blue-800': news.category === 'market',
                  'bg-green-100 text-green-800': news.category === 'policy',
                  'bg-purple-100 text-purple-800': news.category === 'investment',
                  'bg-yellow-100 text-yellow-800': news.category === 'guide'
                }">
                  {{ news.categoryText }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ news.author }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 text-xs font-semibold rounded-full': true,
                  'bg-gray-100 text-gray-800': news.status === 'draft',
                  'bg-green-100 text-green-800': news.status === 'published',
                  'bg-red-100 text-red-800': news.status === 'archived'
                }">
                  {{ news.statusText }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ news.publishedAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <NuxtLink :to="'/news/' + news.id" class="text-blue-600 hover:text-blue-900 mr-3">
                  <i class="pi pi-eye"></i>
                </NuxtLink>
                <NuxtLink :to="'/news/' + news.id + '/edit'" class="text-primary-600 hover:text-primary-900 mr-3">
                  <i class="pi pi-pencil"></i>
                </NuxtLink>
                <button @click="deleteNews(news.id)" class="text-red-600 hover:text-red-900">
                  <i class="pi pi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Phân trang -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị 1-10 của 100 kết quả
          </div>
          <div class="flex space-x-2">
            <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              Trước
            </button>
            <button class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const filters = ref({
  category: '',
  status: '',
  search: ''
})

const newsList = ref([
  {
    id: 1,
    title: 'Thị trường bất động sản TP.HCM năm 2024: Những dự báo và xu hướng',
    summary: 'Phân tích chi tiết về thị trường bất động sản TP.HCM trong năm 2024, những xu hướng mới và cơ hội đầu tư.',
    category: 'market',
    categoryText: 'Thị trường',
    author: 'Nguyễn Văn A',
    status: 'published',
    statusText: 'Đã xuất bản',
    publishedAt: '15/01/2024',
    image: 'https://picsum.photos/200/300'
  },
  {
    id: 2,
    title: 'Chính sách mới về thuế bất động sản: Những thay đổi quan trọng',
    summary: 'Cập nhật những thay đổi mới nhất về chính sách thuế bất động sản và tác động đến người mua nhà.',
    category: 'policy',
    categoryText: 'Chính sách',
    author: 'Trần Thị B',
    status: 'draft',
    statusText: 'Nháp',
    publishedAt: '10/01/2024',
    image: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    title: 'Hướng dẫn đầu tư bất động sản cho người mới bắt đầu',
    summary: 'Những lời khuyên và kinh nghiệm quý báu cho người mới bắt đầu đầu tư vào thị trường bất động sản.',
    category: 'guide',
    categoryText: 'Hướng dẫn',
    author: 'Lê Văn C',
    status: 'archived',
    statusText: 'Đã lưu trữ',
    publishedAt: '05/01/2024',
    image: 'https://picsum.photos/200/300'
  }
])

const deleteNews = (id) => {
  // Xử lý xóa tin tức
  console.log('Delete news:', id)
}
</script> 