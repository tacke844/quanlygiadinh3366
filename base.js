console.log("Hello from base.js!");

// Chọn tất cả phần tử .icon-item
const iconItems = document.querySelectorAll('.icon-item');

iconItems.forEach(item => {
  item.addEventListener('click', () => {
    // Chuyển hướng khi click
    window.location.href = "/login";
  });
});


