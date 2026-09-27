import { useMemo, useState } from 'react'
import { Home, WifiOff } from 'lucide-react'
import SearchDashboard from './components/SearchDashboard.jsx'
import ListingCard from './components/ListingCard.jsx'
import ContactModal from './components/ContactModal.jsx'
import { LISTINGS } from './data/listings.js'

export default function App() {
  const [filters, setFilters] = useState({
    locations: [],
    types: [],
    maxPrice: 1500,
    dewaOnly: false,
    genderFilter: 'Any'
  })
  const [activeListing, setActiveListing] = useState(null)

  const filteredListings = useMemo(() => {
    return LISTINGS.filter((listing) => {
      if (filters.locations.length && !filters.locations.includes(listing.location)) return false
      if (filters.types.length && !filters.types.includes(listing.type)) return false
      if (listing.price > filters.maxPrice) return false
      if (listing.price < 500) return false
      if (filters.dewaOnly && !listing.dewaIncluded) return false
      if (filters.genderFilter !== 'Any' && listing.gender !== filters.genderFilter) return false
      return true
    }).sort((a, b) => a.price - b.price)
  }, [filters])

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-kabayan-blue text-white sticky top-0 z-30 shadow-sm">
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3"
          style={{ paddingTop: 'env(safe-area-inset-top, 1rem)' }}
        >
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <Home size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Kabayan Space Finder</h1>
            <p className="text-xs text-blue-100">Budget bed spaces & partitions in Dubai, 500–1,500 AED/mo</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <SearchDashboard
            filters={filters}
            setFilters={setFilters}
            resultCount={filteredListings.length}
          />

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 leading-relaxed">
            <strong className="block mb-1">Before you pay:</strong>
            Confirm the 1-month deposit is refundable, check if DEWA/WiFi is truly included, and verify
            walking distance to Metro — use the "Contact Landlord" button on any listing to ask in one tap.
          </div>
        </aside>

        <section>
          {filteredListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400">
              <WifiOff size={40} className="mb-3" />
              <p className="font-medium">No listings match your filters.</p>
              <p className="text-sm">Try widening your budget or clearing a filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} onContact={setActiveListing} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 pt-2 text-center text-xs text-slate-400">
        Mock data for demo purposes — sourced in structure from Dubizzle, Bayut & Facebook Kabayan
        housing groups. Always verify listings and visit in person before paying any deposit.
      </footer>

      <ContactModal listing={activeListing} onClose={() => setActiveListing(null)} />
    </div>
  )
}
