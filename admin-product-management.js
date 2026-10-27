document.addEventListener('DOMContentLoaded', () => {
  const pSearch = document.getElementById('pSearch');
  if (pSearch) {
    pSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll('#productTableBody tr');
      rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  }

  const btnAdd = document.getElementById('btnAddProduct');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const name = prompt("Nhập tên sản phẩm mới:");
      if (!name) return;
      const tbody = document.getElementById('productTableBody');
      tbody.insertAdjacentHTML('beforeend', `<tr><td><strong>P07</strong></td><td>${name}</td><td>Chưa phân loại</td><td><button class="btn btn-danger" onclick="this.closest('tr').remove()">Xóa</button></td></tr>`);
    });
  }
});