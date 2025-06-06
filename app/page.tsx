"use client";

import { Suspense } from "react";
import { TypeForm } from "./components/form/TypeForm";
import Loading from "./loading";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <TypeForm />
      </Suspense>
    </main>
  );
}
