import type { NumberContent, NumberMeta, DigitAnalysis, PlaneResult, DOBInput } from './types'

// ── Planetary & Elemental Associations ──────────────
export const NUMBER_META: Record<number, NumberMeta> = {
    1: { digit: 1, planet: 'Sun', element: 'Water', direction: 'North', archetype: 'Career, Independence, Communication, Leadership' },
    2: { digit: 2, planet: 'Moon', element: 'Earth', direction: 'South-West', archetype: 'Marriage, Sensitivity, Intuition, Partnership' },
    3: { digit: 3, planet: 'Jupiter', element: 'Wood', direction: 'East', archetype: 'Health, Creativity, Education, Family' },
    4: { digit: 4, planet: 'Rahu (Uranus)', element: 'Wood', direction: 'South-East', archetype: 'Wealth, Stability, Practicality, Discipline' },
    5: { digit: 5, planet: 'Mercury', element: 'Earth', direction: 'Center', archetype: 'Balance, Strength, Freedom, Adaptability' },
    6: { digit: 6, planet: 'Venus', element: 'Metal (Gold)', direction: 'North-West', archetype: 'Family, Love, Responsibility, Aesthetics' },
    7: { digit: 7, planet: 'Ketu (Neptune)', element: 'Metal (Silver)', direction: 'West', archetype: 'Spirituality, Introspection, Mental Health' },
    8: { digit: 8, planet: 'Saturn', element: 'Earth', direction: 'North-East', archetype: 'Knowledge, Power, Memory, Achievement' },
    9: { digit: 9, planet: 'Mars', element: 'Fire', direction: 'South', archetype: 'Fame, Reputation, Compassion, Action' },
}

