document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("mainNavbar");
  const navbarToggle = document.getElementById("navbarToggle");
  const navbarMenu = document.getElementById("navbarMenu");

  const navLinks = document.querySelectorAll(".berekah-navbar .nav-link");

  /* ================================================
       MOBILE MENU TOGGLE
    ================================================ */

  navbarToggle.addEventListener("click", () => {
    const isOpen = navbarMenu.classList.toggle("show");

    navbarToggle.setAttribute("aria-expanded", isOpen);

    const icon = navbarToggle.querySelector("i");

    if (isOpen) {
      icon.classList.remove("bi-list");
      icon.classList.add("bi-x-lg");
    } else {
      icon.classList.remove("bi-x-lg");
      icon.classList.add("bi-list");
    }
  });

  /* ================================================
       CLOSE MENU WHEN NAV LINK IS CLICKED
    ================================================ */

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");

      navbarMenu.classList.remove("show");

      navbarToggle.setAttribute("aria-expanded", "false");

      const icon = navbarToggle.querySelector("i");

      icon.classList.remove("bi-x-lg");
      icon.classList.add("bi-list");
    });
  });

  /* ================================================
       NAVBAR SCROLL EFFECT
    ================================================ */

  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll);

  handleNavbarScroll();

  /* ================================================
       CART BUTTON
    ================================================ */

  // const cartButton = document.getElementById("cartButton");

  // cartButton.addEventListener("click", () => {
  //   alert("Your cart is currently empty.");
  // });
});

/* =====================================================
   BEREKAH HOTEL
   HERO SLIDER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const heroSlides = document.querySelectorAll(".hero-slide");

  const heroDots = document.querySelectorAll(".hero-dot");

  const heroPrev = document.getElementById("heroPrev");

  const heroNext = document.getElementById("heroNext");

  /* If hero does not exist, stop */

  if (!heroSlides.length) {
    return;
  }

  /* =================================================
       SETTINGS
    ================================================= */

  let currentSlide = 0;

  let slideTimer;

  const slideDuration = 6000;

  /* =================================================
       SHOW SLIDE
    ================================================= */

  function showSlide(index) {
    /*
           Handle circular navigation
        */

    if (index >= heroSlides.length) {
      index = 0;
    }

    if (index < 0) {
      index = heroSlides.length - 1;
    }

    currentSlide = index;

    /* Remove active from all slides */

    heroSlides.forEach((slide) => {
      slide.classList.remove("active");
    });

    /* Remove active from all dots */

    heroDots.forEach((dot) => {
      dot.classList.remove("active");
    });

    /* Activate selected slide */

    heroSlides[currentSlide].classList.add("active");

    /* Activate selected dot */

    if (heroDots[currentSlide]) {
      heroDots[currentSlide].classList.add("active");
    }
  }

  /* =================================================
       NEXT SLIDE
    ================================================= */

  function nextSlide() {
    showSlide(currentSlide + 1);

    restartTimer();
  }

  /* =================================================
       PREVIOUS SLIDE
    ================================================= */

  function previousSlide() {
    showSlide(currentSlide - 1);

    restartTimer();
  }

  /* =================================================
       AUTOMATIC SLIDER
    ================================================= */

  function startTimer() {
    slideTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, slideDuration);
  }

  /* =================================================
       RESTART TIMER
    ================================================= */

  function restartTimer() {
    clearInterval(slideTimer);

    startTimer();
  }

  /* =================================================
       NEXT BUTTON
    ================================================= */

  if (heroNext) {
    heroNext.addEventListener("click", () => {
      nextSlide();
    });
  }

  /* =================================================
       PREVIOUS BUTTON
    ================================================= */

  if (heroPrev) {
    heroPrev.addEventListener("click", () => {
      previousSlide();
    });
  }

  /* =================================================
       DOT NAVIGATION
    ================================================= */

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideIndex = Number(dot.dataset.slide);

      showSlide(slideIndex);

      restartTimer();
    });
  });

  /* =================================================
       PAUSE WHILE MOUSE IS OVER HERO
    ================================================= */

  const heroSection = document.querySelector(".hero-section");

  if (heroSection) {
    heroSection.addEventListener("mouseenter", () => {
      clearInterval(slideTimer);
    });

    heroSection.addEventListener("mouseleave", () => {
      restartTimer();
    });
  }

  /* =================================================
       START SLIDER
    ================================================= */

  showSlide(0);

  startTimer();
});

/* =====================================================
   ABOUT SECTION REVEAL
===================================================== */
const aboutSection = document.querySelector(".about-section");
if (aboutSection) {
  const aboutItems = aboutSection.querySelectorAll(
    ".about-image-wrapper, .about-content",
  );
  aboutItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, index * 180);
          });
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );
  aboutObserver.observe(aboutSection);
}

/* =====================================================
   MENU CATEGORY FILTER
===================================================== */
const menuFilter = document.getElementById("menuFilter");
const menuItems = document.querySelectorAll(".menu-item");
if (menuFilter) {
  const filterButtons = menuFilter.querySelectorAll(".menu-filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      menuItems.forEach((item) => {
        const itemCategory = item.dataset.category;
        if (category === "all" || itemCategory === category) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
}

/* =====================================================
   SHOPPING CART
===================================================== */
let cart = [];

const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartFooter = document.getElementById("cartFooter");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");
const cartBrowseBtn = document.getElementById("cartBrowseBtn");
const cartCheckoutBtn = document.getElementById("cartCheckoutBtn");
const addCartButtons = document.querySelectorAll(".add-cart-btn");

function openCart() {
  cartDrawer.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("active");
  document.body.style.overflow = "";
}

cartClose.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("active")) {
    closeCart();
  }
});

/* =====================================================
   ADD PRODUCT TO CART
===================================================== */
addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    const price = Number(button.dataset.price);
    const card = button.closest(".food-card");
    const image = card.querySelector(".food-image img")?.src || "";

    const existingItem = cart.find((item) => item.product === product);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        product,
        price,
        image,
        quantity: 1,
      });
    }

    updateCart();
    showAddedState(button);
    showCartToast();
  });
});

function showAddedState(button) {
  const originalHTML = button.innerHTML;
  button.classList.add("added");
  button.innerHTML = '<i class="bi bi-check-lg"></i><span>Added</span>';

  setTimeout(() => {
    button.classList.remove("added");
    button.innerHTML = originalHTML;
  }, 2000);
}
const cartToast = document.getElementById("cartToast");
let cartToastTimer;

function showCartToast() {
  if (!cartToast) return;

  clearTimeout(cartToastTimer);
  cartToast.classList.add("show");

  cartToastTimer = setTimeout(() => {
    cartToast.classList.remove("show");
  }, 5000);
}

