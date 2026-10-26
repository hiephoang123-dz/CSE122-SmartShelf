/**
 * js/data-store.js - Kiến trúc dữ liệu LocalStorage & Các thao tác CRUD (SV2)
 */

// [1] Khai báo các Key tên bảng dữ liệu lưu trữ dưới LocalStorage trình duyệt
const STORAGE_KEYS = {
  PRODUCTS: 'smartshelf_products',
  SHELVES: 'smartshelf_shelves',
  SHELF_CHECKS: 'smartshelf_shelf_checks',
  RESTOCK_TASKS: 'smartshelf_restock_tasks',
  ZONES: 'smartshelf_zones',
  USERS: 'smartshelf_users'
};

// [2] Dữ liệu mẫu ban đầu (Seed Data) dùng để khởi tạo hệ thống khi chạy lần đầu
const initialSeedData = {
  // Danh sách các Khu vực (Zone) trong siêu thị
  zones: [
    { id: 'Z-A', name: 'Khu A - Sữa & Chế phẩm', totalShelves: 4, manager: 'Nguyễn Văn A' },
    { id: 'Z-B', name: 'Khu B - Bánh kẹo & Snack', totalShelves: 4, manager: 'Trần Thị B' },
    { id: 'Z-C', name: 'Khu C - Đồ uống giải khát', totalShelves: 4, manager: 'Lê Văn C' }
  ],
  // Danh sách các Kệ hàng kèm chỉ số % lấp đầy và tình trạng nhãn giá
  shelves: [
    { id: 'A1-01', zoneId: 'Z-A', code: 'Kệ A1-01', fillRate: 85, priceTagStatus: 'OK', status: 'normal', lastChecked: '2026-10-25 10:00' },
    { id: 'A1-02', zoneId: 'Z-A', code: 'Kệ A1-02', fillRate: 40, priceTagStatus: 'OK', status: 'warning', lastChecked: '2026-10-25 09:30' },
    { id: 'A1-05', zoneId: 'Z-A', code: 'Kệ A1-05', fillRate: 0, priceTagStatus: 'MISSING', status: 'critical', lastChecked: '2026-10-25 08:15' },
    { id: 'B2-01', zoneId: 'Z-B', code: 'Kệ B2-01', fillRate: 90, priceTagStatus: 'OK', status: 'normal', lastChecked: '2026-10-25 11:00' },
    { id: 'B2-04', zoneId: 'Z-B', code: 'Kệ B2-04', fillRate: 10, priceTagStatus: 'WRONG_PRICE', status: 'critical', lastChecked: '2026-10-25 07:45' },
    { id: 'C1-03', zoneId: 'Z-C', code: 'Kệ C1-03', fillRate: 5, priceTagStatus: 'OK', status: 'critical', lastChecked: '2026-10-25 08:00' },
    { id: 'C1-04', zoneId: 'Z-C', code: 'Kệ C1-04', fillRate: 75, priceTagStatus: 'OK', status: 'normal', lastChecked: '2026-10-25 10:15' }
  ],
  // Danh sách Sản phẩm
  products: [
    { id: "P01", name: "Sữa tươi Vinamilk 1L", category: "Dairy", stock: 12, zone: "Kệ A1-02", price: 35000, priceFormatted: "35,000đ", icon: "🥛" },
    { id: "P02", name: "Sữa tươi TH True Milk 1L", category: "Dairy", stock: 0, zone: "Kệ A1-05", price: 38000, priceFormatted: "38,000đ", icon: "🥛" },
    { id: "P03", name: "Bánh Oishi Tôm Cay", category: "Snacks", stock: 25, zone: "Kệ B2-01", price: 10000, priceFormatted: "10,000đ", icon: "🍿" },
    { id: "P04", name: "Bánh Lay's Khoai Tây Vị Tự Nhiên", category: "Snacks", stock: 0, zone: "Kệ B2-04", price: 22000, priceFormatted: "22,000đ", icon: "🥔" },
    { id: "P05", name: "Nước Ngọt Coca Cola 330ml", category: "Beverage", stock: 0, zone: "Kệ C1-03", price: 12000, priceFormatted: "12,000đ", icon: "🥤" },
    { id: "P06", name: "Nước Ngọt Pepsi Lạnh", category: "Beverage", stock: 18, zone: "Kệ C1-04", price: 12000, priceFormatted: "12,000đ", icon: "🥤" }
  ],
  // Danh sách các công việc Bổ sung hàng (Restock Tasks)
  restockTasks: [
    { id: 'TK-101', shelfId: 'A1-05', productName: 'Sữa tươi TH True Milk 1L', priority: 'HIGH', status: 'PENDING', createdTime: '08:15', note: 'Kệ trống 0%' },
    { id: 'TK-102', shelfId: 'C1-03', productName: 'Nước Ngọt Coca Cola 330ml', priority: 'HIGH', status: 'IN_PROGRESS', createdTime: '08:30', note: 'Hết hàng giờ cao điểm' },
    { id: 'TK-103', shelfId: 'B2-04', productName: 'Bánh Lay\'s Khoai Tây', priority: 'MEDIUM', status: 'COMPLETED', createdTime: '07:50', note: 'Đã bổ sung 20 gói' }
  ],
  shelfChecks: [],
  users: [
    { username: 'associate1', role: 'associate', fullName: 'Nguyễn Văn Nhân Viên', email: 'associate@smartshelf.vn' }
  ]
};

// [3] Hàm khởi tạo dữ liệu: Kiểm tra và nạp initialSeedData vào LocalStorage nếu chưa có
function initDataStore() {
  Object.keys(STORAGE_KEYS).forEach(key => {
    const storageKey = STORAGE_KEYS[key];
    if (!localStorage.getItem(storageKey)) {
      const entityKey = key.toLowerCase().replace(/_([a-z])/g, g => g[1].toUpperCase());
      if (initialSeedData[entityKey]) {
        localStorage.setItem(storageKey, JSON.stringify(initialSeedData[entityKey]));
      }
    }
  });
}
initDataStore(); // Chạy hàm khởi tạo ngay khi nạp file

// [4] Object DataStore tập hợp các hàm thao tác CRUD dữ liệu với LocalStorage
const DataStore = {
  // Hàm lấy toàn bộ danh sách bản ghi theo Key tên bảng
  get: (key) => JSON.parse(localStorage.getItem(STORAGE_KEYS[key]) || '[]'),
  
  // Hàm lưu ghi đè toàn bộ danh sách dữ liệu mới vào LocalStorage
  set: (key, data) => localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data)),
  
  // Hàm thêm một bản ghi mới vào mảng dữ liệu hiện tại
  add: (key, item) => {
    const list = DataStore.get(key);
    list.push(item);
    DataStore.set(key, list);
    return item;
  },
  
  // Hàm cập nhật các trường thông tin của một bản ghi theo ID
  update: (key, id, updatedFields) => {
    const list = DataStore.get(key);
    const index = list.findIndex(i => i.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedFields };
      DataStore.set(key, list);
      return list[index];
    }
    return null;
  }
};