// ── Number Content with Specific Repetition Texts ───
export const NUMBER_CONTENT: Record<number, NumberContent> = {
    1: {
        digit: 1,
        keyword: 'Communication',
        shortDesc: 'Self-expression, career drive, independence',
        meta: NUMBER_META[1],
        repetitions: {
            single: 'You have an introverted psychological profile, finding it difficult to express your innermost feelings openly. You often rely on others for communicative guidance and need to cultivate the courage to voice your own opinions with confidence.',
            double: 'This is the optimal equilibrium for Number 1 — you possess balanced communication, an unbiased worldview, and highly effective interpersonal dynamics. You can express yourself clearly while also listening deeply.',
            triple: 'You may be highly talkative and viewed as a joyful entertainer, yet you lack deep, authentic emotional expression. There is a personality duality — the outward persona masks the inner emotional landscape.',
            quadruple: 'The psychological load is overwhelming, resulting in a severe inability to express yourself verbally. You may mask profound internal pain, suffer from intense anxiety despite potential fame, and vastly prefer written communication over oral dialogue due to a persistent fear of being misunderstood.',
        },
        missingText: 'A critical void of the Water element impedes your career planning, self-expression, and the assertion of individuality. You suffer from chronically low self-confidence, rely heavily on external advice, and frequently neglect your own needs in a misplaced attempt to constantly serve others.',
        remedy: 'Place a continuously flowing fountain or active aquarium in the North sector of your home. Wear a red thread on the right wrist. Worshipping a Surya Yantra mitigates the psychological deficit associated with the missing solar energy.',
    },
    2: {
        digit: 2,
        keyword: 'Sensitivity',
        shortDesc: 'Intuition, emotional depth, partnerships',
        meta: NUMBER_META[2],
        repetitions: {
            single: 'You are a sensitive, intuitive individual and a natural judge of character. You possess a remarkably soft heart and can perceive the emotions and intentions of those around you with striking accuracy.',
            double: 'You are a highly intelligent individual with superb intuition, capable of understanding underlying truths without explicit explanation. Your perceptive abilities are finely tuned.',
            triple: 'Emotional overload pushes you into an isolated dream world. You loathe excessive socializing to avoid emotional injury and often struggle with deep-seated trust issues that make genuine intimacy difficult.',
            quadruple: 'Your emotional sensitivity has inverted into extreme impatience and a rash disposition. You possess a profound lack of trust in others, becoming highly reactive, taking offense to minor stimuli using, and losing faith rapidly when life presents challenges.',
        },
        missingText: 'A profound absence of maternal Earth energy results in a lack of tact, intuition, and interpersonal patience. You are frequently unpunctual, stubbornly refuse to admit errors, and experience pronounced delays or systemic failures in marital harmony and wealth accumulation.',
        remedy: 'Hang images of strong, grounded mountains — strictly devoid of any water features — in the South-West sector of your home. Wear a pearl or crystal mala. Drink from silver vessels to instill internal calm.',
    },
    3: {
        digit: 3,
        keyword: 'Creativity',
        shortDesc: 'Memory, imagination, intellectual depth',
        meta: NUMBER_META[3],
        repetitions: {
            single: 'You have an excellent memory, a realistic approach to objectives, and a fundamental passion for continuous learning. You process information methodically and retain knowledge with remarkable clarity.',
            double: 'Creativity and mental alertness are vastly amplified. You are highly imaginative, often excelling in literary or artistic pursuits, and possess a natural charisma that cheers those around you.',
            triple: 'The intellect has moved into the realm of the abstract, causing you to become self-absorbed, overly imaginative, and detached from mundane reality. You frequently feel that society cannot comprehend your depth.',
            quadruple: 'Profound impracticality dominates — you plan obsessively but rarely execute, remaining paralyzed in a dreamy state while lacking the grounding required to actualize your visions.',
        },
        missingText: 'Jupiter\'s expansive Wood energy is missing, which actively stunts intellectual growth and logical processing. You struggle to maintain focus, suffer from poor self-confidence, and lack the communicative dexterity necessary to express complex opinions during challenging times.',
        remedy: 'Place grafted bamboo or vibrant green plants in the East direction of your living space. Incorporate solid wooden furniture. Prioritize conscious respect for elders and teachers to anchor this missing frequency.',
    },
    4: {
        digit: 4,
        keyword: 'Stability',
        shortDesc: 'Organization, hard work, practicality',
        meta: NUMBER_META[4],
        repetitions: {
            single: 'You have an earthy, practical nature. You are a reliable doer who leads an orderly life, relying on consistent hard work rather than mere dreaming to achieve your goals.',
            double: 'You are a highly conscientious, accurate, and disciplined individual capable of excellent management. You finish tasks with creative flair and maintain precise, organized systems.',
            triple: 'Your focus shifts entirely to physical and material pursuits. You are immensely hard-working and fiercely protective of your family but develop a rigid perspective, often failing to understand alternate viewpoints.',
            quadruple: 'An extremely rare configuration indicating a life dominated by heavy physical labor, an inability to fit into intellectual or social groups, and a pervasive feeling of being a constant outsider.',
        },
        missingText: 'Severe disorganization, a pervasive lack of motivation, and chronic financial instability dominate. You find it nearly impossible to stick to a daily routine, are highly prone to physical accidents, and may suffer enormous wealth losses, particularly between ages 42–48.',
        remedy: 'Wear a Tulsi mala with five Mukhi Rudraksha. Place a green bulb or images of lush green foliage in the South-East sector. Use wooden objects daily (pens, keychains) to stimulate wealth generation.',
    },
    5: {
        digit: 5,
        keyword: 'Balance',
        shortDesc: 'Emotional center, adaptability, strength',
        meta: NUMBER_META[5],
        repetitions: {
            single: 'You possess emotional stability, compassion, and the innate ability to adapt to changes and motivate others. You serve as an anchor for those around you during turbulent times.',
            double: 'Intense determination and a fierce drive for success characterize you, though you must guard against emotional outbursts or obsessive behavior that can alienate others.',
            triple: 'Boundless, erratic energy and a heavy inclination toward extreme risk-taking and adventure dominate, often leading to a destabilized lifestyle that requires conscious grounding.',
            quadruple: 'A highly hazardous energetic signature makes you exceptionally prone to accidents. You must significantly slow your pace of life and cultivate mindful awareness in all physical activities.',
        },
        missingText: 'As the geometric nucleus of the grid, a missing 5 severely destabilizes the entire chart. You experience a profound lack of mental and emotional balance, extreme difficulty in setting long-term goals, and a high probability of severe financial struggles or communication failures before age 34.',
        remedy: 'Wear natural quartz crystals daily. Walk barefoot on natural earth. Eliminate all electronics from the geometric center of your home and place a poster of solid, dry rocks in that central space.',
    },
    6: {
        digit: 6,
        keyword: 'Responsibility',
        shortDesc: 'Home, love, aesthetics, family duty',
        meta: NUMBER_META[6],
        repetitions: {
            single: 'You are a highly responsible home-lover who acts as the foundational pillar for family members during crises. Your dedication to domestic harmony is your greatest strength.',
            double: 'An intense appreciation for aesthetics, beauty, and creative endeavors defines you, coupled with a tendency to fret over minute domestic details and exhibit over-protective behavior toward loved ones.',
            triple: 'The metallic energy becomes rigid, leading to chronic stress, restlessness, tension, and a quick temper. You need to consciously practice emotional flexibility.',
            quadruple: 'Emotional vulnerability peaks — while you may be a creative genius, you are emotionally fragile, driven by nervous energy, and highly susceptible to emotional manipulation by others.',
        },
        missingText: 'Domestic harmony is destroyed due to the lack of Venusian Metal energy. You must work exponentially harder to achieve wealth, often lacking fundamental support from authority figures or family. You struggle to maintain long-term friendships and habitually hide your innermost feelings.',
        remedy: 'Wear a watch with a high-quality gold-plated chain. Hang a six-rod golden wind chime, with each rod measuring exactly 11 inches, in the North-West direction of your home.',
    },
    7: {
        digit: 7,
        keyword: 'Spirituality',
        shortDesc: 'Introspection, wisdom, life lessons',
        meta: NUMBER_META[7],
        repetitions: {
            single: 'You will learn major life lessons through significant physical, emotional, or romantic losses. These experiences will lead eventually to spiritual maturity and profound inner wisdom.',
            double: 'A deeply wise, analytical mind with a profound interest in the occult, psychic phenomena, or hidden knowledge. You possess the gift of seeing beyond surface-level reality.',
            triple: 'The strong, silent archetype — you often experience severe life setbacks but develop an impenetrable inner resilience. Your strength grows through adversity.',
            quadruple: 'An incredibly rare configuration indicating a profound karmic debt being rapidly repaid within a single lifetime. Maturity comes through catastrophic loss, but ultimate transcendence is achieved.',
        },
        missingText: 'A chaotic, highly disorganized life devoid of spiritual grounding. You are highly dependent on others, chronically moody, and lack fundamental empathy or respect for the feelings of those around you.',
        remedy: 'Wear a watch with a silver chain. Hang a seven-rod silver wind chime in the West sector of your home. Dedicate regular time to serving and feeding animals, specifically dogs, to settle karmic debt.',
    },
    8: {
        digit: 8,
        keyword: 'Power',
        shortDesc: 'Knowledge, discipline, self-mastery',
        meta: NUMBER_META[8],
        repetitions: {
            single: 'A fastidious, methodical approach to life, often accompanied by mental challenges and an uncomfortable early life trajectory that builds character through adversity.',
            double: 'You are a highly perceptive but immensely stubborn individual who insists on learning exclusively through direct personal experience and mistakes rather than accepting external advice.',
            triple: 'Materialistic tendencies dominate your psyche. You become a rigid perfectionist whose true growth and financial stability are almost always delayed until past the age of forty.',
            quadruple: 'A restless personality driven beyond belief. Progress is incredibly fast, but maintaining stability requires you to find a profound, overarching true purpose to channel your immense energy.',
        },
        missingText: 'Endless life instability and frequent fluctuations in fortune. Financial management is extraordinarily poor due to inherent carelessness and misplaced trust regarding money. Tasks are rarely completed, and you seldom receive any ancestral inheritance.',
        remedy: 'Keep a Kalash of water and a natural crystal in the North-East sector. Fast or strictly avoid non-vegetarian food on Saturdays. Donate salty foods to those in need as effective karmic balancers.',
    },
    9: {
        digit: 9,
        keyword: 'Ambition',
        shortDesc: 'Fame, intelligence, humanitarian drive',
        meta: NUMBER_META[9],
        repetitions: {
            single: 'You possess high intelligence, ambition, and a fundamental humanitarian desire for continuous self-improvement. You strive to leave every situation better than you found it.',
            double: 'Profound idealism, deep wisdom, and cleverness define you, though you may harbor distinct feelings of intellectual superiority over your peers that can create social distance.',
            triple: 'The volatile nature of fire is amplified — you are brilliant, virtuous, and deeply helpful, but highly irritable and prone to snapping aggressively over minor inconveniences.',
            quadruple: 'Mental brilliance actively isolates you from society. You find it psychologically impossible to lie, struggle to adjust to mundane societal norms, and often feel profoundly alienated from reality.',
        },
        missingText: 'The Fire void prevents the attainment of name, fame, and reputation regardless of effort. You are highly impulsive, act without necessary forethought, and struggle with continuous, compounding life obstacles.',
        remedy: 'Utilize red color therapy extensively. Keep a lighted red bulb or imagery of fire in the South sector. Donate red lentils and wear a red thread on the wrist to appease the missing Martian energy.',
    },
}

