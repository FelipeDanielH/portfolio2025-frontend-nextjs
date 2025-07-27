"use client";

type Filtro = 'todos' | 'formacion' | 'certificacion';
interface Props {
  filters: { label: string; value: Filtro }[];
  selected: Filtro;
}

export default function FormacionFilters({ filters, selected }: Props) {
  return (
    <div className="flex gap-2 mb-8 justify-center">
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => {
            window.__formacionFilter = f.value;
            window.location.reload();
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 focus:outline-none ${
            selected === f.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-800/30"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
} 