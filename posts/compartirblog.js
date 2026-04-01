 document.getElementById("year").textContent = new Date().getFullYear();

      function shareArticle() {
        if (navigator.share) {
          navigator.share({
            title: document.title,
            url: window.location.href,
          });
        } else {
          copyLink();
        }
      }

      function copyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const msg = document.getElementById("copyMessage");
          msg.style.display = "block";
          setTimeout(() => {
            msg.style.display = "none";
          }, 2000);
        });
      }