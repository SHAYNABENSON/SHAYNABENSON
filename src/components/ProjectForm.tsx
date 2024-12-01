import { useState } from 'react'
import { PlusCircle } from 'lucide-react'

interface ProjectFormProps {
  onSubmit: (project: {
    title: string
    status: 'TODO' | 'IN_PROGRESS' | 'DONE'
    progress: number
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    accentColor?: string
    dueDate?: string
    tasksCount: number
  }) => void
}

const ProjectForm = ({ onSubmit }: ProjectFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    status: 'TODO' as const,
    progress: 0,
    priority: 'MEDIUM' as const,
    accentColor: '#E2F5ED',
    dueDate: '',
    tasksCount: 0
  })

  const colorOptions = [
    { label: 'Mint', value: '#E2F5ED', textColor: 'text-stone-800' },
    { label: 'Peach', value: '#FFE5D9', textColor: 'text-stone-800' },
    { label: 'Dark', value: '#1C1C1C', textColor: 'text-stone-100' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const projectData = {
      ...formData,
      accentColor: formData.priority === 'HIGH' ? formData.accentColor : undefined,
      dueDate: formData.dueDate || undefined
    }
    onSubmit(projectData)
    setFormData({
      title: '',
      status: 'TODO',
      progress: 0,
      priority: 'MEDIUM',
      accentColor: '#E2F5ED',
      dueDate: '',
      tasksCount: 0
    })
    setIsExpanded(false)
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 
          flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors"
      >
        <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Add New Project</span>
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm text-stone-500 mb-1">Project Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value.toUpperCase() }))}
            className="w-full p-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-mint focus:border-transparent outline-none"
            placeholder="e.g. WEBSITE REDESIGN"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-stone-500 mb-1">Priority</label>
          <select
            value={formData.priority}
            onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' }))}
            className="w-full p-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-mint focus:border-transparent outline-none"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-stone-500 mb-1">Initial Tasks</label>
          <input
            type="number"
            value={formData.tasksCount}
            onChange={e => setFormData(prev => ({ ...prev, tasksCount: parseInt(e.target.value) || 0 }))}
            className="w-full p-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-mint focus:border-transparent outline-none"
            min="0"
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-stone-500 mb-1">Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            className="w-full p-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-mint focus:border-transparent outline-none"
          />
        </div>
        
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-xs sm:text-sm text-stone-500 mb-1">
            Accent Color {formData.priority !== 'HIGH' && '(High priority only)'}
          </label>
          <div className="mt-2 flex gap-2 sm:gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                disabled={formData.priority !== 'HIGH'}
                onClick={() => setFormData(prev => ({ ...prev, accentColor: color.value }))}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all
                  ${formData.priority === 'HIGH' ? 'cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'}
                  ${formData.accentColor === color.value ? 'ring-2 ring-offset-2 ring-charcoal' : ''}
                `}
                style={{ backgroundColor: color.value }}
              >
                {formData.accentColor === color.value && (
                  <div className={`text-[10px] sm:text-xs font-medium ${color.textColor}`}>
                    SELECTED
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2 sm:pt-3">
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-stone-600 hover:bg-stone-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-charcoal text-white rounded-lg hover:bg-stone-800"
        >
          Add Project
        </button>
      </div>
    </form>
  )
}

export default ProjectForm