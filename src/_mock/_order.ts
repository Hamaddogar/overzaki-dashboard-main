import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const ORDER_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'refunded', label: 'Refunded' },
];

const ITEMS = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  sku: `16H9UR${index}`,
  quantity: index + 1,
  name: _mock.productName(index),
  coverUrl: _mock.image.product(index),
  price: _mock.number.price(index),
}));

export const _orders = [...Array(20)].map((_, index) => {
  const shipping = 10;

  const discount = 10;

  const taxes = 10;

  const items = (index % 2 && ITEMS.slice(0, 1)) || (index % 3 && ITEMS.slice(1, 3)) || ITEMS;

  const totalQuantity = items.reduce((accumulator, item) => accumulator + item.quantity, 0);

  const subTotal = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

  const totalAmount = subTotal - shipping - discount + taxes;

  const customer = {
    id: _mock.id(index),
    name: _mock.fullName(index),
    email: _mock.email(index),
    avatarUrl: _mock.image.avatar(index),
    ipAddress: '192.158.1.38',
  };

  const delivery = {
    shipBy: 'DHL',
    speedy: 'Standard',
    trackingNumber: 'SPX037739199373',
  };

  const history = {
    orderTime: _mock.time(1),
    paymentTime: _mock.time(2),
    deliveryTime: _mock.time(3),
    completionTime: _mock.time(4),
    timeline: [
      { title: 'Delivery successful', time: _mock.time(1) },
      { title: 'Transporting to [2]', time: _mock.time(2) },
      { title: 'Transporting to [1]', time: _mock.time(3) },
      {
        title: 'The shipping unit has picked up the goods',
        time: _mock.time(4),
      },
      { title: 'Order has been created', time: _mock.time(5) },
    ],
  };

  return {
    id: _mock.id(index),
    orderNumber: `#601${index}`,
    createdAt: _mock.time(index),
    taxes,
    items,
    history,
    subTotal,
    shipping,
    discount,
    customer,
    delivery,
    totalAmount,
    totalQuantity,
    shippingAddress: {
      fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      phoneNumber: '365-374-4961',
    },
    payment: {
      cardType: 'mastercard',
      cardNumber: '**** **** **** 5678',
    },
    status:
      (index % 2 && 'completed') ||
      (index % 3 && 'pending') ||
      (index % 4 && 'cancelled') ||
      'refunded',
  };
});


export const allOrders = [
  {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "Maher Alkahwndi",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/visa.svg',
    price: 84.55,
    totalItems: 4,
    status: 'Pending',
    color: 'warning.main',
  }, {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "Mohamed Hassan",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/mastercard.svg',
    price: 84.55,
    totalItems: 2,
    status: 'Accepted',
    color: 'secondary.light',
  }, {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "Abdelrahman Ahmad",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/KNETLogo.svg',
    price: 84.55,
    totalItems: 4,
    status: 'Ready',
    color: 'info.main',
  }, {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "محمود عبدالكريم",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/mada.svg',
    price: 84.55,
    totalItems: 4,
    status: 'Completed',
    color: 'primary.main',
  }, {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "Abdelrahman Ahmad",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/KNETLogo.svg',
    price: 84.55,
    totalItems: 4,
    status: 'Ready',
    color: 'info.main',
  }, {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "محمود عبدالكريم",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/mada.svg',
    price: 84.55,
    totalItems: 4,
    status: 'Completed',
    color: 'primary.main',
  }, {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "Zain Abdallah",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/apple-pay.svg',
    price: 84.55,
    totalItems: 4,
    status: 'Cancelled',
    color: 'error.light',
  }, {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "محمود عبدالكريم",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/mada.svg',
    price: 84.55,
    totalItems: 4,
    status: 'Completed',
    color: 'primary.main',
  }, {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "Abdelrahman Ahmad",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/KNETLogo.svg',
    price: 84.55,
    totalItems: 4,
    status: 'Ready',
    color: 'info.main',
  }, {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "محمود عبدالكريم",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/mada.svg',
    price: 84.55,
    totalItems: 4,
    status: 'Completed',
    color: 'primary.main',
  }, {
    idNo: "#4254538741",
    time: "22/03/2023, 3:54 PM",
    name: "Zain Abdallah",
    address: 'Bnied Al-Gari - Ali Sabah - Street...',
    flag: '/raw/flag.png',
    pay: '/raw/apple-pay.svg',
    price: 84.55,
    totalItems: 4,
    status: 'Cancelled',
    color: 'error.light',
  },
];

