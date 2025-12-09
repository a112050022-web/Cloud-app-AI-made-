import React from 'react';
import { City } from '../types';
import { DEFAULT_CITIES } from '../constants';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ selectedCity, onCityChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    const city = DEFAULT_CITIES.find(c => c.name === cityName);
    if (city) {
      onCityChange(city);
    }
  };

  return (
    <div className="relative w-full max-w-xs mx-auto mb-8">
      <div className="relative">
        <select
          value={selectedCity.name}
          onChange={handleChange}
          className="appearance-none w-full bg-white border border-slate-200 text-slate-700 py-3 px-4 pr-8 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-lg cursor-pointer transition-all hover:shadow-md"
        >
          {DEFAULT_CITIES.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
