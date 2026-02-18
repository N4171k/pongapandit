'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    function onClick(nextLocale: string) {
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <div className="flex items-center gap-2 ml-4">
            <button
                onClick={() => onClick('en')}
                className={`px-2 py-1 text-sm rounded font-bold transition-opacity ${locale === 'en' ? 'bg-ink text-white' : 'text-ink opacity-50 hover:opacity-100'}`}
                disabled={isPending}
            >
                EN
            </button>
            <button
                onClick={() => onClick('hi')}
                className={`px-2 py-1 text-sm rounded font-bold transition-opacity ${locale === 'hi' ? 'bg-ink text-white' : 'text-ink opacity-50 hover:opacity-100'}`}
                disabled={isPending}
            >
                HI
            </button>
        </div>
    );
}
