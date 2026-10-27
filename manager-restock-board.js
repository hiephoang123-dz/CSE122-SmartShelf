document.addEventListener('DOMContentLoaded', () => {
  const assignBtns = document.querySelectorAll('.btn-assign');
  assignBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('✅ Đã phân công nhiệm vụ thành công cho nhân viên!');
    });
  });
});