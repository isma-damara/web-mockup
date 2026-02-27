import { products } from "./EcomData";
import type { CartItem } from "./useCart";

export type MockOrderStatus = "Pesanan dibuat" | "Diproses" | "Dikirim" | "Selesai";

export type CheckoutSnapshot = {
  orderNo: string;
  createdAt: string;
  name: string;
  phone: string;
  address: string;
  payment: string;
  wallet?: string | null;
};

export type MockOrderItem = {
  id: number;
  name: string;
  size: string;
  qty: number;
  price: number;
};

export type MockOrder = {
  orderNo: string;
  createdAt: string;
  status: MockOrderStatus;
  name: string;
  phone: string;
  address: string;
  payment: string;
  wallet?: string | null;
  items: MockOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

const ORDER_STORAGE_KEY = "ecom_orders";

export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function generateOrderNo(now = new Date()) {
  const y = String(now.getFullYear()).slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const random = String(Math.floor(1000 + Math.random() * 9000));
  return `US${y}${m}${d}${random}`;
}

export function createCheckoutSnapshot(input: Omit<CheckoutSnapshot, "orderNo" | "createdAt">): CheckoutSnapshot {
  return {
    ...input,
    orderNo: generateOrderNo(),
    createdAt: new Date().toISOString(),
  };
}

export function resolveStatusByTime(createdAt: string): MockOrderStatus {
  const created = new Date(createdAt).getTime();
  const now = Date.now();
  const elapsedHours = Math.max(0, (now - created) / 36e5);
  if (elapsedHours < 2) return "Pesanan dibuat";
  if (elapsedHours < 24) return "Diproses";
  if (elapsedHours < 72) return "Dikirim";
  return "Selesai";
}

export function buildOrderFromCheckout(snapshot: CheckoutSnapshot, cart: CartItem[]): MockOrder {
  const items: MockOrderItem[] = cart
    .map((item) => {
      const product = products.find((p) => p.id === Number(item.id));
      if (!product) return null;
      return {
        id: product.id,
        name: product.name,
        size: item.size,
        qty: Number(item.qty),
        price: product.price,
      };
    })
    .filter((item): item is MockOrderItem => item !== null && item.qty > 0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 0;

  return {
    orderNo: snapshot.orderNo,
    createdAt: snapshot.createdAt,
    status: resolveStatusByTime(snapshot.createdAt),
    name: snapshot.name,
    phone: normalizePhone(snapshot.phone),
    address: snapshot.address,
    payment: snapshot.payment,
    wallet: snapshot.wallet,
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}

export function readMockOrders(): MockOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MockOrder[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((order) => ({
      ...order,
      status: resolveStatusByTime(order.createdAt),
      phone: normalizePhone(String(order.phone ?? "")),
    }));
  } catch {
    return [];
  }
}

export function saveMockOrder(order: MockOrder) {
  if (typeof window === "undefined") return;
  const existing = readMockOrders().filter((item) => item.orderNo !== order.orderNo);
  const next = [{ ...order, status: resolveStatusByTime(order.createdAt) }, ...existing];
  window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(next));
}

export function findMockOrder(orderNo: string, phone: string): MockOrder | null {
  const cleanOrderNo = orderNo.trim().toUpperCase();
  const cleanPhone = normalizePhone(phone);
  if (!cleanOrderNo || !cleanPhone) return null;
  const match = readMockOrders().find(
    (order) => order.orderNo.toUpperCase() === cleanOrderNo && normalizePhone(order.phone) === cleanPhone,
  );
  return match ?? null;
}

export function formatOrderDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getOrderStatusSteps(status: MockOrderStatus) {
  const steps = [
    { title: "Pesanan dibuat", desc: "Pesanan kamu sudah tercatat di sistem kami." },
    { title: "Diproses", desc: "Tim gudang menyiapkan barang dan pengepakan." },
    { title: "Dikirim", desc: "Kurir menjemput dan mengantar paket ke alamat kamu." },
    { title: "Selesai", desc: "Paket tiba dan pesanan dinyatakan selesai." },
  ] as const;
  const activeIndex = steps.findIndex((step) => step.title === status);
  return steps.map((step, idx) => ({
    ...step,
    done: idx <= activeIndex,
    active: idx === activeIndex,
  }));
}
