import { useState, useEffect } from 'react'
import { Paintbrush } from 'lucide-react'

interface ColorPaletteProps {
  onColorSelect: (color: string) => void
}

const ColorPalette = ({ onColorSelect }: ColorPaletteProps) => {
  const [activeColor, setActiveColor] = useState<string>(() => {
    return localStorage.getItem('backgroundColor') || '#F5F5F4'
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const colors = [
    { 
      name: 'Stone', 
      value: '#F5F5F4', 
      darkValue: '#292524',
      code: 'Stone' 
    },
    { 
      name: 'Sage', 
      value: '#E2F5ED', 
      darkValue: '#1A332B',
      code: 'Sage' 
    },
    { 
      name: 'Blush', 
      value: '#FFE5D9', 
      darkValue: '#332520',
      code: 'Blush' 
    },
    { 
      name: 'Periwinkle', 
      value: '#E2E5FF', 
      darkValue: '#1A1D33',
      code: 'Periwinkle' 
    },
  ]

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    const color = colors.find(c => c.value === activeColor || c.darkValue === activeColor)
    if (color) {
      const newColor = isDark ? color.darkValue : color.value
      localStorage.setItem('backgroundColor', newColor)
      onColorSelect(newColor)
    }
  }, [activeColor, document.documentElement.classList.contains('dark')])

  const handleColorSelect = (colorSet: typeof colors[0]) => {
    const isDark = document.documentElement.classList.contains('dark')
    const newColor = isDark ? colorSet.darkValue : colorSet.value
    setActiveColor(newColor)
    onColorSelect(newColor)
    setIsExpanded(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isExpanded ? (
        <div className="glass dark:glass-dark p-3 rounded-2xl flex gap-2 animate-in">
          {colors.map((color) => (
            <button
              key={color.code}
              className={`
                w-10 h-10 rounded-xl transition-all duration-200
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${activeColor === color.value || activeColor === color.darkValue
                  ? 'ring-2 ring-stone-600 dark:ring-stone-400 ring-offset-2'
                  : ''
                }
              `}
              style={{ 
                background: `linear-gradient(135deg, ${color.value}, ${color.darkValue})`,
              }}
              onClick={() => handleColorSelect(color)}
              title={color.name}
            />
          ))}
          <button
            onClick={() => setIsExpanded(false)}
            className="p-2 hover:bg-stone-200/50 dark:hover:bg-stone-700/50 rounded-xl"
            title="Close color palette"
          >
            <span className="sr-only">Close color palette</span>
            ×
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="p-3 glass dark:glass-dark rounded-xl hover:scale-110 transition-all duration-200"
          title="Open color palette"
        >
          <Paintbrush className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export default ColorPalette