/* =====================================================
   UPDATE CART
===================================================== */
function updateCart() {
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartEmpty.style.display = "flex";
    cartFooter.style.display = "none";
    updateCartCount();
    updateCheckout();
    return;
  }

  cartEmpty.style.display = "none";
  cartFooter.style.display = "block";

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.product}">
      </div>
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.product}</h4>
        <div class="cart-item-price">ETB ${item.price.toLocaleString()}</div>
        <div class="cart-item-controls">
          <div class="cart-quantity">
            <button type="button" data-action="decrease" data-index="${index}">
              <i class="bi bi-dash"></i>
            </button>
            <span>${item.quantity}</span>
            <button type="button" data-action="increase" data-index="${index}">
              <i class="bi bi-plus"></i>
            </button>
          </div>
          <span class="cart-item-total">
            ETB ${(item.price * item.quantity).toLocaleString()}
          </span>
        </div>
      </div>
      <button class="cart-remove" type="button" data-action="remove" data-index="${index}" aria-label="Remove item">
        <i class="bi bi-trash3"></i>
      </button>
    `;

    cartItems.appendChild(cartItem);
  });

  updateCartTotals();
  updateCartCount();
  updateCheckout();
}

/* =====================================================
   CART ITEM ACTIONS
===================================================== */
cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const index = Number(button.dataset.index);
  const action = button.dataset.action;

  if (action === "increase") {
    cart[index].quantity++;
  }

  if (action === "decrease") {
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  if (action === "remove") {
    cart.splice(index, 1);
  }

  updateCart();
});

/* =====================================================
   CART TOTALS
===================================================== */
function updateCartTotals() {
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  cartSubtotal.textContent = `ETB ${subtotal.toLocaleString()}`;
  cartTotal.textContent = `ETB ${subtotal.toLocaleString()}`;
}

/* =====================================================
   NAVBAR CART COUNT
===================================================== */
function updateCartCount() {
  const count = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const cartCountElements = document.querySelectorAll(
    "#cartCount, .cart-count",
  );

  cartCountElements.forEach((element) => {
    element.textContent = count;
    element.classList.toggle("show", count > 0);
  });
}

/* =====================================================
   CART BUTTONS IN NAVBAR
===================================================== */
const cartButton = document.getElementById("cartButton");

if (cartButton) {
  cartButton.addEventListener("click", (event) => {
    event.preventDefault();
    openCart();
  });
}

/* =====================================================
   BROWSE MENU
===================================================== */
cartBrowseBtn.addEventListener("click", () => {
  closeCart();

  const menuSection = document.getElementById("menu");

  if (menuSection) {
    setTimeout(() => {
      menuSection.scrollIntoView({
        behavior: "smooth",
      });
    }, 300);
  }
});

const checkoutSection = document.getElementById("checkout");

/* =====================================================
   CHECKOUT BUTTON
===================================================== */
cartCheckoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;

  console.log("Checkout cart:", cart);

  checkoutSection.style.display = "block";
  if (checkoutSection) {
    closeCart();

    setTimeout(() => {
      checkoutSection.scrollIntoView({
        behavior: "smooth",
      });
    }, 300);
  } else {
    alert("Checkout section will be available soon.");
  }
});

/* ==================== CHECKOUT FORM FOR FOOD ==================== */

const checkoutForm = document.getElementById("checkoutForm");
const checkoutSummaryItems = document.getElementById("checkoutSummaryItems");
const checkoutSummaryBottom = document.getElementById("checkoutSummaryBottom");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutDelivery = document.getElementById("checkoutDelivery");
const checkoutTotal = document.getElementById("checkoutTotal");

const deliveryAddressField = document.getElementById("deliveryAddressField");
const deliveryDistanceField = document.getElementById("deliveryDistanceField");
const deliveryDistance = document.getElementById("deliveryDistance");
const tableRoomField = document.getElementById("tableRoomField");

const deliveryAddress = document.getElementById("deliveryAddress");
const tableRoomNumber = document.getElementById("tableRoomNumber");

function getDeliveryFee() {
  const orderType = document.querySelector(
    'input[name="orderType"]:checked',
  )?.value;

  if (orderType !== "delivery") {
    return 0;
  }

  return Number(deliveryDistance?.value || 150);
}

function bindCheckoutBrowseButton() {
  const browseButton = document.getElementById("checkoutBrowseMenu");

  if (!browseButton) return;

  browseButton.addEventListener("click", () => {
    const menuSection = document.getElementById("menu");

    if (menuSection) {
      menuSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
}

function updateCheckout() {
  if (!checkoutSummaryItems) return;
  if (cart.length === 0) {
    checkoutSummaryItems.innerHTML = `
        <div class="checkout-summary-empty">
            <i class="bi bi-bag-x"></i>
            <h4>Your cart is empty</h4>
            <p>Add some delicious food from our menu.</p>
            <button type="button" id="checkoutBrowseMenu">
                Browse Menu
                <i class="bi bi-arrow-down"></i>
            </button>
        </div>
    `;

    if (checkoutSummaryBottom) {
      checkoutSummaryBottom.style.display = "none";
    }

    bindCheckoutBrowseButton();
    return;
  }

  checkoutSummaryItems.innerHTML = "";

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;

    const summaryItem = document.createElement("div");
    summaryItem.className = "checkout-summary-item";

    summaryItem.innerHTML = `
        <div class="checkout-summary-image">
            <img src="${item.image}" alt="${item.product}">
        </div>

        <div class="checkout-summary-info">
            <h4>${item.product}</h4>
            <span>${item.quantity} × ETB ${item.price.toLocaleString()}</span>
        </div>

        <strong>
            ETB ${itemTotal.toLocaleString()}
        </strong>
    `;

    checkoutSummaryItems.appendChild(summaryItem);
  });

  if (checkoutSummaryBottom) {
    checkoutSummaryBottom.style.display = "block";
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = getDeliveryFee();
  const total = subtotal + deliveryFee;

  if (checkoutSubtotal) {
    checkoutSubtotal.textContent = `ETB ${subtotal.toLocaleString()}`;
  }

  if (checkoutDelivery) {
    checkoutDelivery.textContent = `ETB ${deliveryFee.toLocaleString()}`;
  }

  if (checkoutTotal) {
    checkoutTotal.textContent = `ETB ${total.toLocaleString()}`;
  }

  bindCheckoutBrowseButton();
}

function updateOrderTypeFields() {
  const orderType = document.querySelector(
    'input[name="orderType"]:checked',
  )?.value;
  if (!orderType) return;

  if (orderType === "delivery") {
    if (deliveryAddressField) {
      deliveryAddressField.style.display = "block";
    }

    if (deliveryDistanceField) {
      deliveryDistanceField.style.display = "block";
    }

    if (tableRoomField) {
      tableRoomField.style.display = "none";
    }

    if (deliveryAddress) {
      deliveryAddress.required = true;
    }

    if (tableRoomNumber) {
      tableRoomNumber.required = false;
    }
  } else if (orderType === "pickup") {
    if (deliveryAddressField) {
      deliveryAddressField.style.display = "none";
    }

    if (deliveryDistanceField) {
      deliveryDistanceField.style.display = "none";
    }

    if (tableRoomField) {
      tableRoomField.style.display = "none";
    }

    if (deliveryAddress) {
      deliveryAddress.required = false;
    }

    if (tableRoomNumber) {
      tableRoomNumber.required = false;
    }
  } else if (orderType === "dine-in") {
    if (deliveryAddressField) {
      deliveryAddressField.style.display = "none";
    }

    if (deliveryDistanceField) {
      deliveryDistanceField.style.display = "none";
    }

    if (tableRoomField) {
      tableRoomField.style.display = "block";
    }

    if (deliveryAddress) {
      deliveryAddress.required = false;
    }

    if (tableRoomNumber) {
      tableRoomNumber.required = true;
    }
  }

  updateCheckout();
}

document.querySelectorAll('input[name="orderType"]').forEach((radio) => {
  radio.addEventListener("change", updateOrderTypeFields);
});

if (deliveryDistance) {
  deliveryDistance.addEventListener("change", updateCheckout);
}

/* ==================== PAYMENT METHOD ==================== */

const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');

const paymentTitle = document.getElementById("paymentTitle");
const paymentDescription = document.getElementById("paymentDescription");
const paymentAccount = document.getElementById("paymentAccount");
const paymentInstructions = document.getElementById("paymentInstructions");
const copyPaymentAccount = document.getElementById("copyPaymentAccount");
const paymentAccountLabel = document.getElementById("paymentAccountLabel");

const paymentData = {
  cbe: {
    title: "Commercial Bank of Ethiopia",
    description: "Transfer the order amount to our CBE account.",
    account: "1000301369992",
    accountLabel: "CBE Account Number",
    icon: "bi-bank",
  },

  telebirr: {
    title: "Telebirr",
    description: "Send the order amount to our Telebirr phone number.",
    account: "0932173857",
    accountLabel: "Telebirr Phone Number",
    icon: "bi-phone",
  },

  ebirr: {
    title: "E-Birr",
    description: "Send the order amount to our E-Birr phone number.",
    account: "0932173857",
    accountLabel: "E-Birr Phone Number",
    icon: "bi-wallet2",
  },
};

function updatePaymentMethod() {
  const selected = document.querySelector(
    'input[name="paymentMethod"]:checked',
  );

  if (!selected) return;

  const payment = paymentData[selected.value];

  if (!payment) return;

  if (paymentTitle) {
    paymentTitle.textContent = payment.title;
  }

  if (paymentDescription) {
    paymentDescription.textContent = payment.description;
  }

  if (paymentAccount) {
    paymentAccount.textContent = payment.account;
  }

  if (paymentAccountLabel) {
    paymentAccountLabel.textContent = payment.accountLabel;
  }

  if (paymentInstructions) {
    const icon = paymentInstructions.querySelector(
      ".payment-instructions-icon i",
    );

    if (icon) {
      icon.className = `bi ${payment.icon}`;
    }
  }
}

paymentMethods.forEach((method) => {
  method.addEventListener("change", updatePaymentMethod);
});

if (copyPaymentAccount) {
  copyPaymentAccount.addEventListener("click", async () => {
    const account = paymentAccount?.textContent?.trim();

    if (!account) {
      return;
    }

    try {
      await navigator.clipboard.writeText(account);

      const originalHTML = copyPaymentAccount.innerHTML;

      copyPaymentAccount.innerHTML = '<i class="bi bi-check-lg"></i>';

      setTimeout(() => {
        copyPaymentAccount.innerHTML = originalHTML;
      }, 1500);
    } catch (error) {
      console.log("Could not copy payment account.");
    }
  });
}

/* ==================== ORDER CONFIRMATION ==================== */
const orderConfirmation = document.getElementById("orderConfirmation");

const orderConfirmationBackdrop = document.getElementById(
  "orderConfirmationBackdrop",
);

const orderConfirmationClose = document.getElementById(
  "orderConfirmationClose",
);

const confirmationDoneBtn = document.getElementById("confirmationDoneBtn");

const confirmationOrderNumber = document.getElementById(
  "confirmationOrderNumber",
);

const confirmationCustomer = document.getElementById("confirmationCustomer");

const confirmationPhone = document.getElementById("confirmationPhone");

const confirmationOrderType = document.getElementById("confirmationOrderType");

const confirmationPayment = document.getElementById("confirmationPayment");

const confirmationReference = document.getElementById("confirmationReference");

const confirmationItemCount = document.getElementById("confirmationItemCount");

const confirmationItems = document.getElementById("confirmationItems");

const confirmationTotal = document.getElementById("confirmationTotal");

function generateOrderNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return `BRK-${randomNumber}`;
}

function getPaymentName(payment) {
  const names = {
    cbe: "CBE",
    telebirr: "Telebirr",
    ebirr: "E-Birr",
  };

  return names[payment] || payment;
}

function getOrderTypeName(orderType) {
  const names = {
    delivery: "Delivery",
    pickup: "Pickup",
    "dine-in": "Dine-in",
  };

  return names[orderType] || orderType;
}

function showOrderConfirmation(orderData) {
  if (!orderConfirmation) return;
  const orderNumber = generateOrderNumber();

  if (confirmationOrderNumber) {
    confirmationOrderNumber.textContent = orderNumber;
  }

  if (confirmationCustomer) {
    confirmationCustomer.textContent = orderData.customerName;
  }

  if (confirmationPhone) {
    confirmationPhone.textContent = orderData.phone;
  }

  if (confirmationOrderType) {
    confirmationOrderType.textContent = getOrderTypeName(orderData.orderType);
  }

  if (confirmationPayment) {
    confirmationPayment.textContent = getPaymentName(orderData.payment.method);
  }

  if (confirmationReference) {
    confirmationReference.textContent =
      orderData.payment.reference || "Not provided";
  }

  if (confirmationItemCount) {
    const count = orderData.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    confirmationItemCount.textContent = `${count} ${count === 1 ? "item" : "items"}`;
  }

  if (confirmationItems) {
    confirmationItems.innerHTML = "";

    orderData.items.forEach((item) => {
      const itemElement = document.createElement("div");

      itemElement.className = "confirmation-item";

      itemElement.innerHTML = `
            <div>
                <strong>${item.product}</strong>
                <span>${item.quantity} × ETB ${item.price.toLocaleString()}</span>
            </div>

            <strong>
                ETB ${item.total.toLocaleString()}
            </strong>
        `;

      confirmationItems.appendChild(itemElement);
    });
  }

  if (confirmationTotal) {
    confirmationTotal.textContent = `ETB ${orderData.total.toLocaleString()}`;
  }

  orderConfirmation.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeOrderConfirmation() {
  if (!orderConfirmation) return;

  orderConfirmation.classList.remove("active");
  document.body.style.overflow = "";
}

if (orderConfirmationClose) {
  orderConfirmationClose.addEventListener("click", closeOrderConfirmation);
}

if (orderConfirmationBackdrop) {
  orderConfirmationBackdrop.addEventListener("click", closeOrderConfirmation);
}

if (confirmationDoneBtn) {
  confirmationDoneBtn.addEventListener("click", closeOrderConfirmation);
}

/* ==================== CHECKOUT SUBMIT ==================== */

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty. Please add food before placing your order.");
      return;
    }

    const customerName = document.getElementById("checkoutName")?.value.trim();

    const phone = document.getElementById("checkoutPhone")?.value.trim();

    const orderType = document.querySelector(
      'input[name="orderType"]:checked',
    )?.value;

    const paymentMethod = document.querySelector(
      'input[name="paymentMethod"]:checked',
    )?.value;

    const paymentReference = document
      .getElementById("paymentReference")
      ?.value.trim();

    const notes = document.getElementById("checkoutNotes")?.value.trim();

    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const deliveryFee = getDeliveryFee();

    const selectedDistance =
      document.getElementById("deliveryDistance")?.selectedOptions?.[0];

    const orderData = {
      customerName,
      phone,
      orderType,

      address: orderType === "delivery" ? deliveryAddress?.value.trim() : "",

      deliveryDistance:
        orderType === "delivery" ? selectedDistance?.dataset.range || "" : "",

      deliveryFee,

      tableRoom: orderType === "dine-in" ? tableRoomNumber?.value.trim() : "",

      payment: {
        method: paymentMethod,
        reference: paymentReference,
      },

      notes,

      items: cart.map((item) => ({
        product: item.product,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        total: item.price * item.quantity,
      })),

      subtotal,
      total: subtotal + deliveryFee,
    };

    console.log("ORDER DATA:", orderData);

    showOrderConfirmation(orderData);

    checkoutForm.reset();

    checkoutSection.style.display = "none";

    cart.length = 0;

    updateCart();
    updateOrderTypeFields();
    updatePaymentMethod();
    updateCheckout();
  });
}

/* ==================== INITIALIZE ==================== */

updatePaymentMethod();
updateOrderTypeFields();
updateCheckout();
updateCart();

/* =====================================================
   FAVORITE FOOD BUTTON
===================================================== */
const favoriteButtons = document.querySelectorAll(".food-favorite");
favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const icon = button.querySelector("i");
    if (button.classList.contains("active")) {
      icon.classList.remove("bi-heart");
      icon.classList.add("bi-heart-fill");
    } else {
      icon.classList.remove("bi-heart-fill");
      icon.classList.add("bi-heart");
    }
  });
});

/* =====================================================
   ROOM FAVORITES
===================================================== */
const roomFavoriteButtons = document.querySelectorAll(".room-favorite");
roomFavoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const icon = button.querySelector("i");
    if (button.classList.contains("active")) {
      icon.classList.remove("bi-heart");
      icon.classList.add("bi-heart-fill");
    } else {
      icon.classList.remove("bi-heart-fill");
      icon.classList.add("bi-heart");
    }
  });
});

/* =====================================================
   ROOM BOOKING MODAL
===================================================== */
const bookingModal = document.getElementById("bookingModal");
const bookingClose = document.getElementById("bookingClose");
const bookingBackdrop = document.getElementById("bookingBackdrop");
const bookingForm = document.getElementById("bookingForm");
const roomBookButtons = document.querySelectorAll(".room-book-btn");
const bookingRoomName = document.getElementById("bookingRoomName");
const bookingRoomPrice = document.getElementById("bookingRoomPrice");
const summaryPrice = document.getElementById("summaryPrice");
const summaryNights = document.getElementById("summaryNights");
const summaryTotal = document.getElementById("summaryTotal");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

let selectedRoomPrice = 0;

function openBookingModal(room, price) {
  selectedRoomPrice = Number(price);
  bookingRoomName.textContent = room;
  bookingRoomPrice.textContent = `ETB ${selectedRoomPrice.toLocaleString()}`;
  summaryPrice.textContent = `ETB ${selectedRoomPrice.toLocaleString()}`;
  summaryNights.textContent = "0";
  summaryTotal.textContent = "ETB 0";
  bookingForm.reset();
  setMinimumDates();
  bookingModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBookingModal() {
  bookingModal.classList.remove("active");
  document.body.style.overflow = "";
}

function setMinimumDates() {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  checkIn.min = todayString;
  checkOut.min = todayString;
}

roomBookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openBookingModal(button.dataset.room, button.dataset.price);
  });
});

bookingClose.addEventListener("click", closeBookingModal);
bookingBackdrop.addEventListener("click", closeBookingModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && bookingModal.classList.contains("active")) {
    closeBookingModal();
  }
});

/* =====================================================
   DATE VALIDATION
===================================================== */
checkIn.addEventListener("change", () => {
  if (!checkIn.value) return;
  checkOut.min = checkIn.value;
  if (checkOut.value && checkOut.value <= checkIn.value) {
    checkOut.value = "";
  }
  calculateBookingTotal();
});

checkOut.addEventListener("change", calculateBookingTotal);

function calculateBookingTotal() {
  if (!checkIn.value || !checkOut.value) {
    summaryNights.textContent = "0";
    summaryTotal.textContent = "ETB 0";
    return;
  }

  const startDate = new Date(checkIn.value);
  const endDate = new Date(checkOut.value);
  const difference = endDate - startDate;
  const nights = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    summaryNights.textContent = "0";
    summaryTotal.textContent = "ETB 0";
    return;
  }

  const total = nights * selectedRoomPrice;
  summaryNights.textContent = nights;
  summaryTotal.textContent = `ETB ${total.toLocaleString()}`;
}

/* =====================================================
ROOM BOOKING CONFIRMATION
===================================================== */

const roomBookingConfirmation = document.getElementById(
  "roomBookingConfirmation",
);

const roomConfirmationBackdrop = document.getElementById(
  "roomConfirmationBackdrop",
);

const roomConfirmationClose = document.getElementById("roomConfirmationClose");

const roomConfirmationDone = document.getElementById("roomConfirmationDone");

const roomConfirmationNumber = document.getElementById(
  "roomConfirmationNumber",
);

const confirmationRoomName = document.getElementById("confirmationRoomName");

const confirmationGuestName = document.getElementById("confirmationGuestName");

const confirmationGuestPhone = document.getElementById(
  "confirmationGuestPhone",
);

const confirmationGuestCount = document.getElementById(
  "confirmationGuestCount",
);

const confirmationCheckIn = document.getElementById("confirmationCheckIn");

const confirmationCheckOut = document.getElementById("confirmationCheckOut");

const confirmationRoomPrice = document.getElementById("confirmationRoomPrice");

const confirmationRoomNights = document.getElementById(
  "confirmationRoomNights",
);

const confirmationRoomTotal = document.getElementById("confirmationRoomTotal");

function generateRoomBookingNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return `BRK-R${randomNumber}`;
}

function showRoomBookingConfirmation(bookingData) {
  if (!roomBookingConfirmation) return;

  if (roomConfirmationNumber) {
    roomConfirmationNumber.textContent = generateRoomBookingNumber();
  }

  if (confirmationRoomName) {
    confirmationRoomName.textContent = bookingData.room;
  }

  if (confirmationGuestName) {
    confirmationGuestName.textContent = bookingData.name;
  }

  if (confirmationGuestPhone) {
    confirmationGuestPhone.textContent = bookingData.phone;
  }

  if (confirmationGuestCount) {
    const guestCount = Number(bookingData.guests);

    confirmationGuestCount.textContent = `${guestCount} ${guestCount === 1 ? "Guest" : "Guests"}`;
  }

  if (confirmationCheckIn) {
    confirmationCheckIn.textContent = bookingData.checkIn;
  }

  if (confirmationCheckOut) {
    confirmationCheckOut.textContent = bookingData.checkOut;
  }

  if (confirmationRoomPrice) {
    confirmationRoomPrice.textContent = `ETB ${bookingData.pricePerNight.toLocaleString()}`;
  }

  if (confirmationRoomNights) {
    confirmationRoomNights.textContent = bookingData.nights;
  }

  if (confirmationRoomTotal) {
    confirmationRoomTotal.textContent = `ETB ${bookingData.total.toLocaleString()}`;
  }

  roomBookingConfirmation.classList.add("active");

  document.body.style.overflow = "hidden";
}

function closeRoomBookingConfirmation() {
  if (!roomBookingConfirmation) return;

  roomBookingConfirmation.classList.remove("active");

  document.body.style.overflow = "";
}

if (roomConfirmationClose) {
  roomConfirmationClose.addEventListener("click", closeRoomBookingConfirmation);
}

if (roomConfirmationBackdrop) {
  roomConfirmationBackdrop.addEventListener(
    "click",
    closeRoomBookingConfirmation,
  );
}

if (roomConfirmationDone) {
  roomConfirmationDone.addEventListener("click", closeRoomBookingConfirmation);
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    roomBookingConfirmation?.classList.contains("active")
  ) {
    closeRoomBookingConfirmation();
  }
});

/* =====================================================
BOOKING FORM SUBMIT
===================================================== */

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!checkIn.value || !checkOut.value) {
    alert("Please select your check-in and check-out dates.");
    return;
  }

  const startDate = new Date(checkIn.value);
  const endDate = new Date(checkOut.value);

  const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  const total = nights * selectedRoomPrice;

  const bookingData = {
    room: bookingRoomName.textContent,
    pricePerNight: selectedRoomPrice,
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    nights: nights,
    guests: document.getElementById("guestCount").value,
    name: document.getElementById("guestName").value.trim(),
    phone: document.getElementById("guestPhone").value.trim(),
    email: document.getElementById("guestEmail").value.trim(),
    total: total,
  };

  console.log("Booking submitted:", bookingData);

  showRoomBookingConfirmation(bookingData);

  closeBookingModal();

  bookingForm.reset();
});

/* =====================================================
   ROOM SCROLL REVEAL
===================================================== */
const roomCards = document.querySelectorAll(".room-card");
if ("IntersectionObserver" in window) {
  const roomObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("room-visible");
          roomObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  roomCards.forEach((card) => {
    card.classList.add("room-hidden");
    roomObserver.observe(card);
  });
}

const venueBookingModal = document.getElementById("venueBookingModal");
const venueBookingBackdrop = document.getElementById("venueBookingBackdrop");
const venueBookingClose = document.getElementById("venueBookingClose");
const venueBookingForm = document.getElementById("venueBookingForm");
const venueBookingName = document.getElementById("venueBookingName");
const venueCapacity = document.getElementById("venueCapacity");
const venueEventDate = document.getElementById("venueEventDate");
const venueEventType = document.getElementById("venueEventType");
const venueGuestName = document.getElementById("venueGuestName");
const venueGuestPhone = document.getElementById("venueGuestPhone");
const venueGuestEmail = document.getElementById("venueGuestEmail");
const venuePaymentReference = document.getElementById("venuePaymentReference");
const venueBookingNotes = document.getElementById("venueBookingNotes");
const venueSummaryName = document.getElementById("venueSummaryName");
const venueSummaryCapacity = document.getElementById("venueSummaryCapacity");
const venueSummaryDate = document.getElementById("venueSummaryDate");
const venueSummaryTotal = document.getElementById("venueSummaryTotal");
const venuePaymentTitle = document.getElementById("venuePaymentTitle");
const venuePaymentDescription = document.getElementById(
  "venuePaymentDescription",
);
const venuePaymentAccount = document.getElementById("venuePaymentAccount");
const venueCopyPayment = document.getElementById("venueCopyPayment");

const venueConfirmation = document.getElementById("venueBookingConfirmation");
const venueConfirmationBackdrop = document.getElementById(
  "venueConfirmationBackdrop",
);
const venueConfirmationClose = document.getElementById(
  "venueConfirmationClose",
);
const venueConfirmationDone = document.getElementById("venueConfirmationDone");
const venueConfirmationNumber = document.getElementById(
  "venueConfirmationNumber",
);
const venueConfirmationVenue = document.getElementById(
  "venueConfirmationVenue",
);
const venueConfirmationCapacity = document.getElementById(
  "venueConfirmationCapacity",
);
const venueConfirmationDate = document.getElementById("venueConfirmationDate");
const venueConfirmationCustomer = document.getElementById(
  "venueConfirmationCustomer",
);
const venueConfirmationPhone = document.getElementById(
  "venueConfirmationPhone",
);
const venueConfirmationPayment = document.getElementById(
  "venueConfirmationPayment",
);
const venueConfirmationReference = document.getElementById(
  "venueConfirmationReference",
);
const venueConfirmationTotal = document.getElementById(
  "venueConfirmationTotal",
);

let selectedVenue = "";
let selectedVenueData = null;

const venuePackages = {
  "Small Conference Hall": [
    { capacity: "1–30 Guests", max: 30, price: 2500 },
    { capacity: "1–100 Guests", max: 100, price: 4000 },
    { capacity: "1–200 Guests", max: 200, price: 6000 },
  ],
  "Large Conference Hall": [
    { capacity: "1–1000 Guests", max: 1000, price: 15000 },
    { capacity: "1–2000 Guests", max: 2000, price: 25000 },
  ],
  "Small Wedding & Event Venue": [
    { capacity: "< 100 Guests", max: 100, price: 10000 },
    { capacity: "< 200 Guests", max: 200, price: 15000 },
  ],
  "Large Wedding & Event Venue": [
    { capacity: "< 500 Guests", max: 500, price: 25000 },
    { capacity: "< 1000 Guests", max: 1000, price: 40000 },
  ],
};

const venuePaymentData = {
  CBE: {
    title: "Commercial Bank of Ethiopia",
    description: "Transfer the booking amount to the CBE account below.",
    account: "1000301369992",
  },
  Telebirr: {
    title: "Telebirr",
    description: "Send the booking amount using the Telebirr number below.",
    account: "0932173857",
  },
  "E-Birr": {
    title: "E-Birr",
    description: "Send the booking amount using the E-Birr number below.",
    account: "0932173857",
  },
};

document.querySelectorAll(".venue-btn").forEach((button) => {
  button.addEventListener("click", () => {
    selectedVenue = button.dataset.venue;
    selectedVenueData = null;

    venueBookingForm.reset();

    venueBookingName.textContent = selectedVenue;
    venueSummaryName.textContent = selectedVenue;
    venueSummaryCapacity.textContent = "-";
    venueSummaryDate.textContent = "-";
    venueSummaryTotal.textContent = "ETB 0";

    venueCapacity.innerHTML = '<option value="">Select capacity</option>';

    const packages = venuePackages[selectedVenue] || [];

    packages.forEach((packageData, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${packageData.capacity.replace("Guests", "G")} - ${packageData.price.toLocaleString()} ETB`;
      venueCapacity.appendChild(option);
    });

    venuePaymentAccount.textContent = "-";
    venuePaymentTitle.textContent = "Payment Information";
    venuePaymentDescription.textContent =
      "Select a payment method to see the account details.";

    document
      .querySelectorAll('input[name="venuePaymentMethod"]')
      .forEach((input) => {
        input.checked = false;
      });

    venueEventDate.min = new Date().toISOString().split("T")[0];

    venueBookingModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});
