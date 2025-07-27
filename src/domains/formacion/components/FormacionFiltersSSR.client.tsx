"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Filtro = 'todos' | 'formacion' | 'certificacion';

export default function FormacionFiltersSSR({ selected, pathname }: { selected: Filtro; pathname: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const filters = [
    { label: "Todos", value: "todos" },
    { label: "Formaciones", value: "formacion" },
    { label: "Certificaciones", value: "certificacion" },
  ];
  return (
    <div className="flex gap-2 mb-8 justify-center">
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => {
            startTransition(() => {
              router.push(f.value === 'todos' ? pathname : `${pathname}?tipo=${f.value}`);
            });
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 focus:outline-none ${
            selected === f.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-800/30"
          }`}
          disabled={isPending}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
} 