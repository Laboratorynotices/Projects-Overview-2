<script setup lang="ts">
// Правильно типизированные пропсы
const props = defineProps<{
  technologies: string[];
}>();

import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const currentIndex = ref(0);
const containerRef = ref<HTMLElement | null>(null);
const isAnimating = ref(false);
const autoplayInterval = ref<number | null>(null);

// Создаем расширенный массив с элементами-клонами для бесконечной прокрутки
const extendedItems = computed(() => {
  // Если элементов недостаточно, просто возвращаем исходный массив
  if (props.technologies.length <= 1) return props.technologies;

  // Иначе создаем массив с дублированием элементов для создания эффекта бесконечности
  // Добавляем последние элементы в начало и первые элементы в конец
  const cloneCount = Math.min(10, props.technologies.length);

  const prefix = props.technologies.slice(-cloneCount);
  const suffix = props.technologies.slice(0, cloneCount);

  return [...prefix, ...props.technologies, ...suffix];
});

// Смещение индекса из-за клонированных элементов
const indexOffset = computed(() => {
  return props.technologies.length <= 1
    ? 0
    : Math.min(5, props.technologies.length);
});

// Определение количества отображаемых элементов в зависимости от ширины экрана
const itemsPerView = ref(10);
const updateItemsPerView = () => {
  if (window.innerWidth < 640) {
    itemsPerView.value = 4;
  } else if (window.innerWidth < 1024) {
    itemsPerView.value = 6;
  } else if (window.innerWidth < 1280) {
    itemsPerView.value = 8;
  } else {
    itemsPerView.value = 10;
  }
};

// Общее количество элементов
const totalCount = computed(() => props.technologies.length);

// Реальный индекс для отображения (с учетом клонов)
const displayIndex = computed(() => currentIndex.value + indexOffset.value);

// Функция для перехода к следующему слайду
const nextSlide = () => {
  if (isAnimating.value || totalCount.value <= itemsPerView.value) return;

  isAnimating.value = true;

  if (currentIndex.value >= totalCount.value - 1) {
    // Переход от последнего к первому элементу
    // Сначала перемещаемся к клону
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }

  // Разрешаем следующую анимацию после завершения текущей
  setTimeout(() => {
    isAnimating.value = false;
  }, 1000);
};

// Функция для перехода к предыдущему слайду
const prevSlide = () => {
  if (isAnimating.value || totalCount.value <= itemsPerView.value) return;

  isAnimating.value = true;

  if (currentIndex.value <= 0) {
    // Переход от первого к последнему элементу
    // Сначала перемещаемся к клону
    currentIndex.value = totalCount.value - 1;
  } else {
    currentIndex.value--;
  }

  // Разрешаем следующую анимацию после завершения текущей
  setTimeout(() => {
    isAnimating.value = false;
  }, 300);
};

// Вычисляем трансформацию для карусели
const carouselTransform = computed(() => {
  // Если элементов меньше или равно количеству отображаемых элементов, не прокручиваем
  if (totalCount.value <= itemsPerView.value) {
    return "translateX(0)";
  }

  // Вычисляем ширину одного элемента в процентах
  const itemWidth = 100 / itemsPerView.value;
  const translateX = -displayIndex.value * itemWidth;

  return `translateX(${translateX}%)`;
});

// Настройка автоматического пролистывания
const startAutoplay = () => {
  if (autoplayInterval.value) clearInterval(autoplayInterval.value);
  autoplayInterval.value = window.setInterval(() => {
    nextSlide();
  }, 10000); // Прокрутка каждые 10 секунд
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

// Добавление обработчиков событий при монтировании компонента
onMounted(() => {
  updateItemsPerView();
  window.addEventListener("resize", updateItemsPerView);
  startAutoplay();
});

// Удаление обработчиков событий перед уничтожением компонента
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateItemsPerView);
  stopAutoplay();
});
</script>

<template>
  <!-- Задний фон блока -->
  <section
    id="technologiesSection"
    class="bg-gradient-to-br from-blue-700 to-blue-500 dark:from-blue-300 dark:to-blue-100 drop-shadow-2xl"
  >
    <!-- Основное поле блока будет посередине с неким отступом -->
    <div
      class="container mx-auto py-16 md:py-20 relative"
      ref="containerRef"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
    >
      <!-- Наша кастомная карусель -->
      <div class="carousel-container relative w-full px-10">
        <!-- Кнопка "Назад" -->
        <button
          @click="prevSlide"
          class="carousel-nav-button carousel-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 bg-[rgba(255,255,255,0.2)] text-[white] cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] rounded-[50%] border-[none] hover:bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(30,64,175,0.2)] dark:text-blue-800 dark:hover:bg-[rgba(30,64,175,0.4)]"
          aria-label="zurück"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Контейнер с картами -->
        <div class="carousel-track-container overflow-hidden">
          <div
            class="carousel-track flex transition-transform duration-1000 ease-in-out"
            :style="{ transform: carouselTransform }"
          >
            <div
              v-for="(technology, index) in extendedItems"
              :key="`tech-${index}`"
              class="carousel-slide flex-shrink-0"
              :style="{ width: `${100 / itemsPerView}%` }"
            >
              <div class="p-2">
                <TechnologyCard
                  :technology="technology"
                  mode="TechnologiesSection"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопка "Вперед" -->
        <button
          @click="nextSlide"
          class="carousel-nav-button carousel-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 bg-[rgba(255,255,255,0.2)] text-[white] cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] rounded-[50%] border-[none] hover:bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(30,64,175,0.2)] dark:text-blue-800 dark:hover:bg-[rgba(30,64,175,0.4)]"
          aria-label="vorwärts"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
