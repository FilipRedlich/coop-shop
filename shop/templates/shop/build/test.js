const chg = document.querySelector('#chg');
const form = document.querySelector('#register-form')
chg.addEventListener('click', () => {
    form.setAttribute('action', '{% url shop:register %}')
    console.log('done')
})