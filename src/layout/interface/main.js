(() => {
  // Interface functions
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

(() => {
  // Settings functions
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
