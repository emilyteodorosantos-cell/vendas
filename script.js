document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o contador do carrinho
    let cartCount = 0;
    const cartCounterElement = document.getElementById('cart-count');

    // 2. Função para atualizar o contador
    function updateCartCount(count) {
        if (cartCounterElement) {
            cartCounterElement.textContent = count;
        }
    }

    // Tenta carregar o estado do carrinho do armazenamento local (se houver)
    function loadCart() {
        const storedCart = localStorage.getItem('simpleCart');
        if (storedCart) {
            // Se houver, atualiza o contador com o número de itens
            const cartItems = JSON.parse(storedCart);
            cartCount = cartItems.length;
            updateCartCount(cartCount);
            return cartItems;
        }
        return [];
    }

    // 3. Função para adicionar um item ao carrinho
    function addItemToCart(productName) {
        let cartItems = loadCart(); // Carrega o carrinho atual
        
        // Adiciona o novo item
        cartItems.push({ name: productName, id: Date.now() }); 
        
        // Salva de volta no armazenamento local
        localStorage.setItem('simpleCart', JSON.stringify(cartItems));
        
        // Atualiza o contador
        cartCount = cartItems.length;
        updateCartCount(cartCount);

        alert(`"${productName}" foi adicionado ao carrinho! Total: ${cartCount}`);
    }

    // 4. Adiciona listeners de evento aos botões "Ver no GitHub" nos cartões de produto
    const productCards = document.querySelectorAll('.produto-card');
    
    productCards.forEach(card => {
        // Encontra o botão (ou link) que você usaria para iniciar a "compra" ou ação
        const addButton = card.querySelector('.button-small'); 
        const productName = card.querySelector('h4').textContent;

        if (addButton) {
            addButton.addEventListener('click', (event) => {
                event.preventDefault(); // Impede o link de navegar imediatamente (se for um link)
                addItemToCart(productName);
            });
        }
    });

    // 5. Carrega o carrinho na inicialização da página
    loadCart();
});