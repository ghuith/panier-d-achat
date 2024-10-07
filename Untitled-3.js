// Classe Product
class Product {
  constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
  }
}

// Classe ShoppingCartItem
class ShoppingCartItem {
  constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
  }

  getTotalPrice() {
      return this.product.price * this.quantity;
  }
}

// Classe ShoppingCart
class ShoppingCart {
  constructor() {
      this.items = [];
  }

  addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.renderCart();
  }

  removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.renderCart();
  }

  getCartTotal() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  renderCart() {
      const cartItems = document.getElementById('cart-items');
      cartItems.innerHTML = ''; // Clear current items
      this.items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.product.name} x ${item.quantity} - ${item.getTotalPrice()} €`;
          const removeBtn = document.createElement('button');
          removeBtn.textContent = 'Supprimer';
          removeBtn.onclick = () => this.removeItem(item.product.id);
          li.appendChild(removeBtn);
          cartItems.appendChild(li);
      });
      document.getElementById('cart-total').textContent = this.getCartTotal();
  }
}

// Création de produits
const products = [
  new Product(1, 'Ordinateur Portable', 3000),
  new Product(2, 'Smartphone', 500),
  new Product(3, 'Casque Audio', 100)
];

// Initialiser le panier d'achat
const cart = new ShoppingCart();

// Ajouter les produits à la page
function renderProducts() {
  const productList = document.getElementById('product-list');
  products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = `${product.name} - ${product.price} €`;
      const addBtn = document.createElement('button');
      addBtn.textContent = 'Ajouter au panier';
      addBtn.onclick = () => cart.addItem(product);
      li.appendChild(addBtn);
      productList.appendChild(li);
  });
}




document.addEventListener('DOMContentLoaded', () => {
  renderProducts(); 
});


