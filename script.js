const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
  const products = document.querySelectorAll('.product');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const activeFilters = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      products.forEach(product => {
        const matches = activeFilters.length === 0 || activeFilters.some(filter => product.classList.contains(filter));
        product.style.display = matches ? 'flex' : 'none';
      });
    });
});

const cart = document.querySelector('.cart');
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  const cartToggle = document.querySelector('.cart-toggle');

  let total = 0;

  // Função para atualizar o total
  function updateTotal() {
    let soma = 0;
    cartItems.querySelectorAll('li').forEach(item => {
      soma += parseFloat(item.dataset.price);
    });
    total = soma;
    cartTotal.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
  }

  // Função para criar um item no carrinho
  function createCartItem(name, price, imgSrc) {
    const li = document.createElement('li');
    li.dataset.price = price;

    li.innerHTML = `
      <div class="cart-item-info">
        <img src="${imgSrc}" alt="${name}" />
        <span class="cart-item-name">${name}</span>
        <span class="cart-item-price">R$ ${price.toFixed(2).replace('.', ',')}</span>
      </div>
      <button class="remove-item-btn">x</button>
    `;

    // Evento para remover o item
    li.querySelector('.remove-item-btn').addEventListener('click', () => {
      li.remove();
      updateTotal();
    });

    return li;
  }

  // Adiciona produto ao carrinho ao clicar no botão
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const product = button.closest('.product');
      const name = product.querySelector('h3').textContent;
      const priceText = product.querySelector('p').textContent;
      const price = parseFloat(priceText.replace('R$', '').replace(',', '.'));
      const imgSrc = product.querySelector('img').src;

      const item = createCartItem(name, price, imgSrc);
      cartItems.appendChild(item);

      updateTotal();
      if(cart.style.display === 'none') {
        cart.style.display = 'flex';
        cartToggle.textContent = '−';
      }
    });
  });

  // Toggle para minimizar/maximizar o carrinho
  cartToggle.addEventListener('click', () => {
    if (cartItems.style.display !== 'none') {
      cartItems.style.display = 'none';
      cartTotal.style.display = 'none';
      document.querySelector('.checkout-btn').style.display = 'none';
      cartToggle.textContent = '+';
    } else {
      cartItems.style.display = 'block';
      cartTotal.style.display = 'block';
      document.querySelector('.checkout-btn').style.display = 'block';
      cartToggle.textContent = '−';
    }
  });

  const modal = document.getElementById('productModal');
  const modalImg = modal.querySelector('.modal-img');
  const modalTitle = modal.querySelector('.modal-title');
  const modalIngredients = modal.querySelector('.modal-ingredients');
  const modalPrice = modal.querySelector('.modal-price');
  const closeModal = modal.querySelector('.close-modal');

  // Abrir o modal ao clicar em qualquer produto
  document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', (e) => {
      // Evita abrir o modal ao clicar no botão de "Adicionar"
      if (e.target.classList.contains('add-to-cart')) return;

      const name = product.querySelector('h3').textContent;
      const price = product.querySelector('p').textContent;
      const imgSrc = product.querySelector('img').src;
      const ingredientes = product.dataset.ingredientes || 'Ingredientes não informados';

      modalImg.src = imgSrc;
      modalImg.alt = name;
      modalTitle.textContent = name;
      modalPrice.textContent = price;
      modalIngredients.textContent = ingredientes;

      modal.classList.remove('hidden');
    });
  });

  // Fechar o modal
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Fechar ao clicar fora do conteúdo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
  
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let timer;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (current - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  document.querySelector('.arrow.right').addEventListener('click', () => {
    nextSlide();
    resetTimer();
  });

  document.querySelector('.arrow.left').addEventListener('click', () => {
    prevSlide();
    resetTimer();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      showSlide(parseInt(e.target.dataset.index));
      resetTimer();
    });
  });

  function startTimer() {
    timer = setInterval(nextSlide, 10000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  startTimer();
