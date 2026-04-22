import { useState, useRef, type ChangeEvent } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadImage, cloudinaryUrl } from '@services'
import { cn } from '@utils'

interface ImageUploadProps {
  value: string[]
  onChange: (publicIds: string[]) => void
  max?: number
  accept?: string
  className?: string
}

const ALLOWED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024

export default function ImageUpload({
  value,
  onChange,
  max = 10,
  accept = 'image/jpeg,image/png,image/webp',
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    if (value.length + files.length > max) {
      setError(`Maximum ${max} images allowed`)
      return
    }

    for (const file of files) {
      if (!ALLOWED_FORMATS.includes(file.type)) {
        setError(`${file.name}: unsupported format`)
        return
      }
      if (file.size > MAX_SIZE) {
        setError(`${file.name}: exceeds 5MB`)
        return
      }
    }

    setError(null)
    setUploading(true)
    try {
      const results = await Promise.all(files.map((f) => uploadImage(f)))
      onChange([...value, ...results.map((r) => r.publicId)])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const canAddMore = value.length < max

  return (
    <div className={cn('space-y-3', className)}>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((publicId, i) => (
          <div
            key={publicId}
            className="relative aspect-square overflow-hidden rounded-xl bg-base-200"
          >
            <img
              src={cloudinaryUrl(publicId, 'w_300,h_300,c_fill,f_auto,q_auto')}
              alt=""
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-base-100/90 text-error shadow hover:bg-base-100"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {canAddMore && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-base-300 text-base-content/60 transition hover:border-primary hover:text-primary disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <Upload className="h-6 w-6" />
                <span className="text-xs font-semibold">Add image</span>
              </>
            )}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFiles}
        className="hidden"
      />
      {error && <p className="text-xs text-error">{error}</p>}
      <p className="text-xs text-base-content/50">
        {value.length} / {max} images · JPG, PNG, WEBP · max 5MB each
      </p>
    </div>
  )
}
