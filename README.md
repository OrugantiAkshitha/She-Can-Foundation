# 🌸 She Can Foundation 🌸

[![GitHub Pages](https://img.shields.io/badge/Live-Website-e91e63?style=flat-for-the-badge&logo=githubpages&logoColor=white)](https://orugantiakshitha.github.io/She-Can-Foundation/)
[![Built With](https://img.shields.io/badge/Built%20With-HTML%20%7C%20CSS%20%7C%20JS-5e35b1?style=flat-for-the-badge)](https://github.com/orugantiakshitha/She-Can-Foundation)

An elegant, fully responsive single-page web platform built for the **She Can Foundation**—an organization dedicated to empowering women through education, mentorship, and career growth. This application combines modern fluid styling tokens with robust client-side state engines to manage live registrations, track foundation milestones, and provide administrative control oversight.

---

## 🚀 Live Demo
Check out the live interactive deployment here:  
👉 **[https://orugantiakshitha.github.io/She-Can-Foundation/](https://orugantiakshitha.github.io/She-Can-Foundation/)**

---

## ✨ Key Features

* **🌓 Adaptive Theme Engine (Light/Dark Mode):** Features system-aware style synchronization (`prefers-color-scheme`) with persistent fallback memory storage via `localStorage` to prevent screen flickering between page reloads.
* **📊 Asynchronous Scroll-Bound Counters:** Automated impact statistics powered by an architectural `IntersectionObserver` framework that triggers individual metric tickers smoothly as users scroll into viewport milestones.
* **🔄 Interactive 3D Flip Cards:** Engaging component interaction blocks inside program grids that rotate dynamically on user clicks to reveal deeper resource summaries.
* **📬 Seamless Form Pipelines (Web3Forms API):** Intercepts input actions to validate and dispatch secure payloads silently to backend communication layers, without disruptive external page redirects.
* **📢 Real-Time Toast Notifications:** Extracts input criteria (`capturedName`, `capturedRole`) during execution to feed confirmation parameters instantly onto live banner components (`#successCard`, `#metricCard`, `#alertCard`).
* **⚙️ Advanced Administrative Joiners Directory Dashboard:**
    * **Live Viewer Matrix:** Clicking the *Members Joined* card populates an interactive, overlay control panel (`#adminDashboardModal`) detailing live repository arrays.
    * **🔍 Real-Time Query Filtering:** Instant text search capabilities that filter data rows natively by name or role matches as you type.
    * **✉️ Targeted Mail Hooks & Bulk Broadcast:** Single-click email updates alongside a global communication broadcast action that securely packs active records into blind carbon copy arrays (`bcc`) via client `mailto:` pathways.
    * **📥 CSV Data Spreadsheet Export:** Built-in table compilation routine that transforms internal database objects on the fly into a downloadable `.csv` data sheet layout.

---

## 🛠️ Tech Stack & Dependencies

* **HTML5:** Semantic structure, accessible layout blocks, forms, and template dashboard components.
* **CSS3:** Custom property design tokens, dark theme variations, CSS grid/flexbox layouts, keyframe animation engines, and device-responsive viewports.
* **Vanilla JavaScript (ES6+):** Asynchronous fetch event loops, data schema models, intersection tracking loops, and client-side memory storage systems.
* **FontAwesome Icons v6:** High-resolution scalable vector typography icons.

---

## 📐 Logic Layer Insights

### Live Member Calculation
The baseline parameters dynamically combine a static foundation milestone count with current browser-cached record sets:
$$\text{Total Members} = 1243 + \text{joinersArray.length}$$

### Local Cache Management
User data points are maintained across sandbox keys to isolate properties safely between visitor cycles:
* `foundationJoinersList`: Holds JSON serialized object arrays tracking live registration indices.
* `theme`: Stores active string keys (`dark` vs `light`) mapped to explicit document root hooks.

---

## 📂 Project Structure

```text
She-Can-Foundation/
│
├── index.html          # Main application structure, layouts & overlay modal templates
├── style.css           # UI design properties, responsive breakpoints, variable maps
├── js/
│   └── script.js       # Core automation logic, form processors, data managers
└── README.md           # Documentation layout
