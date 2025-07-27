import FormacionSection from '@/domains/formacion/components/FormacionSection';

export default function Formacion({ searchParams }: { searchParams?: { tipo?: string } }) {
  return <FormacionSection searchParams={searchParams} />;
}
