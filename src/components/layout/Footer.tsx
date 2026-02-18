import { useTranslations } from 'next-intl';

export function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="relative z-10 px-6 pb-10 pt-16 text-center">
            <div className="mx-auto max-w-2xl">
                <p className="mb-4 font-body text-sm font-semibold leading-relaxed text-ink3">
                    {t('disclaimer')}
                </p>
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-ink3/60">
                    <span aria-hidden="true">✨</span>
                    <span>{t('signature')}</span>
                    <span aria-hidden="true">✨</span>
                </div>
            </div>
        </footer>
    )
}

