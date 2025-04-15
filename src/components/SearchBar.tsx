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
      className="relative w-full md:max-w-sm "
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white-/50" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-[var(--navy-400/50)] border-[var(--navy-300)] text-white placeholder:text-white/50 focus-visible:ring -[var(--navy-200)]"
      />
    </motion.div>
  )
}