export const allProducts = [
  {
    name: 'iPhone 13 Pro Max',
    mainCat: 'Mobiles',
    img: '/raw/s1.png',
    price: 199.5,
  },
  {
    name: 'Black Smart Watch GXT',
    mainCat: 'Watches',
    img: '/raw/s2.png',
    price: 38.5,
  },
  {
    name: 'HP ENVY Laptop',
    mainCat: 'Laptops',
    img: '/raw/s3.png',
    price: 1.540,
  },
  {
    name: 'iPhone 8 Gold',
    mainCat: 'Mobiles',
    img: '/raw/s4.png',
    price: 199.5,
  }, {
    name: 'Apple AirPods Pro White',
    mainCat: 'Mobiles',
    img: '/raw/s5.png',
    price: 59.5,
  },
];

export const allCustomers = [
  {
    name: "Mohamed Hassan",
    phone: "+9652312127845",
    flag: '/raw/flag.png',
    total: 84.55,
    orders: 3,
    status: 'New',
    color: '#76FDD3',
  },
  {
    name: "محمود عبدالكريم",
    phone: "+9652312127845",
    flag: '/raw/flag.png',
    total: 49.500,
    orders: 8,
    status: 'Super',
    color: '#F1D169',
  }, {
    name: "Maher Alkahwndi",
    phone: "+9652312127845",
    flag: '/raw/flag.png',
    total: 163,
    orders: 9,
    status: 'Not Active',
    color: '#FF9FAF',
  }, {
    name: "Aya Ahmed",
    phone: "+9652312127845",
    flag: '/raw/flag.png',
    total: 99.200,
    orders: 3,
    status: 'Loyal',
    color: '#CBC2FF',
  }, {
    name: "Hazem Mustafa",
    phone: "+9652312127845",
    flag: '/raw/flag.png',
    total: 189.500,
    orders: 2,
    status: 'New',
    color: '#76FDD3',
  }, {
    name: "Mohamed Hassan",
    phone: "+9652312127845",
    flag: '/raw/flag.png',
    total: 84.55,
    orders: 3,
    status: 'New',
    color: '#76FDD3',
  },
  {
    name: "محمود عبدالكريم",
    phone: "+9652312127845",
    flag: '/raw/flag.png',
    total: 49.500,
    orders: 8,
    status: 'Super',
    color: '#F1D169',
  }, {
    name: "Maher Alkahwndi",
    phone: "+9652312127845",
    flag: '/raw/flag.png',
    total: 163,
    orders: 9,
    status: 'Not Active',
    color: '#FF9FAF',
  }, {
    name: "Aya Ahmed",
    phone: "+9652312127845",
    flag: '/raw/flag.png',
    total: 99.200,
    orders: 3,
    status: 'Loyal',
    color: '#CBC2FF',
  }, {
    name: "Hazem Mustafa",
    phone: "+9652312127845",
    flag: '/raw/flag.png',
    total: 189.500,
    orders: 2,
    status: 'New',
    color: '#76FDD3',
  },
];

export const allVouchers = [
  {
    title: "Eid Voucher",
    copen: "H@PPYEID2023",
    discount: 10,
    discountType: "Percentage",
    userCount: 102,
    status: true,
  },{
    title: "Mother Day",
    copen: "MOMLOVE",
    discount: 5,
    discountType: "Amount",
    userCount: 193,
    status: true,
  },{
    title: "New Year Campaign",
    copen: "NERWYEAR2024",
    discount: 12,
    discountType: "Amount",
    userCount: 9,
    status: false,
  },{
    title: "Hot Deal",
    copen: "HOTDISCOUNT20",
    discount: 20,
    discountType: "Amount",
    userCount: 84,
    status: true,
  },
];