<template>
  <main>
    <div class="container">
      <h1 class="page-title">О нашем парфюмерном магазине</h1>

      <!-- Блок 1: Ассортимент ароматов -->
      <div class="content-block fade-in" ref="block1">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 text-block">
            <h2 class="text-2xl font-bold mb-4">Ассортимент ароматов</h2>
            <p class="fs-5">
              Широкий выбор парфюмов: от свежих цитрусовых до глубоких древесных нот. Eau de Parfum, Eau de Toilette и эксклюзивные композиции.
            </p>
          </div>
          <div class="md:w-1/2 image-block">
            <img src="/images/11.png" alt="Ассортимент ароматов" class="img-block">
          </div>
        </div>
      </div>

      <!-- Блок 2: Качество ингредиентов -->
      <div class="content-block fade-in" ref="block2">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 image-block order-2 md:order-1">
            <img src="/images/22.jpg" alt="Качество ингредиентов" class="img-block">
          </div>
          <div class="md:w-1/2 text-block order-1 md:order-2">
            <h2 class="text-2xl font-bold mb-4">Качество ингредиентов</h2>
            <p class="fs-5">
              Используем только натуральные масла и эссенции от ведущих мировых поставщиков для стойкости и уникальности аромата.
            </p>
          </div>
        </div>
      </div>

      <!-- Блок 3: Персональный подбор -->
      <div class="content-block fade-in" ref="block3">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 text-block">
            <h2 class="text-2xl font-bold mb-4">Персональный подбор</h2>
            <p class="fs-5">
              Наши консультанты помогут выбрать аромат, подходящий вашему стилю, настроению и событию.
            </p>
          </div>
          <div class="md:w-1/2 image-block">
            <img src="/images/33.png" alt="Персональный подбор" class="img-block">
          </div>
        </div>
      </div>

      <!-- Блок 4: Эксклюзивные коллекции -->
      <div class="content-block fade-in" ref="block4">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 image-block order-2 md:order-1">
            <img src="/images/44.jpg" alt="Эксклюзивные коллекции" class="img-block">
          </div>
          <div class="md:w-1/2 text-block order-1 md:order-2">
            <h2 class="text-2xl font-bold mb-4">Эксклюзивные коллекции</h2>
            <p class="fs-5">
              Уникальные лимитированные ароматы от известных парфюмерных домов для ценителей роскоши.
            </p>
          </div>
        </div>
      </div>

      <!-- Блок 5: Экологичность -->
      <div class="content-block fade-in" ref="block5">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 text-block">
            <h2 class="text-2xl font-bold mb-4">Экологичность</h2>
            <p class="fs-5">
              Упаковка из перерабатываемых материалов и экологически чистое производство для сохранения природы.
            </p>
          </div>
          <div class="md:w-1/2 image-block">
            <img src="/images/55.jpg" alt="Экологичность" class="img-block">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AboutPage',
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
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 2rem;
  text-align: center;
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.fs-5 {
  font-size: 1.25rem;
  color: #4b5563;
}

.text-center {
  text-align: center;
}

.content-block {
  margin-bottom: 3rem;
}

.text-block {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-2xl {
  font-size: 1.5rem;
  color: #1f2937;
}

.font-bold {
  font-weight: 700;
}

.mb-4 {
  margin-bottom: 1rem;
}

.image-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-block {
  max-width: 500px;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
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

  .img-block {
    max-width: 120px;
  }

  .fs-5 {
    font-size: 1rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }
}
</style>