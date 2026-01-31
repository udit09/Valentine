let chapter = 0;

const chapters = [
  {
    title: "📞 Our First Call ✨",
    image: "images/memory1.jpg"
  },
  {
    title: "🤳 Our First Selfie ❤️",
    image: "images/memory2.jpg"
  },
  {
    title: "🎬 Our Om Shanti Om Moment ☺️",
    image: "images/memory3.jpg"
  },
  {
    title: "🛺 Rickshaw In Dino ❤️",
    image: "images/memory4.jpg"
  },
  {
    title: "😂 Intentional Candids 💖",
    image: "images/memory5.jpg"
  },
  {
    title: "😛 Best Afternoon Ever? 😜",
    image: "images/memory6.jpg"
  },
  {
    title: "📝 Officially ❤️",
    image: "images/memory7.jpg"
  },
  {
    title: "💕 First & Only 22nd in India 💕",
    image: "images/memory8.jpg"
  },
  {
    title: "🧿 Rab Ne Bana Di Jodi Feels 💋",
    image: "images/memory9.jpg"
  },
  {
    title: "😜 Suffocating Bathroom? 🏨",
    image: "images/memory10.jpg"
  },
  {
    title: "💜 Love Is In The Air 💜",
    image: "images/memory11.jpg"
  },
  {
    title: "🏖️ Talented Kayak Guide 🛶",
    image: "images/memory12.jpg"
  },
  {
    title: "📸 Influencer Couple 😂",
    image: "images/memory13.jpg"
  },
  {
    title: "🌅 MINT! 💛",
    image: "images/memory14.jpg"
  },
  {
    title: "🧿 Beautiful People! 🧿",
    image: "images/memory15.jpg"
  }
];

// Prevent double-click spam during animation
let isTransitioning = false;

function nextChapter() {
  if (isTransitioning) return;
  isTransitioning = true;

  const titleEl = document.getElementById("title");
  const photoEl = document.getElementById("photo");

  // Fade out current content
  titleEl.classList.add("fade-out");
  photoEl.classList.add("fade-out");

  setTimeout(() => {
    // Move to next chapter AFTER fade-out
    chapter++;

    if (chapter < chapters.length) {
      // Update content
      titleEl.innerText = chapters[chapter].title;
      photoEl.src = chapters[chapter].image;

      // Remove fade-out + trigger fade-in
      titleEl.classList.remove("fade-out");
      photoEl.classList.remove("fade-out");

      // (Optional) add fade-in class if you’re using it
      titleEl.classList.add("fade-in");
      photoEl.classList.add("fade-in");

      // Clear fade-in class after it runs so it can re-trigger next time
      setTimeout(() => {
        titleEl.classList.remove("fade-in");
        photoEl.classList.remove("fade-in");
        isTransitioning = false;
      }, 800);
    } else {
      showFinalPage();
      isTransitioning = false;
    }
  }, 750); // match your CSS fade-out duration (~0.6s)
}

function showFinalPage() {
  // Create bubble container only once
  if (!document.getElementById("bubbleContainer")) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div class="bubble-container" id="bubbleContainer"></div>`
    );
    createMemoryBubbles();
  }

  document.querySelector(".container").innerHTML = `
    <h1 class="pulse">🌹 Will You Be My Valentine Forever? 🌹</h1>

    <img src="images/final.jpg" class="final-photo" alt="final">

    <p>🧸💖🧸💖🧸</p>
    <p>I choose you. Always.</p>
  `;
}

function createMemoryBubbles() {
  const container = document.getElementById("bubbleContainer");
  if (!container) return;

  const maxBubblesOnScreen = 13;  // you wanted 10–13
  const spawnInterval = 900;      // faster (was 1200)
  let bubbleIndex = 0;

  // Prefill quickly so it doesn’t feel empty
  for (let i = 0; i < 8; i++) {
  setTimeout(() => spawnBubble(container), i * 250);
}

  setInterval(() => {
    if (container.children.length >= maxBubblesOnScreen) return;
    spawnBubble(container);
  }, spawnInterval);
}

function spawnBubble(container) {
  const bubble = document.createElement("div");
  bubble.className = "bubble";

  // Size: slightly varied, organic
  const size = Math.random() * 40 + 60; // 60–100px
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

  // Horizontal position (avoid edges)
  bubble.style.left = Math.random() * 85 + "vw";

  // Duration: random so bubbles never align
  const duration = Math.random() * 8 + 16; // 16–24s
  bubble.style.animationDuration = duration + "s";

  // RANDOM memory image every time
  const randomIndex = Math.floor(Math.random() * chapters.length);
  bubble.style.backgroundImage = `url(${chapters[randomIndex].image})`;

  container.appendChild(bubble);

  setTimeout(() => bubble.remove(), duration * 1000);
}
