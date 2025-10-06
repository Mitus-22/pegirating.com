
function computePegi(answers){
    // Variables de PEGI y eplicación
    let pegi = 0
    let explanation = ''

    const a = (v) => { if (v) return v.toUpperCase(); return null }

    // Establece el PEGI y la pregunta que ha dado ese rating
    const consider = (score, text) => {
        if(score > pegi){
            pegi = score
            explanation = text
        }
    }

    // Pregunta1
    const r1 = a(answers.q1)
    if(r1 === 'A') consider(3, 'No or very mild/comical violence')
    else if(r1 === 'B') consider(7, 'Implied or non-detailed violence')
    else if(r1 === 'C') consider(12, 'Slightly graphic fantasy or non-realistic violence')
    else if(r1 === 'D') consider(16, 'Realistic violence similar to real life')
    else if(r1 === 'E') consider(18, 'Realistic, gross or motiveless violence')

    // Pregunta2
    const r2 = a(answers.q2)
    if(r2 === 'A') consider(3, 'No bad language')
    else if(r2 === 'B') consider(12, 'Mild/light bad language')
    else if(r2 === 'C') consider(16, 'More extreme bad language')

    // Pregunta3
    const r3 = a(answers.q3)
    if(r3 === 'A') consider(3, 'No frightening sounds or images')
    else if(r3 === 'B') consider(7, 'Scenes or sounds that may frighten younger children')
    else if(r3 === 'C') consider(12, 'Moderated horror content')
    else if(r3 === 'D') consider(16, 'Intense or sustained horror/disturbing images')

    // Pregunta4
    const r4 = a(answers.q4)
    if(r4 === 'A') consider(3, 'No sexual content')
    else if(r4 === 'B') consider(12, 'Sexual innuendo or posturing')
    else if(r4 === 'C') consider(16, 'Erotic nudity or intercourse without visible genitals')
    else if(r4 === 'D') consider(18, 'Explicit sexual activity')

    // Pregunta5
    const r5 = a(answers.q5)
    if(r5 === 'A') consider(3, 'No gambling presence')
    else if(r5 === 'B') consider(18, 'Glamorisation or encouragement of gambling')

    // Pregunta6
    const r6 = a(answers.q6)
    if(r6 === 'A') consider(3, 'No drugs present')
    else if(r6 === 'B') consider(16, 'Use of tobacco, alcohol or illegal drugs present')
    else if(r6 === 'C') consider(18, 'Glamorisation of illegal drugs')

    return { pegi, explanation }
}

// Manejo del formulario
document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('pegiForm')
    const resultEl = document.getElementById('result')

    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        const fd = new FormData(form)
        const answers = {}
        for(const [k,v] of fd.entries()) answers[k]=v

        const missing = []
        for(let i=1;i<=6;i++) if(!answers['q'+i]) missing.push(i)
        if(missing.length){
            resultEl.textContent = `Please answer questions: ${missing.join(', ')}`
            resultEl.style.color = '#ffd54f'
            return
        }

        const res = computePegi(answers)
        const pegi = res.pegi
        const explanation = res.explanation || ''
        const display = pegi > 0 ? String(pegi) : 'DKY'

        let cls = 'badge'
        if(display === 'DKY') cls += ' badge-dky'
        else cls += ` pegi-${display}`

        // Añade un cuadro con el numero del PEGI
        const numberIcon = display === 'DKY' ? '<span class="badge-icon">?</span>' : `<span class="badge-icon">${display}</span>`

        resultEl.innerHTML = `
            <div style="text-align:center">
                <span class="${cls}">${numberIcon}<span class="badge-label">PEGI ${display}</span></span>
                <div class="explanation" style="margin-top:10px;color:var(--muted);font-size:13px">${explanation}</div>
            </div>
        `
        resultEl.style.color = '#a5d6a7'
    })
})