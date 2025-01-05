interface NumberProps {
  content: number;
  onClick: () => void;
}

export function Number({ content, onClick }: NumberProps) {
  return (
    <div
      className='button number'
      onClick={onClick}
    >
      {content}
    </div>
  )
}