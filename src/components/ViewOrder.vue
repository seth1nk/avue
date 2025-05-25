<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр заказа</h1>
    <div v-if="loading" class="loading-message">Загрузка данных...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="order" class="order-details">
      <div class="product-image-container">
        <img v-if="order.photo" :src="`${backendUrl}${order.photo.replace('/img/', '/images/')}`" alt="Order Photo" class="product-image" />
        <span v-else>Нет изображения</span>
      </div>
      <div class="order-info">
        <p><strong>Имя клиента:</strong> {{ order.customer_name || 'N/A' }}</p>
        <p><strong>Email клиента:</strong> {{ order.customer_email || 'N/A' }}</p>
        <p><strong>Общая сумма:</strong> {{ order.total_amount ? `${order.total_amount} ₽` : 'N/A' }}</p>
        <p>
          <strong>Статус:</strong>
          <span :class="['status', getStatusClass(order.status)]">
            {{ order.status || 'N/A' }}
          </span>
        </p>
        <p><strong>Метод оплаты:</strong> {{ order.payment_method || 'N/A' }}</p>
        <p><strong>Метод доставки:</strong> {{ order.delivery_method || 'N/A' }}</p>
        <p><strong>Адрес доставки:</strong> {{ order.shipping_address || 'N/A' }}</p>
        <p><strong>Дата создания:</strong> {{ order.created_at || 'N/A' }}</p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/orders')">Вернуться к списку</button>
      </div>
    </div>
    <div v-else class="error-message">Не удалось загрузить данные о заказе.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: null,
      loading: true,
      errorMessage: null,
      backendUrl: 'http://localhost:3000',
    };
  },
  async created() {
    const orderId = this.$route.params.id;
    if (!/^\d+$/.test(orderId)) {
      this.errorMessage = 'Некорректный ID';
      this.loading = false;
      return;
    }
    await this.fetchOrder(orderId);
  },
  methods: {
    async fetchOrder(orderId) {
      try {
        const response = await fetch(`${this.backendUrl}/api/view-order/${orderId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          if (response.status === 404) {
            throw new Error('Заказ не найден');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.order = data;
      } catch (err) {
        console.error('Ошибка при получении данных заказа:', err);
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
    },
    getStatusClass(status) {
      switch (status) {
        case 'новый':
          return 'pending';
        case 'в обработке':
          return 'in-progress';
        case 'завершен':
          return 'completed';
        case 'отменен':
          return 'cancelled';
        default:
          return 'pending';
      }
    },
  },
};
</script>

<style scoped>
.order-details {
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

.order-info {
  text-align: center;
  width: 100%;
  word-wrap: break-word;
}

.order-info p {
  margin: 10px 0;
  color: #2d1b00;
  font-size: 1.25rem;
}

.order-info strong {
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

.status.pending {
  background: #ff8c00;
  color: #ffffff;
}

.status.in-progress {
  background: #e65100;
  color: #ffffff;
}

.status.completed {
  background: #2e7d32;
  color: #ffffff;
}

.status.cancelled {
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
  .order-details {
    padding: 15px;
  }

  .product-image-container .product-image {
    max-width: 120px;
    max-height: 120px;
  }

  .order-info p {
    font-size: 1rem;
  }
}
</style>