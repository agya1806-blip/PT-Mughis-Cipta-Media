import ManuscriptForm from "@/components/dashboard/forms/ManuscriptForm"

export default function NewManuscriptPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-dark dark:text-cream">Naskah Baru</h1>
        <p className="text-sm text-green/70 dark:text-gold/80 mt-1">Lengkapi data naskah Anda untuk diajukan ke tim penerbitan</p>
      </div>
      <ManuscriptForm />
    </div>
  )
}
