import { useState, useEffect } from 'react'
import ProjectCard from './components/ProjectCard'
import SummaryCard from './components/SummaryCard'
import ProjectForm from './components/ProjectForm'
import ProjectDetails from './components/ProjectDetails'
import NotesCard from './components/NotesCard'
import NotesForm from './components/NotesForm'
import EditNotesForm from './components/EditNotesForm'
import ColorPalette from './components/ColorPalette'
import ThemeToggle from './components/ThemeToggle'
import Preloader from './components/Preloader'
import { Pencil, X } from 'lucide-react'

export interface Task {
  id: string
  title: string
  completed: boolean
  notes: string
  createdAt: string
}

export interface Project {
  id: string
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  progress: number
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  dueDate?: string
  tasks: Task[]
}

export interface Note {
  id: string
  title: string
  content: string
  accentColor: string
  createdAt: string
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects')
    return saved ? JSON.parse(saved) : []
  })
  
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes')
    return saved ? JSON.parse(saved) : []
  })
  
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState<string>(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const saved = localStorage.getItem('backgroundColor')
    return saved || (isDark ? '#292524' : '#F5F5F4')
  })

  // Handle theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const currentColor = backgroundColor
      const colorMap: Record<string, string> = {
        '#F5F5F4': '#292524',
        '#292524': '#F5F5F4',
        '#E2F5ED': '#1A332B',
        '#1A332B': '#E2F5ED',
        '#FFE5D9': '#332520',
        '#332520': '#FFE5D9',
        '#E2E5FF': '#1A1D33',
        '#1A1D33': '#E2E5FF',
      }
      
      if (colorMap[currentColor]) {
        setBackgroundColor(isDark ? colorMap[currentColor] : currentColor)
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleThemeChange()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [backgroundColor])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const handleAddProject = (projectData: Omit<Project, 'id' | 'tasks'>) => {
    const newProject: Project = {
      ...projectData,
      id: crypto.randomUUID(),
      tasks: [],
    }
    setProjects(prev => [...prev, newProject])
  }

  const handleAddNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    setNotes(prev => [...prev, newNote])
  }

  const handleUpdateNote = (noteData: { id: string; title: string; content: string; accentColor: string }) => {
    setNotes(prev => prev.map(note => 
      note.id === noteData.id 
        ? { ...note, ...noteData }
        : note
    ))
    setIsEditingNote(false)
  }

  const handleAddTask = (projectId: string, taskTitle: string) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const newTask: Task = {
          id: crypto.randomUUID(),
          title: taskTitle,
          completed: false,
          notes: '',
          createdAt: new Date().toISOString()
        }
        return {
          ...project,
          tasks: [...project.tasks, newTask]
        }
      }
      return project
    }))
  }

  const handleToggleTask = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
        const progress = Math.round(
          (updatedTasks.filter(t => t.completed).length / updatedTasks.length) * 100
        )
        return {
          ...project,
          tasks: updatedTasks,
          progress,
          status: progress === 100 ? 'DONE' : progress === 0 ? 'TODO' : 'IN_PROGRESS'
        }
      }
      return project
    }))
  }

  const handleUpdateTaskNotes = (projectId: string, taskId: string, notes: string) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task =>
            task.id === taskId ? { ...task, notes } : task
          )
        }
      }
      return project
    }))
  }

  const handleCloseNote = () => {
    setSelectedNote(null)
    setIsEditingNote(false)
  }

  if (isLoading) {
    return <Preloader />
  }

  const selectedNoteData = notes.find(n => n.id === selectedNote)

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor }}
    >
      <div className="max-w-6xl mx-auto px-3 py-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-6">
        <header className="flex justify-between items-center pt-2 sm:pt-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-adaptive">
            Bento.app
          </h1>
          <ThemeToggle />
        </header>
        
        <div className="mt-3 sm:mt-6">
          <ProjectForm onSubmit={handleAddProject} />
        </div>

        <div className="mt-3 sm:mt-6">
          <NotesForm onSubmit={handleAddNote} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-3 sm:mt-6">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`${project.priority === 'HIGH' ? 'col-span-1 sm:col-span-2 lg:col-span-3' : ''}`}
              onClick={() => setSelectedProject(project.id)}
            >
              <ProjectCard 
                title={project.title}
                status={project.status}
                progress={project.progress}
                priority={project.priority}
                index={index + 1}
                total={projects.length}
                dueDate={project.dueDate}
                tasksCount={project.tasks.length}
                isWide={project.priority === 'HIGH'}
                isSelected={selectedProject === project.id}
              />
            </div>
          ))}

          {notes.map((note, index) => (
            <div 
              key={note.id}
              onClick={() => {
                setSelectedNote(note.id)
                setIsEditingNote(false)
              }}
            >
              <NotesCard
                id={note.id}
                title={note.title}
                content={note.content}
                accentColor={note.accentColor}
                index={index + 1}
                total={notes.length}
                onClick={() => {
                  setSelectedNote(note.id)
                  setIsEditingNote(false)
                }}
                isSelected={selectedNote === note.id}
              />
            </div>
          ))}
          
          {projects.length > 0 && (
            <SummaryCard 
              totalProgress={Math.round(projects.reduce((acc, project) => acc + project.progress, 0) / projects.length)}
              completedProjects={projects.filter(project => project.status === 'DONE').length}
              totalProjects={projects.length}
            />
          )}
        </div>

        {selectedProject && (
          <ProjectDetails
            project={projects.find(p => p.id === selectedProject)!}
            onClose={() => setSelectedProject(null)}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onUpdateNotes={handleUpdateTaskNotes}
          />
        )}

        {selectedNote && selectedNoteData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-mono">
                  {selectedNoteData.title}
                </h2>
                <div className="flex gap-2">
                  {!isEditingNote && (
                    <button
                      onClick={() => setIsEditingNote(true)}
                      className="p-2 hover:bg-stone-100 rounded-full"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  )}
                  <button 
                    onClick={handleCloseNote}
                    className="p-2 hover:bg-stone-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {isEditingNote ? (
                <EditNotesForm
                  id={selectedNoteData.id}
                  title={selectedNoteData.title}
                  content={selectedNoteData.content}
                  accentColor={selectedNoteData.accentColor}
                  onSave={handleUpdateNote}
                  onCancel={() => setIsEditingNote(false)}
                />
              ) : (
                <p className="text-stone-600 whitespace-pre-wrap">
                  {selectedNoteData.content}
                </p>
              )}
            </div>
          </div>
        )}

        <ColorPalette onColorSelect={setBackgroundColor} />
      </div>
    </div>
  )
}

export default App