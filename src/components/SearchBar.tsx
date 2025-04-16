import { Search } from 'lucide-react'
import { motion } from 'motion/react'
import { Input } from './ui/input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <motion.div
      className="relative w-full"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-[#1E2146] border-[#2A2E5A] text-white placeholder:text-white/50 focus-visible:ring-[#3B4374] h-12 rounded-md"
      />
    </motion.div>
  )
}
