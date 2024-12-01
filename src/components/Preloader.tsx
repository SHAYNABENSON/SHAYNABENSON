const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-stone-50 dark:bg-stone-900 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
        {/* Animated Logo */}
        <div className="relative w-16 h-16 animate-float" style={{ animationDelay: '800ms' }}>
          {/* Background rectangle with pulse */}
          <div className="absolute inset-0 rounded-lg bg-charcoal dark:bg-stone-800 animate-pulse" 
               style={{ animationDuration: '2s' }} />
          
          {/* Letter B with floating animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              viewBox="0 0 32 32" 
              className="w-full h-full"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 8V24H15.5C18.5 24 21 21.5 21 18.5C21 16.2 19.5 14.3 17.4 13.6C19 13 20 11.2 20 9.5C20 8.1 19.4 6.8 18.4 5.9C17.4 5 16 4.5 14.7 4.5H9V8H12ZM15 11.5H12V8H14.7C15.3 8 15.9 8.2 16.3 8.6C16.7 9 17 9.6 17 10.2C17 10.8 16.7 11.4 16.3 11.8C15.9 12.2 15.3 12.4 14.7 12.4H12V11.5ZM12 20.5V15.5H15.5C16.2 15.5 16.9 15.8 17.4 16.3C17.9 16.8 18.2 17.5 18.2 18.2C18.2 18.9 17.9 19.6 17.4 20.1C16.9 20.6 16.2 20.9 15.5 20.9H12V20.5Z" 
                className="fill-white animate-float"
                style={{ animationDelay: '1000ms' }}
              />
            </svg>
          </div>
        </div>

        {/* Text Animation Container */}
        <div className="flex overflow-hidden">
          {'Bento.app'.split('').map((letter, index) => (
            <span
              key={index}
              className="text-xl font-semibold text-charcoal dark:text-white"
              style={{
                animation: 'slideUp 0.5s forwards',
                animationDelay: `${1200 + (index * 50)}ms`,
                opacity: 0,
                transform: 'translateY(0.5em)',
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
      
      {/* Loading indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-1 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden"
        style={{ animation: 'fadeIn 0.5s forwards', animationDelay: '1800ms', opacity: 0 }}
      >
        <div 
          className="h-full bg-charcoal dark:bg-white rounded-full"
          style={{ 
            animation: 'loading 2s infinite',
            animationDelay: '2000ms'
          }}
        />
      </div>
    </div>
  )
}

export default Preloader