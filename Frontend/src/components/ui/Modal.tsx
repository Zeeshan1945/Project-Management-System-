import * as Dialog from '@radix-ui/react-dialog'
import { type ReactNode } from 'react'
import { Icon } from './Icon'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  compact?: boolean
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export function Modal({ isOpen, onClose, title, children, size = 'md', compact = false }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-100 bg-black/50" />
        <Dialog.Content
          className={`fixed left-1/2 top-1/2 z-100 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden sm:w-full ${sizeStyles[size]} bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl animate-in`}
        >
          <div
            className={`flex shrink-0 items-center justify-between border-b border-outline-variant ${compact ? 'px-4 py-3' : 'px-4 py-3 sm:px-6 sm:py-4'}`}
          >
            <Dialog.Title id="modal-title" className="min-w-0 pr-2 text-title-md font-bold text-primary">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="shrink-0 rounded-lg p-1 text-on-surface-variant hover:bg-surface-container-low"
                aria-label="Close modal"
              >
                <Icon name="close" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <div className={`overflow-y-auto overscroll-contain ${compact ? 'p-4' : 'p-4 sm:p-6'}`}>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
