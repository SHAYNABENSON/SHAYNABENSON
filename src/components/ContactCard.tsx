interface ContactCardProps {
  selectedPosition?: string
}

const ContactCard = ({ selectedPosition }: ContactCardProps) => {
  return (
    <div className="bg-black rounded-3xl p-6 flex flex-col h-48">
      <div className="mb-auto">
        <div className="text-gray-500 text-xs">EMAIL TO:</div>
        <div className="text-white font-mono mt-1">
          HELLO@<br />
          STARBASE<br />
          .AGENCY
        </div>
      </div>
      
      <div>
        <div className="text-gray-500 text-xs">TITLE:</div>
        <div className="text-white font-mono mt-1">
          {selectedPosition || '[SELECT A JOB]'}
        </div>
      </div>
    </div>
  )
}

export default ContactCard