(() => {
  // Sidebar functions
  const sidebar = document.getElementById('sidebar');

  const selector = {
    // Sidebar
    dimmed: '.sidebar-dimmed',
    content: '.sidebar-content',
    // Main Menu
    menu: '.menu',
    menuList: '.menu-list',
    menuItem: '.menu-item',
    menuLink: '.menu-link',
    // Sub Menu
    subMenu: '.sub-menu',
  };

  class Sidebar {
    constructor(component) {
      this.el = {
        sidebar: component,
        currentPath: location.pathname,
      };

      this.handler = {
        onClickMenuLink: this.onClickMenuLink.bind(this),
        onClickDimmed: this.onClickDimmed.bind(this),
      };

      this.pathArr = this.el.currentPath.split('/').filter((item) => {
        if (item !== '') return item;
      });

      Sidebar.instances.set(component, this);

      this.init();
    }

    init() {
      // this.findPath();
      this.setElements();
      // this.drawSidebarMenu();
      this.drawAfterSetElements();
      this.bindEvents();
    }

    findPath(pathData = architecture, index = 0) {
      for (let i = 0; i < pathData.length; i++) {
        const data = pathData[i];
        const href = data.href.split('/').filter((item) => {
          if (item !== '') return item;
        });

        if (href[0] === this.pathArr[index]) {
          data.isPath = true;
          if (data.children && data.children.length > 0) {
            let afterIndex = index + 1;
            this.findPath(data.children, afterIndex);
          }
        } else {
          data.isPath = false;
        }
      }
    }

    drawSidebarMenu() {
      if (this.el.menuList) {
        this.el.menu.removeChild(this.el.menuList);
      }

      let menuList = '<ul class="menu-list">';
      menuList += this.drawMenu();
      menuList += '</ul>';

      this.el.menu.innerHTML = menuList;
    }

    drawMenu() {
      let menuItem = '';
      architecture.forEach((data) => {
        if (data.children.length > 0) {
          const href = data.href;
          const subMenuItem = this.drawSubMenu(data.children, href);
          menuItem += `
          <li class="menu-item${data.isPath ? ' menu-expanded' : ''}">
            <a href="javascript:void(0);" class="menu-link${data.href === this.el.currentPath ? ' menu-active' : ''}">
              <svg class="menu-link__icon">
                <use xlink:href="/resources/assets/images/icon-sprite.svg#icon-${data.icon}" />
              </svg>
              <span class="menu-link__title">
                ${data.title}
                <svg class="menu-link__title-arrow">
                  <use xlink:href="/resources/assets/images/icon-sprite.svg#icon-angle-right" />
                </svg>
              </span>
            </a>
            ${subMenuItem}
          </li>`;
        } else {
          menuItem += `
          <li class="menu-item menu-item__basic">
            <a href="${data.href}" class="menu-link${data.href === this.el.currentPath ? ' menu-active' : ''}">
            <svg class="menu-link__icon">
              <use xlink:href="/resources/assets/images/icon-sprite.svg#icon-${data.icon}" />
            </svg>
              <span class="menu-link__title">${data.title}</span>
            </a>
          </li>`;
        }
      });

      return menuItem;
    }

    drawSubMenu(subData, basePath) {
      let subMenu = `
      <div class="sub-menu">
        <div class="sub-menu-container">
          <div class="sub-menu-wrapper">
            <ul class="sub-menu-list">`;

      subData.forEach((data) => {
        const href = data.href !== '' ? basePath + data.href : 'javascript:void(0);';
        if (data.children.length > 0) {
          const subMenuItem = this.drawSubMenuItem(data.children, href);

          subMenu += `
          <div class="sub-menu-title">${data.title}</div>
          ${subMenuItem}`;
        } else {
          subMenu += `
          <li class="sub-menu-item">
            <a href="${href}" class="sub-menu-link${data.isPath ? ' menu-active' : ''}">${data.title}</a>
          </li>`;
        }
      });

      subMenu += `
            </ul>
          </div>
        </div>
      </div>`;

      return subMenu;
    }

    drawSubMenuItem(subItemData, basePath) {
      let subMenuItem = '';

      subItemData.forEach((data) => {
        const href = data.href !== '' ? basePath + data.href : 'javascript:void(0);';
        subMenuItem += `
        <li class="sub-menu-item">
          <a href="${href}" class="sub-menu-link${data.isPath ? ' menu-active' : ''}">${data.title}</a>
        </li>`;
      });

      return subMenuItem;
    }

    setElements() {
      this.el.dimmed = this.el.sidebar.querySelector(selector.dimmed);
      this.el.sidebarContent = this.el.sidebar.querySelector(selector.content);
      this.el.menu = this.el.sidebar.querySelector(selector.menu);
      this.el.menuList = this.el.menu.querySelector(selector.menuList);
    }

    drawAfterSetElements() {
      this.el.menuList = this.el.menu.querySelector(selector.menuList);
      this.el.menuLinks = this.el.menu.querySelectorAll(selector.menuLink);
    }

    bindEvents() {
      this.el.dimmed.addEventListener('click', this.handler.onClickDimmed);
      this.el.menuLinks.forEach((menuLink) => {
        menuLink.removeEventListener('click', this.handler.onClickMenuLink);
        menuLink.addEventListener('click', this.handler.onClickMenuLink);
      });
    }

    onClickMenuLink(e) {
      const menuLink = e.currentTarget;
      const menuItem = menuLink.closest(selector.menuItem);
      const subMenu = menuItem.querySelector(selector.subMenu);

      if (!menuItem.classList.contains('menu-item__basic')) {
        if (!menuItem.classList.contains('menu-expanded')) {
          menuItem.classList.add('menu-expanded');
        } else {
          menuItem.classList.remove('menu-expanded');
        }
      }
    }

    onClickDimmed() {
      this.collapse();
    }

    expand() {
      document.documentElement.classList.add('sidebar-expanded');
      setTimeout(() => {
        this.el.menu.style.display = 'block';
      }, 100);
    }

    collapse() {
      document.documentElement.classList.remove('sidebar-expanded');
      this.el.menu.style.display = '';
    }
  }

  Sidebar.instances = new WeakMap();

  const init = () => {
    if (!Sidebar.instances.has(sidebar)) {
      new Sidebar(sidebar);
    }
  };

  const reInit = () => {
    if (!Sidebar.instances.has(sidebar)) {
      new Sidebar(sidebar);
    } else {
      Sidebar.instances.get(sidebar).reInit();
    }
  };

  const expand = () => {
    if (Sidebar.instances.has(sidebar)) {
      Sidebar.instances.get(sidebar).expand();
    }
  };

  const collapse = () => {
    if (Sidebar.instances.has(sidebar)) {
      Sidebar.instances.get(sidebar).collapse();
    }
  };

  document.addEventListener('DOMContentLoaded', init);

  window.sidebar = {
    init,
    reInit,
    expand,
    collapse,
  };
})();
