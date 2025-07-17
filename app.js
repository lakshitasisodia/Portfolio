<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const path = window.location.pathname;

  // ----------------------
  // 1. REQUEST PAGE
  // ----------------------
  if (path.includes("request.html")) {
    const type = params.get("type");
    const id = params.get("id");

    if (!type || !id) {
      document.getElementById("request-content").innerHTML = "<p class='error'>Invalid request parameters.</p>";
      return;
    }

    const jsonPath = type === "work" ? "work.json" : "project.json";

    fetch(jsonPath)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not OK");
        return res.json();
      })
      .then(data => {
        const item = data.find(entry => entry.id === id);
        if (!item) throw new Error("Item not found in data");

        const container = document.getElementById("request-content");
        container.innerHTML = `
          <div class="request-card">
            <h1>${item.title}</h1>
            <div class="description">${marked.parse(item.long_description || "No detailed description available.")}</div>
            ${item.role ? `<p><strong>Role:</strong> ${item.role}</p>` : ""}
            ${item.duration ? `<p><strong>Duration:</strong> ${item.duration}</p>` : ""}
            ${item.certification_link ? `<p><a class="cert-link" href="${item.certification_link}" target="_blank">📄 View Certificate</a></p>` : ""}
          </div>
        `;
      })
      .catch(err => {
        document.getElementById("request-content").innerHTML = "<p class='error'>Failed to load content. Please try again later.</p>";
        console.error("Error loading data:", err);
      });

    return; // Exit early to avoid running index/project code
  }

  // Utility: Create a URL with query
  function createQueryURL(type, id) {
    return `request.html?type=${type}&id=${id}`;
  }

  // ----------------------
  // 2. INDEX PAGE
  // ----------------------
  if (path.includes("index.html") || path === "/" || path === "/portfolio/") {
    // Load Work Section
    fetch("work.json")
      .then(res => res.json())
      .then(data => {
        const workBox = document.querySelector(".work-box");
        if (workBox) {
          workBox.innerHTML = "";
          data.forEach(item => {
=======
// Detect current path
const path = window.location.pathname.toLowerCase();

// ✅ Log to verify script is loading
console.log("✅ app.js loaded");

// Utility to construct query URLs
function createQueryURL(type, id) {
  return `request.html?type=${type}&id=${id}`;
}

// ----------------------
// 1. INDEX PAGE
// ----------------------
if (path.includes("index.html") || path === "/" || path.includes("/portfolio/")) {
  console.log("📄 index.html detected");

  // 🔹 Load Work Items
  fetch("work.json")
    .then(res => res.json())
    .then(data => {
      const workBox = document.querySelector(".work-box");
      if (workBox) {
        workBox.innerHTML = "";
        data.forEach(item => {
          const div = document.createElement("div");
          div.className = "work-box-item";
          div.id = item.id;
          div.innerHTML = `<h2>${item.title}</h2><p>${item.short_description}</p>`;
          div.style.cursor = "pointer";
          div.onclick = () => {
            window.location.href = createQueryURL("work", item.id);
          };
          workBox.appendChild(div);
        });
      }
    })
    .catch(err => console.error("❌ Error loading work.json:", err));

  // 🔹 Load Big Projects
  fetch("project.json")
    .then(res => res.json())
    .then(data => {
      const impBox = document.querySelector(".imp-projects");
      if (impBox) {
        data
          .filter(item => item.type === "big")
          .forEach(item => {
>>>>>>> bb2f384f79360cc6d03ef2db1cb8a5e4fdbcc213
            const div = document.createElement("div");
            div.className = "work-box-item";
            div.id = item.id;
            div.innerHTML = `<h2>${item.title}</h2><p>${item.short_description}</p>`;
            div.style.cursor = "pointer";
            div.onclick = () => {
              window.location.href = createQueryURL("work", item.id);
            };
            workBox.appendChild(div);
          });
        }
      });

    // Load Big Projects
    fetch("project.json")
      .then(res => res.json())
      .then(data => {
        const impBox = document.querySelector(".imp-projects");
        if (impBox) {
          data
            .filter(item => item.type === "big")
            .forEach(item => {
              const div = document.createElement("div");
              div.className = "project-box";
              div.id = item.id;
              div.innerHTML = `<h2>${item.title}</h2><p>${item.short_description}</p>`;
              div.style.cursor = "pointer";
              div.onclick = () => {
                window.location.href = createQueryURL("project", item.id);
              };
              impBox.appendChild(div);
            });
        }
      });
  }

  // ----------------------
  // 3. PROJECT PAGE
  // ----------------------
  if (path.includes("project.html")) {
    fetch("project.json")
      .then(res => res.json())
      .then(data => {
        const projectHolder = document.querySelector(".project-section-holder");
        if (projectHolder) {
          projectHolder.innerHTML = "";
          data.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "project-section-holder-item";
            div.id = item.id;
            div.style = `--i:${index + 1}`;
            div.innerHTML = `
              <div class="project-section-holder-item-heading"><h1>${item.title}</h1></div>
              <div class="project-section-holder-item-description">${item.short_description}</div>
            `;
            div.style.cursor = "pointer";
            div.onclick = () => {
              window.location.href = createQueryURL("project", item.id);
            };
            projectHolder.appendChild(div);
          });
<<<<<<< HEAD
        }
      });
  }
});
=======
      }
    })
    .catch(err => console.error("❌ Error loading project.json:", err));
}

// ----------------------
// 2. PROJECT PAGE
// ----------------------
if (path.includes("project.html")) {
  console.log("📦 project.html detected");

  fetch("project.json")
    .then(res => res.json())
    .then(data => {
      const projectHolder = document.querySelector(".project-section-holder");
      if (projectHolder) {
        projectHolder.innerHTML = "";
        data.forEach((item, index) => {
          const div = document.createElement("div");
          div.className = "project-section-holder-item";
          div.id = item.id;
          div.style = `--i:${index + 1}`;
          div.innerHTML = `
            <div class="project-section-holder-item-heading"><h1>${item.title}</h1></div>
            <div class="project-section-holder-item-description">${item.short_description}</div>
          `;
          div.style.cursor = "pointer";
          div.onclick = () => {
            window.location.href = createQueryURL("project", item.id);
          };
          projectHolder.appendChild(div);
        });
      }
    })
    .catch(err => console.error("❌ Error loading project.json:", err));
}

// ----------------------
// 3. REQUEST PAGE
// ----------------------
if (path.includes("request.html")) {
  console.log("📄 request.html detected");

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const id = params.get("id");

  const jsonPath = type === "work" ? "work.json" : "project.json";

  fetch(jsonPath)
    .then(res => res.json())
    .then(data => {
      const item = data.find(entry => entry.id === id);
      if (!item) {
        console.warn("⚠️ No matching item found for id:", id);
        return;
      }

      const container = document.createElement("div");
      container.className = "request-container";
      container.innerHTML = `
        <h1>${item.title}</h1>
        <p>${item.long_description}</p>
        ${item.role ? `<p><strong>Role:</strong> ${item.role}</p>` : ""}
        ${item.duration ? `<p><strong>Duration:</strong> ${item.duration}</p>` : ""}
        ${item.certification_link ? `<p><a href="${item.certification_link}" target="_blank">View Certificate</a></p>` : ""}
      `;

      document.body.innerHTML = "";
      document.body.appendChild(container);
    })
    .catch(err => console.error(`❌ Error loading ${jsonPath}:`, err));
}
>>>>>>> bb2f384f79360cc6d03ef2db1cb8a5e4fdbcc213
