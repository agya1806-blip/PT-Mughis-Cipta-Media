import ManuscriptForm from "@/components/dashboard/forms/ManuscriptForm"

export default function NewManuscriptPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Naskah Baru</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Lengkapi data naskah Anda untuk diajukan ke tim penerbitan</p>
      </div>
      <ManuscriptForm />
    </div>
  )
}
