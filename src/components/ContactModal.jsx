import { useState } from 'react'
import { X, Copy, Check, MessageCircle, Send } from 'lucide-react'
import {
  generateInquiryMessage,
  generateShortMessage,
  buildWhatsAppLink,
  buildMessengerLink,
  copyToClipboard
} from '../utils/messageTemplates.js'

export default function ContactModal({ listing, onClose }) {
  const [messageType, setMessageType] = useState('full') // 'full' | 'short'
  const [copied, setCopied] = useState(false)

  if (!listing) return null

  const message =
    messageType === 'full' ? generateInquiryMessage(listing) : generateShortMessage(listing)

  const handleCopy = async () => {
    const ok = await copyToClipboard(message)
    setCopied(ok)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
  }

  const handleMessenger = async () => {
    await copyToClipboard(message)
    window.open(buildMessengerLink(), '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h3 className="font-semibold text-slate-800">Contact Landlord</h3>
            <p className="text-xs text-slate-400 line-clamp-1">{listing.title}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setMessageType('full')}
              className={`flex-1 text-sm font-medium py-2 rounded-lg border ${
                messageType === 'full'
                  ? 'bg-kabayan-blue text-white border-kabayan-blue'
                  : 'text-slate-600 border-slate-300'
              }`}
            >
              Full Taglish message
            </button>
            <button
              onClick={() => setMessageType('short')}
              className={`flex-1 text-sm font-medium py-2 rounded-lg border ${
                messageType === 'short'
                  ? 'bg-kabayan-blue text-white border-kabayan-blue'
                  : 'text-slate-600 border-slate-300'
              }`}
            >
              Short version
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Covers the 3 essentials: 1-month deposit, DEWA/utilities, and Metro accessibility.
            Feel free to edit before sending.
          </p>

          <textarea
            readOnly
            value={message}
            rows={messageType === 'full' ? 12 : 5}
            className="w-full text-sm border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-kabayan-blue"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm py-2.5 rounded-xl transition-colors"
            >
              <MessageCircle size={16} />
              Open WhatsApp
            </button>
            <button
              onClick={handleMessenger}
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm py-2.5 rounded-xl transition-colors"
            >
              <Send size={16} />
              Open Messenger
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm py-2.5 rounded-xl transition-colors"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy text'}
            </button>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Note: Messenger deep-linking requires the landlord's exact Messenger username/page, which
            isn't always available from group posts — so the message is copied to your clipboard and
            Messenger opens for you to paste it into the right chat.
          </p>
        </div>
      </div>
    </div>
  )
}
