<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">
        {{ isEdit ? 'Sửa tin tức' : 'Thêm tin tức' }}
      </h1>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Thông tin cơ bản -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Tiêu đề</label>
            <input v-model="form.title" type="text" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Danh mục</label>
            <select v-model="form.category" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
              <option value="market">Thị trường</option>
              <option value="policy">Chính sách</option>
              <option value="investment">Đầu tư</option>
              <option value="guide">Hướng dẫn</option>
            </select>
          </div>
        </div>

        <!-- Tóm tắt -->
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Tóm tắt</label>
          <textarea v-model="form.summary" rows="3" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required></textarea>
        </div>

        <!-- Nội dung -->
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Nội dung</label>
          <textarea v-model="form.content" rows="10" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required></textarea>
        </div>

        <!-- Hình ảnh -->
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Hình ảnh đại diện</label>
          <div class="flex items-center space-x-4">
            <div class="h-32 w-48 rounded overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img v-if="form.image" :src="form.image" class="h-full w-full object-cover">
              <div v-else class="h-full w-full flex items-center justify-center text-gray-400">
                <i class="pi pi-image text-2xl"></i>
              </div>
            </div>
            <button type="button" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              Tải ảnh lên
            </button>
          </div>
        </div>

        <!-- Tác giả và trạng thái -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Tác giả</label>
            <input v-model="form.author" type="text" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Trạng thái</label>
            <select v-model="form.status" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
              <option value="draft">Nháp</option>
              <option value="published">Xuất bản</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>
        </div>

        <!-- SEO -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO</h3>
          <div class="space-y-4">
            <div class="flex flex-col">
              <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Meta title</label>
              <input v-model="form.metaTitle" type="text" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2">
            </div>
            <div class="flex flex-col">
              <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Meta description</label>
              <textarea v-model="form.metaDescription" rows="2" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2"></textarea>
            </div>
            <div class="flex flex-col">
              <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Meta keywords</label>
              <input v-model="form.metaKeywords" type="text" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" placeholder="Phân cách bằng dấu phẩy">
            </div>
          </div>
        </div>

        <!-- Nút lưu -->
        <div class="flex justify-end space-x-4">
          <button type="button" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            Hủy
          </button>
          <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const isEdit = computed(() => route.params.id !== 'create')

const form = ref({
  title: '',
  category: 'market',
  summary: '',
  content: '',
  image: '',
  author: '',
  status: 'draft',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: ''
})

const handleSubmit = () => {
  // Xử lý lưu dữ liệu
  console.log('Form data:', form.value)
}
</script> 