import { useState } from 'react'
import { PlusCircle } from 'lucide-react'

interface JobFormProps {
  onSubmit: (job: {
    number?: string
    position: string
    type: string
    accentColor?: string
  }) => void
}

const JobForm = ({ onSubmit }: JobFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [formData, setFormData] = useState({
    number: '',
    position: '',
    type: 'FULLTIME',
    accentColor: 'bg-[#98F5E1]'
  })

  const colorOptions = [
    { label: 'Mint Green', value: 'bg-[#98F5E1]' },
    { label: 'Peach', value: 'bg-[#FFC5B4]' },
    { label: 'Black', value: 'bg-black' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const jobData = {
      ...formData,
      number: formData.number || undefined,
      accentColor: formData.number ? formData.accentColor : undefined
    }
    onSubmit(jobData)
    setFormData({
      number: '',
      position: '',
      type: 'FULLTIME',
      accentColor: 'bg-[#98F5E1]'
    })
    setIsExpanded(false)
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full bg-white rounded-3xl p-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <PlusCircle className="w-5 h-5" />
        <span>Add New Position</span>
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Position</label>
          <input
            type="text"
            value={formData.position}
            onChange={e => setFormData(prev => ({ ...prev, position: e.target.value.toUpperCase() }))}
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. INTERFACE DESIGNER"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-500 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full p-2 border rounded-lg"
          >
            <option value="FULLTIME">FULLTIME</option>
            <option value="PARTTIME">PARTTIME</option>
            <option value="CONTRACT">CONTRACT</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-500 mb-1">Number of Vacancies (optional)</label>
          <input
            type="number"
            value={formData.number}
            onChange={e => setFormData(prev => ({ ...prev, number: e.target.value }))}
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. 3"
            min="1"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-500 mb-1">Accent Color</label>
          <select
            value={formData.accentColor}
            onChange={e => setFormData(prev => ({ ...prev, accentColor: e.target.value }))}
            className="w-full p-2 border rounded-lg"
            disabled={!formData.number}
          >
            {colorOptions.map((color) => (
              <option 
                key={color.value} 
                value={color.value}
                className="p-2"
              >
                {color.label}
              </option>
            ))}
          </select>
          <div className="mt-2 flex gap-2">
            {colorOptions.map((color) => (
              <div
                key={color.value}
                className={`w-6 h-6 rounded-full ${color.value} cursor-pointer transition-transform hover:scale-110`}
                onClick={() => setFormData(prev => ({ ...prev, accentColor: color.value }))}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Add Position
        </button>
      </div>
    </form>
  )
}

export default JobForm