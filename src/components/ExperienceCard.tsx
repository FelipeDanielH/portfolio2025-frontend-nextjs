type ExperienceCardProps = {
  role: string
  company: string
  date: string
  description: string
}

export default function ExperienceCard({ role, company, date, description }: ExperienceCardProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold">{role}</h3>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        {company} · {date}
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  )
}
