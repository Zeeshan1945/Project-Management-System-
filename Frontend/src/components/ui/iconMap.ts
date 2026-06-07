import type { ComponentType } from 'react'
import {
  ActivityIcon,
  BookmarkCheckIcon,
  CircleCheckBigIcon,
  ClipboardIcon,
  DashboardIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  EyeOffIcon,
  FolderIcon,
  FolderOpenIcon,
  GithubIcon,
  KeyRoundIcon,
  LayoutGridIcon,
  LayoutListIcon,
  LoaderCircleIcon,
  LockIcon,
  LogoutIcon,
  MailIcon,
  MenuIcon,
  MoonIcon,
  MoveLeftIcon,
  MoveRightIcon,
  PlusIcon,
  SunIcon,
  Trash2Icon,
  TriangleAlertIcon,
  UserIcon,
  UserPenIcon,
  XIcon,
  ZapIcon,
} from '@animateicons/react/lucide'

type AnimatedIconProps = {
  size?: number
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
  isAnimated?: boolean
}

export type IconName =
  | 'folder_shared'
  | 'list_alt'
  | 'task_alt'
  | 'pending_actions'
  | 'dashboard'
  | 'folder'
  | 'assignment'
  | 'switch'
  | 'logout'
  | 'menu'
  | 'person'
  | 'add'
  | 'view_kanban'
  | 'view_list'
  | 'folder_open'
  | 'calendar_today'
  | 'edit'
  | 'delete'
  | 'lock_reset'
  | 'arrow_forward'
  | 'keyboard_backspace'
  | 'lock'
  | 'close'
  | 'light_mode'
  | 'dark_mode'
  | 'drag_indicator'
  | 'event'
  | 'visibility'
  | 'visibility_off'
  | 'error'
  | 'progress_activity'
  | 'mail'
  | 'github'

export const iconMap: Record<IconName, ComponentType<AnimatedIconProps>> = {
  folder_shared: FolderOpenIcon,
  list_alt: LayoutListIcon,
  task_alt: CircleCheckBigIcon,
  pending_actions: ActivityIcon,
  dashboard: DashboardIcon,
  folder: FolderIcon,
  assignment: ClipboardIcon,
  switch: ZapIcon,
  logout: LogoutIcon,
  menu: MenuIcon,
  person: UserIcon,
  add: PlusIcon,
  view_kanban: LayoutGridIcon,
  view_list: LayoutListIcon,
  folder_open: FolderOpenIcon,
  calendar_today: BookmarkCheckIcon,
  edit: UserPenIcon,
  delete: Trash2Icon,
  lock_reset: KeyRoundIcon,
  arrow_forward: MoveRightIcon,
  keyboard_backspace: MoveLeftIcon,
  lock: LockIcon,
  close: XIcon,
  light_mode: SunIcon,
  dark_mode: MoonIcon,
  drag_indicator: EllipsisVerticalIcon,
  event: BookmarkCheckIcon,
  visibility: EyeIcon,
  visibility_off: EyeOffIcon,
  error: TriangleAlertIcon,
  progress_activity: LoaderCircleIcon,
  mail: MailIcon,
  github: GithubIcon,
}

const textSizeMap: Record<string, number> = {
  'text-xs': 12,
  'text-sm': 14,
  'text-base': 16,
  'text-lg': 18,
  'text-xl': 20,
  'text-2xl': 24,
  'text-3xl': 30,
  'text-4xl': 36,
  'text-5xl': 48,
  'text-[18px]': 18,
  'text-[20px]': 20,
}

export function resolveIconSize(className: string): number {
  for (const [token, size] of Object.entries(textSizeMap)) {
    if (className.includes(token)) {
      return size
    }
  }

  return 24
}
