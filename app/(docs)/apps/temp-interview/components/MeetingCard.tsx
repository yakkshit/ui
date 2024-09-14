import Image from 'next/image'

export function MeetingCard() {
  return (
    <div className="flex justify-center items-center h-64">
      <Image
        src="/icon.svg"
        alt="Meeting placeholder"
        width={200}
        height={200}
        className="rounded-lg"
      />
    </div>
  )
}