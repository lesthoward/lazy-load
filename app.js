const imagesContainer = document.querySelector('.images');
document.addEventListener('DOMContentLoaded', () => {
    getImages ()
    startLoadImages ()
})

async function getImages () {
    const url = 'https://pixabay.com/api/?key=20672615-0bad085819e0a5e2ba9c7dbca'
    const api = await fetch(url)
    const data = await api.json()
    chargeInDocument (data)
}

// Por cada imágen de la api, mostrar en pantalla. Límite de 20 por defecto
function chargeInDocument ({hits}) {
    hits.forEach(hit => {
        imagesContainer.innerHTML += `
            <div class="images__image">
                <img class="images__img" data-src="${hit.largeImageURL}"></img>
            </div>
        `
    })
    startLoadImages ()
}

// Cuando el documento cargue quiero tomar las imágenes y colocar un observer a cada una
function startLoadImages () {
    const imgArr = document.querySelectorAll('.images__img');
    imgArr.forEach(img => observer.observe(img))
} 


function loadImage (entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            // Obtener el target de la imágen que apenas se está volviendo visible.
            const target = entry.target;
            // Utilizar innerHeight y ScrollY. En caso que la pantalla se reduzca por a o b, como por ejemplo abrir la consola, quiero siempre el final del doucmento, se hace utilizando el innerHeight (tamaño de la pantalla visible ) + el scrollY, y esto hace la altura completa de todo el documento 
            const {innerHeight, scrollY } = window
            // Sumo +1000 porque en un inicio el scrollY es 0
            const totalHeight = scrollY + innerHeight + 1000
            // Cuando sea intersectado quiero cargar la ruta de la imagen
            target.src = target.dataset.src
            // Al elemento padre le agrego una clase para colocar animaciones
            target.parentNode.classList.add('images__image--show')
            // Ampliando la altura máxima del contenedor de las imágenes, por defecto tiene una altura definida en CSS para estar intersectando cada imágen
            imagesContainer.style.maxHeight = `${totalHeight}px`
            // Luego de ser intersectado deja de observar el mismo elemento
            observer.unobserve(target)
        } 
    })
}

// Creando el observer y opciones del mismo
const observer = new IntersectionObserver(loadImage,{
    rootMargin: '0px 0px 0px 0px'
})
