//   LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful 🎉");
        window.location.href = "/dashboard";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  });
}

//   REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful 🎉");
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  });
}

//   ADD MEMORY
const memoryForm = document.getElementById("memoryForm");

if (memoryForm) {
  memoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("privacy", document.getElementById("privacy").value);
    formData.append("location", document.getElementById("location").value);
    formData.append("date", document.getElementById("date").value);

    const imageFile = document.getElementById("image").files[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("/api/memories", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Memory Added 🎉");
        window.location.href = "/timeline";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  });
}

//   FETCH MEMORIES

const memoriesContainer = document.getElementById("memoriesContainer");

if (memoriesContainer) {
  fetchMemories();
}

const fallbackMemoryImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatMemoryDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getMemoryImage(memory, index) {
  if (memory.image) {
    return memory.image;
  }

  return fallbackMemoryImages[index % fallbackMemoryImages.length];
}

async function fetchMemories() {
  try {
    const response = await fetch("/api/memories", { credentials: "include" });

    if (!response.ok) {
      console.error("Failed to fetch memories");
      return;
    }

    const memories = await response.json();
    window.allMemories = memories;
    displayMemories(memories);
  } catch (error) {
    console.error(error);
  }
}


//   DISPLAY MEMORIES
function displayMemories(memories) {
  memoriesContainer.innerHTML = "";

  if (!memories || memories.length === 0) {
    memoriesContainer.innerHTML = `
      <div class="empty-state">
        <h3>No memories yet</h3>
        <p>Start adding moments to build your timeline.</p>
      </div>`;
    return;
  }

  memories.forEach((memory, index) => {
    const imageUrl = getMemoryImage(memory, index);

    memoriesContainer.innerHTML += `
    <article class="memory-card">
      <div class="memory-media">
        <img
          src="${imageUrl}"
          alt="${escapeHtml(memory.title || "Memory")}" 
          loading="lazy"
          onerror="this.src='${fallbackMemoryImages[0]}'"
        />
      </div>
      <div class="memory-content">
        <span class="memory-category"> "Memory" </span>
        <h2>${escapeHtml(memory.title || "Untitled memory")}</h2>
        <p>${escapeHtml(memory.description || "")}</p>
        ${memory.location ? `<p>📍 ${memory.location}</p>` : ""}
        <p>🌍 ${memory.privacy}</p>
        <p>📅 ${formatMemoryDate(memory.date)}</p>
        <div class="memory-buttons">
          <button class="edit-btn" onclick="editMemory('${memory._id}')">Edit</button>
          <button class="delete-btn" onclick="deleteMemory('${memory._id}')">Delete</button>
        </div>
      </div>
    </article>`;
  });
}

//   DELETE MEMORY
async function deleteMemory(id) {
  if (!confirm("Are you sure you want to delete this memory?")) return;

  try {
    const response = await fetch(`/api/memories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();
    alert(data.message);
    fetchMemories();
  } catch (error) {
    console.error(error);
    alert("Failed to delete memory");
  }
}


//   EDIT MEMORY

async function editMemory(id) {
  const title = prompt("Enter new title (leave blank to keep current):");
  // User cancelled
  if (title === null ) return;

  try {
    const body = {};
    if (title) body.title = title;

    const response = await fetch(`/api/memories/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Memory Updated ✨");
      fetchMemories();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to update memory");
  }
}

//   LOGOUT

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  });
}


//   SLIDESHOW

const slideshowBtn = document.getElementById("slideshowBtn");
const slideshowModal = document.getElementById("slideshowModal");
const slideImage = document.getElementById("slideImage");

let slideshowIndex = 0;
let slideshowInterval;

if (slideshowBtn) {
  slideshowBtn.addEventListener("click", () => {
    if (!window.allMemories || window.allMemories.length === 0) {
      alert("No memories found");
      return;
    }

    // FIX: Use relative URLs instead of hardcoded localhost:5000
    const images = window.allMemories
      .filter((memory) => memory.image)
      .map((memory) => memory.image); // already a relative path like /uploads/...

    if (images.length === 0) {
      alert("No images available for slideshow");
      return;
    }

    slideshowModal.style.display = "flex";
    slideshowIndex = 0;
    slideImage.src = images[slideshowIndex];

    slideshowInterval = setInterval(() => {
      slideshowIndex = (slideshowIndex + 1) % images.length;
      slideImage.src = images[slideshowIndex];
    }, 1000);
  });
}
