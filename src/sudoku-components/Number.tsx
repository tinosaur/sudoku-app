import './Number.scss';

interface NumberProps {
  content: number;
  onClick: () => void;
}

export function Number({ content, onClick }: NumberProps) {
  return (
    <div
      className='number'
      onClick={onClick}
    >
      {content}
    </div>
  )
}