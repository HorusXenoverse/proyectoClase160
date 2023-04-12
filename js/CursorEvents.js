AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" }
  },
  init: function() {
    this.handleClickEvents();
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
  },
  handleClickEvents: function() {
    //  Eventos de clic.
    this.el.addEventListener("click", evt => {
      const placesContainer = document.querySelector("#places-container");
      const { state } = placesContainer.getAttribute("tour");

      if (state === "places-list") {
        const id = this.el.getAttribute("id");
        const placesId = [
          "americanHouse",
          "chiniseHouse",
          "frenchHouse",
          "mexicanHouse"
        ];
        if (placesId.includes(id)) {
          placesContainer.setAttribute("tour", {
            state: "view",
            selectedCard: id
          });
        }
      }

      if (state === "view"){
        this.handleArrowView()
      }
      if (state === "change-view"){
        this.handleArrowView()
      }
      
    });
  },
  handleArrowView: function(){
    const arrow = this.el
    const arrowID = arrow.getAttribute("id")
    const placesContainer = document.querySelector("#places-container")
    const {selectedItemId} = placesContainer.getAttribute("cursor-listener")

    const helicopterImage = ["place-1", "place-2", "place-3", "place-4"]
    if (helicopterImage.includes(arrowID)){
      placesContainer.setAttribute("tour", {state: "change-view"})
      const arrowSkye = document.querySelector("#main-container")
      arrowSkye.setAttribute("material", {src:`./assets/360_images/${selectedItemId}/${arrowID}.jpg`, color: "#FFF"})
    }
  },
  handleMouseEnterEvents: function() {
    // Eventos centrales del mouse.
    this.el.addEventListener("mouseenter", () => {
      const placeContainer = document.querySelector("#places-container");
      const { state } = placeContainer.getAttribute("tour");
      if (state === "places-list") {
        this.handlePlacesListState();
      }
    });
  },
  handlePlacesListState: function() {
    const id = this.el.getAttribute("id");
    const placesId = ["americanHouse", "chiniseHouse", "frenchHouse", "mexicanHouse"];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id
      });
      this.el.setAttribute("material", {
        color:"#D76B30",
        opacity: 1
      });
    }
  },
  handleMouseLeaveEvents: function() {
    // Eventos 'mouseleave' del cursor.
    this.el.addEventListener("mouseleave", () => {
      const placesContainer = document.querySelector("#places-container");
      const { state } = placesContainer.getAttribute("tour");
      if (state === "places-list") {
        const { selectedItemId } = this.data;
        if (selectedItemId) {
          const el = document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if (id == selectedItemId) {
            el.setAttribute("material", {
              color: "#0077CC",
              opacity: 1
            });
          }
        }
      }
    });
  },
  
});
