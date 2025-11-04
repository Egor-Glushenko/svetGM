// Демонстрационные данные Ozon для тестирования
// Этот файл содержит примеры товаров, которые могут прийти с Ozon API

const demoOzonProducts = [
  {
    product_id: 'ozon_demo_1',
    name: 'LED лампа E27 12Вт 4000К Ozon',
    price: '159',
    category_id: '17030971',
    primary_image: 'https://via.placeholder.com/300x300?text=LED+OZON',
    description: 'Энергоэффективная светодиодная лампа с холодным белым светом',
    offer_id: 'OZON_001',
    stock: 15,
    rating: 4.8
  },
  {
    product_id: 'ozon_demo_2',
    name: 'Кабель ВВГнг-LS 3x2.5 Ozon',
    price: '95',
    category_id: '17030975',
    primary_image: 'https://via.placeholder.com/300x300?text=CABLE+OZON',
    description: 'Медный кабель с негорючей изоляцией',
    offer_id: 'OZON_002',
    stock: 8,
    rating: 4.6
  },
  {
    product_id: 'ozon_demo_3',
    name: 'Выключатель проходной Ozon',
    price: '299',
    category_id: '17030974',
    primary_image: 'https://via.placeholder.com/300x300?text=SWITCH+OZON',
    description: 'Проходной выключатель для управления освещением из двух мест',
    offer_id: 'OZON_003',
    stock: 12,
    rating: 4.7
  },
  {
    product_id: 'ozon_demo_4',
    name: 'Автоматический выключатель 16А Ozon',
    price: '249',
    category_id: '17030976',
    primary_image: 'https://via.placeholder.com/300x300?text=AUTOMATION+OZON',
    description: 'Защитный автомат для электросети',
    offer_id: 'OZON_004',
    stock: 6,
    rating: 4.9
  },
  {
    product_id: 'ozon_demo_5',
    name: 'LED панель 36Вт Ozon',
    price: '1390',
    category_id: '17030972',
    primary_image: 'https://via.placeholder.com/300x300?text=PANEL+OZON',
    description: 'Потолочная LED панель для офиса',
    offer_id: 'OZON_005',
    stock: 4,
    rating: 4.5
  }
];

// Демонстрационный класс Ozon API для тестирования
class DemoOzonAPI {
  constructor() {
    this.products = [];
  }

  // Имитация получения токена
  async getAuthToken() {
    return 'demo_token_12345';
  }

  // Имитация получения товаров
  async getProducts(limit = 50, offset = 0) {
    // Имитируем задержку API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return demoOzonProducts.slice(offset, offset + limit);
  }

  // Преобразование товара Ozon в формат сайта
  transformProduct(ozonProduct) {
    return {
      id: `ozon_${ozonProduct.product_id}`,
      title: ozonProduct.name || 'Товар без названия',
      price: ozonProduct.price ? parseFloat(ozonProduct.price) : 0,
      category: this.mapCategory(ozonProduct.category_id),
      img: ozonProduct.primary_image || '',
      specs: ozonProduct.description || 'Описание отсутствует',
      source: 'ozon',
      ozonId: ozonProduct.product_id,
      sku: ozonProduct.offer_id,
      stock: ozonProduct.stock || 0,
      rating: ozonProduct.rating || 0,
    };
  }

  // Маппинг категорий Ozon на категории сайта
  mapCategory(ozonCategoryId) {
    const categoryMap = {
      '17030971': 'led', // Светодиодные лампы
      '17030972': 'fixtures', // Светильники
      '17030973': 'outdoor', // Уличное освещение
      '17030974': 'switches', // Выключатели и розетки
      '17030975': 'cable', // Кабель и провод
      '17030976': 'automation', // Автоматика
    };

    return categoryMap[ozonCategoryId] || 'other';
  }

  // Загрузка и отображение товаров
  async loadAndDisplayProducts() {
    try {
      console.log('🔄 Загружаем демо-товары с Ozon...');
      
      const ozonProducts = await this.getProducts(5, 0);
      
      if (ozonProducts.length === 0) {
        console.log('Товары с Ozon не найдены');
        return;
      }

      // Преобразуем товары в формат сайта
      const transformedProducts = ozonProducts.map(product => 
        this.transformProduct(product)
      );

      // Добавляем товары к существующим
      this.products = [...this.products, ...transformedProducts];

      // Обновляем каталог на странице
      this.updateCatalog(transformedProducts);

      console.log(`✅ Загружено ${transformedProducts.length} демо-товаров с Ozon`);
    } catch (error) {
      console.error('❌ Ошибка загрузки товаров:', error);
    }
  }

  // Обновление каталога на странице
  updateCatalog(newProducts) {
    const catalogEl = document.getElementById('catalog');
    if (!catalogEl) return;

    // Создаем карточки товаров
    const productCards = newProducts.map(product => this.createProductCard(product));
    
    // Добавляем к существующему контенту
    catalogEl.insertAdjacentHTML('beforeend', productCards.join(''));
  }

  // Создание HTML карточки товара
  createProductCard(product) {
    const img = product.img || 'https://via.placeholder.com/640x480?text=OZON';
    const price = new Intl.NumberFormat('ru-RU').format(product.price) + ' ₽';
    
    return `
      <article class="product" data-id="${product.id}" data-category="${product.category}" data-source="ozon" tabindex="0" role="button" aria-label="Подробнее о товаре ${product.title}">
        <img src="${img}" alt="${product.title}" loading="lazy">
        <div class="p-body">
          <div class="badge">Ozon</div>
          <h3>${product.title}</h3>
          <div class="price">${price}</div>
          <div class="stock">Остаток: ${product.stock} шт.</div>
          <div class="rating">⭐ ${product.rating}</div>
          <button class="btn btn-outline" data-open="${product.id}">Подробнее</button>
        </div>
      </article>`;
  }

  // Инициализация
  init() {
    console.log('🎯 Демо-режим Ozon API активирован');
  }
}

// Экспорт для использования
window.DemoOzonAPI = DemoOzonAPI;

