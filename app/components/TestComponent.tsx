// app/components/TestComponent.tsx
"use client"; // Diretriz para tornar este componente um componente de cliente

import { useLanguage } from "@/lib/language-provider";

const TestComponent = () => {
  const { language } = useLanguage();
  return <div>Idioma atual: {language}</div>;
}

export default TestComponent;