venueCapacity.addEventListener("change", () => {
  const packages = venuePackages[selectedVenue] || [];
  const selectedIndex = Number(venueCapacity.value);

  if (venueCapacity.value === "" || !packages[selectedIndex]) {
    selectedVenueData = null;
    venueSummaryCapacity.textContent = "-";
    venueSummaryTotal.textContent = "ETB 0";
    return;
  }

  selectedVenueData = packages[selectedIndex];

  venueSummaryCapacity.textContent = selectedVenueData.capacity;
  venueSummaryTotal.textContent = `ETB ${selectedVenueData.price.toLocaleString()}`;
});

venueEventDate.addEventListener("change", () => {
  if (!venueEventDate.value) {
    venueSummaryDate.textContent = "-";
    return;
  }

  const date = new Date(`${venueEventDate.value}T00:00:00`);

  venueSummaryDate.textContent = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
});

document
  .querySelectorAll('input[name="venuePaymentMethod"]')
  .forEach((input) => {
    input.addEventListener("change", () => {
      const payment = venuePaymentData[input.value];

      if (!payment) return;

      venuePaymentTitle.textContent = payment.title;
      venuePaymentDescription.textContent = payment.description;
      venuePaymentAccount.textContent = payment.account;
    });
  });

venueCopyPayment.addEventListener("click", async () => {
  const account = venuePaymentAccount.textContent;

  if (!account || account === "-") return;

  try {
    await navigator.clipboard.writeText(account);
    venueCopyPayment.innerHTML = '<i class="bi bi-check-lg"></i>';

    setTimeout(() => {
      venueCopyPayment.innerHTML = '<i class="bi bi-copy"></i>';
    }, 1500);
  } catch (error) {
    console.log("Copy failed:", error);
  }
});

