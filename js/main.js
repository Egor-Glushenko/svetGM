// Basic utilities
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Инициализация Ozon API (демо-версия)
  if (typeof DemoOzonAPI !== 'undefined') {
    const ozonAPI = new DemoOzonAPI();
    ozonAPI.init();
  }

  // Catalog rendering (expanded dataset)
  const products = [
    // Светодиодные лампы
    { id: 'p1', title: 'LED лампа E27 10Вт 4000К', price: 149, category: 'led', img: '', specs: 'Цвет 4000К, световой поток 900 лм, ресурс 30 000 ч.' },
    { id: 'p2', title: 'LED лампа GU10 7Вт 3000К', price: 139, category: 'led', img: '', specs: 'Угол 38°, тёплый свет 3000К, CRI 80+.' },
    { id: 'p3', title: 'LED лампа E14 5Вт 2700К', price: 89, category: 'led', img: '', specs: 'Тёплый белый свет, матовое стекло, энергосберегающая.' },
    { id: 'p4', title: 'LED лента 12В 60LED/м', price: 299, unit: 'м', category: 'led', img: '', specs: 'RGB, влагозащита IP65, самоклеящаяся основа.' },
    { id: 'p5', title: 'LED драйвер 12В 5А', price: 450, category: 'led', img: '', specs: 'Постоянный ток, защита от КЗ, КПД 90%.' },
    
    // Кабель и провод
    { id: 'p6', title: 'Кабель ВВГнг-LS 3x2.5', price: 89, unit: 'м', category: 'cable', img: '', specs: 'Медный, не распространяет горение, малодымный.' },
    { id: 'p7', title: 'Кабель NYM 3x1.5', price: 75, unit: 'м', category: 'cable', img: '', specs: 'Медные жилы, двойная изоляция, для стационарной проводки.' },
    { id: 'p8', title: 'Провод ПВС 3x2.5', price: 65, unit: 'м', category: 'cable', img: '', specs: 'Гибкий, для удлинителей и переносок.' },
    { id: 'p9', title: 'Кабель ШВВП 2x0.75', price: 25, unit: 'м', category: 'cable', img: '', specs: 'Плоский, для бытовых приборов.' },
    { id: 'p10', title: 'Кабель КГ 3x2.5', price: 120, unit: 'м', category: 'cable', img: '', specs: 'Гибкий, для сварочных работ, УФ-стойкий.' },
    
    // Выключатели и розетки
    { id: 'p11', title: 'Выключатель проходной, белый', price: 259, category: 'switches', img: '', specs: 'Проходной, 10А, IP20, скрытый монтаж.' },
    { id: 'p12', title: 'Розетка с заземлением, белая', price: 199, category: 'switches', img: '', specs: '16А, шторки, скрытый монтаж.' },
    { id: 'p13', title: 'Розетка USB 2.1А', price: 890, category: 'switches', img: '', specs: 'Двойной USB, быстрая зарядка, защита от перегрузки.' },
    { id: 'p14', title: 'Выключатель с подсветкой', price: 320, category: 'switches', img: '', specs: 'LED подсветка, ночной режим, энергосбережение.' },
    { id: 'p15', title: 'Розетка наружная IP44', price: 450, category: 'switches', img: '', specs: 'Влагозащищённая, для улицы, ударопрочная.' },
    
    // Автоматика
    { id: 'p16', title: 'Автоматический выключатель 16А C', price: 229, category: 'automation', img: '', specs: '1P, характеристика C, 4.5 кА.' },
    { id: 'p17', title: 'УЗО 25А 30мА', price: 1190, category: 'automation', img: '', specs: '2P, чувствительность 30 мА, защита от утечки.' },
    { id: 'p18', title: 'Дифференциальный автомат 16А', price: 1450, category: 'automation', img: '', specs: '1P+N, 30мА, защита от КЗ и утечки.' },
    { id: 'p19', title: 'Реле напряжения 220В', price: 890, category: 'automation', img: '', specs: 'Защита от скачков, настройка диапазона.' },
    { id: 'p20', title: 'Таймер электронный', price: 650, category: 'automation', img: '', specs: 'Программируемый, 7 дней, 16 программ.' },
    
    // Светильники
    { id: 'p21', title: 'LED панель 36Вт 4000К', price: 1290, category: 'fixtures', img: '', specs: 'Потолочная, 4000К, 3600 лм, для офиса.' },
    { id: 'p22', title: 'Настольная лампа LED', price: 890, category: 'fixtures', img: '', specs: 'Регулируемая яркость, USB-порт, тёплый свет.' },
    { id: 'p23', title: 'Бра настенное LED', price: 650, category: 'fixtures', img: '', specs: 'Сенсорное управление, диммирование, 3000К.' },
    { id: 'p24', title: 'Точечный светильник GU10', price: 320, category: 'fixtures', img: '', specs: 'Поворотный, влагозащита IP44, 5Вт.' },
    { id: 'p25', title: 'Люстра LED 24Вт', price: 1890, category: 'fixtures', img: '', specs: 'Потолочная, дистанционное управление, RGB.' },
    
    // Уличное освещение
    { id: 'p26', title: 'LED прожектор 30Вт', price: 1290, category: 'outdoor', img: '', specs: 'Уличный, IP65, датчик движения, 3000К.' },
    { id: 'p27', title: 'Садовый фонарь LED', price: 450, category: 'outdoor', img: '', specs: 'Солнечная батарея, автономная работа.' },
    { id: 'p28', title: 'Настенный уличный светильник', price: 890, category: 'outdoor', img: '', specs: 'IP65, датчик освещённости, 20Вт.' },
    { id: 'p29', title: 'LED лента уличная 12В', price: 399, unit: 'м', category: 'outdoor', img: '', specs: 'IP67, RGB, для фасадов и ландшафта.' },
    { id: 'p30', title: 'Столб уличный LED', price: 2890, category: 'outdoor', img: '', specs: 'Высота 3м, 50Вт, автономная работа.' }
  ];

  // Корзина
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  function formatPrice(p, unit) { return new Intl.NumberFormat('ru-RU').format(p) + ' ₽' + (unit ? ' / ' + unit : ''); }

  function productCard(p) {
    const img = p.img || 'https://via.placeholder.com/640x480?text=SVET+GM';
    return `
      <article class="product" data-id="${p.id}" data-category="${p.category}" tabindex="0" role="button" aria-label="Подробнее о товаре ${p.title}">
        <img src="${img}" alt="${p.title}">
        <div class="p-body">
          <div class="badge">В наличии</div>
          <h3>${p.title}</h3>
          <div class="price">${formatPrice(p.price, p.unit)}</div>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button class="btn btn-outline" data-open="${p.id}" style="flex: 1;">Подробнее</button>
            <button class="btn btn-primary" data-add-cart="${p.id}" style="flex: 1;">В корзину</button>
          </div>
        </div>
      </article>`;
  }

  // Отображение товаров по категориям
  function renderByCategories() {
    const categories = {
      'led': 'catalog-led',
      'cable': 'catalog-cable',
      'switches': 'catalog-switches',
      'automation': 'catalog-automation',
      'fixtures': 'catalog-fixtures',
      'outdoor': 'catalog-outdoor'
    };

    Object.keys(categories).forEach(cat => {
      const container = document.getElementById(categories[cat]);
      if (container) {
        const categoryProducts = products.filter(p => p.category === cat);
        container.innerHTML = categoryProducts.map(productCard).join('');
      }
    });

    // Общий каталог (для фильтра)
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.innerHTML = products.map(productCard).join('');
    }
  }

  // Обновление счетчика корзины
  function updateCartCount() {
    const cartCounts = document.querySelectorAll('#cart-count');
    cartCounts.forEach(cartCount => {
      if (cartCount) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (total > 0) {
          cartCount.textContent = total;
          cartCount.style.display = 'flex';
        } else {
          cartCount.style.display = 'none';
        }
      }
    });
  }

  // Сохранение корзины
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  // Добавление товара в корзину
  function addToCart(productId, event) {
    let product = products.find(p => p.id === productId);
    
    // Если товар не найден в массиве, пытаемся получить из DOM (для товаров из Ozon)
    if (!product) {
      const productEl = document.querySelector(`[data-id="${productId}"]`);
      if (productEl) {
        const titleEl = productEl.querySelector('h3');
        const priceEl = productEl.querySelector('.price');
        if (titleEl && priceEl) {
          const title = titleEl.textContent;
          const priceText = priceEl.textContent.replace(/[^\d]/g, '');
          const price = parseInt(priceText) || 0;
          product = {
            id: productId,
            title: title,
            price: price,
            unit: '',
            category: productEl.dataset.category || ''
          };
        }
      }
    }
    
    if (!product) {
      console.error('Товар не найден:', productId);
      return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        unit: product.unit || '',
        quantity: 1
      });
    }
    saveCart();
    
    // Показываем уведомление
    if (event && event.target) {
      const btn = event.target;
      const originalText = btn.textContent;
      btn.textContent = '✓ Добавлено';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    }
  }

  // Удаление товара из корзины
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
  }

  // Изменение количества товара
  function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta);
      if (item.quantity === 0) {
        removeFromCart(productId);
      } else {
        saveCart();
      }
    }
  }

  // Отображение корзины
  function renderCart() {
    const cartContent = document.getElementById('cart-content');
    if (!cartContent) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const minOrder = 1500;

    if (cart.length === 0) {
      cartContent.innerHTML = '<p style="text-align: center; color: var(--muted); padding: 40px 0;">Корзина пуста</p>';
      return;
    }

    cartContent.innerHTML = `
      <div style="display: grid; gap: 16px;">
        ${cart.map(item => `
          <div style="display: flex; gap: 16px; padding: 16px; background: var(--bg-soft); border-radius: 12px; align-items: center;">
            <div style="flex: 1;">
              <h4 style="margin: 0 0 8px;">${item.title}</h4>
              <div class="price" style="margin: 0;">${formatPrice(item.price, item.unit)}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button class="btn btn-outline" style="width: 32px; height: 32px; padding: 0;" data-dec="${item.id}">-</button>
              <span style="min-width: 40px; text-align: center; font-weight: 600;">${item.quantity}</span>
              <button class="btn btn-outline" style="width: 32px; height: 32px; padding: 0;" data-inc="${item.id}">+</button>
            </div>
            <div style="min-width: 100px; text-align: right;">
              <div class="price">${formatPrice(item.price * item.quantity)}</div>
            </div>
            <button class="btn btn-outline" style="width: 32px; height: 32px; padding: 0;" data-remove="${item.id}" aria-label="Удалить">✕</button>
          </div>
        `).join('')}
        <div style="padding: 20px; background: var(--gradient-soft); border-radius: 12px; border: 2px solid var(--brand);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <strong style="font-size: 18px;">Итого:</strong>
            <div class="price" style="font-size: 24px;">${formatPrice(total)}</div>
          </div>
          ${total < minOrder ? `
            <p style="color: var(--err); margin: 0 0 16px; font-weight: 600;">
              Минимальная сумма заказа: ${formatPrice(minOrder)}. 
              Осталось добавить товаров на ${formatPrice(minOrder - total)}
            </p>
          ` : ''}
          <button id="checkout-btn" class="btn btn-primary" style="width: 100%;" ${total < minOrder ? 'disabled' : ''}>
            Оформить заказ
          </button>
        </div>
      </div>
    `;

    // Обработчики для кнопок в корзине
    cartContent.querySelectorAll('[data-inc]').forEach(btn => {
      btn.addEventListener('click', () => updateQuantity(btn.dataset.inc, 1));
    });
    cartContent.querySelectorAll('[data-dec]').forEach(btn => {
      btn.addEventListener('click', () => updateQuantity(btn.dataset.dec, -1));
    });
    cartContent.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
    });

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn && total >= minOrder) {
      checkoutBtn.addEventListener('click', () => openCheckoutForm());
    }
  }

  // Открытие формы оформления заказа
  function openCheckoutForm() {
    const cartContent = document.getElementById('cart-content');
    if (!cartContent) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartContent.innerHTML = `
      <form id="checkout-form" style="display: grid; gap: 16px;">
        <h4 style="margin: 0 0 16px;">Данные для оформления заказа</h4>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">ФИО *</label>
          <input type="text" name="name" required style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border);">
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Телефон *</label>
          <input type="tel" name="phone" required placeholder="+7 (___) ___-__-__" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border);">
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Email *</label>
          <input type="email" name="email" required style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border);">
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Адрес доставки *</label>
          <textarea name="address" required rows="3" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border); resize: vertical;"></textarea>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Комментарий</label>
          <textarea name="comment" rows="3" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border); resize: vertical;"></textarea>
        </div>
        <div style="padding: 16px; background: var(--bg-soft); border-radius: 8px;">
          <strong>Сумма заказа: ${formatPrice(total)}</strong>
        </div>
        <div style="display: flex; gap: 12px;">
          <button type="button" class="btn btn-outline" id="back-to-cart" style="flex: 1;">Назад к корзине</button>
          <button type="submit" class="btn btn-primary" style="flex: 1;">Отправить заказ</button>
        </div>
      </form>
    `;

    // Обработчик возврата к корзине
    const backBtn = document.getElementById('back-to-cart');
    if (backBtn) {
      backBtn.addEventListener('click', () => renderCart());
    }

    // Обработчик отправки формы
    const form = document.getElementById('checkout-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitOrder(form);
      });
    }
  }

  // Отправка заказа на почту
  async function submitOrder(form) {
    const formData = new FormData(form);
    const orderData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address'),
      comment: formData.get('comment') || '',
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toLocaleString('ru-RU')
    };

    // Отправка через EmailJS или FormSubmit
    // Для продакшена нужно настроить EmailJS или использовать серверный endpoint
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    try {
      // Используем FormSubmit (бесплатный сервис для отправки форм)
      const response = await fetch('https://formsubmit.co/ajax/info@svetgm.ru', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: orderData.name,
          phone: orderData.phone,
          email: orderData.email,
          address: orderData.address,
          comment: orderData.comment,
          subject: `Новый заказ от ${orderData.name}`,
          message: `
Новый заказ с сайта Свет GM

Данные клиента:
ФИО: ${orderData.name}
Телефон: ${orderData.phone}
Email: ${orderData.email}
Адрес доставки: ${orderData.address}
${orderData.comment ? `Комментарий: ${orderData.comment}` : ''}

Товары:
${orderData.items.map(item => `- ${item.title} (${item.quantity} шт.) - ${formatPrice(item.price * item.quantity, item.unit)}`).join('\n')}

Итого: ${formatPrice(orderData.total)}

Дата заказа: ${orderData.date}
          `.trim()
        })
      });

      if (response.ok) {
        alert('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
        cart = [];
        saveCart();
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) cartModal.removeAttribute('open');
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка отправки заказа:', error);
      alert('Произошла ошибка при отправке заказа. Пожалуйста, свяжитесь с нами по телефону или через Telegram.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  // Инициализация отображения
  if (document.getElementById('catalog-led')) {
    renderByCategories();
  }
  updateCartCount();

  // Filter UI
  const search = document.getElementById('search');
  const category = document.getElementById('category');

  function applyFilters() {
    const q = (search && search.value || '').toLowerCase();
    const cat = category && category.value || 'all';
    const filtered = products.filter(p => (cat === 'all' || p.category === cat) && (!q || p.title.toLowerCase().includes(q)));
    
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.innerHTML = filtered.map(productCard).join('');
    }
  }

  if (search) search.addEventListener('input', applyFilters);
  if (category) category.addEventListener('change', applyFilters);

  // Обработчик кнопки загрузки с Ozon
  const loadOzonBtn = document.getElementById('load-ozon');
  if (loadOzonBtn) {
    loadOzonBtn.addEventListener('click', async () => {
      if (typeof DemoOzonAPI === 'undefined') {
        alert('Ozon API не подключен. Проверьте файл demo-ozon.js');
        return;
      }

      const ozonAPI = new DemoOzonAPI();
      loadOzonBtn.textContent = '⏳ Загрузка...';
      loadOzonBtn.disabled = true;

      try {
        await ozonAPI.loadAndDisplayProducts();
        loadOzonBtn.textContent = '✅ Загружено';
        setTimeout(() => {
          loadOzonBtn.textContent = '🔄 Загрузить с Ozon';
          loadOzonBtn.disabled = false;
        }, 2000);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        loadOzonBtn.textContent = '❌ Ошибка';
        setTimeout(() => {
          loadOzonBtn.textContent = '🔄 Загрузить с Ozon';
          loadOzonBtn.disabled = false;
        }, 2000);
      }
    });
  }

  // Modal logic
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const cartModal = document.getElementById('cart-modal');

  function openModal(productId) {
    if (!modal || !modalContent) return;
    let p = products.find(x => x.id === productId);
    
    // Если товар не найден в массиве, пытаемся получить из DOM (для товаров из Ozon)
    if (!p) {
      const productEl = document.querySelector(`[data-id="${productId}"]`);
      if (productEl) {
        const titleEl = productEl.querySelector('h3');
        const priceEl = productEl.querySelector('.price');
        const imgEl = productEl.querySelector('img');
        const stockEl = productEl.querySelector('.stock');
        const ratingEl = productEl.querySelector('.rating');
        if (titleEl && priceEl) {
          const title = titleEl.textContent;
          const priceText = priceEl.textContent.replace(/[^\d]/g, '');
          const price = parseInt(priceText) || 0;
          p = {
            id: productId,
            title: title,
            price: price,
            unit: '',
            img: imgEl ? imgEl.src : '',
            specs: stockEl ? stockEl.textContent : 'Товар с Ozon',
            stock: stockEl ? stockEl.textContent : '',
            rating: ratingEl ? ratingEl.textContent : ''
          };
        }
      }
    }
    
    if (!p) return;
    
    modalContent.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:start">
        <img src="${p.img || 'https://via.placeholder.com/640x480?text=SVET+GM'}" alt="${p.title}" style="width:100%;border-radius:12px;border:1px solid var(--border)">
        <div>
          <h4 style="margin:0 0 8px">${p.title}</h4>
          <div class="price" style="margin-bottom:8px">${formatPrice(p.price, p.unit)}</div>
          ${p.stock ? `<div style="margin-bottom:8px;color:var(--muted)">${p.stock}</div>` : ''}
          ${p.rating ? `<div style="margin-bottom:8px;color:var(--brand)">${p.rating}</div>` : ''}
          <p style="color:var(--muted)">${p.specs}</p>
          <ul style="margin:10px 0;padding-left:18px;color:var(--muted)">
            <li>Гарантия 12 месяцев</li>
            <li>Возврат 14 дней</li>
            <li>Оплата МИР, СБП, безнал</li>
          </ul>
          <button class="btn btn-primary" data-add-cart="${p.id}" style="width: 100%; margin-top: 16px;">Добавить в корзину</button>
        </div>
      </div>`;
    modal.setAttribute('open', '');
  }
  
  function closeModal(){ if (modal) modal.removeAttribute('open'); }
  function openCartModal(){ if (cartModal) { renderCart(); cartModal.setAttribute('open', ''); } }
  function closeCartModal(){ if (cartModal) cartModal.removeAttribute('open'); }

  // Обработчик кнопки корзины
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', openCartModal);
  }

  document.body.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    
    // Закрытие модальных окон
    if (t.hasAttribute('data-close')) { closeModal(); }
    if (t.hasAttribute('data-close-cart')) { closeCartModal(); }
    if (t.classList.contains('modal')) { closeModal(); closeCartModal(); }
    
    // Открытие модального окна товара
    const openAttr = t.getAttribute('data-open');
    if (openAttr) { openModal(openAttr); }
    
    // Добавление в корзину
    const addCartAttr = t.getAttribute('data-add-cart');
    if (addCartAttr) { 
      addToCart(addCartAttr, e);
      closeModal();
    }
    
    // Клик по карточке товара
    const card = t.closest('.product');
    if (card && card instanceof HTMLElement && !openAttr && t.tagName !== 'BUTTON' && !addCartAttr) {
      const pid = card.getAttribute('data-id');
      if (pid) openModal(pid);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeCartModal(); }
  });
});
