// Mảng chứa toàn bộ các số seeding hợp lý hơn
const seedingData = [
"0938.147.xxx",
"0906.934.xxx",
"0993.215.xxx",
"0914.802.xxx",
"0962.579.xxx",
"0927.318.xxx",
"0981.460.xxx",
"0943.986.xxx",
"0909.422.xxx",
"0973.641.xxx",
"0930.857.xxx",
"0921.509.xxx",
"0998.274.xxx",
"0917.630.xxx",
"0969.125.xxx",
"0948.403.xxx",
"0952.781.xxx",
"0904.639.xxx",
"0987.352.xxx",
"0929.714.xxx",
"0935.206.xxx",
"0910.948.xxx",
"0991.537.xxx",
"0940.862.xxx",
"0979.314.xxx",
"0958.470.xxx",
"0902.683.xxx",
"0974.836.xxx",
"0905.172.xxx",
"0916.493.xxx",
"0989.240.xxx",
"0946.781.xxx",
"0997.305.xxx",
"0939.658.xxx",
"0964.917.xxx",
"0908.541.xxx",
"0926.480.xxx",
"0971.309.xxx",
"0889.437.xxx",
"0902.961.xxx",
"0914.683.xxx",
"0896.705.xxx",
"0983.249.xxx",
"0879.561.xxx",
"0942.870.xxx",
"0935.714.xxx",
"0968.134.xxx",
"0898.320.xxx",
"0907.592.xxx",
"0919.807.xxx",
"0994.318.xxx",
"0948.657.xxx",
"0931.980.xxx",
"0985.742.xxx",
"0892.614.xxx",
"0871.395.xxx",
"0909.824.xxx",
"0916.258.xxx",
"0990.973.xxx",
"0940.316.xxx",
"0933.547.xxx",
"0965.209.xxx",
"0883.784.xxx",
"0897.153.xxx",
"0875.460.xxx",
"0904.937.xxx",
"0912.618.xxx",
"0980.371.xxx",
"0947.895.xxx",
"0939.412.xxx",
"0999.580.xxx",
"0963.841.xxx",
"0887.290.xxx",
"0906.183.xxx",
"0910.794.xxx",
"0988.675.xxx",
"0895.934.xxx",
"0872.860.xxx",
"0944.351.xxx",
"0932.709.xxx",
"0961.582.xxx",
"0893.126.xxx",
"0901.867.xxx",
"0917.903.xxx",
"0986.420.xxx",
"0880.538.xxx",
"0878.296.xxx",
"0941.862.xxx",
"0984.793.xxx",
"0934.125.xxx",
"0918.670.xxx",
"0995.382.xxx",
"0903.964.xxx",
"0949.251.xxx",
"0967.840.xxx",
"0936.507.xxx",
"0928.734.xxx",
"0976.198.xxx",
"0999.472.xxx",
"0901.856.xxx",
"0913.295.xxx",
"0986.510.xxx",
"0944.709.xxx",
"0937.963.xxx",
"0960.438.xxx",
"0983.195.xxx",
"0932.740.xxx",
"0930.456.xxx"
  
];

// Sau khi trang tải xong, ta bắt đầu xử lý
window.onload = function() {
  loadSeeding();
};

// Hàm loadSeeding(): tạo các thẻ <li> cho từng dòng seeding
function loadSeeding() {
  const seedingBox = document.getElementById('seedingBox');

  // Tạo <li> cho từng số trong seedingData
  seedingData.forEach(number => {
      const li = document.createElement('li');
      li.textContent = `Tài khoản: ${number} - Đã Kích Hoạt Thành Công`;
      seedingBox.appendChild(li);
  });

  // Bắt đầu chạy hiệu ứng cuộn
  startScrolling();
}

// startScrolling(): thiết lập vòng lặp cuộn
function startScrolling() {
  const seedingBox = document.getElementById('seedingBox');
  let currentTop = 0;
  const lineHeight = 22; // Điều chỉnh chiều cao mỗi dòng cho phù hợp với mobile
  const totalLines = seedingData.length;
  const scrollInterval = 1000;

  function scrollStep() {
      currentTop -= lineHeight;
      if (Math.abs(currentTop) >= lineHeight * totalLines) {
          currentTop = 0;
      }
      seedingBox.style.top = currentTop + "px";
  }

  setInterval(scrollStep, scrollInterval);
}

const CODE_API_URL = "https://lednpf.mockapi.dog/";

async function getSoftwareCode() {
  const response = await fetch(CODE_API_URL, { method: "GET" });

  if (!response.ok) {
      throw new Error("Không thể tải mã phần mềm");
  }

  const data = await response.json();
  const code = Array.isArray(data) ? data[0]?.ma1 : data?.ma1;

  if (!code) {
      throw new Error("API không trả về mã phần mềm");
  }

  return String(code);
}

// Hàm login(): kiểm tra pass từ API, nếu đúng => hiển thị loading 5s => chuyển trang
async function login() {
  const phoneCode = document.getElementById('phoneCode').value;
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const softwareCode = document.getElementById('softwareCode').value.trim();

  if (!phoneNumber || !softwareCode) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
  }

  try {
      const apiSoftwareCode = await getSoftwareCode();

      if (softwareCode !== apiSoftwareCode) {
          alert("Mã phần mềm (pass) không đúng!");
          return;
      }

      showLoadingAndRedirect();
  } catch (error) {
      console.error(error);
      alert("Không thể kiểm tra mã phần mềm. Vui lòng thử lại sau!");
  }
}

// Hàm hiển thị overlay loading và đếm từ 0% đến 100% trong 5s
function showLoadingAndRedirect() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.style.visibility = 'visible';

  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  let percent = 0;
  const totalTime = 5000;
  const steps = 100;
  const intervalTime = totalTime / steps;

  const interval = setInterval(() => {
      percent++;
      progressBar.style.width = percent + '%';
      progressText.textContent = percent + '%';

      if (percent >= 100) {
          clearInterval(interval);
          window.location.href = "../goivip/";
      }
  }, intervalTime);
}
