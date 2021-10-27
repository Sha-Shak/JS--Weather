window.addEventListener('load', ()=>{
    
    let long;
    let lat;
    let tdes = document.querySelector(".temperature-description");
    let tdeg = document.querySelector(".temperature-degree");
    let tzone = document.querySelector(".location-timezone");
    let tsec = document.querySelector(".temperature");
    let tsecspan = document.querySelector(".temperature span");
    if(navigator.geolocation){  
        

        navigator.geolocation.getCurrentPosition(position =>{
            lat = position.coords.latitude;
            long = position.coords.longitude;
            //console.log(position);
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api  = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`;
            fetch(api)
            .then(response=> {
                return response.json();
            })
            .then(data=> {
                console.log(data);
                const {temperature, summary, icon} = data.currently;

                tdeg.textContent=temperature;
                tdes.textContent=summary;
                tzone.textContent = data.timezone;
                setIcons(icon, document.querySelector(".icon"));
                let celcius = (temperature-32)* (5/9);
                tsec.addEventListener('click', ()=>{

                    if (tsecspan.textContent  === "F"){
                        tsecspan.textContent =  "C";
                        tdeg.textContent = Math.floor(celcius);
                    }
                    else{
                        tsecspan.textContent  = "F";
                        tdeg.textContent = temperature;
                    }

                })
            });
        });

      

    } 

    function setIcons(icon, iconID){

        const skycons = new Skycons ({color: "white" });
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }




});