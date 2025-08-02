export interface Application {
  name: string
  icon: string
  inTaskbar: boolean
  inDesktop: boolean
  onClick?: () => void
}

export type AnyFunc = (...args: any[]) => any
