interface SummaryCardProps {
  totalProgress: number
  completedProjects: number
  totalProjects: number
}

const SummaryCard = ({ totalProgress, completedProjects, totalProjects }: SummaryCardProps) => {
  return (
    <div className="bg-charcoal rounded-3xl p-6 flex flex-col h-48">
      <div className="mb-auto">
        <div className="text-stone-400 text-xs">TOTAL PROGRESS</div>
        <div className="text-stone-100 font-mono mt-1 text-4xl">
          {totalProgress}%
        </div>
      </div>
      
      <div>
        <div className="text-stone-400 text-xs">COMPLETED</div>
        <div className="text-stone-100 font-mono mt-1">
          {completedProjects} OF {totalProjects} PROJECTS
        </div>
      </div>
    </div>
  )
}

export default SummaryCard