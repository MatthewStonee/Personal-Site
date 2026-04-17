import { reactive } from 'vue'

const DEFAULT_MESSAGE = 'Something went wrong. Please refresh and try again.'

let hideTimer

export const errorToastState = reactive({
  message: '',
  visible: false,
})

export function showGlobalError(message = DEFAULT_MESSAGE) {
  errorToastState.message = message
  errorToastState.visible = true

  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => {
    errorToastState.visible = false
  }, 6000)
}

export function dismissGlobalError() {
  if (hideTimer) clearTimeout(hideTimer)
  errorToastState.visible = false
}
