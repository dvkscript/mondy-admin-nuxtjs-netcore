<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Quản lý bất động sản</h1>
      <NuxtLink to="/properties/create" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
        <i class="pi pi-plus"></i>
        <span>Thêm bất động sản</span>
      </NuxtLink>
    </div>

    <!-- Bộ lọc -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Loại bất động sản</label>
          <select v-model="filters.type" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
            <option value="">Tất cả</option>
            <option value="house">Nhà ở</option>
            <option value="apartment">Căn hộ</option>
            <option value="land">Đất nền</option>
            <option value="villa">Biệt thự</option>
            <option value="office">Văn phòng</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Giá</label>
          <select v-model="filters.price" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
            <option value="">Tất cả</option>
            <option value="0-500">Dưới 500 triệu</option>
            <option value="500-1000">500 - 1 tỷ</option>
            <option value="1000-2000">1 - 2 tỷ</option>
            <option value="2000+">Trên 2 tỷ</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Trạng thái</label>
          <select v-model="filters.status" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
            <option value="">Tất cả</option>
            <option value="pending">Chờ duyệt</option>
            <option value="active">Đang bán</option>
            <option value="sold">Đã bán</option>
            <option value="expired">Hết hạn</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Tìm kiếm</label>
          <input v-model="filters.search" type="text" placeholder="Nhập từ khóa..." class="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
        </div>
      </div>
    </div>

    <!-- Danh sách bất động sản -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hình ảnh</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thông tin</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Giá</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Người đăng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="property in properties" :key="property.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <img :src="property.image" :alt="property.title" class="h-16 w-24 object-cover rounded">
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ property.title }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ property.address }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ property.area }}m² • {{ property.bedrooms }} phòng ngủ • {{ property.bathrooms }} phòng tắm
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ property.price }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ property.pricePerMeter }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ property.owner }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ property.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 text-xs font-semibold rounded-full': true,
                  'bg-yellow-100 text-yellow-800': property.status === 'pending',
                  'bg-green-100 text-green-800': property.status === 'active',
                  'bg-red-100 text-red-800': property.status === 'sold',
                  'bg-gray-100 text-gray-800': property.status === 'expired'
                }">
                  {{ property.statusText }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <NuxtLink :to="'/properties/' + property.id" class="text-blue-600 hover:text-blue-900 mr-3">
                  <i class="pi pi-eye"></i>
                </NuxtLink>
                <NuxtLink :to="'/properties/' + property.id + '/edit'" class="text-primary-600 hover:text-primary-900 mr-3">
                  <i class="pi pi-pencil"></i>
                </NuxtLink>
                <button @click="deleteProperty(property.id)" class="text-red-600 hover:text-red-900">
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
  type: '',
  price: '',
  status: '',
  search: ''
})

const properties = ref([
  {
    id: 1,
    title: 'Căn hộ cao cấp Quận 1',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    price: '2.5 tỷ',
    pricePerMeter: '50 triệu/m²',
    area: 50,
    bedrooms: 2,
    bathrooms: 2,
    status: 'active',
    statusText: 'Đang bán',
    image: 'https://picsum.photos/200/300',
    owner: 'Nguyễn Văn A',
    phone: '0123456789'
  },
  {
    id: 2,
    title: 'Nhà phố Thủ Đức',
    address: '456 Lê Văn Việt, Thủ Đức, TP.HCM',
    price: '3.2 tỷ',
    pricePerMeter: '40 triệu/m²',
    area: 80,
    bedrooms: 4,
    bathrooms: 3,
    status: 'sold',
    statusText: 'Đã bán',
    image: 'https://picsum.photos/200/300',
    owner: 'Trần Thị B',
    phone: '0987654321'
  },
  {
    id: 3,
    title: 'Đất nền Bình Dương',
    address: '789 Đại lộ Bình Dương, Bình Dương',
    price: '1.8 tỷ',
    pricePerMeter: '15 triệu/m²',
    area: 120,
    bedrooms: 0,
    bathrooms: 0,
    status: 'pending',
    statusText: 'Chờ duyệt',
    image: 'https://picsum.photos/200/300',
    owner: 'Lê Văn C',
    phone: '0369852147'
  }
])

const deleteProperty = (id) => {
  // Xử lý xóa bất động sản
  console.log('Delete property:', id)
}
</script> 