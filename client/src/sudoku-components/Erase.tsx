interface EraseProps {
  onClick: () => void;
}

export function Erase({ onClick }: EraseProps) {
  return (
    <div
      className='button erase'
      onClick={onClick}
    >
      Erase
    </div>
  )
}