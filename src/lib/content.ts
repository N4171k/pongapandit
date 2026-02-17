import type { NumberContent, DigitAnalysis, PlaneResult, DOBInput } from './types'

// ── Number Content (1–9) ───────────────────────────
export const NUMBER_CONTENT: Record<number, NumberContent> = {
    1: {
        digit: 1,
        keyword: 'Leadership & Independence',
        shortDesc: 'The pioneer — independent, driven, and naturally authoritative.',
        presentText:
            'The number 1 appears in your chart, indicating a natural capacity for leadership and independent thinking. You are likely self-motivated and comfortable taking the initiative in situations where others hesitate. Your identity and individuality are important to you, and you do your best work when given autonomy.',
        strongText:
            'With 1 appearing twice in your chart, leadership and independence are defining traits of your personality. You may have a strong desire to forge your own path and can find it difficult to follow others\u2019 direction. Channel this powerful energy into entrepreneurship, mentorship, or pioneering projects.',
        dominantText:
            'The number 1 is overwhelmingly present in your chart, creating an extremely powerful individualistic energy. While your capacity for leadership is extraordinary, be mindful of tendencies toward stubbornness or isolation. This is a chart that can achieve great things \u2014 with conscious humility.',
        missingText:
            'The number 1 is absent from your chart. This is a life lesson around building self-confidence and learning to assert your own needs. Early in life, you may have deferred to others or doubted your own judgment. Your journey involves growing into your authority and trusting your own voice.',
        career: 'Leadership roles, entrepreneurship, management, sports, politics, self-employment',
        relationship:
            'You value your independence in relationships and need a partner who respects your autonomy. You give loyalty, but not dependency.',
    },
    2: {
        digit: 2,
        keyword: 'Sensitivity & Cooperation',
        shortDesc: 'The diplomat — empathetic, gentle, and deeply intuitive.',
        presentText:
            'Number 2 is active in your chart, revealing a natural sensitivity and talent for cooperation. You tend to be empathetic, diplomatic, and skilled at reading the emotions of those around you. You bring people together and are often the glue in group dynamics.',
        strongText:
            'With 2 appearing twice, your sensitivity is amplified significantly. You feel things deeply and may absorb the moods of others. While this is a gift in caregiving and creative roles, it is wise to cultivate emotional boundaries to protect your own well-being.',
        dominantText:
            'Number 2 dominates your chart, making you extraordinarily empathetic and receptive. This can border on being overwhelming \u2014 you may take on others\u2019 problems as your own. Developing healthy boundaries while honouring your compassionate nature is your path to balance.',
        missingText:
            'The number 2 is absent from your chart. This suggests that building emotional boundaries and learning the art of diplomacy is a key life lesson. You may find it challenging to express vulnerability or to collaborate without friction. Your growth lies in embracing sensitivity as a strength.',
        career: 'Counselling, diplomacy, healthcare, teaching, creative arts, human resources',
        relationship:
            'You thrive in harmonious, supportive partnerships and tend to be a natural peacemaker. You seek deep emotional connection over surface-level bonds.',
    },
    3: {
        digit: 3,
        keyword: 'Creativity & Expression',
        shortDesc: 'The artist — imaginative, expressive, and full of joy.',
        presentText:
            'Number 3 is active in your chart, indicating a vibrant creative spark and a gift for self-expression. You tend to be articulate, imaginative, and drawn to artistic or communicative endeavours. Your enthusiasm and optimism naturally uplift those around you.',
        strongText:
            'With 3 appearing strongly, creativity and self-expression are defining forces in your life. You may have multiple creative outlets and an irresistible urge to share your ideas with the world. Channel this energy into focused projects to avoid scattering your talents.',
        dominantText:
            'Number 3 dominates your chart with powerful creative energy. While your imagination is boundless, be mindful of the tendency to start many things without finishing them. Discipline paired with your creativity creates an unstoppable combination.',
        missingText:
            'The number 3 is absent from your chart. This points to a life lesson around developing communication skills and creative confidence. You may have felt shy about expressing yourself or struggled to find your artistic voice. Your journey involves discovering and trusting your unique creative gifts.',
        career: 'Writing, performing arts, design, marketing, public speaking, entertainment',
        relationship:
            'You bring joy, humour, and spontaneity to relationships. You are drawn to partners who appreciate your creative spirit and match your enthusiasm for life.',
    },
    4: {
        digit: 4,
        keyword: 'Practicality & Discipline',
        shortDesc: 'The builder — structured, dependable, and methodical.',
        presentText:
            'Number 4 is active in your chart, showing a natural affinity for structure, planning, and disciplined execution. You tend to be organised, hardworking, and reliable. Others often depend on you to bring order to chaotic situations.',
        strongText:
            'With 4 appearing twice, discipline and structure are core pillars of your personality. You excel at building systems, following through on commitments, and maintaining order. Be aware of the tendency toward rigidity \u2014 flexibility is the complement that makes your discipline powerful.',
        dominantText:
            'Number 4 is overwhelmingly present, making you exceptionally methodical and driven by routine. While your reliability is admirable, an overly rigid approach can limit growth. Embrace occasional spontaneity to balance your structured nature.',
        missingText:
            'The number 4 is absent from your chart. This is a life lesson around developing structure, follow-through, and practical skills. You may have struggled with organisation or consistency early in life. Your growth lies in building routines that support your goals without feeling like constraints.',
        career: 'Engineering, architecture, project management, accounting, operations, farming',
        relationship:
            'You bring stability and dependability to partnerships. You show love through practical acts of service and value a partner who appreciates your groundedness.',
    },
    5: {
        digit: 5,
        keyword: 'Balance, Freedom & Change',
        shortDesc: 'The explorer — adaptable, curious, and eternally restless.',
        presentText:
            'Number 5 sits at the heart of your chart, indicating a natural drive for balance, freedom, and adaptability. You tend to embrace change rather than resist it, and you thrive in dynamic environments that offer variety and stimulation.',
        strongText:
            'With 5 appearing twice, the desire for freedom and change is amplified. You are highly adaptable and may resist anything that feels confining. While your versatility is an asset, grounding yourself with clear priorities helps channel this energy effectively.',
        dominantText:
            'Number 5 dominates your chart, creating a powerful restless energy. You are drawn to new experiences, ideas, and people \u2014 sometimes at the expense of depth or commitment. Your path to fulfilment lies in finding freedom within structure, not from it.',
        missingText:
            'The number 5 is absent from your chart. This is a life lesson around embracing change, finding inner balance, and becoming comfortable with uncertainty. You may tend to resist transition or cling to stability. Your growth lies in learning that change is a natural and healthy part of life.',
        career: 'Travel, sales, journalism, consulting, adventure sports, event management',
        relationship:
            'You value freedom and excitement in partnerships. You are drawn to partners who share your love of adventure and who can match your spontaneous energy.',
    },
    6: {
        digit: 6,
        keyword: 'Responsibility & Family',
        shortDesc: 'The nurturer — caring, devoted, and deeply responsible.',
        presentText:
            'Number 6 is active in your chart, reflecting a strong sense of responsibility, family devotion, and a nurturing spirit. You tend to be the person others turn to for support, and you take your commitments \u2014 especially to loved ones \u2014 seriously.',
        strongText:
            'With 6 appearing twice, nurturing and responsibility are defining traits. You may feel compelled to take care of everyone around you, sometimes at the cost of your own needs. Learning to set healthy limits is essential for your well-being.',
        dominantText:
            'Number 6 is overwhelmingly present, creating an intense devotion to family and duty. While your selflessness is admirable, it can lead to self-sacrifice and resentment. Remember that taking care of yourself enables you to better care for others.',
        missingText:
            'The number 6 is absent from your chart. This is a life lesson around learning to give and receive love freely, without conditions. You may have found it challenging to nurture others or to accept care from them. Your growth lies in building deeper, more heart-centred relationships.',
        career: 'Healthcare, education, social work, hospitality, interior design, family counselling',
        relationship:
            'You are deeply loyal and nurturing in relationships, often putting your partner\u2019s needs first. You value stability, trust, and long-term commitment.',
    },
    7: {
        digit: 7,
        keyword: 'Wisdom & Spirituality',
        shortDesc: 'The seeker — thoughtful, spiritual, and analytically sharp.',
        presentText:
            'Number 7 is active in your chart, indicating a deep inner life, spiritual curiosity, and analytical mind. You tend to question the surface of things, seeking deeper meaning and truth. Solitude and reflection are important to your well-being.',
        strongText:
            'With 7 appearing twice, your spiritual and analytical capacities are highly developed. You are naturally drawn to philosophy, study, and introspection. While your depth is a gift, be mindful of the tendency toward isolation or overthinking.',
        dominantText:
            'Number 7 dominates your chart, making you profoundly introspective and spiritually oriented. This intense inner focus can sometimes disconnect you from the practical world. Balancing reflection with action creates harmony in your life.',
        missingText:
            'The number 7 is absent from your chart. This is a life lesson around developing faith, inner awareness, and the ability to look beneath the surface. You may have relied primarily on logic or external validation. Your growth lies in cultivating a deeper relationship with your inner self.',
        career: 'Research, academia, philosophy, technology, investigation, spiritual guidance',
        relationship:
            'You value depth, honesty, and intellectual connection in relationships. You are drawn to partners who respect your need for personal space and inner exploration.',
    },
    8: {
        digit: 8,
        keyword: 'Power, Success & Abundance',
        shortDesc: 'The achiever — ambitious, resilient, and materially driven.',
        presentText:
            'Number 8 is active in your chart, indicating a natural drive toward success, power, and material achievement. You tend to be ambitious, resilient, and capable of overcoming significant obstacles. Financial acumen comes naturally to you.',
        strongText:
            'With 8 appearing twice, your ambition and drive for success are amplified. You have a commanding presence and a talent for creating wealth and influence. Channel this energy ethically, and be aware of the tendency toward workaholism.',
        dominantText:
            'Number 8 is overwhelmingly present in your chart, creating a formidable drive for material success. While your capacity for achievement is extraordinary, guard against becoming consumed by power or status. True abundance includes emotional richness alongside material wealth.',
        missingText:
            'The number 8 is absent from your chart. This is a life lesson around building financial discipline, perseverance, and the confidence to pursue material goals. You may have struggled with money management or felt uncomfortable with ambition. Your growth lies in embracing that material success and spiritual depth are not mutually exclusive.',
        career: 'Finance, executive leadership, law, real estate, business ownership, investment',
        relationship:
            'You are a strong, protective partner who provides security and stability. You value respect and shared ambition in your relationships.',
    },
    9: {
        digit: 9,
        keyword: 'Compassion & Humanitarianism',
        shortDesc: 'The visionary — generous, idealistic, and universally wise.',
        presentText:
            'Number 9 is active in your chart, reflecting a compassionate heart and a desire to make a positive impact on the world. You tend to be generous, idealistic, and drawn to causes larger than yourself. Your empathy extends beyond personal relationships into the wider community.',
        strongText:
            'With 9 appearing twice, your humanitarian instincts are powerful. You feel a deep responsibility toward the welfare of others and may be drawn to activism, charity, or social justice. Ensure that your generosity does not lead to personal depletion.',
        dominantText:
            'Number 9 dominates your chart, creating an intensely humanitarian personality. Your desire to help and heal is extraordinary, but guard against martyrdom or emotional burnout. Serving others from a place of wholeness is more sustainable than sacrificing yourself.',
        missingText:
            'The number 9 is absent from your chart. This is a life lesson around developing empathy, compassion, and a broader perspective on life. You may have focused primarily on personal goals. Your growth lies in connecting with something larger than yourself and finding fulfilment through service.',
        career: 'Non-profit, healthcare, teaching, counselling, international development, the arts',
        relationship:
            'You are a deeply caring and generous partner who sees the best in others. You are drawn to meaningful, growth-oriented relationships built on mutual respect and shared values.',
    },
}

