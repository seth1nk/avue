<template>
  <main>
    <div class="container">
      <h1 class="page-title">Наши консультанты</h1>

      <!-- О сервисе -->
      <div class="content-block fade-in mb-12">
        <div class="text-block">
          <h2 class="text-2xl font-bold text-center mb-4">О нашем сервисе</h2>
          <p class="fs-5 text-center">
            Сервис "ПарфюмМастер" — это профессиональный подбор и продажа парфюмерии. Мы предлагаем широкий ассортимент ароматов от ведущих брендов и эксклюзивные коллекции.
          </p>
        </div>
      </div>

      <!-- Фотогалерея консультантов -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-center mb-6">Наши консультанты</h2>
        <div class="employees-row">
          <div class="employee-card photo-card fade-in" v-for="(employee, index) in employees" :key="index" :style="{ animationDelay: index * 0.2 + 's' }">
            <div class="card">
              <img :src="employee.image" :alt="employee.name" class="card-img-top">
              <div class="card-body">
                <h3 class="card-title">{{ employee.name }}</h3>
                <p class="card-text">{{ employee.role }}</p>
                <p class="card-text text-gray-600">Стаж: {{ employee.experience }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Услуги -->
      <div class="content-block fade-in">
        <div class="text-block">
          <h2 class="text-2xl font-bold text-center mb-6">Наши услуги</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center fade-in" :style="{ animationDelay: '0.2s' }">
            <h3 class="text-xl font-bold mb-2">+ Персональный подбор</h3>
            <p class="text-gray-600">Консультации по выбору аромата под ваш стиль и повод.</p>
          </div>
          <div class="text-center fade-in" :style="{ animationDelay: '0.4s' }">
            <h3 class="text-xl font-bold mb-2">+ Эксклюзивные ароматы</h3>
            <p class="text-gray-600">Лимитированные коллекции от известных парфюмерных домов.</p>
          </div>
          <div class="text-center fade-in" :style="{ animationDelay: '0.6s' }">
            <h3 class="text-xl font-bold mb-2">+ Доставка</h3>
            <p class="text-gray-600">Быстрая и надёжная доставка по всей стране.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      employees: [
        {
          name: 'Анна Петрова',
          role: 'Ведущий консультант по ароматам',
          experience: '6 лет',
          image: '/images/t1.png'
        },
        {
          name: 'Марина Соколова',
          role: 'Специалист по нишевым ароматам',
          experience: '4 года',
          image: '/images/t2.jpg'
        },
        {
          name: 'Елена Морозова',
          role: 'Старший менеджер по продажам',
          experience: '8 лет',
          image: '/images/t3.jpg'
        },
        {
          name: 'Татьяна Волкова',
          role: 'Консультант по мужским ароматам',
          experience: '3 года',
          image: '/images/t4.jpg'
        },
        {
          name: 'Ольга Новикова',
          role: 'Менеджер по клиентскому сервису',
          experience: '5 лет',
          image: '/images/t5.png'
        },
        {
          name: 'Виктор Лебедев',
          role: 'Специалист по унисекс-ароматам',
          experience: '2 года',
          image: '/images/t6.jpg'
        }
      ]
    };
  },
  mounted() {
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      this.$el.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
      });
    } catch (err) {
      console.error('Error setting up IntersectionObserver:', err);
    }
  }
}
</script>

<style scoped>
body {
  background: #e5e7eb;
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 2.5rem;
  text-align: center;
  background: #f3f4f6;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mb-12 {
  margin-bottom: 3rem;
}

.content-block {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-block {
  padding: 1rem;
}

.text-2xl {
  font-size: 1.5rem;
  color: #1f2937;
}

.font-bold {
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.fs-5 {
  font-size: 1.25rem;
  color: #4b5563;
}

.employees-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.employee-card {
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.employee-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.card {
  display: flex;
  flex-direction: column;
}

.card-img-top {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.card-body {
  padding: 1rem;
  text-align: center;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.875rem;
  color: #4b5563;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.gap-6 {
  gap: 1.5rem;
}

.text-xl {
  font-size: 1.25rem;
  color: #1f2937;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.text-gray-600 {
  color: #4b5563;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .card-img-top {
    height: 150px;
  }

  .fs-5 {
    font-size: 1rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }

  .text-xl {
    font-size: 1rem;
  }
}
</style>