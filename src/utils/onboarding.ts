export function setOnboardingCookies() {
  document.cookie = `hasOnboarded=true; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT; secure; samesite=strict`;
}

export function removeOnboardingCookies() {
  document.cookie = `hasOnboarded=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict`;
}
