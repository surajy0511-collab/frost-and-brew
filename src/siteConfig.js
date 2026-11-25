export const siteConfig = {
  instagram: 'https://www.instagram.com/frost_n_brew.blr/',
  googleMaps: 'https://maps.app.goo.gl/WVaot2d3uJCt1Fti7?g_st=ic',
  mapsEmbedUrl: '',
  whatsappNumber: '',
  whatsappMessage: 'Hi Frost & Brew! I came across your website and would like to know more.',
}

export function getWhatsAppUrl(message = siteConfig.whatsappMessage) {
  const number = siteConfig.whatsappNumber.replace(/\D/g, '')
  if (!number) return ''

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
