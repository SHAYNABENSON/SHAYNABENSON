interface JobCardProps {
  number?: string
  position: string
  type: string
  index: number
  total: number
  accentColor?: string
  isWide?: boolean
}

const JobCard = ({ 
  number, 
  position, 
  type, 
  index, 
  total, 
  accentColor = "bg-white",
  isWide = false 
}: JobCardProps) => {
  return (
    <div className={`relative animate-in fade-in slide-in-from-bottom-4 duration-500 ${isWide ? 'col-span-full' : ''}`}>
      {number && (
        <div className={`absolute top-0 left-0 ${accentColor} w-full h-full rounded-3xl transition-colors duration-300`}>
          <div className={`absolute top-6 left-6 text-8xl font-bold ${accentColor === 'bg-black' ? 'text-white' : 'text-black'}`}>
            {number}
          </div>
          <div className={`absolute bottom-4 left-6 text-sm ${accentColor === 'bg-black' ? 'text-white/70' : 'text-black/70'}`}>
            VACANCIES
          </div>
          <div className={`absolute bottom-4 right-6 text-sm ${accentColor === 'bg-black' ? 'text-white/70' : 'text-black/70'}`}>
            STARBASE.AGENCY
          </div>
        </div>
      )}
      
      <div className={`${number ? 'ml-[40%]' : ''} bg-white rounded-3xl p-6 flex flex-col h-48`}>
        <div className="flex justify-between items-start mb-auto">
          <div className="text-xs text-gray-500">REMOTE</div>
          <div className="text-xs text-gray-500">{index}/{total}</div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-mono">{position}</h2>
          <p className="text-sm text-gray-400 font-mono">{type}</p>
        </div>
      </div>
    </div>
  )
}

export default JobCard