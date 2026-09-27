import { SlidersHorizontal, MapPin, BedDouble, X } from 'lucide-react'
import { LOCATIONS, ROOM_TYPES } from '../data/listings.js'

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
        active
          ? 'bg-kabayan-blue text-white border-kabayan-blue'
          : 'bg-white text-slate-600 border-slate-300 hover:border-kabayan-blue'
      }`}
    >
      {label}
    </button>
  )
}

export default function SearchDashboard({ filters, setFilters, resultCount }) {
  const toggleLocation = (loc) => {
    setFilters((f) => ({
      ...f,
      locations: f.locations.includes(loc)
        ? f.locations.filter((l) => l !== loc)
        : [...f.locations, loc]
    }))
  }

  const toggleType = (type) => {
    setFilters((f) => ({
      ...f,
      types: f.types.includes(type)
        ? f.types.filter((t) => t !== type)
        : [...f.types, type]
    }))
  }

  const clearAll = () =>
    setFilters({
      locations: [],
      types: [],
      maxPrice: 1500,
      dewaOnly: false,
      genderFilter: 'Any'
    })

  const hasActiveFilters =
    filters.locations.length > 0 ||
    filters.types.length > 0 ||
    filters.maxPrice < 1500 ||
    filters.dewaOnly ||
    filters.genderFilter !== 'Any'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 font-semibold">
          <SlidersHorizontal size={18} className="text-kabayan-blue" />
          Search Filters
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-kabayan-red"
          >
            <X size={14} /> Clear all
          </button>
        )}
      </div>

      {/* Location filter */}
      <div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
          <MapPin size={15} className="text-kabayan-red" />
          Popular with Filipinos
        </div>
        <div className="flex flex-wrap gap-2">
          {LOCATIONS.map((loc) => (
            <Chip
              key={loc}
              label={loc}
              active={filters.locations.includes(loc)}
              onClick={() => toggleLocation(loc)}
            />
          ))}
        </div>
      </div>

      {/* Room type filter */}
      <div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
          <BedDouble size={15} className="text-kabayan-blue" />
          Accommodation Type
        </div>
        <div className="flex flex-wrap gap-2">
          {ROOM_TYPES.map((type) => (
            <Chip
              key={type}
              label={type}
              active={filters.types.includes(type)}
              onClick={() => toggleType(type)}
            />
          ))}
        </div>
      </div>

      {/* Price slider */}
      <div>
        <div className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
          <span>Max Budget</span>
          <span className="text-kabayan-blue font-semibold">{filters.maxPrice} AED/mo</span>
        </div>
        <input
          type="range"
          min={500}
          max={1500}
          step={50}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-kabayan-blue"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>500 AED</span>
          <span>1,500 AED</span>
        </div>
      </div>

      {/* Extra toggles */}
      <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-100">
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.dewaOnly}
            onChange={(e) => setFilters((f) => ({ ...f, dewaOnly: e.target.checked }))}
            className="accent-kabayan-blue w-4 h-4"
          />
          DEWA included only
        </label>

        <select
          value={filters.genderFilter}
          onChange={(e) => setFilters((f) => ({ ...f, genderFilter: e.target.value }))}
          className="text-sm border border-slate-300 rounded-lg px-2 py-1.5 text-slate-600"
        >
          <option value="Any">Any gender pref.</option>
          <option value="Female only">Female only</option>
          <option value="Male only">Male only</option>
          <option value="Mixed / Couples ok">Mixed / Couples ok</option>
        </select>
      </div>

      <div className="text-xs text-slate-400 pt-1">
        {resultCount} listing{resultCount !== 1 ? 's' : ''} match your filters
      </div>
    </div>
  )
}
