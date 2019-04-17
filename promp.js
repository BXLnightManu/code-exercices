(() => {
      document.addEventListener('DOMContentLoaded', () => {
        let potatoe=prompt("Hey my friend, do you like potatoes? Yes/No", "");
      const potatoes=document.getElementById("potatoes");
        if(potatoe==="Yes" || potatoe==="yes" || potatoe==="Y" || potatoe==="y") {
            console.log("#");
            console.log("##");
            console.log("###");
            console.log("####");
            console.log("#####");
            console.log("######");
            console.log("#######");
            potatoes.textContent="A bunch of 7-level potatoes has been desplayed in the browser console."
        } else if(potatoe==="No" || potatoe==="no" || potatoe==="N" || potatoe==="n") {
            alert("Hm, I'm desapointed...");
        } else {
            alert("I'm not sure... Try again.");
        }
    })
})();