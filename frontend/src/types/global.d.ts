interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string
          callback: (response: { credential: string }) => void
          cancel_on_tap_outside?: boolean
        }) => void
        renderButton: (
          element: HTMLElement,
          options: {
            type?: string
            shape?: string
            theme?: string
            text?: string
            size?: string
            width?: number
            logo_alignment?: string
          },
        ) => void
        prompt: () => void
        cancel: () => void
      }
    }
  }
}