// ── Plane Interpretations ──────────────────────────

interface PlaneContent {
    completeText: string
    developingTexts: Record<number, string>
}

export const PLANE_CONTENT: Record<string, PlaneContent> = {
    mental: {
        completeText:
            'Exceptionally strong thinker; analytical, strategic, and intellectually driven. Your mental faculties are a cornerstone of your personality.',
        developingTexts: {
            0: 'The mental plane represents a significant growth opportunity for you. Developing analytical thinking and strategic skills is a rewarding life path.',
            1: 'Your mental plane is just beginning to develop. One aspect of intellectual strength is active — nurture it through study and reflection.',
            2: 'Your mental plane is growing stronger; one more element is needed to complete it. You are on the path to becoming a truly strategic thinker.',
        },
    },
    emotional: {
        completeText:
            'Deep emotional intelligence; highly intuitive and spiritually aware. You navigate the inner world with remarkable grace and depth.',
        developingTexts: {
            0: 'The emotional plane represents a significant growth opportunity for you. Developing intuition and emotional awareness enriches every area of life.',
            1: 'Your emotional plane is just beginning to develop. One aspect of emotional or spiritual awareness is active — trust it and let it grow.',
            2: 'Your emotional plane is growing stronger; one more element is needed to complete it. You are already more emotionally aware than most.',
        },
    },
    physical: {
        completeText:
            'Strong material instinct; action-oriented with physical resilience. You are naturally effective at turning ideas into tangible outcomes.',
        developingTexts: {
            0: 'The physical plane represents a significant growth opportunity for you. Building discipline around health, finances, and practical skills offers great reward.',
            1: 'Your physical plane is just beginning to develop. One aspect of material strength is active — build on it through action and routine.',
            2: 'Your physical plane is growing stronger; one more element is needed to complete it. Your capacity for practical achievement is already evident.',
        },
    },
    thought: {
        completeText:
            'Excellent planner; turns ideas into practical outcomes with consistency and focus. You bring structure to creative thinking.',
        developingTexts: {
            0: 'The thought plane represents a significant growth opportunity for you. Learning to bridge ideas and action creates powerful results.',
            1: 'Your thought plane is just beginning to develop. One element of planning ability is active — strengthen it through deliberate practice.',
            2: 'Your thought plane is growing stronger; one more element is needed to complete it. Your ability to plan and execute is already noticeable.',
        },
    },
    will: {
        completeText:
            'Unstoppable determination; overcomes obstacles through sheer willpower. Once you commit to a path, very little can deter you.',
        developingTexts: {
            0: 'The will plane represents a significant growth opportunity for you. Developing inner determination and persistence transforms challenges into stepping stones.',
            1: 'Your will plane is just beginning to develop. One aspect of determination is active — strengthen it through challenging but achievable goals.',
            2: 'Your will plane is growing stronger; one more element is needed to complete it. Your perseverance is already impressive to those around you.',
        },
    },
    sensitivity: {
        completeText:
            'Naturally empathetic; thrives in relationships and caregiving roles. Your sensitivity is a profound gift that enriches the lives of everyone you touch.',
        developingTexts: {
            0: 'The sensitivity plane represents a significant growth opportunity for you. Developing empathy and relational skills opens doors to deeper connections.',
            1: 'Your sensitivity plane is just beginning to develop. One element of relational awareness is active — explore it in your closest relationships.',
            2: 'Your sensitivity plane is growing stronger; one more element is needed to complete it. You are already more empathetic than you may realise.',
        },
    },
    stability: {
        completeText:
            'Grounded and responsible; others rely on you for stability and emotional balance. You are the bedrock in turbulent times.',
        developingTexts: {
            0: 'The stability plane represents a significant growth opportunity for you. Building groundedness and emotional balance creates a solid foundation for everything else.',
            1: 'Your stability plane is just beginning to develop. One aspect of balance is active — nurture it through mindfulness and routine.',
            2: 'Your stability plane is growing stronger; one more element is needed to complete it. Your growing groundedness is already evident to those close to you.',
        },
    },
    success: {
        completeText:
            'Driven toward achievement; natural ability to attract success and turn opportunities into results. Prosperity tends to find you.',
        developingTexts: {
            0: 'The success plane represents a significant growth opportunity for you. Developing ambition, adaptability, and persistence creates the conditions for lasting achievement.',
            1: 'Your success plane is just beginning to develop. One aspect of achievement energy is active — build on it with focused effort.',
            2: 'Your success plane is growing stronger; one more element is needed to complete it. You are already creating momentum toward your goals.',
        },
    },
}

