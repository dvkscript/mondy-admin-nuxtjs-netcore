<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">
        {{ isEdit ? 'Sửa người dùng' : 'Thêm người dùng' }}
      </h1>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Thông tin cơ bản -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Họ và tên</label>
            <input v-model="form.name" type="text" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
            <input v-model="form.email" type="email" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Số điện thoại</label>
            <input v-model="form.phone" type="tel" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Vai trò</label>
            <select v-model="form.role" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
              <option value="admin">Quản trị viên</option>
              <option value="agent">Môi giới</option>
              <option value="user">Người dùng</option>
            </select>
          </div>
        </div>

        <!-- Mật khẩu -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Mật khẩu</label>
            <input v-model="form.password" type="password" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" :required="!isEdit">
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Xác nhận mật khẩu</label>
            <input v-model="form.confirmPassword" type="password" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" :required="!isEdit">
          </div>
        </div>

        <!-- Trạng thái -->
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Trạng thái</label>
          <select v-model="form.status" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="blocked">Bị khóa</option>
          </select>
        </div>

        <!-- Avatar -->
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Ảnh đại diện</label>
          <div class="flex items-center space-x-4">
            <div class="h-20 w-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img v-if="form.avatar" :src="form.avatar" class="h-full w-full object-cover">
              <div v-else class="h-full w-full flex items-center justify-center text-gray-400">
                <i class="pi pi-user text-2xl"></i>
              </div>
            </div>
            <button type="button" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              Tải ảnh lên
            </button>
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
  name: '',
  email: '',
  phone: '',
  role: 'user',
  password: '',
  confirmPassword: '',
  status: 'active',
  avatar: ''
})

const handleSubmit = () => {
  // Xử lý lưu dữ liệu
  console.log('Form data:', form.value)
}
</script> 