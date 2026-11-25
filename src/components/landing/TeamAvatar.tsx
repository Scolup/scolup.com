import { useState } from "react"

export function TeamAvatar({ name }: { name: string }) {
  const [failed, setFailed] = useState(false)

  return (
    <span className="team-avatar" aria-hidden="true">
      {failed ? (
        name[0]
      ) : (
        <img
          src={`https://github.com/${name}.png?size=160`}
          alt=""
          width={160}
          height={160}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}
