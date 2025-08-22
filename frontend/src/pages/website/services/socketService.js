// socket.js
import io from 'socket.io-client';

// Initialize socket connection
const socket = io(import.meta.env.VITE_API_BASE_URL);  // or just io() if same origin

export const setupCartSocketListeners = (currentUserId, updateCartItem, addNewCartItem) => {
  socket.on('cart:update', (data) => {
    if (data.userId === currentUserId) {
      updateCartItem(data.item);
      updateCartCount(data.cartCount);
    }
  });

  socket.on('cart:add', (data) => {
    if (data.userId === currentUserId) {
      addNewCartItem(data.item);
      updateCartCount(data.cartCount);
    }
  });
};

export function updateCartCount(count) {
  const cartBadges = document.querySelectorAll('.cart-count-badge');
  cartBadges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

export { socket };
