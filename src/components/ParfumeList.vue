<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="app-container">
      <h1 class="page-title">Список парфюмов</h1>
      <div class="table-container">
        <table class="styled-table parfumes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Тип</th>
              <th>Объем (мл)</th>
              <th>Цена</th>
              <th>В наличии</th>
              <th>Описание</th>
              <th>Гендер</th>
              <th>Фото</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in parfumes" :key="item.id">
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ item.name || 'N/A' }}</td>
              <td>{{ item.type || 'N/A' }}</td>
              <td>{{ item.volume_ml || 'N/A' }}</td>
              <td>{{ item.price ? `${item.price} ₽` : 'N/A' }}</td>
              <td>
                <span :class="['status', getStatusClass(item.in_stock)]">
                  {{ item.in_stock ? 'В наличии' : 'Нет в наличии' }}
                </span>
              </td>
              <td>{{ item.description || 'N/A' }}</td>
              <td>{{ item.gender || 'N/A' }}</td>
              <td>
                <img v-if="item.photo" :src="`${backendUrl}${item.photo.replace('/img/', '/images/')}`" alt="Parfume Photo" class="product-image" />
                <span v-else>N/A</span>
              </td>
              <td>
                <div class="action-buttons">
                  <router-link :to="`/view-parfumes/${item.id}`" class="action-btn view-icon"><i class="fas fa-eye"></i></router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!parfumes.length" class="no-data">Нет парфюмов</p>
        <div class="pagination" v-if="totalPages > 1">
          <button @click="prevPage" :disabled="currentPage === 1">← Предыдущая</button>
          <span>Страница {{ currentPage }} из {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Следующая →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parfumes: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      backendUrl: 'http://localhost:3000',
    };
  },
  async created() {
    await this.fetchParfumes();
  },
  methods: {
    async fetchParfumes() {
      try {
        const response = await fetch(`${this.backendUrl}/api/parfumes?page=${this.currentPage}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.parfumes = data.parfumes || [];
        this.totalPages = data.totalPages || 0;
        this.currentPage = data.currentPage || 1;
      } catch (err) {
        console.error('Error fetching parfumes:', err);
        this.parfumes = [];
        this.totalPages = 0;
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchParfumes();
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchParfumes();
      }
    },
    getStatusClass(in_stock) {
      return in_stock ? 'available' : 'unavailable';
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #fff3e0, #ffcc80);
  color: #2d1b00;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2d1b00;
  background: linear-gradient(90deg, #ff8c00, #e65100);
  padding: 12px;
  border-radius: 12px;
}

.btn-primary {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: #ff8c00;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  background: #e65100;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
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

.table-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
  background: rgba(255, 245, 224, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.styled-table.parfumes-table {
  width: 100%;
  min-width: 600px;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.styled-table.parfumes-table th,
.styled-table.parfumes-table td {
  padding: 10px 8px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid rgba(230, 81, 0, 0.3);
  border-right: 1px solid rgba(230, 81, 0, 0.3);
  white-space: normal;
  word-break: break-word;
  color: #2d1b00;
  font-size: 0.85rem;
}

.styled-table.parfumes-table th {
  background: rgba(255, 204, 128, 0.3);
  color: #2d1b00;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.styled-table.parfumes-table th:last-child,
.styled-table.parfumes-table td:last-child {
  border-right: none;
}

.styled-table.parfumes-table tbody tr:last-child td {
  border-bottom: none;
}

.styled-table.parfumes-table tbody tr:nth-child(even) {
  background: rgba(255, 245, 224, 0.7);
}

.styled-table.parfumes-table tbody tr:hover {
  background: rgba(230, 81, 0, 0.1);
  transition: background 0.3s ease;
}

/* Специфичные ширины столбцов */
.styled-table.parfumes-table th:nth-child(1),
.styled-table.parfumes-table td:nth-child(1) { /* ID */
  width: 5%;
  min-width: 40px;
  max-width: 60px;
}

.styled-table.parfumes-table th:nth-child(2),
.styled-table.parfumes-table td:nth-child(2) { /* Название */
  width: 15%;
  min-width: 80px;
  max-width: 120px;
}

.styled-table.parfumes-table th:nth-child(3),
.styled-table.parfumes-table td:nth-child(3) { /* Тип */
  width: 10%;
  min-width: 60px;
  max-width: 100px;
}

.styled-table.parfumes-table th:nth-child(4),
.styled-table.parfumes-table td:nth-child(4) { /* Объем (мл) */
  width: 8%;
  min-width: 50px;
  max-width: 80px;
}

.styled-table.parfumes-table th:nth-child(5),
.styled-table.parfumes-table td:nth-child(5) { /* Цена */
  width: 10%;
  min-width: 60px;
  max-width: 100px;
}

.styled-table.parfumes-table th:nth-child(6),
.styled-table.parfumes-table td:nth-child(6) { /* В наличии */
  width: 10%;
  min-width: 80px;
  max-width: 120px;
}

.styled-table.parfumes-table th:nth-child(7),
.styled-table.parfumes-table td:nth-child(7) { /* Описание */
  width: 20%;
  min-width: 100px;
  max-width: 150px;
}

.styled-table.parfumes-table th:nth-child(8),
.styled-table.parfumes-table td:nth-child(8) { /* Гендер */
  width: 10%;
  min-width: 60px;
  max-width: 100px;
}

.styled-table.parfumes-table th:nth-child(9),
.styled-table.parfumes-table td:nth-child(9) { /* Фото */
  width: 8%;
  min-width: 60px;
  max-width: 80px;
}

.styled-table.parfumes-table th:nth-child(10),
.styled-table.parfumes-table td:nth-child(10) { /* Действия */
  width: 10%;
  min-width: 60px;
  max-width: 80px;
}

.product-image {
  max-width: 50px;
  max-height: 50px;
  border-radius: 8px;
  object-fit: cover;
  vertical-align: middle;
  border: 2px solid #fff5e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.no-data {
  text-align: center;
  font-size: 1.2rem;
  padding: 20px;
  color: #2d1b00;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  padding: 20px 0;
}

.pagination button {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: #ff8c00;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.pagination button:disabled {
  background: #d9a366;
  cursor: not-allowed;
  box-shadow: none;
}

.pagination button:hover:not(:disabled) {
  background: #e65100;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.pagination span {
  color: #2d1b00;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ff8c00;
  color: #ffffff;
  font-size: 1rem;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  background: #e65100;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.view-icon:hover {
  background: #2e7d32;
}

@media (max-width: 768px) {
  .app-container {
    padding: 15px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .table-container {
    padding: 10px;
  }

  .styled-table.parfumes-table th,
  .styled-table.parfumes-table td {
    padding: 6px;
    font-size: 0.8rem;
  }

  .parfumes-table th,
  .parfumes-table td {
    min-width: 30px;
  }

  .product-image {
    max-width: 40px;
    max-height: 40px;
  }

  .pagination button {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  .action-btn {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
}
</style>