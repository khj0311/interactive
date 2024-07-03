// Interface functions
(() => {
  const interface = document.getElementById('interface');

  const selector = {
    sidebar: '.interface-sidebar',
    goToTop: '.interface-top',
    settings: '.interface-settings',
  };

  class Interface {
    constructor(component) {
      this.el = {
        interface: component,
      };

      this.handler = {
        onClickSidebar: this.onClickSidebar.bind(this),
        onClickSettings: this.onClickSettings.bind(this),
      };

      Interface.instances.set(component, this);

      this.init();
    }

    init() {
      this.setElements();
      this.bindEvents();
    }

    setElements() {
      this.el.sidebar = this.el.interface.querySelector(selector.sidebar);
      this.el.settings = this.el.interface.querySelector(selector.settings);
    }

    bindEvents() {
      this.el.sidebar.addEventListener('click', this.handler.onClickSidebar);
      this.el.settings.addEventListener('click', this.handler.onClickSettings);
    }

    onClickSidebar() {
      if (!document.documentElement.classList.contains('sidebar-expanded')) {
        window.sidebar.expand();
      } else {
        window.sidebar.collapse();
      }
    }

    onClickSettings() {
      if (!document.documentElement.classList.contains('settings-expanded')) {
        window.settings.expand();
      } else {
        window.settings.collapse();
      }
    }
  }

  Interface.instances = new WeakMap();

  const init = () => {
    if (!Interface.instances.has(interface)) {
      new Interface(interface);
    }
  };

  const reInit = () => {
    if (!Interface.instances.has(interface)) {
      new Interface(interface);
    } else {
      Interface.instances.get(interface).reInit();
    }
  };

  document.addEventListener('DOMContentLoaded', init);

  window.interface = {
    init,
    reInit,
  };
})();

// Settings functions
(() => {
  const settings = document.getElementById('settings');

  const selector = {
    dimmed: '.settings-dimmed',
    header: '.settings-header',
    content: '.settings-content',
    closeButton: '.settings-header__button.settings-close',

    // Settings Color
    color: '.settings-color',
    colorButton: '.item-option__button',
  };

  class Settings {
    constructor(component) {
      this.el = {
        timeout: null,
        settings: component,
        theme: ['green', 'yellow', 'blue', 'red'],
      };

      this.handler = {
        closeLayer: this.closeLayer.bind(this),
        onClickColorChip: this.onClickColorChip.bind(this),
      };

      Settings.instances.set(component, this);

      this.init();
    }

    init() {
      this.setElements();
      this.bindEvents();
    }

    setElements() {
      this.el.dimmed = this.el.settings.querySelector(selector.dimmed);
      this.el.header = this.el.settings.querySelector(selector.header);
      this.el.content = this.el.settings.querySelector(selector.content);
      this.el.closeButton = this.el.settings.querySelector(selector.closeButton);

      this.el.color = this.el.settings.querySelector(selector.color);
      this.el.colorButtons = this.el.color.querySelectorAll(selector.colorButton);
    }

    bindEvents() {
      this.el.dimmed.addEventListener('click', this.handler.closeLayer);
      this.el.closeButton.addEventListener('click', this.handler.closeLayer);

      if (this.el.colorButtons.length > 0) {
        this.el.colorButtons.forEach((button) => {
          button.addEventListener('click', this.handler.onClickColorChip);
        });
      }
    }

    closeLayer() {
      this.collapse();
    }

    onClickColorChip(e) {
      e.preventDefault();

      const target = e.currentTarget;
      const themeColor = target.getAttribute('data-theme-color');

      this.el.colorButtons.forEach((button, idx) => {
        button.classList.remove('item-selected');
        document.documentElement.classList.remove(`theme-${this.el.theme[idx]}`);
      });

      target.classList.add('item-selected');
      document.documentElement.classList.add(themeColor);
    }

    expand() {
      document.documentElement.classList.add('settings-expanded');
      clearTimeout(this.el.timeout);
      this.el.timeout = setTimeout(() => {
        this.el.header.style.display = 'flex';
        this.el.content.style.display = 'flex';
      }, 150);
    }

    collapse() {
      document.documentElement.classList.remove('settings-expanded');
      clearTimeout(this.el.timeout);
      this.el.header.style.display = '';
      this.el.content.style.display = '';
    }
  }

  Settings.instances = new WeakMap();

  const init = () => {
    if (!Settings.instances.has(settings)) {
      new Settings(settings);
    }
  };

  const reInit = () => {
    if (!Settings.instances.has(settings)) {
      new Settings(settings);
    } else {
      Settings.instances.get(settings).reInit();
    }
  };

  const expand = () => {
    if (Settings.instances.has(settings)) {
      Settings.instances.get(settings).expand();
    }
  };

  const collapse = () => {
    if (Settings.instances.has(settings)) {
      Settings.instances.get(settings).collapse();
    }
  };

  document.addEventListener('DOMContentLoaded', init);

  window.settings = {
    init,
    reInit,
    expand,
    collapse,
  };
})();

// Sidebar functions
(() => {
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
      }, 150);
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
