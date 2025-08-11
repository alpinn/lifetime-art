import Image from 'next/image';

const Button = ({ text, className = '', arrowClassName = '' }) => {
  return (
    <button
      className={`flex items-center gap-4 px-4 py-2 rounded-full cursor-pointer ${className}`}
    >
      <span>{text}</span>
      <span
        className={`p-1 rounded-full flex items-center justify-center ${arrowClassName}`}
      >
        <Image src='/icons/arrow.svg' alt='Arrow' width={28} height={28} />
      </span>
    </button>
  );
};

export default Button;
