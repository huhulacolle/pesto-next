"use client";

import { useFormStatus } from "react-dom";

export default function UploadButton(props: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={props.action} className="gap-4 mb-8">
      <UploadButtonForm />
    </form>
  );
}

function UploadButtonForm() {
  const { pending } = useFormStatus();

  return (
    <label className="bg-lime-300 border-4 border-green-700 p-4 flex justify-center items-center cursor-pointer rounded shadow-lg transition hover:scale-110">
      <input
        type="file"
        name="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          if (e.target.files?.length) {
            e.currentTarget.form?.requestSubmit();
          }
        }}
      />
      {pending ? (
        <div className="flex flex-col items-center gap-2 text-green-700">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />
          <span className="font-semibold">Chargement...</span>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16a4 4 0 01-.88-7.9A5 5 0 0117 8a3 3 0 01.5 5.8"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 12v8m0 0l-3-3m3 3l3-3"
          />
        </svg>
      )}
    </label>
  );
}