// ── Plane Interpretations ──────────────────────────
const PLANE_STRENGTH_CONTENT: Record<string, string> = {
    mental: 'You possess a remarkably strong, rational memory, think logically through crises, and pursue objectives with intense, unbroken focus — maintaining a calm mind under pressure.',
    emotional: 'You are incredibly loyal, intuitively grounded, and highly capable of managing feelings under intense pressure, providing a safe harbor for those around you.',
    practical: 'You are deeply materially grounded — handling financial matters exceptionally well and slowly building substantial wealth through smart, calculated, day-to-day decisions.',
    thought: 'You generate unique, forward-thinking ideas, possess an incredibly sharp memory, and consistently stay ahead of your time as a quick learner.',
    will: 'You have uncompromising inner strength — immense resilience against failure, unshakeable self-belief, and the capacity to face problems gracefully without succumbing to pressure.',
    action: 'You are highly proactive, easily accept physical challenges, and effortlessly translate abstract thoughts and plans into physical reality without overthinking.',
    golden_yog: 'Phenomenally rare (2–3% of charts) — this Golden Yog (Raj Yog) brings massive name, fame, and wealth. You are fiercely hardworking and can adapt rapidly to dynamic shifts.',
    silver_yog: 'This Silver Yog (Rajat Yog) ensures strong financial flow, immense good luck, and seamless accumulation of property and assets with high emotional intelligence.',
}

