export const useGsap = () => {
    const { $gsap, $ScrollTrigger } = useNuxtApp()

    // Basic animations
    const animateOnScroll = (element: any, options: any = {}) => {
        return $gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                ...options.scrollTrigger
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            ...options
        })
    }

    const fadeIn = (element: any, options: any = {}) => {
        return $gsap.from(element, {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            ...options
        })
    }

    const slideIn = (element: any, direction: 'left' | 'right' | 'top' | 'bottom' = 'left', options: any = {}) => {
        const directionMap = {
            left: { x: -100 },
            right: { x: 100 },
            top: { y: -100 },
            bottom: { y: 100 }
        }

        return $gsap.from(element, {
            ...directionMap[direction],
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            ...options
        })
    }

    const staggerAnimation = (elements: any, options: any = {}) => {
        return $gsap.from(elements, {
            y: 100,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            ...options
        })
    }

    // Advanced animations
    const revealText = (element: any, options: any = {}) => {
        return $gsap.from(element, {
            yPercent: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.05,
            ...options
        })
    }

    const scaleReveal = (element: any, options: any = {}) => {
        return $gsap.from(element, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            ...options
        })
    }

    const clipPathReveal = (element: any, options: any = {}) => {
        return $gsap.from(element, {
            clipPath: 'inset(0% 100% 0% 0%)',
            duration: 1.5,
            ease: 'power4.inOut',
            ...options
        })
    }

    const parallaxScroll = (element: any, speed: number = 0.5, options: any = {}) => {
        return $gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                ...options.scrollTrigger
            },
            y: (i: any, target: any) => {
                const height = target.offsetHeight
                return -height * speed
            },
            ease: 'none',
            ...options
        })
    }

    const magneticHover = (element: any, strength: number = 0.3) => {
        if (!element) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const deltaX = (e.clientX - centerX) * strength
            const deltaY = (e.clientY - centerY) * strength

            $gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration: 0.5,
                ease: 'power2.out'
            })
        }

        const handleMouseLeave = () => {
            $gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            })
        }

        element.addEventListener('mousemove', handleMouseMove)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            element.removeEventListener('mousemove', handleMouseMove)
            element.removeEventListener('mouseleave', handleMouseLeave)
        }
    }

    const rotateIn = (element: any, options: any = {}) => {
        return $gsap.from(element, {
            rotation: 90,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            transformOrigin: 'center center',
            ...options
        })
    }

    const splitTextAnimation = (element: any, options: any = {}) => {
        const text = element.textContent
        const chars = text.split('')
        element.innerHTML = chars.map((char: string) =>
            `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('')

        return $gsap.from(element.querySelectorAll('.char'), {
            yPercent: 100,
            opacity: 0,
            rotationX: -90,
            stagger: 0.02,
            duration: 0.8,
            ease: 'back.out(1.7)',
            ...options
        })
    }

    const drawLine = (element: any, options: any = {}) => {
        return $gsap.from(element, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.5,
            ease: 'power3.inOut',
            ...options
        })
    }

    const imageReveal = (element: any, options: any = {}) => {
        const tl = $gsap.timeline(options)

        tl.from(element, {
            clipPath: 'inset(0% 100% 0% 0%)',
            duration: 1.5,
            ease: 'power4.inOut'
        })
            .from(element.querySelector('img'), {
                scale: 1.3,
                duration: 1.5,
                ease: 'power2.out'
            }, '-=1.5')

        return tl
    }

    return {
        gsap: $gsap,
        ScrollTrigger: $ScrollTrigger,
        animateOnScroll,
        fadeIn,
        slideIn,
        staggerAnimation,
        revealText,
        scaleReveal,
        clipPathReveal,
        parallaxScroll,
        magneticHover,
        rotateIn,
        splitTextAnimation,
        drawLine,
        imageReveal
    }
}
