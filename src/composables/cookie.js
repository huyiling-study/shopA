import { useCookies } from '@vueuse/integrations/useCookies'
const cookie = useCookies()


export function getCookie(TokenKey="admin-token") {
    return cookie.get(TokenKey)
}
export function setCookie(TokenKey="admin-token",token) {
    return cookie.set(TokenKey, token)
}
export function removeCookie(TokenKey="admin-token") {
    return cookie.remove(TokenKey)
}