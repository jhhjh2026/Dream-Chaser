document.addEventListener('DOMContentLoaded', function () {
    // 首页图片轮播
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');

    if (carouselTrack && prevBtn && nextBtn) {
        let currentSlideIndex = 0;
        const totalSlides = indicators.length > 0 ? indicators.length : 3;
        let autoplayTimer = setInterval(nextSlide, 5000);

        function goToSlide(index) {
            currentSlideIndex = index;
            const translateX = -currentSlideIndex * 100;
            carouselTrack.style.transform = `translateX(${translateX}%)`;

            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentSlideIndex);
            });
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            goToSlide(currentSlideIndex);
        }

        function prevSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlideIndex);
        }

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });

        // 鼠标悬停暂停自动轮播
        carouselTrack.addEventListener('mouseenter', () => {
            clearInterval(autoplayTimer);
        });

        carouselTrack.addEventListener('mouseleave', () => {
            autoplayTimer = setInterval(nextSlide, 5000);
        });
    }

    // 项目展示轮播
    const carouselWrapper = document.querySelector('.xiangmu-carousel-wrapper');
    const projectsList = document.querySelector('.projects');
    const prevArrow = document.querySelector('.xiangmu-carousel-wrapper .arrow.prev');
    const nextArrow = document.querySelector('.xiangmu-carousel-wrapper .arrow.next');

    if (carouselWrapper && projectsList && prevArrow && nextArrow) {
        const cards = projectsList.querySelectorAll('.project-card');
        const cardWidth = 660; // 卡片宽度
        const totalCards = cards.length;
        let currentCardIndex = 0;
        let autoplayTimer = setInterval(nextCard, 6000);

        function goToCard(index) {
            currentCardIndex = index;
            const translateX = -currentCardIndex * cardWidth;
            projectsList.style.transform = `translateX(${translateX}px)`;
            projectsList.style.transition = 'transform 0.5s ease';
        }

        function nextCard() {
            currentCardIndex = (currentCardIndex + 1) % totalCards;
            goToCard(currentCardIndex);
        }

        function prevCard() {
            currentCardIndex = (currentCardIndex - 1 + totalCards) % totalCards;
            goToCard(currentCardIndex);
        }

        prevArrow.addEventListener('click', prevCard);
        nextArrow.addEventListener('click', nextCard);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') {
                prevCard();
            } else if (e.key === 'ArrowRight') {
                nextCard();
            }
        });

        // 鼠标悬停暂停自动轮播
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoplayTimer);
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            autoplayTimer = setInterval(nextCard, 6000);
        });
    }

    // 购物车功能
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const totalPrice = document.getElementById('totalPrice');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // 加载购物车
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('dc_cart') || '[]');
        console.log('加载购物车数据:', cart);

        // 计算商品总数量
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        console.log('计算总数量:', totalItems);

        cartCount.textContent = totalItems;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">购物车是空的</p>';
            totalPrice.textContent = '¥0.00';
            return;
        }

        let total = 0;
        cartItems.innerHTML = cart.map((item, index) => {
            total += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
                        <div class="cart-item-quantity">
                            <button onclick="updateQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeItem(${index})">删除</button>
                </div>
            `;
        }).join('');

        totalPrice.textContent = '¥' + total.toLocaleString();
    }

    // 添加商品到购物车
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = parseInt(this.dataset.id);
            const name = this.dataset.name;
            const price = parseInt(this.dataset.price);

            // 获取数量输入框的值
            const qtyInput = document.querySelector(`.qty-input[data-id="${id}"]`);
            let quantity = 0;
            if (qtyInput) {
                const val = parseInt(qtyInput.value);
                quantity = isNaN(val) ? 0 : val;
            }
            console.log('添加商品:', { id, name, price, quantity });

            // 检查数量是否大于0
            if (quantity <= 0) {
                alert('请先选择购买数量！');
                return;
            }

            const cart = JSON.parse(localStorage.getItem('dc_cart') || '[]');
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ id, name, price, quantity });
            }

            localStorage.setItem('dc_cart', JSON.stringify(cart));
            loadCart();

            // 按钮反馈
            this.textContent = '已添加';
            this.classList.add('added');
            setTimeout(() => {
                this.textContent = '加入购物车';
                this.classList.remove('added');
            }, 2000);

            // 重置数量为0
            if (qtyInput) {
                qtyInput.value = 0;
            }
        });
    });

    // 数量按钮事件
    const qtyButtons = document.querySelectorAll('.qty-btn');
    qtyButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = parseInt(this.dataset.id);
            const qtyInput = document.querySelector(`.qty-input[data-id="${id}"]`);
            if (!qtyInput) return;

            // 修复：0 也是有效的数量值，不能用 || 1
            let value = parseInt(qtyInput.value);
            if (isNaN(value)) value = 0;

            // 修复：最小数量应该是 0
            const min = parseInt(qtyInput.min);
            const minValue = isNaN(min) ? 0 : min;
            const max = parseInt(qtyInput.max) || 99;

            if (this.classList.contains('plus')) {
                value = Math.min(value + 1, max);
            } else {
                value = Math.max(value - 1, minValue);
            }

            qtyInput.value = value;
            console.log('数量变化:', id, '新值:', value);
        });
    });

    // 更新数量
    window.updateQuantity = function (index, delta) {
        const cart = JSON.parse(localStorage.getItem('dc_cart') || '[]');
        cart[index].quantity += delta;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        localStorage.setItem('dc_cart', JSON.stringify(cart));
        loadCart();
    }

    // 删除商品
    window.removeItem = function (index) {
        const cart = JSON.parse(localStorage.getItem('dc_cart') || '[]');
        cart.splice(index, 1);
        localStorage.setItem('dc_cart', JSON.stringify(cart));
        loadCart();
    }

    // 打开购物车
    cartButton?.addEventListener('click', () => {
        cartModal.classList.add('active');
        loadCart();
    });

    // 关闭购物车
    closeCart?.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    // 点击遮罩关闭购物车
    cartModal?.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // 结算
    checkoutBtn?.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('dc_cart') || '[]');
        if (cart.length === 0) {
            alert('购物车是空的！');
            return;
        }

        // 模拟结算
        alert('感谢您的购买！订单已提交成功。');
        localStorage.removeItem('dc_cart');
        cartModal.classList.remove('active');
        loadCart();
    });

    // 初始化购物车计数
    loadCart();
});