<template>
  <div
    class="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden"
  >
    <!-- Background image -->
    <div class="absolute inset-0 z-0">
      <img src="/images/hotel-background.svg" alt="Hotel Background" class="w-full h-full object-cover opacity-70" />
    </div>
    <div class="w-full max-w-[420px] bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 z-10 border border-gray-100 login-form-container">
      <!-- Logo and Header -->
      <div class="mb-8 text-center login-header">
        <img src="/images/mondy-logo.svg" alt="Mondy Hotel" class="h-12 mx-auto mb-6" />
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
        <p class="text-gray-600">Access your hotel management dashboard</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="pi pi-envelope text-gray-400"></i>
            </div>
            <input
              v-model="form.email"
              type="email"
              placeholder="m@example.com"
              class="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
              required
            />
          </div>
        </div>

        <!-- Password -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >Forgot your password?</a
            >
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="pi pi-lock text-gray-400"></i>
            </div>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="loginError" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          <div class="flex items-center">
            <i class="pi pi-exclamation-circle mr-2"></i>
            <span>{{ loginError }}</span>
          </div>
        </div>
        
        <!-- Login Button -->
        <button
          type="submit"
          class="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 login-button"
          :disabled="loading"
        >
          <i v-if="loading" class="pi pi-spin pi-spinner mr-2"></i>
          {{ loading ? "Logging in..." : "Sign In to Dashboard" }}
        </button>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500 font-medium"
              >Or continue with</span
            >
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="flex items-center justify-center px-3 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <IconGoogle class="mr-2" />
            <span class="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button
            type="button"
            class="flex items-center justify-center px-3 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <IconGithub class="mr-2" />
            <span class="text-sm font-medium text-gray-700">GitHub</span>
          </button>
        </div>

        <!-- Sign up link -->
        <p class="text-center text-gray-600 mt-6">
          Don't have an account?
          <a href="#" class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >Sign up</a
          >
        </p>
      </form>

      <!-- Terms -->
      <p class="mt-8 text-center text-xs text-gray-500">
        By signing in, you agree to our
        <a href="#" class="text-gray-700 hover:text-gray-900 transition-colors duration-200">Terms of Service</a>
        and
        <a href="#" class="text-gray-700 hover:text-gray-900 transition-colors duration-200">Privacy Policy</a>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconGoogle from "@/components/Icons/IconGoogle.vue";
import IconGithub from "@/components/Icons/IconGithub.vue";
import { ref, reactive, onMounted } from 'vue';

definePageMeta({
  layout: false,
});

const form = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
const showPassword = ref(false);
const loginError = ref('');
const formReady = ref(false);

// Animation effect when component mounts
onMounted(() => {
  setTimeout(() => {
    formReady.value = true;
  }, 100);
});

const validateForm = () => {
  if (!form.email) {
    loginError.value = 'Please enter your email address';
    return false;
  }
  if (!form.password) {
    loginError.value = 'Please enter your password';
    return false;
  }
  return true;
};

const handleLogin = async () => {
  loginError.value = '';
  
  if (!validateForm()) return;
  
  loading.value = true;
  try {
    // Process login
    console.log("Login form:", form);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Redirect after successful login
    navigateTo("/");
  } catch (error) {
    console.error("Login error:", error);
    loginError.value = 'Invalid email or password. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style>
/* Custom scrollbar for Webkit browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Login page animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.2); }
  70% { box-shadow: 0 0 0 10px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
}

.login-form-container {
  animation: fadeIn 0.6s ease-out;
}

.login-form-container input:focus {
  animation: pulse 1.5s infinite;
}

.login-header {
  animation: slideIn 0.5s ease-out;
}

.login-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}
</style>
