// ====== Cursor glow ======
const glow = document.getElementById("cursorGlow");
window.addEventListener("mousemove", (e) => {
  if (!glow) return;
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ====== Year ======
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== Scroll reveal ======
const revealEls = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// ====== Typewriter (multi states) ======
const twText = document.getElementById("twText");
const lines = [
  "这里是我的个人空间。",
  "不用有用，不用解释。",
  "只要它像我。",
  "soft pink • glass • gentle motion"
];

let lineIdx = 0;
let charIdx = 0;
let deleting = false;

function tick() {
  if (!twText) return;

  const current = lines[lineIdx];

  if (!deleting) {
    twText.textContent = current.slice(0, charIdx++);
    if (charIdx > current.length + 10) {
      deleting = true;
    }
  } else {
    twText.textContent = current.slice(0, charIdx--);
    if (charIdx < 0) {
      deleting = false;
      charIdx = 0;
      lineIdx = (lineIdx + 1) % lines.length;
    }
  }

  const speed = deleting ? 28 : 42;
  setTimeout(tick, speed);
}
tick();

// ====== Entry gate + optional music ======
const entry = document.getElementById("entry");
const enterBtn = document.getElementById("enterBtn");
const musicBtn = document.getElementById("musicBtn");
const themeBtn = document.getElementById("themeBtn");

// （可选）如果你以后想加背景音乐：把 mp3 放到 assets/ 里，比如 assets/bgm.mp3
// 然后把下面的注释打开：
// const audio = new Audio("assets/bgm.mp3");
// audio.loop = true;

let musicOn = false;

function hideEntry() {
  if (!entry) return;
  entry.classList.add("hidden");
  entry.setAttribute("aria-hidden", "true");
}

enterBtn?.addEventListener("click", async () => {
  hideEntry();

  // 如果你启用了 bgm.mp3，上面 audio 取消注释，这里再取消注释即可：
  // try {
  //   if (!musicOn) {
  //     await audio.play();
  //     musicOn = true;
  //     musicBtn.textContent = "music: on";
  //   }
  // } catch(e) {}
});

musicBtn?.addEventListener("click", async () => {
  // 同样：需要你启用 audio 才有用
  // try{
  //   if(!musicOn){
  //     await audio.play();
  //     musicOn = true;
  //     musicBtn.textContent = "music: on";
  //   }else{
  //     audio.pause();
  //     musicOn = false;
  //     musicBtn.textContent = "music: off";
  //   }
  // }catch(e){}
  alert("音乐是可选项：你先把 bgm.mp3 放进 assets/ 再启用代码即可～");
});

// ====== Night mode ======
themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("night");
  themeBtn.textContent = document.body.classList.contains("night") ? "day" : "night";
});
