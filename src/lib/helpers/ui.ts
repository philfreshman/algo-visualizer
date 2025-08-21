export const ui = {
    clearVisitedAndWalls() {
        // Only query elements that actually have these classes
        const visited = document.querySelectorAll('.visited')
        const toggled = document.querySelectorAll('.toggled')
        const startBox = document.querySelectorAll('.start-box')
        const endBox = document.querySelectorAll('.end-box')

        visited.forEach((el) => el.classList.remove('visited'))
        toggled.forEach((el) => el.classList.remove('toggled'))
        startBox.forEach((el) => el.classList.remove('start-box'))
        endBox.forEach((el) => el.classList.remove('end-box'))

        return this
    },

    clearVisited() {
        // Only query elements that actually have these classes
        const visited = document.querySelectorAll('.visited')
        const startBox = document.querySelectorAll('.start-box')
        const endBox = document.querySelectorAll('.end-box')

        visited.forEach((el) => el.classList.remove('visited'))
        startBox.forEach((el) => el.classList.remove('start-box'))
        endBox.forEach((el) => el.classList.remove('end-box'))

        return this
    },

    clearToggled() {
        // Only query elements that actually have the 'toggled' class
        const toggled = document.querySelectorAll('.toggled')
        toggled.forEach((el) => el.classList.remove('toggled'))

        return this
    },

    markEndAsVisited() {
        document.getElementById('end')?.classList.add('end-box')
        return this
    },

    markStartAsVisited() {
        document.getElementById('start')?.classList.add('start-box')
        return this
    },
}
