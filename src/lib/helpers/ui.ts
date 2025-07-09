export const ui = {
    clearVisitedAndWalls() {
        document.querySelectorAll('td').forEach((el) => {
            el.classList.remove('toggled', 'visited', 'start-box', 'end-box')
        })
        return this
    },

    clearVisited() {
        document.querySelectorAll('td').forEach((el) => {
            el.classList.remove('visited', 'start-box', 'end-box')
        })
        return this
    },

    clearToggled() {
        document.querySelectorAll('td').forEach((el) => {
            el.classList.remove('toggled')
        })
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
