"use client";
import { useEffect, useState } from 'react';
import { fetchAboutSections } from '../services/aboutService';
import { AboutSection } from '../types';

export function useAboutSections() {
  const [data, setData] = useState<AboutSection[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAboutSections()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
} 