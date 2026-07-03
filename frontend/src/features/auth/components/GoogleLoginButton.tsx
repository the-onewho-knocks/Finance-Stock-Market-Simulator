import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { setUser, setToken, setError } from '../store/authSlice'
import type { AppDispatch } from '../../../app/store'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '230330457774-bpd729119de1oml3udlv7nehj3n7gcmj.apps.googleusercontent.com'

export function GoogleLoginButton() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const buttonRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  const handleCredential = async (credential: string) => {
    try {
      const { token, user } = await authApi.googleLogin(credential)
      dispatch(setToken(token))
      dispatch(setUser(user))
      navigate('/dashboard')
    } catch {
      dispatch(setError('Google login unavailable. Use email/password or guest.'))
    }
  }

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const initGIS = () => {
      if (!window.google?.accounts?.id) return
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response: { credential: string }) => handleCredential(response.credential),
        cancel_on_tap_outside: false,
      })
      if (buttonRef.current) {
        window.google.accounts.id.renderButton(buttonRef.current, {
          type: 'standard',
          shape: 'rectangular',
          theme: 'outline',
          text: 'signin_with',
          size: 'large',
          width: buttonRef.current.offsetWidth || 280,
          logo_alignment: 'left',
        })
      }
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = initGIS
    document.body.appendChild(script)

    return () => {
      if (window.google?.accounts?.id) {
        try { window.google.accounts.id.cancel() } catch {}
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={buttonRef} className="flex justify-center [&>iframe]:!w-full [&>iframe]:!min-w-0" style={{ minHeight: 40 }} />
  )
}
