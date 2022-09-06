const setting = {
  /* page layout related */
  // sideBar or navbar show title
  title: '管理后台',
  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the title in Navbar
   */
  showNavbarTitle: false,
  /**
   * @type {boolean} true | false
   * @description Whether show the drop-down
   */
  ShowDropDown: true,
  /**
   * @type {boolean} true | false
   * @description Whether show Hamburger
   */
  showHamburger: true,
  /**
   * @type {boolean} true | false
   * @description Whether show TagsView
   */
  showTagsView: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the top Navbar
   */
  showTopNavbar: true,
  /* page  animation related */
  /**
   * @type {boolean} true | false
   * @description Whether need animation of main area
   */
  mainNeedAnimation: true,
  /**
   * @type {boolean} true | false
   * @description Whether need nprogress
   */
  isNeedNprogress: true,
  /**
   * @type {string} 'roles' | 'code'
   */
  permissionMode: 'roles',
  /**
   * @type {string | array} 'dev' | ['prod','dev'] according to the .env file props of VITE_APP_ENV
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['dev']
   */
  errorLog: ['dev', 'prod'],
  /*
   * show the version info
   * */
  showVersionInfo: true,
  /*
   * i18n setting default language
   * en/zh
   * */
  defaultLanguage: 'zh',
  /*
   * setting default defaultSize
   * large / default /small
   * */
  defaultSize: 'default',
  /*
   * vite.config.js base config
   * such as
   * */
  viteBasePath: './',
}

export default setting
