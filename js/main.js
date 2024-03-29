(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const infoCon = document.querySelector("#info-con");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  let spinner = `<?xml version="1.0" encoding="utf-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <circle cx="30" cy="50" fill="#e90c59" r="20">
    <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="-0.5s"></animate>
  </circle>
  <circle cx="70" cy="50" fill="#46dff0" r="20">
    <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="0s"></animate>
  </circle>
  <circle cx="30" cy="50" fill="#e90c59" r="20">
    <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="-0.5s"></animate>
    <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" dur="1s" repeatCount="indefinite"></animate>
  </circle> </svg>`;

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  // const infoBoxes = [
  //   {
  //     title: 'Noise-cancelling microphones',
  //     text: 'Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience.',
  //     image: 'images/ear-piece.jpg'
  //   },
  //   {
  //     title: 'Comfortable fit',
  //     text: 'Three pairs of ultra comfortable silicone tips are included. The tips create an acoustic seal that blocks outside audio and secures the earbuds in place.',
  //     image: 'images/ear-piece.jpg'
  //   },
  //   {
  //     title: '360 AUDIO',
  //     text: '360 Audio places sound all around you, while Dolby Head Tracking™ technology delivers an incredible three-dimensional listening experience.',
  //     image: 'images/ear-piece.jpg'
  //   },
  //   {
  //     title: 'Ultra Fast Charging',
  //     text: 'Charge your earbuds in 30 minutes or less with our hyper charging technology.',
  //     image: 'images/ear-piece.jpg'
  //   },
  // ];

    //This information needs to be removed then pulled with an AJAX Call using the Fetch API
    //this is the api url https://swiftpixel.com/earbud/api/materials"

   //const materialListData = [
     //{
      // heading: "Precision-Crafted Polymers",
      // description: "Our earbuds are meticulously molded from high-quality plastics, ensuring a blend of elegance, comfort, and resilience that's second to none."
    //},
    //{
      // heading: "Luxurious Silicone Harmony",
      //description: "Our uniquely engineered ear tips are cocooned in plush silicone, delivering an opulent embrace for your ears, ensuring an unrivaled fit and exquisite audio experience."
     //},
     //{
      // heading: "Rubberized Cables",
      // description: "Experience the unparalleled freedom of movement with our flexible rubber cables that promise durability without compromise."
     //},
     //{
       //heading: "Enhanced Comfort Sensors",
       //description: "A touch of magic in the form of built-in microphones and sensors empowers your earbuds to obey your every command, making your audio journey seamless and enchanting."
     //},
     //{
       //heading: "Artistic Mesh Guard",
       //description: "Shielded by artful mesh screens, our speakers remain untarnished, keeping your listening experience pristine."
     //}
   //];

  //functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {

    //make AJAX call here

    function getData() {
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      // repsonse is packages so we have to unppack 
      //takes stringified JSON and converst back to a JS object
      .then(response => response.json()) //unpack the API response (tunr it back to a plain JS object)
      .then(data => {
        console.log(data);
        //process data and write to the down
        data.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index+1}`);
          
          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;
    
          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;

    
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
        
      });
    }  
    getData();
  }
  loadInfoBoxes();


   function loadMaterialInfo() {
    infoCon.innerHTML = spinner;
     //make AJAX Call here
     function getData() {
       fetch("https://swiftpixel.com/earbud/api/materials")
      // repsonse is packages so we have to unppack 
       //takes stringified JSON and converst back to a JS object
       .then(response => response.json()) //unpack the API response (tunr it back to a plain JS object)
        .then(info => {
          console.log(info);
          //process data and write to the down
          
          info.forEach(material => {
            // Clone the template content
            const clone = materialTemplate.content.cloneNode(true);
            //const clone = document.importNode(materialTemplate.content, true);
     
            // Populate the cloned template with data
            const materialHeading = clone.querySelector(".material-heading");
            materialHeading.textContent = material.heading;
     
            const materialDescription = clone.querySelector(".material-description");
            materialDescription.textContent = material.description;
     
            // Append the populated template to the list
            materialList.appendChild(clone);
          });
          infoCon.innerHTML = ""
          infoCon.appendChild(materialList)
          
        })}
      
    getData();
    }
   loadMaterialInfo()

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

