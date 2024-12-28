

const menuButton = document.getElementById('menuButton');
const menuContent = document.getElementById('menuContent');

menuButton.addEventListener('click', () => {
    if (menuContent.style.display === 'none' || menuContent.style.display === '') {
        menuContent.style.display = 'block'; 
    } else {
        menuContent.style.display = 'none'; 
    }
});

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  const cartCounter = createCartCounter();
  let cartCount = 0;
  const cart = [];


  document.querySelectorAll('.btn-default').forEach(button => {
      button.addEventListener('click', () => {
          const { title, price } = getDishDetails(button);
          cart.push({ title, price });
          updateCartCounter(++cartCount);
          alert(`${title} agregado al carrito.`);
      });
  });

  
  document.querySelector('#finalizarPedido').addEventListener('click', () => {
      try {
          const formData = getFormData();
          const total = calculateCartTotal(cart);
          const summary = generatePurchaseSummary(formData, cart, total);
          alert(summary);
          console.log('Pedido completado:', formData);
      } catch (error) {
          alert('Por favor, completa todos los campos requeridos antes de finalizar el pedido.');
          console.error(error.message);
      }
  });

  document.querySelector('#mobile_btn').addEventListener('click', () => {
      document.querySelector('#mobile_menu').classList.toggle('visible');
  });
});


function createCartCounter() {
  const cartCounter = document.createElement('div');
  cartCounter.id = 'cart-counter';
  cartCounter.textContent = '0';
  document.body.appendChild(cartCounter);
  return cartCounter;
}

function updateCartCounter(count) {
  document.getElementById('cart-counter').textContent = count;
}

function getDishDetails(button) {
  const dishElement = button.closest('.dish');
  const title = dishElement.querySelector('.dish-title').textContent;
  const priceText = dishElement.querySelector('.precio h4').textContent;
  const price = parseFloat(priceText.replace('$', '').replace(',', ''));
  return { title, price };
}

function getFormData() {
  const form = document.querySelector('form');
  const direccion = form.querySelector('#firstname').value.trim();
  const telefono = form.querySelector('#telefono').value.trim();
  const quienRecibe = form.querySelector('#quienrecibe').value.trim();
  const metodoPago = form.querySelector('#metododepago').value.trim();

  if (!direccion || !telefono || !quienRecibe || !metodoPago) {
      throw new Error('Formulario incompleto.');
  }

  return {
      direccion,
      telefono,
      quienRecibe,
      metodoPago,
      comboSeleccionado: form.querySelector('input[name="gender"]:checked')?.nextElementSibling.textContent || 'Ninguno',
  };
}

function calculateCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

function generatePurchaseSummary(formData, cart, total) {
  let summary = '¡Felicitaciones por tu compra!\n\n';
  summary += `Dirección de entrega: ${formData.direccion}\n`;
  summary += `Teléfono: ${formData.telefono}\n`;
  summary += `Quién recibe: ${formData.quienRecibe}\n`;
  summary += `Método de pago: ${formData.metodoPago}\n`;
  summary += `Combo seleccionado: ${formData.comboSeleccionado}\n\n`;
  summary += 'Productos elegidos:\n';
  cart.forEach(item => {
      summary += `- ${item.title}: $${item.price}\n`;
  });
  summary += `\nTotal: $${total}\n`;
  return summary;
}

function handlePaymentMethodChange() {
  const metodoPago = document.getElementById('metododepago').value;
  const paymentDetails = document.getElementById('payment-details');
  const paymentMessage = document.getElementById('payment-message');

  if (metodoPago === 'efectivo') {
      paymentDetails.style.display = 'block';
      paymentMessage.textContent = 'Ha seleccionado pagar en efectivo. Por favor, prepare la cantidad exacta.';
  } else if (metodoPago === 'electronico') {
      paymentDetails.style.display = 'block';
      paymentMessage.textContent = 'Ha seleccionado pago electrónico. Será redirigido a la pasarela de pago.';
  } else {
      paymentDetails.style.display = 'none';
      paymentMessage.textContent = '';
  }
}

function scrollToBottom() {

  const container = document.querySelector('#form');

  
  if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
  } else {
      console.error('Contenedor no encontrado.');
  }
}

const subscribeButton = document.querySelector("#input_group button");
const emailInput = document.querySelector("#email");


subscribeButton.addEventListener("click", () => {
    const email = emailInput.value.trim(); 

    if (email) { 
        alert(`¡Gracias por suscribirte, ${email}! Confirma la suscripción y recibe nuestras novedades y descuentos exclusivos.`);
        emailInput.value = ""; 
    } else {
        alert("Por favor, ingresa un E-mail válido para suscribirte.");
    }
});



