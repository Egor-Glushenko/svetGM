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
  const catalogEl = document.getElementById('catalog');
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
          <button class="btn btn-outline" data-open="${p.id}">Подробнее</button>
        </div>
      </article>`;
  }

  function render(productsList) {
    if (!catalogEl) return;
    catalogEl.innerHTML = productsList.map(productCard).join('');
  }

  // Filter UI
  const search = document.getElementById('search');
  const category = document.getElementById('category');

  function applyFilters() {
    const q = (search && search.value || '').toLowerCase();
    const cat = category && category.value || 'all';
    const filtered = products.filter(p => (cat === 'all' || p.category === cat) && (!q || p.title.toLowerCase().includes(q)));
    render(filtered);
  }

  if (catalogEl) {
    render(products);
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

  function openModal(productId) {
    if (!modal || !modalContent) return;
    const p = products.find(x => x.id === productId);
    if (!p) return;
    modalContent.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:start">
        <img src="${p.img || 'https://via.placeholder.com/640x480?text=SVET+GM'}" alt="${p.title}" style="width:100%;border-radius:12px;border:1px solid var(--border)">
        <div>
          <h4 style="margin:0 0 8px">${p.title}</h4>
          <div class="price" style="margin-bottom:8px">${formatPrice(p.price, p.unit)}</div>
          <p style="color:var(--muted)">${p.specs}</p>
          <ul style="margin:10px 0;padding-left:18px;color:var(--muted)">
            <li>Гарантия 12 месяцев</li>
            <li>Возврат 14 дней</li>
            <li>Оплата МИР, СБП, безнал</li>
          </ul>
        </div>
      </div>`;
    modal.setAttribute('open', '');
  }
  function closeModal(){ if (modal) modal.removeAttribute('open'); }

  document.body.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.hasAttribute('data-close')) { closeModal(); }
    const openAttr = t.getAttribute('data-open');
    if (openAttr) { openModal(openAttr); }
    const card = t.closest('.product');
    if (card && card instanceof HTMLElement && !openAttr && t.tagName !== 'BUTTON') {
      const pid = card.getAttribute('data-id');
      if (pid) openModal(pid);
    }
    if (t.classList.contains('modal')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
