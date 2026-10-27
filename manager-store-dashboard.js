document.addEventListener('DOMContentLoaded', () => {
  const btnRunAI3 = document.getElementById('btnRunAI3');
  const ai3Modal = document.getElementById('ai3Modal');
  const btnCloseAI3 = document.getElementById('btnCloseAI3');
  const btnCreateAuditTask = document.getElementById('btnCreateAuditTask');

  if (btnRunAI3) {
    btnRunAI3.addEventListener('click', () => ai3Modal.classList.remove('hidden'));
    btnCloseAI3.addEventListener('click', () => ai3Modal.classList.add('hidden'));
    btnCreateAuditTask.addEventListener('click', () => {
      alert('✅ Đã tạo nhiệm vụ kiểm tra đột xuất!');
      ai3Modal.classList.add('hidden');
    });
  }
});