

let btn = document.querySelector(".weather .search i");
let input = document.querySelector(".weather .search input")
let tempC = document.querySelector(".temp-c")
let condition = document.querySelector(".codition-cloud")
let humidity = document.querySelector(".humd-purc")
let windSpeed = document.querySelector(".wind-speed")
let notFound = document.querySelector(".not-found")
let temperature = document.querySelector(".temperature")
let img = document.querySelector(".temperature img")

temperature.remove()
notFound.remove()


btn.onclick = function(){
    
    if(input.value == ""){
        return;
    }else{
        axios.get(`http://api.weatherapi.com/v1/current.json?q=${input.value}&key=40c9cd36830543cfaee155607232908`)
            .then((response)=>{

                let data = response.data
                tempC.innerHTML = data.current.temp_c
                condition.innerHTML = data.current.condition.text
                humidity.innerHTML = data.current.humidity + "%"
                windSpeed.innerHTML = data.current.wind_kph + "Km/h"
                switch(data.current.condition.code){
                    case 1000: img.src = "img/clear.png"
                        break;
                    case 1003:
                        case 1006:
                            case 1009: img.src = "img/cloud.png"
                            break;
                    case 1030: img.src = "img/mist.png"
                        break;
                }
                notFound.classList.remove("scal")
                notFound.remove()

                document.querySelector(".weather").appendChild(temperature)
                // document.querySelector(".weather").style.height = "480px"
                document.querySelector(".weather").addEventListener('transitionend',()=>{
                    // temperature.style.transform = "scale(1)"
                    temperature.classList.add("scal")
                    
                })
                
            })
            .catch((error)=>{
                temperature.classList.remove("scal")
                temperature.remove()
                document.querySelector(".weather").appendChild(notFound)
                // document.querySelector(".weather").style.height = "400px"
                document.querySelector(".weather").addEventListener('transitionend',()=>{
                    // notFound.style.transform = "scale(1)"
                    notFound.classList.add("scal")
                })

                
            })
    }
}