function closeVenueBookingModal() {
  venueBookingModal.classList.remove("active");
  document.body.style.overflow = "";
}

venueBookingClose.addEventListener("click", closeVenueBookingModal);
venueBookingBackdrop.addEventListener("click", closeVenueBookingModal);

function generateVenueBookingNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `BRK-V${randomNumber}`;
}

function showVenueConfirmation(bookingData) {
  venueConfirmationNumber.textContent = bookingData.bookingNumber;
  venueConfirmationVenue.textContent = bookingData.venue;
  venueConfirmationCapacity.textContent = bookingData.capacity;
  venueConfirmationDate.textContent = bookingData.eventDate;
  venueConfirmationCustomer.textContent = bookingData.customer;
  venueConfirmationPhone.textContent = bookingData.phone;
  venueConfirmationPayment.textContent = bookingData.paymentMethod;
  venueConfirmationReference.textContent = bookingData.paymentReference;
  venueConfirmationTotal.textContent = `ETB ${bookingData.total.toLocaleString()}`;

  venueConfirmation.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeVenueConfirmation() {
  venueConfirmation.classList.remove("active");
  document.body.style.overflow = "";
}

venueConfirmationClose.addEventListener("click", closeVenueConfirmation);
venueConfirmationBackdrop.addEventListener("click", closeVenueConfirmation);
venueConfirmationDone.addEventListener("click", closeVenueConfirmation);

venueBookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selectedVenueData) {
    alert("Please select a capacity/package.");
    return;
  }

  if (!venueEventDate.value) {
    alert("Please select an event date.");
    return;
  }

  const selectedPayment = document.querySelector(
    'input[name="venuePaymentMethod"]:checked',
  );

  if (!selectedPayment) {
    alert("Please select a payment method.");
    return;
  }

  const eventDate = new Date(`${venueEventDate.value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (eventDate < today) {
    alert("Please select a future event date.");
    return;
  }

  const bookingData = {
    bookingNumber: generateVenueBookingNumber(),
    venue: selectedVenue,
    capacity: selectedVenueData.capacity,
    maxCapacity: selectedVenueData.max,
    eventDate: eventDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    eventType: venueEventType.value,
    customer: venueGuestName.value.trim(),
    phone: venueGuestPhone.value.trim(),
    email: venueGuestEmail.value.trim(),
    paymentMethod: selectedPayment.value,
    paymentReference: venuePaymentReference.value.trim(),
    notes: venueBookingNotes.value.trim(),
    total: selectedVenueData.price,
  };

  console.log("Venue booking submitted:", bookingData);

  closeVenueBookingModal();
  showVenueConfirmation(bookingData);

  venueBookingForm.reset();
  selectedVenue = "";
  selectedVenueData = null;
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (venueConfirmation.classList.contains("active")) {
    closeVenueConfirmation();
    return;
  }

  if (venueBookingModal.classList.contains("active")) {
    closeVenueBookingModal();
  }
});

// CONTACT
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert(
      "Thank you for contacting Berekah Hotel. We will get back to you soon.",
    );
    contactForm.reset();
  });
}

// FOOTER
const footerYear = document.getElementById("footerYear");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
