"use client";

import { useFormStatus } from "react-dom";

export default function Delete(props: { file: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      <input type="hidden" name="delete" value={props.file} />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.currentTarget.form?.requestSubmit();
        }}
        className="mt-auto px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
      >
        {pending ? (
          <div className="flex flex-col items-center gap-2 text-green-700">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />
            <span className="font-semibold">Chargement...</span>
          </div>
        ) : (
          <>Supprimer l&apos;image</>
        )}
      </button>
    </>
  );
}
