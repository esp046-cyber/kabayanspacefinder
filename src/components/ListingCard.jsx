import { MapPin, Zap, Wifi, TrainFront, Clock, MessageCircle } from 'lucide-react'
import { SOURCES } from '../data/listings.js'

const SOURCE_STYLES = {
  [SOURCES.DUBIZZLE]: 'bg-red-50 text-red-700 border-red-200',
  [SOURCES.BAYUT]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  [SOURCES.FACEBOOK_KABAYAN]: 'bg-blue-50 text-blue-700 border-blue-200'
}

export default function ListingCard({ listing, onContact }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <span
          className={`text-[11px] font-semibold px-2 py-1 rounded-md border ${SOURCE_STYLES[listing.source]}`}
        >
          {listing.source}
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
          <Clock size={12} /> {listing.postedDaysAgo}d ago
        </span>
      </div>

      <h3 className="font-semibold text-slate-800 leading-snug">{listing.title}</h3>

      <div className="flex items-center gap-1.5 text-sm text-slate-500">
        <MapPin size={14} className="text-kabayan-red shrink-0" />
        {listing.location} &middot; {listing.type}
      </div>

      <div className="flex items-center gap-3 text-2xl font-bold text-kabayan-blue">
        {listing.price}
        <span className="text-sm font-medium text-slate-400">AED/month</span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-md border ${
            listing.dewaIncluded
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
        >
          <Zap size={12} />
          {listing.dewaIncluded ? 'DEWA included' : 'DEWA separate'}
        </span>
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-md border ${
            listing.wifiIncluded
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}
        >
          <Wifi size={12} />
          {listing.wifiIncluded ? 'WiFi included' : 'No WiFi'}
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-md border bg-indigo-50 text-indigo-700 border-indigo-200">
          <TrainFront size={12} />
          {listing.metroWalkMins} min to {listing.metroStation}
        </span>
        <span className="px-2 py-1 rounded-md border bg-slate-50 text-slate-500 border-slate-200">
          {listing.gender}
        </span>
      </div>

      <p className="text-xs text-slate-500 italic leading-relaxed">{listing.notes}</p>

      <div className="text-xs text-slate-400 pt-1 border-t border-slate-100">
        Posted by {listing.postedBy} &middot; via {listing.postedVia}
      </div>

      <button
        onClick={() => onContact(listing)}
        className="mt-1 flex items-center justify-center gap-2 bg-kabayan-blue hover:bg-blue-800 text-white font-medium text-sm py-2.5 rounded-xl transition-colors"
      >
        <MessageCircle size={16} />
        Contact Landlord
      </button>
    </div>
  )
}