const PLANE_WEAKNESS_CONTENT: Record<string, string> = {
    emotional: 'Arrow of Scepticism — You refuse to accept anything on trust. You have a hyper-analytical mindset that demands absolute empirical demonstration for every claim, making faith difficult.',
    thought: 'Arrow of Impracticality — You lack real-world grounding. You cannot execute basic manual or logistical tasks efficiently and are disconnected from the physical requirements of daily life.',
    will: 'Arrow of Indecision — While generally caring and likable, you are utterly paralyzed when forced to make decisions, leading to subjugation by stronger personalities as you attempt to please everyone.',
    golden_yog: 'Arrow of Frustrations — Deep emotional turmoil and severe hardship in expressing feelings. You expect far too much from others, leading to constant disappointment and repressed energy.',
    silver_yog: 'Arrow of Emotional Sensitivity — An overly fragile emotional state. You are hurt rapidly by minor offenses, lack defensive psychological boundaries, and frequently feel isolated.',
}

const EXTRA_WEAKNESS_CONTENT: Record<string, string> = {
    'Arrow of Poor Memory': 'A scattered, unfocused mind — chronic forgetfulness, a lack of intellectual focus, and an inability to maintain long-term strategic plans.',
    'Arrow of Hesitation': 'You lack the courage to push forward in the final stages of a project, frequently abandoning endeavors just prior to crossing the threshold of success.',
}

// ── Minor Arrow Content ─────────────────────────────
const MINOR_ARROW_CONTENT: Record<string, string> = {
    detail_deceit: 'Arrow of Detail & Deceit — The combination of independent Water (1) and expansive Wood (3) creates a highly detail-oriented mindset, excellent for meticulous work. However, if morality is compromised, this analytical prowess can pivot into cunning or manipulative behavior.',
    litigation: 'Arrow of Litigation — The aggressive fire of Mars (9) clashing with expansive Jupiter (3) creates severe legal and ideological friction. This correlates with prolonged legal disputes and a profound necessity to exercise extreme caution during contracts and conflict resolution.',
    peace_of_mind: 'Arrow of Peace of Mind — The impulsive action of Mars (9) channeled into spiritual Ketu/Neptune (7) grants immense psychological resilience and innate ability to maintain internal tranquility even during periods of extreme external chaos.',
    science: 'Arrow of Science — The intuitive depth of Metal (7) flowing into communicative Water (1) creates a formidable analytical and scientific mindset. You are naturally drawn to empirical discovery, research, and engineering, excelling at breaking down complex systems.',
}

