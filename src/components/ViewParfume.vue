<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр парфюма</h1>
    <div v-if="loading" class="loading-message">Загрузка данных...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="parfume" class="parfume-details">
      <div class="product-image-container">
        <img v-if="parfume.photo" :src="`${backendUrl}${parfume.photo.replace('/img/', '/images/')}`" alt="Parfume Photo" class="product-image" />
        <span v-else>Нет изображения</span>
      </div>
      <div class="parfume-info">
        <p><strong>Название:</strong> {{ parfume.name || 'N/A' }}</p>
        <p><strong>Тип:</strong> {{ parfume.type || 'N/A' }}</p>
        <p><strong>Объем (мл):</strong> {{ parfume.volume || 'N/A' }}</p>
        <p><strong>Цена:</strong> {{ parfume.price ? `${parfume.price} ₽` : 'N/A' }}</p>
        <p>
          <strong>В наличии:</strong>
          <span :class="['status', getStatusClass(parfume.in_stock)]">
            {{ parfume.in_stock ? 'В наличии' : 'Нет в наличии' }}
          </span>
        </p>
        <p><strong>Описание:</strong> {{ parfume.description || 'N/A' }}</p>
        <p><strong>Гендер:</strong> {{ parfume.gender || 'N/A' }}</p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/parfumes')">Вернуться к списку</button>
      </div>
    </div>
    <div v-else class="error-message">Не удалось загрузить данные о парфюме.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parfume: null,
      loading: true,
      errorMessage: null,
      backendUrl: 'http://localhost:3000',
    };
  },
  async created() {
    const parfumeId = this.$route.params.id;
    if (!/^\d+$/.test(parfumeId)) {
      this.errorMessage = 'Некорректный ID';
      this.loading = false;
      return;
    }
    await this.fetchParfume(parfumeId);
  },
  methods: {
    async fetchParfume(parfumeId) {
      try {
        const response = await fetch(`${this.backendUrl}/api/view-parfume/${parfumeId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          if (response.status === 404) {
            throw new Error('Парфюм не найден');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.parfume = data;
      } catch (err) {
        console.error('Ошибка при получении данных парфюма:', err);
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
    },
    getStatusClass(in_stock) {
      return in_stock ? 'available' : 'unavailable';
    },
  },
};
</script>

<style scoped>
.parfume-details {
  background: rgba(255, 245, 224, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.product-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.product-image-container .product-image {
  max-width: 150px;
  max-height: 150px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #fff5e0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.parfume-info {
  text-align: center;
  width: 100%;
  word-wrap: break-word;
}

.parfume-info p {
  margin: 10px 0;
  color: #2d1b00;
  font-size: 1.25rem;
}

.parfume-info strong {
  color: #2d1b00;
  font-weight: 600;
}

.status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  min-width: 100px;
}

.status.available {
  background: #2e7d32;
  color: #ffffff;
}

.status.unavailable {
  background: #d32f2f;
  color: #ffffff;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: #2d1b00;
}

@media (max-width: 768px) {
  .parfume-details {
    padding: 15px;
  }

  .product-image-container .product-image {
    max-width: 120px;
    max-height: 120px;
  }

  .parfume-info p {
    font-size: 1rem;
  }
}
</style>