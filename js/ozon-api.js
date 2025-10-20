// Ozon API интеграция для автоматической загрузки товаров
class OzonAPI {
  constructor() {
    this.apiUrl = 'https://api-seller.ozon.ru';
    this.clientId = ''; // Замените на ваш Client ID
    this.apiKey = ''; // Замените на ваш API Key
    this.products = [];
  }

  // Получение токена авторизации
  async getAuthToken() {
    try {
      const response = await fetch(`${this.apiUrl}/v1/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Ошибка получения токена:', error);
      return null;
    }
  }

  // Получение списка товаров
  async getProducts(limit = 50, offset = 0) {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('Не удалось получить токен авторизации');
      }

      const response = await fetch(`${this.apiUrl}/v2/product/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          filter: {
            visibility: 'ALL',
          },
          limit: limit,
          offset: offset,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result.items;
    } catch (error) {
      console.error('Ошибка получения товаров:', error);
      return [];
    }
  }

  // Получение детальной информации о товаре
  async getProductInfo(productId) {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('Не удалось получить токен авторизации');
      }

      const response = await fetch(`${this.apiUrl}/v2/product/info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Ошибка получения информации о товаре:', error);
      return null;
    }
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
      // Электротехника и освещение
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
      console.log('Начинаем загрузку товаров с Ozon...');
      
      const ozonProducts = await this.getProducts(20, 0);
      
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

      console.log(`Загружено ${transformedProducts.length} товаров с Ozon`);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
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
          <button class="btn btn-outline" data-open="${product.id}">Подробнее</button>
        </div>
      </article>`;
  }

  // Инициализация
  init() {
    // Проверяем, есть ли настройки API
    if (!this.clientId || !this.apiKey) {
      console.warn('Ozon API не настроен. Укажите clientId и apiKey в файле ozon-api.js');
      return;
    }

    // Загружаем товары при инициализации
    this.loadAndDisplayProducts();
  }
}

// Экспорт для использования в других файлах
window.OzonAPI = OzonAPI;
