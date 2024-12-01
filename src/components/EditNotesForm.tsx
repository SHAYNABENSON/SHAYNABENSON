import { useState } from 'react'

interface EditNotesFormProps {
  id: string
  title: string
  content: string
  accentColor: string
  onSave: (noteData: { id: string; title: string; content: string; accentColor: string }) => void
  onCancel: () => void
}

const EditNotesForm = ({ id, title, content, accentColor, onSave, onCancel }: EditNotesFormProps) => {
  const [formData, setFormData] = useState({
    title,
    content,
    accentColor
  })

  const colorOptions = [
    { label: 'Mint', value: '#E2F5ED', textColor: 'text-stone-800' },
    { label: 'Peach', value: '#FFE5D9', textColor: 'text-stone-800' },
    { label: 'Dark', value: '#1C1C1C', textColor: 'text-stone-100' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id,
      ...formData
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-stone-500 mb-1">Note Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value.toUpperCase() }))}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mint focus:border-transparent outline-none"
          placeholder="e.g. MEETING NOTES"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-stone-500 mb-1">Content</label>
        <textarea
          value={formData.content}
          onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mint focus:border-transparent outline-none"
          rows={6}
          placeholder="Write your note here..."
          required
        />
      </div>

      <div>
        <label className="block text-sm text-stone-500 mb-1">Accent Color</label>
        <div className="mt-2 flex gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, accentColor: color.value }))}
              className={`
                w-20 h-20 rounded-2xl flex items-center justify-center 
                transition-all hover:scale-105
                ${formData.accentColor === color.value ? 'ring-2 ring-offset-2 ring-charcoal' : ''}
              `}
              style={{ backgroundColor: color.value }}
            >
              {formData.accentColor === color.value && (
                <div className={`text-xs font-medium ${color.textColor}`}>
                  SELECTED
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-charcoal text-white rounded-lg hover:bg-stone-800"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default EditNotesForm