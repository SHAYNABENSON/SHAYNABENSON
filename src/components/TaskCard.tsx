import { Slider } from './Slider'

interface TaskCardProps {
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  progress: number
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  index: number
  total: number
  accentColor?: string
  dueDate?: string
  isWide?: boolean
  onProgressUpdate: (progress: number) => void
}

const TaskCard = ({ 
  title, 
  status, 
  progress,
  priority, 
  index, 
  total, 
  accentColor = "bg-white",
  dueDate,
  isWide = false,
  onProgressUpdate 
}: TaskCardProps) => {
  const statusColor = {
    TODO: 'text-gray-500',
    IN_PROGRESS: 'text-blue-500',
    DONE: 'text-green-500'
  }

  return (
    <div className={`relative animate-in fade-in slide-in-from-bottom-4 duration-500 ${isWide ? 'col-span-full' : ''}`}>
      {priority === 'HIGH' && (
        <div className={`absolute top-0 left-0 ${accentColor} w-full h-full rounded-3xl transition-colors duration-300`}>
          <div className={`absolute top-6 left-6 text-8xl font-bold ${accentColor === 'bg-black' ? 'text-white' : 'text-black'}`}>
            {progress}%
          </div>
          <div className={`absolute bottom-4 left-6 text-sm ${accentColor === 'bg-black' ? 'text-white/70' : 'text-black/70'}`}>
            HIGH PRIORITY
          </div>
          <div className={`absolute bottom-4 right-6 text-sm ${accentColor === 'bg-black' ? 'text-white/70' : 'text-black/70'}`}>
            {dueDate}
          </div>
        </div>
      )}
      
      <div className={`${priority === 'HIGH' ? 'ml-[40%]' : ''} bg-white rounded-3xl p-6 flex flex-col h-48`}>
        <div className="flex justify-between items-start mb-4">
          <div className={`text-xs ${statusColor[status]}`}>{status.replace('_', ' ')}</div>
          <div className="text-xs text-gray-500">{index}/{total}</div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-mono">{title}</h2>
          <div className="space-y-2">
            <Slider 
              value={progress} 
              onChange={onProgressUpdate}
            />
            <p className="text-sm text-gray-400 font-mono">{progress}% Complete</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard