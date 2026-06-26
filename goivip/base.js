const CODE_API_URL = "https://lednpf.mockapi.dog/";
const REDIRECT_DELAY_MS = 3000;
const REDIRECT_URL = "../active/";

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

function showProcessingModal() {
  const modal = document.getElementById('processingModal');
  const progressBar = document.getElementById('modalProgressBar');
  const loadingPercentage = document.getElementById('modalLoadingPercentage');

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  progressBar.style.width = '0%';
  loadingPercentage.textContent = '0%';

  const startTime = performance.now();

  function updateProgress(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(Math.round((elapsedTime / REDIRECT_DELAY_MS) * 100), 100);

    progressBar.style.width = `${progress}%`;
    loadingPercentage.textContent = `${progress}%`;

    if (progress < 100) {
      requestAnimationFrame(updateProgress);
      return;
    }

    window.location.href = REDIRECT_URL;
  }

  requestAnimationFrame(updateProgress);
}

async function activateCode(button) {
  const input = button.previousElementSibling;

  try {
    const activationCode = await getActivationCode();

    if (input.value === activationCode) {
      showProcessingModal();
    } else {
      alert('Mã kích hoạt không đúng');
    }
  } catch (error) {
    console.error(error);
    alert('Không thể kiểm tra mã kích hoạt. Vui lòng thử lại sau!');
  }
}