export function getPlaneInterpretation(
    planeId: string,
    type: 'strength' | 'developing',
    presentCount?: number
): string {
    if (type === 'strength') {
        return PLANE_STRENGTH_CONTENT[planeId] || ''
    }
    // Developing — partial plane
    const count = presentCount ?? 0
    if (count === 2) return `This plane is nearly complete — 2 of 3 numbers are present, giving you emerging strength in this area.`
    if (count === 1) return `Only 1 of 3 numbers is present in this plane, indicating potential for growth with conscious effort.`
    return ``
}

export function getWeaknessInterpretation(planeId: string): string {
    return PLANE_WEAKNESS_CONTENT[planeId] || ''
}

export function getMinorArrowContent(arrowId: string): string {
    return MINOR_ARROW_CONTENT[arrowId] || ''
}

export function getExtraWeaknessContent(name: string): string {
    return EXTRA_WEAKNESS_CONTENT[name] || ''
}

// ── Summary Builder ─────────────────────────────────
interface SummaryInput {
    digitMap: Record<number, DigitAnalysis>
    planes: PlaneResult[]
    dominantNumbers: number[]
    missingNumbers: number[]
    mulank: number
    bhagyank: number
    input: DOBInput
}

export function buildSummary(ctx: SummaryInput): { headline: string; paragraph: string } {
    const { dominantNumbers, missingNumbers, planes, mulank, bhagyank, input } = ctx
    const firstName = input.name?.split(' ')[0] ?? 'You'

    // Build headline from Mulank archetype
    const mulankInfo = NUMBER_CONTENT[mulank]
    const bhagyankInfo = NUMBER_CONTENT[bhagyank]
    const completePlanes = planes.filter((p) => p.isComplete)
    const weaknessPlanes = planes.filter((p) => p.isEmpty && p.weaknessArrowName)

    let headline: string
    if (completePlanes.length >= 2) {
        headline = `${firstName}, a powerful grid with ${completePlanes.length} complete arrows`
    } else if (dominantNumbers.length >= 3) {
        headline = `${firstName}, an intensely concentrated energy pattern`
    } else if (missingNumbers.length >= 4) {
        headline = `${firstName}, a chart calling for balance and remediation`
    } else {
        headline = `${firstName}, a ${mulankInfo.keyword}-driven personality guided by ${bhagyankInfo.keyword}`
    }

    // Build paragraph
    const parts: string[] = []

    parts.push(`Your Mulank (Driver) is ${mulank} (${mulankInfo.meta.planet}), making ${mulankInfo.keyword.toLowerCase()} the core of your daily choices and instincts.`)
    parts.push(`Your Bhagyank (Conductor) is ${bhagyank} (${bhagyankInfo.meta.planet}), guiding your long-term karmic trajectory toward ${bhagyankInfo.keyword.toLowerCase()}.`)

    if (completePlanes.length > 0) {
        const names = completePlanes.map((p) => p.name).join(', ')
        parts.push(`Complete planes — ${names} — channel concentrated elemental energy into your strengths.`)
    }

    if (weaknessPlanes.length > 0) {
        const names = weaknessPlanes.map((p) => p.weaknessArrowName).join(', ')
        parts.push(`Empty planes form the ${names}, indicating areas requiring conscious remediation.`)
    }

    if (dominantNumbers.length > 0) {
        const list = dominantNumbers.map((n) => `${n} (${NUMBER_CONTENT[n].meta.planet})`).join(', ')
        parts.push(`Numbers ${list} appear multiple times, amplifying their elemental frequencies.`)
    }

    if (missingNumbers.length > 0) {
        parts.push(`Missing numbers ${missingNumbers.join(', ')} create energetic voids that can be addressed with environmental remedies.`)
    }

    return {
        headline,
        paragraph: parts.join(' '),
    }
}
