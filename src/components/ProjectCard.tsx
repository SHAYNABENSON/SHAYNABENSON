interface ProjectCardProps {
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  progress: number
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  index: number
  total: number
  accentColor?: string
  dueDate?: string
  tasksCount: number
  isWide?: boolean
  isSelected?: boolean
}

const ProjectCard = ({ 
  title, 
  status, 
  progress,
  priority, 
  index, 
  total, 
  accentColor = "#E2F5ED", // Mint default
  dueDate,
  tasksCount,
  isWide = false,
  isSelected = false
}: ProjectCardProps) => {
  const statusColor = {
    TODO: 'text-gray-500',
    IN_PROGRESS: 'text-blue-500',
    DONE: 'text-green-500'
  }

  const isDarkColor = accentColor === '#1C1C1C'

  return (
    <div 
      className={`
        relative animate-float
        ${isWide ? 'col-span-full' : ''} 
        cursor-pointer
        transform transition-all duration-300
        ${isSelected ? 'scale-[1.02]' : ''}
      `}
    >
      {priority === 'HIGH' && (
        <div 
          className={`
            absolute top-0 left-0 w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl 
            transition-colors duration-300
            ${isSelected ? 'glass-dark' : ''}
          `}
          style={{ backgroundColor: accentColor }}
        >
          <div className={`
            absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 
            text-3xl sm:text-5xl lg:text-8xl font-semibold
            ${isDarkColor ? 'text-white' : 'text-black'}
          `}>
            {progress}%
          </div>
          <div className={`
            absolute bottom-2 sm:bottom-3 lg:bottom-4 left-3 sm:left-4 lg:left-6 
            text-xs sm:text-sm
            ${isDarkColor ? 'text-white/70' : 'text-black/70'}
          `}>
            {tasksCount} TASKS
          </div>
          <div className={`
            absolute bottom-2 sm:bottom-3 lg:bottom-4 right-3 sm:right-4 lg:right-6 
            text-xs sm:text-sm
            ${isDarkColor ? 'text-white/70' : 'text-black/70'}
          `}>
            {dueDate}
          </div>
        </div>
      )}
      
      <div 
        className={`
          ${priority === 'HIGH' ? 'ml-[40%]' : ''} 
          rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 
          flex flex-col h-28 sm:h-36 lg:h-48
          ${isSelected ? 'glass glass-hover' : 'bg-white'}
          transition-all duration-300 ease-in-out
        `}
      >
        <div className="flex justify-between items-start mb-2 sm:mb-3 lg:mb-4">
          <div className={`text-xs ${statusColor[status]}`}>{status.replace('_', ' ')}</div>
          <div className="text-xs text-gray-500">{index}/{total}</div>
        </div>
        
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <h2 className="text-sm sm:text-base lg:text-xl">{title}</h2>
          <div className="space-y-1 sm:space-y-2">
            <div className="w-full bg-stone-100/50 rounded-full h-1 sm:h-1.5 lg:h-2">
              <div 
                className="bg-charcoal h-1 sm:h-1.5 lg:h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] sm:text-xs lg:text-sm text-gray-400">
              <span>{progress}% Complete</span>
              <span>{tasksCount} Tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard