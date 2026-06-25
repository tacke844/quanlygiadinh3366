const CODE_API_URL = "https://lednpf.mockapi.dog/";

async function getActivationCode() {
  const response = await fetch(CODE_API_URL, { method: "GET" });

  if (!response.ok) {
    throw new Error("Không thể tải mã kích hoạt");
  }

  const data = await response.json();
  const code = Array.isArray(data) ? data[0]?.ma2 : data?.ma2;

  if (!code) {
    throw new Error("API không trả về mã kích hoạt");
  }

  return String(code);
}

function toggleCodeInput(button) {
  const codeInputDiv = button.nextElementSibling;
  codeInputDiv.classList.toggle('hidden');
}

async function activateCode(button) {
  const input = button.previousElementSibling;

  try {
    const activationCode = await getActivationCode();

    if (input.value === activationCode) {
      const progressContainer = button.nextElementSibling;
      const progressBar = progressContainer.firstElementChild;
      const loadingText = progressContainer.nextElementSibling;
      const loadingPercentage = loadingText.querySelector('#loadingPercentage');

      progressContainer.classList.remove('hidden');
      loadingText.style.display = 'block';

      let width = 0;
      const interval = setInterval(() => {
        width += 2;
        progressBar.style.width = width + '%';
        loadingPercentage.textContent = width + '%';

        if (width >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            window.location.href = '../active/';
          }, 500);
        }
      }, 100);
    } else {
      alert('Mã kích hoạt không đúng');
    }
  } catch (error) {
    console.error(error);
    alert('Không thể kiểm tra mã kích hoạt. Vui lòng thử lại sau!');
  }
}
