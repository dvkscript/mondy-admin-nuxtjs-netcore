<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Quản lý người dùng</h1>
      <NuxtLink to="/users/create" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
        <i class="pi pi-plus"></i>
        <span>Thêm người dùng</span>
      </NuxtLink>
    </div>

    <!-- Bộ lọc -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Vai trò</label>
          <select v-model="filters.role" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
            <option value="">Tất cả</option>
            <option value="admin">Quản trị viên</option>
            <option value="agent">Môi giới</option>
            <option value="user">Người dùng</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Trạng thái</label>
          <select v-model="filters.status" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
            <option value="">Tất cả</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="blocked">Bị khóa</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Tìm kiếm</label>
          <input v-model="filters.search" type="text" placeholder="Nhập tên, email, số điện thoại..." class="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
        </div>
      </div>
    </div>

    <!-- Danh sách người dùng -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thông tin</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vai trò</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Số tin đăng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ngày tạo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" :src="user.avatar" :alt="user.name">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ user.phone }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 text-xs font-semibold rounded-full': true,
                  'bg-purple-100 text-purple-800': user.role === 'admin',
                  'bg-blue-100 text-blue-800': user.role === 'agent',
                  'bg-gray-100 text-gray-800': user.role === 'user'
                }">
                  {{ user.roleText }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ user.postCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 text-xs font-semibold rounded-full': true,
                  'bg-green-100 text-green-800': user.status === 'active',
                  'bg-red-100 text-red-800': user.status === 'inactive',
                  'bg-yellow-100 text-yellow-800': user.status === 'blocked'
                }">
                  {{ user.statusText }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ user.createdAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <NuxtLink :to="'/users/' + user.id" class="text-blue-600 hover:text-blue-900 mr-3">
                  <i class="pi pi-eye"></i>
                </NuxtLink>
                <NuxtLink :to="'/users/' + user.id + '/edit'" class="text-primary-600 hover:text-primary-900 mr-3">
                  <i class="pi pi-pencil"></i>
                </NuxtLink>
                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">
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
  role: '',
  status: '',
  search: ''
})

const users = ref([
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'admin',
    roleText: 'Quản trị viên',
    postCount: 15,
    status: 'active',
    statusText: 'Hoạt động',
    createdAt: '01/01/2024'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0987654321',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'agent',
    roleText: 'Môi giới',
    postCount: 8,
    status: 'active',
    statusText: 'Hoạt động',
    createdAt: '05/01/2024'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    phone: '0369852147',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'user',
    roleText: 'Người dùng',
    postCount: 3,
    status: 'blocked',
    statusText: 'Bị khóa',
    createdAt: '10/01/2024'
  }
])

const deleteUser = (id) => {
  // Xử lý xóa người dùng
  console.log('Delete user:', id)
}
</script> 