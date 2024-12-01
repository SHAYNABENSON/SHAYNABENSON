interface NotesCardProps {
  id: string
  title: string
  content: string
  accentColor: string
  index: number
  total: number
  onClick: () => void
  isSelected?: boolean
}

const NotesCard = ({ 
  title, 
  content,
  accentColor,
  index, 
  total,
  onClick,
  isSelected = false
}: NotesCardProps) => {
  const isDarkColor = accentColor === '#1C1C1C'
  const previewContent = content.length > 100 ? content.slice(0, 100) + '...' : content

  return (
    <div 
      className={`
        relative animate-float cursor-pointer
        transform transition-all duration-300
        ${isSelected ? 'scale-[1.02]' : ''}
      `}
      onClick={onClick}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl transition-colors duration-300"
        style={{ backgroundColor: accentColor }}
      >
        <div className={`
          absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6
          text-sm sm:text-base lg:text-lg font-medium
          ${isDarkColor ? 'text-white' : 'text-black'}
        `}>
          {title}
        </div>
        <div className={`
          absolute bottom-2 sm:bottom-3 lg:bottom-4 right-3 sm:right-4 lg:right-6 
          text-xs sm:text-sm
          ${isDarkColor ? 'text-white/70' : 'text-black/70'}
        `}>
          NOTE {index}/{total}
        </div>
      </div>
      
      <div 
        className={`
          ml-[40%] rounded-xl sm:rounded-2xl lg:rounded-3xl 
          p-3 sm:p-4 lg:p-6 flex flex-col h-28 sm:h-36 lg:h-48
          ${isSelected ? 'glass glass-hover' : 'bg-white'}
          transition-all duration-300 ease-in-out
        `}
      >
        <div className="flex-1 overflow-hidden">
          <p className="text-sm sm:text-base text-stone-600 line-clamp-4">
            {previewContent}
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotesCard