'use client';

import dynamic from 'next/dynamic';

const AvatarWidget = dynamic(() => import('@/components/AvatarWidget'), { ssr: false });

export default function AvatarWidgetLoader() {
  return <AvatarWidget />;
}
