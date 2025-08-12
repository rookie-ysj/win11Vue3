export interface Application {
  /**
   * 应用的名称
   */
  name: string
  /**
   * 应用的图标
   */
  icon: string
  /**
   * 应用是否在任务栏中显示
   */
  inTaskbar: boolean
  /**
   * 应用是否在桌面中显示
   */
  inDesktop: boolean
  /**
   * 应用是否在开始菜单中显示
   */
  inStartMenu: boolean
  /**
   * 应用的点击事件
   */
  onClick?: () => void
}

export type AnyFunc = (...args: any[]) => any
