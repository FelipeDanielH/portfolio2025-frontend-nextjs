type SkillBarProps = {
  name: string
  level: number // 1 a 10
}

export default function SkillBar({ name, level }: SkillBarProps) {
  const percentage = (level / 10) * 100

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{level}/10</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className="h-3 rounded-full bg-indigo-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
