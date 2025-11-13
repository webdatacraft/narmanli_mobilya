document.addEventListener("DOMContentLoaded", () => {
  // =======================================================
  // 1. YUKARI DÖN BUTONU İŞLEVİ (Renk Değişimi ve Scroll)
  // =======================================================
  const backToTopBtn = document.getElementById("backToTop");
  const sections = document.querySelectorAll("section");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      // Buton görünürlüğü
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }

      // Section'a göre renk değiştirme
      const scrollPos = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const colorMode = section.dataset.scrollColor; // HTML'deki data-scroll-color değeri

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          if (colorMode === "dark") {
            backToTopBtn.style.backgroundColor = "#f5f5dc";
            backToTopBtn.style.color = "#800000";
          } else {
            backToTopBtn.style.backgroundColor = "#800000";
            backToTopBtn.style.color = "#f5f5dc";
          }
        }
      });
    });

    // Tıklama ile sayfanın en üstüne gitme
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =======================================================
  // 2. TELEFON NUMARASI SADECE RAKAM GİRİŞİ İŞLEVİ
  // =======================================================
  const phoneInput = document.querySelector(
    'input[placeholder="Telefon Numarası"]'
  );

  if (phoneInput) {
    phoneInput.addEventListener("keydown", (event) => {
      const allowedKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
        "Delete",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
      ];
      const isNumber =
        (event.key >= "0" && event.key <= "9") ||
        event.key.startsWith("Numpad");

      if (
        !allowedKeys.includes(event.key) &&
        !isNumber &&
        !(event.ctrlKey || event.metaKey)
      ) {
        event.preventDefault();
      }
    });
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
    });
  }

  // =======================================================
  // 3. BLOG SECTION DEVAMINI OKU (Tekil Açık Kalma) İŞLEVİ
  // =======================================================
  const blogButtons = document.querySelectorAll(".blog-btn");

  blogButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const contentDiv = button.closest(".content");
      const paragraph = contentDiv.querySelector("p");

      if (!paragraph) return;

      // Tıklananın şu an açık olup olmadığını kontrol et
      const isCurrentlyExpanded = paragraph.classList.contains("expanded");

      // --- TÜM Açık Olanları Kapat ---
      document
        .querySelectorAll(".blogs .box-container .box .content p.expanded")
        .forEach((p) => {
          p.classList.remove("expanded");
        });

      // --- TÜM Buton Metinlerini "Devamını Oku" Yap ---
      document.querySelectorAll(".blog-btn").forEach((btn) => {
        btn.textContent = "Devamını Oku";
      });

      // --- Eğer KAPALI ise, Şimdi Aç ---
      if (!isCurrentlyExpanded) {
        paragraph.classList.add("expanded");
        button.textContent = "Daha Az Oku";
      }
    });
  });

  // =======================================================
  // 4. BLOG YAZISINI BOŞLUĞA TIKLAYINCA KAPATMA İŞLEVİ
  // =======================================================
  document.addEventListener("click", (event) => {
    // Tıklanan öğenin, bir blog kutusunun (içinde Devamını Oku butonu dahil) içinde olup olmadığını kontrol et
    const isClickInsideBlogBox = event.target.closest(
      ".blogs .box-container .box"
    );

    // Eğer tıklama, *herhangi bir* blog kutusunun içinde DEĞİLSE
    if (!isClickInsideBlogBox) {
      const allExpandedParagraphs = document.querySelectorAll(
        ".blogs .box-container .box .content p.expanded"
      );

      if (allExpandedParagraphs.length > 0) {
        // Hepsini kapat
        allExpandedParagraphs.forEach((p) => {
          p.classList.remove("expanded");
        });

        // Tüm buton metinlerini varsayılana döndür
        document.querySelectorAll(".blog-btn").forEach((btn) => {
          btn.textContent = "Devamını Oku";
        });
      }
    }
  });
});