// ── Summary Builders ──────────────────────────────

const ARCHETYPE_MAP: Record<string, string> = {
    mental: 'Strategic Mind',
    emotional: 'Spiritual Heart',
    physical: 'Material Builder',
    will: 'Unstoppable Force',
    success: 'Natural Achiever',
    sensitivity: 'Natural Healer',
    thought: 'Master Planner',
    stability: 'Grounded Anchor',
}

export function getNumberContent(digit: number): NumberContent {
    return NUMBER_CONTENT[digit]
}

export function getPlaneContent(planeId: string, presentCount: number): string {
    const content = PLANE_CONTENT[planeId]
    if (!content) return ''
    if (presentCount === 3) return content.completeText
    return content.developingTexts[presentCount] ?? ''
}

interface SummaryInput {
    digitMap: Record<number, DigitAnalysis>
    planes: PlaneResult[]
    dominantNumbers: number[]
    missingNumbers: number[]
    input: DOBInput
}

export function buildSummary(data: SummaryInput): {
    headline: string
    paragraph: string
} {
    const { digitMap, planes, dominantNumbers, missingNumbers, input } = data
    const completePlanes = planes.filter((p) => p.isComplete)
    const name = input.name ? input.name : 'Your'
    const possessive = input.name ? `${input.name}'s` : 'Your'

    // Headline
    let headline: string
    if (completePlanes.length >= 2) {
        const strongest = completePlanes[0]
        const archetype = ARCHETYPE_MAP[strongest.id] || 'Unique Soul'
        headline = input.name ? `${input.name} the ${archetype}` : `The ${archetype}`
    } else if (dominantNumbers.length > 0) {
        const firstDom = dominantNumbers[0]
        const keyword = NUMBER_CONTENT[firstDom]?.keyword || 'Unique'
        headline = `A ${keyword} Soul`
    } else if (missingNumbers.length >= 5) {
        headline = 'The Seeker: A Life of Growth and Discovery'
    } else {
        headline = 'A Unique Numerological Blueprint'
    }

    // Paragraph
    const sentences: string[] = []

    // Sentence 1: Overall energy
    if (dominantNumbers.length > 0) {
        const traits = dominantNumbers
            .slice(0, 2)
            .map((n) => NUMBER_CONTENT[n]?.keyword.toLowerCase() || '')
            .join(' and ')
        sentences.push(
            `${possessive} chart reveals a personality shaped by powerful ${traits} energy.`
        )
    } else {
        sentences.push(
            `${possessive} chart reveals a well-distributed personality with a balanced blend of different energies.`
        )
    }

    // Sentence 2: Strongest asset
    if (completePlanes.length > 0) {
        const p = completePlanes[0]
        sentences.push(
            `The complete ${p.name} marks ${input.name ? 'them' : 'you'} as someone with ${p.arrowName ? `the ${p.arrowName} \u2014 ` : ''
            }${PLANE_CONTENT[p.id]?.completeText.toLowerCase() || 'remarkable strength in this area.'}`
        )
    } else if (dominantNumbers.length > 0) {
        const d = dominantNumbers[0]
        const count = digitMap[d].count
        sentences.push(
            `With the number ${d} appearing ${count} times, ${NUMBER_CONTENT[d]?.keyword.toLowerCase()} is a defining force in ${input.name ? 'their' : 'your'} personality.`
        )
    }

    // Sentence 3: Key growth area
    if (missingNumbers.length > 0) {
        const missingLabels = missingNumbers
            .slice(0, 3)
            .map((n) => NUMBER_CONTENT[n]?.keyword.split(' & ')[0]?.toLowerCase() || '')
            .join(', ')
        sentences.push(
            `The absence of ${missingNumbers.slice(0, 3).join(', ')} points to life lessons around ${missingLabels} \u2014 areas that hold tremendous growth potential.`
        )
    }

    // Sentence 4: Empowerment close
    if (completePlanes.length >= 2) {
        sentences.push(
            'This grid points toward a life of influence, depth, and meaningful impact.'
        )
    } else if (dominantNumbers.length > 0) {
        sentences.push(
            'This grid points toward a life of powerful self-expression and purposeful growth.'
        )
    } else {
        sentences.push(
            'This grid points toward a life of discovery, learning, and authentic self-development.'
        )
    }

    return { headline, paragraph: sentences.join(' ') }
}
