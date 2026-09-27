// Generates ready-to-send Taglish/English inquiry messages for landlords,
// covering the 3 things Filipino expats most commonly need to confirm:
// 1) 1-month deposit (refundable?)
// 2) DEWA / utilities inclusion
// 3) Metro accessibility

export function generateInquiryMessage(listing) {
  const {
    title,
    location,
    type,
    price,
    metroStation,
    metroWalkMins
  } = listing

  return `Hi po, magandang araw! 👋

Kumusta po? Nakita ko po yung listing niyo:
"${title}" sa ${location} (${type}) - ${price} AED/month.

Gusto ko lang po sana magtanong bago mag-viewing:

1️⃣ Kailangan po ba ng 1-month deposit? Refundable po ba ito pag umalis na po ako?
2️⃣ Kasama na po ba ang DEWA (electric & water bill) sa monthly rent, o hiwalay/babawasin po separately?
3️⃣ Gaano po kalayo ang pinakamalapit na Metro station (${metroStation || 'nearest station'})? Ilang minuto po lakad papunta doon?

Kung pwede rin po sana malaman kung available pa po ito, at kung pwede po mag-viewing this week. Salamat po ng marami! 🙏🇵🇭

- Sent via Kabayan Space Finder`
}

export function generateShortMessage(listing) {
  const { title, location, type, price } = listing
  return `Hi po! Interested po ako sa "${title}" - ${location}, ${type}, ${price} AED/month. Pwede po ba malaman kung may deposit required, kasama na po ba ang DEWA, at gaano po kalapit sa Metro? Salamat po! 🙏`
}

export function buildWhatsAppLink(message, phoneNumber) {
  const encoded = encodeURIComponent(message)
  // If a phone number is provided (E.164 without +), open a direct chat.
  // Otherwise open WhatsApp with the message pre-filled for the user to
  // paste into whichever chat (useful for Facebook group posts w/o numbers).
  if (phoneNumber) {
    const cleanNumber = phoneNumber.replace(/[^\d]/g, '')
    return `https://wa.me/${cleanNumber}?text=${encoded}`
  }
  return `https://wa.me/?text=${encoded}`
}

export function buildMessengerLink() {
  // Messenger (m.me) requires a specific page/username to deep link into a
  // thread. Since Facebook Kabayan-group posts rarely expose that, we send
  // users to Messenger directly; the message itself is copied to clipboard
  // so they can paste it into the right conversation.
  return `https://www.messenger.com/`
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    return false
  }
}
