import Image from 'next/image';

export default function Avatar() {
  return (
    <div className="relative w-24 h-24 full overflow-hidden border-2 border-white shadow-lg shadow-black">
      <Image
        src="/avatar.jpg"
        alt="User Avatar"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}