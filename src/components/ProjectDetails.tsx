import { useState } from 'react'
import { X, Plus, Check } from 'lucide-react'
import type { Project, Task } from '../App'

interface ProjectDetailsProps {
  project: Project
  onClose: () => void
  onAddTask: (projectId: string, taskTitle: string) => void
  onToggleTask: (projectId: string, taskId: string) => void
  onUpdateNotes: (projectId: string, taskId: string, notes: string) => void
}

const ProjectDetails = ({ 
  project, 
  onClose,
  onAddTask,
  onToggleTask,
  onUpdateNotes
}: ProjectDetailsProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTaskTitle.trim()) {
      onAddTask(project.id, newTaskTitle.trim())
      setNewTaskTitle('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-auto mt-4 sm:mt-0">
        <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-white z-10 pb-2">
          <h2 className="text-xl sm:text-2xl font-mono">{project.title}</h2>
          <button onClick={onClose} className="p-1.5 sm:p-2 hover:bg-stone-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAddTask} className="mb-4 sm:mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-charcoal focus:border-transparent outline-none text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="px-3 sm:px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-stone-800 disabled:opacity-50"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </form>

        <div className="space-y-3 sm:space-y-4">
          {project.tasks.map(task => (
            <div key={task.id} className="bg-stone-50 rounded-xl p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <button
                  onClick={() => onToggleTask(project.id, task.id)}
                  className={`
                    mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center
                    ${task.completed 
                      ? 'bg-charcoal text-white' 
                      : 'border-2 border-stone-300 hover:border-charcoal'
                    }
                  `}
                >
                  {task.completed && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-mono text-sm sm:text-base ${task.completed ? 'line-through text-stone-500' : ''}`}>
                    {task.title}
                  </h3>
                  
                  <textarea
                    value={task.notes}
                    onChange={(e) => onUpdateNotes(project.id, task.id, e.target.value)}
                    placeholder="Add notes..."
                    className="mt-2 w-full p-2 bg-white rounded-lg border focus:ring-2 focus:ring-charcoal focus:border-transparent outline-none text-sm"
                    rows={2}
                  />
                  
                  <div className="mt-2 text-xs text-stone-500">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails