(function () {
  function injectSidebarStyles() {
    if (document.getElementById("ib-sidebar-style")) {
      return;
    }

    var style = document.createElement("style");
    style.id = "ib-sidebar-style";
    style.textContent =
      ".ib-sidebar{width:280px !important;min-height:100vh !important;flex:0 0 280px !important;background:rgba(0,0,0,0.92) !important;color:#ffffff !important;padding:24px !important;display:flex !important;flex-direction:column !important;justify-content:space-between !important;gap:24px !important;box-shadow:0 24px 50px rgba(2,6,23,0.45) !important;font-family:'Segoe UI',sans-serif !important;}" +
      ".ib-sidebar .sidebar-logo,.ib-sidebar .logo{display:flex;align-items:center;gap:10px;color:#fff;margin-bottom:18px;}" +
      ".ib-sidebar .sidebar-logo img,.ib-sidebar .logo img{width:40px;height:40px;border-radius:999px;object-fit:contain;}" +
      ".ib-sidebar .logo h2,.ib-sidebar .sidebar-logo h2{margin:0;font-size:26px;font-weight:700;}" +
      ".ib-sidebar nav,.ib-sidebar #sideNav,.ib-sidebar .sidebar-nav{display:flex !important;flex-direction:column !important;gap:0 !important;margin-top:0 !important;}" +
      ".ib-sidebar nav a,.ib-sidebar #sideNav a,.ib-sidebar .sidebar-nav a{display:flex !important;align-items:center !important;gap:10px !important;padding:13px 14px !important;margin:10px 0 !important;border-radius:10px !important;text-decoration:none !important;color:#d1d5db !important;font-size:16px !important;font-weight:600 !important;white-space:nowrap !important;transition:background 0.25s ease,color 0.25s ease,box-shadow 0.25s ease !important;}" +
      ".ib-sidebar nav a i,.ib-sidebar #sideNav a i,.ib-sidebar .sidebar-nav a i{width:18px;min-width:18px;text-align:center;}" +
      ".ib-sidebar nav a span,.ib-sidebar #sideNav a span,.ib-sidebar .sidebar-nav a span{white-space:nowrap !important;overflow:hidden !important;text-overflow:ellipsis !important;min-width:0 !important;}" +
      ".ib-sidebar nav a:hover,.ib-sidebar #sideNav a:hover,.ib-sidebar .sidebar-nav a:hover{background:#1f2937;color:#ffffff;}" +
      ".ib-sidebar nav a.nav-active,.ib-sidebar #sideNav a.nav-active,.ib-sidebar .sidebar-nav a.nav-active,.ib-sidebar nav a.active,.ib-sidebar #sideNav a.active,.ib-sidebar .sidebar-nav a.active{background:#047857;color:#ffffff;box-shadow:inset 0 0 0 1px rgba(16,185,129,0.45);}" +
      ".ib-sidebar .sidebar-bottom{display:grid;gap:12px;}" +
      ".ib-sidebar .lang{background:rgba(255,255,255,0.08);padding:10px;border-radius:10px;}" +
      ".ib-sidebar .lang-title{margin-bottom:8px;font-size:13px;font-weight:700;}" +
      ".ib-sidebar #langSelect,.ib-sidebar .lang-select,.ib-sidebar .sidebar-lang{width:100%;background:rgba(17,24,39,0.9);color:#ffffff;border:1px solid rgba(255,255,255,0.25);border-radius:8px;padding:10px;font-size:12px;font-weight:700;}" +
      ".ib-sidebar[data-sidebar-role='user']{padding:20px !important;gap:14px !important;}" +
      ".ib-sidebar[data-sidebar-role='user'] .sidebar-logo,.ib-sidebar[data-sidebar-role='user'] .logo{margin-bottom:10px;}" +
      ".ib-sidebar[data-sidebar-role='user'] nav a,.ib-sidebar[data-sidebar-role='user'] #sideNav a,.ib-sidebar[data-sidebar-role='user'] .sidebar-nav a{padding:10px 12px !important;margin:5px 0 !important;font-size:15px !important;line-height:1.2 !important;}" +
      ".ib-sidebar[data-sidebar-role='user'] #openReportsOverlay{font-size:14px !important;}" +
      ".ib-sidebar[data-sidebar-role='user'] #openReportsOverlay span{white-space:nowrap !important;overflow:visible !important;text-overflow:clip !important;}" +
      ".ib-sidebar[data-sidebar-role='user'] .lang{padding:8px;}" +
      ".ib-sidebar[data-sidebar-role='user'] .lang-title{margin-bottom:6px;font-size:12px;}" +
      ".ib-sidebar[data-sidebar-role='user'] #langSelect,.ib-sidebar[data-sidebar-role='user'] .lang-select,.ib-sidebar[data-sidebar-role='user'] .sidebar-lang{padding:8px;font-size:11px;}" +
      ".ib-sidebar[data-sidebar-role='admin']{padding:22px !important;gap:18px !important;}" +
      ".ib-sidebar[data-sidebar-role='admin'] .sidebar-logo,.ib-sidebar[data-sidebar-role='admin'] .logo{margin-bottom:12px !important;}" +
      ".ib-sidebar[data-sidebar-role='admin'] nav a,.ib-sidebar[data-sidebar-role='admin'] #sideNav a,.ib-sidebar[data-sidebar-role='admin'] .sidebar-nav a{padding:11px 13px !important;margin:7px 0 !important;line-height:1.2 !important;}" +
      ".ib-sidebar[data-sidebar-role='admin'] .lang{padding:9px !important;}" +
      "@media (max-width:1080px){.ib-sidebar{position:static;width:100%;min-height:auto;}}";
    document.head.appendChild(style);
  }

  function detectRole(page) {
    var role = (localStorage.getItem("userRole") || "").toLowerCase();
    if (role === "admin" || role === "user") {
      return role;
    }

    var adminPages = ["index", "ajouter-objet", "objets", "localisations", "parametres", "notifications-admin"];
    var userPages = ["user", "mesobjet", "localisations-user", "parametres-user", "notifications-user"];

    if (adminPages.indexOf(page) >= 0 || page.indexOf("admin") >= 0) {
      return "admin";
    }
    if (userPages.indexOf(page) >= 0 || page.indexOf("user") >= 0) {
      return "user";
    }
    return "guest";
  }

  function markActiveLink(root, page) {
    var links = root.querySelectorAll("nav a[href]");
    for (var i = 0; i < links.length; i += 1) {
      var href = (links[i].getAttribute("href") || "").toLowerCase();
      var targetPage = href.split("#")[0].replace(".html", "");
      if (targetPage && targetPage === page) {
        links[i].classList.add("bg-emerald-700", "text-white", "shadow-lg", "nav-active", "active");
      }
    }
  }

  function activateLink(link, root) {
    if (!link) {
      return;
    }

    var links = root.querySelectorAll("nav a[href]");
    for (var i = 0; i < links.length; i += 1) {
      links[i].classList.remove("bg-emerald-700", "text-white", "shadow-lg", "nav-active", "active");
    }
    link.classList.add("bg-emerald-700", "text-white", "shadow-lg", "nav-active", "active");
  }

  function bindOverlayActiveBehavior(root) {
    var overlayIds = ["openHistoryOverlay", "openAdminReportsOverlay", "openFavoritesOverlay", "openReportsOverlay"];
    for (var i = 0; i < overlayIds.length; i += 1) {
      var trigger = root.querySelector("#" + overlayIds[i]);
      if (!trigger) {
        continue;
      }
      trigger.addEventListener("click", function () {
        activateLink(this, root);
      });
    }
  }

  function initUnifiedUserFavoritesOverlay(sidebarRoot) {
    if (window.__ibUnifiedFavoritesOverlayReady) {
      return;
    }
    window.__ibUnifiedFavoritesOverlayReady = true;

    function esc(value) {
      return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function parseJson(key) {
      try {
        var raw = localStorage.getItem(key);
        var parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }

    function normalizeFavorite(item, index) {
      var id = String((item && (item.id || item.object_id || item.code)) || ("fav-" + index));
      var name = String((item && (item.name || item.nom || item.title)) || "Objet sans nom");
      var type = String((item && (item.type || item.category || item.categorie)) || "").trim() || "Non specifie";
      var location = String((item && (item.location || item.localisation || item.room || item.salle)) || "").trim() || "Non specifie";
      var status = String((item && (item.status || item.etat)) || "").trim() || "Non specifie";
      var details = String((item && (item.description || item.detail || item.details || item.note)) || "Aucun détail disponible.");
      var addedAt = item && item.addedAt ? item.addedAt : null;
      var addedLabel = "-";
      if (addedAt) {
        var d = new Date(addedAt);
        if (!Number.isNaN(d.getTime())) {
          addedLabel = d.toLocaleDateString("fr-FR");
        }
      }
      return {
        id: id,
        name: name,
        type: type,
        location: location,
        status: status,
        details: details,
        addedLabel: addedLabel,
        raw: item || {}
      };
    }

    function getFavorites() {
      var source = parseJson("userFavorites");
      var list = [];
      for (var i = 0; i < source.length; i += 1) {
        list.push(normalizeFavorite(source[i], i));
      }
      return list;
    }

    function removeFavoriteById(id) {
      var source = parseJson("userFavorites");
      var next = [];
      for (var i = 0; i < source.length; i += 1) {
        var item = source[i] || {};
        var itemId = String(item.id || item.object_id || item.code || "");
        if (itemId !== String(id)) {
          next.push(item);
        }
      }
      localStorage.setItem("userFavorites", JSON.stringify(next));
      try {
        window.dispatchEvent(new CustomEvent("app:favorites-changed", { detail: { favorites: next } }));
      } catch (e) {
        // ignore
      }
    }

    function ensureStyle() {
      if (document.getElementById("ib-favorites-overlay-style")) {
        return;
      }
      var style = document.createElement("style");
      style.id = "ib-favorites-overlay-style";
      style.textContent =
        ".ib-fav-overlay{position:fixed;inset:0;z-index:2600;display:grid;place-items:center;}" +
        ".ib-fav-overlay[hidden]{display:none;}" +
        ".ib-fav-backdrop{position:absolute;inset:0;background:rgba(2,6,23,0.68);backdrop-filter:blur(4px);}" +
        ".ib-fav-panel{position:relative;width:min(760px,calc(100vw - 24px));max-height:calc(100vh - 42px);overflow:hidden;border-radius:14px;border:1px solid rgba(148,163,184,0.35);background:rgba(248,250,252,0.95);box-shadow:0 18px 36px rgba(2,6,23,0.35);}" +
        ".ib-fav-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border-bottom:1px solid #e2e8f0;background:rgba(241,245,249,0.9);color:#0f172a;}" +
        ".ib-fav-title{margin:0;font-size:16px;font-weight:800;}" +
        ".ib-fav-close{border:1px solid #cbd5e1;width:30px;height:30px;border-radius:999px;background:#fff;color:#0f172a;font-size:15px;cursor:pointer;}" +
        ".ib-fav-body{display:block;height:min(52vh,420px);overflow:auto;padding:8px 10px;background:rgba(248,250,252,0.92);}" +
        ".ib-fav-table{width:100%;border-collapse:collapse;}" +
        ".ib-fav-table thead th{text-align:left;padding:8px 10px;font-size:12px;font-weight:800;color:#0f172a;text-decoration:underline;text-underline-offset:3px;border-bottom:1px solid #e2e8f0;white-space:nowrap;}" +
        ".ib-fav-table tbody td{padding:8px 10px;font-size:12px;color:#0f172a;border-bottom:1px solid #f1f5f9;vertical-align:middle;}" +
        ".ib-fav-remove{border:1px solid #fecaca;background:#fff;color:#be123c;padding:6px 9px;border-radius:8px;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;}" +
        ".ib-fav-remove i{margin-right:6px;}" +
        ".ib-fav-empty{padding:20px;border:1px dashed #cbd5e1;border-radius:12px;color:#64748b;text-align:center;background:#fff;}" +
        "@media (max-width:900px){.ib-fav-panel{width:min(100vw - 12px,760px);} .ib-fav-body{height:min(56vh,430px);} .ib-fav-table thead th,.ib-fav-table tbody td{padding:7px 5px;font-size:11px;}}";
      document.head.appendChild(style);
    }

    function ensureOverlayShell() {
      var shell = document.getElementById("ibFavoritesOverlay");
      if (shell) {
        return shell;
      }
      ensureStyle();
      shell = document.createElement("div");
      shell.id = "ibFavoritesOverlay";
      shell.className = "ib-fav-overlay";
      shell.hidden = true;
      shell.innerHTML =
        '<div class="ib-fav-backdrop" id="ibFavBackdrop"></div>' +
        '<section class="ib-fav-panel" role="dialog" aria-modal="true" aria-labelledby="ibFavTitle">' +
          '<header class="ib-fav-head">' +
            '<div><h3 class="ib-fav-title" id="ibFavTitle">Mes favoris</h3></div>' +
            '<button type="button" class="ib-fav-close" id="ibFavClose" aria-label="Fermer">x</button>' +
          '</header>' +
          '<div class="ib-fav-body" id="ibFavList"></div>' +
        '</section>';
      document.body.appendChild(shell);

      function closeOverlay() {
        shell.hidden = true;
        document.body.style.overflow = "";
      }
      document.getElementById("ibFavBackdrop").addEventListener("click", closeOverlay);
      document.getElementById("ibFavClose").addEventListener("click", closeOverlay);
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !shell.hidden) {
          closeOverlay();
        }
      });

      return shell;
    }

    function renderFavoritesOverlay() {
      var listRoot = document.getElementById("ibFavList");
      if (!listRoot) {
        return;
      }

      var favorites = getFavorites();
      if (!favorites.length) {
        listRoot.innerHTML = '<div class="ib-fav-empty">Aucun favori pour le moment.</div>';
        return;
      }

      var rows = "";
      for (var i = 0; i < favorites.length; i += 1) {
        var fav = favorites[i];
        rows +=
          '<tr>' +
            '<td>' + esc(fav.name) + '</td>' +
            '<td>' + esc(fav.type) + '</td>' +
            '<td>' + esc(fav.location) + '</td>' +
            '<td>' + esc(fav.addedLabel) + '</td>' +
            '<td><button type="button" class="ib-fav-remove" data-fav-remove="' + esc(fav.id) + '"><i class="fas fa-heart-crack"></i>Retirer</button></td>' +
          '</tr>';
      }
      listRoot.innerHTML =
        '<table class="ib-fav-table">' +
          '<thead><tr><th>Nom</th><th>Type</th><th>Localisation</th><th>Date d\'ajout</th><th>Retirer des favoris</th></tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>';
    }

    function openFavoritesOverlay() {
      var shell = ensureOverlayShell();
      renderFavoritesOverlay();
      shell.hidden = false;
      document.body.style.overflow = "hidden";
    }

    function handleFavoritesTrigger(event, trigger) {
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
      }
      activateLink(trigger, sidebarRoot);
      openFavoritesOverlay();
    }

    var directTrigger = sidebarRoot.querySelector("#openFavoritesOverlay");
    if (directTrigger) {
      directTrigger.onclick = function (event) {
        handleFavoritesTrigger(event, directTrigger);
      };
      directTrigger.addEventListener("click", function (event) {
        handleFavoritesTrigger(event, directTrigger);
      }, true);
    }

    document.addEventListener("click", function (event) {
      var removeBtn = event.target.closest("[data-fav-remove]");
      if (removeBtn) {
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) {
          event.stopImmediatePropagation();
        }

        var removeId = String(removeBtn.getAttribute("data-fav-remove") || "");
        removeFavoriteById(removeId);
        renderFavoritesOverlay();
        return;
      }

      var favTrigger = event.target.closest("#openFavoritesOverlay");
      if (!favTrigger) {
        return;
      }
      handleFavoritesTrigger(event, favTrigger);
    }, true);
  }

  function patchUserHistoryLink(root, page) {
    var historyLink = root.querySelector("a[data-history-link='true']");
    if (!historyLink) {
      return;
    }

    if (page === "user" || page === "localisations-user") {
      historyLink.setAttribute("href", "#");
      historyLink.setAttribute("id", "openHistoryOverlay");
    }
  }

  var path = (window.location.pathname.split("/").pop() || "").toLowerCase();
  var page = (path.replace(".html", "") || "index").toLowerCase();
  var role = detectRole(page);

  if (role !== "admin" && role !== "user") {
    return;
  }

  var request = new XMLHttpRequest();
  request.open("GET", "sidebar.html", false);
  request.send(null);

  if (request.status < 200 || request.status >= 300) {
    return;
  }

  var parser = new DOMParser();
  var source = parser.parseFromString(request.responseText, "text/html");
  var templateId = role === "admin" ? "sidebar-admin-template" : "sidebar-user-template";
  var template = source.getElementById(templateId);

  if (!template || !template.content || !template.content.firstElementChild) {
    return;
  }

  var node = template.content.firstElementChild.cloneNode(true);
  injectSidebarStyles();
  if (role === "user") {
    patchUserHistoryLink(node, page);
  }
  markActiveLink(node, page);
  bindOverlayActiveBehavior(node);
  if (role === "user") {
    initUnifiedUserFavoritesOverlay(node);
  }

  var currentScript = document.currentScript;
  if (currentScript && currentScript.parentNode) {
    currentScript.parentNode.insertBefore(node, currentScript);
  }
})();
