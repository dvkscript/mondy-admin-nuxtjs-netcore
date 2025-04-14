<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">
        {{ isEdit ? 'Sửa bất động sản' : 'Thêm bất động sản' }}
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
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Loại bất động sản</label>
            <select v-model="form.type" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
              <option value="house">Nhà ở</option>
              <option value="apartment">Căn hộ</option>
              <option value="land">Đất nền</option>
              <option value="villa">Biệt thự</option>
              <option value="office">Văn phòng</option>
            </select>
          </div>
        </div>

        <!-- Địa chỉ -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Tỉnh/Thành phố</label>
            <select v-model="form.city" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
              <option value="hcm">TP.HCM</option>
              <option value="hn">Hà Nội</option>
              <option value="dn">Đà Nẵng</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Quận/Huyện</label>
            <select v-model="form.district" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
              <option value="q1">Quận 1</option>
              <option value="q2">Quận 2</option>
              <option value="q3">Quận 3</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Địa chỉ chi tiết</label>
            <input v-model="form.address" type="text" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
          </div>
        </div>

        <!-- Thông số kỹ thuật -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Diện tích (m²)</label>
            <input v-model="form.area" type="number" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Số phòng ngủ</label>
            <input v-model="form.bedrooms" type="number" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2">
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Số phòng tắm</label>
            <input v-model="form.bathrooms" type="number" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2">
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Số tầng</label>
            <input v-model="form.floors" type="number" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2">
          </div>
        </div>

        <!-- Giá cả -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Giá bán</label>
            <input v-model="form.price" type="text" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2" required>
          </div>
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Giá cho thuê</label>
            <input v-model="form.rentPrice" type="text" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2">
          </div>
        </div>

        <!-- Mô tả -->
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Mô tả</label>
          <textarea v-model="form.description" rows="4" class="border border-gray-300 dark:border-gray-600 rounded-lg p-2"></textarea>
        </div>

        <!-- Hình ảnh -->
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 dark:text-gray-300 mb-1">Hình ảnh</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(image, index) in form.images" :key="index" class="relative">
              <img :src="image" class="w-full h-32 object-cover rounded-lg">
              <button @click="removeImage(index)" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                <i class="pi pi-times"></i>
              </button>
            </div>
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-center">
              <button class="text-gray-500 dark:text-gray-400">
                <i class="pi pi-plus text-xl"></i>
              </button>
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
  type: 'house',
  city: 'hcm',
  district: 'q1',
  address: '',
  area: 0,
  bedrooms: 0,
  bathrooms: 0,
  floors: 0,
  price: '',
  rentPrice: '',
  description: '',
  images: []
})

const handleSubmit = () => {
  // Xử lý lưu dữ liệu
  console.log('Form data:', form.value)
}

const removeImage = (index) => {
  form.value.images.splice(index, 1)
}
</script> 