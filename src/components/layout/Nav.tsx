import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Nav() {
    const t = useTranslations('Nav');

    return (
        <nav
            className="sticky top-0 z-50 flex items-center justify-center px-6 py-3"
            role="navigation"
            aria-label="Main navigation"
        >
            <div
                className="flex items-center gap-3 rounded-pill border-2 border-white/60 bg-surface/70 px-6 py-2.5 shadow-clay-xs"
                style={{
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                }}
            >
                <span className="text-lg" aria-hidden="true">
                    🔢
                </span>
                <span className="font-display text-lg font-bold tracking-tight text-ink">
                    {t('title')}
                </span>
                <LanguageSwitcher />
            </div>
        </nav>
    )
}

