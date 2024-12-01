import { useState } from 'react'
import { PlusCircle } from 'lucide-react'

interface NotesFormProps {
  onSubmit: (note: {
    title: string
    content: string
    accentColor: string
  }) => void
}

const NotesForm = ({ onSubmit }: NotesFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    accentColor: '#E2F5ED'
  })

  const colorOptions = [
    { label: 'Mint', value: '#E2F5ED', textColor: 'text-stone-800' },
    { label: 'Peach', value: '#FFE5D9', textColor: 'text-stone-800' },
    { label: 'Dark', value: '#1C1C1C', textColor: 'text-stone-100' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: '',
      content: '',
      accentColor: '#E2F5ED'
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
        <span className="text-sm sm:text-base">Add New Note</span>
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm text-stone-500 mb-1">Note Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value.toUpperCase() }))}
            className="w-full p-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-mint focus:border-transparent outline-none"
            placeholder="e.g. MEETING NOTES"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-stone-500 mb-1">Content</label>
          <textarea
            value={formData.content}
            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
            className="w-full p-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-mint focus:border-transparent outline-none"
            rows={4}
            placeholder="Write your note here..."
            required
          />
        </div>
        
        <div>
          <label className="block text-xs sm:text-sm text-stone-500 mb-1">
            Accent Color
          </label>
          <div className="mt-2 flex gap-2 sm:gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, accentColor: color.value }))}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center 
                  transition-all hover:scale-105
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
          Add Note
        </button>
      </div>
    </form>
  )
}

export default NotesForm